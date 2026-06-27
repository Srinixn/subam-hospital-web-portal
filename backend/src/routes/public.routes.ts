// ─────────────────────────────────────────────
//  Public routes — /api/public/*
//  No authentication required.
// ─────────────────────────────────────────────
import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { handleValidationErrors } from '../middleware/validate.js';
import * as contactController from '../controllers/contact.controller.js';
import * as feedbackController from '../controllers/feedback.controller.js';
import { JobController } from '../controllers/job.controller.js';
import { INQUIRY_TYPES } from '../types/index.js';

const router = Router();
const jobController = new JobController();

// ── Rate limiter for public form submissions ──
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,                    // 5 requests per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many submissions. Please try again later.',
  },
});

// ── POST /api/public/contact ──
router.post(
  '/contact',
  formLimiter,
  [
    body('fullName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Full name must be between 2 and 100 characters.'),
    body('phone')
      .trim()
      .matches(/^\+?[0-9\s\-]{7,20}$/)
      .withMessage('Please provide a valid phone number.'),
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address.'),
    body('inquiryType')
      .isIn([...INQUIRY_TYPES])
      .withMessage(`Inquiry type must be one of: ${INQUIRY_TYPES.join(', ')}.`),
    body('message')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Message must be between 10 and 2000 characters.'),
    handleValidationErrors,
  ],
  contactController.submitContact,
);

// ── POST /api/public/feedback ──
router.post(
  '/feedback',
  formLimiter,
  [
    body('patientName')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Patient name must be between 2 and 100 characters.'),
    body('phone')
      .optional({ values: 'falsy' })
      .trim()
      .matches(/^\+?[0-9\s\-]{7,20}$/)
      .withMessage('Please provide a valid phone number.'),
    body('email')
      .optional({ values: 'falsy' })
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address.'),
    body('rating')
      .isInt({ min: 1, max: 5 })
      .withMessage('Rating must be an integer between 1 and 5.'),
    body('comments')
      .trim()
      .isLength({ min: 10, max: 2000 })
      .withMessage('Comments must be between 10 and 2000 characters.'),
    handleValidationErrors,
  ],
  feedbackController.submitFeedback,
);

// ── GET /api/public/testimonials ──
router.get('/testimonials', feedbackController.getPublicTestimonials);

// ── Jobs ──
router.get('/jobs', jobController.getPublicJobs.bind(jobController));
router.get('/jobs/:slug', jobController.getPublicJobBySlug.bind(jobController));

export default router;
