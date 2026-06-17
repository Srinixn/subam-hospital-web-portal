import { motion } from 'motion/react';
import { Microscope, Shield, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Radiology() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Speciality</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Diagnostic <br /><span className="text-brand-primary italic">Radiology .</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              Advanced imaging technology for precise diagnosis. Our radiology department is equipped with high-resolution scanners and AI-assisted analysis to guide effective treatment plans.
            </p>
            <div className="space-y-6">
              {[
                "Digital X-Ray & Ultrasound",
                "Color Doppler Imaging",
                "Fetal Medicine Scans",
                "High-Resolution MDCT"
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-center">
                  <div className="h-2 w-2 bg-brand-primary rounded-full" />
                  <span className="font-bold text-brand-dark">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-[3.5rem] overflow-hidden shadow-premium border-8 border-white bg-slate-100">
              <img 
                src="https://content.jdmagicbox.com/comp/salem/g6/0427px427.x427.181025180837.u3g6/catalogue/dr-sharmila-senthilkumar-ssk-women-and-kidney-care-swarnapuri-salem-gynaecologist-and-obstetrician-doctors-abx9tc7y5q.jpg" 
                alt="Radiology Diagnostics"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl">
              <Microscope size={32} className="mb-4" />
              <p className="text-sm font-bold">Precision imaging, <br /> Accurate results.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-display mb-6">Diagnostic Excellence</h2>
            <p className="text-slate-500 mb-10">We prioritize patient safety by using low-radiation protocols and ensuring rapid turnaround times for reports. Our radiologists work closely with clinical teams to ensure seamless patient care.</p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Schedule a Scan</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
