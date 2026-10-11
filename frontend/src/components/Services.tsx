import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import * as Icons from 'lucide-react';
import { LucideProps, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DynamicIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const IconComponent = (Icons as any)[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
};

export default function Services() {
  return (
    <section id="services" className="py-12 sm:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-brand-primary font-bold tracking-widest text-xs sm:text-sm uppercase"
          >
            Our Specialities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl md:text-5xl mt-3 sm:mt-4 mb-4 sm:mb-6 leading-tight"
          >
            Comprehensive healthcare for every stage of life
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-sm sm:text-lg px-4"
          >
            From prenatal care to advanced fertility treatment, we provide specialized medical services backed by experienced professionals.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <Link
                to={service.link}
                className="card-hospital group relative overflow-hidden block h-full"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-50 flex items-center justify-center text-brand-primary mb-6 transition-colors group-hover:bg-brand-primary group-hover:text-white">
                  <DynamicIcon name={service.icon} size={24} />
                </div>
                <h3 className="text-xl mb-3">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">{service.category}</span>
                  <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-primary group-hover:translate-x-1 transition-all" />
                </div>

                <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 bg-teal-50 rounded-full opacity-50 transition-transform group-hover:scale-150 group-hover:bg-teal-100 -z-10" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
