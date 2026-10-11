// ─────────────────────────────────────────────
//  Database creation script
//  Creates the database if it doesn't exist.
// ─────────────────────────────────────────────
import 'dotenv/config';
import mysql from 'mysql2/promise';

async function createDatabase(): Promise<void> {
  const host = process.env.DB_HOST || 'localhost';
  const port = Number(process.env.DB_PORT) || 3306;
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'demo_hospital';

  console.log(`Connecting to MySQL at ${host}:${port} as ${user} to verify/create database...`);

  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });

  try {
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\``);
    console.log(`✓ Database "${dbName}" verified/created successfully.`);
  } finally {
    await connection.end();
  }
}

createDatabase().catch((err) => {
  console.error('✗ Failed to create database:', err);
  process.exit(1);
});
