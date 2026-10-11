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
    sql: `DROP TABLE IF EXISTS applications;`,
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
        location          ENUM('Sun Srishti Speciality Hospital', 'Example Fertility Center', 'Demo Hospital') NOT NULL,
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

  // ─────────────────────────────────────────
  //  Chatbot System Tables
  // ─────────────────────────────────────────

  {
    name: 'Create departments table',
    sql: `
      CREATE TABLE IF NOT EXISTS departments (
        id            INT           AUTO_INCREMENT PRIMARY KEY,
        name          VARCHAR(100)  NOT NULL,
        description   TEXT          NULL,
        is_active     TINYINT(1)    NOT NULL DEFAULT 1,
        created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        UNIQUE INDEX idx_departments_name (name),
        INDEX idx_departments_active (is_active)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create faq_documents table',
    sql: `
      CREATE TABLE IF NOT EXISTS faq_documents (
        id              INT           AUTO_INCREMENT PRIMARY KEY,
        title           VARCHAR(255)  NOT NULL,
        content         TEXT          NOT NULL,
        department_id   INT           NULL,
        embedding_json  JSON          NULL COMMENT 'Float array for cosine similarity — computed in Node.js',
        tags            VARCHAR(500)  NULL,
        is_active       TINYINT(1)    NOT NULL DEFAULT 1,
        created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        INDEX idx_faq_department (department_id),
        INDEX idx_faq_active (is_active),
        FULLTEXT INDEX idx_faq_search (title, content),

        CONSTRAINT fk_faq_department
          FOREIGN KEY (department_id)
          REFERENCES departments(id)
          ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create chat_tickets table',
    sql: `
      CREATE TABLE IF NOT EXISTS chat_tickets (
        id              INT           AUTO_INCREMENT PRIMARY KEY,
        name            VARCHAR(100)  NOT NULL,
        email           VARCHAR(255)  NULL,
        phone           VARCHAR(20)   NULL,
        department_id   INT           NULL,
        message         TEXT          NOT NULL,
        file_path       VARCHAR(500)  NULL,
        file_name       VARCHAR(255)  NULL,
        status          ENUM('NEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED')
                                      NOT NULL DEFAULT 'NEW',
        assigned_to     INT           NULL,
        privacy_consent TINYINT(1)    NOT NULL DEFAULT 0,
        access_token    VARCHAR(64)   NULL,
        sla_deadline    TIMESTAMP     NULL,
        created_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at      TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        INDEX idx_tickets_status (status),
        INDEX idx_tickets_department (department_id),
        INDEX idx_tickets_assigned (assigned_to),
        INDEX idx_tickets_created (created_at DESC),
        INDEX idx_tickets_sla (sla_deadline),

        CONSTRAINT fk_tickets_department
          FOREIGN KEY (department_id)
          REFERENCES departments(id)
          ON DELETE SET NULL,

        CONSTRAINT fk_tickets_assigned
          FOREIGN KEY (assigned_to)
          REFERENCES admin_users(id)
          ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create ticket_responses table',
    sql: `
      CREATE TABLE IF NOT EXISTS ticket_responses (
        id          INT           AUTO_INCREMENT PRIMARY KEY,
        ticket_id   INT           NOT NULL,
        admin_id    INT           NULL,
        message     TEXT          NOT NULL,
        is_internal TINYINT(1)    NOT NULL DEFAULT 0 COMMENT 'True for internal notes, false for replies',
        created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_responses_ticket (ticket_id),
        INDEX idx_responses_admin (admin_id),

        CONSTRAINT fk_responses_ticket
          FOREIGN KEY (ticket_id)
          REFERENCES chat_tickets(id)
          ON DELETE CASCADE,

        CONSTRAINT fk_responses_admin
          FOREIGN KEY (admin_id)
          REFERENCES admin_users(id)
          ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create audit_logs table',
    sql: `
      CREATE TABLE IF NOT EXISTS audit_logs (
        id          INT           AUTO_INCREMENT PRIMARY KEY,
        admin_id    INT           NULL,
        action      VARCHAR(100)  NOT NULL,
        entity      VARCHAR(100)  NOT NULL,
        entity_id   INT           NULL,
        details     JSON          NULL,
        ip_address  VARCHAR(45)   NULL,
        created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,

        INDEX idx_audit_admin (admin_id),
        INDEX idx_audit_action (action),
        INDEX idx_audit_entity (entity, entity_id),
        INDEX idx_audit_created (created_at DESC),

        CONSTRAINT fk_audit_admin
          FOREIGN KEY (admin_id)
          REFERENCES admin_users(id)
          ON DELETE SET NULL
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `,
  },
  {
    name: 'Create auto-archive event for resolved tickets',
    sql: `
      CREATE EVENT IF NOT EXISTS auto_archive_resolved_tickets
      ON SCHEDULE EVERY 1 DAY
      STARTS CURRENT_TIMESTAMP
      DO
        UPDATE chat_tickets
        SET status = 'ARCHIVED'
        WHERE status = 'RESOLVED'
          AND updated_at < DATE_SUB(NOW(), INTERVAL 180 DAY);
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
        ADD COLUMN location ENUM('Sun Srishti Speciality Hospital', 'Example Fertility Center', 'Demo Hospital') NOT NULL DEFAULT 'Demo Hospital',
        ADD COLUMN linkedin_job_url VARCHAR(255) NOT NULL DEFAULT '';
      `);
      console.log('  ✓ Altered existing jobs table schema.');
    } catch (e: any) {
      // Ignore errors (e.g., table doesn't exist, or columns already altered)
    }

    // Attempt to alter the chat_tickets table to add access_token column if missing
    try {
      await connection.query(`
        ALTER TABLE chat_tickets
        ADD COLUMN access_token VARCHAR(64) NULL;
      `);
      console.log('  ✓ Added access_token column to existing chat_tickets table.');
    } catch (e: any) {
      // Ignore error if column already exists (ER_DUP_FIELDNAME)
    }

    // Enable event scheduler for the auto-archive event
    try {
      await connection.query('SET GLOBAL event_scheduler = ON;');
      console.log('  ✓ Event scheduler enabled.');
    } catch (e: any) {
      console.log('  ⓘ Could not enable event scheduler (may require SUPER privilege).');
    }

    for (const migration of MIGRATIONS) {
      console.log(`  Running: ${migration.name}...`);
      await connection.query(migration.sql);
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
