// ─────────────────────────────────────────────
//  Contact service — business logic for contact submissions
// ─────────────────────────────────────────────
import * as contactRepo from '../repositories/contact.repository.js';
import type { Contact } from '../types/index.js';

/** Create a new contact submission. Returns the inserted ID. */
export async function submitContact(data: {
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
}): Promise<number> {
  return contactRepo.create(data);
}

/** Fetch paginated contacts for the admin dashboard. */
export async function listContacts(options: {
  page: number;
  limit: number;
  isRead?: boolean;
}): Promise<{
  rows: Contact[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  const { rows, total } = await contactRepo.findAll(options);
  return {
    rows,
    total,
    page: options.page,
    limit: options.limit,
    totalPages: Math.ceil(total / options.limit),
  };
}

/** Toggle the read status of a contact. Returns false if the contact doesn't exist. */
export async function markAsRead(
  id: number,
  isRead: boolean,
): Promise<boolean> {
  return contactRepo.updateReadStatus(id, isRead);
}
