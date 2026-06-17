// ─────────────────────────────────────────────
//  Auth controller — login, logout, session check
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service.js';

/**
 * POST /api/auth/login
 * Authenticate a hospital manager.
 */
export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { email, password } = req.body;

    const user = await authService.validateCredentials(email, password);

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      });
      return;
    }

    // Store user info in the session
    req.session.userId = user.id;
    req.session.userEmail = user.email;
    req.session.userName = user.name;

    // Save the session explicitly before responding
    req.session.save((err) => {
      if (err) {
        next(err);
        return;
      }

      res.json({
        success: true,
        user,
      });
    });
  } catch (err) {
    next(err);
  }
}

/**
 * POST /api/auth/logout
 * Destroy the current session.
 */
export async function logout(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }

    res.clearCookie('subam.sid');
    res.json({
      success: true,
      message: 'Logged out successfully.',
    });
  });
}

/**
 * GET /api/auth/me
 * Check current authentication status.
 */
export async function me(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    if (!req.session.userId) {
      res.status(401).json({
        success: false,
        message: 'Not authenticated.',
      });
      return;
    }

    // Verify the user still exists in the database
    const user = await authService.getUserById(req.session.userId);

    if (!user) {
      // User was deleted — destroy the stale session
      req.session.destroy(() => {});
      res.status(401).json({
        success: false,
        message: 'Not authenticated.',
      });
      return;
    }

    res.json({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
}
