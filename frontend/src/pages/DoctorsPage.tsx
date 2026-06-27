import { useState, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Users, Building2, Stethoscope, ChevronLeft, ChevronRight } from 'lucide-react';
import { DEPARTMENT_DOCTORS } from '../constants';
import { Link } from 'react-router-dom';

/* ── Department colour map for left-border accents ── */
const DEPT_COLORS: Record<string, string> = {
  'Obstetrics & Gynaecology': '#E11D48',   // rose
  'Paediatrics':              '#7C3AED',   // violet
  'Radiology':                '#2563EB',   // blue
  'General Medicine':         '#0D9488',   // teal
  'General Surgery':          '#D97706',   // amber
  'Anaesthesia':              '#4F46E5',   // indigo
  'Orthopaedics':             '#059669',   // emerald
  'Nephrology':               '#0891B2',   // cyan
  'Dermatology':              '#DB2777',   // pink
  'Cardiology':               '#DC2626',   // red
  'Urology':                  '#D97706',   // amber
  'Psychiatry':               '#10B981',   // emerald
  'Inhouse Doctors':          '#6366F1',   // indigo-alt
};

function getDeptColor(dept: string) {
  return DEPT_COLORS[dept] || '#0D9488';
}

interface DoctorsPageProps {
  bgImage?: string;
}

