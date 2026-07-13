import { motion } from 'motion/react';
import { Award, ArrowRight, Eye, Target, CheckCircle2, Building2, Heart, Stethoscope, Sparkles, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const TIMELINE = [
  {
    year: "2013",
    title: "The Beginning",
    desc: "Our journey began as a small clinical setup on Kakkapalayam Main Road, Ellampillai, with a vision to offer accessible, compassionate, and reliable medical care to our community.",
    color: "bg-brand-primary",
    icon: Heart
  },
  {
    year: "2015",
    title: "First Expansion",
    desc: "Expanded into a 10-bedded hospital equipped with a dedicated operation theatre. We successfully managed numerous medical cases and conducted 10–15 deliveries every month, earning the trust of families across the region.",
    color: "bg-brand-primary",
    icon: Building2
  },
  {
    year: "2017",
    title: "Multi-Specialty Transformation",
    desc: "Transformed into a 50-bedded multi-specialty facility with dual operation theatres, deluxe patient rooms, a fully functional OT complex, advanced laboratory services, a well-equipped labour ward, 24/7 pharmacy, and ultrasound scanning.",
    color: "bg-brand-primary",
    icon: Stethoscope
  },
  {
    year: "2024",
    title: "Sunsrishti Speciality Hospital",
    desc: "Launched Sunsrishti Speciality Hospital — equipped with modern ICU, advanced trauma care, laparoscopic surgery services, and endoscopic procedures for high-quality specialized treatment.",
    color: "bg-brand-primary",
    icon: ShieldCheck
  },
  {
    year: "2025",
    title: "IVF Centre Launch",
    desc: "Established our state-of-the-art IVF Centre with advanced fertility treatment technologies and experienced specialists dedicated to helping couples achieve parenthood.",
    color: "bg-brand-primary",
    icon: Sparkles
  }
];

const MISSION_ITEMS = [
  "To provide quality and affordable healthcare services.",
  "To deliver compassionate and patient-focused treatment.",
  "To utilize advanced medical technology and modern healthcare practices.",
  "To promote health and wellness within our community."
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* ──────────────────────────────────────────────────────
          HERO: Editorial Split Layout
          ────────────────────────────────────────────────────── */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-auto lg:min-h-screen">
        {/* Left — Image Panel */}
        <div className="relative overflow-hidden bg-slate-900 min-h-[55vh] sm:min-h-[60vh] lg:min-h-screen flex flex-col justify-center items-center py-10 sm:py-16 px-6 sm:px-12 lg:p-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Subam Hospital"
            className="absolute inset-0 w-full h-full object-cover opacity-30 sm:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-slate-900/30" />

          {/* Quote & Stats Wrapper to keep them in document flow on mobile */}
          <div className="relative z-10 w-full max-w-md flex flex-col justify-between h-full min-h-[380px] lg:min-h-0 lg:justify-center gap-10 lg:px-14 lg:py-0">
            {/* Quote Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-center"
            >
              <svg className="w-8 h-8 sm:w-10 sm:h-10 text-brand-primary mx-auto mb-4 sm:mb-5" viewBox="0 0 24 24" fill="currentColor"><path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C9.591 11.7 11 13.166 11 15c0 1.933-1.567 3.5-3.5 3.5-1.171 0-2.36-.57-2.917-1.179zM14.583 17.321C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311C19.591 11.7 21 13.166 21 15c0 1.933-1.567 3.5-3.5 3.5-1.171 0-2.36-.57-2.917-1.179z"/></svg>
              <p className="text-white text-lg sm:text-xl md:text-2xl font-display italic leading-snug mb-4 sm:mb-6">
                Every life that walks through our doors deserves the best care we can give.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-6 sm:w-8 bg-brand-primary" />
                <span className="text-brand-primary text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">Dr. K. Raj & Dr. Selvi Raju</span>
                <div className="h-px w-6 sm:w-8 bg-brand-primary" />
              </div>
            </motion.div>
            
            {/* Floating Stats on Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 w-full"
            >
              {[
                { value: "25k+", label: "Deliveries Completed" },
                { value: "20k+", label: "Normal Deliveries" },
                { value: "50+", label: "Hospital Beds" },
                { value: "24/7", label: "Emergency Care" }
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-brand-primary pl-3 sm:pl-4 py-1">
                  <p className="text-xl sm:text-2xl md:text-3xl font-display font-black text-white leading-none">{s.value}</p>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em] mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Right — Content Panel */}
        <div className="flex items-center bg-white">
          <div className="px-4 sm:px-8 md:px-16 lg:px-20 py-16 sm:py-24 lg:py-0 max-w-2xl">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="flex items-center gap-3 mb-6 sm:mb-10">
                <div className="h-px w-10 sm:w-12 bg-brand-primary" />
                <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px]">About Subam Hospital</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display text-brand-dark leading-[1.1] sm:leading-[1] tracking-tight mb-6 sm:mb-8">
                Where Healing <br />Meets <span className="italic text-brand-primary">Excellence.</span>
              </h1>

              <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 font-medium">
                Located on Kakkapalayam Main Road, Ellampillai, Subam Hospital has been committed to providing quality healthcare services to the community for more than a decade.
              </p>
              <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 font-medium">
                What started in 2013 as a small clinical setup with a compassionate vision has grown into a 50-bedded multi-specialty healthcare institution — trusted by thousands of families across Salem.
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#history" className="px-5 sm:px-7 h-12 bg-brand-dark text-white font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-brand-primary transition-colors text-xs tracking-widest uppercase">
                  Our History <ArrowRight size={14} />
                </a>
                <Link to="/contact" className="px-5 sm:px-7 h-12 border border-slate-200 text-slate-700 font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-xs tracking-widest uppercase">
                  Get in Touch
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          CREDENTIALS BAR
          ────────────────────────────────────────────────────── */}
      <section className="border-y border-slate-100 bg-slate-50/50">
        <div className="container-custom py-10">
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6">
            {[
              "Multi-Specialty Hospital",
              "DNB Accredited (Obstetrics & Gynaecology)",
              "Advanced IVF Centre",
              "24/7 Trauma & Emergency Care",
              "Level III Neonatal Care"
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-slate-500">
                <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                <span className="text-xs font-bold uppercase tracking-wider">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          OUR STORY — Editorial Narrative
          ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left Column — Label */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-4 lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="h-px w-10 sm:w-12 bg-brand-primary" />
                <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px]">Our Story</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-brand-dark leading-[1.1] mb-6 lg:mb-8">
                From a Small Clinic<br />to a Healthcare<br /><span className="italic text-brand-primary">Institution.</span>
              </h2>
              
              <div className="hidden lg:block mt-12">
                <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-premium">
                  <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover" alt="Hospital Team" />
                </div>
              </div>
            </motion.div>

            {/* Right Column — Long-form Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-8 space-y-6 sm:space-y-8"
            >
              <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed font-medium">
                Our journey began in 2013 as a small clinical setup with a vision to offer accessible, compassionate, and reliable medical care. Within two years, we had expanded into a 10-bedded hospital equipped with a dedicated operation theatre — conducting 10 to 15 deliveries every month and earning the trust of families across the region.
              </p>

              <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed font-medium">
                Driven by our commitment to excellence, Subam Hospital underwent a major expansion in 2017, transforming into a 50-bedded multi-specialty healthcare facility. We introduced dual operation theatres, deluxe patient rooms, a fully functional operation theatre complex, advanced laboratory services, a well-equipped labour ward, 24/7 pharmacy services, and ultrasound scanning facilities — ensuring comprehensive care under one roof.
              </p>

              <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed font-medium">
                Continuing our mission, we launched Sunsrishti Speciality Hospital in 2024 — equipped with modern Intensive Care Units, advanced trauma care, laparoscopic surgery, and endoscopic procedures. In 2025, we established our state-of-the-art IVF Centre, bringing advanced fertility treatment to Salem.
              </p>

              <blockquote className="border-l-4 border-brand-primary pl-6 sm:pl-8 py-3 sm:py-4 my-8 sm:my-12">
                <p className="text-lg sm:text-xl md:text-2xl font-display text-brand-dark leading-snug italic">
                  "Our commitment remains unchanged — to deliver safe, affordable, and compassionate healthcare while continually evolving to meet the growing needs of our community."
                </p>
              </blockquote>

              <p className="text-slate-600 text-sm sm:text-lg md:text-xl leading-relaxed font-medium">
                Today, Subam Hospital and Sunsrishti Speciality Hospital stand as trusted healthcare institutions combining modern medical technology, experienced professionals, and patient-centered care. We are a leading centre for Women's Health, Maternity Care, Fertility Treatment, IVF Services, Laparoscopic Surgery, Newborn Care, and Comprehensive Gynaecological Services.
              </p>

              {/* Delivery Milestone Card */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-teal-50 border border-teal-100 rounded-2xl p-6 sm:p-8 mt-8 sm:mt-12">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Heart size={24} className="text-brand-primary animate-pulse" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-brand-dark mb-1">Over 25,000 Deliveries (20,000+ Normal Deliveries)</h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Subam Hospital has successfully delivered <strong>25,000 deliveries</strong>, out of which <strong>20,000 are normal deliveries</strong> — reflecting our clinical dedication to natural childbirth, patient safety, and maternal health.
                  </p>
                </div>
              </div>

              {/* Accreditation Card */}
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 bg-slate-50 border border-slate-100 rounded-2xl p-6 sm:p-8 mt-6">
                <div className="h-12 w-12 sm:h-14 sm:w-14 bg-brand-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Award size={24} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-brand-dark mb-1">DNB Accredited Institution</h4>
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">The only private hospital accredited with a DNB course offering 4 seats in Obstetrics & Gynaecology — a testament to our clinical and academic standards.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          TIMELINE
          ────────────────────────────────────────────────────── */}
      <section id="history" className="py-16 sm:py-28 bg-slate-50 scroll-mt-24">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-10 sm:w-12 bg-brand-primary" />
              <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px]">Milestones</span>
              <div className="h-px w-10 sm:w-12 bg-brand-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-brand-dark">A Decade of Growth</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 md:-translate-x-px" />

            <div className="space-y-10 sm:space-y-16">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div key={item.year} className="relative flex flex-col md:flex-row md:items-start">
                    {/* Node */}
                    <div className="absolute left-6 md:left-1/2 h-12 w-12 rounded-full bg-white border-2 border-brand-primary text-brand-primary flex items-center justify-center -translate-x-1/2 z-10 shadow-sm">
                      <item.icon size={18} />
                    </div>

                    {/* Card */}
                    <div className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-2'}`}>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white border border-slate-100 p-5 sm:p-8 rounded-2xl hover:shadow-premium transition-all duration-500"
                      >
                        <span className="text-brand-primary font-display font-black text-2xl">{item.year}</span>
                        <h3 className="text-xl font-bold text-brand-dark mt-2 mb-3">{item.title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </motion.div>
                    </div>

                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
           VISION & MISSION
           ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-brand-dark rounded-2xl p-6 sm:p-10 md:p-14 text-white relative overflow-hidden"
            >
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-brand-primary/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <Eye size={24} className="text-brand-primary mb-6" />
                <h3 className="text-xl sm:text-2xl font-display mb-4 text-white">Our Vision</h3>
                <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed">
                  To be a leading healthcare provider recognized for excellence in patient care, innovation, and community well-being.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-slate-50 rounded-2xl p-6 sm:p-10 md:p-14 border border-slate-100"
            >
              <Target size={24} className="text-brand-primary mb-6" />
              <h3 className="text-xl sm:text-2xl font-display mb-4">Our Mission</h3>
              <div className="space-y-4">
                {MISSION_ITEMS.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                    <p className="text-slate-600 leading-relaxed text-xs sm:text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
           LEADERSHIP
           ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 bg-slate-50">
        <div className="container-custom">
          <div className="text-center mb-12 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="h-px w-10 sm:w-12 bg-brand-primary" />
              <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px]">Leadership</span>
              <div className="h-px w-10 sm:w-12 bg-brand-primary" />
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-brand-dark mb-4 sm:mb-6">Under the Guidance of</h2>
            <p className="text-slate-500 text-sm sm:text-lg max-w-xl mx-auto px-4">Two pioneering medical professionals whose expertise and compassion drive our institution forward.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {/* Dr. K. Raj */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-premium transition-shadow duration-500"
            >
              <div className="h-44 sm:h-56 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(13,148,136,0.1),transparent)]" />
                <div className="flex items-center justify-center h-full">
                  <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                    <Stethoscope size={32} className="text-brand-primary" />
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-display text-brand-dark mb-1">Dr. K. Raj</h3>
                <p className="text-brand-primary font-bold uppercase tracking-[0.15em] text-[10px] mb-4 sm:mb-6">Consultant General Surgeon</p>
                
                <div className="space-y-2.5 mb-6 sm:mb-8">
                  {["MBBS", "MS (General Surgery)", "FMAS (Fellow Minimal Access Surgery)", "DMAS (Diploma Minimal Access Surgery)"].map((q, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="h-1.5 w-1.5 bg-brand-primary rounded-full" />
                      <span className="text-xs sm:text-sm text-slate-600">{q}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-5 sm:pt-6">
                  A skilled surgeon with expertise in general and minimally invasive procedures. Dr. Raj's surgical precision and leadership have been instrumental in establishing Subam Hospital as a trusted healthcare destination.
                </p>
              </div>
            </motion.div>

            {/* Dr. Selvi Raju */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-premium transition-shadow duration-500"
            >
              <div className="h-44 sm:h-56 bg-brand-dark relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(249,115,22,0.1),transparent)]" />
                <div className="flex items-center justify-center h-full">
                  <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                    <Heart size={32} className="text-brand-secondary" />
                  </div>
                </div>
              </div>
              <div className="p-6 sm:p-10">
                <h3 className="text-xl sm:text-2xl font-display text-brand-dark mb-1">Dr. Selvi Raju</h3>
                <p className="text-brand-secondary font-bold uppercase tracking-[0.15em] text-[10px] mb-4 sm:mb-6">Consultant Gynaecologist & Infertility Specialist</p>
                
                <div className="space-y-2.5 mb-6 sm:mb-8">
                  {[
                    "MBBS",
                    "MD (Obstetrics & Gynaecology)",
                    "DRM (Germany)",
                    "Fellowship in Reproductive Medicine (IOCG Certified)"
                  ].map((q, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="h-1.5 w-1.5 bg-brand-secondary rounded-full" />
                      <span className="text-xs sm:text-sm text-slate-600">{q}</span>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed border-t border-slate-100 pt-5 sm:pt-6">
                  An accomplished gynaecologist and fertility specialist with international training from Germany. Dr. Selvi Raju's expertise in reproductive medicine drives the hospital's speciality programs and IVF centre.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
           CTA
           ────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-28 bg-white">
        <div className="container-custom">
          <div className="bg-brand-dark rounded-2xl sm:rounded-3xl p-6 sm:p-12 md:p-20 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-8 lg:gap-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/8 -skew-x-12 translate-x-1/4 pointer-events-none" />
            <div className="max-w-xl relative z-10">
              <h2 className="text-3xl md:text-4xl font-display mb-4 text-white">Join Our Medical Team</h2>
              <p className="text-slate-400 leading-relaxed">We are always looking for medical experts who share our vision of excellence and compassionate care.</p>
            </div>
            <Link to="/careers" className="btn-primary h-14 px-10 text-sm relative z-10 whitespace-nowrap">
              Explore Careers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
