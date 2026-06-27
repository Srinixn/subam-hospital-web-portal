// ─────────────────────────────────────────────
//  Feedback repository — data access for the `feedbacks` table
// ─────────────────────────────────────────────
import pool from '../config/database.js';
import type { Feedback } from '../types/index.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

interface FeedbackRow extends RowDataPacket {
  id: number;
  patient_name: string;
  phone: string | null;
  email: string | null;
  rating: number;
  comments: string;
  is_read: boolean;
  created_at: Date;
}

/** Map a database row to a Feedback domain object. */
function toFeedback(row: FeedbackRow): Feedback {
  return {
    id: row.id,
    patientName: row.patient_name,
    phone: row.phone,
    email: row.email,
    rating: row.rating,
    comments: row.comments,
    isRead: row.is_read,
    createdAt: row.created_at,
  };
}

/** Insert a new feedback submission. */
export async function create(data: {
  patientName: string;
  phone?: string;
  email?: string;
  rating: number;
  comments: string;
}): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO feedbacks (patient_name, phone, email, rating, comments)
     VALUES (?, ?, ?, ?, ?)`,
    [data.patientName, data.phone || null, data.email || null, data.rating, data.comments],
  );
  return result.insertId;
}

/** Fetch paginated feedbacks, optionally filtered by read status and/or rating. */
export async function findAll(options: {
  page: number;
  limit: number;
  isRead?: boolean;
  rating?: number;
}): Promise<{ rows: Feedback[]; total: number }> {
  const { page, limit, isRead, rating } = options;
  const offset = (page - 1) * limit;

  const conditions: string[] = [];
  const filterParams: number[] = [];

  if (isRead !== undefined) {
    conditions.push('is_read = ?');
    filterParams.push(isRead ? 1 : 0);
  }

  if (rating !== undefined) {
    conditions.push('rating = ?');
    filterParams.push(rating);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  // Count total
  const [countRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) AS total FROM feedbacks ${whereClause}`,
    filterParams,
  );
  const total = (countRows[0] as any).total;

  // Fetch page — use query() instead of execute() to avoid
  // prepared-statement issues with mixed param types for LIMIT/OFFSET
  const [rows] = await pool.query<FeedbackRow[]>(
    `SELECT * FROM feedbacks ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
    [...filterParams, limit, offset],
  );

  return { rows: rows.map(toFeedback), total };
}

/** Find a single feedback by ID. */
export async function findById(id: number): Promise<Feedback | null> {
  const [rows] = await pool.execute<FeedbackRow[]>(
    'SELECT * FROM feedbacks WHERE id = ?',
    [id],
  );
  return rows.length > 0 ? toFeedback(rows[0]) : null;
}

/** Update the is_read flag for a feedback. */
export async function updateReadStatus(
  id: number,
  isRead: boolean,
): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    'UPDATE feedbacks SET is_read = ? WHERE id = ?',
    [isRead ? 1 : 0, id],
  );
  return result.affectedRows > 0;
}

/** Fetch testimonials (feedbacks with rating > 3) for public display. */
export async function findTestimonials(): Promise<Feedback[]> {
  const [rows] = await pool.query<FeedbackRow[]>(
    'SELECT * FROM feedbacks WHERE rating > 3 ORDER BY created_at DESC LIMIT 100'
  );
  return rows.map(toFeedback);
}
