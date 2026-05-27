import { Metadata } from 'next';
import { Suspense } from 'react';
import GalleryCatalog from '@/components/GalleryCatalog';
import { buildMetadata, pageSeo, jsonLdProps, organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata(pageSeo.gallery);

export default function GalleryPage() {
  return (
    <div className="bg-[#FAFAFB] py-12 md:py-20 min-h-screen">
      {/* Dynamic Organization Schema */}
      <script {...jsonLdProps(organizationJsonLd)} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase tracking-widest font-extrabold text-gold-600">
            Our Facilities
          </span>
          <h1 className="text-4xl font-bold font-display text-navy-900 leading-tight mt-2 sm:text-5xl">
            Facility Wings & Imaging Suites
          </h1>
          <p className="text-neutral-500 mt-4 text-sm sm:text-base leading-relaxed">
            Take a virtual tour of Metro-City Diagnostics. Explore our high-precision pathology laboratories, low-radiation radiography suites, high-definition sonography centers, and client lounge environments designed for optimal comfort and diagnostic precision.
          </p>
        </div>

        <Suspense fallback={<div className="text-center py-12 text-sm text-neutral-400">Loading Gallery Catalogue...</div>}>
          <GalleryCatalog />
        </Suspense>
      </div>
    </div>
  );
}
