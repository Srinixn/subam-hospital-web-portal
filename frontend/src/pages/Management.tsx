import { motion } from 'motion/react';
import { Award, GraduationCap, Briefcase, Shield, Heart, Building, Sparkles } from 'lucide-react';

export default function Management() {
  const rajuEducation = [
    {
      degree: "MS – General Surgery",
      institution: "Thanjavur Medical College",
      duration: "2009 – 2012",
      notes: "Awarded the Gold Medal for academic distinction and recognized as the Best Outgoing Student."
    },
    {
      degree: "MBBS",
      institution: "Thanjavur Medical College",
      duration: "2000 – 2006",
      notes: "Completed undergraduate clinical training with honors."
    }
  ];

  const rajuExperience = [
    {
      role: "Founder & Director / Consultant Surgeon",
      hospital: "Subam Multispeciality Hospital",
      period: "2015 – Present",
      description: "Co-established Subam Multispeciality Hospital. Introduced state-of-the-art general surgery, trauma units, and laparoscopic surgical services."
    },
    {
      role: "Consultant General Surgeon",
      hospital: "SIMS Chellam Hospital",
      period: "2014 – 2015",
      description: "Conducted elective general and emergency surgeries."
    },
    {
      role: "Government Medical Officer & Surgeon",
      hospital: "Government Hospital, Sankagiri",
      period: "2012 – 2014",
      description: "Managed public healthcare and general surgical interventions in community clinical services."
    },
    {
      role: "Consultant Surgeon",
      hospital: "Vivekananda Hospital",
      period: "2012",
      description: "Managed post-graduate surgical rounds and acute trauma admissions."
    }
  ];

  const selviEducation = [
    {
      degree: "Fellowship in Reproductive Medicine",
      institution: "ICOG Centre",
      notes: "Clinical specialization in advanced reproductive endocrinology and assisted reproductive technologies (ART)."
    },
    {
      degree: "DRM (Germany) – Reproductive Medicine",
      institution: "Germany",
      notes: "Completed postgraduate qualification in reproductive medicine under German clinical standards."
    },
    {
      degree: "MD – Obstetrics & Gynaecology",
      institution: "Madurai Medical College",
      duration: "2006 – 2009",
      notes: "Specialized in advanced maternal care, high-risk obstetrics, and gynaecologic surgeries."
    },
    {
      degree: "MBBS",
      institution: "Stanley Medical College, Chennai",
      duration: "1999 – 2005",
      notes: "Undergraduate medical training at one of the state's most prestigious institutions."
    }
  ];

  const milestones = [
    {
      year: "2025",
      title: "Sunsrishti Fertility Centre (Salem)",
      desc: "Established a dedicated, state-of-the-art IVF and fertility care block within Subam Hospital to provide complete embryology and reproductive treatments under one roof."
    },
    {
      year: "2024",
      title: "Sunsrishti Speciality Hospital",
      desc: "Expanded community services with a specialized wing offering modern ICU care, advanced trauma resuscitation, and advanced laparoscopic surgical procedures."
    },
    {
      year: "2020",
      title: "Wing Expansion & IVF Services",
      desc: "Constructed an additional hospital wing, increasing bed capacity to 50 beds and initiating comprehensive fertility care options."
    },
    {
      year: "2015",
      title: "Subam Multispeciality Hospital",
      desc: "Expanded the original maternity clinical setup into a 20-bedded women's care hospital, developing a dedicated surgical and obstetric infrastructure."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/40 pt-24 pb-16 sm:pb-24">
      
      {/* ──────────────────────────────────────────────────────
          HERO HEADER
          ────────────────────────────────────────────────────── */}
      <section className="relative py-16 sm:py-24 overflow-hidden bg-brand-dark text-white rounded-b-[2rem] sm:rounded-b-[3.5rem] shadow-lg">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(13,148,136,0.12),transparent)]" />
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        
        <div className="container-custom relative z-10 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles size={12} /> Institutional Leadership
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-white mb-6 leading-tight">
              Clinical Excellence & <span className="italic text-brand-primary">Medical Governance</span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto font-medium">
              Subam Hospital is guided by pioneering medical directors whose clinical competence, academic qualifications, and ethical values shape our standard of care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          INTRODUCTION NARRATIVE
          ────────────────────────────────────────────────────── */}
      <section className="container-custom py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-medium"
          >
            Our governance framework focuses on delivering safe, accessible, and ethical medical care. By coordinating advanced surgical capabilities with specialized maternal-infant services, our directors ensure Subam Hospital operates at the forefront of healthcare standards.
          </motion.p>
        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          DR. RAJU CLINICAL PORTFOLIO
          ────────────────────────────────────────────────────── */}
      <section className="container-custom py-12 border-t border-slate-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Dr. Raju Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-slate-100 shadow-premium p-4"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800" 
                  alt="Dr. Raju"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-brand-primary/90 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                  Founder & Director
                </div>
              </div>
              
              <div className="px-3 pb-4">
                <h2 className="text-3xl font-display text-brand-dark mb-1">Dr. Raju</h2>
                <p className="text-brand-primary font-bold uppercase tracking-widest text-[10px] mb-4">
                  General & Laparoscopic Surgeon
                </p>
                <div className="h-px bg-slate-100 my-4" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <GraduationCap size={16} className="text-brand-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">MBBS, MS (General Surgery)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Award size={16} className="text-brand-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">FMAS, DMAS (Minimal Access)</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-l-4 border-brand-primary pl-6 py-4 bg-brand-primary/5 rounded-r-2xl"
            >
              <p className="text-sm font-display text-brand-dark leading-relaxed italic">
                "Clinical governance and precision surgery go hand-in-hand. We established our departments to ensure safety, minimize patient trauma, and deliver transparent surgical care."
              </p>
            </motion.blockquote>
          </div>

          {/* Dr. Raju Academic Credentials */}
          <div className="lg:col-span-7 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-display text-brand-dark pb-2 border-b border-slate-200">
                Clinical Biography
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Dr. Raju leads the general surgery and laparoscopy divisions at Subam Hospital. With an outstanding academic record as a medical gold medalist, he is dedicated to expanding advanced minimal access surgical procedures within Salem, ensuring shorter recovery times and clinical safety for patients.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-display text-brand-dark pb-2 border-b border-slate-200 flex items-center gap-3">
                <GraduationCap className="text-brand-primary" /> Academic Background & Qualifications
              </h3>
              <div className="space-y-6">
                {rajuEducation.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-100 hover:border-brand-primary transition-all duration-300">
                    <div className="absolute left-0 top-1.5 -translate-x-[5px] h-2 w-2 rounded-full bg-brand-primary" />
                    {edu.duration && <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">{edu.duration}</span>}
                    <h4 className="text-lg font-bold text-brand-dark mt-1">{edu.degree}</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">{edu.institution}</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">{edu.notes}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="bg-teal-50/40 border border-teal-100/60 rounded-3xl p-6 sm:p-8 text-slate-700 relative overflow-hidden shadow-sm"
            >
              <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-primary/5 rounded-full blur-2xl" />
              <div className="relative z-10">
                <h4 className="text-lg font-display text-brand-dark mb-4 flex items-center gap-2.5">
                  <Shield size={20} className="text-brand-primary" /> Postgraduate & Minimal Access Specialization
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4 font-medium">
                  Focused on implementing modern laparoscopic procedures, Dr. Raju holds dual certifications in Minimal Access Surgery, focusing on tissue preservation and outpatient surgical recovery.
                </p>
                <div className="bg-white border border-teal-100/50 rounded-xl p-4">
                  <p className="text-xs font-bold text-brand-primary uppercase tracking-wider">FMAS & DMAS (2014)</p>
                  <p className="text-xs text-slate-500 mt-1 font-semibold">Minimal Access Surgery at World Laparoscopy Hospital</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-display text-brand-dark pb-2 border-b border-slate-200 flex items-center gap-3">
                <Briefcase className="text-brand-primary" /> Clinical Appointments & Leadership History
              </h3>
              <div className="relative border-l border-slate-200/80 ml-3 space-y-8">
                {rajuExperience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 h-4.5 w-4.5 rounded-full bg-white border border-brand-primary flex items-center justify-center">
                      <div className="h-2 w-2 rounded-full bg-brand-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{exp.period}</span>
                    <h4 className="text-lg font-bold text-brand-dark mt-1 leading-snug">{exp.role}</h4>
                    <h5 className="text-xs sm:text-sm text-brand-primary font-bold uppercase tracking-wider mt-0.5">{exp.hospital}</h5>
                    <p className="text-xs sm:text-sm text-slate-500 mt-3 leading-relaxed font-medium">{exp.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          DR. SELVI RAJU CLINICAL PORTFOLIO
          ────────────────────────────────────────────────────── */}
      <section className="container-custom py-16 sm:py-24 border-t border-slate-200/60">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Dr. Selvi Raju Academic Credentials */}
          <div className="lg:col-span-7 order-2 lg:order-1 space-y-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl sm:text-3xl font-display text-brand-dark pb-2 border-b border-slate-200">
                Clinical Biography
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Dr. Selvi Raju is an accomplished Obstetrician, Gynaecologist, and reproductive specialist with extensive clinical training in Germany. She has driven maternal welfare initiatives, rural neonatal healthcare availability, and advanced IVF treatments, establishing Subam Hospital's clinical reputation.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-display text-brand-dark pb-2 border-b border-slate-200 flex items-center gap-3">
                <Briefcase className="text-brand-secondary" /> Academic Appointments & Public Health Leadership
              </h3>
              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                <p>
                  In <strong>2009</strong>, Dr. Selvi Raju joined the academic faculty as an <strong>Assistant Professor</strong> at Mohan Kumaramangalam Medical College, Salem. Over her career, she has integrated teaching with clinical interventions in underserved communities to advance public maternal health.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-xl sm:text-2xl font-display text-brand-dark pb-2 border-b border-slate-200 flex items-center gap-3">
                <GraduationCap className="text-brand-secondary" /> Academic Background & Specializations
              </h3>
              <div className="space-y-6">
                {selviEducation.map((edu, idx) => (
                  <div key={idx} className="relative pl-6 border-l-2 border-slate-100 hover:border-brand-secondary transition-all duration-300">
                    <div className="absolute left-0 top-1.5 -translate-x-[5px] h-2 w-2 rounded-full bg-brand-secondary" />
                    {edu.duration && <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-wider">{edu.duration}</span>}
                    <h4 className="text-lg font-bold text-brand-dark mt-1">{edu.degree}</h4>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500">{edu.institution}</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">{edu.notes}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Dr. Selvi Raju Card */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-32 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl border border-slate-100 shadow-premium p-4"
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-slate-100 mb-6 relative">
                <img 
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=800" 
                  alt="Dr. Selvi Raju"
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute top-4 right-4 bg-brand-secondary/90 text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-sm">
                  Founder & Director
                </div>
              </div>
              
              <div className="px-3 pb-4">
                <h2 className="text-3xl font-display text-brand-dark mb-1">Dr. Selvi Raju</h2>
                <p className="text-brand-secondary font-bold uppercase tracking-widest text-[10px] mb-4">
                  Obstetrics, Gynaecology & Fertility Specialist
                </p>
                
                <div className="h-px bg-slate-100 my-4" />
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-slate-600">
                    <GraduationCap size={16} className="text-brand-secondary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">MBBS, MD (OG), DRM (Germany)</span>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <Award size={16} className="text-brand-secondary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold">Reproductive Medicine (ICOG)</span>
                  </div>
                </div>

                <div className="h-px bg-slate-100 my-4" />
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Memberships: <span className="text-brand-secondary font-black">FOGSI • ISAR • IFS</span>
                </div>
              </div>
            </motion.div>

            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-l-4 border-brand-secondary pl-6 py-4 bg-brand-secondary/5 rounded-r-2xl"
            >
              <p className="text-sm font-display text-brand-dark leading-relaxed italic">
                "Clinical accuracy and emotional support are equally crucial in women's health. We aim to bring global reproductive therapies and compassionate maternity solutions to Salem."
              </p>
            </motion.blockquote>
          </div>

        </div>
      </section>

      {/* ──────────────────────────────────────────────────────
          COMBINED INSTITUTIONAL TIMELINE
          ────────────────────────────────────────────────────── */}
      <section className="container-custom py-16 sm:py-24 border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-3xl sm:text-4xl font-display text-brand-dark mb-4">Clinical Milestones & Institutional Growth</h3>
            <p className="text-slate-500 text-sm sm:text-base max-w-lg mx-auto">
              Our shared journey in expanding healthcare wings, establishing advanced IVF labs, and launching trauma centres.
            </p>
          </div>

          <div className="relative border-l border-slate-200/80 ml-3 md:ml-6 space-y-12">
            {milestones.map((mil, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 md:pl-10"
              >
                {/* Visual node */}
                <div className="absolute -left-[9px] md:-left-[10px] top-1.5 h-4.5 w-4.5 rounded-full bg-white border border-brand-primary flex items-center justify-center shadow-sm">
                  <div className="h-2 w-2 rounded-full bg-brand-primary" />
                </div>
                
                <span className="text-sm font-display font-black text-brand-primary tracking-wide">{mil.year}</span>
                <h4 className="text-lg font-bold text-brand-dark mt-1 leading-snug">{mil.title}</h4>
                <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed font-medium">{mil.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
