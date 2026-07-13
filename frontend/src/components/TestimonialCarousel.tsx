import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Buvaneswari M.",
    service: "Obstetrics",
    content: "Subam Hospital is the best for women's care in Salem. Dr. Anitha is very kind and the way she explains things makes us feel very comfortable. The nursing care is also top-notch.",
    rating: 5,
    initials: "BM"
  },
  {
    id: 2,
    name: "Suresh Kumar",
    service: "Pediatrics",
    content: "We chose Subam for our baby's delivery and pediatric care. The Level III NICU facilities and the expert care provided by the doctors here are outstanding. Highly recommended.",
    rating: 5,
    initials: "SK"
  },
  {
    id: 3,
    name: "Meenakshi S.",
    service: "Fertility",
    content: "The fertility treatment at Subam Hospital gave us hope and results. The staff is very supportive and the treatment protocol is very clear and ethical.",
    rating: 5,
    initials: "MS"
  }
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-12 sm:py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <Quote size={400} className="text-white absolute -top-20 -left-20" />
      </div>
      
      <div className="container-custom relative z-10 text-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-brand-primary font-bold tracking-widest text-xs sm:text-sm uppercase mb-4 block"
        >
          Patient Stories
        </motion.span>
        <h2 className="text-2xl sm:text-4xl text-white mb-8 sm:mb-12 font-display">What our patients say</h2>

        <div className="max-w-3xl mx-auto relative px-0 sm:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 border border-white/10 flex flex-col justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px]"
            >
              <div className="flex justify-center gap-1 text-orange-400 mb-4 sm:mb-6">
                {[...Array(TESTIMONIALS[index].rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="text-sm sm:text-lg md:text-xl text-slate-200 font-medium italic mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
                "{TESTIMONIALS[index].content}"
              </p>
              <div className="flex items-center justify-center gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-brand-primary p-0.5 bg-gradient-to-br from-brand-primary to-teal-700 flex items-center justify-center shrink-0">
                  <span className="text-white text-xs font-black">{TESTIMONIALS[index].initials}</span>
                </div>
                <div className="text-left">
                  <p className="font-bold text-white text-sm sm:text-base">{TESTIMONIALS[index].name}</p>
                  <p className="text-[9px] sm:text-[10px] font-bold text-brand-primary uppercase tracking-widest">{TESTIMONIALS[index].service} Patient</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={() => setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            className="absolute -left-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 hidden md:flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-lg cursor-pointer"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setIndex((prev) => (prev + 1) % TESTIMONIALS.length)}
            className="absolute -right-12 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 hidden md:flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all shadow-lg cursor-pointer"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        <div className="flex justify-center gap-2 mt-8 sm:mt-10">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${index === i ? 'w-8 bg-brand-primary' : 'w-2 bg-white/20'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
