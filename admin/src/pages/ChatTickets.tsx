/**
 * ChatTickets.tsx — Admin dashboard for chatbot ticket management
 * 
 * Features:
 * - Paginated data table with status badges
 * - Filters: status, department, search
 * - Ticket detail modal with threaded responses
 * - Assign, update status, and reply actions
 * - CSV export
 * - SLA indicators (overdue highlighting)
 */
import { useState, useEffect, useCallback } from 'react';
import {
  MessageSquareText, ChevronLeft, ChevronRight, Search, Download,
  Clock, AlertTriangle, CheckCircle2, XCircle, User, Send, FileText,
  Filter, Eye,
} from 'lucide-react';
import { fetchApi, type PaginatedResponse } from '../services/api';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

// ─── Types ───
interface Ticket {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  departmentId: number | null;
  departmentName: string | null;
  message: string;
  filePath: string | null;
  fileName: string | null;
  status: string;
  assignedTo: number | null;
  assignedToName: string | null;
  responseCount: number;
  slaDeadline: string | null;
  createdAt: string;
  updatedAt: string;
}

interface TicketResponse {
  id: number;
  ticketId: number;
  adminId: number | null;
  adminName: string | null;
  message: string;
  isInternal: boolean;
  createdAt: string;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
}

interface Department {
  id: number;
  name: string;
}

// ─── Status Config ───
const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  NEW: { label: 'New', color: 'text-blue-700', bg: 'bg-blue-100' },
  ASSIGNED: { label: 'Assigned', color: 'text-amber-700', bg: 'bg-amber-100' },
  IN_PROGRESS: { label: 'In Progress', color: 'text-purple-700', bg: 'bg-purple-100' },
  RESOLVED: { label: 'Resolved', color: 'text-green-700', bg: 'bg-green-100' },
  ARCHIVED: { label: 'Archived', color: 'text-slate-500', bg: 'bg-slate-100' },
};

