import { useState, useEffect } from 'react';
import { Mail, CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchApi, PaginatedResponse } from '../services/api';

interface Contact {
  id: number;
  fullName: string;
  phone: string;
  email: string;
  inquiryType: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterRead, setFilterRead] = useState<string>('all');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      let url = `admin/contacts?page=${page}&limit=10`;
      if (filterRead === 'read') url += '&isRead=true';
      if (filterRead === 'unread') url += '&isRead=false';

      const response = await fetchApi<PaginatedResponse<Contact>>(url);
      if (response.success && response.data) {
        setContacts(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [page, filterRead]);

  const toggleReadStatus = async (id: number, currentStatus: boolean) => {
    try {
      // Optimistic update
      setContacts(contacts.map(c => c.id === id ? { ...c, isRead: !currentStatus } : c));
      
      await fetchApi(`admin/contacts/${id}/read`, {
        method: 'PATCH',
        body: JSON.stringify({ isRead: !currentStatus })
      });
    } catch (error) {
      // Revert on error
      setContacts(contacts.map(c => c.id === id ? { ...c, isRead: currentStatus } : c));
      console.error('Failed to update read status:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Contact Inquiries</h1>
          <p className="text-sm text-slate-500">Manage public contact form submissions.</p>
        </div>
        
        <select 
          value={filterRead}
          onChange={(e) => { setFilterRead(e.target.value); setPage(1); }}
          className="h-10 bg-white border border-slate-200 rounded-lg px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
        >
          <option value="all">All Inquiries</option>
          <option value="unread">Unread Only</option>
          <option value="read">Read Only</option>
        </select>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Inquiry Type</th>
                <th className="px-6 py-4">Message Details</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
                    Loading inquiries...
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No inquiries found matching your criteria.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className={`hover:bg-slate-50 transition-colors ${!contact.isRead ? 'bg-brand-primary/5' : ''}`}>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleReadStatus(contact.id, contact.isRead)}
                        className={`p-1 rounded-full transition-colors ${contact.isRead ? 'text-slate-400 hover:text-slate-600' : 'text-brand-primary hover:text-teal-800'}`}
                        title={contact.isRead ? "Mark as unread" : "Mark as read"}
                      >
                        {contact.isRead ? <CheckCircle2 size={24} /> : <Circle fill="currentColor" size={24} />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 mb-1">{contact.fullName}</div>
                      <div className="text-xs text-slate-500 flex flex-col gap-1">
                        <a href={`mailto:${contact.email}`} className="hover:text-brand-primary transition-colors">{contact.email}</a>
                        <a href={`tel:${contact.phone}`} className="hover:text-brand-primary transition-colors">{contact.phone}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800 whitespace-nowrap">
                        {contact.inquiryType}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="text-slate-600 line-clamp-3" title={contact.message}>{contact.message}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(contact.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                      <div className="text-xs mt-1">
                        {new Date(contact.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between bg-slate-50">
            <span className="text-sm text-slate-500">
              Page <span className="font-bold text-slate-800">{page}</span> of <span className="font-bold text-slate-800">{totalPages}</span>
            </span>
            <div className="flex gap-2">
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 hover:text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
