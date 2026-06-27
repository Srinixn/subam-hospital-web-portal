import { motion } from 'motion/react';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STORIES = [
  {
    name: "Buvaneswari M.",
    location: "Elampillai, Salem",
    specialty: "Maternity",
    content: "Subam Hospital is the best for women's care in Salem. Dr. Anitha is very kind and the way she explains things makes us feel very comfortable. The nursing care is also top-notch.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Buvaneswari"
  },
  {
    name: "Suresh Kumar",
    location: "Salem",
    specialty: "Pediatrics",
    content: "We chose Subam for our baby's delivery and pediatric care. The Level III NICU facilities and the expert care provided by the doctors here are outstanding. Highly recommended.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh"
  },
  {
    name: "Meenakshi S.",
    location: "Sankari",
    specialty: "NICU",
    content: "My pre-term baby spent 3 weeks in the Level III NICU. The technology mixed with maternal empathy made all the difference. Today, he is a healthy toddler.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Meenakshi"
  }
];

export default function SuccessStories() {
  return (
    <div className="pt-32 pb-24 bg-[#FDFDFF]">
      <div className="container-custom">
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Testimonials</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
            Real Stories of <span className="text-brand-primary italic">Healing.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed">
            The greatest measure of our success is the smiles on our patients' faces and the quality of life we help them reclaim.
          </p>
        </div>

        <div className="space-y-12">
          {STORIES.map((story, i) => (
            <motion.div
              key={story.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 p-6 md:p-16 bg-white rounded-3xl lg:rounded-[3rem] border border-slate-100 shadow-premium ${i % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl md:rounded-[2.5rem] overflow-hidden shrink-0 border-4 border-slate-50 shadow-lg group">
                <img src={story.image} alt={story.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="text-brand-primary mb-6">
                  <Quote size={48} className="opacity-20" />
                </div>
                <div className="flex justify-center md:justify-start gap-1 text-yellow-500 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-2xl md:text-3xl text-brand-dark font-display italic mb-8 leading-tight">
                  "{story.content}"
                </p>
                <div>
                  <h4 className="text-xl font-bold text-brand-dark">{story.name}</h4>
                  <p className="text-sm font-black text-brand-primary uppercase tracking-widest mt-1">
                    {story.specialty} Patient • {story.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 bg-brand-dark rounded-3xl lg:rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent opacity-50" />
          <h2 className="text-3xl md:text-5xl font-display mb-8 relative z-10">Want to share your experience?</h2>
          <p className="text-slate-300 text-base md:text-lg mb-12 max-w-xl mx-auto relative z-10">We value every patient's voice. Your feedback helps us maintain our standard of excellence.</p>
          <Link to="/contact" className="btn-primary inline-flex relative z-10 h-16 px-12 text-base md:text-lg justify-center items-center">
            <span>Contact Support Team</span>
            <ArrowRight size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
}
