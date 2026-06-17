// ─────────────────────────────────────────────
//  Admin routes — /api/admin/*
//  All routes are protected by the requireAuth middleware
//  applied at the router level in app.ts.
// ─────────────────────────────────────────────
import { Router } from 'express';
import { body } from 'express-validator';
import { handleValidationErrors } from '../middleware/validate.js';
import * as contactController from '../controllers/contact.controller.js';
import * as feedbackController from '../controllers/feedback.controller.js';

const router = Router();

// ── GET /api/admin/contacts ──
router.get('/contacts', contactController.listContacts);

// ── PATCH /api/admin/contacts/:id/read ──
router.patch(
  '/contacts/:id/read',
  [
    body('isRead')
      .isBoolean()
      .withMessage('isRead must be a boolean value.'),
    handleValidationErrors,
  ],
  contactController.toggleReadStatus,
);

// ── GET /api/admin/feedbacks ──
router.get('/feedbacks', feedbackController.listFeedbacks);

// ── PATCH /api/admin/feedbacks/:id/read ──
router.patch(
  '/feedbacks/:id/read',
  [
    body('isRead')
      .isBoolean()
      .withMessage('isRead must be a boolean value.'),
    handleValidationErrors,
  ],
  feedbackController.toggleReadStatus,
);

export default router;