export default function DoctorsPage({ 
  bgImage = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
}: DoctorsPageProps) {
  const [activeDept, setActiveDept] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  /* Compute totals for stats bar */
  const totalDoctors = useMemo(
    () => DEPARTMENT_DOCTORS.reduce((sum, d) => sum + d.doctors.length, 0),
    []
  );
  const totalDepts = DEPARTMENT_DOCTORS.length;

  /* Departments to render — filter if a tab is active */
  const visibleDepts = activeDept
    ? DEPARTMENT_DOCTORS.filter(d => d.department === activeDept)
    : DEPARTMENT_DOCTORS;

  const scrollNav = (dir: 'left' | 'right') => {
    navRef.current?.scrollBy({ left: dir === 'left' ? -200 : 200, behavior: 'smooth' });
  };

  return (
    <div className="pt-16 sm:pt-24 min-h-screen">

      {/* ━━ Hero (compact) ━━ */}
      <section className="bg-brand-dark py-12 sm:py-20 md:py-24 relative overflow-hidden">
        {bgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/90 to-brand-dark/75 backdrop-blur-[2px]" />
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary via-transparent to-transparent" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase mb-3 sm:mb-4 block"
            >
              Our Medical Team
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6 font-display leading-[1.1] sm:leading-[0.95]"
            >
              Meet Our <br /> <span className="text-brand-primary italic">Expert Specialists</span>
            </motion.h1>
            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl leading-relaxed">
              A distinguished team of consultants, surgeons and specialists — delivering world-class care across every discipline.
            </p>
          </div>
        </div>
      </section>

      {/* ━━ Stats Banner ━━ */}
      <section className="bg-white border-b border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-3 divide-x divide-slate-100">
            {[
              { icon: Users, value: `${totalDoctors}+`, label: 'Specialist Doctors' },
              { icon: Building2, value: `${totalDepts}`, label: 'Departments' },
              { icon: Stethoscope, value: '12+', label: 'Years of Trust' },
            ].map((stat) => (
              <div key={stat.label} className="py-4 sm:py-6 md:py-8 text-center flex flex-col items-center gap-1">
                <stat.icon size={20} className="text-brand-primary mb-1 hidden sm:block" />
                <p className="text-xl sm:text-2xl md:text-3xl font-display font-black text-brand-primary leading-none">{stat.value}</p>
                <p className="text-[8px] sm:text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━ Department Navigation ━━ */}
      <div className="bg-white py-3 sticky top-16 md:top-20 z-40 border-b border-slate-100 shadow-sm">
        <div className="container-custom relative">
          {/* Scroll arrows */}
          <button
            onClick={() => scrollNav('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors hidden md:flex"
          >
            <ChevronLeft size={16} className="text-slate-500" />
          </button>
          <button
            onClick={() => scrollNav('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 bg-white border border-slate-200 rounded-full flex items-center justify-center shadow-sm hover:bg-slate-50 transition-colors hidden md:flex"
          >
            <ChevronRight size={16} className="text-slate-500" />
          </button>

          <div
            ref={navRef}
            className="flex gap-2 overflow-x-auto no-scrollbar md:px-10 py-1"
          >
            {/* "All" pill */}
            <button
              onClick={() => setActiveDept(null)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all ${
                activeDept === null
                  ? 'bg-brand-primary text-white border-brand-primary shadow-md shadow-teal-500/20'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary hover:text-brand-primary'
              }`}
            >
              All ({totalDoctors})
            </button>
            {DEPARTMENT_DOCTORS.map((dept) => (
              <button
                key={dept.department}
                onClick={() => setActiveDept(dept.department === activeDept ? null : dept.department)}
                className={`shrink-0 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wide border transition-all flex items-center gap-2 ${
                  activeDept === dept.department
                    ? 'text-white border-transparent shadow-md'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
                style={
                  activeDept === dept.department
                    ? { backgroundColor: getDeptColor(dept.department), borderColor: getDeptColor(dept.department) }
                    : undefined
                }
              >
                <span>{dept.department}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-black ${
                  activeDept === dept.department
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 text-slate-500'
                }`}>
                  {dept.doctors.length}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ━━ Doctors Grid ━━ */}
      <section className="py-12 md:py-16 bg-slate-50/80 min-h-[60vh]">
        <div className="container-custom">
          {visibleDepts.map((dept) => (
            <div key={dept.department} id={`dept-${dept.department.replace(/\s+/g, '-').toLowerCase()}`} className="mb-12 last:mb-0">

              {/* Department header — slim */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="h-6 w-1 rounded-full"
                  style={{ backgroundColor: getDeptColor(dept.department) }}
                />
                <h2 className="text-lg md:text-xl font-display text-brand-dark tracking-tight">{dept.department}</h2>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                  {dept.doctors.length} {dept.doctors.length === 1 ? 'doctor' : 'doctors'}
                </span>
                <div className="flex-1 h-px bg-slate-200/80 ml-4" />
              </div>

              {/* Doctor cards — 3 cols desktop, 2 tablet, 1 mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dept.doctors.map((doctor, idx) => (
                  <motion.div
                    key={doctor.id}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ delay: idx * 0.05, duration: 0.35 }}
                    className="group relative bg-white rounded-2xl p-5 flex items-start gap-5 border border-slate-100 hover:shadow-lg hover:border-transparent hover:-translate-y-0.5 transition-all duration-300"
                    style={{ borderLeftWidth: '3px', borderLeftColor: getDeptColor(dept.department) }}
                  >
                    {/* Circular avatar */}
                    <div className="shrink-0">
                      <div className="h-24 w-24 rounded-full overflow-hidden ring-2 ring-slate-100 group-hover:ring-brand-primary/30 transition-all shadow-sm bg-slate-50 flex items-center justify-center relative">
                        <Users className="h-8 w-8 text-slate-300 absolute" />
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0 py-1">
                      <h3 className="text-lg font-bold text-brand-dark leading-snug truncate">{doctor.name}</h3>
                      {doctor.role && (
                        <p
                          className="text-sm font-semibold mt-1 leading-snug"
                          style={{ color: getDeptColor(dept.department) }}
                        >
                          {doctor.role}
                        </p>
                      )}
                      {doctor.qualifications && (
                        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-2">{doctor.qualifications}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ━━ CTA: Join Our Team ━━ */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="container-custom">
          <div className="bg-brand-primary rounded-2xl sm:rounded-3xl lg:rounded-[4rem] p-6 sm:p-12 md:p-20 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 text-white text-center lg:text-left">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-4xl md:text-5xl text-white mb-3 sm:mb-4 font-display">Join our clinical faculty</h2>
              <p className="text-teal-50 text-sm sm:text-lg opacity-85 leading-relaxed">We are looking for passionate specialists to join our award-winning team. Experience a culture of innovation and collaboration.</p>
            </div>
            <Link to="/contact" className="h-14 px-10 bg-brand-dark text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:scale-105 transition-transform whitespace-nowrap shrink-0">
              <span>View Open Positions</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
