// ─────────────────────────────────────────────
//  Feedback service — business logic for feedback submissions
// ─────────────────────────────────────────────
import * as feedbackRepo from '../repositories/feedback.repository.js';
import type { Feedback } from '../types/index.js';

/** Create a new feedback submission. Returns the inserted ID. */
export async function submitFeedback(data: {
  patientName: string;
  phone?: string;
  email?: string;
  rating: number;
  comments: string;
}): Promise<number> {
  return feedbackRepo.create(data);
}

/** Fetch paginated feedbacks for the admin dashboard. */
export async function listFeedbacks(options: {
  page: number;
  limit: number;
  isRead?: boolean;
  rating?: number;
}): Promise<{
  rows: Feedback[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const { rows, total } = await feedbackRepo.findAll(options);
  return {
    rows,
    total,
    page: options.page,
    limit: options.limit,
    totalPages: Math.ceil(total / options.limit),
  };
}

/** Toggle the read status of a feedback. Returns false if the feedback doesn't exist. */
export async function markAsRead(
  id: number,
  isRead: boolean,
): Promise<boolean> {
  return feedbackRepo.updateReadStatus(id, isRead);
}
