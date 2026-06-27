import { useState } from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';

interface ApplicationFormProps {
  jobId: number;
}

export default function ApplicationForm({ jobId }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experienceYears: ''
  });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        setResume(null);
        return;
      }
      setResume(file);
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError('Please upload your resume');
      return;
    }
    setError('');
    setLoading(true);

    const data = new FormData();
    data.append('firstName', formData.firstName);
    data.append('lastName', formData.lastName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('experienceYears', formData.experienceYears);
    data.append('resume', resume);

    try {
      const res = await fetch(`/api/public/jobs/${jobId}/apply`, {
        method: 'POST',
        body: data,
      });
      const json = await res.json();
      if (json.success) {
        setSuccess(true);
      } else {
        setError(json.message || 'Failed to submit application');
      }
    } catch (err) {
      console.error('Submit error:', err);
      setError('A network error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-10 bg-green-50 rounded-2xl border border-green-100">
        <CheckCircle2 size={64} className="mx-auto text-green-500 mb-6" />
        <h3 className="text-2xl font-bold text-green-900 mb-2">Application Submitted!</h3>
        <p className="text-green-700 max-w-md mx-auto">
          Thank you for applying to Subam Hospital. Our HR team will review your application and get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl font-medium border border-red-100 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">First Name *</label>
          <input 
            type="text" name="firstName" required
            className="w-full text-base h-14 px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none"
            value={formData.firstName} onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Last Name *</label>
          <input 
            type="text" name="lastName" required
            className="w-full text-base h-14 px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none"
            value={formData.lastName} onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
          <input 
            type="email" name="email" required
            className="w-full text-base h-14 px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none"
            value={formData.email} onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number *</label>
          <input 
            type="tel" name="phone" required
            className="w-full text-base h-14 px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none"
            value={formData.phone} onChange={handleChange}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Years of Experience *</label>
        <input 
          type="number" min="0" name="experienceYears" required
          className="w-full text-base h-14 px-4 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all outline-none"
          value={formData.experienceYears} onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-slate-700 mb-2">Resume (PDF, DOC, DOCX - Max 5MB) *</label>
        <div className="relative">
          <input 
            type="file" 
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            required
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <div className={`w-full border-2 border-dashed rounded-xl p-4 sm:p-8 flex flex-col items-center justify-center transition-colors ${resume ? 'border-brand-primary bg-brand-primary/5' : 'border-slate-300 bg-white hover:bg-slate-50'}`}>
            <UploadCloud size={32} className={`mb-3 ${resume ? 'text-brand-primary' : 'text-slate-400'}`} />
            <p className="text-xs sm:text-sm font-medium text-slate-600 text-center">
              {resume ? resume.name : "Drag and drop your resume here, or click to browse"}
            </p>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="w-full h-14 bg-brand-primary text-white font-bold rounded-xl hover:bg-teal-700 transition-colors flex items-center justify-center disabled:opacity-70"
      >
        {loading ? (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        ) : (
          "Submit Application"
        )}
      </button>
    </form>
  );
}
