import { useState, useEffect } from 'react';
import { Star, CheckCircle2, Circle, ChevronLeft, ChevronRight } from 'lucide-react';
import { fetchApi, PaginatedResponse } from '../services/api';

interface Feedback {
  id: number;
  patientName: string;
  phone: string;
  email: string;
  rating: number;
  comments: string;
  isRead: boolean;
  createdAt: string;
}

export default function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterRead, setFilterRead] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      let url = `admin/feedbacks?page=${page}&limit=10`;
      if (filterRead === 'read') url += '&isRead=true';
      if (filterRead === 'unread') url += '&isRead=false';
      if (filterRating !== 'all') url += `&rating=${filterRating}`;

      const response = await fetchApi<PaginatedResponse<Feedback>>(url);
      if (response.success && response.data) {
        setFeedbacks(response.data);
        setTotalPages(response.pagination?.totalPages || 1);
      }
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, [page, filterRead, filterRating]);

  const toggleReadStatus = async (id: number, currentStatus: boolean) => {
    try {
      setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, isRead: !currentStatus } : f));
      
      await fetchApi(`admin/feedbacks/${id}/read`, {
        method: 'PATCH',
        body: JSON.stringify({ isRead: !currentStatus })
      });
    } catch (error) {
      setFeedbacks(feedbacks.map(f => f.id === id ? { ...f, isRead: currentStatus } : f));
      console.error('Failed to update read status:', error);
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={14} 
            className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-200'} 
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Patient Feedback</h1>
          <p className="text-sm text-slate-500">Manage patient reviews and suggestions.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <select 
            value={filterRating}
            onChange={(e) => { setFilterRating(e.target.value); setPage(1); }}
            className="h-10 bg-white border border-slate-200 rounded-lg px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
          >
            <option value="all">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
          <select 
            value={filterRead}
            onChange={(e) => { setFilterRead(e.target.value); setPage(1); }}
            className="h-10 bg-white border border-slate-200 rounded-lg px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary"
          >
            <option value="all">All Feedback</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read Only</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 w-16">Status</th>
                <th className="px-6 py-4">Patient Info</th>
                <th className="px-6 py-4">Rating</th>
                <th className="px-6 py-4">Comments</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
                    Loading feedback...
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No feedback found matching your criteria.
                  </td>
                </tr>
              ) : (
                feedbacks.map((feedback) => (
                  <tr key={feedback.id} className={`hover:bg-slate-50 transition-colors ${!feedback.isRead ? 'bg-brand-primary/5' : ''}`}>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => toggleReadStatus(feedback.id, feedback.isRead)}
                        className={`p-1 rounded-full transition-colors ${feedback.isRead ? 'text-slate-400 hover:text-slate-600' : 'text-brand-primary hover:text-teal-800'}`}
                        title={feedback.isRead ? "Mark as unread" : "Mark as read"}
                      >
                        {feedback.isRead ? <CheckCircle2 size={24} /> : <Circle fill="currentColor" size={24} />}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800 mb-1">{feedback.patientName}</div>
                      <div className="text-xs text-slate-500 flex flex-col gap-1">
                        {feedback.email ? <a href={`mailto:${feedback.email}`} className="hover:text-brand-primary transition-colors">{feedback.email}</a> : <span className="italic">No email</span>}
                        {feedback.phone ? <a href={`tel:${feedback.phone}`} className="hover:text-brand-primary transition-colors">{feedback.phone}</a> : <span className="italic">No phone</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {renderStars(feedback.rating)}
                    </td>
                    <td className="px-6 py-4 max-w-sm">
                      <p className="text-slate-600 line-clamp-3" title={feedback.comments}>{feedback.comments}</p>
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(feedback.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                      <div className="text-xs mt-1">
                        {new Date(feedback.createdAt).toLocaleTimeString('en-US', {
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
