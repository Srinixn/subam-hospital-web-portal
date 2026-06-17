import { motion } from 'motion/react';
import { HeartPulse, CheckCircle2, ArrowRight, ShieldCheck, Clock, Users, Microscope, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  "Comprehensive Obstetric & Prenatal Care",
  "High-Risk Pregnancy Management Unit",
  "Advanced Minimally Invasive Surgery",
  "Pain-Free Labor & Delivery Suites",
  "Specialized Adolescent Health Clinics",
  "Post-Natal Recovery & Wellness Hub"
];

export default function SunsrishtiWomensCare() {
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
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-0.5 w-10 bg-teal-600" />
                 <span className="text-teal-600 font-bold tracking-[0.4em] text-[9px] uppercase">Gynae-Obstetric Hub</span>
              </div>
              <h1 className="text-4xl md:text-6xl text-slate-900 mb-8 leading-[1.1] tracking-tight font-light">Sunsrishti <br /><span className="font-bold">Women's Care</span></h1>
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed mb-10 font-medium opacity-80">
                A sanctuary of clinical excellence, dedicated to empowering every stage of womanhood with advanced surgical care and compassionate maternity services.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 h-14 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-teal-600 transition-all text-[10px] tracking-widest uppercase shadow-xl shadow-slate-900/20">
                  <Calendar size={18} className="text-teal-500" /> Book Consultation
                </Link>
                <button className="px-8 h-14 border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-[10px] tracking-widest uppercase">Our Wings</button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-6 bg-slate-50 rounded-[3rem] -z-10 rotate-2" />
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                alt="Women's Care" 
                className="rounded-[3rem] shadow-premium aspect-[4/5] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-slate-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 bg-teal-50 rounded-2xl flex items-center justify-center text-teal-600 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 leading-tight tracking-tight">Accredited Maternal Hub</h4>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">Providing the highest standards of safety for the mother and child journey.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialty Grid */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
            <div>
              <span className="text-teal-600 font-black tracking-[0.4em] text-[10px] uppercase mb-4 block underline decoration-teal-600/30 underline-offset-8">Clinical Portfolios</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-slate-900 leading-[1.1]">Women's <br /><span className="font-bold">Health Care</span></h2>
            </div>
            <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-md">Our wings are designed for privacy and precision, managed by Salem's leading gynaecologists.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-700 group"
              >
                <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                  <CheckCircle2 size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-5 leading-tight tracking-tight">{feature}</h3>
                <div className="flex items-center gap-3 text-teal-600 font-black text-[9px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
