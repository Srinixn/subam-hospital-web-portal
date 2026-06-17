import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeartPulse, Microscope, Activity, ArrowRight, Shield, CheckCircle2, Award, Zap } from 'lucide-react';

const institutions = [
  {
    name: "Women's Care",
    brand: "SUNSRISHTI",
    fullName: "Sunsrishti Women's Care",
    tagline: "Empowering Every Stage of Womanhood",
    desc: "A dedicated sanctuary for women's health, Sunsrishti Women's Care integrates advanced surgical capabilities with a compassionate obstetric philosophy. We specialize in high-risk pregnancy management and minimally invasive gynecological procedures.",
    features: [
      "Level III Neonatal Intensive Care",
      "Painless Labor & Delivery Suites",
      "Comprehensive Fetal Medicine",
      "Gynecological Oncology Division"
    ],
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    logoUrl: "https://srinixnm.github.io/hospital-access/sunsrishti.png",
    path: "/sunsrishti-womens-care",
    color: "bg-white",
    accent: "text-teal-700",
    border: "border-teal-100"
  },
  {
    name: "Fertility Center",
    brand: "SUNSRISHTI",
    fullName: "Sunsrishti Fertility Center",
    tagline: "The Future of Parenthood",
    desc: "Combining world-class embryology standards with personalized reproductive protocols, our fertility center is Salem's leading destination for IVF and advanced genetic screening.",
    features: [
      "Clean-Room Embryology Labs",
      "Advanced ICSI & Laser Hatching",
      "Oocyte & Sperm Cryopreservation",
      "Genetic Counseling & Testing"
    ],
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    logoUrl: "https://srinixnm.github.io/hospital-access/image.png",
    path: "/sunsrishti-fertility-center",
    color: "bg-slate-50",
    accent: "text-teal-800",
    border: "border-slate-200"
  },
  {
    name: "Hospital",
    brand: "SUBAM",
    fullName: "Subam Hospital",
    tagline: "Salem's Premier Multi-Specialty Facility",
    desc: "Subam Hospital serves as the tertiary hub of our network, featuring modular operating theaters, 24/7 emergency trauma response, and a suite of advanced diagnostic imaging services.",
    features: [
      "24/7 Trauma & Surgical Response",
      "Modular HEPA-Filtered Theaters",
      "Advanced 128-Slice Imaging Hub",
      "Critical Care & ICU Excellence"
    ],
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
    logoUrl: "https://srinixnm.github.io/hospital-access/subam.png",
    path: "/subam-hospital",
    color: "bg-white",
    accent: "text-slate-900",
    border: "border-slate-100"
  }
];

export default function OurNetwork() {
  return (
    <div className="pt-40 min-h-screen bg-white">
      {/* Header Section */}
      <section className="mb-32">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <span className="text-teal-600 font-bold tracking-[0.4em] text-[10px] uppercase mb-6 block underline decoration-teal-600/20 underline-offset-8">Network Architecture</span>
            <h1 className="text-5xl md:text-8xl mb-10 leading-[0.9] tracking-tight font-light">Connected <span className="font-bold">Healthcare</span>.</h1>
            <p className="text-slate-500 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
              We operate a coordinated ecosystem of clinical centers, each specialized yet unified by a single standard of medical excellence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Institutions */}
      <div className="space-y-0">
        {institutions.map((hospital, i) => (
          <section key={hospital.fullName} className={`py-40 border-t border-slate-100 ${hospital.color}`}>
            <div className="container-custom">
              <div className={`grid lg:grid-cols-2 gap-24 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="relative">
                    <div className="absolute -inset-10 bg-slate-100 rounded-[5rem] -z-10 rotate-3" />
                    <div className="rounded-[4rem] shadow-premium w-full aspect-[4/5] overflow-hidden">
                      <img 
                        src={hospital.image} 
                        alt={hospital.fullName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                    </div>
                    <div className="absolute top-12 left-12 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-50">
                      <img src={hospital.logoUrl} alt="Logo" className="h-12 w-auto object-contain" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-8">
                     <div className="h-0.5 w-10 bg-teal-600" />
                     <span className={`${hospital.accent} font-black tracking-[0.3em] text-[11px] uppercase`}>
                        {hospital.brand} Portfolio
                     </span>
                  </div>
                  
                  <h2 className="text-4xl md:text-6xl mb-8 leading-[0.95] tracking-tight">{hospital.fullName}</h2>
                  <p className="text-slate-500 text-xl leading-relaxed mb-12 font-medium opacity-80">
                    {hospital.desc}
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-8 mb-16">
                    {hospital.features.map((feature) => (
                      <div key={feature} className="flex flex-col gap-3">
                        <div className="h-10 w-10 rounded-2xl bg-slate-50 flex items-center justify-center text-teal-600 shadow-sm">
                          <CheckCircle2 size={18} />
                        </div>
                        <span className="text-sm font-bold text-slate-900 tracking-tight">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={hospital.path} 
                    className="inline-flex items-center justify-center gap-4 px-10 h-16 bg-slate-900 text-white font-bold rounded-2xl text-[11px] uppercase tracking-[0.3em] hover:bg-teal-600 transition-all shadow-xl shadow-slate-900/20 w-fit"
                  >
                    Explore Center <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Trust Banner */}
      <section className="py-32 bg-teal-600 text-white">
        <div className="container-custom">
           <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="max-w-xl text-center md:text-left">
                 <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight leading-tight italic">Unity in Care.</h2>
                 <p className="text-teal-100 text-lg md:text-xl font-medium">Every institution in our network shares a common medical record system for seamless patient transfers.</p>
              </div>
              <div className="flex gap-12 text-center">
                 <div>
                    <p className="text-4xl font-bold mb-2">3</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Institutions</p>
                 </div>
                 <div>
                    <p className="text-4xl font-bold mb-2">24/7</p>
                    <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Availability</p>
                 </div>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
