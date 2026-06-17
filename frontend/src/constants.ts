/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualifications: string;
  experience: string;
  image: string;
  rating: number;
}

export interface Testimonial {
  id: string;
  patientName: string;
  content: string;
  service: string;
  rating: number;
}

export const SERVICES: Service[] = [
  {
    id: '1',
    title: 'Obstetrics',
    description: 'Comprehensive care for mothers-to-be, from early pregnancy through postpartum recovery.',
    icon: 'Baby',
    category: 'Maternal Care'
  },
  {
    id: '2',
    title: 'Gynecology',
    description: 'Expert treatment for womens reproductive health at every stage of life.',
    icon: 'HeartPulse',
    category: 'Womens Health'
  },
  {
    id: '3',
    title: 'NICU',
    description: 'State-of-the-art Level III Neonatal Intensive Care Unit for our smallest patients.',
    icon: 'Stethoscope',
    category: 'Pediatrics'
  },
  {
    id: '4',
    title: 'Fertility Services',
    description: 'Advanced reproductive technologies to help you grow your family.',
    icon: 'Sparkles',
    category: 'Specialized'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Mitchell',
    specialty: 'Senior Obstetrician',
    qualifications: 'MBBS, MD (OG)',
    experience: '15+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Dr. James Wilson',
    specialty: 'Neonatologist',
    qualifications: 'MBBS, DCH, MD',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    rating: 4.8
  }
];
