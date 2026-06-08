import type { Metadata } from 'next';
import doctorsData from '@/lib/doctors.json';
import DoctorsCatalog from '@/components/DoctorsCatalog';
import { buildMetadata, jsonLdProps, organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Dr. Debanjali Das & Specialized Consultants — Book Appointment',
  description:
    'Book consultation appointments at Metro-City Diagnostics. Consult Dr. Debanjali Das (MD Medicine), Consultant Medicine Specialist, for trusted general physician healthcare in Silchar.',
  path: '/doctors',
  keywords: ['pathologist Silchar', 'radiologist Silchar', 'diagnostic consultant Silchar'],
});

export default function DoctorsPage() {
  // Structured JSON-LD organization schema
  const orgSchema = organizationJsonLd;

  return (
    <div className="bg-[#FAFAFB] py-12 md:py-20 min-h-screen">
      {/* Schema Injection */}
      <script {...jsonLdProps(orgSchema)} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-navy-50 text-navy-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
            In-House Consultations
          </span>
          <h1 className="text-4xl font-extrabold font-display text-navy-900 leading-tight sm:text-5xl mb-4">
            Our Doctors & Consultants
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed">
            Consult experienced medical practitioners at our Meherpur clinic center. We offer convenient timing slots, strict hygiene guidelines, and seamless digital report coordination.
          </p>
        </div>

        {/* Interactive Doctors Catalog */}
        <DoctorsCatalog doctors={doctorsData} />
      </div>
    </div>
  );
}
