// ─────────────────────────────────────────────
//  Rate limiters for chatbot endpoints
//  Separate limits for chat messages and form
//  submissions to prevent abuse.
// ─────────────────────────────────────────────
import rateLimit from 'express-rate-limit';

/**
 * Chat message rate limiter: 10 requests per minute per IP.
 * Applied to POST /api/chat/message
 */
export const chatMessageLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many chat messages. Please wait a moment before sending another.',
  },
  keyGenerator: (req) => {
    // Use X-Forwarded-For if behind a reverse proxy, otherwise IP
    return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
      || req.ip
      || 'unknown';
  },
});

/**
 * Ticket form submission rate limiter: 5 submissions per hour per IP.
 * Applied to POST /api/chat/ticket
 */
export const ticketFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many form submissions. Please try again later.',
  },
  keyGenerator: (req) => {
    return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
      || req.ip
      || 'unknown';
  },
});
