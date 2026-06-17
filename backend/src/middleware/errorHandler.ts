// ─────────────────────────────────────────────
//  Global error handler middleware
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';

/**
 * Catch-all error handler. Placed last in the middleware chain.
 * Logs the error and returns a consistent JSON envelope.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error('Unhandled error:', err);

  const statusCode = (err as any).statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An unexpected error occurred.'
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
}
