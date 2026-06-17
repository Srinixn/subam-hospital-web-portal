// ─────────────────────────────────────────────
//  MySQL connection pool configuration
// ─────────────────────────────────────────────
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'subam_hospital',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Convert MySQL TINYINT(1) to boolean
  typeCast: (field, next) => {
    if (field.type === 'TINY' && field.length === 1) {
      return field.string() === '1';
    }
    return next();
  },
});

/**
 * Test the database connection.
 * Called once at server startup to fail fast if the DB is unreachable.
 */
export async function testConnection(): Promise<void> {
  const connection = await pool.getConnection();
  try {
    await connection.ping();
    console.log('✓ MySQL connection established');
  } finally {
    connection.release();
  }
}

export default pool;
