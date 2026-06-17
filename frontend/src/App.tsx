import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServicesPage from './pages/ServicesPage';
import DoctorsPage from './pages/DoctorsPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Facilities from './pages/Facilities';
import SuccessStories from './pages/SuccessStories';
import Gallery from './pages/Gallery';
import Articles from './pages/Articles';
import Careers from './pages/Careers';
import OurNetwork from './pages/OurNetwork';
import SunsrishtiWomensCare from './pages/hospitals/SunsrishtiWomensCare';
import SunsrishtiFertilityCenter from './pages/hospitals/SunsrishtiFertilityCenter';
import SubamHospital from './pages/hospitals/SubamHospital';
import Obstetrics from './pages/specialities/Obstetrics';
import Gynecology from './pages/specialities/Gynecology';
import Radiology from './pages/specialities/Radiology';
import Pediatrics from './pages/specialities/Pediatrics';
import NICU from './pages/specialities/NICU';
import FertilityCare from './pages/specialities/FertilityCare';
import PainClinic from './pages/specialities/PainClinic';
import PregnancyCare from './pages/specialities/PregnancyCare';
import PrePregnancyPlan from './pages/specialities/PrePregnancyPlan';
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
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/specialities/obstetrics" element={<Obstetrics />} />
            <Route path="/specialities/gynecology" element={<Gynecology />} />
            <Route path="/specialities/radiology" element={<Radiology />} />
            <Route path="/specialities/pediatrics" element={<Pediatrics />} />
            <Route path="/specialities/nicu" element={<NICU />} />
            <Route path="/specialities/fertility" element={<FertilityCare />} />
            <Route path="/specialities/pain-clinic" element={<PainClinic />} />
            <Route path="/specialities/pregnancy-care" element={<PregnancyCare />} />
            <Route path="/specialities/pre-pregnancy" element={<PrePregnancyPlan />} />
            <Route path="/specialities/post-natal" element={<PostNatalCare />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/blogs" element={<HealthBlogs />} />
            <Route path="/journals" element={<MedicalJournals />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/our-network" element={<OurNetwork />} />
            <Route path="/sunsrishti-womens-care" element={<SunsrishtiWomensCare />} />
            <Route path="/sunsrishti-fertility-center" element={<SunsrishtiFertilityCenter />} />
            <Route path="/subam-hospital" element={<SubamHospital />} />
          </Routes>
        </main>
        
        <Footer />

        {/* Floating Utilities */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed right-6 bottom-6 w-14 h-14 bg-white text-slate-800 rounded-full shadow-xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-40 border border-slate-100"
        >
          <ChevronUp size={24} />
        </button>
      </div>
    </Router>
  );
}


