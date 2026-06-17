import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight, ShieldCheck, Headphones } from 'lucide-react';

export default function Contact() {
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
                  <h3 className="text-3xl mb-10 font-display">Send a Message</h3>
                  <form className="space-y-8">
                     <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Full Name</label>
                           <input className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Phone Number</label>
                           <input className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="+91 00000 00000" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Email Address</label>
                        <input className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20" placeholder="john@example.com" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Your Inquiry</label>
                        <select className="w-full h-16 bg-white border border-slate-200 rounded-2xl px-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 appearance-none">
                           <option>General Inquiry</option>
                           <option>Feedback/Suggestions</option>
                           <option>Career Opportunities</option>
                        </select>
                     </div>
                     <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Detailed Message</label>
                        <textarea className="w-full h-40 bg-white border border-slate-200 rounded-3xl p-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 resize-none" placeholder="Describe your requirement in detail..." />
                     </div>
                     <button className="btn-primary w-full h-16 text-lg flex items-center justify-center gap-3">
                        Submit Inquiry <ArrowRight size={20} />
                     </button>
                  </form>
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
