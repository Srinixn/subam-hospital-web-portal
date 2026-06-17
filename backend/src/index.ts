// ─────────────────────────────────────────────
//  Server entry point
// ─────────────────────────────────────────────
import 'dotenv/config';
import { createApp } from './app.js';
import { testConnection } from './config/database.js';

const PORT = Number(process.env.PORT) || 4000;

async function main(): Promise<void> {
  // Verify database connectivity before accepting requests
  try {
    await testConnection();
  } catch (err) {
    console.error('✗ Failed to connect to MySQL:', err);
    console.error('  Ensure your .env has correct DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
    process.exit(1);
  }

  const app = createApp();

  app.listen(PORT, () => {
    console.log(`✓ Subam Hospital API running on http://localhost:${PORT}`);
    console.log(`  Health check: http://localhost:${PORT}/api/health`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

main();
