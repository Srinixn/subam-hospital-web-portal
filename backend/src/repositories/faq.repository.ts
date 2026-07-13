// ─────────────────────────────────────────────
//  FAQ document repository — MySQL CRUD for
//  the knowledge base used by the RAG pipeline.
// ─────────────────────────────────────────────
import pool from '../config/database.js';
import type { FaqDocument } from '../types/index.js';
import type { ResultSetHeader, RowDataPacket } from 'mysql2';

/** Row shape returned by FAQ queries with department join. */
interface FaqRow extends RowDataPacket {
  id: number;
  title: string;
  content: string;
  department_id: number | null;
  embedding_json: string | null;
  tags: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
  department_name?: string;
}

/** Map a database row to a FaqDocument interface. */
function mapRow(row: FaqRow): FaqDocument {
  return {
    id: row.id,
    title: row.title,
    content: row.content,
    departmentId: row.department_id,
    embeddingJson: row.embedding_json ? JSON.parse(row.embedding_json) : null,
    tags: row.tags,
    isActive: row.is_active,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    departmentName: row.department_name,
  };
}

/**
 * Fetch all active FAQ documents with their embeddings.
 * Used by the RAG pipeline for similarity search.
 */
export async function findAllActive(): Promise<FaqDocument[]> {
  const [rows] = await pool.execute<FaqRow[]>(
    `SELECT f.*, d.name AS department_name
     FROM faq_documents f
     LEFT JOIN departments d ON f.department_id = d.id
     WHERE f.is_active = 1
     ORDER BY f.title ASC`,
  );
  return rows.map(mapRow);
}

/**
 * Fetch all FAQ documents (including inactive) for admin.
 */
export async function findAll(options: {
  page: number;
  limit: number;
  departmentId?: number;
  search?: string;
}): Promise<{ rows: FaqDocument[]; total: number }> {
  const conditions: string[] = [];
  const params: (string | number)[] = [];

  if (options.departmentId) {
    conditions.push('f.department_id = ?');
    params.push(options.departmentId);
  }

  if (options.search) {
    conditions.push('(f.title LIKE ? OR f.content LIKE ?)');
    const searchTerm = `%${options.search}%`;
    params.push(searchTerm, searchTerm);
  }

  const whereClause = conditions.length > 0
    ? `WHERE ${conditions.join(' AND ')}`
    : '';

  // Count total
  const [countResult] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) as total FROM faq_documents f ${whereClause}`,
    params,
  );
  const total = (countResult[0] as any).total;

  // Fetch page
  const offset = (options.page - 1) * options.limit;
  const [rows] = await pool.execute<FaqRow[]>(
    `SELECT f.*, d.name AS department_name
     FROM faq_documents f
     LEFT JOIN departments d ON f.department_id = d.id
     ${whereClause}
     ORDER BY f.updated_at DESC
     LIMIT ? OFFSET ?`,
    [...params, String(options.limit), String(offset)],
  );

  return { rows: rows.map(mapRow), total };
}

/**
 * Find a single FAQ document by ID.
 */
export async function findById(id: number): Promise<FaqDocument | null> {
  const [rows] = await pool.execute<FaqRow[]>(
    `SELECT f.*, d.name AS department_name
     FROM faq_documents f
     LEFT JOIN departments d ON f.department_id = d.id
     WHERE f.id = ?`,
    [id],
  );
  return rows.length > 0 ? mapRow(rows[0]) : null;
}

/**
 * Create a new FAQ document. Returns the inserted ID.
 */
export async function create(data: {
  title: string;
  content: string;
  departmentId?: number | null;
  embeddingJson?: number[] | null;
  tags?: string | null;
}): Promise<number> {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO faq_documents (title, content, department_id, embedding_json, tags)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.title,
      data.content,
      data.departmentId ?? null,
      data.embeddingJson ? JSON.stringify(data.embeddingJson) : null,
      data.tags ?? null,
    ],
  );
  return result.insertId;
}

/**
 * Update an existing FAQ document.
 */
export async function update(
  id: number,
  data: {
    title?: string;
    content?: string;
    departmentId?: number | null;
    embeddingJson?: number[] | null;
    tags?: string | null;
    isActive?: boolean;
  },
): Promise<boolean> {
  const fields: string[] = [];
  const params: (string | number | null)[] = [];

  if (data.title !== undefined) {
    fields.push('title = ?');
    params.push(data.title);
  }
  if (data.content !== undefined) {
    fields.push('content = ?');
    params.push(data.content);
  }
  if (data.departmentId !== undefined) {
    fields.push('department_id = ?');
    params.push(data.departmentId);
  }
  if (data.embeddingJson !== undefined) {
    fields.push('embedding_json = ?');
    params.push(data.embeddingJson ? JSON.stringify(data.embeddingJson) : null);
  }
  if (data.tags !== undefined) {
    fields.push('tags = ?');
    params.push(data.tags);
  }
  if (data.isActive !== undefined) {
    fields.push('is_active = ?');
    params.push(data.isActive ? 1 : 0);
  }

  if (fields.length === 0) return false;

  params.push(id);
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE faq_documents SET ${fields.join(', ')} WHERE id = ?`,
    params,
  );

  return result.affectedRows > 0;
}

/**
 * Soft-delete a FAQ document (set is_active = false).
 */
export async function softDelete(id: number): Promise<boolean> {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE faq_documents SET is_active = 0 WHERE id = ?`,
    [id],
  );
  return result.affectedRows > 0;
}
