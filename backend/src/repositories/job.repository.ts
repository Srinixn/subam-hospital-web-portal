import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database.js';
import { Job, JobWithDepartment } from '../types/index.js';

export class JobRepository {
  async findAll(includeDrafts: boolean = false): Promise<JobWithDepartment[]> {
    let query = `
      SELECT j.id, j.department_id as departmentId, j.title, j.slug, j.description, j.requirements, j.employment_type as employmentType, j.status, j.created_at as createdAt, j.updated_at as updatedAt, d.name as departmentName
      FROM jobs j
      LEFT JOIN departments d ON j.department_id = d.id
    `;
    
    if (!includeDrafts) {
      query += ` WHERE j.status = 'Published'`;
    }
    
    query += ` ORDER BY j.created_at DESC`;

    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows as JobWithDepartment[];
  }

  async findById(id: number): Promise<JobWithDepartment | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT j.id, j.department_id as departmentId, j.title, j.slug, j.description, j.requirements, j.employment_type as employmentType, j.status, j.created_at as createdAt, j.updated_at as updatedAt, d.name as departmentName
      FROM jobs j
      LEFT JOIN departments d ON j.department_id = d.id
      WHERE j.id = ?
      `,
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as JobWithDepartment;
  }

  async findBySlug(slug: string): Promise<JobWithDepartment | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT j.id, j.department_id as departmentId, j.title, j.slug, j.description, j.requirements, j.employment_type as employmentType, j.status, j.created_at as createdAt, j.updated_at as updatedAt, d.name as departmentName
      FROM jobs j
      LEFT JOIN departments d ON j.department_id = d.id
      WHERE j.slug = ? AND j.status = 'Published'
      `,
      [slug]
    );
    if (rows.length === 0) return null;
    return rows[0] as JobWithDepartment;
  }

  async create(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO jobs (department_id, title, slug, description, requirements, employment_type, status)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [job.departmentId, job.title, job.slug, job.description, job.requirements, job.employmentType, job.status]
    );
    return result.insertId;
  }

  async update(id: number, job: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (job.departmentId !== undefined) { fields.push('department_id = ?'); values.push(job.departmentId); }
    if (job.title !== undefined) { fields.push('title = ?'); values.push(job.title); }
    if (job.slug !== undefined) { fields.push('slug = ?'); values.push(job.slug); }
    if (job.description !== undefined) { fields.push('description = ?'); values.push(job.description); }
    if (job.requirements !== undefined) { fields.push('requirements = ?'); values.push(job.requirements); }
    if (job.employmentType !== undefined) { fields.push('employment_type = ?'); values.push(job.employmentType); }
    if (job.status !== undefined) { fields.push('status = ?'); values.push(job.status); }

    if (fields.length === 0) return true;

    values.push(id);
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE jobs SET ${fields.join(', ')} WHERE id = ?`,
      values
    );
    return result.affectedRows > 0;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      `DELETE FROM jobs WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
