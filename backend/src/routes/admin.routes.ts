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
import { JobController } from '../controllers/job.controller.js';

const router = Router();
const jobController = new JobController();

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

// ── Jobs ──
router.get('/jobs', jobController.getAllJobsAdmin.bind(jobController));
router.get('/jobs/:id', jobController.getJobByIdAdmin.bind(jobController));
router.post('/jobs', jobController.createJob.bind(jobController));
router.put('/jobs/:id', jobController.updateJob.bind(jobController));
router.delete('/jobs/:id', jobController.deleteJob.bind(jobController));

export default router;
