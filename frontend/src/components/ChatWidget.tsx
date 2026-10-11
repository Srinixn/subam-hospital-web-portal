/**
 * ChatWidget.tsx — Self-contained floating chatbot widget
 *
 * Features:
 * - Floating action button with pulse animation
 * - Slide-in chat panel with typing indicator
 * - Medical disclaimer on first open
 * - Quick-reply chips for common topics
 * - RAG-powered Q&A with confidence routing
 * - Fallback contact form with file upload
 * - WCAG 2.1 AA compliant (keyboard nav, ARIA, contrast)
 */
import { useState, useRef, useEffect, useCallback, type FormEvent } from 'react';
import './ChatWidget.css';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';
const EMERGENCY_PHONE = '+00 00000 00000';

// ─────────────────────────────────────────
//  Types
// ─────────────────────────────────────────
interface ChatMessage {
  id: string;
  role: 'bot' | 'user';
  content: string;
  timestamp: Date;
  sources?: { title: string; id: number }[];
  confidence?: number;
}

interface Department {
  id: number;
  name: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  departmentId: string;
  message: string;
  file: File | null;
  privacyConsent: boolean;
}

interface FormErrors {
  [key: string]: string;
}

// ─────────────────────────────────────────
//  SVG Icons (inline to avoid dependencies)
// ─────────────────────────────────────────
const ChatIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const SendIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);

const HospitalIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21h18" /><path d="M5 21V7l7-4 7 4v14" /><path d="M9 21v-4h6v4" />
    <path d="M10 9h4" /><path d="M12 7v4" />
  </svg>
);

const WarningIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const FileIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

