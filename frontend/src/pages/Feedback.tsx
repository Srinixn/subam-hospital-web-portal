import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ArrowRight, ShieldCheck, Heart, MessageSquare } from 'lucide-react';
import { api } from '../services/api';

export default function Feedback() {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    rating: 5,
    comments: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const validate = () => {
    const tempErrors: Record<string, string> = {};
    if (!formData.patientName.trim()) {
      tempErrors.patientName = 'Patient Name is required';
    } else if (formData.patientName.length < 2 || formData.patientName.length > 100) {
      tempErrors.patientName = 'Patient Name must be between 2 and 100 characters';
    }

    if (formData.phone.trim() && !/^\+?[0-9\s\-]{7,20}$/.test(formData.phone.trim())) {
      tempErrors.phone = 'Please enter a valid phone number (7-20 digits)';
    }

    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (formData.rating < 1 || formData.rating > 5) {
      tempErrors.rating = 'Please select a rating between 1 and 5';
    }

    if (!formData.comments.trim()) {
      tempErrors.comments = 'Comments are required';
    } else if (formData.comments.length < 10 || formData.comments.length > 2000) {
      tempErrors.comments = 'Comments must be between 10 and 2000 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');
    if (!validate()) return;

    setIsSubmitting(true);
    const response = await api.submitFeedback({
      patientName: formData.patientName,
      phone: formData.phone.trim() || undefined,
      email: formData.email.trim() || undefined,
      rating: formData.rating,
      comments: formData.comments
    });
    setIsSubmitting(false);

    if (response.success) {
      setIsSubmitted(true);
      setFormData({
        patientName: '',
        phone: '',
        email: '',
        rating: 5,
        comments: ''
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

  return (
    <div className="pt-24 min-h-screen">
      {/* Header */}
      <section className="bg-slate-50 py-32 relative overflow-hidden border-b border-slate-100">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-teal-500/5 via-transparent to-transparent" />
        <div className="container-custom relative z-10">
           <div className="max-w-3xl">
              <span className="text-brand-primary font-bold tracking-[0.3em] uppercase text-xs mb-6 block">Share Your Experience</span>
              <h1 className="text-5xl md:text-8xl mb-8 font-display">Patient <br /> <span className="text-brand-primary">Feedback</span></h1>
              <p className="text-xl text-slate-500 leading-relaxed max-w-xl">
                 Your experience matters to us. Please share your suggestions, feedback, and stories to help us serve our community better.
              </p>
           </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-white">
         <div className="container-custom">
            <div className="grid lg:grid-cols-5 gap-16 items-start">
               {/* Left Column: Context info */}
               <div className="lg:col-span-2 space-y-10">
                  <div className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50">
                     <div className="h-14 w-14 bg-teal-50 text-brand-primary rounded-2xl flex items-center justify-center mb-6">
                        <Heart size={28} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-brand-dark">We Care About You</h3>
                     <p className="text-slate-500 text-sm leading-relaxed">
                        At Subam Hospital, patient satisfaction is our topmost priority. Your honest feedback helps our medical and admin staff refine procedures and maintain standard of care excellence.
                     </p>
                  </div>

                  <div className="p-10 rounded-[3rem] border border-slate-100 bg-slate-50">
                     <div className="h-14 w-14 bg-orange-50 text-brand-secondary rounded-2xl flex items-center justify-center mb-6">
                        <MessageSquare size={28} />
                     </div>
                     <h3 className="text-2xl font-bold mb-4 text-brand-dark">Anonymous Options</h3>
                     <p className="text-slate-500 text-sm leading-relaxed font-medium">
                        Phone and email fields are completely optional. Feel free to leave them blank if you prefer to submit anonymous feedback.
                     </p>
                  </div>
               </div>

               {/* Right Column: Form container */}
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
                           Your feedback has been received and reviewed. We appreciate you taking the time to share your experience with us.
                        </p>
                        <button 
                           onClick={() => setIsSubmitted(false)}
                           className="btn-primary px-8 h-14 text-xs font-bold uppercase tracking-widest"
                        >
                           Submit New Feedback
                        </button>
                     </motion.div>
                  ) : (
                     <>
                        <h3 className="text-3xl mb-10 font-display">Submit Feedback</h3>
                        {submitError && (
                           <div className="mb-8 p-6 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-medium">
                              {submitError}
                           </div>
                        )}
                        <form onSubmit={handleSubmit} className="space-y-8">
                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Patient / Caregiver Name</label>
                              <input 
                                 value={formData.patientName}
                                 onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                 className={`w-full h-16 bg-white border ${errors.patientName ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-2xl px-6 focus:outline-none focus:ring-2`} 
                                 placeholder="Jane Smith" 
                              />
                              {errors.patientName && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.patientName}</p>}
                           </div>

                           <div className="grid md:grid-cols-2 gap-8">
                              <div className="space-y-2">
                                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Phone (Optional)</label>
                                 <input 
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className={`w-full h-16 bg-white border ${errors.phone ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-2xl px-6 focus:outline-none focus:ring-2`} 
                                    placeholder="+91 00000 00000" 
                                 />
                                 {errors.phone && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.phone}</p>}
                              </div>
                              <div className="space-y-2">
                                 <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Email (Optional)</label>
                                 <input 
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={`w-full h-16 bg-white border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-2xl px-6 focus:outline-none focus:ring-2`} 
                                    placeholder="jane@example.com" 
                                 />
                                 {errors.email && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.email}</p>}
                              </div>
                           </div>

                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Overall Rating</label>
                              <div className="flex gap-3 items-center py-2 pl-2">
                                 {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                       key={star}
                                       type="button"
                                       onClick={() => setFormData({ ...formData, rating: star })}
                                       onMouseEnter={() => setHoveredRating(star)}
                                       onMouseLeave={() => setHoveredRating(0)}
                                       className="transition-transform duration-150 hover:scale-125 focus:outline-none cursor-pointer"
                                    >
                                       <Star
                                          size={36}
                                          className={`transition-colors duration-150 ${
                                             star <= (hoveredRating || formData.rating)
                                                ? 'fill-amber-400 text-amber-400'
                                                : 'text-slate-300'
                                          }`}
                                       />
                                    </button>
                                 ))}
                                 <span className="text-sm font-bold text-slate-500 ml-4">
                                    {formData.rating === 5 && 'Excellent'}
                                    {formData.rating === 4 && 'Very Good'}
                                    {formData.rating === 3 && 'Good'}
                                    {formData.rating === 2 && 'Fair'}
                                    {formData.rating === 1 && 'Poor'}
                                 </span>
                              </div>
                              {errors.rating && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.rating}</p>}
                           </div>

                           <div className="space-y-2">
                              <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-2">Comments & Suggestions</label>
                              <textarea 
                                 value={formData.comments}
                                 onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                                 className={`w-full h-40 bg-white border ${errors.comments ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-brand-primary/20'} rounded-3xl p-6 focus:outline-none focus:ring-2 resize-none`} 
                                 placeholder="Share your thoughts about your visit..." 
                              />
                              {errors.comments && <p className="text-red-500 text-xs mt-1 pl-2 font-medium">{errors.comments}</p>}
                           </div>

                           <button 
                              disabled={isSubmitting}
                              className="btn-primary w-full h-16 text-lg flex items-center justify-center gap-3 disabled:opacity-75"
                           >
                              {isSubmitting ? 'Submitting...' : 'Submit Feedback'} <ArrowRight size={20} />
                           </button>
                        </form>
                     </>
                  )}
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}
