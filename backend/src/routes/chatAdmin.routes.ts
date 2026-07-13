// ─────────────────────────────────────────────
//  Chat Admin routes — /api/chat-admin/*
//  Protected by JWT authentication.
//  Provides CRUD for tickets, FAQs, and audit logs.
// ─────────────────────────────────────────────
import { Router, Request, Response, NextFunction } from 'express';
import { body, param, query } from 'express-validator';
import bcrypt from 'bcrypt';
import { handleValidationErrors } from '../middleware/validate.js';
import { requireJwtAuth } from '../middleware/jwtAuth.js';
import { generateTokenPair, verifyToken } from '../config/jwt.js';
import * as ticketService from '../services/ticket.service.js';
import * as ragService from '../services/rag.service.js';
import * as faqRepo from '../repositories/faq.repository.js';
import * as auditRepo from '../repositories/audit.repository.js';
import * as userRepo from '../repositories/user.repository.js';
import pool from '../config/database.js';
import logger from '../utils/logger.js';
import type { TicketStatus, TICKET_STATUSES } from '../types/index.js';
import type { RowDataPacket } from 'mysql2';

const router = Router();

// ─────────────────────────────────────────
//  AUTH ENDPOINTS (public within this router)
// ─────────────────────────────────────────

/**
 * POST /api/chat-admin/auth/login
 * Authenticate admin user and return JWT token pair.
 */
