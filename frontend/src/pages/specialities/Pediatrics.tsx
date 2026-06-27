import { motion } from 'motion/react';
import { Baby, Activity, Heart, ArrowRight, HeartPulse, Sparkles, Smile, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { name: "Newborn and Neonatal Care", icon: Baby },
  { name: "Routine Child Health Check-ups", icon: Smile },
  { name: "Growth and Development Monitoring", icon: Activity },
  { name: "Vaccination and Immunization Services", icon: HeartPulse },
  { name: "Treatment of Childhood Illnesses", icon: ShieldAlert },
  { name: "Nutritional Assessment and Guidance", icon: Heart },
  { name: "Management of Respiratory Infections", icon: Activity },
  { name: "Fever and Infectious Disease Care", icon: ShieldAlert },
  { name: "Allergy and Asthma Management", icon: Activity },
  { name: "Adolescent Health Care", icon: Smile },
  { name: "Emergency Paediatric Care", icon: ShieldAlert },
  { name: "Parent Counseling and Health Education", icon: Sparkles }
];

export default function Pediatrics() {
  return (
    <div className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs - child-friendly soft pink/amber */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-rose-400/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 60, delay: 0.1 }}
          >
            <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4 block">Child Care Wing</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Paediatrics & <br /><span className="text-amber-500 italic">Child Health.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
              Paediatrics is the branch of medicine dedicated to the health, growth, and development of infants, children, and adolescents. At Subam Hospital, our Paediatrics Department provides comprehensive healthcare services to ensure that children receive the best possible medical care from birth through adolescence.
            </p>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-amber-400/50 pl-4 italic">
              Our experienced paediatric team focuses on preventive care, early diagnosis, and effective treatment of childhood illnesses while supporting healthy growth and development. We are committed to creating a child-friendly environment where young patients receive compassionate and specialized care.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#child-services" className="px-6 h-12 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-amber-500 hover:text-white transition-all text-xs tracking-wider uppercase">
                View Pediatric Services <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
              className="aspect-[4/3] sm:aspect-[4/5] rounded-3xl lg:rounded-[3.5rem] rounded-tr-none rounded-bl-none overflow-hidden shadow-premium border-8 border-white bg-slate-100"
            >
              <img 
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                alt="Paediatric Care for Children"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-amber-500 text-white p-8 rounded-[2.5rem] rounded-tr-none shadow-2xl max-w-xs border border-amber-400/20"
            >
              <Baby size={32} className="mb-4 text-amber-100" />
              <p className="text-sm font-bold leading-tight">Comforting, child-friendly spaces equipped for emergencies and diagnostics.</p>
            </motion.div>
          </div>
        </div>

        {/* Playful Cards Grid Section */}
        <section id="child-services" className="mb-24 scroll-mt-32">
          <div className="text-center mb-16">
            <span className="text-amber-500 font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Wellness & Pediatric Programs</span>
            <h2 className="text-3xl md:text-5xl font-display text-brand-dark">Our Paediatric Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: i * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="p-8 border border-slate-100 rounded-3xl rounded-tr-none bg-white hover:border-amber-400/30 hover:shadow-premium transition-all duration-300 group flex items-start gap-4"
              >
                <div className="h-12 w-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 shrink-0 group-hover:bg-amber-500 group-hover:text-white transition-all duration-300 shadow-sm shadow-amber-500/5">
                  <service.icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-amber-600 transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 font-medium">Child-friendly consultation and prompt treatment.</p>
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
          className="bg-amber-50/50 rounded-[3rem] rounded-bl-none p-12 md:p-20 relative overflow-hidden border border-amber-100/30"
        >
          <div className="absolute top-0 right-0 w-1/2 h-full bg-amber-500/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-amber-500">
                <Heart size={24} className="text-rose-500 fill-rose-500" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-amber-500 text-xs">Our Pediatric Mission</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">Providing Safe, Quality, and Compassionate Care for Families</h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              At Subam Hospital, we believe that every child deserves quality healthcare in a safe and caring environment. Our dedicated team works closely with parents to promote healthy development and provide timely medical care for children at every stage of growth. Our mission is to ensure the well-being of every child through expert medical care, preventive health services, and compassionate support for families.
            </p>
            <Link to="/contact" className="px-8 py-4 bg-amber-500 text-white rounded-2xl font-bold transition-all hover:bg-amber-600 hover:shadow-xl hover:shadow-amber-500/20 flex items-center justify-center gap-2 max-w-xs text-base">
              <span>Book a Pediatric Visit</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
