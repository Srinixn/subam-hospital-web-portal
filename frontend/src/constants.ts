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
  link: string;
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
    description: 'Personalized care throughout every stage of pregnancy — from routine check-ups to high-risk pregnancy management and safe deliveries.',
    icon: 'Baby',
    category: 'Maternal Care',
    link: '/specialities/obstetrics'
  },
  {
    id: '2',
    title: 'Gynaecology',
    description: 'Comprehensive and compassionate care for women of all ages, from adolescence through menopause and beyond.',
    icon: 'HeartPulse',
    category: "Women's Health",
    link: '/specialities/gynecology'
  },
  {
    id: '3',
    title: 'Paediatrics',
    description: 'Expert medical care for infants, children, and adolescents with a focus on growth, development, and preventive health.',
    icon: 'Stethoscope',
    category: 'Child Health',
    link: '/specialities/pediatrics'
  },
  {
    id: '4',
    title: 'Radiology',
    description: 'Advanced diagnostic imaging services including ultrasound, X-ray, and scanning for accurate medical evaluation.',
    icon: 'ScanLine',
    category: 'Diagnostics',
    link: '/specialities/radiology'
  },
  {
    id: '5',
    title: 'Antenatal Care',
    description: 'Structured pregnancy care programs with regular monitoring, nutrition guidance, and preparation for a safe delivery.',
    icon: 'ShieldCheck',
    category: 'Pregnancy Care',
    link: '/specialities/pregnancy-care'
  },
  {
    id: '6',
    title: 'Postnatal Care',
    description: 'Dedicated postpartum support for mothers and newborns, including recovery monitoring and breastfeeding guidance.',
    icon: 'Heart',
    category: 'Maternal Care',
    link: '/specialities/post-natal'
  },
  {
    id: '7',
    title: 'Fertility Care',
    description: 'Advanced reproductive medicine and IVF services with personalized treatment plans to help couples achieve parenthood.',
    icon: 'Sparkles',
    category: 'Fertility',
    link: '/specialities/fertility'
  },
  {
    id: '8',
    title: 'Newborn Care',
    description: 'Specialized neonatal care with Level III NICU capabilities for premature and critically ill newborns.',
    icon: 'Baby',
    category: 'Neonatal',
    link: '/specialities/newborn-care'
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. A. Example',
    specialty: 'Consultant General Surgeon',
    qualifications: 'MBBS, MS, FMAS, DMAS',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  },
  {
    id: '2',
    name: 'Dr. A. Example',
    specialty: 'Consultant Gynaecologist & Infertility Specialist',
    qualifications: 'MBBS, MD(OG), DRM, Fellowship in Reproductive Medicine',
    experience: '12+ Years',
    image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400',
    rating: 4.9
  }
];

export interface DepartmentDoctors {
  department: string;
  doctors: {
    id: string;
    name: string;
    role?: string;
    qualifications?: string;
    image: string;
  }[];
}

export const DEPARTMENT_DOCTORS: DepartmentDoctors[] = [
  {
    department: 'Obstetrics & Gynaecology',
    doctors: [
      {
        id: 'og-1',
        name: 'Dr. A. Example',
        role: 'Consultant Gynaecologist & Infertility Specialist',
        qualifications: 'MBBS, MD (OG), DRM (Germany), Fellowship in Reproductive Medicine (IOCG Certified)',
        image: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'og-2',
        name: 'Dr. A. Example',
        role: 'Consultant Gynaecologist & Infertility Specialist',
        qualifications: 'MBBS, DGO',
        image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Paediatrics',
    doctors: [
      {
        id: 'ped-1',
        name: 'Dr. A. Example',
        role: 'Consultant Paediatrician',
        qualifications: 'MBBS, DCH',
        image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ped-2',
        name: 'Dr. A. Example',
        role: 'Consultant Paediatrician',
        qualifications: 'MBBS, DCH',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Radiology',
    doctors: [
      {
        id: 'rad-1',
        name: 'Dr. A. Example',
        role: 'Consultant Fetal Medicine',
        qualifications: 'DMRD., DNB (RD)',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'rad-2',
        name: 'Dr. A. Example',
        role: 'Consultant Radiologist',
        qualifications: 'DMRD., DNB (RD)',
        image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'General Medicine',
    doctors: [
      {
        id: 'gm-1',
        name: 'Dr. A. Example',
        role: 'Consultant Physician & Diabetologist',
        qualifications: 'MBBS, DNB (General Medicine)',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'General Surgery',
    doctors: [
      {
        id: 'gs-1',
        name: 'Dr. A. Example',
        role: 'Consultant General, Laparoscopic & Endoscopic Surgeon',
        qualifications: 'MS, FMAS, DMAS',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Anaesthesia',
    doctors: [
      {
        id: 'ane-1',
        name: 'Dr. V. M. Sakthivel',
        role: 'Consultant Anaesthetist',
        qualifications: 'MBBS, DA',
        image: 'https://images.unsplash.com/photo-1607990283143-e81e7a2c93ab?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ane-2',
        name: 'Dr. A. Example',
        role: 'Consultant Anaesthetist',
        qualifications: 'MD, DA',
        image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Orthopaedics',
    doctors: [
      {
        id: 'ortho-1',
        name: 'Dr. A. Example',
        role: 'Joint Replacement Surgeon',
        qualifications: 'MBBS, MS (Ortho), Fellowship in Arthroscopy and Joint Replacement',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Nephrology',
    doctors: [
      {
        id: 'neph-1',
        name: 'Dr. A. Example',
        role: 'Consultant Nephrologist & Renal Transplant Physician',
        qualifications: 'MD (General Medicine), DrNB (Nephrology)',
        image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Dermatology',
    doctors: [
      {
        id: 'derm-1',
        name: 'Dr. A. Example G.',
        role: 'Consultant Dermatologist',
        qualifications: 'MD (DVL)',
        image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Cardiology',
    doctors: [
      {
        id: 'card-1',
        name: 'Dr. A. Example',
        role: 'Consultant Interventional Cardiologist',
        qualifications: 'MBBS, MD (Gen. Med.), DM (Cardiology)',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Urology',
    doctors: [
      {
        id: 'uro-1',
        name: 'Dr. A. Example A. D.',
        role: 'Consultant Urologist',
        qualifications: 'MS, M.Ch (Urology)',
        image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Psychiatry',
    doctors: [
      {
        id: 'psych-1',
        name: 'Dr. A. Example',
        role: 'Consultant Psychiatrist',
        qualifications: 'MBBS, DPM',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
      }
    ]
  },
  {
    department: 'Inhouse Doctors',
    doctors: [
      {
        id: 'ih-1',
        name: 'Dr. A. Example',
        role: 'Resident Medical Officer',
        image: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ih-2',
        name: 'Dr. A. Example',
        role: 'Resident Medical Officer',
        image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400'
      },
      {
        id: 'ih-3',
        name: 'Dr. A. Example',
        role: 'Resident Medical Officer',
        image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400'
      }
    ]
  }
];
