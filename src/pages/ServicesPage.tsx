import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Microscope, Heart, Baby, Activity, Zap, ShieldAlert, FlaskConical, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEPARTMENTS = [
  {
    title: "Maternity & Obstetrics",
    icon: Baby,
    desc: "Comprehensive prenatal care, painless labor techniques, and advanced Level III Neonatal Intensive Care (NICU).",
    features: ["Pre-conceptional Counseling", "Natural Birth Programs", "High-risk Pregnancy Management"]
  },
  {
    title: "Surgical Services",
    icon: Activity,
    desc: "State-of-the-art modular theaters for general surgery, laparoscopy, and pediatric surgical procedures.",
    features: ["Minimally Invasive Surgery", "24/7 Trauma Surgery", "Laser Surgery Units"]
  },
  {
    title: "Fertility Center",
    icon: Heart,
    desc: "Dedicated IVF and reproductive medicine unit with world-class success rates in assisted reproduction.",
    features: ["IUI & IVF Therapy", "Andrology Services", "Sperm & Oocyte Banking"]
  },
  {
    title: "Emergency & ICU",
    icon: ShieldAlert,
    desc: "Critical care units equipped with high-end ventilators and 24/7 intensivist coverage.",
    features: ["Cardiac Emergency", "Round-the-clock Pharmacy", "Advanced Life Support Lab"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 py-32 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 -skew-x-12 translate-x-1/4" />
        <div className="container-custom relative z-10 flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-3/5">
            <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Care Spectrum</span>
            <h1 className="text-5xl md:text-8xl mb-8 font-display">Specialized <br /> <span className="text-brand-primary">Medical Care</span></h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
              From precision diagnostics to quaternary surgical care, Subam Hospital integrates advanced technology with clinical expertise to ensure complete healing.
            </p>
          </div>
          <div className="md:w-2/5 grid grid-cols-2 gap-4">
             {[
               { icon: Stethoscope, label: "60+ Specialties" },
               { icon: FlaskConical, label: "Advanced Labs" },
               { icon: Zap, label: "Modular OTs" },
               { icon: Microscope, label: "Precision Tech" }
             ].map((item, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl text-center flex flex-col items-center">
                   <item.icon className="text-brand-primary mb-3" size={28} />
                   <p className="text-xs font-black text-brand-dark uppercase tracking-wider">{item.label}</p>
                </div>
             ))}
          </div>
        </div>
      </section>

      {/* Departments Grid */}
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {DEPARTMENTS.map((dept, i) => (
              <div key={i} className="group p-10 border border-slate-100 rounded-[3rem] hover:border-brand-primary/20 hover:shadow-premium transition-all bg-white relative overflow-hidden">
                <div className="absolute -top-10 -right-10 bg-brand-primary/5 h-40 w-40 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
                <div className="h-16 w-16 rounded-2xl bg-slate-50 flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <dept.icon size={32} />
                </div>
                <h3 className="text-3xl mb-6">{dept.title}</h3>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">{dept.desc}</p>
                <div className="space-y-4 mb-10">
                   {dept.features.map((feature, j) => (
                     <div key={j} className="flex items-center gap-3 text-slate-700 font-bold">
                        <CheckCircle2 size={18} className="text-brand-primary" />
                        <span>{feature}</span>
                     </div>
                   ))}
                </div>
                <button className="flex items-center gap-3 text-brand-primary font-black uppercase tracking-widest text-xs hover:gap-5 transition-all">
                   Explore Department <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Highlight */}
      <section className="py-24 bg-brand-dark text-white overflow-hidden">
         <div className="container-custom grid lg:grid-cols-2 gap-20 items-center">
            <div>
               <h2 className="text-4xl md:text-5xl text-white mb-8">Integrated Technology for Better Outcomes</h2>
               <p className="text-slate-400 text-lg leading-relaxed mb-10">
                 Our facility is equipped with global-standard medical technology including AI-guided imaging systems and modular operating theaters that minimize infection risk and maximize surgical precision.
               </p>
               <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-display font-black text-brand-primary mb-2">99.8%</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Surgical Success Rate</p>
                  </div>
                  <div>
                    <p className="text-3xl font-display font-black text-brand-primary mb-2">35k+</p>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Happy Patients</p>
                  </div>
               </div>
            </div>
            <div className="relative">
               <div className="rounded-[4rem] overflow-hidden border-[12px] border-white/5 aspect-square">
                  <img src="https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Medical Tech" />
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 bg-brand-primary rounded-full flex items-center justify-center animate-pulse">
                  <Activity size={40} className="text-white" />
               </div>
            </div>
         </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container-custom">
            <div className="max-w-2xl mx-auto">
               <h2 className="text-4xl mb-8">Need specialized guidance?</h2>
               <p className="text-slate-500 text-lg mb-10">Our medical counselors are available 24/7 to help you choose the right specialist and procedure for your needs.</p>
               <div className="flex flex-wrap justify-center gap-6">
                 <Link to="/contact" className="btn-primary h-16 px-12 text-lg">Inquire About Services</Link>
                 <a href="tel:+914311234567" className="h-16 px-12 border border-slate-200 rounded-2xl flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    Call Helpline
                 </a>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
}
