// ─────────────────────────────────────────────
//  Contact controller — HTTP request handlers
// ─────────────────────────────────────────────
import type { Request, Response, NextFunction } from 'express';
import * as contactService from '../services/contact.service.js';

/**
 * POST /api/public/contact
 * Public endpoint — submit a contact form inquiry.
 */
export async function submitContact(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const { fullName, phone, email, inquiryType, message } = req.body;

    await contactService.submitContact({
      fullName,
      phone,
      email,
      inquiryType,
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully.',
    });
  } catch (err) {
    next(err);
  }
}

/**
 * GET /api/admin/contacts
 * Admin endpoint — list contact submissions (paginated).
 */
export async function listContacts(
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

    const result = await contactService.listContacts({ page, limit, isRead });

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
 * PATCH /api/admin/contacts/:id/read
 * Admin endpoint — toggle the read status of a contact.
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
      res.status(400).json({ success: false, message: 'Invalid contact ID.' });
      return;
    }

    const updated = await contactService.markAsRead(id, isRead);

    if (!updated) {
      res.status(404).json({ success: false, message: 'Contact not found.' });
      return;
    }

    res.json({
      success: true,
      message: isRead ? 'Contact marked as read.' : 'Contact marked as unread.',
    });
  } catch (err) {
    next(err);
  }
}
