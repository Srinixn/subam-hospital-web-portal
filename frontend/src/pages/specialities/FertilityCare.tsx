import { motion } from 'motion/react';
import { Heart, Activity, ArrowRight, CheckCircle2, Sparkles, UserCheck, CalendarDays, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIMELINE_STEPS = [
  {
    step: "Phase 01",
    title: "Diagnosis & Infertility Evaluation",
    desc: "Comprehensive initial diagnostics for both partners to understand the baseline physiological health.",
    services: [
      "Comprehensive Infertility Evaluation (Male & Female)",
      "Semen Analysis and Male Fertility Assessment",
      "Hormonal Assessment and Testing"
    ]
  },
  {
    step: "Phase 02",
    title: "Ovulation Monitoring & Induction",
    desc: "Tracking natural processes and assisting them using customized medications and diagnostic scanning.",
    services: [
      "Ovulation Monitoring and Induction",
      "Ovulation Tracking and Cycle Monitoring"
    ]
  },
  {
    step: "Phase 03",
    title: "Assisted Reproduction (IUI / IVF)",
    desc: "Executing advanced clinical procedures in our state-of-the-art embryology labs.",
    services: [
      "Intrauterine Insemination (IUI)",
      "In Vitro Fertilization (IVF)",
      "Embryo Transfer Procedures"
    ]
  },
  {
    step: "Phase 04",
    title: "Special Procedures & Support",
    desc: "Holistic evaluation, surgical inspections when necessary, and counseling to ensure high success rates.",
    services: [
      "Reproductive Endocrinology Consultation",
      "Laparoscopic and Hysteroscopic Evaluation",
      "Counseling and Emotional Support for Couples",
      "Personalized Fertility Treatment Plans"
    ]
  }
];

export default function FertilityCare() {
  return (
    <div className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Speciality Clinic</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Fertility <br /><span className="text-brand-primary italic">Care.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
              Fertility care focuses on the diagnosis, evaluation, and treatment of couples facing difficulty in conceiving. At Demo Hospital, our Fertility Care Centre provides comprehensive and compassionate support to help couples achieve their dream of parenthood through advanced reproductive medicine and personalized treatment plans.
            </p>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-brand-primary/30 pl-4 italic">
              Our approach combines medical expertise, modern technology, and emotional support to identify the underlying causes of infertility and provide the most suitable treatment options for each couple.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#roadmap-timeline" className="px-6 h-12 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary transition-all text-xs tracking-wider uppercase">
                Explore Treatment Journey <ArrowRight size={14} />
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
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=1200"
                alt="Fertility Care Center"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-teal-400/20"
            >
              <Sparkles size={32} className="mb-4 text-teal-100 animate-pulse" />
              <p className="text-sm font-bold leading-tight">Advanced embryology labs and emotional counseling support for couples.</p>
            </motion.div>
          </div>
        </div>

        {/* Timeline Roadmap Section */}
        <section id="roadmap-timeline" className="mb-24 scroll-mt-32">
          <div className="text-center mb-20">
            <span className="text-brand-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Step-By-Step Guidance</span>
            <h2 className="text-3xl md:text-5xl font-display text-brand-dark">The Fertility Care Journey</h2>
            <p className="text-slate-500 max-w-lg mx-auto mt-4">We guide couples step-by-step through our structured pathways, ensuring complete clarity and support at each phase.</p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative max-w-4xl mx-auto pl-6 md:pl-0">
            {/* Center Line for large screens, Left Line for small screens */}
            <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-0.5 bg-slate-200 -translate-x-1/2" />

            <div className="space-y-16">
              {TIMELINE_STEPS.map((step, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={step.step} className="relative flex flex-col md:flex-row md:items-center">

                    {/* Timeline Node point */}
                    <div className="absolute left-8 md:left-1/2 top-4 md:top-auto h-12 w-12 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-sm -translate-x-1/2 z-10 border-4 border-white shadow-md">
                      {idx + 1}
                    </div>

                    {/* Timeline Content Block */}
                    <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-2'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-slate-50 border border-slate-100/50 p-8 rounded-3xl hover:border-brand-primary/20 hover:shadow-premium transition-all duration-300 group"
                      >
                        <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-2 block">
                          {step.step}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-brand-primary transition-colors">
                          {step.title}
                        </h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">
                          {step.desc}
                        </p>

                        {/* Phase Services List */}
                        <div className={`flex flex-col gap-3 ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                          {step.services.map((service) => (
                            <div key={service} className={`flex items-center gap-2 text-xs font-bold text-slate-700 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                              <CheckCircle size={14} className="text-brand-primary shrink-0" />
                              <span>{service}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </div>

                    {/* Placeholder space for large screens to align correctly */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
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
              <h3 className="text-xl font-bold uppercase tracking-widest text-brand-primary text-xs">Our Goal</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">Advanced Reproductive Techniques Combined with Compassionate Support</h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              At Demo Hospital, we understand the emotional journey of infertility and provide supportive care in a comfortable and confidential environment. Our fertility specialists work closely with couples to ensure clarity, guidance, and the best possible treatment outcomes. Our goal is to combine advanced reproductive techniques with compassionate care, helping families grow with confidence and hope.
            </p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Connect with Fertility Team</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