// ─────────────────────────────────────────
//  Main Component
// ─────────────────────────────────────────
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [quickReplies, setQuickReplies] = useState<string[]>([
    'Visiting Hours', 'Departments', 'Book Appointment',
    'Talk to Staff',
  ]);
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', phone: '', departmentId: '', message: '',
    file: null, privacyConsent: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formSubmitting, setFormSubmitting] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasOpenedBefore = useRef(false);

  // ── Auto-scroll to bottom ──
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // ── Focus input when panel opens ──
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // ── Fetch departments on first open ──
  useEffect(() => {
    if (isOpen && departments.length === 0) {
      fetch(`${API_BASE}/chat/departments`)
        .then((r) => r.json())
        .then((d) => { if (d.data) setDepartments(d.data); })
        .catch(() => { /* silently fail — form still works */ });
    }
  }, [isOpen]);

  // ── Open/close handlers ──
  const handleOpen = useCallback(() => {
    setIsOpen(true);
    setIsClosing(false);

    // Show welcome message on first open
    if (!hasOpenedBefore.current) {
      hasOpenedBefore.current = true;
      const welcome: ChatMessage = {
        id: `welcome-${Date.now()}`,
        role: 'bot',
        content: `Hello! I am **Demo Care Bot**, your friendly virtual assistant. 🩺👋\n\nI can help you with:\n* Checking **Visiting Hours** & directions\n* Listing speciality **Departments**\n* Explaining how to **Book Appointments**\n* Checking support **Ticket Status**\n* Submitting requests to our staff\n\n*Note: I provide general hospital information. If you have a medical emergency, please call **${EMERGENCY_PHONE}** immediately.*`,
        timestamp: new Date(),
      };
      setMessages([welcome]);
    }
  }, []);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 250);
  }, []);

  // ── Send message ──
  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;

    // Check if user is attempting manual ticket lookups (e.g., #1 or status 1)
    const ticketMatch = text.match(/#(\d+)/) || text.match(/status\s*(\d+)/i);
    if (ticketMatch) {
      const userMsg: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setIsLoading(true);

      setTimeout(() => {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          content: `🔒 **Confidentiality Notice**\n\nFor patient privacy compliance, ticket details can only be viewed using the secure tracking link provided to you upon submission.\n\nIf you have lost your secure link, please check your browser history or contact our support desk directly at **+00 00000 00000**.`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);
      }, 400);
      return;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to get response');
      }

      const result = data.data;

      // Update quick replies if provided
      if (result.quickReplies) {
        setQuickReplies(result.quickReplies);
      }

      // Check if we should show the fallback form
      if (result.fallback) {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          content: result.answer || 'Let me connect you with our team.',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);

        // Auto-open form after a short delay
        setTimeout(() => setShowForm(true), 800);
      } else {
        const botMsg: ChatMessage = {
          id: `bot-${Date.now()}`,
          role: 'bot',
          content: result.answer || 'I\'m sorry, I couldn\'t find an answer.',
          timestamp: new Date(),
          sources: result.sources,
          confidence: result.confidence,
        };
        setMessages((prev) => [...prev, botMsg]);
      }
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'bot',
        content: 'I\'m sorry, I\'m having trouble connecting right now. Please try again or use the contact form to reach our team.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  // ── Handle input submit ──
  const handleSubmit = useCallback(() => {
    sendMessage(input);
  }, [input, sendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  // ── Quick reply click ──
  const handleQuickReply = useCallback((reply: string) => {
    sendMessage(reply);
  }, [sendMessage]);

  // ── Form validation ──
  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Full name is required (min 2 characters).';
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.email = 'Please provide either an email or phone number.';
    }
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (formData.phone.trim() && !/^\+?[0-9\s\-]{7,20}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }
    if (formData.message.length > 500) {
      errors.message = 'Message must be 500 characters or less.';
    }
    if (!formData.privacyConsent) {
      errors.consent = 'You must consent to the privacy policy.';
    }
    if (formData.file) {
      if (formData.file.size > 5 * 1024 * 1024) {
        errors.file = 'File must be 5MB or smaller.';
      }
      const allowed = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!allowed.includes(formData.file.type)) {
        errors.file = 'Only PDF and JPG/PNG files are allowed.';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ── Form submission ──
  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormSubmitting(true);

    try {
      const fd = new FormData();
      fd.append('name', formData.name.trim());
      if (formData.email.trim()) fd.append('email', formData.email.trim());
      if (formData.phone.trim()) fd.append('phone', formData.phone.trim());
      if (formData.departmentId) fd.append('departmentId', formData.departmentId);
      fd.append('message', formData.message.trim());
      fd.append('privacyConsent', 'true');
      if (formData.file) fd.append('file', formData.file);

      const response = await fetch(`${API_BASE}/chat/ticket`, {
        method: 'POST',
        body: fd,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const errors: FormErrors = {};
          for (const err of data.errors) {
            errors[err.field] = err.message;
          }
          setFormErrors(errors);
        } else {
          setFormErrors({ general: data.message || 'Submission failed.' });
        }
        return;
      }

      setFormSuccess(true);

      const ticketId = data.data?.ticketId;
      const accessToken = data.data?.accessToken;
      const trackingUrl = `/ticket-view?id=${ticketId}&token=${accessToken}`;

      // Add success message to chat
      const successMsg: ChatMessage = {
        id: `success-${Date.now()}`,
        role: 'bot',
        content: `✅ **Request Submitted Successfully!**\n\nYour Ticket ID is **#${ticketId}**.\n\nTo view and track replies from our administrative or clinical staff, please use your private tracking link:\n👉 [**View Secure Ticket Status & Replies**](${trackingUrl})\n\n*(Note: Keep this link secure as it is the only way to check updates.)*`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, successMsg]);

      // Close form after delay
      setTimeout(() => {
        setShowForm(false);
        setFormSuccess(false);
        setFormData({
          name: '', email: '', phone: '', departmentId: '', message: '',
          file: null, privacyConsent: false,
        });
        setFormErrors({});
      }, 2500);
    } catch (err) {
      setFormErrors({ general: 'Network error. Please try again.' });
    } finally {
      setFormSubmitting(false);
    }
  };

  // ── File change handler ──
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({ ...prev, file }));
    if (formErrors.file) setFormErrors((prev) => { const { file, ...rest } = prev; return rest; });
  };

  const removeFile = () => {
    setFormData((prev) => ({ ...prev, file: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Time formatter ──
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const parseBoldText = (text: string) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;

    while ((match = linkRegex.exec(text)) !== null) {
      const matchIndex = match.index;
      if (matchIndex > lastIndex) {
        parts.push(text.substring(lastIndex, matchIndex));
      }

      const linkText = match[1];
      const linkUrl = match[2];
      const isInternal = linkUrl.startsWith('/');

      if (isInternal) {
        parts.push(
          <a
            key={`link-${matchIndex}`}
            href={linkUrl}
            className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
            onClick={(e) => {
              e.preventDefault();
              window.open(linkUrl, '_blank');
            }}
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <a
            key={`link-${matchIndex}`}
            href={linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal-600 dark:text-teal-400 font-bold hover:underline"
          >
            {linkText}
          </a>
        );
      }

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }

    return parts.map((part, index) => {
      if (typeof part === 'string') {
        const boldParts = part.split(/\*\*([^*]+)\*\*/g);
        return boldParts.map((bp, i) => {
          if (i % 2 === 1) {
            return <strong key={`bold-${index}-${i}`} className="font-semibold text-slate-900 dark:text-white">{bp}</strong>;
          }
          return bp;
        });
      }
      return part;
    });
  };

  const formatMessageContent = (content: string) => {
    const lines = content.split('\n');
    let inList = false;
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    lines.forEach((line, idx) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        const itemText = trimmed.substring(2);
        listItems.push(
          <li key={`li-${idx}`} className="ml-4 list-disc mb-1 text-slate-700 dark:text-slate-200">
            {parseBoldText(itemText)}
          </li>
        );
        inList = true;
        return;
      }

      if (inList && listItems.length > 0) {
        elements.push(
          <ul key={`ul-${idx}`} className="mb-2 list-inside">
            {listItems}
          </ul>
        );
        listItems = [];
        inList = false;
      }

      if (trimmed === '') {
        elements.push(<div key={`br-${idx}`} className="h-2" />);
        return;
      }

      elements.push(
        <p key={`p-${idx}`} className="mb-1 text-slate-700 dark:text-slate-200 leading-relaxed">
          {parseBoldText(line)}
        </p>
      );
    });

    if (inList && listItems.length > 0) {
      elements.push(
        <ul key="ul-final" className="mb-2 list-inside">
          {listItems}
        </ul>
      );
    }

    return <div>{elements}</div>;
  };

  // ─────────────────────────────────────────
  //  Render
  // ─────────────────────────────────────────
  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          className="chat-fab"
          onClick={handleOpen}
          aria-label="Open hospital chat assistant"
          id="chat-widget-fab"
        >
          <span className="pulse-ring" />
          <img
            src="https://placehold.co/320x100?text=Demo+Hospital"
            alt="Demo Hospital Logo"
            className="w-10 h-10 object-contain bg-white rounded-full p-1 border border-slate-100 shadow-sm"
          />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div
          className={`chat-panel ${isClosing ? 'closing' : ''}`}
          role="dialog"
          aria-label="Hospital chat assistant"
          aria-modal="false"
        >
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar bg-white p-1 rounded-full border border-teal-600/20 flex items-center justify-center">
              <img
                src="https://placehold.co/320x100?text=Demo+Hospital"
                alt="Demo Hospital Logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <div className="chat-header-info">
              <h3>Demo Hospital</h3>
              <p>Virtual Assistant</p>
            </div>
            <button
              className="chat-close-btn"
              onClick={handleClose}
              aria-label="Close chat"
              id="chat-close-btn"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages" role="log" aria-live="polite" aria-label="Chat messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-msg chat-msg-${msg.role}`}>
                <div className="chat-msg-bubble">
                  {formatMessageContent(msg.content)}
                </div>
                <div className="chat-msg-time">{formatTime(msg.timestamp)}</div>
              </div>
            ))}

            {/* Typing indicator */}
            {isLoading && (
              <div className="chat-typing" aria-label="Assistant is typing">
                <span /><span /><span />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {!showForm && quickReplies.length > 0 && messages.length <= 2 && (
            <div className="chat-quick-replies" role="group" aria-label="Quick reply options">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  className="chat-quick-chip"
                  onClick={() => handleQuickReply(reply)}
                  disabled={isLoading}
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input Area */}
          {!showForm && (
            <div className="chat-input-area">
              <textarea
                ref={inputRef}
                className="chat-input"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                maxLength={1000}
                disabled={isLoading}
                aria-label="Chat message input"
                id="chat-input"
              />
              <button
                className="chat-send-btn"
                onClick={handleSubmit}
                disabled={!input.trim() || isLoading}
                aria-label="Send message"
                id="chat-send-btn"
              >
                <SendIcon />
              </button>
            </div>
          )}

          {/* ── Fallback Contact Form ── */}
          {showForm && (
            <div className="chat-form-overlay" role="dialog" aria-label="Contact form" aria-modal="true">
              <div className="chat-form-container">
                {formSuccess ? (
                  /* ── Success State ── */
                  <div className="chat-form-success">
                    <div className="chat-form-success-icon">
                      <CheckIcon />
                    </div>
                    <h4>Request Submitted!</h4>
                    <p>Our team will contact you within 24 hours.</p>
                  </div>
                ) : (
                  /* ── Form ── */
                  <form onSubmit={handleFormSubmit} noValidate>
                    <div className="chat-form-header">
                      <h4 className="chat-form-title">Contact Our Team</h4>
                      <p className="chat-form-subtitle">Fill out this form and we'll get back to you soon.</p>
                    </div>

                    {formErrors.general && (
                      <div className="chat-form-error" style={{ marginBottom: 12, padding: '8px 12px', background: '#FEF2F2', borderRadius: 8 }}>
                        {formErrors.general}
                      </div>
                    )}

                    {/* Full Name */}
                    <div className="chat-form-group">
                      <label className="chat-form-label" htmlFor="chat-form-name">
                        Full Name <span className="required">*</span>
                      </label>
                      <input
                        id="chat-form-name"
                        className={`chat-form-input ${formErrors.name ? 'error' : ''}`}
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, name: e.target.value }));
                          if (formErrors.name) setFormErrors((p) => { const { name, ...r } = p; return r; });
                        }}
                        placeholder="Enter your full name"
                        maxLength={100}
                        autoComplete="name"
                      />
                      {formErrors.name && <p className="chat-form-error">{formErrors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="chat-form-group">
                      <label className="chat-form-label" htmlFor="chat-form-email">
                        Email Address
                      </label>
                      <input
                        id="chat-form-email"
                        className={`chat-form-input ${formErrors.email ? 'error' : ''}`}
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, email: e.target.value }));
                          if (formErrors.email) setFormErrors((p) => { const { email, ...r } = p; return r; });
                        }}
                        placeholder="your@email.com"
                        autoComplete="email"
                      />
                      {formErrors.email && <p className="chat-form-error">{formErrors.email}</p>}
                    </div>

                    {/* Phone */}
                    <div className="chat-form-group">
                      <label className="chat-form-label" htmlFor="chat-form-phone">
                        Phone Number
                      </label>
                      <input
                        id="chat-form-phone"
                        className={`chat-form-input ${formErrors.phone ? 'error' : ''}`}
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, phone: e.target.value }));
                          if (formErrors.phone) setFormErrors((p) => { const { phone, ...r } = p; return r; });
                        }}
                        placeholder="+91 9XXXXXXXXX"
                        autoComplete="tel"
                      />
                      {formErrors.phone && <p className="chat-form-error">{formErrors.phone}</p>}
                    </div>

                    {/* Department */}
                    <div className="chat-form-group">
                      <label className="chat-form-label" htmlFor="chat-form-dept">Department</label>
                      <select
                        id="chat-form-dept"
                        className="chat-form-select"
                        value={formData.departmentId}
                        onChange={(e) => setFormData((p) => ({ ...p, departmentId: e.target.value }))}
                      >
                        <option value="">Select a department (optional)</option>
                        {departments.map((d) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div className="chat-form-group">
                      <label className="chat-form-label" htmlFor="chat-form-message">
                        Message <span className="required">*</span>
                      </label>
                      <textarea
                        id="chat-form-message"
                        className={`chat-form-textarea ${formErrors.message ? 'error' : ''}`}
                        value={formData.message}
                        onChange={(e) => {
                          if (e.target.value.length <= 500) {
                            setFormData((p) => ({ ...p, message: e.target.value }));
                            if (formErrors.message) setFormErrors((p) => { const { message, ...r } = p; return r; });
                          }
                        }}
                        placeholder="Describe your inquiry..."
                        rows={3}
                        maxLength={500}
                      />
                      <p className="chat-form-charcount">{formData.message.length}/500</p>
                      {formErrors.message && <p className="chat-form-error">{formErrors.message}</p>}
                    </div>

                    {/* File Upload */}
                    <div className="chat-form-group">
                      <label className="chat-form-label">Attachment (optional)</label>
                      {!formData.file ? (
                        <div
                          className="chat-form-file-area"
                          onClick={() => fileInputRef.current?.click()}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click(); }}
                          aria-label="Upload a file"
                        >
                          <UploadIcon />
                          <p className="chat-form-file-label">
                            <strong>Click to upload</strong> a file
                          </p>
                          <p style={{ fontSize: 11, color: '#94A3B8', margin: '4px 0 0' }}>
                            PDF, JPG, or PNG (max 5MB)
                          </p>
                        </div>
                      ) : (
                        <div className="chat-form-file-info">
                          <span><FileIcon /> {formData.file.name}</span>
                          <button type="button" onClick={removeFile} style={{
                            background: 'none', border: 'none', color: '#EF4444',
                            cursor: 'pointer', fontSize: 13, fontWeight: 500,
                          }}>Remove</button>
                        </div>
                      )}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        aria-label="File upload input"
                      />
                      {formErrors.file && <p className="chat-form-error">{formErrors.file}</p>}
                    </div>

                    {/* Privacy Consent */}
                    <div className="chat-form-consent">
                      <input
                        id="chat-form-consent"
                        type="checkbox"
                        checked={formData.privacyConsent}
                        onChange={(e) => {
                          setFormData((p) => ({ ...p, privacyConsent: e.target.checked }));
                          if (formErrors.consent) setFormErrors((p) => { const { consent, ...r } = p; return r; });
                        }}
                      />
                      <label htmlFor="chat-form-consent">
                        I consent to Demo Hospital processing my personal data to respond to this inquiry.
                        Your data will be handled in accordance with our privacy policy.
                      </label>
                    </div>
                    {formErrors.consent && <p className="chat-form-error" style={{ marginLeft: 28 }}>{formErrors.consent}</p>}

                    {/* Actions */}
                    <div className="chat-form-actions">
                      <button
                        type="button"
                        className="chat-form-cancel"
                        onClick={() => {
                          setShowForm(false);
                          setFormErrors({});
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="chat-form-submit"
                        disabled={formSubmitting}
                      >
                        {formSubmitting ? 'Submitting...' : 'Submit Request'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
