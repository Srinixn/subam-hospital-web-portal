import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Activity, CheckCircle2, ArrowRight, Shield, Stethoscope, Briefcase, Microscope, Zap } from 'lucide-react';

const SERVICES = [
  "Tertiary Level Trauma & Emergency",
  "Modular HEPA-Filtered Theaters",
  "Level III Neonatal Intensive Care",
  "Advanced 128-Slice Digital Imaging",
  "Dialysis & Nephrology Excellence",
  "Comprehensive Critical Care Units"
];

export default function SubamHospital() {
  return (
    <div className="pt-32 min-h-screen bg-white">
      {/* Editorial Hero */}
      <section className="mb-24 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img src="https://srinixnm.github.io/hospital-access/subam.png" alt="Logo" className="h-16 w-auto mb-8 object-contain" />
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-0.5 w-10 bg-teal-600" />
                 <span className="text-teal-600 font-bold tracking-[0.4em] text-[9px] uppercase">Tertiary Medical Hub</span>
              </div>
              <h1 className="text-4xl md:text-6xl text-slate-900 mb-8 leading-[1.1] tracking-tight font-light">Subam <br /><span className="font-bold">Hospital</span></h1>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 font-medium opacity-80">
                Salem's premier multi-specialty destination, integrating advanced medical technology with a patient-first clinical philosophy.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+914311234567" className="px-8 h-14 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-teal-600 transition-all text-[10px] tracking-widest uppercase shadow-xl shadow-slate-900/20">
                  <Activity size={18} className="text-teal-500" /> ER Hotline: 24/7
                </a>
                <button className="px-8 h-14 border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-[10px] tracking-widest uppercase">Specialties</button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] -z-10 -rotate-2" />
              <div className="rounded-[3rem] shadow-premium aspect-[4/5] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                  alt="Hospital Facility" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm">
                    <Shield size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">Accredited Trauma Care</h4>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">Equipped with the fastest surgical response systems in the region.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clinical Portfolio */}
      <section className="py-24 bg-slate-50 relative">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
            <div className="mb-0">
              <span className="text-teal-600 font-black tracking-[0.4em] text-[9px] uppercase mb-4 block underline decoration-teal-600/30 underline-offset-8">Clinical Excellence</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-slate-900 leading-[1.1]">Hospital <br /><span className="font-bold">Infrastructure</span></h2>
            </div>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-md">Our surgical and diagnostic wings are built to international clinical standards, ensuring maximum precision.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-10 rounded-[3rem] shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-700 group border border-slate-100/50"
              >
                <div className="flex items-start justify-between mb-10">
                  <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                    <Microscope size={28} />
                  </div>
                  <span className="text-[9px] font-black text-slate-300 group-hover:text-teal-200 uppercase tracking-widest transition-colors">Wing 0{i + 1}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">{service}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6 opacity-70 text-sm">A dedicated team of consultants and trained paramedical staff ensure round-the-clock efficiency.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 text-teal-600 font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all underline decoration-teal-600/10 underline-offset-6">
                  Consult Specialist <ArrowRight size={16} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
