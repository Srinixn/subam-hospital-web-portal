import { motion } from 'motion/react';
import { ShieldCheck, Activity, ArrowRight, HeartPulse } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PainClinic() {
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
              Interventional <br /><span className="text-brand-primary italic">Pain Clinic.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
              Restore your quality of life with our multidisciplinary approach to pain management. We specialize in non-surgical interventions for chronic and acute pain.
            </p>
            <div className="space-y-6">
              {[
                "Epidural Steroid Injections",
                "Facet Joint Blocks",
                "Chronic Back & Neck Pain Relief",
                "Neuropathic Pain Management"
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
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" 
                alt="Pain Clinic"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl">
              <ShieldCheck size={32} className="mb-4" />
              <p className="text-sm font-bold">Relieving pain, <br /> Renewing lives.</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 rounded-[3rem] p-12 md:p-20">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-display mb-6">Expert Pain Management</h2>
            <p className="text-slate-500 mb-10">Our pain clinic uses ultrasound and fluoroscopic guidance for precise needle placement, ensuring maximum effectiveness and safety. We work with you to develop a personalized recovery plan.</p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Contact Us</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
