/**
 * content.ts
 * Structured content for Metro-City Diagnostics.
 *
 * Acts as a lightweight CMS — services, doctors, packages, FAQs, reviews.
 * Migrate to a headless CMS (Sanity, Payload, Contentful) when content
 * editing needs to happen outside of code.
 */

// ─────────────────────────────────────────────────────────────────────────────
// Services
// ─────────────────────────────────────────────────────────────────────────────

export type ServiceCategory =
  | 'pathology'
  | 'radiology'
  | 'cardiac'
  | 'imaging'
  | 'package';

export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  shortDescription: string;
  longDescription: string;
  price?: number; // INR
  priceNote?: string; // e.g. "Call for price"
  sampleType?: string;
  turnaroundHours?: number;
  preparation?: string[];
  relatedSlugs?: string[];
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: 'complete-blood-count',
    name: 'Complete Blood Count (CBC)',
    category: 'pathology',
    shortDescription:
      'A standard panel measuring red and white blood cells, platelets, and hemoglobin.',
    longDescription:
      'The Complete Blood Count (CBC) is a routine blood test used to screen for a wide range of conditions including anemia, infection, and many other diseases. It is one of the most frequently ordered tests and provides a snapshot of overall health.',
    price: 350,
    sampleType: 'Blood',
    turnaroundHours: 4,
    preparation: ['No fasting required', 'Stay hydrated before sample collection'],
    relatedSlugs: ['lipid-profile', 'thyroid-profile'],
    featured: true,
  },
  {
    slug: 'lipid-profile',
    name: 'Lipid Profile',
    category: 'pathology',
    shortDescription:
      'Measures cholesterol, triglycerides, HDL, and LDL to assess cardiovascular risk.',
    longDescription:
      'A Lipid Profile measures different types of fats (lipids) in your blood. It helps assess your risk for heart disease and stroke.',
    price: 600,
    sampleType: 'Blood',
    turnaroundHours: 6,
    preparation: ['12-hour overnight fast required', 'Water is allowed', 'Avoid alcohol for 24 hours'],
    relatedSlugs: ['liver-function-test', 'complete-blood-count'],
    featured: true,
  },
  {
    slug: 'thyroid-profile',
    name: 'Thyroid Profile (T3, T4, TSH)',
    category: 'pathology',
    shortDescription:
      'Evaluates thyroid gland function — T3, T4, and TSH levels.',
    longDescription:
      'A Thyroid Profile checks how well your thyroid gland is working. It measures T3, T4, and TSH hormones in the blood.',
    price: 550,
    sampleType: 'Blood',
    turnaroundHours: 6,
    preparation: ['No fasting required', 'Inform technician if on thyroid medication'],
    relatedSlugs: ['complete-blood-count'],
  },
  {
    slug: 'liver-function-test',
    name: 'Liver Function Test (LFT)',
    category: 'pathology',
    shortDescription:
      'Assesses liver health via enzymes, bilirubin, and protein levels.',
    longDescription:
      'A Liver Function Test (LFT) measures different proteins, enzymes, and substances made by the liver to evaluate liver health.',
    price: 700,
    sampleType: 'Blood',
    turnaroundHours: 6,
    preparation: ['8-hour fast recommended', 'Avoid alcohol for 24 hours'],
  },
  {
    slug: 'kidney-function-test',
    name: 'Kidney Function Test (KFT)',
    category: 'pathology',
    shortDescription:
      'Measures urea, creatinine, and electrolytes to evaluate kidney health.',
    longDescription:
      'A Kidney Function Test (KFT) is a group of blood tests that measure how well your kidneys are working.',
    price: 700,
    sampleType: 'Blood',
    turnaroundHours: 6,
    preparation: ['No fasting required'],
  },
  {
    slug: 'x-ray',
    name: 'Digital X-Ray',
    category: 'radiology',
    shortDescription:
      'High-resolution digital X-ray imaging for chest, bones, and abdomen.',
    longDescription:
      'Our digital X-ray service provides high-resolution images with low radiation exposure. Results are typically available within an hour.',
    price: 400,
    priceNote: 'Starting from',
    turnaroundHours: 1,
    preparation: ['Wear loose-fitting clothing', 'Remove jewelry and metal objects'],
  },
  {
    slug: 'ultrasound',
    name: 'Ultrasound / Sonography',
    category: 'imaging',
    shortDescription:
      'Whole-abdomen, pelvis, obstetric, and KUB ultrasound by experienced radiologists.',
    longDescription:
      'Ultrasound uses sound waves to create images of organs and structures inside the body. Safe, painless, and radiation-free.',
    price: 1200,
    priceNote: 'Starting from',
    turnaroundHours: 2,
    preparation: ['Specific prep depends on study type — call ahead'],
    featured: true,
  },
  {
    slug: 'ecg',
    name: 'Electrocardiogram (ECG)',
    category: 'cardiac',
    shortDescription:
      'Records the electrical activity of the heart — quick and painless.',
    longDescription:
      'An ECG is a quick, painless test that records the electrical signals in your heart. It is commonly used to detect heart problems and monitor heart health.',
    price: 300,
    turnaroundHours: 1,
    preparation: ['Avoid lotions on chest area'],
  },
  {
    slug: 'full-body-checkup',
    name: 'Full-Body Health Checkup',
    category: 'package',
    shortDescription:
      'Comprehensive panel covering 60+ parameters — ideal annual checkup.',
    longDescription:
      'Our Full-Body Health Checkup package screens 60+ parameters including CBC, lipid profile, thyroid, liver and kidney function, blood sugar, and urine routine. Includes a consultation.',
    price: 2499,
    sampleType: 'Blood, Urine',
    turnaroundHours: 24,
    preparation: ['12-hour overnight fast', 'Carry photo ID', 'Avoid alcohol 24h prior'],
    featured: true,
  },
];

