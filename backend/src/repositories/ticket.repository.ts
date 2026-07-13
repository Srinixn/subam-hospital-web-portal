// ─────────────────────────────────────────────
//  Chat ticket repository — MySQL CRUD for
//  chatbot fallback form submissions.
// ─────────────────────────────────────────────
import pool from '../config/database.js';
import type { ChatTicket, TicketResponse, TicketStatus } from '../types/index.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

/** Row shape for ticket queries with joins. */
interface TicketRow extends RowDataPacket {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  department_id: number | null;
  message: string;
  file_path: string | null;
  file_name: string | null;
  status: TicketStatus;
  assigned_to: number | null;
  privacy_consent: boolean;
  access_token: string | null;
  sla_deadline: Date | null;
  created_at: Date;
  updated_at: Date;
  department_name?: string;
  assigned_to_name?: string;
  response_count?: number;
}

interface ResponseRow extends RowDataPacket {
  id: number;
  ticket_id: number;
  admin_id: number | null;
  message: string;
  is_internal: boolean;
  created_at: Date;
  admin_name?: string;
}

function mapTicket(row: TicketRow): ChatTicket {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    departmentId: row.department_id,
    message: row.message,
    filePath: row.file_path,
    fileName: row.file_name,
    status: row.status,
    assignedTo: row.assigned_to,
    privacyConsent: row.privacy_consent,
    accessToken: row.access_token,
    slaDeadline: row.sla_deadline,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    departmentName: row.department_name,
    assignedToName: row.assigned_to_name,
    responseCount: row.response_count,
  };
}

function mapResponse(row: ResponseRow): TicketResponse {
  return {
    id: row.id,
    ticketId: row.ticket_id,
    adminId: row.admin_id,
    message: row.message,
    isInternal: row.is_internal,
    createdAt: row.created_at,
    adminName: row.admin_name,
  };
}

/**
 * Create a new ticket. Returns the inserted ID.
 * SLA deadline is set to 24 hours from creation.
 */
export async function create(data: {
  name: string;
  email?: string | null;
  phone?: string | null;
  departmentId?: number | null;
  message: string;
  filePath?: string | null;
  fileName?: string | null;
  privacyConsent: boolean;
  accessToken?: string | null;
}): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO chat_tickets (name, email, phone, department_id, message, file_path, file_name, privacy_consent, access_token, sla_deadline)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, DATE_ADD(NOW(), INTERVAL 24 HOUR))`,
    [
      data.name,
      data.email ?? null,
      data.phone ?? null,
      data.departmentId ?? null,
      data.message,
      data.filePath ?? null,
      data.fileName ?? null,
      data.privacyConsent ? 1 : 0,
      data.accessToken ?? null,
    ],
  );
  return result.insertId;
}

/**
 * Fetch paginated tickets with optional filters.
 */
export async function findAll(options: {
  page: number;
  limit: number;
  status?: TicketStatus;
  departmentId?: number;
  assignedTo?: number;
  search?: string;
}): Promise<{ rows: ChatTicket[]; total: number }> {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options.status) {
    conditions.push('t.status = ?');
    params.push(options.status);
  }
  if (options.departmentId) {
    conditions.push('t.department_id = ?');
    params.push(options.departmentId);
  }
  if (options.assignedTo) {
    conditions.push('t.assigned_to = ?');
    params.push(options.assignedTo);
  }
  if (options.search) {
    conditions.push('(t.name LIKE ? OR t.email LIKE ? OR t.message LIKE ?)');
    const term = `%${options.search}%`;
    params.push(term, term, term);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  // Count
  const [countResult] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM chat_tickets t ${whereClause}`,
    params,
  );
  const total = (countResult[0] as any).total;

  // Fetch
  const offset = (options.page - 1) * options.limit;
  const [rows] = await pool.execute<TicketRow[]>(
    `SELECT t.*,
            d.name AS department_name,
            a.name AS assigned_to_name,
            (SELECT COUNT(*) FROM ticket_responses WHERE ticket_id = t.id) AS response_count
     FROM chat_tickets t
     LEFT JOIN departments d ON t.department_id = d.id
     LEFT JOIN admin_users a ON t.assigned_to = a.id
     ${whereClause}
     ORDER BY
       CASE t.status
         WHEN 'NEW' THEN 1
         WHEN 'ASSIGNED' THEN 2
         WHEN 'IN_PROGRESS' THEN 3
         WHEN 'RESOLVED' THEN 4
         WHEN 'ARCHIVED' THEN 5
       END,
       t.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, String(options.limit), String(offset)],
  );

  return { rows: rows.map(mapTicket), total };
}

/**
 * Find a single ticket by ID with full details.
 */
export async function findById(id: number): Promise<ChatTicket | null> {
  const [rows] = await pool.execute<TicketRow[]>(
    `SELECT t.*,
            d.name AS department_name,
            a.name AS assigned_to_name,
            (SELECT COUNT(*) FROM ticket_responses WHERE ticket_id = t.id) AS response_count
     FROM chat_tickets t
     LEFT JOIN departments d ON t.department_id = d.id
     LEFT JOIN admin_users a ON t.assigned_to = a.id
     WHERE t.id = ?`,
    [id],
  );
  return rows.length > 0 ? mapTicket(rows[0]) : null;
}

/**
 * Assign a ticket to an admin user.
 */
export async function assign(ticketId: number, adminId: number): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE chat_tickets SET assigned_to = ?, status = 'ASSIGNED' WHERE id = ?`,
    [adminId, ticketId],
  );
  return result.affectedRows > 0;
}

