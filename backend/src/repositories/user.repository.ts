// ─────────────────────────────────────────────
//  User repository — data access for the `admin_users` table
// ─────────────────────────────────────────────
import pool from '../config/database.js';
import type { AdminUser, SafeAdminUser } from '../types/index.js';
import type { RowDataPacket } from 'mysql2';

interface UserRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  created_at: Date;
}

/** Map a database row to an AdminUser domain object. */
function toAdminUser(row: UserRow): AdminUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    passwordHash: row.password_hash,
    createdAt: row.created_at,
  };
}

/** Strip sensitive fields for API responses. */
export function toSafeUser(user: AdminUser): SafeAdminUser {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/** Find an admin user by email. Used for login. */
export async function findByEmail(email: string): Promise<AdminUser | null> {
  const [rows] = await pool.execute<UserRow[]>(
    'SELECT * FROM admin_users WHERE email = ?',
    [email],
  );
  return rows.length > 0 ? toAdminUser(rows[0]) : null;
}

/** Find an admin user by ID. Used for session lookup. */
export async function findById(id: number): Promise<AdminUser | null> {
  const [rows] = await pool.execute<UserRow[]>(
    'SELECT * FROM admin_users WHERE id = ?',
    [id],
  );
  return rows.length > 0 ? toAdminUser(rows[0]) : null;
}
