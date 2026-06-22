import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database.js';
import { Application, ApplicationWithJob } from '../types/index.js';

export class ApplicationRepository {
  async findAll(): Promise<ApplicationWithJob[]> {
    const query = `
      SELECT 
        a.id, a.job_id as jobId, a.first_name as firstName, a.last_name as lastName, 
        a.email, a.phone, a.experience_years as experienceYears, a.status, 
        a.resume_file_path as resumeFilePath, a.resume_original_name as resumeOriginalName, 
        a.created_at as createdAt, a.updated_at as updatedAt,
        j.title as jobTitle, d.name as departmentName
      FROM applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      LEFT JOIN departments d ON j.department_id = d.id
      ORDER BY a.created_at DESC
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query);
    return rows as ApplicationWithJob[];
  }

  async findById(id: number): Promise<ApplicationWithJob | null> {
    const query = `
      SELECT 
        a.id, a.job_id as jobId, a.first_name as firstName, a.last_name as lastName, 
        a.email, a.phone, a.experience_years as experienceYears, a.status, 
        a.resume_file_path as resumeFilePath, a.resume_original_name as resumeOriginalName, 
        a.created_at as createdAt, a.updated_at as updatedAt,
        j.title as jobTitle, d.name as departmentName
      FROM applications a
      LEFT JOIN jobs j ON a.job_id = j.id
      LEFT JOIN departments d ON j.department_id = d.id
      WHERE a.id = ?
    `;
    const [rows] = await pool.query<RowDataPacket[]>(query, [id]);
    if (rows.length === 0) return null;
    return rows[0] as ApplicationWithJob;
  }

  async create(data: Omit<Application, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO applications 
        (job_id, first_name, last_name, email, phone, experience_years, resume_file_path, resume_original_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.jobId, data.firstName, data.lastName, data.email, data.phone, 
        data.experienceYears, data.resumeFilePath, data.resumeOriginalName
      ]
    );
    return result.insertId;
  }

  async updateStatus(id: number, status: Application['status']): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      `UPDATE applications SET status = ? WHERE id = ?`,
      [status, id]
    );
    return result.affectedRows > 0;
  }
}
