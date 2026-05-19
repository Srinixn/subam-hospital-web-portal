import { motion } from 'motion/react';
import { BookOpen, Calendar, User, ArrowRight, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    category: "Health Blog",
    title: "Understanding High-Risk Pregnancy: Tips for Expecting Mothers",
    excerpt: "Comprehensive guidance on managing complex pregnancies with modern medical interventions and lifestyle choices.",
    author: "Dr. Anitha",
    date: "May 12, 2024",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800"
  },
  {
    category: "Medical Journal",
    title: "Advancements in Minimal Access Surgery at Subam Hospital",
    excerpt: "A deep dive into how laparoscopic techniques are reducing recovery times and improving surgical precision for our patients.",
    author: "Dr. Subramanian",
    date: "May 08, 2024",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  {
    category: "Patient Education",
    title: "Newborn Care 101: What Every New Parent Should Know",
    excerpt: "Essential tips from our neonatal experts on navigating the first few weeks of your baby's life with confidence.",
    author: "Nurse Manager Lydia",
    date: "April 28, 2024",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Articles() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Knowledge Hub</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
              Medical <span className="text-brand-primary italic">Insights.</span>
            </h1>
            <p className="text-lg text-slate-500 font-medium">Staying ahead in healthcare through continuous learning, research, and community education.</p>
          </div>
          
          <div className="relative group max-w-sm w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-primary transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search articles, tips..."
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-14 pr-6 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-all text-sm"
            />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {ARTICLES.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 hover:shadow-premium transition-all duration-500"
            >
              <div className="h-64 overflow-hidden relative">
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary">
                    {article.category}
                  </span>
                </div>
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                  <span className="h-1 w-1 bg-slate-200 rounded-full" />
                  <span className="flex items-center gap-1.5"><User size={12} /> {article.author}</span>
                </div>
                <h3 className="text-2xl font-display text-brand-dark mb-4 leading-snug group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
                  {article.excerpt}
                </p>
                <Link to="#" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                  Read Full Article <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <Link to="#" className="px-10 h-14 bg-slate-50 border border-slate-100 text-brand-dark font-bold rounded-2xl flex items-center hover:bg-slate-100 transition-all text-sm gap-3">
            <BookOpen size={18} />
            View Patient Education Library
          </Link>
        </div>
      </div>
    </div>
  );
}