export default function ChatTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [departments, setDepartments] = useState<Department[]>([]);
  const [admins, setAdmins] = useState<AdminUser[]>([]);

  // Detail modal state
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [ticketResponses, setTicketResponses] = useState<TicketResponse[]>([]);
  const [replyText, setReplyText] = useState('');
  const [replyInternal, setReplyInternal] = useState(false);
  const [replying, setReplying] = useState(false);

  // Stats
  const [stats, setStats] = useState<{
    total: number;
    byStatus: Record<string, number>;
    overdueCount: number;
    todayCount: number;
  } | null>(null);

  // ── Fetch tickets ──
  const fetchTickets = useCallback(async () => {
    setLoading(true);
    try {
      let url = `admin/contacts?page=1`; // Using session auth endpoint pattern
      // Actually use the chat-admin endpoint with session auth fallback
      url = `${API_BASE}/chat-admin/tickets?page=${page}&limit=20`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;

      // Try session auth first (existing admin portal uses sessions)
      const response = await fetch(url, { credentials: 'include' });
      const data = await response.json();

      if (data.success && data.data) {
        setTickets(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, searchQuery]);

  // ── Fetch supporting data ──
  useEffect(() => {
    fetch(`${API_BASE}/chat/departments`)
      .then((r) => r.json())
      .then((d) => { if (d.data) setDepartments(d.data); })
      .catch(() => {});

    fetch(`${API_BASE}/chat-admin/admins`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.data) setAdmins(d.data); })
      .catch(() => {});

    fetch(`${API_BASE}/chat-admin/dashboard/stats`, { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => { if (d.data) setStats(d.data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  // ── Open ticket detail ──
  const openTicket = async (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setReplyText('');
    setReplyInternal(false);
    try {
      const response = await fetch(`${API_BASE}/chat-admin/tickets/${ticket.id}`, {
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success && data.data) {
        setTicketResponses(data.data.responses || []);
      }
    } catch (error) {
      console.error('Failed to fetch ticket details:', error);
    }
  };

  // ── Assign ticket ──
  const assignTicket = async (ticketId: number, adminId: number) => {
    try {
      const response = await fetch(`${API_BASE}/chat-admin/tickets/${ticketId}/assign`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ adminId }),
      });
      if ((await response.json()).success) {
        fetchTickets();
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket((prev) => prev ? { ...prev, assignedTo: adminId, status: 'ASSIGNED' } : null);
        }
      }
    } catch (error) {
      console.error('Failed to assign ticket:', error);
    }
  };

  // ── Update status ──
  const updateStatus = async (ticketId: number, status: string) => {
    try {
      const response = await fetch(`${API_BASE}/chat-admin/tickets/${ticketId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ status }),
      });
      const data = await response.json();
      if (data.success) {
        fetchTickets();
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket((prev) => prev ? { ...prev, status } : null);
        }
      } else {
        alert(data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  // ── Reply to ticket ──
  const submitReply = async () => {
    if (!replyText.trim() || !selectedTicket) return;
    setReplying(true);
    try {
      const response = await fetch(`${API_BASE}/chat-admin/tickets/${selectedTicket.id}/respond`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ message: replyText.trim(), isInternal: replyInternal }),
      });
      const data = await response.json();
      if (data.success) {
        setReplyText('');
        // Re-fetch responses
        openTicket(selectedTicket);
      }
    } catch (error) {
      console.error('Failed to submit reply:', error);
    } finally {
      setReplying(false);
    }
  };

  // ── CSV Export ──
  const exportCSV = () => {
    let url = `${API_BASE}/chat-admin/tickets/export/csv?`;
    if (statusFilter) url += `status=${statusFilter}&`;
    window.open(url, '_blank');
  };

  // ── Check if SLA is overdue ──
  const isOverdue = (ticket: Ticket) => {
    if (!ticket.slaDeadline || ['RESOLVED', 'ARCHIVED'].includes(ticket.status)) return false;
    return new Date(ticket.slaDeadline) < new Date();
  };

  // ── Format date ──
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
    });
  };

  return (
    <div>
      {/* ── Stats Cards ── */}
      {stats && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                <MessageSquareText size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-800">{stats.total}</span>
            </div>
            <p className="text-sm text-slate-500">Active Tickets</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                <Clock size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-800">{stats.byStatus?.NEW || 0}</span>
            </div>
            <p className="text-sm text-slate-500">New (Unread)</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-red-100 flex items-center justify-center text-red-600">
                <AlertTriangle size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-800">{stats.overdueCount}</span>
            </div>
            <p className="text-sm text-slate-500">Overdue SLA</p>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="h-10 w-10 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-2xl font-bold text-slate-800">{stats.todayCount}</span>
            </div>
            <p className="text-sm text-slate-500">Today's Tickets</p>
          </div>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        >
          <option value="">All Statuses</option>
          <option value="NEW">New</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="RESOLVED">Resolved</option>
          <option value="ARCHIVED">Archived</option>
        </select>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm hover:bg-slate-50 transition-colors"
        >
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* ── Tickets Table ── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
          </div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <MessageSquareText size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No tickets found</p>
            <p className="text-sm mt-1">Chatbot fallback submissions will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">ID</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Name</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Department</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Assigned To</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Created</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">SLA</th>
                  <th className="text-right px-5 py-3 font-semibold text-slate-600"></th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => {
                  const statusConf = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.NEW;
                  const overdue = isOverdue(ticket);
                  return (
                    <tr
                      key={ticket.id}
                      className={`border-b border-slate-50 hover:bg-slate-50/80 cursor-pointer transition-colors ${overdue ? 'bg-red-50/40' : ''}`}
                      onClick={() => openTicket(ticket)}
                    >
                      <td className="px-5 py-4 font-mono text-xs text-slate-400">#{ticket.id}</td>
                      <td className="px-5 py-4">
                        <p className="font-medium text-slate-800">{ticket.name}</p>
                        <p className="text-xs text-slate-400">{ticket.email || ticket.phone}</p>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell text-slate-500">
                        {ticket.departmentName || '—'}
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${statusConf.bg} ${statusConf.color}`}>
                          {statusConf.label}
                        </span>
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-slate-500">
                        {ticket.assignedToName || '—'}
                      </td>
                      <td className="px-5 py-4 hidden lg:table-cell text-slate-500 text-xs">
                        {formatDate(ticket.createdAt)}
                      </td>
                      <td className="px-5 py-4">
                        {overdue ? (
                          <span className="inline-flex items-center gap-1 text-red-600 text-xs font-medium">
                            <AlertTriangle size={14} /> Overdue
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">OK</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Eye size={16} className="text-slate-300" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-5 py-4 border-t border-slate-100">
            <span className="text-sm text-slate-500">
              Showing {(page - 1) * 20 + 1}–{Math.min(page * 20, total)} of {total}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-medium text-slate-600">{page}/{totalPages}</span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── Ticket Detail Modal ── */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-800/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedTicket(null)}>
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-800">Ticket #{selectedTicket.id}</h3>
                <p className="text-sm text-slate-500">{selectedTicket.name} — {formatDate(selectedTicket.createdAt)}</p>
              </div>
              <button onClick={() => setSelectedTicket(null)} className="p-2 rounded-lg hover:bg-slate-100 text-slate-400">
                <XCircle size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Contact Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Email</p>
                  <p className="text-sm text-slate-700">{selectedTicket.email || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Phone</p>
                  <p className="text-sm text-slate-700">{selectedTicket.phone || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">Department</p>
                  <p className="text-sm text-slate-700">{selectedTicket.departmentName || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 mb-1">File</p>
                  {selectedTicket.filePath ? (
                    <a
                      href={`${API_BASE.replace('/api', '')}/uploads/tickets/${selectedTicket.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-brand-primary hover:underline flex items-center gap-1"
                    >
                      <FileText size={14} /> {selectedTicket.fileName}
                    </a>
                  ) : <p className="text-sm text-slate-400">None</p>}
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="text-xs font-medium text-slate-400 mb-2">Original Message</p>
                <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-relaxed">
                  {selectedTicket.message}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedTicket.assignedTo || ''}
                  onChange={(e) => e.target.value && assignTicket(selectedTicket.id, Number(e.target.value))}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                >
                  <option value="">Assign to...</option>
                  {admins.map((a) => (
                    <option key={a.id} value={a.id}>{a.name}</option>
                  ))}
                </select>
                <select
                  value={selectedTicket.status}
                  onChange={(e) => updateStatus(selectedTicket.id, e.target.value)}
                  className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white"
                >
                  <option value="NEW">New</option>
                  <option value="ASSIGNED">Assigned</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="RESOLVED">Resolved</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </div>

              {/* Response Thread */}
              <div>
                <p className="text-xs font-medium text-slate-400 mb-3">
                  Responses ({ticketResponses.length})
                </p>
                {ticketResponses.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No responses yet.</p>
                ) : (
                  <div className="space-y-3">
                    {ticketResponses.map((r) => (
                      <div
                        key={r.id}
                        className={`rounded-xl p-4 text-sm ${
                          r.isInternal
                            ? 'bg-amber-50 border border-amber-100'
                            : 'bg-white border border-slate-100'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-700 flex items-center gap-1">
                            <User size={14} /> {r.adminName || 'System'}
                            {r.isInternal && (
                              <span className="text-xs bg-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full ml-2">
                                Internal Note
                              </span>
                            )}
                          </span>
                          <span className="text-xs text-slate-400">{formatDate(r.createdAt)}</span>
                        </div>
                        <p className="text-slate-600 leading-relaxed">{r.message}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Reply Section */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 mb-3">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={replyInternal}
                    onChange={(e) => setReplyInternal(e.target.checked)}
                    className="accent-amber-500"
                  />
                  Internal note
                </label>
              </div>
              <div className="flex gap-2">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={replyInternal ? 'Add an internal note...' : 'Reply to the ticket...'}
                  className="flex-1 px-4 py-2.5 border border-slate-200 rounded-xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                  rows={2}
                  maxLength={2000}
                />
                <button
                  onClick={submitReply}
                  disabled={!replyText.trim() || replying}
                  className="px-4 py-2 bg-brand-primary text-white rounded-xl font-medium text-sm hover:bg-teal-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <Send size={14} /> {replying ? '...' : 'Send'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
