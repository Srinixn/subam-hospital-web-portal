import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  HeartHandshake,
  Stethoscope,
  Sparkles,
  Baby,
  Eye,
  Microscope,
  Clock,
  PhoneCall,
  ArrowDown,
  Check
} from 'lucide-react';

interface FacilityItem {
  name: string;
  desc: string;
  image: string;
  features: string[];
  isEmergency?: boolean;
}

interface FacilityCategory {
  id: string;
  title: string;
  shortTitle: string;
  tagline: string;
  icon: any;
  coverImage: string;
  items: FacilityItem[];
}

const CATEGORIES: FacilityCategory[] = [
  {
    id: "emergency",
    title: "Emergency and Critical Care",
    shortTitle: "Emergency & ICU",
    tagline: "Immediate response and clinical life-support active round the clock.",
    icon: Activity,
    coverImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "24x7 Emergency Services",
        desc: "Immediate clinical assessment and treatment response for all acute medical and surgical emergencies.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
        features: ["Trauma resuscitation bays", "Advanced medical triage system", "24/7 cardiac monitoring"],
        isEmergency: true
      },
      {
        name: "24x7 Labour Ward",
        desc: "Continuous fetal-maternal monitoring and skilled obstetric nursing care for safe delivery.",
        image: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&q=80&w=600",
        features: ["Continuous CTG monitoring", "Pain relief (Epidural) options", "Dedicated obstetricians on-duty"],
        isEmergency: true
      },
      {
        name: "24x7 Operation Theatre",
        desc: "Fully equipped surgical suites staffed and available 24/7 for immediate surgical interventions.",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
        features: ["Modular aseptic layout", "HEPA air filtration systems", "Advanced anesthesia workstation"],
        isEmergency: true
      },
      {
        name: "Obstetric Emergencies",
        desc: "Advanced protocols for the immediate management of postpartum hemorrhage, eclampsia, and obstructed labor.",
        image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
        features: ["Postpartum hemorrhage protocols", "Eclampsia management suites", "Emergency blood bank access"]
      },
      {
        name: "Trauma Ready Surgical Response",
        desc: "Rapid-response surgical teams configured for life-saving trauma and emergency surgeries.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600",
        features: ["Rapid triage protocols", "Polytrauma surgical panels", "Critical life-support systems"]
      }
    ]
  },
  {
    id: "maternity",
    title: "Obstetrics and Maternity Services",
    shortTitle: "Maternity & OBGYN",
    tagline: "Supporting family journeys with evidence-based, compassionate care.",
    icon: HeartHandshake,
    coverImage: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "Normal Deliveries",
        desc: "Supportive, evidence-based care focusing on natural vaginal childbirth with maternal comfort.",
        image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=600",
        features: ["Supportive active birth care", "Fetal heart rate monitoring", "Post-delivery bonding care"]
      },
      {
        name: "LSCS (Caesarean Section)",
        desc: "Elective and emergency C-sections performed by our experienced obstetrics surgical panel.",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
        features: ["Elective & emergency procedures", "Cosmetic skin suturing", "Partner accompaniment protocols"]
      },
      {
        name: "VBAC (Vaginal Birth After Caesarean)",
        desc: "Continuous clinical monitoring and trial of labor for eligible patients seeking vaginal birth after C-section.",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600",
        features: ["Continuous electronic monitoring", "Rigorous patient screening", "Immediate C-section backup"]
      },
      {
        name: "Ruptured Uterus Management",
        desc: "Rapid-response emergency surgical protocols and definitive uterine reconstruction.",
        image: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=600",
        features: ["Ultra-rapid response drills", "Emergency laparotomy setups", "Intensive resuscitation care"]
      },
      {
        name: "Postpartum Care",
        desc: "Dedicated post-delivery recovery, lactation support, maternal monitoring, and hemorrhage care.",
        image: "https://images.unsplash.com/photo-1590233649088-e8898b5b4e31?auto=format&fit=crop&q=80&w=600",
        features: ["Lactation consultant visits", "Maternal recovery charting", "Pelvic floor rehab guides"]
      },
      {
        name: "Hysterectomy for Obstetric Indications",
        desc: "Emergency surgical intervention when definitive maternal life-saving measures are required.",
        image: "https://images.unsplash.com/photo-1579684288227-1507b992796e?auto=format&fit=crop&q=80&w=600",
        features: ["Advanced surgical panels", "Critical care monitoring", "Multidisciplinary oversight"]
      }
    ]
  },
  {
    id: "surgical",
    title: "Surgical and Minimally Invasive Procedures",
    shortTitle: "Surgical & Laparoscopy",
    tagline: "Advanced surgical capabilities prioritizing minimal invasion and rapid recovery.",
    icon: Stethoscope,
    coverImage: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "Major Obstetric OT Procedures",
        desc: "Complex reconstructive and therapeutic surgeries in specialized modular operating theatres.",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=600",
        features: ["High-risk surgical setups", "Advanced suture technology", "Dedicated recovery bays"]
      },
      {
        name: "Laparoscopic Surgeries",
        desc: "Minimally invasive keyhole surgery for gynaecologic, gallbladder, and abdominal conditions.",
        image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600",
        features: ["Keyhole surgical setups", "Reduced recovery timelines", "Minimal post-op scarring"]
      },
      {
        name: "Hysteroscopic Surgeries",
        desc: "Diagnostic and operative hysteroscopy services with quick recovery and minimal discomfort.",
        image: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=600",
        features: ["Diagnostic uterine checks", "Resection of polyps & fibroids", "Same-day discharge procedures"]
      },
      {
        name: "Cyst Removal",
        desc: "Laparoscopic and open surgical removal of ovarian cysts, fibroids, and adnexal masses.",
        image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600",
        features: ["Laparoscopic cystectomy", "Ovarian tissue preservation", "Detailed histopathology tracking"]
      },
      {
        name: "Ovarian Drilling",
        desc: "Laparoscopic ovarian drilling procedures as a specialized treatment for PCOS.",
        image: "https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=600",
        features: ["Laparoscopic drilling", "Endocrine profile charting", "Post-surgical fertility support"]
      },
      {
        name: "IUD Insertion & Removal",
        desc: "Family planning procedures conducted safely by experienced gynaecological practitioners.",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=600",
        features: ["Hormonal & copper IUDs", "Pre-insertion counseling", "Post-insertion checks"]
      }
    ]
  },
  {
    id: "fertility",
    title: "Fertility, Andrology and Cryopreservation",
    shortTitle: "IVF & Fertility",
    tagline: "Advanced reproductive technologies and certified embryology laboratories.",
    icon: Sparkles,
    coverImage: "https://images.unsplash.com/photo-1579152276517-7507c992796e?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "IVF (In Vitro Fertilization)",
        desc: "Complete assisted reproductive cycle management with customized stimulation protocols.",
        image: "https://images.unsplash.com/photo-1579152276517-7507c992796e?auto=format&fit=crop&q=80&w=600",
        features: ["Individualized stimulation cycles", "ICSI fertilization support", "High-efficiency incubator monitoring"]
      },
      {
        name: "ICSI (Intracytoplasmic Sperm Injection)",
        desc: "High-precision microinjection technology for fertilization in severe male factor infertility.",
        image: "https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600",
        features: ["Laser-assisted micromanipulation", "Sperm selection protocols", "Improved fertilization rates"]
      },
      {
        name: "Andrology Lab",
        desc: "Advanced semen diagnostics, morphological analysis, and washing preparations for IUI/IVF.",
        image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?auto=format&fit=crop&q=80&w=600",
        features: ["Computerized semen analysis", "Sperm washing for IUI prep", "Detailed morphology analysis"]
      },
      {
        name: "Cryopreservation of Sperms & Embryos",
        desc: "Secure long-term storage using vitrification and controlled-rate freezing protocols.",
        image: "https://images.unsplash.com/photo-1581594541451-330d9bc9812a?auto=format&fit=crop&q=80&w=600",
        features: ["Vitrification rapid-freeze", "Secure cryogenic storage", "Double-identification verification"]
      },
      {
        name: "Oocyte Freezing",
        desc: "Egg freezing services for elective or medical fertility preservation with high survival rates.",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=600",
        features: ["Egg quality evaluations", "Controlled-rate cooling", "Fertility preservation panels"]
      }
    ]
  },
  {
    id: "pediatric",
    title: "Newborn and Pediatric Care",
    shortTitle: "Newborn & Pediatrics",
    tagline: "Dedicated clinical infrastructure tailored specifically for neonatal and pediatric care.",
    icon: Baby,
    coverImage: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "Newborn Care 24x7",
        desc: "Continuous neonatal monitoring, immediate newborn stabilization, and post-delivery nursery care.",
        image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?auto=format&fit=crop&q=80&w=600",
        features: ["Immediate pediatric check", "Neonatal screening panels", "Newborn vaccine programs"],
        isEmergency: true
      },
      {
        name: "Pediatric Services",
        desc: "Comprehensive outpatient consultations and inpatient care for childhood illnesses and growth tracking.",
        image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=600",
        features: ["Growth & development charts", "Immunization scheduling", "Outpatient child health care"]
      },
      {
        name: "NICU Capabilities",
        desc: "Advanced Level III Neonatal ICU equipped for premature, low-birth-weight, and critically ill infants.",
        image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=600",
        features: ["Level III incubator bays", "Surfactant delivery support", "Neonatal ventilators"],
        isEmergency: true
      }
    ]
  },
  {
    id: "imaging",
    title: "Imaging and Diagnostic Services",
    shortTitle: "Imaging & Diagnostics",
    tagline: "High-resolution diagnostics enabling immediate and highly accurate treatment plans.",
    icon: Eye,
    coverImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "CT Scan 24x7",
        desc: "Continuous advanced cross-sectional diagnostic imaging for trauma and emergency care.",
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=600",
        features: ["128-slice rapid scanning", "Low-radiation dose setups", "Emergency trauma scanning"],
        isEmergency: true
      },
      {
        name: "X-Ray 24x7",
        desc: "Round-the-clock digital radiography for bone trauma and acute diagnostic screenings.",
        image: "https://images.unsplash.com/photo-1557344265-883d77290d58?auto=format&fit=crop&q=80&w=600",
        features: ["High-resolution digital X-rays", "Minimal radiation exposure", "Instant digital reporting"],
        isEmergency: true
      },
      {
        name: "Ultrasound Services",
        desc: "Routine and emergency abdominal, pelvic, and vascular color Doppler imaging services.",
        image: "https://images.unsplash.com/photo-1590273466070-40c466b4432c?auto=format&fit=crop&q=80&w=600",
        features: ["Pelvic & abdominal sonography", "Vascular color Doppler scans", "Emergency ultrasound units"]
      },
      {
        name: "3D Ultrasound",
        desc: "High-resolution 3D volumetric scanning for detailed anatomical evaluations of the fetus.",
        image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600",
        features: ["Volumetric baby scanning", "Congenital anomaly checks", "First-semester screening"]
      },
      {
        name: "Fetal Medicine",
        desc: "Specialized maternal-fetal diagnostics, early second trimester anomaly screening, and growth monitoring.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
        features: ["Targeted anomaly checks", "Fetal growth assessments", "Amniocentesis procedures"]
      }
    ]
  },
  {
    id: "laboratory",
    title: "Laboratory, Pharmacy and Support Facilities",
    shortTitle: "Labs & Support",
    tagline: "Essential backup medical services and support wings keeping operations seamless.",
    icon: Microscope,
    coverImage: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=800",
    items: [
      {
        name: "24x7 Pharmacy",
        desc: "Fully stocked on-site pharmacy dispensing prescription drugs and critical emergency supplies.",
        image: "https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600",
        features: ["Automated inventory lists", "Cold-chain medicine storage", "Emergency drug availability"],
        isEmergency: true
      },
      {
        name: "Pharmacy Lab Integration",
        desc: "Integrated prescription systems matching patient records to ensure dispensing safety and counseling.",
        image: "https://images.unsplash.com/photo-1579152276508-e87fecfcfcfc?auto=format&fit=crop&q=80&w=600",
        features: ["Barcode medication checks", "Direct record integration", "Clinical pharmacist review"]
      },
      {
        name: "Clinical Laboratory Services",
        desc: "Pathological, microbiological, and hematological testing conducted locally with high quality.",
        image: "https://images.unsplash.com/photo-1579152276517-7507c992796e?auto=format&fit=crop&q=80&w=600",
        features: ["Automated biochemistry checks", "Microbiological cultures", "Hematology profiling units"]
      },
      {
        name: "Quiet Room Facilities",
        desc: "Quiet, private support suites configured for lactation, medical counseling, and family rest.",
        image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=600",
        features: ["Private lactation suites", "Grief counselling spaces", "Quiet rest environments"]
      }
    ]
  }
];

