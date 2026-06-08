/**
 * seo.ts
 * Centralized SEO config for Metro-City Diagnostics.
 *
 * Usage (Next.js App Router):
 *
 *   // app/layout.tsx
 *   import { defaultMetadata } from '@/lib/seo';
 *   export const metadata = defaultMetadata;
 *
 *   // app/services/page.tsx
 *   import { buildMetadata, pageSeo } from '@/lib/seo';
 *   export const metadata = buildMetadata(pageSeo.services);
 *
 *   // Render JSON-LD anywhere:
 *   import { medicalBusinessJsonLd } from '@/lib/seo';
 *   <script
 *     type="application/ld+json"
 *     dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalBusinessJsonLd) }}
 *   />
 */

import type { Metadata } from 'next';

// ─────────────────────────────────────────────────────────────────────────────
// Site constants
// ─────────────────────────────────────────────────────────────────────────────

export const SITE = {
  name: 'Metro-City Diagnostics',
  shortName: 'Metro-City',
  legalName: 'Metro-City Diagnostics',
  tagline: 'Diagnostic Centre in Silchar — Trusted Pathology & Radiology Services',
  description:
    'Metro-City Diagnostics is a trusted diagnostic centre in Meherpur, Silchar, serving the Barak Valley with accurate and affordable pathology and radiology services. ' +
    'We offer blood tests, full-body health checkup packages, X-ray, ECG, ultrasound (USG), and home sample collection across Silchar. ' +
    '4.8-star rated by 824+ patients.',
  url: 'https://metrocitydiagnostics.com',
  locale: 'en_IN',
  language: 'en-IN',
  defaultOgImage: '/og-image.jpg', // 1200x630
  themeColor: '#0A1F44', // navy.900
  twitterHandle: '@metrocitydiag', // placeholder

  contact: {
    phone: '+91-99573-57278',
    phoneDisplay: '099573 57278',
    phoneTel: 'tel:+919957357278',
    whatsapp: 'https://wa.me/919957357278',
    email: 'contact@metrocitydiagnostics.com',
  },

  address: {
    streetAddress: 'Co-operative, near Vivekananda, Meherpur, Birbal Bazar',
    addressLocality: 'Silchar',
    addressRegion: 'Assam',
    postalCode: '788015',
    addressCountry: 'IN',
  },

  geo: {
    // Approximate — replace with exact coordinates from Google Business Profile.
    latitude: 24.8333,
    longitude: 92.7789,
  },

  hours: [
    { days: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'], opens: '07:30', closes: '20:30' },
  ],

  ratings: {
    ratingValue: 4.8,
    reviewCount: 824,
    bestRating: 5,
  },

  social: {
    facebook: '', // 'https://facebook.com/metrocitydiagnostics'
    instagram: '', // 'https://instagram.com/metrocitydiagnostics'
    googleBusiness: 'https://g.page/r/CQDHJDBocAP2EBM/review',
  },
} as const;

// ─────────────────────────────────────────────────────────────────────────────
// Default <head> metadata (Next.js Metadata API)
// ─────────────────────────────────────────────────────────────────────────────

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: 'Next.js',
  keywords: [
    'diagnostic center Silchar',
    'pathology lab Silchar',
    'blood test Silchar',
    'ultrasound Silchar',
    'X-ray Silchar',
    'ECG Silchar',
    'Metro City Diagnostics',
    'Metro-City Diagnostics',
    'diagnostic center Assam',
    'health checkup Silchar',
    'home sample collection Silchar',
    'Birbal Bazar lab',
    'Meherpur diagnostics',
    'Barak Valley diagnostic',
  ],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'Health',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      'en-IN': SITE.url,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE.locale,
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [
      {
        url: SITE.defaultOgImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — diagnostic center in Silchar, Assam`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    images: [SITE.defaultOgImage],
    creator: SITE.twitterHandle,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: '', // add Google Search Console verification token
    other: {
      'msvalidate.01': '', // Bing
    },
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Per-page SEO config
// ─────────────────────────────────────────────────────────────────────────────

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  ogImage?: string;
};

export const pageSeo = {
  home: {
    title: `${SITE.name} — Diagnostic Center in Silchar`,
    description:
      'Book accurate diagnostic tests in Silchar at Metro-City Diagnostics. ' +
      'Pathology, X-ray, ultrasound, ECG, and full-body health packages with home sample collection.',
    path: '/',
    keywords: ['diagnostic center Silchar', 'pathology lab Silchar', 'blood test Silchar'],
  },
  services: {
    title: 'Services — Pathology, Radiology, ECG & More',
    description:
      'Full catalog of diagnostic services at Metro-City Diagnostics, Silchar: ' +
      'blood tests, ultrasound, X-ray, ECG, ECHO, and health packages.',
    path: '/services',
    keywords: ['diagnostic services Silchar', 'lab tests Silchar', 'ultrasound Silchar'],
  },
  about: {
    title: 'About Us',
    description:
      'Learn about Metro-City Diagnostics — Silchar\'s trusted diagnostic center serving the Barak Valley.',
    path: '/about',
    keywords: ['about Metro City Diagnostics', 'best lab in Silchar'],
  },
  doctors: {
    title: 'Our Doctors & Consultants',
    description:
      'Meet the doctors and consultants at Metro-City Diagnostics, Silchar — experienced pathologists and radiologists.',
    path: '/doctors',
    keywords: ['pathologist Silchar', 'radiologist Silchar', 'diagnostic consultant Silchar'],
  },
  book: {
    title: 'Book a Test Online',
    description:
      'Book a diagnostic test online at Metro-City Diagnostics in Silchar. ' +
      'Home sample collection available across Silchar.',
    path: '/book',
    keywords: ['book diagnostic test Silchar', 'online lab booking Silchar'],
  },
  contact: {
    title: 'Contact & Location',
    description:
      'Contact Metro-City Diagnostics: Co-operative, near Vivekananda, Meherpur, Birbal Bazar, Silchar, Assam 788015. ' +
      'Phone: 099573 57278.',
    path: '/contact',
    keywords: ['Metro City Diagnostics address', 'diagnostic center Meherpur Silchar'],
  },
  faq: {
    title: 'Frequently Asked Questions',
    description:
      'Answers to common questions about tests, reports, home collection, payment, and timings at Metro-City Diagnostics, Silchar.',
    path: '/faq',
    keywords: ['diagnostic FAQ Silchar', 'lab test questions'],
  },
  reports: {
    title: 'How to Collect Reports',
    description:
      'How to collect diagnostic reports from Metro-City Diagnostics, Silchar — in person, via WhatsApp, or email.',
    path: '/reports',
    keywords: ['diagnostic reports Silchar', 'lab report download'],
  },
  privacy: {
    title: 'Privacy Policy',
    description: 'Privacy policy for Metro-City Diagnostics website.',
    path: '/privacy',
  },
  terms: {
    title: 'Terms of Service',
    description: 'Terms of service for Metro-City Diagnostics website.',
    path: '/terms',
  },
} satisfies Record<string, PageSeo>;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Build a Next.js Metadata object from a PageSeo entry.
 * Use in `export const metadata = buildMetadata(pageSeo.services)`.
 */
export function buildMetadata(page: PageSeo): Metadata {
  const url = `${SITE.url}${page.path}`;
  const ogImage = page.ogImage ?? SITE.defaultOgImage;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      locale: SITE.locale,
      url,
      siteName: SITE.name,
      title: page.title,
      description: page.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: [ogImage],
      creator: SITE.twitterHandle,
    },
  };
}

/**
 * Generate canonical URL for a path.
 */
export function canonical(path: string): string {
  return `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD structured data
// ─────────────────────────────────────────────────────────────────────────────

const openingHoursSpecification = SITE.hours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days.map(dayCodeToName),
  opens: h.opens,
  closes: h.closes,
}));

