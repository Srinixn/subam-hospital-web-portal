import Hero from '../components/Hero';
import { motion } from 'motion/react';
import { Shield, Activity, ArrowRight, CheckCircle2, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

function InstitutionalOverview() {
  const institutions = [
    {
      name: "Women's Care",
      brand: "SUNSRISHTI",
      fullName: "Sunsrishti Women's Care",
      desc: "With a motto of \"GOOD HEALTH CARE FOR ALL\", Sunsrishti Women's Care is serving the mankind with its wide range of multi facet health care services for women.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      logoUrl: "https://srinixnm.github.io/hospital-access/sunsrishti.png",
      path: "/sunsrishti-womens-care",
      specialty: "MATERNAL HEALTH"
    },
    {
      name: "Fertility Center",
      brand: "SUNSRISHTI",
      fullName: "Sunsrishti Fertility Center",
      desc: "Over Generations, human lifestyle has gone into enormous transformation from one stage to other, due to upgrade of civilization and lifestyle...",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
      logoUrl: "https://srinixnm.github.io/hospital-access/image.png",
      path: "/sunsrishti-fertility-center",
      specialty: "REPRODUCTIVE MEDICINE"
    },
    {
      name: "Hospital",
      brand: "SUBAM",
      fullName: "Subam Hospital",
      desc: "Subam Hospital is the primary health hub of the network, providing comprehensive surgical care and advanced medical support to the Salem community.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
      logoUrl: "https://srinixnm.github.io/hospital-access/subam.png",
      path: "/subam-hospital",
      specialty: "MULTI-SPECIALTY"
    }
  ];

  return (
    <section className="py-20 bg-[#E5F7F6]">
      <div className="max-w-full px-4 md:px-8">
        {/* Professional Section Header */}
        <div className="mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-teal-700 font-black tracking-[0.5em] text-[8px] uppercase mb-3 block">The Subam Network</span>
            <h2 className="text-2xl md:text-4xl text-slate-900 mb-4 font-light tracking-tight">Institutional <span className="font-bold">Ecosystem</span></h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-lg mx-auto font-medium leading-relaxed">
              Diverse clinical centers unified by a single standard of medical excellence and compassionate patient care.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {institutions.map((hospital, i) => (
            <motion.div 
              key={hospital.fullName}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 1 }}
              viewport={{ once: true }}
              className="flex flex-col group"
            >
              <div className="relative mb-8 overflow-hidden rounded-[2rem]">
                 <img 
                    src={hospital.image} 
                    alt={hospital.fullName} 
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105" 
                 />
              </div>
              
              <div className="flex flex-col flex-grow px-2">
                 <div className="h-28 mb-6 flex items-center justify-center">
                    <img 
                      src={hospital.logoUrl} 
                      alt={`${hospital.fullName} Logo`} 
                      className="h-24 w-auto object-contain" 
                    />
                 </div>
                 
                 <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                   {hospital.desc}
                 </p>
                 
                 <div className="flex justify-end mt-auto">
                    <Link 
                      to={hospital.path} 
                      className="inline-flex items-center gap-1.5 text-slate-900 font-bold italic text-sm hover:text-brand-primary transition-colors"
                    >
                      <Search size={16} /> read more..
                    </Link>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side: Images & Stats */}
          <div className="relative">
            {/* Background design element (teal shape) */}
            <div className="absolute top-0 -left-12 w-[100%] h-full bg-brand-primary rounded-r-[3rem] -z-10 opacity-100" />
            
            <div className="relative p-4 md:p-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative z-10"
              >
                <div className="relative">
                  <img 
                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200" 
                    alt="Hospital Entrance" 
                    className="rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
                  />
                  
                  {/* 20+ Years Experience Badge - Styled as image */}
                  <div className="absolute -top-6 -right-6 w-24 h-24 flex items-center justify-center">
                    <div className="relative w-full h-full">
                       <div className="absolute inset-0 bg-brand-primary rounded-full flex flex-col items-center justify-center text-white border-4 border-white shadow-lg">
                          <span className="text-xl font-black">20+</span>
                          <span className="text-[7px] font-black uppercase text-center leading-tight">Years<br />Experience</span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stat text below main image */}
              <div className="mt-10">
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-4xl font-black text-slate-900">35000+</span>
                  <div className="flex flex-col">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Patients Cared</span>
                    <span className="text-sm font-black text-brand-primary uppercase tracking-widest leading-none">Childrens</span>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-500 italic max-w-sm leading-relaxed">
                  "Envisioning this issue, we founded our hospital in the year 2008 with the sole purpose of 'Delivering Life... Delivering Happiness...'"
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:pl-8"
          >
            <div className="inline-flex items-center px-4 py-1.5 border border-slate-200 bg-white text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm">
              About Us
            </div>
            
            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Dedication to <br />
              <span className="text-brand-primary">Clinical Excellence</span>
            </h2>
            
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-8 font-medium">
              Subam Women's Center & Post Graduate Institute stands as a premier 150-bed healthcare facility dedicated to the complete wellness of women and children. 
              Established in 2008, our mission remains steadfast: to deliver life and happiness through clinical precision and human empathy. 
              With over two decades of specialized expertise, we have had the privilege of welcoming more than 35,000 children into the world, maintaining an exceptional standard of maternal safety and neonatological care.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "The only exclusive women's center in Salem.",
                "The only private hospital Accredited DNB course with 4 seats in Obstetrics & Gynecology."
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="h-6 w-6 bg-brand-primary rounded-full flex items-center justify-center shrink-0 mt-0.5 shadow-md shadow-brand-primary/20">
                    <CheckCircle2 size={14} className="text-white" />
                  </div>
                  <span className="text-sm md:text-base font-bold text-slate-700 leading-tight">{item}</span>
                </div>
              ))}
            </div>

            <Link 
              to="/contact" 
              className="h-12 px-8 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-teal-700 transition-all w-fit uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20 hover:-translate-y-1"
            >
              <Phone size={16} /> Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



