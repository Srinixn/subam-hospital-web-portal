import { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, ShieldCheck, Headphones } from 'lucide-react';
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
      details: ["+91 431 234 5678", "+91 98765 43210"],
      color: "bg-teal-50 text-brand-primary"
    },
    {
      icon: Mail,
      title: "Email Support",
      details: ["care@subamhospital.com", "info@subamhospital.com"],
      color: "bg-orange-50 text-brand-secondary"
    },
    {
      icon: MapPin,
      title: "Our Location",
      details: ["Magudanchavadi - Elampillai Rd", "Elampillai, Salem - 637502"],
      color: "bg-purple-50 text-brand-accent"
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
                    {info.details.map((detail, j) => (
                      <p key={j} className="text-slate-500 font-medium mb-1">{detail}</p>
                    ))}
                 </div>
               ))}
            </div>

            <div className="grid lg:grid-cols-5 gap-16 items-start">
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
                                    <option>Feedback/Suggestions</option>
                                    <option>Career Opportunities</option>
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
                              className="btn-primary w-full h-16 text-lg flex items-center justify-center gap-3 disabled:opacity-75"
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
               <a href="tel:+914271234567" className="inline-flex items-center gap-6 text-4xl md:text-6xl font-black hover:scale-105 transition-transform">
                  <Phone size={60} />
                   <span>+91 427 123 4567</span>
               </a>
            </div>
         </div>
      </section>
    </div>
  );
}
