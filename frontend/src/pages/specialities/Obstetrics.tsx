import { motion } from 'motion/react';
import { Activity, Heart, Shield, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Obstetrics() {
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
              Obstetrics <br /><span className="text-brand-primary italic">& Maternity.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              Personalized care for a journey as unique as your pregnancy. We provide comprehensive maternal-fetal medicine to ensure the safety and comfort of both mother and child.
            </p>
            <div className="space-y-6">
              {[
                "Painless Labor Options",
                "High-Risk Pregnancy Management",
                "24/7 Emergency Obstetric Care",
                "Post-delivery Rehabilitation"
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
                src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1200" 
                alt="Obstetrics Care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl">
              <Activity size={32} className="mb-4" />
              <p className="text-sm font-bold">Safe delivery, <br /> Healthy beginnings.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-display mb-6">Expertise Overview</h2>
            <p className="text-slate-500 mb-10">Our obstetrics department is equipped with modern labor suites and world-class monitoring systems. We believe in providing an empowering experience for mothers, supported by a multidisciplinary team of specialists.</p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Consult an Obstetrician</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
