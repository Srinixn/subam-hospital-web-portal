import { useState, useEffect } from 'react';
import { Users, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { fetchApi, PaginatedResponse } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalContacts: 0,
    totalFeedbacks: 0,
    unreadContacts: 0,
    unreadFeedbacks: 0,
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [contactsRes, feedbacksRes, unreadContactsRes, unreadFeedbacksRes] = await Promise.all([
          fetchApi<PaginatedResponse<any>>('admin/contacts?limit=1'),
          fetchApi<PaginatedResponse<any>>('admin/feedbacks?limit=1'),
          fetchApi<PaginatedResponse<any>>('admin/contacts?limit=1&isRead=false'),
          fetchApi<PaginatedResponse<any>>('admin/feedbacks?limit=1&isRead=false')
        ]);

        setStats({
          totalContacts: contactsRes.pagination?.total || 0,
          totalFeedbacks: feedbacksRes.pagination?.total || 0,
          unreadContacts: unreadContactsRes.pagination?.total || 0,
          unreadFeedbacks: unreadFeedbacksRes.pagination?.total || 0,
          loading: false
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Total Inquiries',
      value: stats.totalContacts,
      badge: `${stats.unreadContacts} Unread`,
      icon: Users,
      color: 'bg-teal-50 text-brand-primary'
    },
    {
      title: 'Patient Feedback',
      value: stats.totalFeedbacks,
      badge: `${stats.unreadFeedbacks} Unread`,
      icon: MessageSquare,
      color: 'bg-orange-50 text-brand-secondary'
    },
    {
      title: 'Response Rate',
      value: '94%',
      badge: '+2.4%',
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600'
    },
    {
      title: 'Avg. Resolution',
      value: '4h 20m',
      badge: '-12m today',
      icon: Clock,
      color: 'bg-blue-50 text-blue-600'
    }
  ];

  if (stats.loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Welcome Back!</h1>
        <p className="text-slate-500">Here's what's happening at Subam Hospital today.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="card p-6 border-slate-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-6">
              <div className={`h-12 w-12 rounded-2xl ${stat.color} flex items-center justify-center`}>
                <stat.icon size={24} />
              </div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                {stat.badge}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