/**
 * Update ticket status.
 */
export async function updateStatus(
  ticketId: number,
  status: TicketStatus,
): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE chat_tickets SET status = ? WHERE id = ?`,
    [status, ticketId],
  );
  return result.affectedRows > 0;
}

/**
 * Get all responses for a ticket (threaded).
 */
export async function getResponses(ticketId: number): Promise<TicketResponse[]> {
  const [rows] = await pool.execute<ResponseRow[]>(
    `SELECT r.*, a.name AS admin_name
     FROM ticket_responses r
     LEFT JOIN admin_users a ON r.admin_id = a.id
     WHERE r.ticket_id = ?
     ORDER BY r.created_at ASC`,
    [ticketId],
  );
  return rows.map(mapResponse);
}

/**
 * Add a response to a ticket.
 */
export async function addResponse(data: {
  ticketId: number;
  adminId: number | null;
  message: string;
  isInternal: boolean;
}): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO ticket_responses (ticket_id, admin_id, message, is_internal)
     VALUES (?, ?, ?, ?)`,
    [data.ticketId, data.adminId ?? null, data.message, data.isInternal ? 1 : 0],
  );
  return result.insertId;
}

/**
 * Get dashboard statistics.
 */
export async function getStats(): Promise<{
  total: number;
  byStatus: Record<string, number>;
  overdueCount: number;
  todayCount: number;
}> {
  const [totalResult] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM chat_tickets WHERE status != 'ARCHIVED'`,
  );

  const [statusResult] = await pool.execute<RowDataPacket[]>(
    `SELECT status, COUNT(*) as count FROM chat_tickets GROUP BY status`,
  );

  const [overdueResult] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as count FROM chat_tickets
     WHERE status NOT IN ('RESOLVED', 'ARCHIVED')
     AND sla_deadline < NOW()`,
  );

  const [todayResult] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as count FROM chat_tickets
     WHERE DATE(created_at) = CURDATE()`,
  );

  const byStatus: Record<string, number> = {};
  for (const row of statusResult) {
    byStatus[(row as any).status] = (row as any).count;
  }

  return {
    total: (totalResult[0] as any).total,
    byStatus,
    overdueCount: (overdueResult[0] as any).count,
    todayCount: (todayResult[0] as any).count,
  };
}

/**
 * Find all tickets matching filters for CSV export (no pagination).
 */
export async function findAllForExport(options: {
  status?: TicketStatus;
  departmentId?: number;
}): Promise<ChatTicket[]> {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options.status) {
    conditions.push('t.status = ?');
    params.push(options.status);
  }
  if (options.departmentId) {
    conditions.push('t.department_id = ?');
    params.push(options.departmentId);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  const [rows] = await pool.execute<TicketRow[]>(
    `SELECT t.*, d.name AS department_name, a.name AS assigned_to_name
     FROM chat_tickets t
     LEFT JOIN departments d ON t.department_id = d.id
     LEFT JOIN admin_users a ON t.assigned_to = a.id
     ${whereClause}
     ORDER BY t.created_at DESC`,
    params,
  );

  return rows.map(mapTicket);
}
