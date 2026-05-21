/**
 * content.ts
 * Structured content for Metro-City Diagnostics.
 *
 * Dynamically generated from JSON data stores.
 */

import labtestsData from './labtests.json';

// ─────────────────────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | 'stool'
  | 'blood'
  | 'urine'
  | 'package'
  | 'sputum'
  | 'imaging';

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription: string;
  price?: number; // INR
  originalPrice?: number; // INR
  priceNote?: string; // e.g. "Call for price"
  sampleType?: string;
  turnaroundHours?: number;
  preparation?: string[];
  includes?: string[];
  tests?: string[];
  relatedSlugs?: string[];
  featured?: boolean;
};

const serviceCategoryMapping: Record<string, ServiceCategory> = {
  'Stool Test': 'stool',
  'Blood Test': 'blood',
  'Urine Test': 'urine',
  'Sputum Test': 'sputum',
  'Imaging Test': 'imaging',
};

const sampleTypeMapping: Record<ServiceCategory, string | undefined> = {
  stool: 'Stool',
  blood: 'Blood',
  urine: 'Urine',
  sputum: 'Sputum',
  imaging: undefined,
  package: 'Blood, Urine',
};

const turnaroundHoursMapping: Record<ServiceCategory, number> = {
  stool: 12,
  blood: 12,
  urine: 12,
  sputum: 12,
  imaging: 2,
  package: 24,
};

const preparationMapping: Record<string, string[]> = {
  'Stool pH Test': ['Collect in a sterile, dry container', 'Avoid contamination with urine or water'],
  'Stool Analysis Test': ['Collect in a sterile container'],
  'Occult Blood Stool Test': ['Collect in a sterile container'],
  'Stool Culture Test': ['Collect in a sterile container'],
  'Parasite Stool Test': ['Collect in a sterile container'],
  'Complete Blood Count (CBC)': ['No fasting required', 'Stay hydrated before sample collection'],
  'Blood Sugar Test': ['8-hour fasting required'],
  'Lipid Profile Test': ['12-hour overnight fast required', 'Water is allowed', 'Avoid alcohol for 24 hours'],
  'Liver Function Test': ['8-hour fast recommended', 'Avoid alcohol for 24 hours'],
  'Kidney Function Test': ['No fasting required'],
  'Thyroid Profile Test': ['No fasting required'],
  'Hemoglobin Test': ['No fasting required'],
  'Routine Urine Test': ['First morning urine sample is preferred', 'Collect in a sterile container'],
  'Urine Culture Test': ['Mid-stream clean catch sample required', 'Collect in a sterile container'],
  'Protein Urine Test': ['Collect in a sterile container'],
  'Pregnancy Urine Test': ['First morning sample is recommended for highest accuracy'],
  'Diabetes Screening': ['Fasting required (8-12 hours)'],
  'Full Body Checkup': ['12-hour overnight fast', 'Avoid alcohol 24h prior'],
  'Cardiac Risk Profile': ['12-hour overnight fast recommended'],
  'Sputum Culture Test': ['Rinse mouth with water before collecting sputum', 'Collect first morning deep-cough sample'],
  'X-Ray': ['Wear loose-fitting clothing', 'Remove jewelry and metal objects'],
  'Ultrasound': ['Specific prep depends on study type — call ahead'],
  'ECG': ['Avoid lotions on chest area'],
  'Echocardiography': ['Wear comfortable two-piece clothing'],
};

const slugOverrides: Record<string, string> = {
  'Complete Blood Count (CBC)': 'complete-blood-count',
  'Lipid Profile Test': 'lipid-profile',
  'Thyroid Profile Test': 'thyroid-profile',
  'Liver Function Test': 'liver-function-test',
  'Kidney Function Test': 'kidney-function-test',
  'X-Ray': 'x-ray',
  'Ultrasound': 'ultrasound',
  'ECG': 'ecg',
  'Full Body Checkup': 'full-body-checkup',
};

const featuredServicesList = [
  'Complete Blood Count (CBC)',
  'Lipid Profile Test',
  'Blood Sugar Test',
  'Routine Urine Test',
  'Urine Culture Test',
  'Liver Function Test',
  'Kidney Function Test',
  'Thyroid Profile Test',
  'X-Ray',
  'Ultrasound',
  'ECG',
  'Echocardiography',
];

