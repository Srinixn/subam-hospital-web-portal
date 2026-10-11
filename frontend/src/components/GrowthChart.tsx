import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, TrendingUp, Check, Award, Building, Sparkles, Heart } from 'lucide-react';

interface GrowthNode {
  year: number;
  deliveries: string;
  avgDeliveries: number;
  title: string;
  milestone: string;
  details: string[];
  icon: any;
  color: string;
  badge?: string;
}

const growthData: GrowthNode[] = [
  {
    year: 2013,
    deliveries: "10–15",
    avgDeliveries: 12.5,
    title: "The Beginning",
    milestone: "Our journey began as a small clinical setup on Kakkapalayam Main Road, Ellampillai, with a vision to offer accessible, compassionate, and reliable medical care to our community.",
    details: [
      "Established initial clinic setup on Kakkapalayam Main Road, Ellampillai",
      "Focused on offering accessible, compassionate, and reliable medical care",
      "Built a foundation of community trust and patient-focused healthcare"
    ],
    icon: Award,
    color: "bg-teal-500 text-white",
    badge: "Foundation"
  },
  {
    year: 2015,
    deliveries: "15–20",
    avgDeliveries: 17.5,
    title: "First Expansion",
    milestone: "Expanded into a 10-bedded hospital equipped with a dedicated operation theatre. We successfully managed numerous medical cases and earned the trust of families across the region.",
    details: [
      "Expanded inpatient capacity into a 10-bedded hospital facility",
      "Commissioned a dedicated, fully-equipped operation theatre",
      "Established clinical trust through successful management of acute cases"
    ],
    icon: Heart,
    color: "bg-orange-500 text-white"
  },
  {
    year: 2017,
    deliveries: "30–40",
    avgDeliveries: 35,
    title: "Multi-Specialty Transformation",
    milestone: "Transformed into a 50-bedded multi-specialty facility with dual operation theatres, deluxe patient rooms, a fully functional OT complex, advanced laboratory services, a well-equipped labour ward, 24/7 pharmacy, and ultrasound scanning.",
    details: [
      "Completed expansion to a 50-bedded multi-specialty facility",
      "Added dual operation theatres, fully functional OT complexes, and laboratory services",
      "Accredited DNB course with 4 seats in Obstetrics & Gynaecology"
    ],
    icon: Building,
    color: "bg-violet-500 text-white",
    badge: "50-Bed Expansion"
  },
  {
    year: 2020,
    deliveries: "50–60",
    avgDeliveries: 55,
    title: "Neonatal Care & Pediatric Upgrades",
    milestone: "Introduced advanced neonatal intensive care services (Level III NICU) and expanded clinical expert panels.",
    details: [
      "Established advanced Level III NICU for specialized neonatal care",
      "Expanded core panel of consultant pediatricians and clinical staff",
      "Implemented low-radiation diagnostic scanning protocols for safety"
    ],
    icon: TrendingUp,
    color: "bg-blue-500 text-white"
  },
  {
    year: 2024,
    deliveries: "80–90",
    avgDeliveries: 85,
    title: "Example Speciality Hospital",
    milestone: "Launched Example Speciality Hospital — equipped with modern ICU, advanced trauma care, laparoscopic surgery services, and endoscopic procedures for high-quality specialized treatment.",
    details: [
      "Launched Example Speciality Hospital to offer high-quality specialized treatment",
      "Equipped with modern Intensive Care Units and advanced trauma care setups",
      "Introduced advanced laparoscopic surgery services and endoscopic procedures"
    ],
    icon: Building,
    color: "bg-emerald-500 text-white",
    badge: "New Hospital"
  },
  {
    year: 2025,
    deliveries: "100–150",
    avgDeliveries: 125,
    title: "IVF Centre Launch",
    milestone: "Established our state-of-the-art IVF Centre with advanced fertility treatment technologies and experienced specialists dedicated to helping couples achieve parenthood.",
    details: [
      "Established state-of-the-art Example IVF Centre in Example City",
      "Introduced advanced fertility treatments including IVF, ICSI, and IUI",
      "Achieved clinical growth of 100–150 monthly deliveries across our network"
    ],
    icon: Sparkles,
    color: "bg-brand-secondary text-white",
    badge: "IVF Centre Launch"
  }
];

