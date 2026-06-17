import { motion } from 'motion/react';
import { Search, Filter, ArrowRight, Award, BookOpen, Clock } from 'lucide-react';
import { DOCTORS } from '../constants';
import { Link } from 'react-router-dom';

export default function DoctorsPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Search & Header Section */}
      <section className="bg-brand-dark py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
           <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary via-transparent to-transparent" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
             <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-brand-primary font-bold tracking-[0.3em] text-xs uppercase mb-6 block"
            >
              Academic Clinical Excellence
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-[5.5rem] text-white mb-10 font-display leading-[0.95]"
            >
              Excellence Driven by <br /> <span className="text-brand-primary italic">Expert Minds</span>
            </motion.h1>
            
            <p className="text-slate-400 text-xl max-w-2xl mb-12 leading-relaxed">
              Our specialists are more than just doctors; they are pioneers in their respective fields, committed to clinical research and patient safety.
            </p>

            {/* Premium Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 p-3 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
               <div className="flex-grow relative">
                 <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30" size={24} />
                 <input 
                  className="w-full h-16 bg-transparent pl-16 pr-6 text-white focus:outline-none placeholder:text-white/20 text-lg" 
                  placeholder="Search by specialty, condition or expert name..." 
                />
               </div>
               <button className="h-16 px-12 bg-brand-primary text-white font-bold rounded-[1.75rem] flex items-center justify-center gap-3 hover:bg-teal-700 transition-all shadow-lg shadow-teal-500/20">
                 <Search size={20} />
                 <span>Find Your Expert</span>
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specialist Filter & Navigation */}
      <div className="bg-white py-10 sticky top-20 z-40 border-b border-slate-100">
        <div className="container-custom flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
          <div className="flex gap-4 items-center whitespace-nowrap">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mr-4">Disciplines:</span>
            {['All Experts', 'Obstetrics', 'Gynecology', 'Fertility', 'Pediatrics', 'Critical Care'].map((tab) => (
              <button key={tab} className="px-6 py-2.5 rounded-xl border border-slate-100 text-sm font-bold text-slate-600 hover:border-brand-primary hover:text-brand-primary transition-all bg-slate-50">
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 text-brand-dark font-bold text-sm bg-slate-100 px-6 py-2.5 rounded-xl">
             <Filter size={16} />
             <span>Advanced Filter</span>
          </button>
        </div>
      </div>

      {/* Grid Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-10">
            {DOCTORS.map((doctor, idx) => (
              <motion.div
                key={doctor.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-[3.5rem] p-10 flex flex-col xl:flex-row gap-10 shadow-sm border border-slate-100 hover:shadow-premium transition-all group"
              >
                <div className="relative shrink-0 mx-auto xl:mx-0">
                  <div className="h-80 w-64 rounded-[3rem] overflow-hidden shadow-xl">
                    <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-3xl flex items-center gap-2">
                     <Award className="text-brand-secondary" size={24} />
                     <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase leading-none">Rating</p>
                        <p className="text-lg font-display font-black text-brand-dark">{doctor.rating}</p>
                     </div>
                  </div>
                </div>

                <div className="flex flex-col flex-grow py-2">
                  <div className="mb-8">
                     <span className="px-5 py-2 bg-teal-50 text-brand-primary rounded-xl text-[10px] font-black uppercase tracking-[0.2em] border border-teal-100">
                        {doctor.specialty}
                     </span>
                     <h3 className="text-4xl mt-8 mb-3 text-brand-dark">{doctor.name}</h3>
                     <p className="text-slate-500 font-medium text-lg italic opacity-80">{doctor.qualifications}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-10 border-y border-slate-50 py-6">
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <Clock size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase">Experience</p>
                           <p className="font-bold text-slate-700">{doctor.experience}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                           <BookOpen size={18} />
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-slate-400 uppercase">Consultations</p>
                           <p className="font-bold text-slate-700">10,000+</p>
                        </div>
                     </div>
                  </div>

                  {/* Quick booking and arrow removed per update; spacer keeps layout balanced */}
                  <div className="mt-6" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-brand-primary rounded-[4rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 text-white">
            <div className="max-w-xl">
              <h2 className="text-5xl text-white mb-6">Join our clinical faculty</h2>
              <p className="text-teal-50 text-xl opacity-80 leading-relaxed">We are looking for passionate specialists to join our award-winning team. Experience a culture of innovation and collaboration.</p>
            </div>
            <Link to="/contact" className="h-16 px-12 bg-brand-dark text-white rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform whitespace-nowrap">
              <span>View Open Positions</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
