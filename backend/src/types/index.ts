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

export interface Department {
  id: number;
  name: string;
  createdAt: Date;
}

export interface Job {
  id: number;
  departmentId: number;
  title: string;
  slug: string;
  description: string;
  requirements: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract';
  status: 'Draft' | 'Published' | 'Closed';
  createdAt: Date;
  updatedAt: Date;
}

export interface JobWithDepartment extends Job {
  departmentName?: string;
}

export interface Application {
  id: number;
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experienceYears: number;
  status: 'New' | 'Reviewed' | 'Shortlisted' | 'Interview Scheduled' | 'Rejected' | 'Hired';
  resumeFilePath: string;
  resumeOriginalName: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApplicationWithJob extends Application {
  jobTitle?: string;
  departmentName?: string;
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
