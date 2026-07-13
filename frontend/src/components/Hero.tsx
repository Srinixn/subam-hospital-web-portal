import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const SLIDES = [
  {
    image: "https://srinixnm.github.io/hospital-access/hospital.jpeg",
    tag: "Excellence in Tertiary Care",
    title: "Healthcare Reimagined for Salem.",
    description: "Subam Hospital combines world-class medical expertise with deep compassionate care to serve our community with precision.",
    position: "object-[center_35%]"
  },
  {
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2000",
    tag: "Patient-Centric Approach",
    title: "Technology that Heals.",
    description: "Advanced diagnostic imaging and modular operating environments designed for optimal clinical outcomes and safety.",
    position: "object-center"
  },
  {
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=2000",
    tag: "Nurturing Generations",
    title: "Nurturing Lives from the Start.",
    description: "Specialized Level III Neonatal care and painless labor techniques for a safe and celebratory beginning to life.",
    position: "object-center"
  }
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
    <section className="relative h-[100svh] sm:h-[80vh] min-h-[560px] sm:min-h-[600px] w-full overflow-hidden" aria-label="Hero slideshow">
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {/* Mobile: gradient from bottom. Desktop: gradient from left */}
          <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-brand-dark/10 sm:from-brand-dark/80 sm:via-brand-dark/40 sm:to-transparent z-10" />
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className={`h-full w-full object-cover ${SLIDES[current].position || 'object-center'}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay — bottom-aligned on mobile, center on desktop */}
      <div className="absolute inset-0 z-20 flex items-end sm:items-center pb-20 sm:pb-0">
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
                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                  <div className="h-0.5 w-8 sm:w-10 bg-brand-primary" />
                  <span className="text-white text-[11px] sm:text-[9px] font-black uppercase tracking-[0.3em] sm:tracking-[0.4em]">{SLIDES[current].tag}</span>
                </div>

                <h1 className="text-[1.7rem] sm:text-4xl md:text-5xl mb-3 sm:mb-4 leading-[1.15] tracking-tight font-display text-white max-w-lg">
                  {SLIDES[current].title}
                </h1>

                <p className="text-[13px] sm:text-xs md:text-sm text-slate-200 mb-5 sm:mb-6 leading-relaxed max-w-md font-medium opacity-90">
                  {SLIDES[current].description}
                </p>

                {/* CTA Buttons — inline on mobile, not full-width stacked */}
                <div className="flex flex-row gap-3 items-center">
                  <Link to="/services" className="px-5 sm:px-6 h-11 sm:h-12 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center hover:bg-teal-700 hover:shadow-xl transition-all text-[11px] sm:text-xs tracking-wide shadow-teal-900/40 whitespace-nowrap">
                    Explore Specialties <ArrowRight className="ml-1.5 sm:ml-2" size={14} />
                  </Link>
                  <Link to="/about" className="px-5 sm:px-6 h-11 sm:h-12 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold rounded-xl flex items-center justify-center hover:bg-white/20 transition-all text-[11px] sm:text-xs tracking-wide whitespace-nowrap">
                    Our History
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Slide Indicators — bottom center on mobile, right side on desktop */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-row md:flex-col md:top-1/2 md:right-12 md:bottom-auto md:left-auto md:-translate-y-1/2 md:translate-x-0 gap-2 md:gap-4">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full cursor-pointer ${current === i
              ? "w-7 h-1.5 md:w-1.5 md:h-16 bg-brand-primary"
              : "w-2 h-1.5 md:w-1.5 md:h-6 bg-white/30"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
