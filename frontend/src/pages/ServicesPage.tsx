import { motion } from 'motion/react';
import { CheckCircle2, ArrowRight, Baby, HeartPulse, Stethoscope, ScanLine, ShieldCheck, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const SPECIALITIES = [
  {
    title: "Obstetrics",
    icon: Baby,
    link: "/specialities/obstetrics",
    desc: "Comprehensive care throughout every stage of pregnancy — from routine antenatal check-ups to safe deliveries and high-risk pregnancy management.",
    features: ["Preconception Counseling", "High-Risk Pregnancy Management", "Painless Labour & Delivery", "Cesarean Section"]
  },
  {
    title: "Gynaecology",
    icon: HeartPulse,
    link: "/specialities/gynecology",
    desc: "Complete gynaecological care for women of all ages, from adolescence through menopause, with advanced diagnostic and surgical options.",
    features: ["Menstrual Disorder Management", "Laparoscopic Gynaecological Surgery", "Menopause Care", "Cancer Screening"]
  },
  {
    title: "Paediatrics",
    icon: Stethoscope,
    link: "/specialities/pediatrics",
    desc: "Expert medical care for infants, children, and adolescents with a focus on growth monitoring, vaccinations, and childhood illness management.",
    features: ["Newborn Screening", "Immunization Programs", "Growth & Development Monitoring", "Paediatric Emergency Care"]
  },
  {
    title: "Radiology",
    icon: ScanLine,
    link: "/specialities/radiology",
    desc: "State-of-the-art diagnostic imaging services providing accurate medical evaluations for precise diagnosis and treatment planning.",
    features: ["Ultrasound Scanning", "X-Ray Services", "Pregnancy Scans", "Fetal Growth Monitoring"]
  },
  {
    title: "Antenatal Care",
    icon: ShieldCheck,
    link: "/specialities/pregnancy-care",
    desc: "Structured pregnancy care programs with regular monitoring, nutritional guidance, and preparation for a healthy delivery.",
    features: ["Routine Antenatal Check-ups", "Fetal Health Monitoring", "Nutrition & Lifestyle Guidance", "Birth Planning"]
  },
  {
    title: "Postnatal Care",
    icon: Heart,
    link: "/specialities/post-natal",
    desc: "Dedicated postpartum support for mothers and newborns, covering physical recovery, emotional well-being, and breastfeeding support.",
    features: ["Postpartum Recovery Support", "Breastfeeding Guidance", "Newborn Health Checks", "Mental Health Screening"]
  },
  {
    title: "Fertility Care & IVF",
    icon: Sparkles,
    link: "/specialities/fertility",
    desc: "Advanced reproductive medicine with our state-of-the-art IVF centre, offering personalized treatment plans for couples seeking parenthood.",
    features: ["IVF & IUI Treatment", "Fertility Assessment", "Ovulation Induction", "Reproductive Counseling"]
  },
  {
    title: "Newborn Care",
    icon: Baby,
    link: "/specialities/newborn-care",
    desc: "Specialized neonatal care with Level III NICU capabilities for premature, low birth weight, and critically ill newborns.",
    features: ["Level III NICU", "Premature Baby Care", "Kangaroo Mother Care", "24/7 Neonatologist Coverage"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-16 sm:pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 py-16 sm:py-28 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-500/5 -skew-x-12 translate-x-1/4" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="h-px w-10 sm:w-12 bg-brand-primary" />
              <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-[10px]">Our Specialities</span>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl mb-6 sm:mb-8 font-display leading-[1.1] sm:leading-[0.95]">Specialized <br /><span className="text-brand-primary italic">Medical Care</span></h1>
            <p className="text-base sm:text-xl text-slate-500 leading-relaxed max-w-2xl">
              From women's health and maternity care to advanced fertility treatment and neonatal services — comprehensive healthcare under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Specialities Grid */}
      <section className="py-12 sm:py-24 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SPECIALITIES.map((dept, i) => (
              <motion.div
                key={dept.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group p-6 sm:p-10 border border-slate-100 rounded-2xl hover:border-brand-primary/20 hover:shadow-premium transition-all bg-white relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 bg-brand-primary/5 h-40 w-40 rounded-full blur-3xl group-hover:bg-brand-primary/10 transition-colors" />
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 mb-6">
                  <div className="h-14 w-14 rounded-xl bg-slate-50 flex items-center justify-center text-brand-primary shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-all">
                    <dept.icon size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-display text-brand-dark mb-2">{dept.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{dept.desc}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 pl-0 md:pl-20">
                   {dept.features.map((feature, j) => (
                     <div key={j} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={14} className="text-brand-primary shrink-0" />
                        <span>{feature}</span>
                     </div>
                   ))}
                </div>
                <div className="pl-0 md:pl-20">
                  <Link 
                    to={dept.link}
                    className="inline-flex items-center gap-2 text-brand-primary font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all"
                  >
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Bar */}
      <section className="py-12 sm:py-20 bg-brand-dark text-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 text-center">
            {[
              { value: "8", label: "Specialities" },
              { value: "50+", label: "Hospital Beds" },
              { value: "24/7", label: "Emergency Care" },
              { value: "12+", label: "Years of Service" }
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-display font-black text-brand-primary mb-2">{stat.value}</p>
                <p className="text-[10px] sm:text-xs text-slate-400 font-bold uppercase tracking-[0.15em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white text-center">
        <div className="container-custom">
            <div className="max-w-2xl mx-auto px-4">
               <h2 className="text-2xl sm:text-4xl font-display mb-4 sm:mb-6">Need specialized guidance?</h2>
               <p className="text-slate-500 text-sm sm:text-lg mb-8 sm:mb-10">Our team is available to help you choose the right specialist and treatment plan for your needs.</p>
               <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                  <Link to="/contact" className="btn-primary h-14 px-10 justify-center">Book a Consultation</Link>
                  <Link to="/doctors" className="h-14 px-10 border border-slate-200 rounded-xl flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
                     View Our Doctors
                  </Link>
               </div>
            </div>
        </div>
      </section>
    </div>
  );
}
