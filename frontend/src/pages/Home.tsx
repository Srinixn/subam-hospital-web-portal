import { useState, useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import GrowthChart from '../components/GrowthChart';
import { motion } from 'motion/react';
import { Shield, Activity, ArrowRight, CheckCircle2, Phone, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

function CredentialsBridge() {
  return (
    <section className="bg-white border-b border-slate-100 relative z-10">
      <div className="container-custom">
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-5">
          {[
            { value: "50+", label: "Hospital Beds" },
            { value: "8", label: "Specialities" },
            { value: "12+", label: "Years of Trust" },
            { value: "35k+", label: "Patients Served" },
            { value: "24/7", label: "Emergency Care" }
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className={`py-6 md:py-10 text-center border-slate-100 border-r last:border-r-0
                ${idx >= 3 ? 'hidden sm:block' : ''}`}
            >
              <p className="text-2xl md:text-3xl font-display font-black text-brand-primary leading-none mb-1">{stat.value}</p>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function InstitutionalOverview() {
  const institutions = [
    {
      name: "Hospital",
      brand: "DEMO",
      fullName: "Demo Hospital",
      desc: "Demo Hospital is specialized in women's healthcare and pregnancy care, providing comprehensive maternity, gynaecology, prenatal, and postnatal services for mothers and children.",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
      logoUrl: "https://placehold.co/320x100?text=Demo+Hospital",
      path: "/demo-hospital",
      specialty: "WOMEN'S & PREGNANCY CARE"
    },
    {
      name: "Fertility Center",
      brand: "EXAMPLE",
      fullName: "Example Fertility Center",
      desc: "Example Fertility Center is a dedicated center for IVF (In Vitro Fertilization), ICSI, IUI, and advanced reproductive treatments, bringing hope to aspiring parents.",
      image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
      logoUrl: "https://placehold.co/320x100?text=Example+Fertility",
      path: "/example-fertility-center",
      specialty: "IVF & FERTILITY CARE"
    },
    {
      name: "Multispeciality Hospital",
      brand: "EXAMPLE",
      fullName: "Example Multispeciality Hospital",
      desc: "Example Multispeciality Hospital provides general medicine, general surgery, orthopaedics, skin care, dermatology, and a complete range of healthcare services for all patients.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=1200",
      logoUrl: "https://placehold.co/320x100?text=Example+Hospital",
      path: "/example-multispeciality-hospital",
      specialty: "MULTI-SPECIALTY"
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-slate-50 border-b border-slate-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-10 md:mb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-10 bg-brand-primary" />
              <span className="text-brand-primary font-bold tracking-[0.3em] text-[10px] uppercase">The Demo Network</span>
              <div className="h-px w-10 bg-brand-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-display text-brand-dark mb-4">Our Healthcare Institutions</h2>
            <p className="text-slate-500 text-xs md:text-sm max-w-lg mx-auto leading-relaxed">
              Diverse clinical centres unified by a single standard of medical excellence and compassionate patient care.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {institutions.map((hospital, i) => (
            <motion.div
              key={hospital.fullName}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-premium transition-all duration-500 group flex flex-col"
            >
              <div className="relative overflow-hidden">
                 <img
                    src={hospital.image}
                    alt={hospital.fullName}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] text-brand-dark">{hospital.specialty}</span>
                 </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col flex-grow text-center">
                 <div className="h-16 md:h-20 mb-4 flex items-center justify-center">
                    <img
                      src={hospital.logoUrl}
                      alt={`${hospital.fullName} Logo`}
                      className="h-12 md:h-16 w-auto object-contain mx-auto"
                    />
                 </div>

                 <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 flex-grow">
                   {hospital.desc}
                 </p>

                 <Link
                   to={hospital.path}
                   className="inline-flex items-center justify-center gap-2 text-brand-primary font-bold text-xs uppercase tracking-widest hover:gap-4 transition-all"
                 >
                   Learn More <ArrowRight size={14} />
                 </Link>
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
    <section className="py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Images & Stats */}
          <div className="relative">
            {/* Background design element (teal shape) */}
            <div className="absolute top-0 -left-12 w-[100%] h-full bg-brand-primary rounded-r-[3rem] -z-10 opacity-100 hidden lg:block" />

            <div className="relative p-0 sm:p-4 md:p-8">
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
                    className="rounded-2xl sm:rounded-[2.5rem] shadow-2xl w-full object-cover aspect-[4/3] border-4 border-white"
                  />

                  {/* 20+ Years Experience Badge - Styled as image */}
                  <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
                    <div className="relative w-full h-full">
                       <div className="absolute inset-0 bg-brand-primary rounded-full flex flex-col items-center justify-center text-white border-4 border-white shadow-lg">
                          <span className="text-lg sm:text-xl font-black">20+</span>
                          <span className="text-[6px] sm:text-[7px] font-black uppercase text-center leading-tight">Years<br />Experience</span>
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Stat text below main image */}
              <div className="mt-8 sm:mt-10">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-2">
                  <span className="text-3xl sm:text-4xl font-black text-slate-900">25,000+</span>
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-xs font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Deliveries Completed</span>
                    <span className="text-xs sm:text-sm font-black text-brand-primary uppercase tracking-widest leading-none">20,000+ Normal Deliveries</span>
                  </div>
                </div>
                <p className="text-[11px] font-medium text-slate-500 italic max-w-sm leading-relaxed">
                  "Successfully completed 25,000 deliveries at our hospital, out of which 20,000 are normal deliveries — our most trusted hallmark."
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
            <div className="inline-flex items-center px-4 py-1.5 border border-slate-200 bg-white text-slate-900 rounded-lg text-[10px] font-black uppercase tracking-widest mb-6 sm:mb-8 shadow-sm">
              About Us
            </div>

            <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
              Dedication to <br />
              <span className="text-brand-primary">Clinical Excellence</span>
            </h2>

            <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-8 font-medium">
              Demo Hospital stands as a premier healthcare facility dedicated to the complete wellness of women and children.
              Established in 2013, our mission remains steadfast: to deliver life and happiness through clinical precision and human empathy.
              With over a decade of specialized expertise, we have successfully managed over 25,000 deliveries at our hospital, out of which more than 20,000 are normal deliveries, maintaining an exceptional standard of maternal safety.
            </p>

            <div className="space-y-4 mb-10">
              {[
                "The only exclusive women's center in Example City.",
                "Over 25,000 deliveries successfully completed (including 20,000+ normal deliveries).",
                "The only private hospital Accredited DNB course with 4 seats in Obstetrics & Gynaecology."
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
    {
      id: "1",
      title: "Decade of Trusted Care",
      desc: "Serving the Ellampillai community since 2013, evolving from a small setup into a trusted multi-specialty healthcare network."
    },
    {
      id: "2",
      title: "Clinical Leadership",
      desc: "Guided by Dr. A. Example (Gynaecologist & Infertility Specialist, DRM Germany) and Dr. A. Example (General & Laparoscopic Surgeon)."
    },
    {
      id: "3",
      title: "Specialized Medical Wings",
      desc: "Equipped with dual operation theatres, modern ICU, advanced trauma care, a fully functional OT complex, and 24/7 pharmacy."
    },
    {
      id: "4",
      title: "Life-Stage Specialization",
      desc: "Expert care across Obstetrics, Gynaecology, Paediatrics, state-of-the-art IVF Fertility Center, and specialized Newborn Care."
    }
  ];

  return (
    <section className="py-12 sm:py-20 bg-slate-50">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center px-4 py-1.5 border border-teal-200 bg-white text-brand-primary rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 shadow-sm">
            why choose us
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#1E293B] mb-4 md:mb-6 leading-tight tracking-tight px-4">
            Excellence in Specialized Healthcare
          </h2>
          <div className="space-y-3 text-slate-500 text-xs md:text-sm font-medium max-w-2xl mx-auto leading-relaxed px-4">
            <p>
              Demo Hospital and Example Speciality Hospital stand as trusted healthcare institutions, combining modern medical technology, experienced healthcare professionals, and patient-centered care.
            </p>
            <p>
              Our commitment remains unchanged—to deliver safe, affordable, and compassionate healthcare services while continually evolving to meet the growing needs of our community.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-10">
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
              className="bg-brand-primary rounded-2xl sm:rounded-[2rem] overflow-hidden flex flex-col sm:flex-row items-center text-white shadow-xl"
            >
              <div className="p-6 sm:p-8 sm:w-1/2">
                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-black block mb-1">99%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-90">Satisfaction Rate*</span>
                </div>
                <p className="text-[8px] font-bold opacity-80 mb-0">*Trusted by 1.2k Patients on Google</p>
              </div>
              <div className="sm:w-1/2 w-full h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800"
                  alt="Care"
                  className="w-full h-full object-cover min-h-[200px] sm:min-h-full transition-transform duration-700 group-hover:scale-105"
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
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const response = await api.getTestimonials();
        if (response.success && Array.isArray(response.data)) {
          const mapped = response.data.map((item: any) => {
            const name = item.patientName || 'Verified Patient';
            const initials = name
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2) || 'VP';
            return {
              name,
              quote: item.comments,
              initials,
              location: "Verified Patient"
            };
          });
          setReviews(mapped.slice(0, 5));
        }
      } catch (err) {
        console.error("Failed to fetch testimonials", err);
      }
    }
    fetchTestimonials();
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      const progress = scrollLeft / maxScroll;
      const index = Math.round(progress * (reviews.length - 1));
      setActiveIndex(index);
    }
  };

  const scrollTo = (index: number) => {
    if (scrollRef.current) {
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll <= 0) return;
      const targetScroll = (index / (reviews.length - 1)) * maxScroll;
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  return (
    <section className="py-12 sm:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-5xl font-black text-[#1E293B] mb-4 md:mb-6 leading-tight tracking-tight">
            Clinical Testimonials
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium max-w-2xl mx-auto leading-relaxed px-4">
            Authentic experiences from the families who trust our specialized healthcare network for their most significant life moments.
          </p>
        </div>

        <div className="relative px-4">
          {reviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-400 text-sm font-medium">Patient testimonials are being collected. Check back soon!</p>
            </div>
          ) : (
            <>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide items-stretch snap-x snap-mandatory scroll-smooth animate-once"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="min-w-[270px] sm:min-w-[350px] md:min-w-[450px] bg-white rounded-2xl sm:rounded-[2rem] p-6 sm:p-8 md:p-10 flex flex-col shadow-xl border border-slate-100 snap-start"
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
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${
                  i === activeIndex ? 'w-6 bg-brand-primary' : 'w-1.5 bg-slate-200'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function InsurancePartners() {
  const logos = [
    { src: "https://chtn.cmchistn.com/media/branding/CH-Logo.png", alt: "CMCHIS Logo" },
    { src: "https://portal.mediassist.in/img/MediBuddy_Logo.png", alt: "Medi Assist Logo" },
    { src: "https://mdindiaonline.com/MDIAssets/image/mdilogo.svg", alt: "MD India Logo" },
    { src: "https://www.starhealth.in/lp/img/star_health_generic_logo.svg", alt: "Star Health Insurance Logo" },
    { src: "https://www.agentaux.com/img/icici_lombard.png", alt: "ICICI Lombard Logo" },
    { src: "https://vidalfestorage.blob.core.windows.net/vidal-homepage/vidalhealthtpa/assets/img/logo.png", alt: "Vidal Health Logo" },
    { src: "https://wallet.volohealthtpa.com/assets/img/home/Volo%20Logo.jpg", alt: "Volo Health Logo" },
    { src: "https://www.hitpa.co.in/Portals/0/logo.png?ver=2015-07-14-033452-000", alt: "Health Insurance TPA of India Logo" },
    { src: "https://www.bajajgeneralinsurance.com/content/dam/revampbagic/homepage/BGIL-logo.gif", alt: "Bajaj Allianz Logo" },
    { src: "https://www.cholainsurance.com/o/chola-corporate-theme/images/logo.png", alt: "Chola MS Logo" },
    { src: "https://cashlesshospital.com/wp-content/uploads/2024/07/Untitled-design-32-1024x277.png", alt: "Reliance General Insurance Logo" },
    { src: "https://covernest.com/blog/wp-content/uploads/2017/07/Royal-Sundaram-GI-logo.jpg", alt: "Royal Sundaram Logo" },
    { src: "https://www.galaxyhealth.com/_astro/LogoNW1.X876WOf3_Z1B8TGB.webp", alt: "Galaxy Health Logo" }
  ];

  return (
    <section className="py-12 sm:py-20 bg-white border-t border-slate-100 overflow-hidden">
      <div className="container-custom mb-8 md:mb-12 text-center">
        <h2 className="text-base sm:text-xl md:text-2xl font-display font-medium text-brand-primary mb-4 tracking-tight leading-relaxed max-w-4xl mx-auto px-4 italic">
          "We provide insurance support for a wide range of health insurance providers, ensuring a smooth and hassle-free treatment experience for our patients."
        </h2>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* Infinite Scrolling Ribbon */}
        <div className="flex gap-4 sm:gap-8 py-2 animate-marquee">
          {/* Loop 1 */}
          {logos.map((logo, i) => (
            <div key={`logo-a-${i}`} className="flex-shrink-0 flex items-center justify-center bg-white px-4 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl border border-teal-100 shadow-sm w-36 h-12 sm:w-48 sm:h-16 md:w-56 md:h-20 hover:border-brand-primary/40 hover:shadow-md transition-all duration-300">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain mx-auto"
                loading="lazy"
              />
            </div>
          ))}
          {/* Loop 2 */}
          {logos.map((logo, i) => (
            <div key={`logo-b-${i}`} className="flex-shrink-0 flex items-center justify-center bg-white px-4 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl border border-teal-100 shadow-sm w-36 h-12 sm:w-48 sm:h-16 md:w-56 md:h-20 hover:border-brand-primary/40 hover:shadow-md transition-all duration-300">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-w-full max-h-full object-contain mx-auto"
                loading="lazy"
              />
            </div>
          ))}
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
      <section className="py-12 sm:py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#0D9488_0%,transparent_70%)]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
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
      <GrowthChart />
      <Testimonials />
      <InsurancePartners />

      <section className="py-16 sm:py-24 md:py-32 bg-slate-50 overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <div>
              <span className="text-teal-600 font-black tracking-[0.4em] text-[9px] uppercase mb-4 block">Care for the Community</span>
              <h2 className="text-2xl md:text-4xl mb-6 md:mb-8 leading-[1.1] tracking-tight">Serving the Wider <br /> <span className="font-bold">Example City Region.</span></h2>
              <div className="space-y-6 mb-8">
                <div className="flex gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-teal-600 shrink-0 shadow-md group hover:bg-teal-600 hover:text-white transition-all duration-500">
                    <Activity size={24} className="group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold mb-1">Central Location</h4>
                    <p className="text-slate-500 leading-relaxed text-sm max-w-sm font-medium">Strategically located for rapid access from Magudanchavadi and Example Town.</p>
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
              <div className="p-6 sm:p-8 bg-white rounded-2xl sm:rounded-[2rem] border border-slate-100 italic text-slate-600 text-base shadow-sm">
                "Our mission is to bring global medical standards to our local community, ensuring no life is lost due to distance."
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl sm:rounded-[3rem] overflow-hidden shadow-xl border-4 sm:border-8 border-white bg-slate-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.464!2d78.0042!3d11.6070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM2JzI1LjIiTiA3OMKwMDAnMTUuMSJF!5e0!3m2!1sen!2sin!4v1716117600000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Demo Hospital Location Map"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-slate-900 text-white p-4 sm:p-8 rounded-xl sm:rounded-[2rem] shadow-xl border border-white/5">
                <p className="text-[8px] font-black uppercase tracking-[0.4em] mb-1 sm:mb-2 text-teal-500">Accessible Hub</p>
                <p className="text-sm sm:text-xl font-display leading-tight">Example Main Road, <br /> Example City - 000000</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


    </>
  );
}
