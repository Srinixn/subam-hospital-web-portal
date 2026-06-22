import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database.js';
import { Job } from '../types/index.js';

export class JobRepository {
  async findAll(includeDrafts: boolean = false): Promise<Job[]> {
    let query = `
      SELECT id, title, slug, description, requirements, location, employment_type as employmentType, status, linkedin_job_url as linkedinJobUrl, created_at as createdAt, updated_at as updatedAt
      FROM jobs
    `;
    
    if (!includeDrafts) {
      query += ` WHERE status = 'Published'`;
    }
    
    query += ` ORDER BY created_at DESC`;

    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows as Job[];
  }

  async findById(id: number): Promise<Job | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT id, title, slug, description, requirements, location, employment_type as employmentType, status, linkedin_job_url as linkedinJobUrl, created_at as createdAt, updated_at as updatedAt
      FROM jobs
      WHERE id = ?
      `,
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as Job;
  }

  async findBySlug(slug: string): Promise<Job | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `
      SELECT id, title, slug, description, requirements, location, employment_type as employmentType, status, linkedin_job_url as linkedinJobUrl, created_at as createdAt, updated_at as updatedAt
      FROM jobs
      WHERE slug = ? AND status = 'Published'
      `,
      [slug]
    );
    if (rows.length === 0) return null;
    return rows[0] as Job;
  }

  async create(job: Omit<Job, 'id' | 'createdAt' | 'updatedAt'>): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO jobs (title, slug, description, requirements, location, employment_type, status, linkedin_job_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [job.title, job.slug, job.description, job.requirements, job.location, job.employmentType, job.status, job.linkedinJobUrl]
    );
    return result.insertId;
  }

  async update(id: number, job: Partial<Omit<Job, 'id' | 'createdAt' | 'updatedAt'>>): Promise<boolean> {
    const fields: string[] = [];
    const values: any[] = [];

    if (job.title !== undefined) { fields.push('title = ?'); values.push(job.title); }
    if (job.slug !== undefined) { fields.push('slug = ?'); values.push(job.slug); }
    if (job.description !== undefined) { fields.push('description = ?'); values.push(job.description); }
    if (job.requirements !== undefined) { fields.push('requirements = ?'); values.push(job.requirements); }
    if (job.location !== undefined) { fields.push('location = ?'); values.push(job.location); }
    if (job.employmentType !== undefined) { fields.push('employment_type = ?'); values.push(job.employmentType); }
    if (job.status !== undefined) { fields.push('status = ?'); values.push(job.status); }
    if (job.linkedinJobUrl !== undefined) { fields.push('linkedin_job_url = ?'); values.push(job.linkedinJobUrl); }

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