function WhyChooseUs() {
  const points = [
    { id: "1", title: "Clinical Leadership", desc: "Our team of senior consultants brings decades of multidisciplinary expertise to every case." },
    { id: "2", title: "Emergency Response", desc: "Equipped for 24/7 rapid intervention in critical obstetric and pediatric emergencies." },
    { id: "3", title: "Holistic Wellness", desc: "Comprehensive care protocols designed to support both physical recovery and emotional well-being." },
    { id: "4", title: "Medical Innovation", desc: "Integrating advanced diagnostic and surgical technologies for superior patient outcomes." }
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center px-4 py-1.5 border border-teal-200 bg-white text-brand-primary rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 shadow-sm">
            why choose us
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E293B] mb-6 leading-tight tracking-tight px-4">
            Excellence in Specialized Healthcare
          </h2>
          <div className="space-y-3 text-slate-500 text-xs md:text-sm font-medium max-w-2xl mx-auto leading-relaxed px-4">
            <p>
              At Subam Women's Center, we blend medical excellence with a deeply human approach. Every patient is treated with respect and individualized clinical attention.
            </p>
            <p>
              We go beyond treatment, understanding life stages and individual concerns to ensure both physical health and emotional comfort.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
            {points.map((point) => (
              <div key={point.id} className="flex gap-4">
                <div className="h-9 w-9 bg-brand-primary rounded-full flex items-center justify-center shrink-0 text-white font-black text-xs shadow-lg shadow-brand-primary/20">
                  {point.id}
                </div>
                <div>
                  <h4 className="text-base font-black text-[#1E293B] mb-1">{point.title}</h4>
                  <p className="text-slate-500 text-[10px] font-semibold leading-relaxed">{point.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-brand-primary rounded-[2rem] overflow-hidden flex flex-col md:flex-row items-center text-white shadow-xl"
            >
              <div className="p-8 md:w-1/2">
                <div className="mb-4">
                  <span className="text-4xl font-black block mb-1">99%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Satisfaction Rate*</span>
                </div>
                <p className="text-[8px] font-bold opacity-80 mb-0">*Trusted by 1.2k Patients on Google</p>
              </div>
              <div className="md:w-1/2 h-full overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544126592-807daa215a75?auto=format&fit=crop&q=80&w=800" 
                  alt="Care" 
                  className="w-full h-full object-cover min-h-[200px] transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const reviews = [
    {
      name: "Harini Son",
      quote: "The maternity experience at Subam Hospital was truly exceptional. My heartfelt gratitude to the clinical team who managed every complication with absolute precision and human warmth.",
      initials: "HS",
      location: "Salem"
    },
    {
      name: "Komathi M",
      quote: "An outstanding level of care during my delivery. The medical staff provided immense confidence and professional support, ensuring both my baby and I were well-cared for.",
      initials: "K",
      location: "Salem"
    },
    {
      name: "Vigneshwari Vicky",
      quote: "Immense gratitude to the entire clinical team for their unwavering support. Their professional excellence and empathetic approach made my journey much more comfortable.",
      initials: "V",
      location: "Salem"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-[#1E293B] mb-6 leading-tight tracking-tight">
            Clinical Testimonials
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium max-w-2xl mx-auto leading-relaxed px-4">
            Authentic experiences from the families who trust our specialized healthcare network for their most significant life moments.
          </p>
        </div>

        <div className="relative px-4">
          <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide items-stretch">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[300px] md:min-w-[450px] bg-white rounded-[2rem] p-8 md:p-10 flex flex-col shadow-xl border border-slate-100"
              >
                <p className="text-[#1E293B] text-sm md:text-base font-medium italic mb-8 leading-relaxed flex-grow">
                  "{review.quote}"
                </p>
                <div className="flex items-center gap-4 pt-6 border-t border-slate-100 mt-auto">
                  <div className="h-10 w-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 overflow-hidden">
                     <span className="text-xs font-black">{review.initials}</span>
                  </div>
                  <div>
                     <h5 className="font-black text-[#1E293B] text-sm">{review.name}</h5>
                     <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {[0, 1, 2, 3, 4].map((dot) => (
              <div key={dot} className={`h-1.5 rounded-full transition-all ${dot === 0 ? 'w-6 bg-brand-primary' : 'w-1.5 bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <InstitutionalOverview />
      <AboutSection />
      
      {/* Editorial Feature Section */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#0D9488_0%,transparent_70%)]" />
        </div>
        
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative rounded-[1.5rem] overflow-hidden aspect-video shadow-xl border border-white/10"
              >
                <img 
                  src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200" 
                  alt="Operating Theater" 
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </motion.div>
              <div className="absolute -bottom-6 -right-6 bg-teal-600 p-8 rounded-[2.5rem] hidden md:block shadow-2xl">
                <p className="text-3xl font-display font-black text-white italic">Care</p>
                <p className="text-[9px] font-bold text-teal-100 uppercase tracking-[.4em] mt-1">Beyond Boundaries</p>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-teal-500 font-bold tracking-[0.4em] text-[9px] uppercase mb-4 block">Medical Innovation</span>
                <h2 className="text-2xl md:text-4xl text-white mb-6 leading-[1.1] tracking-tight">Precision <br /><span className="text-teal-500 italic">Medicine</span>.</h2>
                <div className="space-y-3 mb-8">
                  {[
                    "Modular Operation Theaters with HEPA Filters",
                    "Advanced 128-Slice CT & Digital X-Ray",
                    "24/7 Level III Neonatal Intensive Care",
                    "Comprehensive Trauma & Emergency Units"
                  ].map(item => (
                    <div key={item} className="flex items-center gap-3 text-white/70">
                      <div className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                      <span className="text-sm md:text-base font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <Link to="/about" className="h-12 px-6 bg-teal-600 text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-teal-700 transition-all w-fit uppercase text-[9px] tracking-widest">
                  Discover our Legacy <ArrowRight size={14} />
                </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <WhyChooseUs />
      <Testimonials />

      <section className="py-32 bg-slate-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <span className="text-teal-600 font-black tracking-[0.4em] text-[9px] uppercase mb-4 block">Care for the Community</span>
              <h2 className="text-2xl md:text-4xl mb-8 leading-[1.1] tracking-tight">Serving the Wider <br /> <span className="font-bold">Salem Region.</span></h2>
              <div className="space-y-6 mb-8">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-teal-600 shrink-0 shadow-md group hover:bg-teal-600 hover:text-white transition-all duration-500">
                    <Activity size={24} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Central Location</h4>
                    <p className="text-slate-500 leading-relaxed text-sm max-w-sm font-medium">Strategically located for rapid access from Magudanchavadi and Elampillai.</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-teal-600 shrink-0 shadow-md group hover:bg-teal-600 hover:text-white transition-all duration-500">
                    <Shield size={24} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Trauma Ready</h4>
                    <p className="text-slate-500 leading-relaxed text-sm max-w-sm font-medium">Equipped with dedicated emergency corridors for immediate surgical response.</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-white rounded-[2rem] border border-slate-100 italic text-slate-600 text-base shadow-sm">
                "Our mission is to bring global medical standards to our local community, ensuring no life is lost due to distance."
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-[3rem] overflow-hidden shadow-xl border-8 border-white bg-slate-200">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.464!2d78.0042!3d11.6070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM2JzI1LjIiTiA3OMKwMDAnMTUuMSJF!5e0!3m2!1sen!2sin!4v1716117600000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy"
                  title="Subam Hospital Location Map"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-slate-900 text-white p-8 rounded-[2rem] shadow-xl border border-white/5">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-2 text-teal-500">Accessible Hub</p>
                <p className="text-xl font-display leading-tight">Magudanchavadi Rd, <br /> Salem - 637502</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </>
  );
}
