import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, BookOpen, Sparkles, GraduationCap, FlaskConical, Baby, Heart, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';

/* ── Journal Data ── */
interface JournalItem {
  id: number;
  title: string;
  excerpt: string;
  publisher: string;
  category: string;
  tag: string;
  pdfUrl: string;
  pages?: string;
  icon: typeof FileText;
  accentColor: string;
}

const JOURNALS: JournalItem[] = [
  {
    id: 1,
    title: "World Health Report — Make Every Mother and Child Count",
    excerpt: "The WHO's landmark global report on maternal and child health, examining the systemic challenges and evidence-based interventions needed to reduce maternal mortality worldwide.",
    publisher: "World Health Organization (WHO)",
    category: "Global Health Policy",
    tag: "WHO Report",
    pdfUrl: "https://www.afro.who.int/sites/default/files/2017-07/whr2005_en.pdf",
    pages: "243 pages",
    icon: ShieldCheck,
    accentColor: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    title: "Maternal Health and Well-Being — A Comprehensive Study",
    excerpt: "A peer-reviewed research publication exploring holistic maternal health outcomes, postpartum depression risk factors, and community-level health intervention strategies.",
    publisher: "ResearchGate — Dr. Ojong Samuel et al.",
    category: "Original Research",
    tag: "Peer Reviewed",
    pdfUrl: "https://www.researchgate.net/profile/Ojong-Samuel/publication/374807822_Maternal_Health_and_Well-Being/links/68b4c2ef7984e374acecb187/Maternal-Health-and-Well-Being.pdf?_tp=eyJjb250ZXh0Ijp7ImZpcnN0UGFnZSI6InB1YmxpY2F0aW9uIiwicGFnZSI6InB1YmxpY2F0aW9uIn19",
    pages: "Research Paper",
    icon: FlaskConical,
    accentColor: "from-violet-500 to-purple-500"
  },
  {
    id: 3,
    title: "MCH Handbook & Its Influence on Health Behaviors — Literature Review",
    excerpt: "A systematic literature review analyzing the Maternal and Child Health handbook's impact on health-seeking behaviors, vaccination compliance, and prenatal check-up adherence.",
    publisher: "European Journal of Preventive Medicine",
    category: "Literature Review",
    tag: "Systematic Review",
    pdfUrl: "https://www.ejeph.com/download/the-maternal-and-child-health-mch-handbook-and-its-influence-on-health-behaviors-a-literature-review-11357.pdf",
    pages: "Review Article",
    icon: BookOpen,
    accentColor: "from-teal-500 to-emerald-500"
  },
  {
    id: 4,
    title: "Maternal Health in the Digital Age — UNFPA Factsheet",
    excerpt: "A factsheet by the United Nations Population Fund examining how digital health technologies and mobile platforms are transforming maternal healthcare access in developing nations.",
    publisher: "UNFPA — United Nations Population Fund",
    category: "Digital Health",
    tag: "UN Publication",
    pdfUrl: "https://www.unfpa.org/sites/default/files/resource-pdf/factsheet_digital_Apr15.pdf",
    pages: "Factsheet",
    icon: Sparkles,
    accentColor: "from-amber-500 to-orange-500"
  },
  {
    id: 5,
    title: "The Pregnancy Book — A Complete Clinical Guide",
    excerpt: "St George's NHS comprehensive pregnancy manual covering every trimester, labour preparation, antenatal care protocols, nutrition guidelines, and postnatal recovery pathways.",
    publisher: "St George's University Hospitals NHS",
    category: "Clinical Guide",
    tag: "NHS Publication",
    pdfUrl: "https://www.stgeorges.nhs.uk/wp-content/uploads/2013/11/Pregnancy_Book_comp.pdf",
    pages: "Full Guidebook",
    icon: Baby,
    accentColor: "from-rose-500 to-pink-500"
  },
  {
    id: 6,
    title: "CHO Booklet — Maternal Health (NHM India)",
    excerpt: "The National Health Mission's official Community Health Officer training booklet on maternal health protocols, high-risk pregnancy identification, and referral pathways across Indian primary healthcare.",
    publisher: "National Health Mission (NHM), India",
    category: "Government Guidelines",
    tag: "NHM India",
    pdfUrl: "https://nhm.gov.in/New_Update-2022-23/MH/GUIDELINES-%20MH/CHO_Booklet_%20Maternal_Health-English.pdf",
    pages: "Training Manual",
    icon: GraduationCap,
    accentColor: "from-indigo-500 to-blue-500"
  },
  {
    id: 7,
    title: "Pregnancy & Child Health — A Comprehensive Guide",
    excerpt: "An open-access journal article delivering a comprehensive overview of maternal nutrition, infant immunization schedules, developmental milestones, and evidence-based paediatric care recommendations.",
    publisher: "OMICS International",
    category: "Open Access Journal",
    tag: "Open Access",
    pdfUrl: "https://www.omicsonline.org/open-access/pregnancy-and-child-health-a-comprehensive-guide-to-maternal-and-infant-wellbeing.pdf",
    pages: "Journal Article",
    icon: Heart,
    accentColor: "from-emerald-500 to-teal-500"
  },
  {
    id: 8,
    title: "MNH Operational Guidelines — Maternal & Newborn Health",
    excerpt: "India's official MNH operational guidelines covering facility-based newborn care, skilled birth attendance standards, essential newborn care protocols, and JSSK entitlements for pregnant women.",
    publisher: "Govt. of India — Ministry of Health & Family Welfare",
    category: "Operational Guidelines",
    tag: "Govt. of India",
    pdfUrl: "https://nhmmp.gov.in/WebContent/MH/Guidelines/MNH%20Operational%20Guidelines%20-%20Final.pdf",
    pages: "Guidelines",
    icon: ShieldCheck,
    accentColor: "from-sky-500 to-blue-500"
  }
];

