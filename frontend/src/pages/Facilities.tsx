import { motion } from 'motion/react';
import { Shield, Microscope, Activity, Heart, Wind, Coffee } from 'lucide-react';

const FACILITIES = [
  {
    title: "Modular Operation Theaters",
    desc: "State-of-the-art infection-controlled surgical suites with HEPA filters and AI-assisted monitoring.",
    icon: Shield,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Advanced Diagnostics",
    desc: "24/7 laboratory services with high-precision imaging and automated pathology testing.",
    icon: Microscope,
    image: "https://images.unsplash.com/photo-1579152276517-7507c992796e?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Intensive Care Units",
    desc: "Level III NICU and specialized Cardiac/Neuro ICUs with round-the-clock intensivist support.",
    icon: Activity,
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Patient Suites",
    desc: "Private and semi-private rooms designed with therapeutic colors and ergonomic comfort.",
    icon: Heart,
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "24/7 Pharmacy",
    desc: "Fully stocked pharmacy with automated inventory management for immediate availability.",
    icon: Wind,
    image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Wellness Cafe",
    desc: "Nutritious and hygiene-certified cafeteria serving patients, visitors, and medical staff.",
    icon: Coffee,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Facilities() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Infrastructure</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
            World-class <span className="text-brand-primary italic">Facilities.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            Our hospital is engineered for excellence, combining advanced medical technology with a healing environment to ensure the best possible outcomes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACILITIES.map((facility, i) => (
            <motion.div
              key={facility.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-100 hover:bg-white hover:shadow-premium transition-all duration-500"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={facility.image} 
                  alt={facility.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="h-12 w-12 rounded-xl bg-white shadow-sm flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <facility.icon size={24} />
                </div>
                <h3 className="text-2xl font-display text-brand-dark mb-4">{facility.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{facility.desc}</p>
                <div className="h-0.5 w-8 bg-slate-200 group-hover:w-full group-hover:bg-brand-primary transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
