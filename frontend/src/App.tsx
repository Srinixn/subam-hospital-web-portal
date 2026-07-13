import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Feedback from './pages/Feedback';
import Facilities from './pages/Facilities';
import SuccessStories from './pages/SuccessStories';
import Gallery from './pages/Gallery';
import Articles from './pages/Articles';
import ArticleDetail from './pages/ArticleDetail';
import Careers from './pages/Careers';
import OurNetwork from './pages/OurNetwork';
import Management from './pages/Management';
import SunsrishtiMultispecialityHospital from './pages/hospitals/SunsrishtiMultispecialityHospital';
import SunsrishtiFertilityCenter from './pages/hospitals/SunsrishtiFertilityCenter';
import SubamHospital from './pages/hospitals/SubamHospital';
import Obstetrics from './pages/specialities/Obstetrics';
import Gynecology from './pages/specialities/Gynecology';
import Radiology from './pages/specialities/Radiology';
import Pediatrics from './pages/specialities/Pediatrics';
import NewbornCare from './pages/specialities/NewbornCare';
import FertilityCare from './pages/specialities/FertilityCare';
import PregnancyCare from './pages/specialities/PregnancyCare';
import PostNatalCare from './pages/specialities/PostNatalCare';
import HealthBlogs from './pages/HealthBlogs';
import MedicalJournals from './pages/MedicalJournals';
import Videos from './pages/Videos';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatWidget from './components/ChatWidget';
import TicketView from './pages/TicketView';

/* ── Page title map for SEO ── */
const PAGE_TITLES: Record<string, string> = {
  '/': 'Subam Hospital | Best Maternity & Women\'s Hospital in Salem, Tamil Nadu',
  '/services': 'Our Specialities — Obstetrics, Gynaecology, Paediatrics | Subam Hospital',
  '/doctors': 'Our Medical Team — Expert Doctors & Specialists | Subam Hospital Salem',
  '/about': 'About Subam Hospital — 12+ Years of Trusted Healthcare in Salem',
  '/management': 'Management Team — Dr. K. Raj & Dr. Selvi Raju | Subam Hospital',
  '/contact': 'Contact Us — Book Consultation, Emergency Helpline | Subam Hospital',
  '/feedback': 'Patient Feedback — Share Your Experience | Subam Hospital Salem',
  '/facilities': 'Hospital Facilities — Modern ICU, OT, NICU | Subam Hospital',
  '/success-stories': 'Patient Success Stories & Testimonials | Subam Hospital Salem',
  '/gallery': 'Hospital Gallery — Images & Infrastructure | Subam Hospital',
  '/videos': 'Video Guides — Health Education & Hospital Tours | Subam Hospital',
  '/articles': 'Medical Articles — Expert Health Insights | Subam Hospital',
  '/blogs': 'Health Blogs — Pregnancy, Fertility & Wellness Resources | Subam Hospital',
  '/journals': 'Medical Journals — Clinical Research & Publications | Subam Hospital',
  '/careers': 'Careers — Join Our Healthcare Team | Subam Hospital Salem',
  '/our-network': 'Our Network — Subam & Sunsrishti Healthcare Institutions | Salem',
  '/subam-hospital': 'Subam Hospital — Women\'s & Pregnancy Care Center | Salem',
  '/sunsrishti-fertility-center': 'Sunsrishti Fertility Center — IVF & Reproductive Medicine | Salem',
  '/sunsrishti-multispeciality-hospital': 'Sunsrishti Multispeciality Hospital — General & Speciality Care | Salem',
  '/specialities/obstetrics': 'Obstetrics Department — Pregnancy & Delivery Care | Subam Hospital',
  '/specialities/gynecology': 'Gynaecology Department — Women\'s Health Services | Subam Hospital',
  '/specialities/radiology': 'Radiology Department — Diagnostic Imaging Services | Subam Hospital',
  '/specialities/pediatrics': 'Paediatrics Department — Child Healthcare | Subam Hospital',
  '/specialities/newborn-care': 'Newborn Care & Level III NICU | Subam Hospital Salem',
  '/specialities/fertility': 'Fertility Care & IVF Treatment | Sunsrishti Fertility Center',
  '/specialities/pregnancy-care': 'Antenatal (Pregnancy) Care Program | Subam Hospital',
  '/specialities/post-natal': 'Postnatal Care — Postpartum Recovery Support | Subam Hospital',
};

