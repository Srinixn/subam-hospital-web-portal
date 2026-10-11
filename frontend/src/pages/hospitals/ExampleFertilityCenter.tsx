import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Microscope, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Beaker, Phone, Award, Star } from 'lucide-react';

const DEPARTMENTS = [
  {
    title: "In-Vitro Fertilization (IVF)",
    desc: "A full-cycle IVF workflow utilizing state-of-the-art incubation and optimized fertilization protocols for maximum success rates.",
    icon: Sparkles
  },
  {
    title: "ICSI & IMSI Procedures",
    desc: "Advanced sperm selection under ultra-high magnification and direct micro-injection for overcoming male-factor infertility.",
    icon: Microscope
  },
  {
    title: "Vitrification & Cryopreservation",
    desc: "Ultra-rapid freezing for long-term storage of oocytes, sperm, and embryos with exceptional post-thaw survival rates.",
    icon: Beaker
  },
  {
    title: "Intrauterine Insemination (IUI)",
    desc: "A less invasive, highly monitored fertility treatment option suitable for specific diagnostic profiles.",
    icon: CheckCircle2
  },
  {
    title: "Pre-implantation Genetics (PGS/PGD)",
    desc: "Embryonic genetic screening to identify chromosomal abnormalities, ensuring a healthy pregnancy and birth.",
    icon: ShieldCheck
  },
  {
    title: "Male Infertility & Micro-TESE",
    desc: "Comprehensive diagnostic semen analysis, specialized therapies, and micro-surgical sperm extraction procedures.",
    icon: Microscope
  }
];

const INFRASTRUCTURE = [
  { metric: "Class 10k", label: "Clean-Room Embryology Lab" },
  { metric: "12+ Yrs", label: "Fertility Expertise" },
  { metric: "Global", label: "Standard Incubation Tech" },
  { metric: "98%+", label: "Embryo Vitrification Survival" }
];

