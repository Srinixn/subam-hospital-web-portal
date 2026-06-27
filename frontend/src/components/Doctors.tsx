import { motion } from 'motion/react';
import { DOCTORS } from '../constants';
import { Star, ArrowRight } from 'lucide-react';

export default function Doctors() {
  return (
    <section id="doctors" className="py-12 sm:py-24 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-secondary font-bold tracking-widest text-xs sm:text-sm uppercase"
            >
              Expert Team
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-2xl sm:text-4xl md:text-5xl mt-2 sm:mt-4"
            >
              Meet our world-class medical specialists
            </motion.h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-brand-primary font-bold transition-all text-sm sm:text-base cursor-pointer"
          >
            <span>View All Doctors</span>
            <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {DOCTORS.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row gap-6 sm:gap-8 shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="relative group shrink-0">
                <div className="w-full sm:w-48 h-64 rounded-2xl overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute bottom-2 right-2 bg-white px-2.5 py-1.5 rounded-lg shadow-md flex items-center gap-1">
                  <Star size={14} className="text-orange-400 fill-orange-400 animate-pulse" />
                  <span className="text-xs font-bold">{doctor.rating}</span>
                </div>
              </div>

              <div className="flex flex-col py-2">
                <div>
                  <span className="text-[10px] font-bold text-brand-primary px-3 py-1 bg-teal-50 rounded-full uppercase tracking-widest">
                    {doctor.specialty}
                  </span>
                  <h3 className="text-xl sm:text-2xl mt-4 mb-2">{doctor.name}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-4 leading-relaxed line-clamp-2">
                    Highly experienced in {doctor.specialty.toLowerCase()} with a focus on patient-centered surgical outcomes.
                  </p>
                  
                  <div className="flex flex-wrap gap-y-3 gap-x-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Education</span>
                      <span className="text-xs sm:text-sm font-semibold">{doctor.qualifications}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Experience</span>
                      <span className="text-xs sm:text-sm font-semibold">{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                {/* Action button removed to keep layout clean after quick-booking removal */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
