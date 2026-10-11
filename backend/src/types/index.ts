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
  location: 'Sun Srishti Speciality Hospital' | 'Example Fertility Center' | 'Demo Hospital';
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
//  Chatbot System Interfaces
// ─────────────────────────────────────────────

/** Ticket status workflow: NEW → ASSIGNED → IN_PROGRESS → RESOLVED → ARCHIVED */
export const TICKET_STATUSES = [
  'NEW',
  'ASSIGNED',
  'IN_PROGRESS',
  'RESOLVED',
  'ARCHIVED',
] as const;

export type TicketStatus = (typeof TICKET_STATUSES)[number];

/** Represents a hospital department stored in the `departments` table. */
export interface Department {
  id: number;
  name: string;
  description: string | null;
  isActive: boolean;
  createdAt: Date;
}

/** Represents a FAQ document chunk stored in the `faq_documents` table. */
export interface FaqDocument {
  id: number;
  title: string;
  content: string;
  departmentId: number | null;
  embeddingJson: number[] | null;
  tags: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  /** Joined field — department name */
  departmentName?: string;
}

/** Represents a chatbot fallback ticket stored in `chat_tickets`. */
export interface ChatTicket {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  departmentId: number | null;
  message: string;
  filePath: string | null;
  fileName: string | null;
  status: TicketStatus;
  assignedTo: number | null;
  privacyConsent: boolean;
  accessToken?: string | null;
  slaDeadline: Date | null;
  createdAt: Date;
  updatedAt: Date;
  /** Joined fields */
  departmentName?: string;
  assignedToName?: string;
  responseCount?: number;
}

/** Represents a threaded reply on a ticket. */
export interface TicketResponse {
  id: number;
  ticketId: number;
  adminId: number | null;
  message: string;
  isInternal: boolean;
  createdAt: Date;
  /** Joined field */
  adminName?: string;
}

/** Represents an immutable audit log entry. */
export interface AuditLog {
  id: number;
  adminId: number | null;
  action: string;
  entity: string;
  entityId: number | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: Date;
  /** Joined field */
  adminName?: string;
}

/** Chat message sent from the frontend. */
export interface ChatMessageRequest {
  message: string;
  sessionId?: string;
}

/** Chat response returned to the frontend. */
export interface ChatResponse {
  answer?: string;
  confidence?: number;
  sources?: { title: string; id: number }[];
  fallback: boolean;
  fallbackReason?: 'medical' | 'low_confidence' | 'human_requested' | 'error';
  disclaimer?: string;
  quickReplies?: string[];
}

/** Ticket creation payload from the fallback form. */
export interface CreateTicketPayload {
  name: string;
  email?: string;
  phone?: string;
  departmentId?: number;
  message: string;
  privacyConsent: boolean;
}

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
