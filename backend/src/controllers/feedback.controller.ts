// ─────────────────────────────────────────────
//  Feedback controller — HTTP request handlers
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import * as feedbackService from '../services/feedback.service.js';

/**
 * POST /api/public/feedback
 * Public endpoint — submit a feedback form.
 */
export async function submitFeedback(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { patientName, phone, email, rating, comments } = req.body;

    await feedbackService.submitFeedback({
      patientName,
      phone,
      email,
      rating,
      comments,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you for your feedback!',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/feedbacks
 * Admin endpoint — list feedback submissions (paginated).
 */
export async function listFeedbacks(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const page = Math.max(1, parseInt(req.query.page as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 20));
    const isRead = req.query.isRead !== undefined
      ? req.query.isRead === 'true'
      : undefined;
    const rating = req.query.rating !== undefined
      ? parseInt(req.query.rating as string)
      : undefined;

    const result = await feedbackService.listFeedbacks({
      page,
      limit,
      isRead,
      rating: rating && rating >= 1 && rating <= 5 ? rating : undefined,
    });

    res.json({
      success: true,
      data: result.rows,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (err) {
    next(err);
  }
}

/**
 * PATCH /api/admin/feedbacks/:id/read
 * Admin endpoint — toggle the read status of a feedback.
 */
export async function toggleReadStatus(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam);
    const { isRead } = req.body;

    if (isNaN(id)) {
      res.status(400).json({ success: false, message: 'Invalid feedback ID.' });
      return;
    }

    const updated = await feedbackService.markAsRead(id, isRead);

    if (!updated) {
      res.status(404).json({ success: false, message: 'Feedback not found.' });
      return;
    }

    res.json({
      success: true,
      message: isRead ? 'Feedback marked as read.' : 'Feedback marked as unread.',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/public/testimonials
 * Public endpoint — get all public testimonials with rating > 3.
 */
export async function getPublicTestimonials(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const testimonials = await feedbackService.getTestimonials();
    res.json({
      success: true,
      data: testimonials,
    });
  } catch (err) {
    next(err);
  }
}
