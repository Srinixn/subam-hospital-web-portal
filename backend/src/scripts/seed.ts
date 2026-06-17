// ─────────────────────────────────────────────
//  Database seed script
//  Seeds the default admin user. Idempotent (skips if user exists).
//  Run: npm run seed
// ─────────────────────────────────────────────
import 'dotenv/config';
import bcrypt from 'bcrypt';
import pool from '../config/database.js';

const SALT_ROUNDS = 12;

// Default admin credentials — change the password after first login!
const DEFAULT_ADMIN = {
  name: 'Hospital Manager',
  email: 'admin@subamhospital.com',
  password: 'Subam@2026',
};

async function seed(): Promise<void> {
  console.log('─── Starting database seed ───\n');

  const connection = await pool.getConnection();

  try {
    // Check if the admin user already exists
    const [existing] = await connection.execute<any[]>(
      'SELECT id FROM admin_users WHERE email = ?',
      [DEFAULT_ADMIN.email],
    );

    if (existing.length > 0) {
      console.log(`  ⓘ Admin user "${DEFAULT_ADMIN.email}" already exists — skipping.`);
      console.log('\n─── Seed completed (no changes) ───');
      return;
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(DEFAULT_ADMIN.password, SALT_ROUNDS);

    // Insert the admin user
    await connection.execute(
      'INSERT INTO admin_users (name, email, password_hash) VALUES (?, ?, ?)',
      [DEFAULT_ADMIN.name, DEFAULT_ADMIN.email, passwordHash],
    );

    console.log(`  ✓ Admin user created:`);
    console.log(`    Email:    ${DEFAULT_ADMIN.email}`);
    console.log(`    Password: ${DEFAULT_ADMIN.password}`);
    console.log(`    ⚠ Change this password after first login!`);
    console.log('\n─── Seed completed successfully ───');
  } catch (err) {
    console.error('\n✗ Seed failed:', err);
    process.exit(1);
  } finally {
    connection.release();
    await pool.end();
  }
}

seed();