export default function GrowthChart() {
  const [selectedIdx, setSelectedIdx] = useState<number>(growthData.length - 1);
  const activeNode = growthData[selectedIdx];

  // SVG Dimension Constraints
  const svgWidth = 800;
  const svgHeight = 320;
  const paddingX = 60;
  const paddingY = 60;

  // Calculate X & Y coordinates
  const getX = (index: number) => {
    const netWidth = svgWidth - paddingX * 2;
    return paddingX + (index / (growthData.length - 1)) * netWidth;
  };

  const getY = (val: number) => {
    const netHeight = svgHeight - paddingY * 2;
    const maxVal = 150;
    // Map val from [0, 150] to [svgHeight - paddingY, paddingY]
    return (svgHeight - paddingY) - (val / maxVal) * netHeight;
  };

  // Generate paths
  const linePoints = growthData.map((d, i) => `${getX(i)},${getY(d.avgDeliveries)}`);
  const linePath = `M ${linePoints.join(' L ')}`;
  const areaPath = `M ${getX(0)},${svgHeight - paddingY} L ${linePoints.join(' L ')} L ${getX(growthData.length - 1)},${svgHeight - paddingY} Z`;

  const ActiveIcon = activeNode.icon;

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-1.5 border border-teal-200 bg-teal-50/50 text-brand-primary rounded-lg text-[9px] font-black uppercase tracking-widest mb-4 shadow-sm">
            Our Journey
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-brand-dark mb-4 leading-tight tracking-tight">
            A Decade of Growth & Milestones
          </h2>
          <p className="text-slate-500 text-xs md:text-sm font-medium leading-relaxed px-4">
            From our founding in 2013 as a dedicated maternal clinic to Example City's trusted multi-specialty healthcare network, explore our growth in monthly deliveries and medical services.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">

          {/* Left Column: Interactive SVG Chart */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-brand-dark">Monthly Deliveries Trend</h3>
                  <p className="text-xs text-slate-400 font-medium">Click on any year or node to view details</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-brand-primary" />
                  <span className="text-xs font-bold text-slate-500">Average Monthly Volume</span>
                </div>
              </div>

              {/* Chart Wrapper with horizontal overflow scroll for small mobile screens */}
              <div className="overflow-x-auto scrollbar-hide py-2">
                <div className="min-w-[640px] md:min-w-0">
                  <svg
                    viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                    className="w-full h-auto overflow-visible select-none"
                  >
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#0D9488" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#0D9488" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Y-Axis Grid Lines */}
                    {[0, 50, 100, 150].map((gridVal) => {
                      const yVal = getY(gridVal);
                      return (
                        <g key={gridVal} className="opacity-40">
                          <line
                            x1={paddingX}
                            y1={yVal}
                            x2={svgWidth - paddingX}
                            y2={yVal}
                            stroke="#CBD5E1"
                            strokeDasharray="4 4"
                            strokeWidth="1"
                          />
                          <text
                            x={paddingX - 12}
                            y={yVal + 4}
                            textAnchor="end"
                            className="text-[10px] font-bold fill-slate-400"
                          >
                            {gridVal}
                          </text>
                        </g>
                      );
                    })}

                    {/* Milestone Vertical Accent Guides */}
                    {growthData.map((d, idx) => {
                      if (!d.badge) return null;
                      const x = getX(idx);
                      const y = getY(d.avgDeliveries);
                      return (
                        <line
                          key={`guide-${d.year}`}
                          x1={x}
                          y1={paddingY - 20}
                          x2={x}
                          y2={svgHeight - paddingY}
                          stroke="#E2E8F0"
                          strokeWidth="1.5"
                          strokeDasharray="2 2"
                        />
                      );
                    })}

                    {/* Filled Area Chart */}
                    <motion.path
                      d={areaPath}
                      fill="url(#chartGrad)"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />

                    {/* Curve Line */}
                    <motion.path
                      d={linePath}
                      fill="none"
                      stroke="#0D9488"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeInOut" }}
                    />

                    {/* Interactive Milestone Markers / Nodes */}
                    {growthData.map((d, idx) => {
                      const x = getX(idx);
                      const y = getY(d.avgDeliveries);
                      const isSelected = selectedIdx === idx;

                      return (
                        <g
                          key={d.year}
                          className="cursor-pointer group"
                          onClick={() => setSelectedIdx(idx)}
                        >
                          {/* Outer Pulsing Aura for active/hover states */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? 18 : 10}
                            className={`fill-brand-primary/10 transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                          />

                          {/* Inner Circle Border */}
                          <circle
                            cx={x}
                            cy={y}
                            r={isSelected ? 8 : 6}
                            className={`transition-all duration-300 stroke-white stroke-[2px] ${isSelected ? 'fill-brand-secondary' : 'fill-brand-primary'}`}
                          />

                          {/* Data Value Tag above node */}
                          <g className={`transition-all duration-300 ${isSelected ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                            <rect
                              x={x - 35}
                              y={y - 32}
                              width="70"
                              height="20"
                              rx="6"
                              className="fill-brand-dark"
                            />
                            <text
                              x={x}
                              y={y - 19}
                              textAnchor="middle"
                              className="text-[9px] font-black fill-white"
                            >
                              {d.deliveries}/mo
                            </text>
                            {/* Down arrow path */}
                            <path
                              d={`M ${x - 4} ${y - 12} L ${x} ${y - 8} L ${x + 4} ${y - 12} Z`}
                              className="fill-brand-dark"
                            />
                          </g>

                          {/* Milestone Label Badges in the top plane */}
                          {d.badge && (
                            <g className="translate-y-[-10px]">
                              <rect
                                x={x - 45}
                                y={paddingY - 35}
                                width="90"
                                height="18"
                                rx="4"
                                className={`stroke-[1px] ${isSelected ? 'fill-brand-primary/10 stroke-brand-primary' : 'fill-white stroke-slate-200 shadow-sm'}`}
                              />
                              <text
                                x={x}
                                y={paddingY - 23}
                                textAnchor="middle"
                                className={`text-[8px] font-bold tracking-wider uppercase ${isSelected ? 'fill-brand-primary' : 'fill-slate-500'}`}
                              >
                                {d.badge}
                              </text>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* X-Axis Labels */}
                    {growthData.map((d, idx) => {
                      const x = getX(idx);
                      const isSelected = selectedIdx === idx;
                      return (
                        <text
                          key={`lbl-${d.year}`}
                          x={x}
                          y={svgHeight - paddingY + 24}
                          textAnchor="middle"
                          className={`text-xs font-bold transition-all duration-300 cursor-pointer ${isSelected ? 'fill-brand-primary scale-110' : 'fill-slate-400 hover:fill-brand-dark'
                            }`}
                          onClick={() => setSelectedIdx(idx)}
                        >
                          {d.year}
                        </text>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </div>

            {/* Timeline navigation buttons for mobile readability */}
            <div className="mt-6 flex flex-wrap justify-between items-center gap-3 pt-6 border-t border-slate-200">
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Select Year:</span>
              <div className="flex gap-1.5 sm:gap-2">
                {growthData.map((d, idx) => (
                  <button
                    key={`btn-${d.year}`}
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${selectedIdx === idx
                        ? 'bg-brand-primary text-white shadow-md shadow-brand-primary/10 scale-105'
                        : 'bg-white hover:bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                  >
                    {d.year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Detailed Milestone Information card */}
          <div className="lg:col-span-5 flex">
            <div className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm relative overflow-hidden">
              {/* Large watermark background year */}
              <div className="absolute -top-6 -right-6 font-display font-black text-8xl text-brand-primary/5 select-none pointer-events-none">
                {activeNode.year}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeNode.year}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col justify-between"
                >
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 shadow-md ${activeNode.color}`}>
                        <ActiveIcon size={22} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Timeline Milestone</span>
                          <Calendar size={12} className="text-slate-400" />
                          <span className="text-xs font-black text-brand-primary">{activeNode.year}</span>
                        </div>
                        <h3 className="text-xl font-black text-[#1E293B] mt-0.5 leading-tight">{activeNode.title}</h3>
                      </div>
                    </div>

                    {/* Stats segment */}
                    <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 mb-6 flex items-center justify-between shadow-sm">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Maternal Delivery Care</p>
                        <p className="text-lg font-black text-[#1E293B]">
                          {activeNode.deliveries} <span className="text-xs font-semibold text-slate-500">deliveries/month</span>
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Network Capacity</p>
                        <p className="text-sm font-black text-brand-primary uppercase">
                          {activeNode.badge || "Evolving wing"}
                        </p>
                      </div>
                    </div>

                    {/* Paragraph desc */}
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                      {activeNode.milestone}
                    </p>

                    {/* Achievements List */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black text-[#1E293B] uppercase tracking-widest mb-1.5 block">Key Milestones Achieved:</p>
                      {activeNode.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                            <Check size={10} className="text-brand-primary stroke-[3px]" />
                          </div>
                          <span className="text-xs font-bold text-slate-600 leading-snug">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Aesthetic Footer block in Card */}
                  <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Clinical Excellence</span>
                    <span>Est. 2013</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
