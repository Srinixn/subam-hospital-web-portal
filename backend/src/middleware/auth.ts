// ─────────────────────────────────────────────
//  Session authentication guard middleware
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';

/**
 * Middleware that protects admin routes.
 * Checks for an active session with a valid userId.
 * Returns 401 if the user is not authenticated.
 */
export function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  if (req.session && req.session.userId) {
    next();
    return;
  }

  res.status(401).json({
    success: false,
    message: 'Not authenticated.',
  });
}