export default function Facilities() {
  const [activeTab, setActiveTab] = useState<string>("emergency");

  // Handle smooth scroll navigation
  const scrollToCategory = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 140; // Offset for sticky horizontal navigation
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Scrollspy effect to update active states
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = 0; i < CATEGORIES.length; i++) {
        const cat = CATEGORIES[i];
        const el = document.getElementById(cat.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveTab(cat.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="pt-28 pb-24 bg-white relative">
      {/* Background Subtle Gradient Glows */}
      <div className="absolute top-0 right-0 w-[50%] h-[600px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[35%] h-[500px] bg-teal-500/3 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Header Section */}
      <div className="container-custom py-12 md:py-16 relative z-10">
        <div className="max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1.5 w-6 bg-brand-primary rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-brand-primary">Clinical Wings</span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-light text-brand-dark mb-6 leading-[1.05] tracking-tight">
            Our Healthcare <span className="text-brand-primary italic font-normal">Facilities & Services.</span>
          </h1>
          <p className="text-slate-500 text-sm sm:text-base md:text-lg max-w-3xl leading-relaxed">
            A comprehensive overview of our clinical setup, emergency rooms, surgical theatres, fertility divisions, and supporting diagnostics operating across the network.
          </p>
        </div>
      </div>

      {/* Clinical Stats Ribbon */}
      <section className="bg-slate-50 border-y border-slate-200/50 py-10 mb-16 relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            {[
              { label: "Critical Care", value: "24/7 Response", desc: "Emergency operation theatres, labor wards, and ambulance services." },
              { label: "Neonatal ICU", value: "Level III NICU", desc: "Stabilization, incubators, and care for premature infants." },
              { label: "Diagnostics", value: "24/7 CT & Labs", desc: "Digital radiography, computer tomography, and pathology lab options." },
              { label: "Fertility Wing", value: "IVF & Andrology", desc: "Advanced embryology lab, sperm processing, and cryo-freezing." }
            ].map((stat, i) => (
              <div key={i} className="border-r border-slate-200 last:border-0 pr-4 last:pr-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block mb-1">{stat.label}</span>
                <h4 className="text-lg font-black text-brand-dark leading-tight mb-1">{stat.value}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ────────────────────────────────────────────────────────
          STICKY HORIZONTAL TAB BAR (TRIGGERS WHEN SCROLLING DOWN)
          ──────────────────────────────────────────────────────── */}
      <div className="sticky top-16 z-30 bg-white/95 backdrop-blur-md border-y border-slate-100/80 shadow-sm py-3 mb-16 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="container-custom max-w-7xl mx-auto px-4 flex gap-2">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider self-center mr-4 hidden md:block">Navigation:</span>
          {CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={`sticky-tab-${cat.id}`}
                onClick={() => scrollToCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-white shadow-sm shadow-brand-primary/10'
                    : 'bg-slate-50 text-slate-500 hover:text-slate-800 border border-slate-200/50'
                }`}
              >
                {cat.shortTitle}
              </button>
            );
          })}
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          DETAILED SERVICE SECTIONS LISTING
          ──────────────────────────────────────────────────────── */}
      <div className="container-custom relative z-10">
        <div className="space-y-24">
          {CATEGORIES.map((cat) => {
            const CategoryIcon = cat.icon;
            return (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-32 border-b border-slate-100 pb-16 last:border-0 last:pb-0"
              >
                {/* Category Header */}
                <div className="mb-10 flex items-start gap-4">
                  <div className="h-12 w-12 bg-teal-50 border border-teal-100/60 text-brand-primary rounded-xl flex items-center justify-center shrink-0">
                    <CategoryIcon size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 leading-tight">
                      {cat.title}
                    </h2>
                    <p className="text-slate-500 text-xs sm:text-sm font-medium mt-1 leading-relaxed max-w-3xl">
                      {cat.tagline}
                    </p>
                  </div>
                </div>

                {/* 3-Column Professional Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cat.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-xl border border-slate-200/60 overflow-hidden hover:shadow-[0_12px_35px_rgba(15,23,42,0.04)] transition-all duration-300 flex flex-col group animate-once"
                    >
                      {/* Facility Image Cover */}
                      <div className="h-44 w-full overflow-hidden bg-slate-50 relative">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        {item.isEmergency && (
                          <div className="absolute top-3 right-3">
                            <span className="flex items-center gap-1 text-[8px] font-black uppercase tracking-wider text-rose-600 bg-white border border-rose-100 px-2.5 py-1 rounded-md shadow-sm">
                              <Clock size={8} className="text-rose-500" /> 24/7 Service
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Content details */}
                      <div className="p-5 flex-grow flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#0F172A] group-hover:text-brand-primary transition-colors leading-snug mb-2 font-sans">
                            {item.name}
                          </h4>
                          <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-4">
                            {item.desc}
                          </p>

                          {/* Specific Clinical Features - Added for Rich Detail */}
                          <div className="space-y-1.5 mt-3 pt-3 border-t border-slate-100/80">
                            {item.features.map((feature, fIdx) => (
                              <div key={fIdx} className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold font-sans">
                                <Check size={10} className="text-brand-primary shrink-0 stroke-[3px]" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-slate-50 flex items-center justify-between text-[9px] font-bold text-slate-300 uppercase tracking-widest">
                          <span>Clinical Resource</span>
                          <span className="text-[8px] text-brand-primary/50 group-hover:text-brand-primary transition-colors">Demo Network</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>

      {/* Emergency Call-To-Action (Bottom Sticky Strip) */}
      <section className="bg-brand-dark text-white py-12 mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_#0D9488_0%,transparent_70%)]" />
        </div>
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-brand-primary font-bold tracking-[0.3em] text-[9px] uppercase mb-2 block">Emergency Helpline</span>
              <h3 className="text-2xl md:text-3xl font-display leading-tight mb-2">Trauma & Emergency Services Available 24/7</h3>
              <p className="text-slate-400 text-xs font-normal">Immediate response coordinates for acute trauma, ambulance dispatch, and labor admissions.</p>
            </div>
            <a
              href="tel:+914272448400"
              className="h-12 px-8 bg-brand-primary text-white font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-teal-700 transition-all uppercase text-[10px] tracking-widest shadow-xl shadow-brand-primary/20"
            >
              <PhoneCall size={14} /> Call Emergency Desk
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
