import { motion } from 'motion/react';
import { Microscope, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, Beaker, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  "Advanced IVF & ICSI Procedures",
  "IMSI & Laser-Assisted Hatching",
  "Pre-implantation Genetic Screening",
  "Vitrification (Egg & Embryo Freezing)",
  "Male Infertility & Micro-TESE",
  "Holistic Reproductive Counseling"
];

export default function SunsrishtiFertilityCenter() {
  return (
    <div className="pt-40 min-h-screen bg-white">
      {/* Editorial Hero */}
      <section className="mb-32 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <img src="https://srinixnm.github.io/hospital-access/image.png" alt="Logo" className="h-20 w-auto mb-10 object-contain" />
              <div className="flex items-center gap-3 mb-6">
                 <div className="h-0.5 w-10 bg-teal-600" />
                 <span className="text-teal-600 font-bold tracking-[0.4em] text-[10px] uppercase">Reproductive Excellence</span>
              </div>
              <h1 className="text-5xl md:text-8xl text-slate-900 mb-10 leading-[0.9] tracking-tight font-light">Sunsrishti <br /><span className="font-bold">Fertility Center</span></h1>
              <p className="text-slate-500 text-xl md:text-2xl leading-relaxed mb-12 font-medium opacity-80">
                Bridging the gap between hope and reality through globally standard embryology and compassionate medical supervision.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/contact" className="px-10 h-16 bg-slate-900 text-white font-bold rounded-2xl flex items-center justify-center gap-4 hover:bg-teal-600 transition-all text-[11px] tracking-widest uppercase shadow-xl shadow-slate-900/20">
                  <Calendar size={20} className="text-teal-500" /> Consult now
                </Link>
                <button className="px-10 h-16 border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all text-[11px] tracking-widest uppercase">Our Labs</button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-slate-50 rounded-[5rem] -z-10 -rotate-3" />
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200" 
                alt="Fertility Center" 
                className="rounded-[4rem] shadow-premium aspect-[4/5.5] object-cover"
              />
              <div className="absolute -bottom-10 -right-10 bg-white p-12 rounded-[4rem] shadow-2xl max-w-sm border border-slate-100">
                <div className="flex items-center gap-5 mb-6">
                  <div className="h-16 w-16 bg-teal-50 rounded-3xl flex items-center justify-center text-teal-600 shadow-sm">
                    <Beaker size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 leading-[1.1] tracking-tight">World-Class IVF Labs</h4>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed">Equipped with the latest clean-room standards for optimal embryonic development.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Specialty Grid */}
      <section className="py-40 bg-slate-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="text-teal-600 font-black tracking-[0.4em] text-[10px] uppercase mb-6 block">Reproductive Portfolio</span>
              <h2 className="text-4xl md:text-7xl font-light tracking-tight text-slate-900 leading-[0.9]">Advanced <br /><span className="font-bold">Fertility Care</span></h2>
            </div>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed max-w-md">Our specialized protocols are designed to maximize success rates through science and empathy.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-12 bg-white rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-premium hover:-translate-y-2 transition-all duration-700 group"
              >
                <div className="h-16 w-16 bg-slate-50 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-teal-600 group-hover:text-white transition-all duration-500">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">{feature}</h3>
                <div className="flex items-center gap-3 text-teal-600 font-black text-[11px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
