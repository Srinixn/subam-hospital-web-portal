import { motion } from 'motion/react';
import { DOCTORS } from '../constants';
import { Star, Calendar, ArrowRight } from 'lucide-react';

export default function Doctors() {
  return (
    <section id="doctors" className="py-24 bg-slate-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-brand-secondary font-bold tracking-widest text-sm uppercase"
            >
              Expert Team
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl mt-4"
            >
              Meet our world-class medical specialists
            </motion.h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-brand-primary font-bold transition-all"
          >
            <span>View All Doctors</span>
            <ArrowRight size={20} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DOCTORS.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-6 flex flex-col sm:flex-row gap-8 shadow-sm hover:shadow-xl transition-all border border-slate-100"
            >
              <div className="relative group shrink-0">
                <div className="w-full sm:w-48 h-64 rounded-2xl overflow-hidden">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-xl shadow-lg flex items-center gap-1">
                  <Star size={16} className="text-orange-400 fill-orange-400" />
                  <span className="text-sm font-bold">{doctor.rating}</span>
                </div>
              </div>

              <div className="flex flex-col justify-between py-2">
                <div>
                  <span className="text-xs font-bold text-brand-primary px-3 py-1 bg-teal-50 rounded-full uppercase tracking-tighter">
                    {doctor.specialty}
                  </span>
                  <h3 className="text-2xl mt-4 mb-2">{doctor.name}</h3>
                  <p className="text-slate-500 text-sm mb-4 leading-relaxed line-clamp-2">
                    Highly experienced in {doctor.specialty.toLowerCase()} with a focus on patient-centered surgical outcomes.
                  </p>
                  
                  <div className="flex flex-wrap gap-y-3 gap-x-6">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Education</span>
                      <span className="text-sm font-semibold">{doctor.qualifications}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">Experience</span>
                      <span className="text-sm font-semibold">{doctor.experience}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <button className="btn-primary !py-2.5 !px-5 flex items-center gap-2">
                    <Calendar size={18} />
                    <span>Book Now</span>
                  </button>
                  <button className="p-3 text-slate-400 hover:text-brand-primary transition-colors">
                    <ArrowRight size={22} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