function dayCodeToName(code: string): string {
  return {
    Mo: 'Monday',
    Tu: 'Tuesday',
    We: 'Wednesday',
    Th: 'Thursday',
    Fr: 'Friday',
    Sa: 'Saturday',
    Su: 'Sunday',
  }[code] ?? code;
}

/** Used in the homepage <head>. The "primary" entity for the business. */
export const medicalBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'MedicalClinic', 'LocalBusiness'],
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: ['Metro City Diagnostics', 'Metrocity Diagnostics'],
  description: SITE.description,
  url: SITE.url,
  telephone: SITE.contact.phone,
  email: SITE.contact.email,
  image: `${SITE.url}/og/default.png`,
  logo: `${SITE.url}/logo.png`,
  priceRange: '₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Cash, UPI, Card',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.streetAddress,
    addressLocality: SITE.address.addressLocality,
    addressRegion: SITE.address.addressRegion,
    postalCode: SITE.address.postalCode,
    addressCountry: SITE.address.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.latitude,
    longitude: SITE.geo.longitude,
  },
  openingHoursSpecification,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: SITE.ratings.ratingValue,
    reviewCount: SITE.ratings.reviewCount,
    bestRating: SITE.ratings.bestRating,
  },
  sameAs: Object.values(SITE.social).filter(Boolean),
  areaServed: [
    { '@type': 'City', name: 'Silchar' },
    { '@type': 'AdministrativeArea', name: 'Cachar' },
    { '@type': 'AdministrativeArea', name: 'Barak Valley' },
    { '@type': 'State', name: 'Assam' },
  ],
  medicalSpecialty: [
    'Pathology',
    'Radiology',
    'Cardiology',
    'DiagnosticRadiology',
    'ClinicalLaboratory',
  ],
  availableService: [
    { '@type': 'MedicalTest', name: 'Complete Blood Count (CBC)' },
    { '@type': 'MedicalTest', name: 'Lipid Profile' },
    { '@type': 'MedicalTest', name: 'Thyroid Profile' },
    { '@type': 'MedicalTest', name: 'Liver Function Test' },
    { '@type': 'MedicalTest', name: 'Kidney Function Test' },
    { '@type': 'MedicalTest', name: 'X-Ray' },
    { '@type': 'MedicalTest', name: 'Ultrasound' },
    { '@type': 'MedicalTest', name: 'ECG' },
    { '@type': 'MedicalTest', name: 'Full Body Health Checkup' },
  ],
};

