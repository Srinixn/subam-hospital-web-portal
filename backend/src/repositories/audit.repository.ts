// ─────────────────────────────────────────────
//  Audit log repository — append-only insert
//  for comprehensive admin action tracking.
// ─────────────────────────────────────────────
import pool from '../config/database.js';
import type { AuditLog } from '../types/index.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

interface AuditRow extends RowDataPacket {
  id: number;
  admin_id: number | null;
  action: string;
  entity: string;
  entity_id: number | null;
  details: string | null;
  ip_address: string | null;
  created_at: Date;
  admin_name?: string;
}

function mapRow(row: AuditRow): AuditLog {
  return {
    id: row.id,
    adminId: row.admin_id,
    action: row.action,
    entity: row.entity,
    entityId: row.entity_id,
    details: row.details,
    ipAddress: row.ip_address,
    createdAt: row.created_at,
    adminName: row.admin_name,
  };
}

/**
 * Log an admin action. This is append-only — no updates or deletes.
 *
 * @param adminId - The admin who performed the action (null for system actions)
 * @param action - What was done (e.g., 'ASSIGN_TICKET', 'UPDATE_STATUS', 'CREATE_FAQ')
 * @param entity - Which entity type (e.g., 'chat_ticket', 'faq_document')
 * @param entityId - The ID of the affected entity
 * @param details - JSON string with additional context
 * @param ipAddress - The IP address of the admin
 */
export async function logAction(data: {
  adminId: number | null;
  action: string;
  entity: string;
  entityId?: number | null;
  details?: string | null;
  ipAddress?: string | null;
}): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO audit_logs (admin_id, action, entity, entity_id, details, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      data.adminId,
      data.action,
      data.entity,
      data.entityId ?? null,
      data.details ?? null,
      data.ipAddress ?? null,
    ],
  );
  return result.insertId;
}

/**
 * Fetch paginated audit logs with optional filters.
 */
export async function findAll(options: {
  page: number;
  limit: number;
  adminId?: number;
  action?: string;
  entity?: string;
}): Promise<{ rows: AuditLog[]; total: number }> {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options.adminId) {
    conditions.push('l.admin_id = ?');
    params.push(options.adminId);
  }
  if (options.action) {
    conditions.push('l.action = ?');
    params.push(options.action);
  }
  if (options.entity) {
    conditions.push('l.entity = ?');
    params.push(options.entity);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  // Count
  const [countResult] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM audit_logs l ${whereClause}`,
    params,
  );
  const total = (countResult[0] as any).total;

  // Fetch
  const offset = (options.page - 1) * options.limit;
  const [rows] = await pool.execute<AuditRow[]>(
    `SELECT l.*, a.name AS admin_name
     FROM audit_logs l
     LEFT JOIN admin_users a ON l.admin_id = a.id
     ${whereClause}
     ORDER BY l.created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, String(options.limit), String(offset)],
  );

  return { rows: rows.map(mapRow), total };
}
