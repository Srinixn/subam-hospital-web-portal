/**
 * AuditLog.tsx — Read-only admin audit trail viewer
 * 
 * Displays all admin actions logged by the system.
 * No delete or edit capability — append-only log.
 */
import { useState, useEffect, useCallback } from 'react';
import { Shield, ChevronLeft, ChevronRight, Search, Filter } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

interface AuditEntry {
  id: number;
  adminId: number | null;
  adminName: string | null;
  action: string;
  entity: string;
  entityId: number | null;
  details: string | null;
  ipAddress: string | null;
  createdAt: string;
}

// Action display labels and colors
const ACTION_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  LOGIN: { label: 'Login', color: 'text-blue-700', bg: 'bg-blue-100' },
  CREATE_TICKET: { label: 'Ticket Created', color: 'text-green-700', bg: 'bg-green-100' },
  ASSIGN_TICKET: { label: 'Ticket Assigned', color: 'text-amber-700', bg: 'bg-amber-100' },
  UPDATE_TICKET_STATUS: { label: 'Status Changed', color: 'text-purple-700', bg: 'bg-purple-100' },
  ADD_RESPONSE: { label: 'Reply Added', color: 'text-teal-700', bg: 'bg-teal-100' },
  ADD_INTERNAL_NOTE: { label: 'Internal Note', color: 'text-slate-700', bg: 'bg-slate-100' },
  CREATE_FAQ: { label: 'FAQ Created', color: 'text-green-700', bg: 'bg-green-100' },
  UPDATE_FAQ: { label: 'FAQ Updated', color: 'text-blue-700', bg: 'bg-blue-100' },
  DELETE_FAQ: { label: 'FAQ Deleted', color: 'text-red-700', bg: 'bg-red-100' },
};

export default function AuditLog() {
  const [logs, setLogs] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [actionFilter, setActionFilter] = useState('');

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      let url = `${API_BASE}/chat-admin/audit-logs?page=${page}&limit=50`;
      if (actionFilter) url += `&action=${actionFilter}`;

      const response = await fetch(url, { credentials: 'include' });
      const data = await response.json();

      if (data.success) {
        setLogs(data.data || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      }
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  }, [page, actionFilter]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    });
  };

  const parseDetails = (details: string | null): Record<string, any> | null => {
    if (!details) return null;
    try { return JSON.parse(details); } catch { return null; }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Shield size={22} className="text-brand-primary" /> Audit Log
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Immutable record of all admin actions ({total} entries)
        </p>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-3 mb-6">
        <select
          value={actionFilter}
          onChange={(e) => { setActionFilter(e.target.value); setPage(1); }}
          className="px-4 py-2.5 border border-slate-200 rounded-xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
        >
          <option value="">All Actions</option>
          <option value="LOGIN">Login</option>
          <option value="CREATE_TICKET">Ticket Created</option>
          <option value="ASSIGN_TICKET">Ticket Assigned</option>
          <option value="UPDATE_TICKET_STATUS">Status Changed</option>
          <option value="ADD_RESPONSE">Reply Added</option>
          <option value="ADD_INTERNAL_NOTE">Internal Note</option>
          <option value="CREATE_FAQ">FAQ Created</option>
          <option value="UPDATE_FAQ">FAQ Updated</option>
          <option value="DELETE_FAQ">FAQ Deleted</option>
        </select>
      </div>

      {/* Log Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary" />
          </div>
        ) : logs.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <Shield size={48} className="mx-auto mb-4 opacity-30" />
            <p className="font-medium">No audit entries found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Timestamp</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Admin</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600">Action</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden md:table-cell">Entity</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">Details</th>
                  <th className="text-left px-5 py-3 font-semibold text-slate-600 hidden lg:table-cell">IP</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                  const conf = ACTION_CONFIG[log.action] || {
                    label: log.action, color: 'text-slate-600', bg: 'bg-slate-100',
                  };
                  const details = parseDetails(log.details);

                  return (
                    <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                      <td className="px-5 py-3.5 text-xs text-slate-500 font-mono whitespace-nowrap">
                        {formatDate(log.createdAt)}
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">
                        {log.adminName || 'System'}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${conf.bg} ${conf.color}`}>
                          {conf.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 hidden md:table-cell text-slate-500">
                        {log.entity}
                        {log.entityId && <span className="text-slate-400 ml-1">#{log.entityId}</span>}
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell text-xs text-slate-400 max-w-[200px] truncate">
                        {details ? JSON.stringify(details) : '—'}
                      </td>
                      <td className="px-5 py-3.5 hidden lg:table-cell text-xs text-slate-400 font-mono">
                        {log.ipAddress || '—'}
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
              Page {page} of {totalPages} ({total} total)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages}
                className="p-2 rounded-lg border border-slate-200 hover:bg-slate-50 disabled:opacity-30"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
