// ─────────────────────────────────────────────
//  Shared TypeScript interfaces for the backend
// ─────────────────────────────────────────────

/** Represents a contact form submission stored in the `contacts` table. */
export interface Contact {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

/** Represents a feedback submission stored in the `feedbacks` table. */
export interface Feedback {
  id: number;
  patientName: string;
  phone: string | null;
  email: string | null;
  rating: number;
  comments: string;
  isRead: boolean;
  createdAt: Date;
}

/** Represents an admin user stored in the `admin_users` table. */
export interface AdminUser {
  id: number;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

/** Safe admin user object (without password hash) for API responses. */
export interface SafeAdminUser {
  id: number;
  name: string;
  email: string;
}

// ─────────────────────────────────────────────
//  Recruitment System Interfaces
// ─────────────────────────────────────────────

export interface Job {
  id: number;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  location: 'Sun Srishti Speciality Hospital' | 'Sunsrishti Fertility Center' | 'Subam Hospital';
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Draft' | 'Published' | 'Closed';
  linkedinJobUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

/** Standard success response envelope. */
export interface ApiResponse<T = undefined> {
  success: boolean;
  message?: string;
  data?: T;
}

/** Paginated response envelope. */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

/** Validation error detail for 422 responses. */
export interface ValidationError {
  field: string;
  message: string;
}

/** Allowed inquiry types for the contact form. */
export const INQUIRY_TYPES = [
  'General Inquiry',
  'Obstetrics',
  'Gynecology',
  'Pediatrics',
  'Radiology',
  'Antenatal (Pregnancy Care)',
  'Postnatal Care',
  'Fertility Care',
  'Newborn Care',
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

// ─────────────────────────────────────────────
//  Extend express-session types to include our user data
// ─────────────────────────────────────────────
declare module 'express-session' {
  interface SessionData {
    userId?: number;
    userEmail?: string;
    userName?: string;
  }
}
