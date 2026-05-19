import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Share2, Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOGS = [
  {
    id: 1,
    title: "10 Nutrition Tips for Healthy Pregnancy",
    excerpt: "Eating well is one of the most important things you can do during pregnancy. Here are 10 essential tips for a nutrient-rich diet.",
    author: "Dietician Swetha",
    date: "May 15, 2024",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Managing Stress in New Mothers",
    excerpt: "The transition to motherhood is beautiful but can be stressful. Learn techniques to manage postpartum anxiety effectively.",
    author: "Psychologist Raghu",
    date: "May 10, 2024",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800"
  }
];

export default function HealthBlogs() {
  return (
    <div className="pt-32 pb-24 bg-white">
      <div className="container-custom">
        <div className="max-w-3xl mb-20">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Patient Wellness</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
            Health <br /><span className="text-brand-primary italic">Blogs.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Everyday wellness advice, nutritional guides, and mental health tips from our medical team to help you live your healthiest life.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {BLOGS.map((blog, i) => (
            <motion.article 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="aspect-[16/9] rounded-[2.5rem] overflow-hidden mb-8 border border-slate-100">
                <img 
                  src={blog.image} 
                  alt={blog.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {blog.date}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><User size={12} /> {blog.author}</span>
              </div>
              <h3 className="text-3xl font-display text-brand-dark mb-4 group-hover:text-brand-primary transition-colors leading-tight">
                {blog.title}
              </h3>
              <p className="text-slate-500 mb-8 leading-relaxed">
                {blog.excerpt}
              </p>
              <div className="flex items-center justify-between border-t border-slate-50 pt-6">
                <Link to="#" className="font-black text-[10px] uppercase tracking-widest text-brand-primary flex items-center gap-2">
                  Read Article <ArrowRight size={14} />
                </Link>
                <div className="flex gap-4 text-slate-300">
                   <Share2 size={16} className="hover:text-brand-primary cursor-pointer transition-colors" />
                   <Bookmark size={16} className="hover:text-brand-primary cursor-pointer transition-colors" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
