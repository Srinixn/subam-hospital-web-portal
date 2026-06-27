import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 pt-16 md:pt-24 pb-8 md:pb-12 text-slate-400">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-20">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-8 transition-transform hover:scale-105">
                <img 
                  src="https://srinixnm.github.io/hospital-access/subam.png" 
                  alt="Subam Hospital Logo" 
                  className="h-full w-auto object-contain brightness-0 invert opacity-80"
                  referrerPolicy="no-referrer"
                />
              </div>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs">
              Dedicated to providing exceptional healthcare services with compassion and innovation. Our mission is to heal and empower our community.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 leading-none">Our Services</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { name: 'Obstetrics', path: '/specialities/obstetrics' },
                { name: 'Gynaecology', path: '/specialities/gynecology' },
                { name: 'Newborn Care', path: '/specialities/newborn-care' },
                { name: 'Fertility Care', path: '/specialities/fertility' },
                { name: 'Emergency', path: '/contact' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-brand-primary transition-colors underline decoration-transparent hover:decoration-brand-primary underline-offset-4">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 leading-none">Quick Links</h4>
            <ul className="space-y-4 text-sm font-medium">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Network', path: '/our-network' },
                { name: 'Contact Us', path: '/contact' },
                { name: 'Health Blog', path: '/blogs' },
                { name: 'Feedback', path: '/feedback' }
              ].map(item => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-brand-primary transition-colors underline decoration-transparent hover:decoration-brand-primary underline-offset-4">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-white font-black text-[10px] uppercase tracking-[0.3em] mb-8 leading-none">Contact Info</h4>
            <ul className="space-y-5 text-sm font-medium">
              <li className="flex items-start gap-4">
                <MapPin size={18} className="text-brand-primary shrink-0" />
                <span className="leading-relaxed">Magudanchavadi - Elampillai Rd, Elampillai, Salem, Tamil Nadu 637502</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone size={18} className="text-brand-primary shrink-0" />
                <a href="tel:+919092225481" className="hover:text-brand-primary transition-colors">+91 90922 25481</a>
              </li>
              <li className="flex items-center gap-4">
                <Mail size={18} className="text-brand-primary shrink-0" />
                <a href="mailto:hospitalsubam@gmail.com" className="hover:text-brand-primary transition-colors">hospitalsubam@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
          <p className="text-xs tracking-wider">
            © {currentYear} Subam Hospital. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6 text-xs tracking-wider">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookie Settings</a>
          </div>
          <p className="text-[10px] flex items-center gap-1">
            Made with <Heart size={12} className="text-brand-primary" /> in Salem
          </p>
        </div>
      </div>
    </footer>
  );
}

