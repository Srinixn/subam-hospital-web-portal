import { motion } from 'motion/react';
import { Calendar, User, ArrowRight, Clock, Stethoscope, Baby, HeartPulse, Sparkles, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

/* ── Article Data ── */
export interface ArticleItem {
  id: number;
  category: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorRole: string;
  date: string;
  readTime: string;
  image: string;
  icon: typeof Stethoscope;
  accentColor: string;
}

export const ARTICLES: ArticleItem[] = [
  {
    id: 1,
    category: "Maternal Care",
    title: "Understanding High-Risk Pregnancy: Tips for Expecting Mothers",
    excerpt: "Comprehensive guidance on managing complex pregnancies with modern medical interventions and lifestyle choices that protect both mother and child.",
    content: "High-risk pregnancies require specialized monitoring and personalized care plans. At Subam Hospital, our maternal-fetal medicine team employs advanced screening protocols, regular ultrasound monitoring, and evidence-based interventions to ensure the best possible outcomes for both mother and baby. From gestational diabetes management to preeclampsia prevention, our comprehensive approach covers every aspect of complex pregnancy care.",
    author: "Dr. Selvi Raju",
    authorRole: "Consultant Gynaecologist",
    date: "May 12, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1531983412531-1f49a365ffed?auto=format&fit=crop&q=80&w=800",
    icon: HeartPulse,
    accentColor: "from-rose-500 to-pink-500"
  },
  {
    id: 2,
    category: "Surgical Innovation",
    title: "Advancements in Minimal Access Surgery at Subam Hospital",
    excerpt: "A deep dive into how laparoscopic techniques are reducing recovery times and improving surgical precision for our patients across multiple specialities.",
    content: "Minimal access surgery has transformed patient outcomes at our facility. Our surgeons perform complex gynaecological, general surgical, and fertility procedures through keyhole incisions — resulting in less post-operative pain, shorter hospital stays, and faster return to daily life. With state-of-the-art HD laparoscopic towers and trained surgical teams, we bring world-class surgical care to Salem.",
    author: "Dr. K. Raju",
    authorRole: "Consultant General Surgeon",
    date: "May 08, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    icon: Stethoscope,
    accentColor: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    category: "Neonatal Care",
    title: "Newborn Care 101: What Every New Parent Should Know",
    excerpt: "Essential tips from our neonatal experts on navigating the first few weeks of your baby's life with confidence and clinical awareness.",
    content: "The first 28 days of a newborn's life are the most critical. Our neonatal team provides comprehensive guidance on feeding schedules, sleep safety, jaundice awareness, vaccination timelines, and recognizing early warning signs. With our Level III NICU capabilities, we ensure that even the most vulnerable newborns receive the highest standard of care from their very first breath.",
    author: "Dr. S. Poovizhi",
    authorRole: "Consultant Paediatrician",
    date: "April 28, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    icon: Baby,
    accentColor: "from-violet-500 to-purple-500"
  },
  {
    id: 4,
    category: "Fertility",
    title: "IVF Success Rates: What You Should Know Before Starting Treatment",
    excerpt: "An honest look at fertility treatment success factors, preparation tips, and how our Sunsrishti Fertility Centre supports couples on their journey to parenthood.",
    content: "In vitro fertilization success depends on multiple factors including age, underlying conditions, and treatment protocols. Our fertility specialists use advanced embryo culture systems, genetic screening, and personalized hormonal protocols to maximize success rates. This article demystifies the IVF journey — from initial consultation through embryo transfer — so couples can make informed decisions with confidence.",
    author: "Dr. A. Priyadharshini",
    authorRole: "Fertility Specialist",
    date: "April 15, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800",
    icon: Sparkles,
    accentColor: "from-amber-500 to-orange-500"
  },
  {
    id: 5,
    category: "Women's Health",
    title: "PCOS Management: A Holistic Approach to Women's Wellness",
    excerpt: "Understanding Polycystic Ovary Syndrome through the lens of modern gynaecology — combining medical treatment with lifestyle interventions for lasting results.",
    content: "PCOS affects nearly 1 in 10 women of reproductive age. Our gynaecology team takes a holistic approach to management, combining hormonal therapy, nutritional counselling, exercise guidance, and regular monitoring. Early diagnosis and consistent management can significantly improve fertility outcomes, metabolic health, and overall quality of life for women living with PCOS.",
    author: "Dr. Selvi Raju",
    authorRole: "Consultant Gynaecologist",
    date: "March 22, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    icon: HeartPulse,
    accentColor: "from-teal-500 to-emerald-500"
  },
  {
    id: 6,
    category: "Patient Education",
    title: "Preparing for Your First Hospital Delivery: A Complete Guide",
    excerpt: "Everything expecting mothers need to know about hospital birth preparation — from bag packing essentials to what happens in the labour ward.",
    content: "Walking into a hospital for your first delivery can feel overwhelming. This comprehensive guide covers everything: when to head to the hospital, what to pack in your delivery bag, understanding labour stages, pain management options including epidural analgesia, the role of your birth companion, and immediate postpartum care. Our maternity team ensures every mother feels informed, supported, and empowered throughout her birthing experience.",
    author: "Nursing Team",
    authorRole: "Maternity Ward",
    date: "March 05, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    icon: BookOpen,
    accentColor: "from-indigo-500 to-blue-500"
  }
];

export default function Articles() {
  const featuredArticle = ARTICLES[0];
  const remainingArticles = ARTICLES.slice(1);

  return (
    <div className="min-h-screen bg-white">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO — Featured Article (Magazine Style)
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-28 pb-0 bg-brand-dark overflow-hidden">
        {/* Ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/15 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="h-8 w-8 rounded-xl bg-brand-primary/20 text-brand-primary flex items-center justify-center">
              <BookOpen size={16} />
            </span>
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">
              Knowledge Hub
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl mb-6 leading-[0.95] tracking-tight font-display text-white"
          >
            Medical <br />
            <span className="text-brand-primary italic">Insights & Articles</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mb-14"
          >
            Clinical wisdom, patient education, and healthcare innovations — authored by 
            our specialist doctors and care teams for the communities we serve.
          </motion.p>
        </div>

        {/* Featured article card — overlaps into white section */}
        <div className="container-custom relative z-10">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="group bg-white rounded-t-3xl md:rounded-t-[2.5rem] overflow-hidden border border-slate-100 border-b-0 grid md:grid-cols-2"
          >
            {/* Image half */}
            <div className="relative h-72 md:h-auto overflow-hidden">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <span className="absolute top-6 left-6 px-4 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black text-brand-primary uppercase tracking-widest shadow-sm">
                Featured
              </span>
            </div>

            {/* Content half */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className={`h-8 w-8 rounded-lg bg-gradient-to-br ${featuredArticle.accentColor} text-white flex items-center justify-center`}>
                  <featuredArticle.icon size={16} />
                </span>
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
                  {featuredArticle.category}
                </span>
              </div>

              <h2 className="text-2xl md:text-3xl font-display text-brand-dark mb-4 leading-snug group-hover:text-brand-primary transition-colors">
                {featuredArticle.title}
              </h2>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3">
                {featuredArticle.content}
              </p>

              <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">
                <span className="flex items-center gap-1.5"><User size={12} /> {featuredArticle.author}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {featuredArticle.date}</span>
                <span className="h-1 w-1 bg-slate-200 rounded-full" />
                <span className="flex items-center gap-1.5"><Clock size={12} /> {featuredArticle.readTime}</span>
              </div>

              <Link
                to={`/articles/${featuredArticle.id}`}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all w-fit"
              >
                Read Full Article <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          ARTICLES GRID
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              More From Our Specialists
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingArticles.map((article, idx) => {
              const Icon = article.icon;
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black text-brand-primary uppercase tracking-wider shadow-sm">
                      {article.category}
                    </span>
                    <span className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[9px] font-bold text-white/90 uppercase tracking-wider">
                      {article.readTime}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-7 flex flex-col flex-grow">
                    {/* Author & date row */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${article.accentColor} text-white flex items-center justify-center shrink-0`}>
                        <Icon size={14} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-brand-dark block leading-tight">{article.author}</span>
                        <span className="text-[9px] font-bold text-slate-400">{article.authorRole} • {article.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-display text-brand-dark mb-3 group-hover:text-brand-primary transition-colors leading-snug">
                      {article.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                      {article.excerpt}
                    </p>

                    {/* Read link */}
                    <Link
                      to={`/articles/${article.id}`}
                      className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all w-fit mt-auto"
                    >
                      Read Article <ArrowRight size={14} />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          BOTTOM CTA — Stay Informed
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-brand-dark rounded-3xl md:rounded-[3rem] p-8 md:p-14 relative overflow-hidden"
          >
            {/* Background accents */}
            <div className="absolute right-0 top-0 translate-x-[30%] -translate-y-[30%] w-[400px] aspect-square rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute left-0 bottom-0 -translate-x-[20%] translate-y-[40%] w-[300px] aspect-square bg-brand-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-4 block">
                  Patient Education
                </span>
                <h2 className="text-3xl md:text-4xl text-white mb-4 font-display">
                  Knowledge is the <br />
                  <span className="text-brand-primary italic">best medicine</span>
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Our doctors and nursing teams regularly publish clinical insights and patient 
                  education articles to help you make informed healthcare decisions. Stay connected 
                  with the latest from Subam Hospital.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 md:justify-end">
                <Link
                  to="/blogs"
                  className="h-13 px-8 bg-brand-primary text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-teal-600 transition-colors text-sm"
                >
                  <BookOpen size={16} />
                  Health Blogs
                </Link>
                <Link
                  to="/journals"
                  className="h-13 px-8 bg-white/10 border border-white/10 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/20 transition-colors text-sm"
                >
                  <Stethoscope size={16} />
                  Medical Journals
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
