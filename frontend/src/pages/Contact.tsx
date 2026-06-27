import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, ShieldCheck, Headphones, Calendar, Pill, Building, Baby, FlaskConical, TrendingUp } from 'lucide-react';
import { api } from '../services/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiryType: 'General Inquiry',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      tempErrors.fullName = 'Full Name is required';
    } else if (formData.fullName.length < 2 || formData.fullName.length > 100) {
      tempErrors.fullName = 'Full Name must be between 2 and 100 characters';
    }

    if (!formData.phone.trim()) {
      tempErrors.phone = 'Phone Number is required';
    } else if (!/^\+?[0-9\s\-]{7,20}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number (7-20 digits)';
    }

    if (!formData.email.trim()) {
      tempErrors.email = 'Email Address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      tempErrors.message = 'Message is required';
    } else if (formData.message.length < 10 || formData.message.length > 2000) {
      tempErrors.message = 'Message must be between 10 and 2000 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    const response = await api.submitContact(formData);
    setIsSubmitting(false);

    if (response.success) {
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        inquiryType: 'General Inquiry',
        message: ''
      });
    } else {
      if (response.errors) {
        const fieldErrors: Record<string, string> = {};
        response.errors.forEach((err) => {
          fieldErrors[err.field] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setSubmitError(response.message || 'An error occurred. Please try again later.');
      }
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Direct Helpline",
      details: [
        { label: "+91 90922 25481 (Reception)", link: "tel:+919092225481" },
        { label: "+91 95857 11112 (OP Appointment)", link: "tel:+919585711112" }
      ],
      color: "bg-teal-50 text-brand-primary"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: [
        { label: "hospitalsubam@gmail.com", link: "mailto:hospitalsubam@gmail.com" },
        { label: "subamsunsrishti@gmail.com", link: "mailto:subamsunsrishti@gmail.com" }
      ],
      color: "bg-orange-50 text-brand-secondary"
    },
    {
      icon: MapPin,
      title: "Our Location",
      details: [
        { label: "Kakapalayam Main Road Opp", link: null },
        { label: "Elampillai - 637502", link: null }
      ],
      color: "bg-purple-50 text-brand-accent"
    }
  ];

  const departmentContacts = [
    {
      name: "Reception & Helpdesk",
      numbers: ["9092225481"],
      icon: Headphones,
      desc: "For general inquiries, admission process, and visitor information."
    },
    {
      name: "OP Appointment",
      numbers: ["9092225482", "9585711112"],
      icon: Calendar,
      desc: "Book and schedule outpatient consultations with our medical specialists."
    },
    {
      name: "Scan & Ultrasound",
      numbers: ["9092225483"],
      icon: Phone,
      desc: "Schedule ultrasound, X-ray, and diagnostic radiology scans.",
      timing: "10:00 AM - 4:00 PM"
    },
    {
      name: "IVF & Fertility Care",
      numbers: ["9092225486"],
      icon: Baby,
      desc: "Direct contact for fertility treatments, counseling, and IVF support."
    },
    {
      name: "Pediatric OP",
      numbers: ["9092225489"],
      icon: Baby,
      desc: "Consultations and wellness checkups for infants, children, and teens.",
      timing: "Morning: 9:00 AM - 1:00 PM & Evening: 5:00 PM - 7:00 PM"
    },
    {
      name: "Pharmacy",
      numbers: ["9092225484"],
      icon: Pill,
      desc: "Inquire about medicine availability, home delivery, or prescription orders."
    },
    {
      name: "Clinical Lab",
      numbers: ["9092225488"],
      icon: FlaskConical,
      desc: "Check lab test report status, sample collection times, and test list."
    },
    {
      name: "Administrative Office",
      numbers: ["9092225485"],
      icon: Building,
      desc: "For corporate billing, insurance claims, and administrative matters."
    },
    {
      name: "Management & Digital Marketing",
      numbers: ["9092225487"],
      icon: TrendingUp,
      desc: "For partnerships, business operations, media queries, and marketing."
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 py-32 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
           <div className="max-w-3xl">
              <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Get in Touch</span>
              <h1 className="text-5xl md:text-8xl mb-8 font-display">How can we <br /> <span className="text-brand-primary">Help You?</span></h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                 Our dedicated support team and medical counselors are available 24/7 to address your queries and coordinate your care journey.
              </p>
           </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-24 bg-white">
         <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8 mb-24">
               {contactInfo.map((info, i) => (
                 <div key={i} className="p-10 rounded-[3rem] border border-slate-100 hover:border-brand-primary/20 hover:shadow-premium transition-all bg-white">
                    <div className={`h-16 w-16 rounded-2xl ${info.color} flex items-center justify-center mb-8`}>
                       <info.icon size={32} />
                    </div>
                    <h3 className="text-2xl mb-4">{info.title}</h3>
                    {info.details.map((detail, j) => 
                      detail.link ? (
                        <a 
                          key={j} 
                          href={detail.link} 
                          className="block text-slate-500 hover:text-brand-primary font-medium mb-1 transition-colors"
                        >
                          {detail.label}
                        </a>
                      ) : (
                        <p key={j} className="text-slate-500 font-medium mb-1">{detail.label}</p>
                      )
                    )}
                 </div>
               ))}
            </div>

            {/* Department Contacts Directory */}
            <div className="mb-24">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Direct Lines</span>
                <h2 className="text-3xl md:text-5xl font-display text-slate-900 mb-4">Department Directory</h2>
                <p className="text-slate-500 font-medium">Connect directly with the relevant department to bypass wait times and reach specialized assistance immediately.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departmentContacts.map((dept, idx) => (
                  <div 
                    key={idx} 
                    className="bg-white rounded-[2rem] p-8 border border-slate-100 hover:border-brand-primary/20 hover:shadow-premium transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-12 w-12 rounded-2xl bg-slate-50 text-brand-primary flex items-center justify-center shrink-0">
                          <dept.icon size={22} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 leading-tight">{dept.name}</h3>
                      </div>
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium opacity-85">{dept.desc}</p>
                      {dept.timing && (
                        <div className="flex items-center gap-2 mb-6 px-3 py-2 bg-teal-50/50 rounded-xl text-teal-800 text-xs font-semibold">
                          <Clock size={12} className="shrink-0 text-brand-primary" />
                          <span>Timing: {dept.timing}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2 mt-auto">
                      {dept.numbers.map((num) => (
                        <a 
                          key={num}
                          href={`tel:+91${num}`}
                          className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-brand-primary hover:text-white rounded-2xl transition-all duration-200 group/btn"
                        >
                          <span className="font-bold text-sm tracking-wide">+91 {num.slice(0, 5)} {num.slice(5)}</span>
                          <Phone size={14} className="text-slate-400 group-hover/btn:text-white transition-colors" />
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
               {/* Form */}
               <div className="lg:col-span-3 bg-slate-50 rounded-[4rem] p-10 md:p-16 border border-slate-100">
                  {isSubmitted ? (
                     <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-16 px-6"
                     >
                        <div className="h-24 w-24 rounded-[2rem] bg-teal-50 text-brand-primary flex items-center justify-center mx-auto mb-8 border border-brand-primary/20">
                           <ShieldCheck size={48} />
                        </div>
                        <h3 className="text-4xl mb-4 font-display">Thank You!</h3>
                        <p className="text-slate-500 text-lg max-w-md mx-auto mb-10 leading-relaxed">
                           Your inquiry has been submitted successfully. Our team will get back to you within 24 hours.
                        </p>
                        <button 
                           onClick={() => setIsSubmitted(false)}
                           className="btn-primary px-8 h-14 text-xs font-bold uppercase tracking-widest"
                        >
                           Send Another Message
                        </button>
                     </motion.div>
                  ) : (
                     <>
                        <h3 className="text-3xl mb-10 font-display">Send a Message</h3>
                        {submitError && (
                           <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">
                              {submitError}
                           </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-8">
                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
                                 <input 
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className={`w-full h-16 bg-white border ${errors.fullName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-2xl px-6 focus:outline-none focus:ring-2`} 
                                    placeholder="John Doe" 
                                 />
                                 {errors.fullName && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.fullName}</p>}
                              </div>
                              <div className="space-y-2">
                                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Phone Number</label>
                                 <input 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full h-16 bg-white border ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-2xl px-6 focus:outline-none focus:ring-2`} 
                                    placeholder="+91 00000 00000" 
                                 />
                                 {errors.phone && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.phone}</p>}
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
                              <input 
                                 value={formData.email}
                                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                 className={`w-full h-16 bg-white border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-2xl px-6 focus:outline-none focus:ring-2`} 
                                 placeholder="john@example.com" 
                              />
                              {errors.email && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.email}</p>}
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Your Inquiry</label>
                              <div className="relative">
                                 <select 
                                    value={formData.inquiryType}
                                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                                    className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 appearance-none"
                                 >
                                    <option>General Inquiry</option>
                                    <option>Obstetrics</option>
                                    <option>Gynecology</option>
                                    <option>Pediatrics</option>
                                    <option>Radiology</option>
                                    <option>Antenatal (Pregnancy Care)</option>
                                    <option>Postnatal Care</option>
                                    <option>Fertility Care</option>
                                    <option>Newborn Care</option>
                                 </select>
                                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-6 text-slate-500">
                                    <span className="text-[10px]">▼</span>
                                 </div>
                              </div>
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Detailed Message</label>
                              <textarea 
                                 value={formData.message}
                                 onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                 className={`w-full h-40 bg-white border ${errors.message ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-3xl p-6 focus:outline-none focus:ring-2 resize-none`} 
                                 placeholder="Describe your requirement in detail..." 
                              />
                              {errors.message && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.message}</p>}
                           </div>
                           <button 
                              disabled={isSubmitting}
                              className="btn-primary w-full h-16 text-lg flex items-center justify-center gap-3 disabled:opacity-75 cursor-pointer"
                           >
                              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'} <ArrowRight size={20} />
                           </button>
                        </form>
                     </>
                  )}
               </div>

               {/* Map Placeholder & Trust */}
               <div className="lg:col-span-2 space-y-12">
                  <div className="rounded-[3rem] overflow-hidden shadow-2xl relative aspect-square bg-slate-200">
                     <iframe 
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3917.464!2d78.0042!3d11.6070!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDM2JzI1LjIiTiA3OMKwMDAnMTUuMSJF!5e0!3m2!1sen!2sin!4v1716117600000!5m2!1sen!2sin" 
                      width="100%" 
                      height="100%" 
                      style={{ border: 0 }} 
                      allowFullScreen 
                      loading="lazy"
                      title="Contact Location Map"
                    />
                    <div className="absolute top-6 left-6 glass-card px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-dark">
                       Open in Google Maps
                    </div>
                  </div>

                  <div className="space-y-8">
                     <div className="flex gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-teal-50 flex items-center justify-center text-brand-primary shrink-0">
                           <ShieldCheck size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">Secure Data</h4>
                           <p className="text-slate-500 text-sm leading-relaxed">Your personal health information is encrypted and managed according to GDPR/HIPAA standards.</p>
                        </div>
                     </div>
                     <div className="flex gap-6">
                        <div className="h-12 w-12 rounded-2xl bg-orange-50 flex items-center justify-center text-brand-secondary shrink-0">
                           <Headphones size={24} />
                        </div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">Patient Advocacy</h4>
                           <p className="text-slate-500 text-sm leading-relaxed">Need help navigating your insurance or bills? Our patient advocates are here for you.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Emergency Center */}
      <section className="py-24 bg-brand-dark overflow-hidden">
         <div className="container-custom">
            <div className="bg-brand-primary rounded-[5rem] p-12 md:p-24 text-center text-white relative">
               <div className="absolute inset-0 opacity-10 pointer-events-none">
                  <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_0%,transparent_70%)]" />
               </div>
               <h2 className="text-4xl md:text-7xl mb-8 font-display">Medical Emergency?</h2>
               <p className="text-teal-50 text-xl font-bold mb-12 max-w-xl mx-auto">Call our 24/7 Trauma response unit for immediate ambulance dispatch and critical care coordination.</p>
               <a href="tel:+919092225481" className="inline-flex items-center gap-6 text-4xl md:text-6xl font-black hover:scale-105 transition-transform max-w-full">
                  <Phone size={60} />
                   <span>+91 90922 25481</span>
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
