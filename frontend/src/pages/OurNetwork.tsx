import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeartPulse, Microscope, Activity, ArrowRight, Shield, CheckCircle2, Award, Zap } from 'lucide-react';

const institutions = [
  {
    name: "Hospital",
    brand: "DEMO",
    fullName: "Demo Hospital",
    tagline: "Women's & Pregnancy Care Center",
    desc: "Demo Hospital is specialized in women's healthcare and pregnancy care, providing comprehensive maternity, gynaecology, prenatal, and postnatal services for mothers and children.",
    features: [
      "Comprehensive Obstetric & Prenatal Care",
      "High-Risk Pregnancy Management",
      "Painless Labor & Delivery Suites",
      "Post-Natal Recovery & Wellness Hub"
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    logoUrl: "https://placehold.co/320x100?text=Demo+Hospital",
    path: "/demo-hospital",
    color: "bg-white",
    accent: "text-brand-primary",
    border: "border-teal-100"
  },
  {
    name: "Fertility Center",
    brand: "EXAMPLE",
    fullName: "Example Fertility Center",
    tagline: "Advanced IVF & Reproductive Medicine",
    desc: "Example Fertility Center is a dedicated center for IVF (In Vitro Fertilization), ICSI, IUI, and advanced reproductive treatments, bringing hope to aspiring parents.",
    features: [
      "Clean-Room Embryology Labs",
      "Advanced ICSI & Laser Hatching",
      "Oocyte & Sperm Vitrification",
      "Genetic Counseling & Testing"
    ],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    logoUrl: "https://placehold.co/320x100?text=Example+Fertility",
    path: "/example-fertility-center",
    color: "bg-slate-50",
    accent: "text-brand-primary",
    border: "border-slate-200"
  },
  {
    name: "Multispeciality Hospital",
    brand: "EXAMPLE",
    fullName: "Example Multispeciality Hospital",
    tagline: "Comprehensive Multi-Specialty Services",
    desc: "Example Multispeciality Hospital provides general medicine, general surgery, orthopaedics, skin care, dermatology, and a complete range of healthcare services for all patients.",
    features: [
      "General Medicine & General Surgery",
      "Orthopaedic & Joint Care",
      "Dermatology & Advanced Skincare",
      "Advanced Diagnostic Imaging"
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    logoUrl: "https://placehold.co/320x100?text=Example+Hospital",
    path: "/example-multispeciality-hospital",
    color: "bg-white",
    accent: "text-brand-dark",
    border: "border-slate-100"
  }
];

export default function OurNetwork() {
  return (
    <div className="pt-16 sm:pt-28 lg:pt-40 min-h-screen bg-white">
      {/* Header Section */}
      <section className="mb-12 sm:mb-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-brand-primary" />
              <span className="text-brand-primary font-bold tracking-[0.4em] text-[9px] uppercase">Ecosystem Architecture</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl mb-6 sm:mb-8 leading-[1.1] sm:leading-[1.0] tracking-tight font-light font-display">Integrated <br /><span className="font-bold text-brand-dark">Healthcare Network</span></h1>
            <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
              Operating a fully coordinated clinical network across Example City. Each center is specialized yet unified under one philosophy of clinical excellence and patient safety.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Institutions */}
      <div className="space-y-0">
        {institutions.map((hospital, i) => (
          <section key={hospital.fullName} className={`py-16 sm:py-24 md:py-32 border-t border-slate-100 ${hospital.color}`}>
            <div className="container-custom">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                {/* Image Block */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                  className={`group relative ${i % 2 !== 0 ? 'lg:order-last' : ''}`}
                >
                  <div className="relative">
                    <div className="absolute -inset-6 bg-slate-100 rounded-[3rem] -z-10 rotate-1 hidden sm:block" />
                    <div className="rounded-2xl sm:rounded-[3rem] shadow-premium w-full aspect-[4/3] overflow-hidden border border-slate-100">
                      <img
                        src={hospital.image}
                        alt={hospital.fullName}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                    </div>
                    <div className="absolute top-4 left-4 sm:top-8 sm:left-8 bg-white p-3 sm:p-6 rounded-xl sm:rounded-[2rem] shadow-2xl border border-slate-55">
                      <img src={hospital.logoUrl} alt="Logo" className="h-6 sm:h-10 w-auto object-contain" />
                    </div>
                  </div>
                </motion.div>

                {/* Text Block */}
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col text-left"
                >
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                     <div className="h-px w-6 bg-brand-primary" />
                     <span className={`${hospital.accent} font-bold tracking-[0.3em] text-[10px] uppercase`}>
                        {hospital.brand} Portfolio
                     </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-display font-black text-brand-dark mb-3 sm:mb-4">{hospital.fullName}</h2>
                  <p className="text-brand-primary font-bold text-xs sm:text-sm tracking-wider uppercase mb-4 sm:mb-6">{hospital.tagline}</p>

                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-6 sm:mb-10 font-medium">
                    {hospital.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
                    {hospital.features.map((feature) => (
                      <div key={feature} className="flex items-start gap-3">
                        <div className="h-6 w-6 rounded-lg bg-teal-50 flex items-center justify-center text-brand-primary shrink-0 shadow-sm mt-0.5">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-xs font-bold text-slate-700 tracking-tight leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link
                    to={hospital.path}
                    className="inline-flex items-center justify-center gap-3 px-8 h-14 bg-brand-dark text-white font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-brand-primary transition-all shadow-xl shadow-brand-dark/10 w-full sm:w-fit cursor-pointer"
                  >
                    Explore Center <ArrowRight size={16} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Trust Banner */}
      <section className="py-16 sm:py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#0D9488_0%,transparent_70%)]" />
        </div>
        <div className="container-custom relative z-10">
           <div className="flex flex-col lg:flex-row justify-between items-center gap-10">
              <div className="max-w-xl text-center lg:text-left">
                 <h2 className="text-2xl sm:text-3xl md:text-4xl font-display text-white mb-4 tracking-tight leading-tight">Coordinated Healthcare Delivery</h2>
                 <p className="text-teal-100 text-xs sm:text-sm leading-relaxed font-medium">
                   All institutions within our network utilize shared patient communication portals and diagnostic systems to guarantee seamless care transitions and medical continuity.
                 </p>
              </div>
              <div className="flex gap-10 sm:gap-16 text-center items-center justify-center">
                 <div>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-primary mb-2">3</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Clinical Centers</p>
                 </div>
                 <div>
                    <p className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-brand-primary mb-2">24/7</p>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Emergency Network</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
