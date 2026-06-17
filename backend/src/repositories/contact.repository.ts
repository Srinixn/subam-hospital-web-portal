// ─────────────────────────────────────────────
//  Contact repository — data access for the `contacts` table
// ─────────────────────────────────────────────
import pool from '../config/database.js';
import type { Contact } from '../types/index.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

interface ContactRow extends RowDataPacket {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  inquiry_type: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

/** Map a database row to a Contact domain object. */
function toContact(row: ContactRow): Contact {
  return {
    id: row.id,
    fullName: row.full_name,
    phone: row.phone,
    email: row.email,
    inquiryType: row.inquiry_type,
    message: row.message,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

/** Insert a new contact submission. */
export async function create(data: {
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
}): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO contacts (full_name, phone, email, inquiry_type, message)
     VALUES (?, ?, ?, ?, ?)`,
    [data.fullName, data.phone, data.email, data.inquiryType, data.message],
  );
  return result.insertId;
}

/** Fetch paginated contacts, optionally filtered by read status. */
export async function findAll(options: {
  page: number;
  limit: number;
  isRead?: boolean;
}): Promise<{ rows: Contact[]; total: number }> {
  const { page, limit, isRead } = options;
  const offset = (page - 1) * limit;

  let whereClause = '';
  const filterParams: number[] = [];

  if (isRead !== undefined) {
    whereClause = 'WHERE is_read = ?';
    filterParams.push(isRead ? 1 : 0);
  }

  // Count total
  const [countRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM contacts ${whereClause}`,
    filterParams,
  );
  const total = (countRows[0] as any).total;

  // Fetch page — use query() instead of execute() to avoid
  // prepared-statement issues with mixed param types for LIMIT/OFFSET
  const [rows] = await pool.query<ContactRow[]>(
    `SELECT * FROM contacts ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...filterParams, limit, offset],
  );

  return { rows: rows.map(toContact), total };
}

/** Find a single contact by ID. */
export async function findById(id: number): Promise<Contact | null> {
  const [rows] = await pool.execute<ContactRow[]>(
    'SELECT * FROM contacts WHERE id = ?',
    [id],
  );
  return rows.length > 0 ? toContact(rows[0]) : null;
}

/** Update the is_read flag for a contact. */
export async function updateReadStatus(
  id: number,
  isRead: boolean,
): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE contacts SET is_read = ? WHERE id = ?',
    [isRead ? 1 : 0, id],
  );
  return result.affectedRows > 0;
}
