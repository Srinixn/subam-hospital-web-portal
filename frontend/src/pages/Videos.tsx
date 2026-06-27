import { motion } from 'motion/react';
import { Play, Grid, ArrowLeft, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const VIDEOS = [
  {
    id: 1,
    title: "Understanding Laparoscopic Surgery",
    desc: "A detailed guide on how minimally invasive surgery works at Subam Hospital.",
    thumbnail: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200",
    duration: "4:20",
    category: "Explainers"
  },
  {
    id: 2,
    title: "Tour of our Maternity Suite",
    desc: "Walk through our premium maternity units designed for your comfort.",
    thumbnail: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200",
    duration: "2:45",
    category: "Hospital Tour"
  },
  {
    id: 3,
    title: "Post-Natal Care Basic Tips",
    desc: "Our senior nurse managers share essential tips for new mothers.",
    thumbnail: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=1200",
    duration: "5:15",
    category: "Education"
  }
];

export default function Videos() {
  return (
    <div className="pt-32 pb-24 bg-brand-dark min-h-screen text-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Visual Library</span>
            <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display">
              Video <span className="text-brand-primary italic">Guides.</span>
            </h1>
            <p className="text-lg text-slate-400 font-medium leading-relaxed">
              Watch expert explainers, virtual tours, and health awareness sessions from our specialist doctors.
            </p>
          </div>
          <Link to="/gallery" className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors">
            <Grid size={18} /> View Image Gallery
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VIDEOS.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video rounded-3xl lg:rounded-[2.5rem] overflow-hidden mb-6">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/20 transition-all flex items-center justify-center">
                  <div className="h-16 w-16 bg-white text-brand-primary rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                    <Play fill="currentColor" size={24} />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-brand-dark/80 backdrop-blur-md rounded-lg text-[10px] font-black">
                   {video.duration}
                </div>
              </div>
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2 block">{video.category}</span>
              <h3 className="text-2xl font-display mb-3 group-hover:text-brand-primary transition-colors">{video.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{video.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
