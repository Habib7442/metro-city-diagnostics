import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Calendar, ShieldAlert } from 'lucide-react';
import { buildMetadata, pageSeo, jsonLdProps, organizationJsonLd } from '@/lib/seo';
import BookingForm from '@/components/BookingForm';

export const metadata: Metadata = buildMetadata({
  title: 'Book a Test or Appointment Online — Pathology & Consultations',
  description:
    'Book clinical blood pathology tests, digital X-rays, ultrasound scans, or general physician doctor appointments at Metro-City Diagnostics. Select free home sample collection.',
  path: '/book',
  keywords: ['book diagnostic test Silchar', 'online lab booking Silchar'],
});

export default function BookPage() {
  const orgSchema = organizationJsonLd;

  return (
    <div className="bg-[#FAFAFB] py-12 md:py-20 min-h-screen">
      {/* Schema Injection */}
      <script {...jsonLdProps(orgSchema)} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block bg-navy-50 text-navy-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
            Online Booking System
          </span>
          <h1 className="text-4xl font-extrabold font-display text-navy-900 leading-tight sm:text-5xl mb-4">
            Book Diagnostics & Appointments
          </h1>
          <p className="text-neutral-500 text-base leading-relaxed">
            Fill in the details below to request a walk-in clinic slot, consultation, or home sample collection. Our laboratory desk will call you within 30 minutes to confirm your timing slot.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl mx-auto">
          {/* Suspense Wrapper is CRITICAL to prevent static prerender issues with search parameters */}
          <Suspense
            fallback={
              <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center shadow-sm">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gold-500 mx-auto mb-4" />
                <h3 className="text-sm font-bold text-navy-950">Loading Booking System...</h3>
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
