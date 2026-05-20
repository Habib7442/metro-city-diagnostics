import { Metadata } from 'next';
import { Suspense } from 'react';
import { services } from '@/lib/content';
import ServicesCatalog from '@/components/ServicesCatalog';
import { buildMetadata, pageSeo, jsonLdProps, organizationJsonLd } from '@/lib/seo';

// Construct page SEO metadata dynamically
export const metadata: Metadata = buildMetadata(pageSeo.services);

export default function ServicesPage() {
  return (
    <div className="bg-[#FAFAFB] py-12 md:py-20 min-h-screen">
      {/* Dynamic Organization Schema */}
      <script {...jsonLdProps(organizationJsonLd)} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-extrabold text-gold-600">
            Diagnostics Catalogue
          </span>
          <h1 className="text-4xl font-bold font-display text-navy-900 leading-tight mt-2 sm:text-5xl">
            Our Services & Health Packages
          </h1>
          <p className="text-neutral-500 mt-4 text-sm sm:text-base leading-relaxed">
            Search our extensive list of blood tests, pathology metrics, digital X-rays, pelvic/abdominal ultrasounds, and cardiology screenings. Check prep instructions, test fee details, and book your collection slot online.
          </p>
        </div>

        {/* Client-side Catalog with filters wrapped in Suspense for CSR bailout prevention */}
        <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-400">Loading Diagnostics Catalog...</div>}>
          <ServicesCatalog initialServices={services} />
        </Suspense>
      </div>
    </div>
  );
}
