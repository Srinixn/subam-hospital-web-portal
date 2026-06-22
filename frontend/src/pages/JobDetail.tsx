import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Briefcase, MapPin, Clock, ArrowLeft } from 'lucide-react';
import ApplicationForm from '../components/ApplicationForm';
import { fetchApi } from '../services/api'; // I'll assume they have this based on admin, or I'll just use fetch

interface Job {
  id: number;
  title: string;
  departmentName: string;
  employmentType: string;
  description: string;
  requirements: string;
}

export default function JobDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        // Simple fetch
        const res = await fetch(`/api/public/jobs/${slug}`);
        const json = await res.json();
        if (json.success) {
          setJob(json.data);
        }
      } catch (err) {
        console.error('Failed to fetch job:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-24 min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="pt-40 pb-24 text-center container-custom min-h-[60vh]">
        <h1 className="text-4xl font-display text-brand-dark mb-6">Job Not Found</h1>
        <p className="text-slate-500 mb-8">The position you are looking for might have been closed.</p>
        <Link to="/careers" className="btn-primary inline-flex items-center gap-2">
          <ArrowLeft size={20} /> Back to Careers
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container-custom max-w-4xl">
        <Link to="/careers" className="inline-flex items-center gap-2 text-brand-primary font-bold hover:underline mb-10">
          <ArrowLeft size={20} /> Back to Careers
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display text-brand-dark mb-6 leading-tight">{job.title}</h1>
          <div className="flex flex-wrap gap-4 md:gap-8 items-center border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Briefcase size={20} className="text-brand-primary" />
              {job.departmentName}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <Clock size={20} className="text-brand-primary" />
              {job.employmentType}
            </div>
            <div className="flex items-center gap-2 text-slate-500 font-medium">
              <MapPin size={20} className="text-brand-primary" />
              Subam Hospital, Trichy
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-slate max-w-none mb-16">
          <h3 className="text-2xl font-bold text-brand-dark mb-4">Job Description</h3>
          <div className="whitespace-pre-wrap text-slate-600 mb-10">{job.description}</div>
          
          <h3 className="text-2xl font-bold text-brand-dark mb-4">Requirements</h3>
          <div className="whitespace-pre-wrap text-slate-600">{job.requirements}</div>
        </div>

        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100" id="apply-section">
          <h2 className="text-3xl font-display text-brand-dark mb-8">Apply for this Position</h2>
          <ApplicationForm jobId={job.id} />
        </div>
      </div>
    </div>
  );
}
