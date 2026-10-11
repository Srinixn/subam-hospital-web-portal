import { motion, AnimatePresence } from 'motion/react';
import { Phone, Menu, X, Calendar, User, Globe, Mail, Clock, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ item, scrolled, location }: any) => {
  const [isHovered, setIsHovered] = useState(false);
  const hasDropdown = 'dropdown' in item;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        to={item.path}
        className={`flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.1em] transition-all py-2 ${
          location.pathname === item.path
            ? 'text-brand-primary'
            : (scrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-brand-primary' : 'text-white/90 hover:text-white')
        }`}
      >
        {item.name}
        {hasDropdown && <span className="text-[8px] opacity-50 ml-1">▼</span>}
      </Link>

      {hasDropdown && isHovered && (
        <div className="absolute top-full left-0 pt-2 -mt-1 group-hover:block z-50">
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-w-[240px] bg-white rounded-xl shadow-premium border border-slate-100 overflow-hidden py-3"
          >
            {item.dropdown?.map((sub: any) => (
              <Link
                key={sub.name}
                to={sub.path}
                onClick={() => setIsHovered(false)}
                className="block px-6 py-3 text-slate-700 font-bold text-xs hover:bg-slate-50 hover:text-brand-primary transition-all border-l-4 border-transparent hover:border-brand-primary"
              >
                {sub.name}
              </Link>
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    {
      name: 'Management',
      path: '/management',
      dropdown: [
        { name: 'Management Team', path: '/management' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Network', path: '/our-network' },
        { name: 'Our Team', path: '/doctors' },
        { name: 'Success Stories', path: '/success-stories' }
      ]
    },
    {
      name: 'Specialities',
      path: '/services',
      dropdown: [
        { name: 'Obstetrics', path: '/specialities/obstetrics' },
        { name: 'Gynaecology', path: '/specialities/gynecology' },
        { name: 'Paediatrics', path: '/specialities/pediatrics' },
        { name: 'Radiology', path: '/specialities/radiology' },
        { name: 'Antenatal (Pregnancy Care)', path: '/specialities/pregnancy-care' },
        { name: 'Postnatal Care', path: '/specialities/post-natal' },
        { name: 'Fertility Care', path: '/specialities/fertility' },
        { name: 'Newborn Care', path: '/specialities/newborn-care' }
      ]
    },
    { name: 'Facilities', path: '/facilities' },
    {
      name: 'Gallery',
      path: '/gallery',
      dropdown: [
        { name: 'Images', path: '/gallery' },
        { name: 'Videos', path: '/videos' }
      ]
    },
    {
      name: 'Articles',
      path: '/articles',
      dropdown: [
        { name: 'Health Blogs', path: '/blogs' },
        { name: 'Medical Journals', path: '/journals' }
      ]
    },
    { name: 'Careers', path: '/careers' },
    { name: 'Feedback', path: '/feedback' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}>
      {/* Top Bar - Very Demo style */}
      <div className={`hidden lg:block transition-all duration-300 ${
        scrolled || location.pathname !== '/' ? 'h-0 opacity-0 overflow-hidden' : 'bg-brand-dark py-2'
      }`}>
        <div className="container-custom flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/60 tracking-wider">
              <Mail size={10} className="text-brand-primary" />
              <a href="mailto:hello@example.com" className="hover:text-white transition-colors">hello@example.com</a>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/60 tracking-wider">
              <Phone size={10} className="text-brand-primary" />
              <a href="tel:+00000000000" className="hover:text-white transition-colors">+00 00000 00000</a>
            </div>
            <div className="flex items-center gap-2 text-[9px] font-bold text-white/60 tracking-wider">
              <Clock size={10} className="text-brand-primary" />
              <span>Emergency 24x7</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <Link to="/about" className="text-[9px] font-bold text-white/80 hover:text-white transition-colors uppercase tracking-widest">About Demo Hospital</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className={`transition-all duration-300 ${
        scrolled || location.pathname !== '/' ? 'bg-white shadow-premium py-2' : 'bg-white/10 backdrop-blur-md py-4'
      }`}>
        <div className="container-custom flex items-center justify-between">
           {/* Logo */}
           <Link to="/" className="flex items-center group cursor-pointer">
             <div className={`transition-all duration-500 ${scrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'}`}>
               <img
                 src="https://placehold.co/320x100?text=Demo+Hospital"
                 alt="Demo Hospital Logo"
                 className="h-full w-auto object-contain"
               />
             </div>
           </Link>

           {/* Desktop Nav */}
           <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
             {navItems.map((item) => (
               <NavItem key={item.name} item={item} scrolled={scrolled} location={location} />
             ))}
           </nav>

           {/* Actions */}
           <div className="hidden lg:flex items-center gap-4">
             <Link to="/contact" className="h-10 px-5 bg-brand-primary text-white font-bold rounded-lg text-[11px] flex items-center justify-center hover:bg-teal-700 transition-all uppercase tracking-widest">
               Consult Now
             </Link>
           </div>

           {/* Mobile Actions & Toggle */}
           <div className="flex lg:hidden items-center gap-1.5">
             <Link
               to="/contact"
               className="h-8 px-3 bg-brand-primary text-white font-bold rounded-lg text-[10px] flex items-center justify-center hover:bg-teal-700 transition-all uppercase tracking-wider whitespace-nowrap"
             >
               Contact
             </Link>
             <a
               href="tel:+00000000000"
               className={`p-2 transition-colors ${scrolled || location.pathname !== '/' ? 'text-slate-700 hover:text-brand-primary' : 'text-white/80 hover:text-white'}`}
               aria-label="Call Us"
             >
               <Phone size={18} />
             </a>
             <button
               className={`p-2 ${scrolled || location.pathname !== '/' ? 'text-slate-800' : 'text-white'}`}
               onClick={() => setIsOpen(!isOpen)}
               aria-label="Toggle menu"
             >
               {isOpen ? <X size={24} /> : <Menu size={24} />}
             </button>
           </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl p-4 sm:p-6 flex flex-col gap-1 border-t border-slate-100 max-h-[85vh] overflow-y-auto"
          style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom, 0px))' }}
        >
          {navItems.map((item) => (
            <div key={item.name} className="flex flex-col">
              {item.dropdown ? (
                <button
                  onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                  className={`text-sm font-bold py-3 flex items-center justify-between w-full text-left ${
                    location.pathname === item.path ? 'text-brand-primary' : 'text-slate-800'
                  }`}
                >
                  {item.name}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                </button>
              ) : (
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-bold py-3 flex items-center justify-between ${
                    location.pathname === item.path ? 'text-brand-primary' : 'text-slate-800'
                  }`}
                >
                  {item.name}
                </Link>
              )}
              {item.dropdown && openDropdown === item.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="pl-4 flex flex-col border-l-2 border-brand-primary/20 mb-2 overflow-hidden"
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`py-2.5 text-xs font-bold ${
                      location.pathname === item.path ? 'text-brand-primary' : 'text-slate-500'
                    }`}
                  >
                    View All {item.name}
                  </Link>
                  {item.dropdown.map((sub: any) => (
                    <Link
                      key={sub.name}
                      to={sub.path}
                      onClick={() => setIsOpen(false)}
                      className={`py-2.5 text-xs font-bold ${
                        location.pathname === sub.path ? 'text-brand-primary' : 'text-slate-500'
                      }`}
                    >
                      {sub.name}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
             <Link
               to="/contact"
               onClick={() => setIsOpen(false)}
               className="flex items-center justify-center gap-2 bg-brand-primary text-white font-bold py-3.5 rounded-xl text-xs w-full uppercase tracking-widest"
             >
               Consult Now
             </Link>
             <a href="tel:+00000000000" className="flex items-center justify-center gap-2 bg-red-600 text-white font-bold py-3.5 rounded-xl text-xs w-full">
               <Phone size={16} /> ER Hotline
             </a>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </header>
  );
}

