import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Play, Image as ImageIcon, X } from 'lucide-react';

const CATEGORIES = ["All", "Medical Units", "Diagnostics", "Maternity", "Events"];

const GALLERY_ITEMS = [
  { id: 1, type: "image", category: "Medical Units", url: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200", title: "Modern Operation Theater" },
  { id: 2, type: "image", category: "Diagnostics", url: "https://images.unsplash.com/photo-1579152276517-7507c992796e?auto=format&fit=crop&q=80&w=1200", title: "Advanced MRI Scanners" },
  { id: 3, type: "image", category: "Maternity", url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1200", title: "Maternity Suite" },
  { id: 4, type: "image", category: "Medical Units", url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1200", title: "Nursing Station" },
  { id: 5, type: "video", category: "Events", url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200", title: "Anniversary Celebration" },
  { id: 6, type: "image", category: "Diagnostics", url: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=1200", title: "Molecular Lab" },
];

export default function Gallery() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  const filteredItems = filter === "All" 
    ? GALLERY_ITEMS 
    : GALLERY_ITEMS.filter(item => item.category === filter);

  return (
    <div className="pt-16 sm:pt-32 pb-16 sm:pb-24 bg-white">
      <div className="container-custom">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Visual Experience</span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl mb-6 sm:mb-8 leading-[1.1] sm:leading-[0.95] tracking-tight font-display text-brand-dark">
              Hospital <span className="text-brand-primary italic">Gallery.</span>
            </h1>
            <p className="text-sm sm:text-lg text-slate-500 font-medium">A glimpse into our advanced infrastructure and moments of compassionate care.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-full pb-2 shrink-0">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-6 py-2 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                  filter === cat ? 'bg-brand-primary text-white shadow-md shadow-teal-500/20' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setSelected(item)}
                className="group relative rounded-2xl sm:rounded-[2rem] overflow-hidden aspect-[4/3] cursor-pointer shadow-sm border border-slate-100"
              >
                <img 
                  src={item.url} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 text-white p-6">
                  {item.type === 'video' ? <Play size={48} /> : <ImageIcon size={48} />}
                  <p className="text-xl font-display text-center">{item.title}</p>
                  <span className="text-[10px] uppercase tracking-[0.2em] font-black opacity-60">{item.category}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selected && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-brand-dark/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6"
            >
              <button 
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/60 hover:text-white transition-colors cursor-pointer"
                aria-label="Close lightbox"
              >
                <X size={32} />
              </button>
              
              <motion.div 
                layoutId={`item-${selected.id}`}
                className="max-w-4xl w-full rounded-xl sm:rounded-[3rem] overflow-hidden bg-white shadow-2xl relative"
              >
                <img 
                  src={selected.url} 
                  alt={selected.title}
                  className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain bg-slate-900"
                />
                <div className="p-5 sm:p-10 bg-white">
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-2 block">{selected.category}</span>
                  <h3 className="text-xl sm:text-3xl font-display text-brand-dark">{selected.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
