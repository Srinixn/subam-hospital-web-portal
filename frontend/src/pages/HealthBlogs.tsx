import { motion } from 'motion/react';
import { ExternalLink, ArrowRight, BookOpen, Sparkles, Heart, Globe, Star, TrendingUp } from 'lucide-react';

/* ── Blog Data ── */
interface BlogItem {
  id: number;
  title: string;
  excerpt: string;
  url: string;
  tag: string;
  image: string;
  source: string;
  rating?: string;
}

const RECOMMENDED_BLOGS: BlogItem[] = [
  {
    id: 1,
    title: "Pregnant Chicken",
    excerpt: "Practical pregnancy tips, registry checklists, and honest, friendly parenting advice from a trusted community of mothers.",
    url: "https://pregnantchicken.com",
    tag: "Pregnancy & Parenting",
    image: "https://images.unsplash.com/photo-1609220136736-443140cffec6?auto=format&fit=crop&q=80&w=800",
    source: "pregnantchicken.com",
    rating: "Popular"
  },
  {
    id: 2,
    title: "The Bump",
    excerpt: "Stage-by-stage pregnancy tracking, newborn guides, and reproductive fertility guidance with interactive tools and week-by-week updates.",
    url: "https://www.thebump.com",
    tag: "Pregnancy & Parenting",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800",
    source: "thebump.com",
    rating: "Editor's Pick"
  },
  {
    id: 3,
    title: "MotherToBaby Blog",
    excerpt: "Evidence-based clinical updates and expert guidance on medications, vaccines, and exposures during pregnancy and breastfeeding.",
    url: "https://mothertobaby.org/baby-blog/",
    tag: "Fertility & Clinical",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    source: "mothertobaby.org",
    rating: "Clinical"
  },
  {
    id: 4,
    title: "What to Expect",
    excerpt: "The world's most trusted pregnancy and parenting resource, featuring medical-expert-reviewed articles, trackers, and community forums.",
    url: "https://www.whattoexpect.com/pregnancy/",
    tag: "Pregnancy & Parenting",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?auto=format&fit=crop&q=80&w=800",
    source: "whattoexpect.com",
    rating: "Top Rated"
  },
  {
    id: 5,
    title: "BabyCentre UK",
    excerpt: "Research-backed guides, pregnancy week-by-week development tracks, and child health resources from the UK's leading parenting platform.",
    url: "https://www.babycentre.co.uk",
    tag: "Pregnancy & Parenting",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=800",
    source: "babycentre.co.uk"
  },
  {
    id: 6,
    title: "Motherhood India Blog",
    excerpt: "Expert insights covering maternal care, child safety tips, and gynecological wellness guides from India's leading hospital chain.",
    url: "https://www.motherhoodindia.com/blogs/",
    tag: "Hospital Insights",
    image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=800",
    source: "motherhoodindia.com"
  },
  {
    id: 7,
    title: "Cloudnine Hospitals Blog",
    excerpt: "A comprehensive medical blog covering pregnancy milestones, nutrition diets, gynecology, and child health from Cloudnine's specialists.",
    url: "https://www.cloudninecare.com/blog",
    tag: "Hospital Insights",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800",
    source: "cloudninecare.com"
  },
  {
    id: 8,
    title: "OVUM Hospitals Blog",
    excerpt: "Clinical blogs focused on maternal-fetal medicine, neonatal health, balanced maternal diets, and reproductive wellness.",
    url: "https://www.ovumhospitals.com/blog",
    tag: "Nutrition & Wellness",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800",
    source: "ovumhospitals.com"
  },
  {
    id: 9,
    title: "Motherhood Chaitanya Blog",
    excerpt: "Maternal guides, prenatal preparation checklists, and pediatrics wellness advice from seasoned practitioners and care teams.",
    url: "https://www.motherhoodchaitanya.com/posts/blog/",
    tag: "Hospital Insights",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    source: "motherhoodchaitanya.com"
  },
  {
    id: 10,
    title: "Tommy's",
    excerpt: "Trusted midwives' clinical advice, pregnancy health support programs, and support for complex maternity journeys and baby loss.",
    url: "https://www.tommys.org",
    tag: "Fertility & Clinical",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    source: "tommys.org",
    rating: "Trusted"
  }
];

const QUICK_STATS = [
  { icon: Globe, value: "10+", label: "Curated Resources" },
  { icon: Star, value: "6+", label: "Categories" },
  { icon: TrendingUp, value: "Expert", label: "Vetted Quality" }
];

