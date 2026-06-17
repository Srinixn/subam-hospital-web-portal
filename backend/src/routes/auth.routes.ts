// ─────────────────────────────────────────────
//  Auth routes — /api/auth/*
// ─────────────────────────────────────────────
import { Router } from 'express';
import { body } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { handleValidationErrors } from '../middleware/validate.js';
import { requireAuth } from '../middleware/auth.js';
import * as authController from '../controllers/auth.controller.js';

const router = Router();

// ── Rate limiter for login (brute-force protection) ──
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,                   // 10 attempts per window per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many login attempts. Please try again later.',
  },
});

// ── POST /api/auth/login ──
router.post(
  '/login',
  loginLimiter,
  [
    body('email')
      .trim()
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address.'),
    body('password')
      .isLength({ min: 1 })
      .withMessage('Password is required.'),
    handleValidationErrors,
  ],
  authController.login,
);

// ── POST /api/auth/logout ──
router.post('/logout', requireAuth, authController.logout);

// ── GET /api/auth/me ──
router.get('/me', authController.me);

export default router;
