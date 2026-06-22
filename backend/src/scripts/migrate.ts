// ─────────────────────────────────────────────
//  Database migration script
//  Creates all required tables. Idempotent (uses IF NOT EXISTS).
//  Run: npm run migrate
// ─────────────────────────────────────────────
import 'dotenv/config';
import pool from '../config/database.js';

const MIGRATIONS: { name: string; sql: string }[] = [
  {
    name: 'Create contacts table',
    sql: `
      CREATE TABLE IF NOT EXISTS contacts (
        id            INT           AUTO_INCREMENT PRIMARY KEY,
        full_name     VARCHAR(100)  NOT NULL,
        phone         VARCHAR(20)   NOT NULL,
        email         VARCHAR(255)  NOT NULL,
        inquiry_type  VARCHAR(50)   NOT NULL,
        message       TEXT          NOT NULL,
        is_read       TINYINT(1)    NOT NULL DEFAULT 0,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_contacts_created_at (created_at DESC),
        INDEX idx_contacts_is_read (is_read)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create feedbacks table',
    sql: `
      CREATE TABLE IF NOT EXISTS feedbacks (
        id            INT           AUTO_INCREMENT PRIMARY KEY,
        patient_name  VARCHAR(100)  NOT NULL,
        phone         VARCHAR(20)   NULL,
        email         VARCHAR(255)  NULL,
        rating        TINYINT       NOT NULL,
        comments      TEXT          NOT NULL,
        is_read       TINYINT(1)    NOT NULL DEFAULT 0,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_feedbacks_created_at (created_at DESC),
        INDEX idx_feedbacks_rating (rating),

        CONSTRAINT chk_rating CHECK (rating >= 1 AND rating <= 5)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create admin_users table',
    sql: `
      CREATE TABLE IF NOT EXISTS admin_users (
        id            INT           AUTO_INCREMENT PRIMARY KEY,
        name          VARCHAR(100)  NOT NULL,
        email         VARCHAR(255)  NOT NULL,
        password_hash VARCHAR(255)  NOT NULL,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        UNIQUE INDEX idx_admin_users_email (email)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Drop deprecated tables (if they exist)',
    sql: `DROP TABLE IF EXISTS applications, departments;`,
  },
  {
    name: 'Create jobs table',
    sql: `
      CREATE TABLE IF NOT EXISTS jobs (
        id                INT           AUTO_INCREMENT PRIMARY KEY,
        title             VARCHAR(255)  NOT NULL,
        slug              VARCHAR(255)  NOT NULL,
        description       TEXT          NOT NULL,
        requirements      TEXT          NOT NULL,
        location          ENUM('Sun Srishti Speciality Hospital', 'Sunsrishti Fertility Center', 'Subam Hospital') NOT NULL,
        employment_type   ENUM('Full-time', 'Part-time', 'Contract') NOT NULL,
        status            ENUM('Draft', 'Published', 'Closed') NOT NULL DEFAULT 'Draft',
        linkedin_job_url  VARCHAR(255)  NOT NULL,
        created_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at        TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        UNIQUE INDEX idx_jobs_slug (slug),
        INDEX idx_jobs_status (status)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
];

async function migrate(): Promise<void> {
  console.log('─── Starting database migration ───\n');

  const connection = await pool.getConnection();

  try {
    // Attempt to alter the jobs table if it already exists from a previous migration
    try {
      await connection.execute(`
        ALTER TABLE jobs
        DROP FOREIGN KEY fk_jobs_department,
        DROP COLUMN department_id,
        ADD COLUMN location ENUM('Sun Srishti Speciality Hospital', 'Sunsrishti Fertility Center', 'Subam Hospital') NOT NULL DEFAULT 'Subam Hospital',
        ADD COLUMN linkedin_job_url VARCHAR(255) NOT NULL DEFAULT '';
      `);
      console.log('  ✓ Altered existing jobs table schema.');
    } catch (e: any) {
      // Ignore errors (e.g., table doesn't exist, or columns already altered)
    }

    for (const migration of MIGRATIONS) {
      console.log(`  Running: ${migration.name}...`);
      await connection.execute(migration.sql);
      console.log(`  ✓ ${migration.name} — done`);
    }

    console.log('\n─── All migrations completed successfully ───');
  } catch (err) {
    console.error('\n✗ Migration failed:', err);
    process.exit(1);
  } finally {
    connection.release();
    await pool.end();
  }
}

migrate();
