import { ResultSetHeader, RowDataPacket } from 'mysql2';
import pool from '../config/database.js';
import { Department } from '../types/index.js';

export class DepartmentRepository {
  async findAll(): Promise<Department[]> {
    const [rows] = await pool.query<RowDataPacket[]>(`
      SELECT id, name, created_at as createdAt
      FROM departments
      ORDER BY name ASC
    `);
    return rows as Department[];
  }

  async findById(id: number): Promise<Department | null> {
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT id, name, created_at as createdAt FROM departments WHERE id = ?`,
      [id]
    );
    if (rows.length === 0) return null;
    return rows[0] as Department;
  }

  async create(name: string): Promise<number> {
    const [result] = await pool.query<ResultSetHeader>(
      `INSERT INTO departments (name) VALUES (?)`,
      [name]
    );
    return result.insertId;
  }

  async delete(id: number): Promise<boolean> {
    const [result] = await pool.query<ResultSetHeader>(
      `DELETE FROM departments WHERE id = ?`,
      [id]
    );
    return result.affectedRows > 0;
  }
}
