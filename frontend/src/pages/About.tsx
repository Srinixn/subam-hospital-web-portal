import { motion } from 'motion/react';
import { Award, ArrowRight, Eye, Milestone, Target, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const leadership = [
    { name: "Dr. Anand Subramanian", role: "Chief Medical Director", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anand" },
    { name: "Dr. Meera Anand", role: "Director & Chief Gynecologist", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meera" },
    { name: "Mr. Ramesh Babu", role: "Administrator", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh" }
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero Section */}
      <section className="bg-brand-dark py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Hospital Hallway"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Our Story</span>
            <h1 className="text-5xl md:text-8xl text-white mb-8 font-display">
              A Legacy of <br /> <span className="text-brand-primary italic underline decoration-white/20 underline-offset-8">Trust & Healing</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              For over two decades, Subam Hospital has been the cornerstone of health in Salem, delivering more than just medical care—we deliver hope.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <div className="relative">
                <div className="rounded-[4rem] overflow-hidden shadow-premium aspect-[4/5]">
                  <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Teamwork" />
                </div>
                <div className="absolute -bottom-10 -right-10 glass-card p-10 rounded-[3rem] max-w-[280px]">
                  <Award className="text-brand-secondary mb-4" size={40} />
                  <p className="text-xl font-display font-black text-brand-dark mb-2">JCI Standards</p>
                  <p className="text-xs text-slate-500 leading-relaxed uppercase tracking-wider font-bold">Committed to international safety protocols</p>
                </div>
             </div>

             <div className="space-y-12">
                <div>
                   <h2 className="text-4xl md:text-5xl mb-8">Guided by Ethics, Driven by Outcomes</h2>
                   <p className="text-slate-500 text-lg leading-relaxed mb-8">
                     Subam Hospital was founded on the principle that high-quality medical care should be accessible and transparent. Our journey began as a small maternity clinic and has evolved into a 150-bed specialized powerhouse.
                   </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-brand-primary">
                      <Target size={24} />
                    </div>
                    <h4 className="text-xl font-black">Our Mission</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">To integrate clinical excellence with human compassion to serve our community.</p>
                  </div>
                  <div className="space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-secondary">
                      <Eye size={24} />
                    </div>
                    <h4 className="text-xl font-black">Our Vision</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">To be the global benchmark for patient-safe, sustainable healthcare.</p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-100 flex flex-wrap gap-4">
                   {['Integrity', 'Innovation', 'Inclusion', 'Interaction'].map(v => (
                     <div key={v} className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-xs font-bold text-slate-600 border border-slate-100">
                        <CheckCircle2 size={14} className="text-brand-primary" />
                        <span>{v}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-24 bg-slate-50">
        <div className="container-custom">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl mb-6">Expert Leadership</h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our specialized team of directors brings over 60 combined years of medical and operational expertise.</p>
           </div>
           <div className="grid md:grid-cols-3 gap-12">
             {leadership.map((person, i) => (
               <div key={i} className="group text-center">
                  <div className="relative mb-8 inline-block">
                    <div className="h-64 w-64 rounded-[3.5rem] overflow-hidden bg-white border border-slate-200 shadow-xl mx-auto p-4 group-hover:border-brand-primary transition-all">
                      <img src={person.image} alt={person.name} className="w-full h-full object-cover rounded-[2.5rem]" />
                    </div>
                    <div className="absolute -bottom-4 -right-4 h-12 w-12 bg-brand-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                      <Milestone size={20} />
                    </div>
                  </div>
                  <h3 className="text-2xl mb-1">{person.name}</h3>
                  <p className="text-brand-primary font-bold uppercase tracking-widest text-xs">{person.role}</p>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Join Section */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="bg-brand-dark rounded-[4rem] p-12 md:p-24 flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/10 -skew-x-12 translate-x-1/4 pointer-events-none" />
             <div className="max-w-xl relative z-10">
                <h2 className="text-4xl md:text-5xl mb-6">Join our Medical Team</h2>
                <p className="text-slate-400 text-lg leading-relaxed">We are always expanding our horizons and looking for medical experts who share our vision of global excellence.</p>
             </div>
             <Link to="/contact" className="btn-primary h-16 px-12 text-lg relative z-10 whitespace-nowrap">
                Work at Subam <ArrowRight size={20} />
             </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
