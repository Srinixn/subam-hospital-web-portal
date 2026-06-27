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
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen">
        <Header />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/about" element={<About />} />
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

        {/* Floating Utilities */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-11 h-11 sm:w-14 sm:h-14 bg-white text-slate-800 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 border border-slate-100"
          style={{ marginBottom: 'env(safe-area-inset-bottom, 0px)' }}
        >
          <ChevronUp size={20} />
        </button>
      </div>
    </Router>
  );
}