export const featuredServices = services.filter((s) => s.featured);

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
  badge?: string;
};

export const packages: Package[] = [
  {
    slug: 'essential',
    name: 'Essential Health',
    tagline: 'Recommended yearly for adults under 40',
    price: 1499,
    originalPrice: 2200,
    parameters: 42,
    includes: ['CBC', 'Lipid Profile', 'Blood Sugar', 'Urine Routine', 'Liver Function'],
  },
  {
    slug: 'advanced',
    name: 'Advanced Health',
    tagline: 'Comprehensive checkup for adults 40+',
    price: 2499,
    originalPrice: 3500,
    parameters: 65,
    includes: [
      'Essential package',
      'Thyroid Profile',
      'Kidney Function',
      'ECG',
      'Vitamin D, B12',
    ],
    badge: 'Most popular',
  },
  {
    slug: 'cardiac',
    name: 'Cardiac Care',
    tagline: 'For heart health screening',
    price: 3299,
    originalPrice: 4500,
    parameters: 70,
    includes: ['Advanced package', 'ECG', 'Echo (referral)', 'HbA1c', 'hs-CRP'],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Doctors / consultants
// ─────────────────────────────────────────────────────────────────────────────

export type Doctor = {
  slug: string;
  name: string;
  title: string;
  specialty: string;
  qualifications: string[];
  bio: string;
  photo: string;
};

export const doctors: Doctor[] = [
  // Placeholders — replace with actual team
  {
    slug: 'dr-placeholder-1',
    name: 'Dr. [Name]',
    title: 'Chief Pathologist',
    specialty: 'Clinical Pathology',
    qualifications: ['MBBS', 'MD (Pathology)'],
    bio: 'Over 20 years of clinical pathology experience serving the Barak Valley.',
    photo: '/team/dr-1.jpg',
  },
  {
    slug: 'dr-placeholder-2',
    name: 'Dr. [Name]',
    title: 'Consultant Radiologist',
    specialty: 'Radiology',
    qualifications: ['MBBS', 'DMRD', 'DNB (Radiology)'],
    bio: 'Specialist in ultrasound and digital imaging.',
    photo: '/team/dr-2.jpg',
  },
];

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
      'We are open Monday to Saturday from 7:00 AM to 8:00 PM, and Sunday from 7:00 AM to 1:00 PM. Sample collection is available throughout these hours.',
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
// Reviews (curated from Google reviews — pull manually for v1)
// ─────────────────────────────────────────────────────────────────────────────

export type Review = {
  author: string;
  rating: number;
  date: string; // ISO
  body: string;
  source: 'google' | 'manual';
};

export const reviews: Review[] = [
  {
    author: '[Patient name]',
    rating: 5,
    date: '2025-12-10',
    body: 'Quick service and accurate reports. Staff was very polite and the lab is clean. Highly recommend in Silchar.',
    source: 'google',
  },
  // Add 4-6 more curated reviews from Google
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
    { label: 'Pathology', href: '/services?category=pathology' },
    { label: 'Radiology', href: '/services?category=radiology' },
    { label: 'Ultrasound', href: '/services/ultrasound' },
    { label: 'Health Packages', href: '/services?category=package' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Our Doctors', href: '/doctors' },
    { label: 'Contact', href: '/contact' },
    { label: 'FAQs', href: '/faq' },
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
  { label: '4.8★ rated', sub: '824+ Google reviews' },
  { label: '20+ years', sub: 'Serving Silchar' },
  { label: 'NABL', sub: 'Quality assured' }, // verify
  { label: 'Home collection', sub: 'Free across Silchar' },
] as const;
