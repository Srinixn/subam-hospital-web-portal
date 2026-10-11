/**
 * TicketView.tsx — Public, secure patient ticket tracking viewer.
 *
 * Accessible only via: /ticket-view?id=X&token=Y
 * Verifies the ticket's private access token to ensure HIPAA compliance
 * and prevent cross-user ticket scanning.
 */
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileText, MessageSquare, AlertTriangle, CheckCircle,
  Clock, ArrowLeft, Calendar, ShieldCheck, User
} from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

interface PublicTicket {
  id: number;
  name: string;
  status: 'NEW' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED' | 'ARCHIVED';
  createdAt: string;
  responses: Array<{
    id: number;
    message: string;
    adminName: string;
    isAdmin: boolean;
    createdAt: string;
  }>;
}

const STATUS_STEPS = [
  { key: 'NEW', label: 'Received', color: 'text-blue-600', bg: 'bg-blue-50' },
  { key: 'IN_PROGRESS', label: 'In Review', color: 'text-purple-600', bg: 'bg-purple-50' },
  { key: 'RESOLVED', label: 'Resolved', color: 'text-green-600', bg: 'bg-green-50' }
];

export default function TicketView() {
  const [searchParams] = useSearchParams();
  const ticketId = searchParams.get('id');
  const token = searchParams.get('token');

  const [ticket, setTicket] = useState<PublicTicket | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Patient reply form states
  const [replyMessage, setReplyMessage] = useState('');
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [replyError, setReplyError] = useState<string | null>(null);

  const fetchTicketStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/chat/tickets/${ticketId}?token=${token}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to retrieve ticket status');
      }

      setTicket(data.data);
    } catch (err: any) {
      setError(err.message || 'Could not load your ticket. Please verify your link.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!ticketId || !token) {
      setError('Invalid tracking link. Missing ticket ID or access token.');
      setLoading(false);
      return;
    }

    fetchTicketStatus();
  }, [ticketId, token]);

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setReplySubmitting(true);
    setReplyError(null);

    try {
      const res = await fetch(`${API_BASE}/chat/tickets/${ticketId}/reply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          message: replyMessage.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to submit response');
      }

      setReplyMessage('');
      // Reload ticket updates in real time
      await fetchTicketStatus();
    } catch (err: any) {
      setReplyError(err.message || 'Could not send message. Please try again.');
    } finally {
      setReplySubmitting(false);
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600" />
        <p className="text-slate-500 mt-4 font-medium">Securing connection and loading ticket details...</p>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 bg-red-50/50 border border-red-100 rounded-3xl text-center">
        <div className="h-14 w-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-5">
          <AlertTriangle size={28} />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Access Restricted</h3>
        <p className="text-slate-600 text-sm leading-relaxed mb-6">{error || 'Ticket not found.'}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-2xl font-semibold text-sm hover:bg-teal-700 transition-colors shadow-sm"
        >
          <ArrowLeft size={16} /> Return to Homepage
        </Link>
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.findIndex(
    step => step.key === ticket.status || (ticket.status === 'ASSIGNED' && step.key === 'NEW') || (ticket.status === 'ARCHIVED' && step.key === 'RESOLVED')
  );

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* Header back button */}
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-teal-600 hover:text-teal-700 transition-colors">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>

      {/* Main card */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-hidden mb-8">
        {/* Banner header */}
        <div className="bg-gradient-to-r from-teal-600 to-cyan-700 px-8 py-8 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1.5 rounded-full w-fit mb-3">
                <ShieldCheck size={14} /> HIPAA Secure Tracking
              </div>
              <h2 className="text-2xl font-bold">Support Request #{ticket.id}</h2>
              <p className="text-teal-50 text-sm mt-1">Submitted by {ticket.name}</p>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/15">
              <Calendar size={16} />
              <span className="text-sm font-medium">{formatDate(ticket.createdAt)}</span>
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="border-b border-slate-100 px-8 py-6 bg-slate-50/50">
          <div className="flex items-center justify-between max-w-lg mx-auto relative">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />

            {STATUS_STEPS.map((step, idx) => {
              const isActive = idx <= currentStepIndex;
              const isCurrent = step.key === ticket.status;

              return (
                <div key={step.key} className="flex flex-col items-center z-10 relative">
                  <div className={`h-9 w-9 rounded-full flex items-center justify-center border-4 ${
                    isCurrent
                      ? 'bg-teal-600 border-teal-200 text-white animate-pulse'
                      : isActive
                        ? 'bg-teal-600 border-white text-white'
                        : 'bg-white border-slate-200 text-slate-400'
                  } transition-all`}>
                    {idx < currentStepIndex ? <CheckCircle size={16} /> : <Clock size={16} />}
                  </div>
                  <span className={`text-xs font-bold mt-2 ${isActive ? 'text-teal-700 font-extrabold' : 'text-slate-400'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Conversation Responses */}
        <div className="p-8 space-y-6">
          <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2 mb-6">
            <MessageSquare size={20} className="text-teal-600" /> Communication Log
          </h3>

          <div className="space-y-6">
            {/* System confirmation response */}
            <div className="flex gap-4 items-start">
              <div className="h-10 w-10 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck size={18} />
              </div>
              <div className="flex-1 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-slate-800 text-sm">Demo Hospital System</span>
                  <span className="text-xs text-slate-400 font-mono">{formatDate(ticket.createdAt)}</span>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Thank you for contacting Demo Hospital. We have received your inquiry. A clinical administrator or staff member from the matching department will review your details and write a reply here.
                </p>
              </div>
            </div>

            {/* Admin and Patient replies in thread */}
            {ticket.responses.length === 0 ? (
              <div className="flex gap-4 items-start">
                <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                  <Clock size={18} />
                </div>
                <div className="flex-1 bg-amber-50/20 border border-amber-100/50 rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-amber-800 text-sm">Status Update</span>
                    <span className="text-xs text-amber-500 font-semibold">Awaiting Staff Response</span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Our team is currently reviewing your ticket. Any updates or responses will appear directly on this page.
                  </p>
                </div>
              </div>
            ) : (
              ticket.responses.map((response) => {
                const isStaff = response.isAdmin;
                return (
                  <div key={response.id} className="flex gap-4 items-start animate-fade-in">
                    <div className={`h-10 w-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${
                      isStaff ? 'bg-teal-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      <User size={18} />
                    </div>
                    <div className={`flex-1 rounded-2xl p-5 shadow-sm border ${
                      isStaff
                        ? 'bg-teal-50/15 border-teal-600/10'
                        : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
                          {isStaff ? response.adminName : `${ticket.name} (You)`}
                          <span className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-extrabold ${
                            isStaff ? 'bg-teal-100 text-teal-800' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {isStaff ? 'Staff' : 'Patient'}
                          </span>
                        </span>
                        <span className="text-xs text-slate-400 font-mono">{formatDate(response.createdAt)}</span>
                      </div>
                      <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                        {response.message}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Reply form (only if not archived/resolved) */}
        {ticket.status !== 'ARCHIVED' && (
          <div className="border-t border-slate-100 p-8 bg-slate-50/30">
            <h4 className="font-bold text-slate-800 text-sm mb-3">Send a Reply to Staff</h4>

            {replyError && (
              <div className="p-3.5 mb-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-xs font-semibold">
                {replyError}
              </div>
            )}

            <form onSubmit={handleReplySubmit}>
              <div className="relative">
                <textarea
                  className="w-full min-h-[100px] p-4 bg-white border border-slate-200 rounded-2xl text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none transition-all placeholder:text-slate-400"
                  placeholder="Type your message here to update or reply to the hospital staff..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  disabled={replySubmitting}
                  maxLength={1000}
                  required
                />
              </div>
              <div className="flex justify-end mt-3">
                <button
                  type="submit"
                  disabled={replySubmitting || !replyMessage.trim()}
                  className="px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm flex items-center gap-2"
                >
                  {replySubmitting ? 'Sending Reply...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>

      {/* Security note footer */}
      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-start gap-3">
        <FileText size={18} className="text-slate-400 mt-0.5 shrink-0" />
        <p className="text-xs text-slate-500 leading-relaxed">
          <strong>Privacy Note:</strong> This tracking page is cryptographically secured. Please keep this private link safe, as it is the only way to check updates and interact with administrative staff regarding this ticket without administrative credentials.
        </p>
      </div>
    </div>
  );
}
