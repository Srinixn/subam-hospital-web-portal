import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, ChevronLeft, User, Calendar, MapPin, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000",
    tag: "Excellence in Tertiary Care",
    title: "Healthcare Reimagined for Salem.",
    description: "Subam Hospital combines world-class medical expertise with deep compassionate care to serve our community with precision."
  },
  {
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000",
    tag: "Patient-Centric Approach",
    title: "Technology that Heals.",
    description: "Advanced diagnostic imaging and modular operating environments designed for optimal clinical outcomes and safety."
  },
  {
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=2000",
    tag: "Nurturing Generations",
    title: "Nurturing Lives from the Start.",
    description: "Specialized Level III Neonatal care and painless labor techniques for a safe and celebratory beginning to life."
  }
];

const QUICK_ACTIONS = [
  { icon: MapPin, label: "Find Location", desc: "Salem, Tamil Nadu", path: "/contact", color: "bg-teal-700" },
  { icon: Activity, label: "Lab Reports", desc: "Secure Access", path: "/contact", color: "bg-teal-500" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    const timer = setInterval(next, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[70vh] sm:h-[80vh] min-h-[500px] sm:min-h-[600px] w-full overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/40 to-transparent z-10" />
          <img 
            src={SLIDES[current].image} 
            alt={SLIDES[current].title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay */}
      <div className="absolute inset-0 z-20 flex items-center">
        <div className="container-custom w-full">
          <div className="max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${current}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="flex items-center gap-2 mb-4">
                   <div className="h-0.5 w-10 bg-brand-primary" />
                   <span className="text-white text-[9px] font-black uppercase tracking-[0.4em]">{SLIDES[current].tag}</span>
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl mb-4 leading-[1.1] tracking-tight font-display text-white max-w-lg">
                   {SLIDES[current].title}
                </h1>

                <p className="text-xs md:text-sm text-slate-200 mb-6 leading-relaxed max-w-md font-medium opacity-90">
                  {SLIDES[current].description}
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center w-full sm:w-auto">
                  <Link to="/services" className="px-6 h-12 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center hover:bg-teal-700 hover:shadow-xl transition-all text-xs tracking-wide shadow-teal-900/40">
                    Explore Specialties <ArrowRight className="ml-2" size={16} />
                  </Link>
                  <Link to="/about" className="px-6 h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl flex items-center justify-center hover:bg-white/20 transition-all text-xs tracking-wide">
                    Our History
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Floating Quick Actions Section removed per user request */}


      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-row md:flex-col md:top-1/2 md:right-12 md:bottom-auto md:left-auto md:-translate-y-1/2 gap-3 md:gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full cursor-pointer ${
              current === i 
                ? "w-8 h-1.5 md:w-1.5 md:h-16 bg-brand-primary" 
                : "w-2 h-1.5 md:w-1.5 md:h-6 bg-white/30"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}

