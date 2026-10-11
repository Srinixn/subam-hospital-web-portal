import { motion } from 'motion/react';
import { Activity, Shield, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  "Preconception Counseling",
  "Antenatal (Pregnancy) Care",
  "High-Risk Pregnancy Management",
  "Fetal Growth Monitoring",
  "Ultrasound and Pregnancy Scans",
  "Normal Vaginal Delivery",
  "Cesarean Section (C-Section)",
  "Painless Labour and Delivery Support",
  "Emergency Obstetric Care",
  "Postnatal Care for Mother and Baby",
  "Breastfeeding and Newborn Care Guidance"
];

export default function Obstetrics() {
  return (
    <div className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Speciality</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Obstetrics & <br /><span className="text-brand-primary italic">Maternity.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-8">
              Our experienced obstetric team offers personalized care throughout every stage of pregnancy, from routine antenatal check-ups to the management of high-risk pregnancies. We are committed to ensuring safe deliveries and positive birth experiences through advanced medical facilities and compassionate support.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#services-list" className="px-6 h-12 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-primary transition-all text-xs tracking-wider uppercase">
                Explore Services <ArrowRight size={14} />
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
                src="https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1200"
                alt="Obstetrics and Maternity Care"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden sm:block absolute -bottom-6 -left-6 bg-brand-primary text-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-teal-400/20"
            >
              <Activity size={32} className="mb-4 text-teal-100" />
              <p className="text-sm font-bold leading-tight">Comprehensive Care and 24/7 Emergency Support.</p>
            </motion.div>
          </div>
        </div>

        {/* Services List Section */}
        <section id="services-list" className="mb-24 scroll-mt-32">
          <div className="text-center mb-16">
            <span className="text-brand-primary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Maternity Programs</span>
            <h2 className="text-3xl md:text-5xl font-display text-brand-dark">Our Obstetric Services</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service, i) => (
              <motion.div
                key={service}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="p-8 border border-slate-100 rounded-3xl bg-white hover:border-brand-primary/30 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="h-10 w-10 bg-teal-50 rounded-xl flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-brand-primary transition-colors duration-300">
                    {service}
                  </h3>
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
              <h3 className="text-xl font-bold uppercase tracking-widest text-brand-primary text-xs">Our Commitment</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">Advanced Facilities and Compassionate Maternity Care</h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              With modern labour rooms, fully equipped operation theatres, advanced diagnostic facilities, and 24/7 emergency support, Demo Hospital strives to provide safe, comprehensive, and high-quality maternity care for every mother and newborn. Our goal is to support women through their pregnancy journey with expert medical care, comfort, and confidence, ensuring the best possible outcomes for both mother and child.
            </p>
            <Link to="/contact" className="btn-primary inline-flex h-14 px-10 text-base">
              <span>Consult an Obstetrician</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