const PAGE_DESCRIPTIONS: Record<string, string> = {
  '/': 'Subam Hospital, Salem — Leading maternity & women\'s hospital with 25,000+ deliveries, Level III NICU, IVF centre, and 24/7 emergency care. Trusted by families across Tamil Nadu.',
  '/services': 'Explore our 8 specialities: Obstetrics, Gynaecology, Paediatrics, Radiology, Fertility Care, Newborn Care, Antenatal and Postnatal Care at Subam Hospital, Salem.',
  '/doctors': 'Meet our team of 20+ specialist doctors across 13 departments including Obstetrics, General Surgery, Cardiology, Orthopaedics, and more at Subam Hospital, Salem.',
  '/about': 'Learn about Subam Hospital\'s journey from a small clinic in 2013 to Salem\'s trusted multi-specialty healthcare institution with 50+ beds and advanced facilities.',
  '/contact': 'Contact Subam Hospital Salem — Call +91 90922 25481 for appointments, emergencies, and enquiries. Located at Kakapalayam Main Road, Elampillai, Salem 637502.',
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* ── Per-page SEO: updates document.title and meta description ── */
function PageMeta() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title = PAGE_TITLES[pathname] || 'Subam Hospital | Best Maternity Hospital in Salem';
    document.title = title;

    const desc = PAGE_DESCRIPTIONS[pathname];
    if (desc) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', desc);
    }
  }, [pathname]);
  return null;
}

export default function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <PageMeta />
      <div className="min-h-screen">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/management" element={<Management />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/facilities" element={<Facilities />} />

            <Route path="/specialities/obstetrics" element={<Obstetrics />} />
            <Route path="/specialities/gynecology" element={<Gynecology />} />
            <Route path="/specialities/radiology" element={<Radiology />} />
            <Route path="/specialities/pediatrics" element={<Pediatrics />} />
            <Route path="/specialities/newborn-care" element={<NewbornCare />} />
            <Route path="/specialities/fertility" element={<FertilityCare />} />
            <Route path="/specialities/pregnancy-care" element={<PregnancyCare />} />
            <Route path="/specialities/post-natal" element={<PostNatalCare />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/blogs" element={<HealthBlogs />} />
            <Route path="/journals" element={<MedicalJournals />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/our-network" element={<OurNetwork />} />
            <Route path="/sunsrishti-multispeciality-hospital" element={<SunsrishtiMultispecialityHospital />} />
            <Route path="/sunsrishti-fertility-center" element={<SunsrishtiFertilityCenter />} />
            <Route path="/subam-hospital" element={<SubamHospital />} />
            <Route path="/ticket-view" element={<TicketView />} />
            <Route path="*" element={
              <div className="pt-32 pb-24 text-center container-custom min-h-[60vh] flex flex-col items-center justify-center">
                <h1 className="text-6xl md:text-8xl font-display text-brand-primary mb-6">404</h1>
                <p className="text-xl text-slate-500 mb-10 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
                <a href="/" className="btn-primary">Back to Home</a>
              </div>
            } />
          </Routes>
        </main>
        
        <Footer />

        {/* Chatbot Widget — available on all pages */}
        <ChatWidget />

        {/* Floating Scroll-to-Top — only visible after scrolling */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-11 h-11 sm:w-14 sm:h-14 bg-white text-slate-800 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 z-40 border border-slate-100 cursor-pointer ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
          aria-label="Scroll to top"
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </Router>
  );
}