/** Organization schema for non-home pages. */
export const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE.url}/#organization`,
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phone,
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['en', 'hi', 'bn', 'as'],
    },
  ],
  sameAs: Object.values(SITE.social).filter(Boolean),
};

/** WebSite schema with sitelinks search. Drop on root layout. */
export const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  inLanguage: SITE.language,
  publisher: { '@id': `${SITE.url}/#organization` },
};

/** Breadcrumb helper. */
export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: canonical(item.path),
    })),
  };
}

/** FAQPage helper — pass to the /faq page. */
export function faqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

/** MedicalTest schema for service detail pages. */
export function medicalTestJsonLd(test: {
  name: string;
  description: string;
  price?: number;
  sampleType?: string;
  preparation?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTest',
    name: test.name,
    description: test.description,
    ...(test.sampleType && { usedToDiagnose: test.sampleType }),
    ...(test.preparation && { preparation: test.preparation }),
    ...(test.price && {
      offers: {
        '@type': 'Offer',
        price: test.price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
    provider: { '@id': `${SITE.url}/#organization` },
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline helper for rendering JSON-LD in React
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns props you can spread onto a <script> tag.
 *
 *   <script {...jsonLdProps(medicalBusinessJsonLd)} />
 */
export function jsonLdProps(data: unknown) {
  return {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  } as const;
}
