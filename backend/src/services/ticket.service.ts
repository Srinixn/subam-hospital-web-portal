import crypto from 'crypto';
import * as ticketRepo from '../repositories/ticket.repository.js';
import * as auditRepo from '../repositories/audit.repository.js';
import logger from '../utils/logger.js';
import type { ChatTicket, TicketResponse, TicketStatus } from '../types/index.js';

/**
 * Valid status transitions.
 * Prevents arbitrary status jumps (e.g., ARCHIVED → NEW).
 */
const VALID_TRANSITIONS: Record<TicketStatus, TicketStatus[]> = {
  NEW: ['ASSIGNED', 'IN_PROGRESS', 'RESOLVED'],
  ASSIGNED: ['IN_PROGRESS', 'RESOLVED'],
  IN_PROGRESS: ['RESOLVED', 'ASSIGNED'],
  RESOLVED: ['IN_PROGRESS', 'ARCHIVED'],
  ARCHIVED: [], // Terminal state — no transitions allowed
};

/**
 * Create a new ticket from the chatbot fallback form.
 */
export async function createTicket(
  data: {
    name: string;
    email?: string | null;
    phone?: string | null;
    departmentId?: number | null;
    message: string;
    filePath?: string | null;
    fileName?: string | null;
    privacyConsent: boolean;
  },
  ipAddress?: string,
): Promise<{ ticketId: number; accessToken: string }> {
  const accessToken = crypto.randomBytes(16).toString('hex');
  const ticketId = await ticketRepo.create({
    ...data,
    accessToken,
  });

  // Audit log
  await auditRepo.logAction({
    adminId: null, // System-created
    action: 'CREATE_TICKET',
    entity: 'chat_ticket',
    entityId: ticketId,
    details: JSON.stringify({ name: data.name, department: data.departmentId }),
    ipAddress: ipAddress ?? null,
  });

  return { ticketId, accessToken };
}

/**
 * List tickets with pagination and optional filters.
 */
export async function listTickets(options: {
  page: number;
  limit: number;
  status?: TicketStatus;
  departmentId?: number;
  assignedTo?: number;
  search?: string;
}): Promise<{
  rows: ChatTicket[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const { rows, total } = await ticketRepo.findAll(options);
  return {
    rows,
    total,
    page: options.page,
    limit: options.limit,
    totalPages: Math.ceil(total / options.limit),
  };
}

/**
 * Get a single ticket with all responses.
 */
export async function getTicket(id: number): Promise<{
  ticket: ChatTicket;
  responses: TicketResponse[];
} | null> {
  const ticket = await ticketRepo.findById(id);
  if (!ticket) return null;

  const responses = await ticketRepo.getResponses(id);
  return { ticket, responses };
}

/**
 * Assign a ticket to an admin user.
 */
export async function assignTicket(
  ticketId: number,
  adminId: number,
  performedBy: { userId: number; ip?: string },
): Promise<boolean> {
  const ticket = await ticketRepo.findById(ticketId);
  if (!ticket) return false;

  // Only allow assignment from NEW or ASSIGNED status
  if (ticket.status !== 'NEW' && ticket.status !== 'ASSIGNED') {
    logger.warn(`Cannot assign ticket #${ticketId} — current status: ${ticket.status}`);
    return false;
  }

  const success = await ticketRepo.assign(ticketId, adminId);
  if (success) {
    await auditRepo.logAction({
      adminId: performedBy.userId,
      action: 'ASSIGN_TICKET',
      entity: 'chat_ticket',
      entityId: ticketId,
      details: JSON.stringify({ assignedTo: adminId }),
      ipAddress: performedBy.ip ?? null,
    });
    logger.info(`Ticket #${ticketId} assigned to admin #${adminId}`);
  }
  return success;
}

/**
 * Update ticket status with workflow validation.
 */
export async function updateStatus(
  ticketId: number,
  newStatus: TicketStatus,
  performedBy: { userId: number; ip?: string },
): Promise<{ success: boolean; error?: string }> {
  const ticket = await ticketRepo.findById(ticketId);
  if (!ticket) return { success: false, error: 'Ticket not found' };

  const allowedTransitions = VALID_TRANSITIONS[ticket.status];
  if (!allowedTransitions.includes(newStatus)) {
    return {
      success: false,
      error: `Cannot transition from ${ticket.status} to ${newStatus}. Allowed: ${allowedTransitions.join(', ') || 'none'}`,
    };
  }

  const success = await ticketRepo.updateStatus(ticketId, newStatus);
  if (success) {
    await auditRepo.logAction({
      adminId: performedBy.userId,
      action: 'UPDATE_TICKET_STATUS',
      entity: 'chat_ticket',
      entityId: ticketId,
      details: JSON.stringify({ from: ticket.status, to: newStatus }),
      ipAddress: performedBy.ip ?? null,
    });
    logger.info(`Ticket #${ticketId} status: ${ticket.status} → ${newStatus}`);
  }
  return { success };
}

/**
 * Add a response to a ticket (external or internal note).
 */
export async function addResponse(
  ticketId: number,
  adminId: number | null,
  message: string,
  isInternal: boolean,
  ip?: string,
): Promise<number | null> {
  const ticket = await ticketRepo.findById(ticketId);
  if (!ticket) return null;

  const responseId = await ticketRepo.addResponse({
    ticketId,
    adminId,
    message,
    isInternal,
  });

  // If patient replies (adminId is null) or if ticket is NEW/ASSIGNED, auto-transition to IN_PROGRESS
  if (adminId === null || ticket.status === 'NEW' || ticket.status === 'ASSIGNED') {
    await ticketRepo.updateStatus(ticketId, 'IN_PROGRESS');
  }

  await auditRepo.logAction({
    adminId,
    action: isInternal ? 'ADD_INTERNAL_NOTE' : 'ADD_RESPONSE',
    entity: 'ticket_response',
    entityId: responseId,
    details: JSON.stringify({ ticketId, sender: adminId ? 'admin' : 'patient' }),
    ipAddress: ip ?? null,
  });

  logger.info(`Response added to ticket #${ticketId} by ${adminId ? `admin #${adminId}` : 'patient'} (internal: ${isInternal})`);
  return responseId;
}

/**
 * Get dashboard statistics for the admin portal.
 */
export async function getDashboardStats(): Promise<{
  total: number;
  byStatus: Record<string, number>;
  overdueCount: number;
  todayCount: number;
}> {
  return ticketRepo.getStats();
}

/**
 * Export tickets as CSV string.
 */
export async function exportCSV(options: {
  status?: TicketStatus;
  departmentId?: number;
}): Promise<string> {
  const tickets = await ticketRepo.findAllForExport(options);

  const headers = [
    'ID', 'Name', 'Email', 'Phone', 'Department', 'Message',
    'Status', 'Assigned To', 'Created At', 'Updated At',
  ];

  const rows = tickets.map((t) => [
    t.id,
    `"${(t.name || '').replace(/"/g, '""')}"`,
    `"${(t.email || '').replace(/"/g, '""')}"`,
    `"${(t.phone || '').replace(/"/g, '""')}"`,
    `"${(t.departmentName || '').replace(/"/g, '""')}"`,
    `"${(t.message || '').replace(/"/g, '""')}"`,
    t.status,
    `"${(t.assignedToName || '').replace(/"/g, '""')}"`,
    t.createdAt?.toISOString() || '',
    t.updatedAt?.toISOString() || '',
  ]);

  return [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
}
