import { motion } from 'motion/react';
import { FileText, Download, ArrowRight, BookOpen } from 'lucide-react';

const JOURNALS = [
  {
    title: "Clinical Outcomes of Laparoscopic Hysterectomy: A 5-Year Review",
    author: "Dr. Subramanian et al.",
    periodical: "Subam Medical Review • Vol 12",
    date: "April 2024",
    type: "Original Research"
  },
  {
    title: "Neonatal Resuscitation Protocols in Level III NICU Settings",
    author: "Dr. Anitha & Team",
    periodical: "Indian Journal of Pediatrics (Reprint)",
    date: "March 2024",
    type: "Case Study"
  },
  {
    title: "Comparative Study of Pain Management in Normal vs Painless Labor",
    author: "Obstetrics Dept.",
    periodical: "Clinical Insights • Q1 2024",
    date: "February 2024",
    type: "Review Article"
  }
];

export default function MedicalJournals() {
  return (
    <div className="pt-32 pb-24 bg-slate-50">
      <div className="container-custom">
        <div className="max-w-3xl mb-20 px-4">
          <span className="text-[10px] font-black text-brand-primary uppercase tracking-[0.3em] mb-4 block">Academy & Research</span>
          <h1 className="text-5xl md:text-7xl mb-8 leading-[0.95] tracking-tight font-display text-brand-dark">
            Medical <br /><span className="text-brand-primary italic">Journals.</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium leading-relaxed">
            Advancing clinical knowledge through evidence-based research and published case studies from our specialized departments.
          </p>
        </div>

        <div className="space-y-6">
          {JOURNALS.map((journal, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-10 hover:shadow-premium transition-all"
            >
              <div className="flex gap-8 items-start">
                 <div className="h-16 w-16 rounded-2xl bg-slate-50 text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                    <FileText size={32} />
                 </div>
                 <div>
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mb-2 block">{journal.type}</span>
                    <h3 className="text-2xl font-display text-brand-dark mb-3 group-hover:text-brand-primary transition-colors leading-snug">{journal.title}</h3>
                    <div className="flex flex-wrap gap-4 text-xs font-bold text-slate-400">
                       <span className="flex items-center gap-1.5"><BookOpen size={14} /> {journal.periodical}</span>
                       <span className="h-1 w-1 bg-slate-200 rounded-full self-center" />
                       <span>Author: {journal.author}</span>
                       <span className="h-1 w-1 bg-slate-200 rounded-full self-center" />
                       <span>{journal.date}</span>
                    </div>
                 </div>
              </div>
              <button className="flex items-center gap-3 px-8 py-4 bg-slate-50 text-brand-dark rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary hover:text-white transition-all group-hover:shadow-lg">
                Download PDF <Download size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