const CATEGORIES = ["All", ...Array.from(new Set(JOURNALS.map(j => j.category)))];

const STATS = [
  { label: "Publications", value: "8+", description: "Curated Journals" },
  { label: "Sources", value: "6+", description: "Global Publishers" },
  { label: "Topics", value: "8", description: "Clinical Domains" },
  { label: "Access", value: "Free", description: "Open to All" }
];

export default function MedicalJournals() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredJournals = activeCategory === "All"
    ? JOURNALS
    : JOURNALS.filter(j => j.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          HERO SECTION — Dark, editorial, cinematic
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-brand-dark overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/20 via-transparent to-transparent rounded-full blur-3xl" />
          <div className="absolute -bottom-[30%] -right-[15%] w-[50%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="h-8 w-8 rounded-xl bg-brand-primary/20 text-brand-primary flex items-center justify-center">
                <BookOpen size={16} />
              </span>
              <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em]">
                Academic & Research Library
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-white"
            >
              Medical <br />
              <span className="text-brand-primary italic">Journals & Research</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mb-10"
            >
              A curated collection of peer-reviewed publications, clinical guidelines, and evidence-based 
              research on maternal health, child welfare, and reproductive medicine — handpicked by our 
              clinical team for healthcare professionals and informed patients.
            </motion.p>

            {/* Quick stat pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-3"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 flex items-center gap-3"
                >
                  <span className="text-2xl font-display text-brand-primary">{stat.value}</span>
                  <div>
                    <span className="text-[9px] font-black text-white/50 uppercase tracking-wider block">{stat.label}</span>
                    <span className="text-[10px] font-bold text-white/70">{stat.description}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          FILTER BAR
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-xl border-b border-slate-100">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20'
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100 hover:text-brand-dark'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          JOURNAL CARDS — Premium Bento Grid
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 md:py-24 bg-slate-50/50">
        <div className="container-custom">
          {/* Results count */}
          <motion.p
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8"
          >
            Showing {filteredJournals.length} publication{filteredJournals.length !== 1 ? 's' : ''}
            {activeCategory !== "All" && <> in <span className="text-brand-primary">{activeCategory}</span></>}
          </motion.p>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredJournals.map((journal, idx) => {
                const Icon = journal.icon;
                return (
                  <motion.article
                    key={journal.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-transparent hover:-translate-y-1 transition-all duration-300"
                  >
                    {/* Gradient accent bar on top */}
                    <div className={`h-1.5 w-full bg-gradient-to-r ${journal.accentColor}`} />

                    <div className="p-7 md:p-8">
                      {/* Top row: Icon + Tag + Category */}
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <div className={`h-11 w-11 rounded-2xl bg-gradient-to-br ${journal.accentColor} text-white flex items-center justify-center shrink-0 shadow-lg shadow-brand-primary/10`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest block">
                              {journal.tag}
                            </span>
                            <span className="text-[10px] font-bold text-slate-400">
                              {journal.category}
                            </span>
                          </div>
                        </div>
                        {journal.pages && (
                          <span className="px-3 py-1 bg-slate-50 rounded-full text-[9px] font-black text-slate-500 uppercase tracking-wider shrink-0">
                            {journal.pages}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-display text-brand-dark mb-3 group-hover:text-brand-primary transition-colors leading-snug">
                        {journal.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-3">
                        {journal.excerpt}
                      </p>

                      {/* Publisher */}
                      <div className="flex items-center gap-2 mb-6">
                        <BookOpen size={13} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {journal.publisher}
                        </span>
                      </div>

                      {/* Actions row */}
                      <div className="flex items-center gap-3">
                        <a
                          href={journal.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 h-12 bg-brand-dark group-hover:bg-brand-primary text-white rounded-2xl flex items-center justify-center gap-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-sm"
                        >
                          <Download size={15} />
                          <span>Download PDF</span>
                        </a>
                        <a
                          href={journal.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-12 w-12 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-brand-primary hover:border-brand-primary/30 transition-all shrink-0"
                          title="Open in new tab"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty state */}
          {filteredJournals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <FileText size={48} className="mx-auto text-slate-200 mb-4" />
              <h3 className="text-xl font-display text-brand-dark mb-2">No publications found</h3>
              <p className="text-slate-400 text-sm">Try selecting a different category above.</p>
            </motion.div>
          )}
        </div>
      </section>


      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          DISCLAIMER / INFO SECTION
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 p-8 md:p-12"
          >
            <div className="grid md:grid-cols-3 gap-10">
              {/* About the Library */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={18} className="text-brand-primary" />
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.2em]">
                    About This Library
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-display text-brand-dark mb-4">
                  Evidence-Based Medicine,<br />
                  <span className="text-brand-primary italic">Accessible to Everyone</span>
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  This curated research library is maintained by the clinical team at Subam Hospital 
                  to bridge the gap between academic medicine and community awareness. Every publication 
                  listed here has been reviewed for clinical relevance and is freely accessible. We 
                  believe informed patients make better health decisions — and well-read practitioners 
                  deliver better care.
                </p>
                <div className="flex flex-wrap gap-3">
                  {["Maternal Health", "Neonatal Care", "Clinical Protocols", "Public Health Policy"].map((topic) => (
                    <span key={topic} className="px-4 py-2 bg-brand-primary/5 text-brand-primary text-xs font-bold rounded-xl">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="bg-brand-dark rounded-2xl p-6 text-white flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest block mb-3">
                    Have a paper to suggest?
                  </span>
                  <h3 className="text-xl font-display text-white mb-3">
                    Contribute to our library
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-6">
                    If you've authored or encountered a valuable clinical paper on women's health 
                    or paediatric medicine, we'd love to review it for inclusion.
                  </p>
                </div>
                <a
                  href="mailto:hospitalsubam@gmail.com?subject=Journal Recommendation for Medical Library"
                  className="h-11 w-full bg-brand-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors"
                >
                  <span>Submit Publication</span>
                  <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
