// ─────────────────────────────────────────────
//  Express application configuration
// ─────────────────────────────────────────────
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import MySQLStoreFactory from 'express-mysql-session';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import pool from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requireAuth } from './middleware/auth.js';
import publicRoutes from './routes/public.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import chatRoutes from './routes/chat.routes.js';
import chatAdminRoutes from './routes/chatAdmin.routes.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Create the MySQL session store.
// express-mysql-session expects the non-promise mysql2 pool,
// but we use the promise-based pool internally. We pass the
// underlying promisePool options to the store constructor.
const MySQLStore = MySQLStoreFactory(session as any);

const sessionStore = new MySQLStore({
  clearExpired: true,
  checkExpirationInterval: 900_000, // 15 minutes
  expiration: 86_400_000,           // 24 hours
  createDatabaseTable: true,        // auto-create `sessions` table
  schema: {
    tableName: 'sessions',
    columnNames: {
      session_id: 'session_id',
      expires: 'expires',
      data: 'data',
    },
  },
}, pool as any);

export function createApp(): express.Express {
  const app = express();

  // ── Ensure upload directories exist ──
  const uploadsDir = path.resolve(__dirname, '../uploads/tickets');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // ── Security headers ──
  app.use(helmet({
    // Relax CSP when serving frontend in production
    contentSecurityPolicy: false,
  }));

  // ── CORS ──
  const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000')
    .split(',')
    .map((o) => o.trim());

  app.use(cors({
    origin: allowedOrigins,
    credentials: true,
  }));

  // ── Body parsing ──
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true }));

  // ── Static file serving for uploads ──
  app.use('/uploads', express.static(path.resolve(__dirname, '../uploads')));

  // ── Sessions ──
  app.use(session({
    name: 'subam.sid',
    secret: process.env.SESSION_SECRET || 'dev-secret-change-me',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  }));

  // ── Health check ──
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ── API routes ──
  app.use('/api/public', publicRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/admin', requireAuth, adminRoutes);
  app.use('/api/chat', chatRoutes);
  app.use('/api/chat-admin', chatAdminRoutes);

  // ── Global error handler (must be last) ──
  app.use(errorHandler);

  return app;
}