const getSlug = (name: string) => {
  if (slugOverrides[name]) return slugOverrides[name];
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};

const parsedTests: Service[] = labtestsData.labTests.flatMap((catGroup) => {
  const categoryName = catGroup.category;
  const tsCategory = serviceCategoryMapping[categoryName] || 'blood';

  return catGroup.tests.map((test) => {
    const slug = getSlug(test.name);
    const preparation = preparationMapping[test.name] || ['No specific preparation required'];
    const sampleType = sampleTypeMapping[tsCategory];
    const turnaroundHours = turnaroundHoursMapping[tsCategory];
    const featured = featuredServicesList.includes(test.name);

    return {
      slug,
      name: test.name,
      category: tsCategory,
      shortDescription: test.description,
      longDescription: test.description,
      price: test.price || undefined,
      priceNote: test.price ? (test.unit === 'per test' ? undefined : test.unit) : 'Call for price',
      sampleType,
      turnaroundHours,
      preparation,
      featured,
    };
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Health packages
// ─────────────────────────────────────────────────────────────────────────────

export type Package = {
  slug: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  parameters: number;
  includes: string[];
  tests?: string[];
  badge?: string;
  featured?: boolean;
  offerPrice?: number;
};

export const packages: Package[] = [
  {
    slug: 'mm673',
    name: 'MM B2B SILVER',
    tagline: 'Essential health screening with 7 key test profiles',
    price: 1100,
    originalPrice: 2940,
    parameters: 7,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart', 'Thyroid'],
    tests: [
      'Haemogram',
      'Glucose (F)',
      'HbA1c',
      'LFT 2',
      'RFT Profile - Mini',
      'Lipid Profile',
      'Thyroid Profile - 1',
    ],
    badge: 'Silver Package',
    featured: true,
  },
  {
    slug: 'mm674',
    name: 'MM B2B GOLD',
    tagline: 'Comprehensive health profile with 8 key test profiles',
    price: 1200,
    originalPrice: 3180,
    parameters: 8,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart', 'Thyroid', 'Bone Infection'],
    tests: [
      'Haemogram',
      'Glucose (F)',
      'LFT 2',
      'RFT Profile - Mini',
      'Lipid Profile',
      'Thyroid Profile - 1',
      'Calcium',
      'ESR',
    ],
    badge: 'Gold Package',
    featured: true,
  },
  {
    slug: 'mm675',
    name: 'MM B2B PLATINUM',
    tagline: 'Premium full body checkup with Vitamin D & B12 screening',
    price: 2200,
    originalPrice: 5714,
    parameters: 7,
    includes: ['Anemia', 'Liver', 'Kidney', 'Heart', 'Thyroid', 'Bone', 'Vitamin Deficiency'],
    tests: [
      'Haemogram',
      'Vitamin B12',
      'LFT 2',
      'RFT Profile - Mini',
      'Lipid Profile',
      'TSH',
      'Vitamin D',
    ],
    badge: 'Platinum Package',
    featured: true,
  },
  {
    slug: 'truhealth-expert',
    name: 'TruHealth Expert',
    tagline: 'Comprehensive full body screening with 110 parameters & 12 key profiles',
    price: 6000,
    originalPrice: 23940,
    parameters: 110,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Infection', 'Kidney', 'Heart', 'Bone', 'Thyroid', 'Hormones', 'Cancer', 'Pancreas', 'Allergy'],
    tests: [
      'CBC', 'Vit B-12', 'Iron Studies',
      'Glucose (F)', 'HbA1c', 'Glucose (PP)', 'Insulin (F)',
      'SGPT', 'SGOT', 'Bilirubin-Total', 'Bilirubin-Direct', 'Bilirubin-Indirect', 'Proteins-Total', 'Albumin', 'Globulin', 'Alkaline Phosphatase', 'GGT', 'LDH',
      'ESR',
      'Creatinine', 'Urine-Routine Examination', 'BUN', 'Uric Acid', 'Sodium', 'Potassium', 'Chlorides', 'GFR with Creatinine', 'Microalbumin/Creatinine Ratio',
      'Lipid Profile', 'CPK', 'hsCRP', 'Apolipoproteins (A1/B)', 'Homocysteine', 'Cortisol',
      'Calcium', 'Phosphorus', '25 OH Vitamin D', 'RA Test for Arthritis',
      'TSH', 'FT3', 'FT4',
      'FSH (Female)',
      'CEA', 'PSA (Male)', 'CA-15.3 (Female)',
      'Amylase', 'Lipase',
      'IgE Total'
    ],
    badge: 'Expert Package',
    featured: true,
    offerPrice: 10200,
  },
  {
    slug: 'truhealth-proactive',
    name: 'TruHealth ProActive',
    tagline: 'Advanced health checkup with 104 key diagnostic parameters',
    price: 5000,
    originalPrice: 19530,
    parameters: 104,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Infection', 'Kidney', 'Heart', 'Bone', 'Thyroid', 'Pancreas', 'Hormones'],
    tests: ['CBC', 'HbA1c', 'LFT', 'RFT', 'Lipid Profile', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12', 'Amylase', 'Lipase'],
    badge: 'ProActive Package',
    featured: false,
    offerPrice: 8500,
  },
  {
    slug: 'truhealth-active',
    name: 'TruHealth Active',
    tagline: 'Vital full body screening with 98 key diagnostic parameters',
    price: 4000,
    originalPrice: 16320,
    parameters: 98,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Infection', 'Kidney', 'Heart', 'Bone', 'Thyroid', 'Pancreas'],
    tests: ['CBC', 'HbA1c', 'LFT', 'RFT', 'Lipid Profile', 'Thyroid Profile', 'Calcium', 'Amylase', 'Lipase'],
    badge: 'Active Package',
    featured: true,
    offerPrice: 6800,
  },
  {
    slug: 'truhealth-vital-plus',
    name: 'TruHealth Vital Plus',
    tagline: 'Enhanced vital organ checkup covering 84 parameters',
    price: 3300,
    originalPrice: 9765,
    parameters: 84,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Infection', 'Kidney', 'Heart', 'Bone', 'Thyroid'],
    tests: ['CBC', 'Glucose', 'LFT', 'RFT', 'Lipid Profile', 'TSH', 'Calcium', 'ESR'],
    badge: 'Vital Plus Package',
    featured: false,
    offerPrice: 5610,
  },
  {
    slug: 'truhealth-vital',
    name: 'TruHealth Vital',
    tagline: 'Essential daily vitals profile covering 82 parameters',
    price: 2500,
    originalPrice: 9245,
    parameters: 82,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Infection', 'Kidney', 'Heart', 'Bone', 'Thyroid'],
    tests: ['CBC', 'Glucose', 'LFT Mini', 'RFT Mini', 'Lipid Profile', 'TSH', 'Calcium'],
    badge: 'Vital Package',
    featured: false,
    offerPrice: 4250,
  },
  {
    slug: 'truhealth-essential',
    name: 'TruHealth Essential',
    tagline: 'Foundational health assessment covering 49 parameters',
    price: 1700,
    originalPrice: 7000,
    parameters: 49,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart', 'Thyroid'],
    tests: ['CBC', 'Glucose', 'LFT Mini', 'Creatinine', 'Lipid Profile', 'TSH'],
    badge: 'Essential Package',
    featured: false,
  },
  {
    slug: 'truhealth-basic',
    name: 'TruHealth Basic',
    tagline: 'Primary screening covering 44 essential parameters',
    price: 1000,
    originalPrice: 4040,
    parameters: 44,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart'],
    tests: ['CBC', 'Glucose', 'Creatinine', 'Cholesterol', 'SGPT'],
    badge: 'Basic Package',
    featured: true,
  },
  {
    slug: 'truhealth-champ-1',
    name: 'TruHealth Champ 1',
    tagline: 'Foundational health screening for children & youth covering 35 parameters',
    price: 675,
    originalPrice: 1810,
    parameters: 35,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart', 'Thyroid'],
    tests: [
      'CBC - Haemogram',
      'Glucose (F)',
      'SGOT',
      'SGPT',
      'Creatinine',
      'Uric Acid',
      'Calcium',
      'Cholesterol-Total',
      'Triglycerides',
      'TSH',
      'Free T3',
      'Free T4'
    ],
    badge: 'Champ 1 Package',
    featured: false,
  },
  {
    slug: 'truhealth-champ-2',
    name: 'TruHealth Champ 2',
    tagline: 'Comprehensive health screening for children & youth covering 46 parameters',
    price: 750,
    originalPrice: 2605,
    parameters: 46,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart', 'Thyroid'],
    tests: [
      'CBC - Haemogram',
      'Glucose (F)',
      'SGOT',
      'SGPT',
      'Bilirubin (Total)',
      'Bilirubin (Direct)',
      'Bilirubin (Indirect)',
      'Creatinine',
      'Uric Acid',
      'Calcium',
      'Cholesterol-Total',
      'Triglycerides',
      'HDL',
      'LDL',
      'Non HDL',
      'VLDL',
      'TSH',
      'Free T3',
      'Free T4'
    ],
    badge: 'Champ 2 Package',
    featured: false,
  },
  {
    slug: 'truhealth-champ-3',
    name: 'TruHealth Champ 3',
    tagline: 'Advanced health screening for children & youth covering 53 parameters',
    price: 900,
    originalPrice: 3830,
    parameters: 53,
    includes: ['Anemia', 'Diabetes', 'Liver', 'Kidney', 'Heart', 'Thyroid'],
    tests: [
      'CBC - Haemogram',
      'Glucose (F)',
      'HbA1c',
      'SGOT',
      'SGPT',
      'Bilirubin (Total)',
      'Bilirubin (Direct)',
      'Bilirubin (Indirect)',
      'Proteins (Total)',
      'Albumin',
      'Globulin',
      'Creatinine',
      'Uric Acid',
      'Calcium',
      'Cholesterol-Total',
      'Triglycerides',
      'HDL',
      'LDL',
      'Non HDL',
      'VLDL',
      'TSH',
      'Free T3',
      'Free T4'
    ],
    badge: 'Champ 3 Package',
    featured: false,
  },
];

// Map packages to services so they are searchable, viewable, and bookable
const mappedPackages: Service[] = packages.map((pkg) => {
  const includesText = pkg.includes.join(', ');
  const testsText = pkg.tests ? pkg.tests.join(', ') : includesText;
  
  return {
    slug: pkg.slug,
    name: pkg.name,
    category: 'package',
    shortDescription: `${pkg.tagline}. Covers: ${includesText}.`,
    longDescription: `A full body diagnostic screening package: ${pkg.tagline}. This package covers ${pkg.parameters} key diagnostic profiles evaluating your: ${includesText}. Included tests: ${testsText}.`,
    price: pkg.price,
    originalPrice: pkg.originalPrice,
    priceNote: pkg.originalPrice ? `Save ₹${pkg.originalPrice - pkg.price}` : undefined,
    sampleType: 'Blood, Urine',
    turnaroundHours: 24,
    preparation: [
      '12-hour overnight fasting required (water is permitted)',
      'Avoid alcohol and heavy/fatty meals for 24 hours prior to sample collection',
      'First morning urine sample may be required'
    ],
    includes: pkg.includes,
    tests: pkg.tests,
    featured: pkg.featured || false,
  };
});

export const services: Service[] = [...parsedTests, ...mappedPackages];

export const featuredServices = services.filter((s) => s.featured);


// ─────────────────────────────────────────────────────────────────────────────
// FAQ
// ─────────────────────────────────────────────────────────────────────────────

export type Faq = {
  question: string;
  answer: string;
  category: 'general' | 'booking' | 'reports' | 'home-collection' | 'payment';
};

export const faqs: Faq[] = [
  {
    category: 'general',
    question: 'What are your opening hours?',
    answer:
      'We are open Monday to Saturday from 7:30 AM to 8:30 PM, and Closed on Sunday. Sample collection is available throughout these hours.',
  },
  {
    category: 'booking',
    question: 'Do I need to book an appointment?',
    answer:
      'Walk-ins are welcome, but booking ahead reduces wait time and guarantees a sample collection slot. Book online or call 099573 57278.',
  },
  {
    category: 'reports',
    question: 'How will I receive my reports?',
    answer:
      'Reports are available by WhatsApp, email, or in-person pickup. Most reports are ready within 24 hours; some specialized tests may take longer.',
  },
  {
    category: 'home-collection',
    question: 'Do you offer home sample collection?',
    answer:
      'Yes — we offer home sample collection across Silchar city. A small additional fee applies. Book through the website or call us.',
  },
  {
    category: 'payment',
    question: 'What payment methods do you accept?',
    answer: 'Cash, UPI (all apps), debit/credit cards, and net banking are accepted.',
  },
  {
    category: 'general',
    question: 'Are you NABL accredited?',
    answer:
      '[Update with actual accreditation status.] We follow strict quality protocols and participate in external quality assurance programs.',
  },
  {
    category: 'booking',
    question: 'Can I cancel or reschedule my booking?',
    answer:
      'Yes, free of charge — call us at least 2 hours before your scheduled time at 099573 57278.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Reviews (from JustDial — 5.0 rating, 323+ reviews)
// ─────────────────────────────────────────────────────────────────────────────

export type Review = {
  author: string;
  rating: number;
  date: string; // ISO
  body: string;
};

export const reviews: Review[] = [
  {
    author: 'Suman Goala',
    rating: 5,
    date: '2025-10-16',
    body: 'Accurate testing\nDetailed reports\nClean rooms\nEasy booking\nQuick service\nReasonably priced\nSubsidies available\nWell connected\nEasily accessible\nMy experience at Metro-City Di...',
  },
  {
    author: 'Mondira Paul',
    rating: 5,
    date: '2025-10-14',
    body: 'Subsidies available\nReasonably priced\nClean rooms\nMetro-City Diagnostics is truly a gem among pathology labs. The subsidies they offer make quality healthcare accessible to all.',
  },
  {
    author: 'Kunal Shinde',
    rating: 5,
    date: '2025-09-04',
    body: 'Detailed reports\nFriendly staff\nMetro-City Diagnostics offers detailed reports that are clear and easy to understand.',
  },
  {
    author: 'Angad Singh',
    rating: 5,
    date: '2025-09-04',
    body: 'Friendly staff\nQuick service\nMetro-City Diagnostics is a great place! The staff are very friendly and helpful.',
  },
  {
    author: 'Soumya Shrivastava',
    rating: 5,
    date: '2025-09-04',
    body: 'Friendly staff\nQuick service\nThey made me feel comfortable during my tests. I did not wait long, and they explained everything clearly.',
  },
  {
    author: 'Trisha Chauhan',
    rating: 5,
    date: '2025-09-04',
    body: 'Quick service\nClean rooms\nThe lab is exceptionally well-connected, with a streamlined communication system that ensures quick results.',
  },
  {
    author: 'Rahul Chauhan',
    rating: 5,
    date: '2025-09-04',
    body: 'Reasonably priced\nSubsidies available\nThe lab offers various financial assistance programs that make essential diagnostic services more accessible.',
  },
  {
    author: 'Nitin Singh',
    rating: 5,
    date: '2025-09-04',
    body: 'Accurate testing\nClean rooms\nIt is well-equipped with modern machines and tools. The staff is friendly and helps everyone.',
  },
  {
    author: 'Utkarsh Sharma',
    rating: 5,
    date: '2025-09-04',
    body: 'Friendly staff\nDetailed reports\nThe staff was friendly and helped me quickly. The place was clean and organized.',
  },
  {
    author: 'Aneet Padda',
    rating: 5,
    date: '2025-09-04',
    body: 'Easily accessible\nQuick service\nThe lab is easily accessible, with ample parking. Upon arrival, the staff were welcoming and efficient.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Packages', href: '/services?category=package' },
  { label: 'Doctors', href: '/doctors' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export const footerNav = {
  services: [
    { label: 'Blood Tests', href: '/services?category=blood' },
    { label: 'Urine Tests', href: '/services?category=urine' },
    { label: 'Imaging & Scans', href: '/services?category=imaging' },
    { label: 'Health Packages', href: '/services?category=package' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    { label: 'Contact', href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Trust badges
// ─────────────────────────────────────────────────────────────────────────────

export const trustBadges = [
  { label: '5.0★ rated', sub: '323+ JustDial reviews' },
  { label: '20+ years', sub: 'Serving Silchar' },
  { label: 'NABL', sub: 'Quality assured' }, // verify
  { label: 'Home collection', sub: 'Free across Silchar' },
] as const;
