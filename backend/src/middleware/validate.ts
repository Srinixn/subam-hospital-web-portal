// ─────────────────────────────────────────────
//  Validation error handler middleware
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

/**
 * Middleware to run after express-validator checks.
 * If validation errors exist, returns a 422 response with field-level details.
 * Otherwise, passes control to the next handler.
 */
export function handleValidationErrors(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formatted = errors.array().map((err) => ({
      field: (err as any).path || (err as any).param || 'unknown',
      message: err.msg,
    }));

    res.status(422).json({
      success: false,
      errors: formatted,
    });
    return;
  }

  next();
}
