// ─────────────────────────────────────────────
//  Chat routes — /api/chat/*
//  Public endpoints for the chatbot widget:
//  message processing, ticket submission, and
//  department listing.
// ─────────────────────────────────────────────
import { Router, Request, Response, NextFunction } from 'express';
import { body, param } from 'express-validator';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { handleValidationErrors } from '../middleware/validate.js';
import { chatMessageLimiter, ticketFormLimiter } from '../middleware/chatRateLimit.js';
import * as ragService from '../services/rag.service.js';
import * as ticketService from '../services/ticket.service.js';
import pool from '../config/database.js';
import logger from '../utils/logger.js';
import type { RowDataPacket } from 'mysql2';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

// ── File upload configuration ──
const uploadDir = path.resolve(__dirname, '../../uploads/tickets');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `ticket-${uniqueSuffix}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
    files: 1,
  },
  fileFilter: (_req, file, cb) => {
    const allowedMimes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF and JPG/PNG files are allowed (max 5MB).'));
    }
  },
});

// ──────────────────────────────────────────
//  POST /api/chat/message
//  Process a chat message through the RAG pipeline
// ──────────────────────────────────────────
router.post(
  '/message',
  chatMessageLimiter,
  [
    body('message')
      .trim()
      .isLength({ min: 1, max: 1000 })
      .withMessage('Message must be between 1 and 1000 characters.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { message } = req.body;
      logger.info(`Chat message received: "${message.substring(0, 50)}..."`);

      const response = await ragService.processChat(message);

      res.json({ success: true, data: response });
    } catch (err) {
      next(err);
    }
  },
);

// ──────────────────────────────────────────
//  POST /api/chat/ticket
//  Submit the fallback contact form
// ──────────────────────────────────────────
router.post(
  '/ticket',
  ticketFormLimiter,
  upload.single('file'),
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters.'),
    body('email')
      .optional({ values: 'falsy' })
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address.'),
    body('phone')
      .optional({ values: 'falsy' })
      .trim()
      .matches(/^\+?[0-9\s\-]{7,20}$/)
      .withMessage('Please provide a valid phone number.'),
    body('departmentId')
      .optional({ values: 'falsy' })
      .isInt({ min: 1 })
      .withMessage('Invalid department.'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 500 })
      .withMessage('Message must be between 10 and 500 characters.'),
    body('privacyConsent')
      .custom((value) => value === 'true' || value === true)
      .withMessage('You must consent to the privacy policy.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Require at least email or phone
      if (!req.body.email && !req.body.phone) {
        res.status(422).json({
          success: false,
          errors: [{ field: 'email', message: 'Please provide either an email or phone number.' }],
        });
        return;
      }

      const { ticketId, accessToken } = await ticketService.createTicket(
        {
          name: req.body.name,
          email: req.body.email || null,
          phone: req.body.phone || null,
          departmentId: req.body.departmentId ? Number(req.body.departmentId) : null,
          message: req.body.message,
          filePath: req.file?.filename || null,
          fileName: req.file?.originalname || null,
          privacyConsent: true,
        },
        req.ip,
      );

      res.status(201).json({
        success: true,
        message: 'Your request has been submitted. Our team will get back to you soon.',
        data: { ticketId, accessToken },
      });
    } catch (err) {
      next(err);
    }
  },
);

// ──────────────────────────────────────────
//  GET /api/chat/departments
//  List active departments for the form dropdown
// ──────────────────────────────────────────
router.get('/departments', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, name FROM departments WHERE is_active = 1 ORDER BY name ASC`,
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

// ──────────────────────────────────────────
//  GET /api/chat/quick-replies
//  Get suggested quick-reply topics
// ──────────────────────────────────────────
router.get('/quick-replies', (_req: Request, res: Response) => {
  res.json({
    success: true,
    data: [
      'Visiting Hours',
      'Departments',
      'Book Appointment',
      'Talk to Staff',
    ],
  });
});

// ──────────────────────────────────────────
//  GET /api/chat/tickets/:id
//  Public ticket status lookup for patients
// ──────────────────────────────────────────
router.get(
  '/tickets/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Valid ticket ID required.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketId = Number(req.params.id);
      const token = req.query.token as string;
      const result = await ticketService.getTicket(ticketId);

      if (!result || result.ticket.accessToken !== token) {
        res.status(403).json({ success: false, message: 'Access denied. Invalid or missing ticket token.' });
        return;
      }

      // Format safe response for public consumption (strip sensitive field details)
      res.json({
        success: true,
        data: {
          id: result.ticket.id,
          name: result.ticket.name,
          status: result.ticket.status,
          createdAt: result.ticket.createdAt,
          // Only return public replies
          responses: result.responses
            .filter((r) => !r.isInternal)
            .map((r) => ({
              id: r.id,
              message: r.message,
              adminName: r.adminName || 'Hospital Staff',
              isAdmin: r.adminId !== null,
              createdAt: r.createdAt,
            })),
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

// ──────────────────────────────────────────
//  POST /api/chat/tickets/:id/reply
//  Public route for patients to reply to their ticket
// ──────────────────────────────────────────
router.post(
  '/tickets/:id/reply',
  [
    chatMessageLimiter,
    param('id').isInt({ min: 1 }).withMessage('Valid ticket ID required.'),
    body('token').isString().notEmpty().withMessage('Access token is required.'),
    body('message')
      .isString()
      .trim()
      .isLength({ min: 2, max: 1000 })
      .withMessage('Message must be between 2 and 1000 characters.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ticketId = Number(req.params.id);
      const { token, message } = req.body;

      // 1. Fetch ticket to verify access token
      const result = await ticketService.getTicket(ticketId);
      if (!result || result.ticket.accessToken !== token) {
        res.status(403).json({ success: false, message: 'Access denied. Invalid or missing ticket token.' });
        return;
      }

      // 2. Add response
      const responseId = await ticketService.addResponse(
        ticketId,
        null, // adminId is null for patient replies
        message,
        false, // isInternal is false (public response)
        req.ip,
      );

      res.status(201).json({
        success: true,
        message: 'Your reply has been added successfully.',
        data: { responseId },
      });
    } catch (err) {
      next(err);
    }
  },
);

export default router;
