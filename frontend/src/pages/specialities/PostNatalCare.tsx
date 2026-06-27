import { motion } from 'motion/react';
import { Heart, Activity, ArrowRight, CheckCircle2, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  "Post-Delivery Maternal Monitoring",
  "Uterine Involution and Recovery Care",
  "Post-Cesarean Section Care",
  "Pain Management and Wound Care",
  "Breastfeeding Support and Counseling",
  "Newborn Feeding Guidance",
  "Newborn Health Check-ups",
  "Jaundice Screening in Newborns",
  "Vaccination and Immunization Advice",
  "Nutritional and Diet Counseling for Mothers",
  "Emotional and Postpartum Mental Health Support",
  "Family Planning Guidance"
];

export default function PostNatalCare() {
  return (
    <div className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Speciality</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Postnatal <br /><span className="text-brand-primary italic">Care.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
              Postnatal care refers to the medical and emotional care provided to a mother and her newborn baby immediately after delivery and during the recovery period. At Subam Hospital, our Postnatal Care services are designed to ensure a safe recovery for the mother and healthy development for the newborn.
            </p>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-brand-primary/30 pl-4 italic">
              The postnatal period is a crucial stage where both mother and baby need continuous monitoring, guidance, and support. Our experienced medical team provides comprehensive care to help mothers recover comfortably and to ensure proper newborn adaptation to life outside the womb.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#services-list" className="px-6 h-12 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary transition-all text-xs tracking-wider uppercase">
                Explore Services <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="aspect-[4/3] sm:aspect-[4/5] rounded-3xl lg:rounded-[3.5rem] overflow-hidden shadow-premium border-8 border-white bg-slate-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1544126592-807daa215a05?auto=format&fit=crop&q=80&w=1200" 
                alt="Postnatal Care and Recovery"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-teal-400/20"
            >
              <Home size={32} className="mb-4 text-teal-100" />
              <p className="text-sm font-bold leading-tight">Empowering transition, comprehensive maternal & newborn support.</p>
            </motion.div>
          </div>
        </div>

        {/* Services List Section */}
        <section id="services-list" className="mb-24 scroll-mt-32">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Recovery & Support</span>
            <h2 className="text-3xl md:text-5xl font-display text-brand-dark">Our Postnatal Care Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-8 border border-slate-100 rounded-3xl bg-white hover:border-brand-primary/30 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-brand-primary transition-colors duration-300">
                    {service}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Info Banner Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-50 rounded-3xl lg:rounded-[3rem] p-8 md:p-20 relative overflow-hidden border border-slate-100/50"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-brand-primary">
                <Heart size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-brand-primary text-xs">Support After Birth</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">Transition into Motherhood Safely, Healthy, and Comfortably</h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              At Subam Hospital, we focus on providing gentle, compassionate, and continuous care during the postnatal period. Our goal is to support mothers in regaining strength, building confidence in newborn care, and ensuring the overall well-being of both mother and baby. We are committed to making the transition into motherhood safe, healthy, and comfortable through expert medical supervision and personalized care.
            </p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Connect with Postnatal Team</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
