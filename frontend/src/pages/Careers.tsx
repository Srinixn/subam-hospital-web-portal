import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface Job {
    id: number;
    title: string;
    slug: string;
    departmentName: string;
    employmentType: string;
    location?: string;
    experience?: string;
}

export default function Careers() {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await api.getJobs<Job>();
                if (res.success && res.data) {
                    setJobs(res.data);
                }
            } catch (error) {
                console.error('Failed to fetch jobs:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);
    return (
        <div className="pt-32 pb-24 bg-white">
            <div className="container-custom">
                <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
                    <div>
                        <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Join Our Team</span>
                        <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
                            Heal with <span className="text-brand-primary italic">Purpose.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10">
                            We are always looking for compassionate, skilled professionals who share our commitment to patient-centric healthcare and clinical excellence.
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-colors hover:border-brand-primary/20">
                                <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary mb-4">
                                    <Star size={20} />
                                </div>
                                <h4 className="font-bold text-brand-dark mb-1">Growth Mindset</h4>
                                <p className="text-xs text-slate-500">Continuous clinical training and workshops.</p>
                            </div>
                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 transition-colors hover:border-brand-primary/20">
                                <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-brand-primary mb-4">
                                    <Heart size={20} />
                                </div>
                                <h4 className="font-bold text-brand-dark mb-1">Caring Culture</h4>
                                <p className="text-xs text-slate-500">Collaborative and empathetic work environment.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="rounded-[4rem] overflow-hidden shadow-premium aspect-[4/5] border-[12px] border-slate-50">
                            <img
                                src="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&q=80&w=1200"
                                alt="Medical Professionals"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-8 -right-8 bg-brand-primary p-12 rounded-[3.5rem] text-white hidden md:block">
                            <p className="text-5xl font-display font-black leading-none mb-2">120+</p>
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Doctors & Staff</p>
                        </div>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display text-brand-dark mb-12">Current Openings</h2>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="py-12 text-center text-slate-500">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary mx-auto mb-4"></div>
                                Loading openings...
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="py-12 text-center text-slate-500 bg-slate-50 rounded-3xl border border-slate-100">
                                No open positions currently available. Please check back later.
                            </div>
                        ) : (
                            jobs.map((job, i) => (
                                <motion.div
                                    key={job.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-white border border-slate-100 rounded-[2.5rem] hover:shadow-premium transition-all group"
                                >
                                    <div className="flex gap-6 items-center mb-6 md:mb-0">
                                        <div className="h-14 w-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-colors shrink-0">
                                            <Briefcase size={28} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{job.title}</h3>
                                            <div className="flex flex-wrap gap-4 mt-2">
                                                <span className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-slate-400"><MapPin size={12} /> Trichy</span>
                                                <span className="flex items-center gap-1 text-[10px] uppercase font-black tracking-widest text-slate-400"><Clock size={12} /> {job.employmentType}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-8">
                                        <div className="hidden md:block text-right">
                                            <p className="text-xs font-bold text-slate-500 mb-1">{job.departmentName}</p>
                                        </div>
                                        <Link to={`/careers/${job.slug}`} className="h-14 px-8 bg-brand-dark text-white rounded-2xl font-bold flex items-center gap-2 hover:bg-brand-primary transition-colors shadow-lg whitespace-nowrap">
                                            View Details <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20 text-center">
                    <h3 className="text-3xl font-display text-brand-dark mb-6">Didn't find your role?</h3>
                    <p className="text-slate-500 mb-10 max-w-xl mx-auto font-medium">Send us your CV anyway. We are always happy to connect with talented healthcare professionals for future opportunities.</p>
                    <a href="mailto:hr@subamhospital.com" className="text-brand-primary font-black uppercase tracking-[0.2em] text-sm hover:underline underline-offset-8 transition-all">
                        hr@subamhospital.com
                    </a>
                </div>
            </div>
        </div>
    );
}
