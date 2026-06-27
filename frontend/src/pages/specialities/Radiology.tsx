import { motion } from 'motion/react';
import { Microscope, Activity, Shield, ArrowRight, Scan, Cpu, Layers, Tv, Eye, Heart, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  { name: "Digital X-Ray & High-Resolution Ultrasound", desc: "Ultrafast digital sensor plate scans yielding sharp imaging.", icon: Scan },
  { name: "Color Doppler Imaging & Blood Flow Analysis", desc: "Real-time hemodynamic evaluation of peripheral and cardiac vessels.", icon: Activity },
  { name: "Fetal Medicine Scans & Fetal Growth Monitoring", desc: "Expert targeted scans evaluating vital developmental parameters.", icon: Eye },
  { name: "High-Resolution Multi-Detector CT Scans", desc: "Deep anatomical cross-sections reconstructed in 3D.", icon: Layers },
  { name: "3D/4D Obstetric Ultrasound Imaging", desc: "Immersive volumetric scanning showing real-time baby movements.", icon: Tv },
  { name: "Anomaly Scan & Targeted Imaging for Prenatal Care", desc: "Comprehensive structural screens conducted in early second trimester.", icon: Cpu },
  { name: "Routine and Emergency Diagnostic X-Rays", desc: "Round-the-clock digital radiography for acute clinical emergencies.", icon: Database },
  { name: "Safety Focused Low-Radiation Scan Protocols", desc: "AI-assisted radiation dose optimization safeguarding patient health.", icon: Shield }
];

export default function Radiology() {
  return (
    <div className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Imaging Department</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Diagnostic <br /><span className="text-brand-primary italic">Radiology.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
              Advanced imaging technology for precise diagnosis. Our radiology department is equipped with high-resolution scanners and AI-assisted analysis to guide effective clinical and surgical treatment plans.
            </p>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-brand-primary/30 pl-4 italic">
              We prioritize patient safety by using low-radiation protocols and ensuring rapid turnaround times for reports. Our radiologists work closely with clinical teams to ensure seamless patient care.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#dashboard-services" className="px-6 h-12 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary transition-all text-xs tracking-wider uppercase">
                Open Imaging Hub <ArrowRight size={14} />
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
                src="https://content.jdmagicbox.com/comp/salem/g6/0427px427.x427.181025180837.u3g6/catalogue/dr-sharmila-senthilkumar-ssk-women-and-kidney-care-swarnapuri-salem-gynaecologist-and-obstetrician-doctors-abx9tc7y5q.jpg" 
                alt="Radiology and Diagnostics"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-teal-400/20"
            >
              <Microscope size={32} className="mb-4 text-teal-100 animate-pulse" />
              <p className="text-sm font-bold leading-tight">Precision imaging, ultra-low dose safety levels, and AI diagnostics.</p>
            </motion.div>
          </div>
        </div>

        {/* High-Tech Diagnostic Panel Section */}
        <section id="dashboard-services" className="mb-24 scroll-mt-32 p-8 md:p-16 bg-slate-950 rounded-[4rem] border border-slate-900 shadow-2xl relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-primary/10 rounded-full blur-3xl -z-10" />
          
          <div className="text-center mb-16 relative z-10">
            <span className="text-brand-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Digital Scanning Suite</span>
            <h2 className="text-3xl md:text-5xl font-display text-white">Diagnostic Imaging Hub</h2>
            <p className="text-slate-400 max-w-md mx-auto mt-4 text-sm">Advanced computer tomography and targeted prenatal scans rendered dynamically.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                viewport={{ once: true }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 0 25px rgba(13, 148, 136, 0.3)",
                  borderColor: "rgba(13, 148, 136, 0.5)"
                }}
                className="p-6 border border-slate-900 bg-slate-900/50 backdrop-blur-md rounded-2xl transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 bg-slate-800 rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 border border-slate-700/50">
                    <service.icon size={18} />
                  </div>
                  <h3 className="text-base font-bold text-white leading-snug group-hover:text-brand-primary transition-colors duration-300">
                    {service.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-3 font-medium leading-relaxed">
                    {service.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-1 text-[9px] font-bold text-slate-500 uppercase tracking-widest group-hover:text-brand-primary transition-colors">
                  <span>Diagnostic Active</span>
                  <div className="h-1.5 w-1.5 bg-emerald-500 rounded-full animate-ping" />
                </div>
              </motion.div>
            ))}
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
              <h3 className="text-xl font-bold uppercase tracking-widest text-brand-primary text-xs">Precision & Safety</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">Accurate Scans Conducted with Low-Radiation Protocols</h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Equipped with modern diagnostic scanning machinery and managed by a dedicated group of scanning consultants, Subam Hospital ensures you receive highly detailed images and reports for all diagnostics. We focus on physical safety, precision testing, and immediate assistance to critical trauma cases.
            </p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Book an Scan Appointment</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
