import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Clock, Stethoscope, ArrowRight, HeartPulse, Sparkles, BookOpen } from 'lucide-react';
import { ARTICLES } from './Articles';

// Map doctor to relevant specialty links
const getSpecialtyLink = (authorRole: string): { name: string; url: string } => {
  const role = authorRole.toLowerCase();
  if (role.includes('gynaecologist') || role.includes('maternity')) {
    return { name: 'Obstetrics & Gynaecology Services', url: '/specialities/gynecology' };
  } else if (role.includes('paediatrician')) {
    return { name: 'Paediatric Services', url: '/specialities/pediatrics' };
  } else if (role.includes('fertility')) {
    return { name: 'Fertility Care', url: '/specialities/fertility' };
  }
  return { name: 'Our Services', url: '/services' };
};

// Generate realistic extended content based on article ID
const getExtendedContent = (id: number) => {
  switch (id) {
    case 1:
      return {
        introduction: "High-risk pregnancies require specialized monitoring and personalized care plans. Recognizing potential risks early is essential to implementing preventative treatment strategies.",
        keyPointsTitle: "Common High-Risk Indicators",
        keyPoints: [
          "Maternal age (under 17 or over 35)",
          "Pre-existing conditions like hypertension, diabetes, or autoimmune disorders",
          "Gestational complications such as preeclampsia or gestational diabetes",
          "Multiple births (twins, triplets, or more)"
        ],
        clinicalGuidance: "At Subam Hospital, our maternal-fetal medicine team employs advanced screening protocols, regular high-resolution ultrasound monitoring, and evidence-based interventions to ensure the best possible outcomes for both mother and baby. From gestational diabetes management to preeclampsia prevention, our comprehensive approach covers every aspect of complex pregnancy care.",
        conclusion: "With modern medical advancements and regular monitoring, most mothers with high-risk pregnancies go on to deliver healthy babies. Close collaboration with your healthcare team is key to navigating this journey successfully."
      };
    case 2:
      return {
        introduction: "Minimal access surgery, commonly known as laparoscopic or keyhole surgery, has transformed the patient experience by offering alternatives to traditional open surgery.",
        keyPointsTitle: "Benefits of Laparoscopic Surgery",
        keyPoints: [
          "Significantly smaller incisions and minimal scarring",
          "Reduced post-operative pain and lower reliance on pain medication",
          "Shorter hospital stays and faster return to work or daily routine",
          "Reduced risk of infection and post-surgical complications"
        ],
        clinicalGuidance: "Minimal access surgery has transformed patient outcomes at our facility. Our surgeons perform complex gynaecological, general surgical, and fertility procedures through keyhole incisions — resulting in less post-operative pain, shorter hospital stays, and faster return to daily life. With state-of-the-art HD laparoscopic towers and trained surgical teams, we bring world-class surgical care to Salem.",
        conclusion: "Our commitment to surgical innovation ensures you receive treatment that is not only highly effective but also minimizes discomfort and shortens your path to recovery."
      };
    case 3:
      return {
        introduction: "Welcoming a newborn is a joyous occasion, but the first few weeks can feel overwhelming. Understanding essential neonatal care is crucial for the safety and development of your baby.",
        keyPointsTitle: "Essential Newborn Care Pillars",
        keyPoints: [
          "Proper support for the baby's head and neck during handling",
          "Establishing a comfortable breastfeeding routine",
          "Ensuring safe sleep environments (sleeping on the back, firm mattress, no loose bedding)",
          "Monitoring diaper output to track hydration levels"
        ],
        clinicalGuidance: "The first 28 days of a newborn's life are the most critical. Our neonatal team provides comprehensive guidance on feeding schedules, sleep safety, jaundice awareness, vaccination timelines, and recognizing early warning signs. With our Level III NICU capabilities, we ensure that even the most vulnerable newborns receive the highest standard of care from their very first breath.",
        conclusion: "Trust your instincts, but do not hesitate to reach out to our pediatric care team if you notice any unusual symptoms, such as persistent fever or difficulty feeding."
      };
    case 4:
      return {
        introduction: "Embarking on fertility treatment is a deeply personal journey. Understanding the key success factors can help set realistic expectations and empower couples throughout the process.",
        keyPointsTitle: "Factors Influencing IVF Success",
        keyPoints: [
          "Maternal and paternal age",
          "Quality of eggs, sperm, and embryos",
          "Lifestyle factors including diet, stress levels, and exercise",
          "The underlying cause of infertility (e.g., tubal factor, PCOS, male factor)"
        ],
        clinicalGuidance: "In vitro fertilization success depends on multiple factors including age, underlying conditions, and treatment protocols. Our fertility specialists use advanced embryo culture systems, genetic screening, and personalized hormonal protocols to maximize success rates. This article demystifies the IVF journey — from initial consultation through embryo transfer — so couples can make informed decisions with confidence.",
        conclusion: "Every fertility journey is unique. Our team is dedicated to providing personalized medical care and emotional support, tailoring treatments to your specific needs."
      };
    case 5:
      return {
        introduction: "Polycystic Ovary Syndrome (PCOS) is a common hormonal disorder that affects women of reproductive age. A balanced management plan can alleviate symptoms and improve long-term health.",
        keyPointsTitle: "Recommended PCOS Management Strategies",
        keyPoints: [
          "Adopting a nutrient-rich, low-glycemic diet",
          "Regular physical activity to improve insulin sensitivity",
          "Targeted medical therapies for hormone regulation",
          "Regular monitoring for metabolic and cardiovascular health"
        ],
        clinicalGuidance: "PCOS affects nearly 1 in 10 women of reproductive age. Our gynaecology team takes a holistic approach to management, combining hormonal therapy, nutritional counselling, exercise guidance, and regular monitoring. Early diagnosis and consistent management can significantly improve fertility outcomes, metabolic health, and overall quality of life for women living with PCOS.",
        conclusion: "Managing PCOS is a journey that requires time and dedication. With custom lifestyle plans and clinical guidance, you can regain control of your hormonal health."
      };
    case 6:
      return {
        introduction: "Preparing for childbirth involves physical, mental, and logistical planning. Knowing what to expect at the hospital can significantly reduce birth-related anxiety.",
        keyPointsTitle: "Checklist for Hospital Delivery",
        keyPoints: [
          "Essential documents (ID, medical history files, insurance cards)",
          "Comfortable clothing for labor and postpartum recovery",
          "Basic baby essentials (swaddling clothes, baby wipes, newborn diapers)",
          "A pre-planned hospital route and emergency contact numbers"
        ],
        clinicalGuidance: "Walking into a hospital for your first delivery can feel overwhelming. This comprehensive guide covers everything: when to head to the hospital, what to pack in your delivery bag, understanding labour stages, pain management options including epidural analgesia, the role of your birth companion, and immediate postpartum care. Our maternity team ensures every mother feels informed, supported, and empowered throughout her birthing experience.",
        conclusion: "Our compassionate obstetricians and nursing staff are committed to making your delivery experience as safe, positive, and memorable as possible."
      };
    default:
      return {
        introduction: "",
        keyPointsTitle: "",
        keyPoints: [],
        clinicalGuidance: "",
        conclusion: ""
      };
  }
};

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const articleId = parseInt(id || '');
  const article = ARTICLES.find(a => a.id === articleId);

  if (!article) {
    return (
      <div className="pt-32 pb-24 text-center container-custom min-h-[60vh] flex flex-col items-center justify-center">
        <h1 className="text-6xl md:text-8xl font-display text-brand-primary mb-6">404</h1>
        <p className="text-xl text-slate-500 mb-10 max-w-md">Article not found.</p>
        <Link to="/articles" className="btn-primary">Back to Articles</Link>
      </div>
    );
  }

  const Icon = article.icon;
  const extendedContent = getExtendedContent(article.id);
  const specialtyInfo = getSpecialtyLink(article.authorRole);

  // Get related articles (exclude current)
  const relatedArticles = ARTICLES.filter(a => a.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-white">
      {/* Article Header & Visuals */}
      <section className="relative pt-32 pb-12 bg-brand-dark overflow-hidden">
        {/* Ambient gradient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] aspect-square bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-primary/15 via-transparent to-transparent rounded-full blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Back Button */}
          <Link
            to="/articles"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft size={14} /> Back to Articles
          </Link>

          {/* Category & Time */}
          <div className="flex items-center gap-3 mb-6">
            <span className={`h-8 w-8 rounded-lg bg-gradient-to-br ${article.accentColor} text-white flex items-center justify-center shrink-0`}>
              <Icon size={16} />
            </span>
            <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest">
              {article.category}
            </span>
            <span className="h-1 w-1 bg-slate-600 rounded-full" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              {article.readTime}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-display text-white max-w-4xl leading-tight mb-8">
            {article.title}
          </h1>

          {/* Author info */}
          <div className="flex items-center gap-4 border-t border-white/10 pt-6">
            <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${article.accentColor} text-white flex items-center justify-center font-display text-lg font-bold shrink-0 shadow-lg`}>
              {article.author.split(' ').pop()?.[0]}
            </div>
            <div>
              <span className="text-white font-medium block text-sm">{article.author}</span>
              <span className="text-xs text-slate-400">{article.authorRole} • Published on {article.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image Block */}
      <section className="relative z-10 -mt-6">
        <div className="container-custom">
          <div className="aspect-[4/3] sm:aspect-[21/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-slate-100">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content Area */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Text Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-slate max-w-none">
                {/* Intro */}
                <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed mb-8 first-letter:text-5xl first-letter:font-display first-letter:font-black first-letter:text-brand-primary first-letter:mr-3 first-letter:float-left">
                  {extendedContent.introduction}
                </p>

                {/* Subcontent block 1 */}
                <h3 className="text-2xl font-display text-brand-dark mt-10 mb-4">
                  {extendedContent.keyPointsTitle}
                </h3>
                <ul className="space-y-3 mb-8 pl-0 list-none">
                  {extendedContent.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600 text-sm leading-relaxed">
                      <span className="h-5 w-5 rounded-full bg-teal-50 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">✓</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Clinical Guidance block */}
                <blockquote className="my-8 border-l-4 border-brand-primary bg-slate-50 rounded-r-2xl p-6 md:p-8">
                  <h4 className="text-xs font-black text-brand-primary uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                    <Stethoscope size={14} /> Clinical Insight
                  </h4>
                  <p className="text-slate-700 italic text-sm leading-relaxed m-0">
                    "{extendedContent.clinicalGuidance}"
                  </p>
                </blockquote>

                {/* Conclusion */}
                <h3 className="text-2xl font-display text-brand-dark mt-10 mb-4">Summary & Next Steps</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  {extendedContent.conclusion}
                </p>
              </div>
            </div>

            {/* Sidebar widgets */}
            <div className="space-y-8">
              {/* Consultation Card */}
              <div className="bg-brand-dark rounded-3xl p-6 md:p-8 text-white relative overflow-hidden border border-white/5 shadow-xl">
                <div className="absolute right-0 top-0 translate-x-[30%] -translate-y-[30%] w-48 aspect-square rounded-full border border-white/5 pointer-events-none" />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest block mb-4">
                      Book an Appointment
                    </span>
                    <h3 className="text-2xl font-display text-white mb-3">
                      Need Personalized Care?
                    </h3>
                    <p className="text-slate-400 text-xs leading-relaxed mb-6">
                      Schedule a consultation with our experienced clinical specialists, including <strong>{article.author}</strong>, at Subam Hospital.
                    </p>
                  </div>
                  <div className="space-y-3">
                    <Link
                      to="/contact"
                      className="h-11 w-full bg-brand-primary text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-teal-600 transition-colors shadow-sm"
                    >
                      <span>Book Appointment</span>
                      <ArrowRight size={14} />
                    </Link>
                    <Link
                      to={specialtyInfo.url}
                      className="h-11 w-full bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-white/20 transition-colors"
                    >
                      <span>{specialtyInfo.name}</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Share/Print Utilities */}
              <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6">
                <h4 className="text-[10px] font-black text-brand-dark uppercase tracking-widest mb-4">
                  Patient Resources
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed mb-4">
                  This educational content is reviewed by clinical experts and conforms to standard hospital health education guidelines.
                </p>
                <div className="h-px bg-slate-200/60 my-4" />
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-wider">
                  <span>Author: {article.author}</span>
                  <span className="text-brand-primary">Subam Hospital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles Section */}
      <section className="py-16 bg-slate-50/50 border-t border-slate-100">
        <div className="container-custom">
          <div className="flex items-center gap-3 mb-10">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] whitespace-nowrap">
              Recommended Articles
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {relatedArticles.map((relArticle) => {
              const RelIcon = relArticle.icon;
              return (
                <Link
                  key={relArticle.id}
                  to={`/articles/${relArticle.id}`}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-xl hover:border-transparent transition-all duration-300 flex flex-col md:flex-row h-full"
                >
                  <div className="md:w-2/5 aspect-[16/10] md:aspect-auto overflow-hidden relative shrink-0">
                    <img
                      src={relArticle.image}
                      alt={relArticle.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`h-6 w-6 rounded-md bg-gradient-to-br ${relArticle.accentColor} text-white flex items-center justify-center shrink-0`}>
                          <RelIcon size={12} />
                        </span>
                        <span className="text-[9px] font-black text-brand-primary uppercase tracking-widest">
                          {relArticle.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-display text-brand-dark mb-2 group-hover:text-brand-primary transition-colors line-clamp-2">
                        {relArticle.title}
                      </h4>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-brand-primary group-hover:gap-2 transition-all mt-4">
                      Read Article <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
