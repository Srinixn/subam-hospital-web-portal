import { motion } from 'motion/react';
import { Heart, Activity, ArrowRight, CheckCircle2, Star, Calendar, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  { id: 'routine', label: 'Routine & Prevention' },
  { id: 'treatments', label: 'Treatments & Support' },
  { id: 'procedures', label: 'Surgical Procedures' }
];

const SERVICES = [
  { name: "Routine Gynaecological Check-ups", category: "routine" },
  { name: "Adolescent Gynaecology Care", category: "routine" },
  { name: "Family Planning and Contraceptive Services", category: "routine" },
  { name: "Screening for Women's Health Conditions", category: "routine" },
  { name: "Preventive Women's Healthcare", category: "routine" },

  { name: "Menstrual Disorder Management", category: "treatments" },
  { name: "PCOS/PCOD Treatment", category: "treatments" },
  { name: "Infertility Evaluation and Treatment", category: "treatments" },
  { name: "Menopause Care and Counseling", category: "treatments" },

  { name: "Fibroid and Ovarian Cyst Management", category: "procedures" },
  { name: "Cervical and Uterine Disorder Treatment", category: "procedures" },
  { name: "Laparoscopic Gynaecological Surgery", category: "procedures" },
  { name: "Hysteroscopy Procedures", category: "procedures" }
];

export default function Gynecology() {
  const [activeTab, setActiveTab] = useState('routine');

  const filteredServices = SERVICES.filter(s => s.category === activeTab);

  return (
    <div className="pt-32 pb-24 bg-white relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 left-0 w-96 h-96 bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container-custom">
        {/* Swapped Hero Section (Image Left, Content Right) */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-24">
          <div className="relative order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="aspect-[4/3] sm:aspect-[4/5] rounded-3xl lg:rounded-[3.5rem] overflow-hidden shadow-premium border-8 border-white bg-slate-100"
            >
              <img
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200"
                alt="Gynecology Care and Consulting"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden sm:block absolute -bottom-6 -right-6 bg-brand-secondary text-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs border border-orange-400/20"
            >
              <Heart size={32} className="mb-4 text-orange-100 animate-pulse" />
              <p className="text-sm font-bold leading-tight">Patient-centered care, expert specialists, and holistic women's health support.</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <span className="text-[10px] font-black text-brand-secondary uppercase tracking-[0.3em] mb-4 block">Women's Hub</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Gynaecology & <br /><span className="text-brand-secondary italic">Women's Health.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium leading-relaxed mb-6">
              Gynaecology is the branch of medicine that focuses on the health and well-being of women, particularly the diagnosis, treatment, and prevention of conditions affecting the female reproductive system. At Demo Hospital, our Gynaecology Department is dedicated to providing comprehensive and compassionate care for women of all ages.
            </p>
            <p className="text-base text-slate-500 font-medium leading-relaxed mb-8 border-l-4 border-brand-secondary/30 pl-4 italic">
              Our team of experienced specialists offers personalized treatment for a wide range of women's health concerns, from adolescence through menopause and beyond. We combine advanced medical technology with patient-centered care to ensure the highest standards of treatment and comfort.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#interactive-services" className="px-6 h-12 bg-slate-900 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-brand-secondary transition-all text-xs tracking-wider uppercase">
                Browse Departments <ArrowRight size={14} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Tabbed Interactive Services Section */}
        <section id="interactive-services" className="mb-24 scroll-mt-32">
          <div className="text-center mb-12">
            <span className="text-brand-secondary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">Custom Classifications</span>
            <h2 className="text-3xl md:text-5xl font-display text-brand-dark">Our Gynaecology Services</h2>
            <p className="text-slate-500 max-w-lg mx-auto mt-4">We organize our care pathways into structured categories to help you easily locate the correct consulting service.</p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-8 py-4 rounded-2xl font-bold text-sm tracking-wide uppercase transition-all duration-300 ${
                  activeTab === cat.id
                    ? 'bg-brand-secondary text-white shadow-xl shadow-orange-500/20 scale-105'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filtered Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[250px]">
            {filteredServices.map((service, i) => (
              <motion.div
                key={service.name}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="p-8 border border-slate-100 rounded-3xl bg-white hover:border-brand-secondary/30 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group flex items-start gap-4"
              >
                <div className="h-10 w-10 bg-orange-50 rounded-xl flex items-center justify-center text-brand-secondary shrink-0 group-hover:bg-brand-secondary group-hover:text-white transition-all duration-300">
                  <CheckCircle2 size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-brand-secondary transition-colors duration-300">
                    {service.name}
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
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-secondary/5 rounded-full blur-3xl -z-10" />
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-brand-secondary">
                <Sparkles size={24} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-widest text-brand-secondary text-xs">Our Medical Philosophy</h3>
            </div>
            <h2 className="text-3xl md:text-4xl font-display mb-6 leading-tight">Accurate Diagnosis, Compassionate Guidance & Modern Treatment Options</h2>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              At Demo Hospital, we understand that every woman has unique healthcare needs. Our goal is to provide accurate diagnosis, effective treatment, and ongoing support in a comfortable and caring environment. We are committed to promoting women's health through preventive care, early diagnosis, advanced treatment options, and continuous guidance at every stage of life.
            </p>
            <Link to="/contact" className="btn-primary bg-brand-secondary hover:bg-orange-700 hover:shadow-orange-500/20 inline-flex h-14 px-10 text-base">
              <span>Book a Consultation</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