router.post(
  '/auth/login',
  [
    body('email').trim().isEmail().normalizeEmail().withMessage('Valid email required.'),
    body('password').isLength({ min: 1 }).withMessage('Password required.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const user = await userRepo.findByEmail(email);

      if (!user) {
        res.status(401).json({ success: false, message: 'Invalid credentials.' });
        return;
      }

      const valid = await bcrypt.compare(password, user.passwordHash);
      if (!valid) {
        res.status(401).json({ success: false, message: 'Invalid credentials.' });
        return;
      }

      const tokens = generateTokenPair({
        id: user.id,
        email: user.email,
        name: user.name,
      });

      await auditRepo.logAction({
        adminId: user.id,
        action: 'LOGIN',
        entity: 'admin_user',
        entityId: user.id,
        ipAddress: req.ip ?? null,
      });

      res.json({
        success: true,
        data: {
          ...tokens,
          user: { id: user.id, name: user.name, email: user.email },
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

/**
 * POST /api/chat-admin/auth/refresh
 * Refresh an access token using a valid refresh token.
 */
router.post(
  '/auth/refresh',
  [
    body('refreshToken').isString().isLength({ min: 1 }).withMessage('Refresh token required.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = verifyToken(req.body.refreshToken);

      if (!payload || payload.type !== 'refresh') {
        res.status(401).json({ success: false, message: 'Invalid refresh token.' });
        return;
      }

      const tokens = generateTokenPair({
        id: payload.userId,
        email: payload.email,
        name: payload.name,
      });

      res.json({ success: true, data: tokens });
    } catch (err) {
      next(err);
    }
  },
);

// ─────────────────────────────────────────
//  All routes below require JWT authentication
// ─────────────────────────────────────────
router.use(requireJwtAuth);

// ─────────────────────────────────────────
//  TICKET ENDPOINTS
// ─────────────────────────────────────────

/**
 * GET /api/chat-admin/tickets
 * List tickets with pagination and filters.
 */
router.get('/tickets', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const status = req.query.status as TicketStatus | undefined;
    const departmentId = req.query.departmentId ? Number(req.query.departmentId) : undefined;
    const assignedTo = req.query.assignedTo ? Number(req.query.assignedTo) : undefined;
    const search = req.query.search as string | undefined;

    const result = await ticketService.listTickets({
      page, limit, status, departmentId, assignedTo, search,
    });

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/chat-admin/tickets/export/csv
 * Export tickets as CSV download.
 */
router.get('/tickets/export/csv', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const status = req.query.status as TicketStatus | undefined;
    const departmentId = req.query.departmentId ? Number(req.query.departmentId) : undefined;

    const csv = await ticketService.exportCSV({ status, departmentId });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=tickets-${Date.now()}.csv`);
    res.send(csv);
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/chat-admin/tickets/:id
 * Get a single ticket with all responses.
 */
router.get(
  '/tickets/:id',
  [param('id').isInt({ min: 1 }).withMessage('Valid ticket ID required.'), handleValidationErrors],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ticketService.getTicket(Number(req.params.id));
      if (!result) {
        res.status(404).json({ success: false, message: 'Ticket not found.' });
        return;
      }
      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
);

/**
 * PATCH /api/chat-admin/tickets/:id/assign
 * Assign a ticket to an admin user.
 */
router.patch(
  '/tickets/:id/assign',
  [
    param('id').isInt({ min: 1 }).withMessage('Valid ticket ID required.'),
    body('adminId').isInt({ min: 1 }).withMessage('Valid admin ID required.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const success = await ticketService.assignTicket(
        Number(req.params.id),
        Number(req.body.adminId),
        { userId: req.jwtUser!.userId, ip: req.ip },
      );

      if (!success) {
        res.status(400).json({ success: false, message: 'Could not assign ticket.' });
        return;
      }

      res.json({ success: true, message: 'Ticket assigned successfully.' });
    } catch (err) {
      next(err);
    }
  },
);

/**
 * PATCH /api/chat-admin/tickets/:id/status
 * Update ticket status with workflow validation.
 */
router.patch(
  '/tickets/:id/status',
  [
    param('id').isInt({ min: 1 }).withMessage('Valid ticket ID required.'),
    body('status')
      .isIn(['NEW', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'])
      .withMessage('Invalid status.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await ticketService.updateStatus(
        Number(req.params.id),
        req.body.status,
        { userId: req.jwtUser!.userId, ip: req.ip },
      );

      if (!result.success) {
        res.status(400).json({ success: false, message: result.error });
        return;
      }

      res.json({ success: true, message: 'Status updated successfully.' });
    } catch (err) {
      next(err);
    }
  },
);

/**
 * POST /api/chat-admin/tickets/:id/respond
 * Add a response (or internal note) to a ticket.
 */
router.post(
  '/tickets/:id/respond',
  [
    param('id').isInt({ min: 1 }).withMessage('Valid ticket ID required.'),
    body('message').trim().isLength({ min: 1, max: 2000 }).withMessage('Message required (max 2000 chars).'),
    body('isInternal').optional().isBoolean().withMessage('isInternal must be boolean.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const responseId = await ticketService.addResponse(
        Number(req.params.id),
        req.jwtUser!.userId,
        req.body.message,
        req.body.isInternal === true || req.body.isInternal === 'true',
        req.ip,
      );

      if (!responseId) {
        res.status(404).json({ success: false, message: 'Ticket not found.' });
        return;
      }

      res.status(201).json({
        success: true,
        message: 'Response added successfully.',
        data: { responseId },
      });
    } catch (err) {
      next(err);
    }
  },
);

// ─────────────────────────────────────────
//  FAQ ENDPOINTS
// ─────────────────────────────────────────

/**
 * GET /api/chat-admin/faq
 * List FAQ documents with pagination.
 */
router.get('/faq', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 20));
    const departmentId = req.query.departmentId ? Number(req.query.departmentId) : undefined;
    const search = req.query.search as string | undefined;

    const result = await faqRepo.findAll({ page, limit, departmentId, search });

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
});

/**
 * POST /api/chat-admin/faq
 * Create a new FAQ document and generate its embedding.
 */
router.post(
  '/faq',
  [
    body('title').trim().isLength({ min: 2, max: 255 }).withMessage('Title required (2-255 chars).'),
    body('content').trim().isLength({ min: 10, max: 5000 }).withMessage('Content required (10-5000 chars).'),
    body('departmentId').optional({ values: 'falsy' }).isInt({ min: 1 }).withMessage('Invalid department.'),
    body('tags').optional({ values: 'falsy' }).isString().withMessage('Tags must be a string.'),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const faqId = await faqRepo.create({
        title: req.body.title,
        content: req.body.content,
        departmentId: req.body.departmentId ? Number(req.body.departmentId) : null,
        tags: req.body.tags || null,
      });

      // Generate embedding asynchronously (don't block response)
      ragService.embedAndStoreFaq(faqId).catch((err) => {
        logger.error(`Failed to generate embedding for FAQ #${faqId}:`, err);
      });

      await auditRepo.logAction({
        adminId: req.jwtUser!.userId,
        action: 'CREATE_FAQ',
        entity: 'faq_document',
        entityId: faqId,
        ipAddress: req.ip ?? null,
      });

      res.status(201).json({
        success: true,
        message: 'FAQ created successfully. Embedding generation in progress.',
        data: { id: faqId },
      });
    } catch (err) {
      next(err);
    }
  },
);

/**
 * PUT /api/chat-admin/faq/:id
 * Update an existing FAQ document and re-generate embedding.
 */
router.put(
  '/faq/:id',
  [
    param('id').isInt({ min: 1 }).withMessage('Valid FAQ ID required.'),
    body('title').optional().trim().isLength({ min: 2, max: 255 }).withMessage('Title: 2-255 chars.'),
    body('content').optional().trim().isLength({ min: 10, max: 5000 }).withMessage('Content: 10-5000 chars.'),
    body('departmentId').optional({ values: 'falsy' }).isInt({ min: 1 }).withMessage('Invalid department.'),
    body('tags').optional({ values: 'falsy' }).isString(),
    body('isActive').optional().isBoolean(),
    handleValidationErrors,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const updateData: any = {};

      if (req.body.title !== undefined) updateData.title = req.body.title;
      if (req.body.content !== undefined) updateData.content = req.body.content;
      if (req.body.departmentId !== undefined) updateData.departmentId = Number(req.body.departmentId) || null;
      if (req.body.tags !== undefined) updateData.tags = req.body.tags;
      if (req.body.isActive !== undefined) updateData.isActive = req.body.isActive === true || req.body.isActive === 'true';

      const success = await faqRepo.update(id, updateData);
      if (!success) {
        res.status(404).json({ success: false, message: 'FAQ not found.' });
        return;
      }

      // Re-generate embedding if content changed
      if (req.body.title || req.body.content) {
        ragService.embedAndStoreFaq(id).catch((err) => {
          logger.error(`Failed to re-generate embedding for FAQ #${id}:`, err);
        });
      }

      await auditRepo.logAction({
        adminId: req.jwtUser!.userId,
        action: 'UPDATE_FAQ',
        entity: 'faq_document',
        entityId: id,
        details: JSON.stringify(Object.keys(updateData)),
        ipAddress: req.ip ?? null,
      });

      res.json({ success: true, message: 'FAQ updated successfully.' });
    } catch (err) {
      next(err);
    }
  },
);

/**
 * DELETE /api/chat-admin/faq/:id
 * Soft-delete a FAQ document.
 */
router.delete(
  '/faq/:id',
  [param('id').isInt({ min: 1 }).withMessage('Valid FAQ ID required.'), handleValidationErrors],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const success = await faqRepo.softDelete(id);

      if (!success) {
        res.status(404).json({ success: false, message: 'FAQ not found.' });
        return;
      }

      await auditRepo.logAction({
        adminId: req.jwtUser!.userId,
        action: 'DELETE_FAQ',
        entity: 'faq_document',
        entityId: id,
        ipAddress: req.ip ?? null,
      });

      res.json({ success: true, message: 'FAQ deleted successfully.' });
    } catch (err) {
      next(err);
    }
  },
);

// ─────────────────────────────────────────
//  AUDIT LOG ENDPOINTS
// ─────────────────────────────────────────

/**
 * GET /api/chat-admin/audit-logs
 * View the audit trail (read-only).
 */
router.get('/audit-logs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 50));
    const adminId = req.query.adminId ? Number(req.query.adminId) : undefined;
    const action = req.query.action as string | undefined;
    const entity = req.query.entity as string | undefined;

    const result = await auditRepo.findAll({ page, limit, adminId, action, entity });

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total: result.total,
        totalPages: Math.ceil(result.total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
});

// ─────────────────────────────────────────
//  DASHBOARD STATS
// ─────────────────────────────────────────

/**
 * GET /api/chat-admin/dashboard/stats
 * Get ticket statistics for the admin dashboard.
 */
router.get('/dashboard/stats', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stats = await ticketService.getDashboardStats();
    res.json({ success: true, data: stats });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/chat-admin/admins
 * List admin users for ticket assignment dropdowns.
 */
router.get('/admins', async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>(
      `SELECT id, name, email FROM admin_users ORDER BY name ASC`,
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    next(err);
  }
});

export default router;