export default function HealthBlogs() {
  return (
    <div className="min-h-screen bg-white">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION — Clean, professional
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-white overflow-hidden">
        {/* Ambient accents */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[15%] -left-[10%] w-[45%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-50 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute top-[10%] -right-[10%] w-[40%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-50 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-8 w-8 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                <Sparkles size={16} />
              </span>
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">
                Curated Web Resources
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-[0.95] tracking-tight font-display text-brand-dark"
            >
              Women & <br /><span className="text-brand-primary italic">Pregnancy Care Blogs</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-500 font-medium leading-relaxed max-w-2xl mb-10"
            >
              A hand-picked directory of the most trusted pregnancy, parenting, and women's
              wellness resources on the web — reviewed and recommended by our clinical team.
            </motion.p>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              {QUICK_STATS.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3">
                    <Icon size={18} className="text-brand-primary" />
                    <div>
                      <span className="text-lg font-display text-brand-dark">{stat.value}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-2">{stat.label}</span>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="container-custom">
        <div className="h-px bg-slate-100" />
      </div>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FEATURED BLOGS (First 2 — large cards)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
              Featured Resources
            </span>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {RECOMMENDED_BLOGS.slice(0, 2).map((blog, idx) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-transparent transition-all duration-300"
              >
                {/* Image */}
                <div className="aspect-[16/9] overflow-hidden relative bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-[1]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-[2]" />

                  {/* Floating badges */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black text-brand-primary uppercase tracking-wider shadow-sm">
                    {blog.tag}
                  </span>
                  {blog.rating && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-brand-primary text-white rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm flex items-center gap-1">
                      <Star size={10} className="fill-white" /> {blog.rating}
                    </span>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-all duration-500 flex items-center justify-center">
                    <span className="h-12 w-12 bg-white text-brand-primary rounded-full flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 shadow-xl transition-all duration-300">
                      <ExternalLink size={20} />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                    {blog.source}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display text-brand-dark mb-3 group-hover:text-brand-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {blog.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary group-hover:gap-4 transition-all">
                    Visit Blog <ArrowRight size={14} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          REMAINING BLOGS (8 cards — compact grid)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-slate-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              All Recommended Blogs
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {RECOMMENDED_BLOGS.slice(2).map((blog, idx) => (
              <motion.a
                key={blog.id}
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.05 }}
                transition={{ delay: idx * 0.04, duration: 0.35 }}
                className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Compact image */}
                <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 relative z-10"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-0.5 bg-white/95 backdrop-blur-md rounded-full text-[8px] font-black text-brand-primary uppercase tracking-wider shadow-sm z-20">
                    {blog.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex flex-col flex-grow">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">
                    {blog.source}
                  </span>
                  <h3 className="text-lg font-display text-brand-dark mb-2 group-hover:text-brand-primary transition-colors leading-snug">
                    {blog.title}
                  </h3>
                  <p className="text-slate-500 text-xs leading-relaxed mb-4 line-clamp-2 flex-grow">
                    {blog.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-brand-primary group-hover:gap-3 transition-all mt-auto">
                    Visit <ArrowRight size={12} />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM CTA — Suggest a Blog
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-primary rounded-3xl md:rounded-[3rem] p-8 md:p-14 text-white relative overflow-hidden"
          >
            {/* Background decorations */}
            <div className="absolute right-0 bottom-0 translate-x-[20%] translate-y-[20%] w-[400px] aspect-square rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute right-0 bottom-0 translate-x-[35%] translate-y-[35%] w-[300px] aspect-square rounded-full border border-white/10 pointer-events-none" />
            <div className="absolute left-0 top-0 -translate-x-[30%] -translate-y-[30%] w-[250px] aspect-square bg-white/5 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="max-w-xl">
                <span className="text-[10px] font-black text-white/60 uppercase tracking-[0.2em] mb-3 block">
                  Community Contribution
                </span>
                <h2 className="text-3xl md:text-4xl text-white mb-4 font-display">
                  Know a trusted wellness <span className="italic">resource?</span>
                </h2>
                <p className="text-teal-100/80 text-sm leading-relaxed">
                  If you follow a premium health resource or evidence-based parenting blog that would benefit
                  other mothers and families, please let us know so our clinical team can review and add it
                  to this curated directory.
                </p>
              </div>

              <a
                href="mailto:hello@example.com?subject=Suggested Wellness Blog Resource"
                className="h-14 px-10 bg-white text-brand-primary rounded-2xl font-bold flex items-center gap-3 hover:scale-105 transition-transform whitespace-nowrap shrink-0 shadow-xl shadow-brand-dark/10 text-sm"
              >
                <Heart size={18} className="fill-brand-primary" />
                <span>Suggest a Blog</span>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
