import { useState, useEffect } from 'react';
import { Download, Eye } from 'lucide-react';
import { fetchApi } from '../services/api';

interface Application {
  id: number;
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experienceYears: number;
  status: string;
  createdAt: string;
  jobTitle?: string;
  departmentName?: string;
}

export default function Applications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchApi<{ data: Application[] }>('admin/applications');
      if (response.data) setApplications(response.data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetchApi(`admin/applications/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus })
      });
      // Optimistic update
      setApplications(applications.map(app => app.id === id ? { ...app, status: newStatus } : app));
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update application status.');
    }
  };

  const handleDownload = async (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    try {
      // Create a temporary anchor element to trigger the file download
      const response = await fetch(`/api/admin/applications/${id}/resume`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Adjust based on actual auth mechanism
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to download resume');
      }

      // We handle the download by redirecting to the endpoint since it uses express-session cookies.
      // Simply opening it in a new window uses the session cookie naturally.
      window.open(`/api/admin/applications/${id}/resume`, '_blank');
      
    } catch (error) {
      console.error('Failed to download resume:', error);
      alert('Failed to download resume.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Applications</h1>
          <p className="text-sm text-slate-500">Review and manage candidate applications.</p>
        </div>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Candidate</th>
                <th className="px-6 py-4">Applied Role</th>
                <th className="px-6 py-4">Experience</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
                    Loading applications...
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No applications received yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-800">{app.firstName} {app.lastName}</div>
                      <div className="text-xs text-slate-500 flex flex-col gap-1">
                        <a href={`mailto:${app.email}`} className="hover:text-brand-primary">{app.email}</a>
                        <a href={`tel:${app.phone}`} className="hover:text-brand-primary">{app.phone}</a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-700">{app.jobTitle}</div>
                      <div className="text-xs text-slate-500">{app.departmentName}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">
                      {app.experienceYears} Years
                    </td>
                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap">
                      {new Date(app.createdAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border-0 focus:ring-2 focus:ring-brand-primary/20 ${
                          app.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'Reviewed' ? 'bg-slate-200 text-slate-800' :
                          app.status === 'Shortlisted' ? 'bg-amber-100 text-amber-800' :
                          app.status === 'Interview Scheduled' ? 'bg-purple-100 text-purple-800' :
                          app.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={(e) => handleDownload(app.id, e)}
                        className="p-2 text-slate-400 hover:text-brand-primary transition-colors inline-flex items-center gap-1"
                        title="Download Resume"
                      >
                        <Download size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