export default function ExampleFertilityCenter() {
  return (
    <div className="pt-32 min-h-screen bg-white">
      {/* Editorial Hero */}
      <section className="mb-24 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src="https://placehold.co/320x100?text=Example+Fertility" alt="Example Fertility Logo" className="h-16 w-auto mb-8 object-contain" />
              <div className="flex items-center gap-3 mb-4">
                 <div className="h-px w-8 bg-brand-primary" />
                 <span className="text-brand-primary font-bold tracking-[0.4em] text-[9px] uppercase">Reproductive Excellence</span>
              </div>
              <h1 className="text-4xl md:text-6xl text-slate-900 mb-8 leading-[1.1] tracking-tight font-light">Example <br /><span className="font-bold text-brand-dark">Fertility Center</span></h1>
              <p className="text-slate-500 text-lg leading-relaxed mb-10 font-medium opacity-80">
                Bridging the gap between hope and parenthood. We combine world-class embryology standards, cutting-edge clean-room labs, and highly personalized treatment protocols to deliver success.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/contact" className="px-8 h-14 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-teal-700 transition-all text-[10px] tracking-widest uppercase shadow-xl shadow-brand-primary/20">
                  <Phone size={18} className="text-white" /> Contact Us
                </Link>
                <button
                  onClick={() => document.getElementById('specialties-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-8 h-14 border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-[10px] tracking-widest uppercase cursor-pointer"
                >
                  Our Labs
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-6 bg-slate-50 rounded-3xl lg:rounded-[3rem] hidden sm:block -z-10 rotate-1" />
              <div className="rounded-3xl lg:rounded-[3rem] shadow-premium aspect-[16/11] overflow-hidden border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
                  alt="Advanced Embryology Lab"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                />
              </div>

              {/* Floating Lab Badge */}
              <div className="hidden sm:block absolute -bottom-6 -right-6 bg-brand-primary text-white p-6 rounded-[2rem] shadow-2xl border-4 border-white max-w-[240px]">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={20} className="text-white shrink-0" />
                  <h4 className="text-xs font-bold uppercase tracking-wider leading-none">Class 10k Lab</h4>
                </div>
                <p className="text-[10px] text-teal-50 leading-relaxed font-semibold">Strict environmental controls ensuring optimal conditions for embryonic cultivation.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bridge */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {INFRASTRUCTURE.map((item, idx) => (
              <div key={idx} className="text-center">
                <p className="text-3xl md:text-4xl font-display font-black text-brand-primary mb-1">{item.metric}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Fertility Specialist Profile */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.3em] text-[9px] uppercase">Clinical Leadership</span>
            <h2 className="text-3xl md:text-4xl font-display text-brand-dark mt-2">Lead Fertility Specialist</h2>
          </div>

          <div className="bg-slate-50 rounded-3xl lg:rounded-[3rem] p-6 md:p-14 border border-slate-100/50 shadow-sm max-w-5xl mx-auto">
            <div className="grid md:grid-cols-12 gap-12 items-center">
              {/* Doctor Image */}
              <div className="md:col-span-5 relative group">
                <div className="absolute inset-0 bg-brand-primary rounded-[2rem] -rotate-3 group-hover:rotate-0 transition-transform duration-500 -z-10" />
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400"
                  alt="Dr. A. Example"
                  className="rounded-[2rem] shadow-premium object-cover aspect-square w-full border border-white"
                />
              </div>

              {/* Doctor Info */}
              <div className="md:col-span-7 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">(12+ Years Experience)</span>
                </div>

                <h3 className="text-3xl font-display font-black text-brand-dark mb-1">Dr. A. Example</h3>
                <p className="text-sm font-bold text-brand-primary uppercase tracking-widest mb-6">Consultant Gynaecologist & Infertility Specialist</p>

                <p className="text-slate-600 text-sm leading-relaxed mb-6 font-medium">
                  Dr. A. Example combines medical expertise with international training to offer advanced fertility treatments.
                  She specializes in personalized stimulation protocols, embryology optimization, and micro-assisted reproductive techniques.
                </p>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-slate-700 text-xs font-bold">
                    <CheckCircle2 size={16} className="text-brand-primary" />
                    <span>Qualifications: MBBS, MD (OG), DRM (Germany)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 text-xs font-bold">
                    <CheckCircle2 size={16} className="text-brand-primary" />
                    <span>Fellowship in Reproductive Medicine (IOCG Certified)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-700 text-xs font-bold">
                    <CheckCircle2 size={16} className="text-brand-primary" />
                    <span>Specialized training in vitrification and micro-manipulation technologies</span>
                  </div>
                </div>

                <div className="border-t border-slate-200/60 pt-6">
                  <p className="italic text-slate-500 text-sm leading-relaxed">
                    "Every couple's path to parenthood is unique. We combine advanced science with deep empathy to walk that path beside you."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialties Grid */}
      <section id="specialties-section" className="py-24 bg-slate-50 relative border-t border-slate-100">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
            <div>
              <span className="text-brand-primary font-black tracking-[0.4em] text-[9px] uppercase mb-4 block underline decoration-brand-primary/20 underline-offset-8">Reproductive Services</span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight text-brand-dark leading-[1.1]">Our Advanced <br /><span className="font-bold">Fertility Portfolio</span></h2>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-md font-medium">
              Offering full-spectrum fertility diagnostics and treatments, supported by advanced micromanipulators and cleanroom cultivation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {DEPARTMENTS.map((dept, i) => {
              const Icon = dept.icon;
              return (
                <motion.div
                  key={dept.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="bg-white p-6 sm:p-10 rounded-3xl lg:rounded-3xl lg:rounded-[3rem] shadow-sm hover:shadow-premium hover:-translate-y-1 transition-all duration-700 group border border-slate-100"
                >
                  <div className="flex items-start justify-between mb-10">
                    <div className="h-14 w-14 bg-slate-50 rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-500">
                      <Icon size={28} />
                    </div>
                    <span className="text-[9px] font-black text-slate-300 group-hover:text-brand-primary/40 uppercase tracking-widest transition-colors">Program 0{i + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-5 leading-tight tracking-tight">{dept.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed mb-8 text-xs">{dept.desc}</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-4 transition-all underline decoration-brand-primary/10 underline-offset-6">
                    Consult Specialist <ArrowRight size={16} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust CTA */}
      <section className="py-24 bg-brand-dark text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#0D9488_0%,transparent_70%)]" />
        </div>
        <div className="container-custom relative z-10">
          <h2 className="text-3xl md:text-5xl font-display text-white mb-6">Begin Your Journey to Parenthood Today</h2>
          <p className="text-teal-100 text-sm max-w-xl mx-auto leading-relaxed mb-10 font-medium">
            Schedule a comprehensive, private consultation with our fertility specialists to discuss tailored reproductive programs.
          </p>
          <Link to="/contact" className="inline-flex items-center justify-center gap-3 px-8 h-14 bg-brand-primary text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-teal-700 transition-all shadow-xl shadow-brand-primary/30 mx-auto">
            <Phone size={16} /> Contact Example Fertility Center
          </Link>
        </div>
      </section>
    </div>
  );
}
