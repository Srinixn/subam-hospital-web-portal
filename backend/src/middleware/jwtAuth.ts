// ─────────────────────────────────────────────
//  JWT authentication guard middleware
//  Runs in parallel with session-based auth.
//  Used exclusively for chatbot admin API routes.
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import { verifyToken, type JwtPayload } from '../config/jwt.js';

/**
 * Extend Express Request to include JWT user info.
 * This augments the request only when JWT auth succeeds.
 */
declare global {
  namespace Express {
    interface Request {
      jwtUser?: JwtPayload;
    }
  }
}

/**
 * Middleware that protects routes via JWT Bearer tokens.
 * Expects: Authorization: Bearer <token>
 *
 * On success, attaches `req.jwtUser` with the decoded payload.
 * On failure, returns 401 Unauthorized.
 */
export function requireJwtAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  // 1. Try Session Authentication first (for compatibility with the admin portal session)
  if (req.session && req.session.userId) {
    req.jwtUser = {
      userId: req.session.userId,
      email: req.session.userEmail || 'admin@subamhospital.com',
      name: req.session.userName || 'Admin',
      type: 'access',
    };
    next();
    return;
  }

  // 2. Fall back to JWT Authentication
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({
      success: false,
      message: 'Authentication required. Provide a Bearer token or sign in.',
    });
    return;
  }

  const token = authHeader.slice(7); // Remove 'Bearer ' prefix
  const payload = verifyToken(token);

  if (!payload) {
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token.',
    });
    return;
  }

  if (payload.type !== 'access') {
    res.status(401).json({
      success: false,
      message: 'Invalid token type. Use an access token.',
    });
    return;
  }

  // Attach user info to request
  req.jwtUser = payload;
  next();
}
