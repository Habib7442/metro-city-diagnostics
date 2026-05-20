import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Phone, Clock, MapPin, Award, UserCheck, ShieldCheck } from 'lucide-react';
import doctorsData from '@/lib/doctors.json';
import { Button } from '@/components/ui/button';
import { buildMetadata, pageSeo, jsonLdProps, organizationJsonLd } from '@/lib/seo';
import { SITE } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Dr. Debanjali Das & Specialized Consultants — Book Appointment',
  description:
    'Book consultation appointments at Metro-City Diagnostics. Consult Dr. Debanjali Das (MD Medicine), Resident Physician, for trusted general physician healthcare in Silchar.',
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

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {doctorsData.map((entry) => {
            const waUrl = `https://wa.me/91${entry.contact.whatsapp_number}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20${encodeURIComponent(entry.doctor.name)}%20at%20Metro-City%20Diagnostics.`;

            return (
              <div
                key={entry.id}
                className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                {/* Upper Body */}
                <div className="p-6 md:p-8">
                  {/* Doctor Profile Image / Initials Avatar */}
                  <div className="flex items-center gap-4 mb-6">
                    {'image' in entry.doctor && typeof entry.doctor.image === 'string' ? (
                      <div className="relative h-16 w-16 rounded-full overflow-hidden border border-neutral-200 flex-shrink-0">
                        <Image
                          src={entry.doctor.image}
                          alt={entry.doctor.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-navy-950 flex items-center justify-center text-white font-display text-xl font-bold flex-shrink-0">
                        {entry.doctor.name
                          .split(' ')
                          .filter((n) => n !== 'Dr.')
                          .map((n) => n[0])
                          .join('')}
                      </div>
                    )}
                    <div>
                      <h2 className="text-xl font-bold text-navy-900 leading-tight">
                        {entry.doctor.name}
                      </h2>
                      <p className="text-xs font-semibold text-gold-700 tracking-wider uppercase mt-1">
                        {entry.doctor.designation}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t border-neutral-100">
                    {/* Qualification */}
                    <div className="flex gap-3">
                      <Award className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                          Qualifications
                        </span>
                        <span className="text-sm font-semibold text-neutral-700">
                          {entry.doctor.qualification.join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Specialty */}
                    <div className="flex gap-3">
                      <UserCheck className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                          Specialization
                        </span>
                        <span className="text-sm text-neutral-600">
                          {entry.doctor.specialization}
                        </span>
                      </div>
                    </div>

                    {/* Affiliation */}
                    <div className="flex gap-3">
                      <ShieldCheck className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-semibold text-neutral-400 block uppercase tracking-wider">
                          Hospital Affiliation
                        </span>
                        <span className="text-sm text-neutral-600 italic">
                          {entry.doctor.hospital_affiliation}
                        </span>
                      </div>
                    </div>

                    {/* Timing */}
                    <div className="flex gap-3 bg-neutral-50 rounded-lg p-3.5 border border-neutral-100 mt-2">
                      <Clock className="h-5 w-5 text-navy-700 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-navy-950 block uppercase tracking-wider">
                          Consultation Timings
                        </span>
                        <span className="text-xs font-medium text-neutral-500 block mt-0.5">
                          {entry.timing.days}
                        </span>
                        <span className="text-sm font-bold text-navy-900 block mt-0.5">
                          {entry.timing.time}
                        </span>
                        {entry.timing.appointment_required && (
                          <span className="inline-block mt-2 text-[10px] font-extrabold uppercase bg-gold-100 text-gold-700 px-2 py-0.5 rounded">
                            Appointment Required
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer conversion panel */}
                <div className="p-6 bg-neutral-50 border-t border-neutral-100 space-y-3">
                  <Button
                    asChild
                    className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold h-11 rounded tracking-wide shadow-sm"
                  >
                    <Link href={`/book?doctor=${entry.id}`}>Book Appointment</Link>
                  </Button>
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded border border-neutral-200 bg-white hover:bg-neutral-50 py-2.5 text-xs font-bold text-neutral-800 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-5 w-5 flex-shrink-0"
                    >
                      <path fill="#25D366" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" />
                      <path fill="#FFF" fillRule="evenodd" d="M12 4.3c-4.25 0-7.7 3.45-7.7 7.7 0 1.36.35 2.68 1.02 3.86l-1.09 3.98 4.07-1.07c1.14.62 2.43.95 3.73.95 4.25 0 7.7-3.45 7.7-7.7S16.25 4.3 12 4.3zm4.56 10.92c-.25.7-1.22 1.3-1.68 1.35-.46.05-.9-.15-2.88-.94-2.53-1.02-4.14-3.6-4.27-3.77-.12-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.1.23-.25.5-.31.67-.31.17 0 .34 0 .49.01.16.01.37-.06.58.45.21.52.73 1.78.79 1.91.06.13.1.28.01.46-.08.18-.13.3-.26.45-.13.15-.27.34-.39.46-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9.1.09.2.18.3.26 1.04.81 1.83 1.05 2.14 1.18.3.13.48.11.66-.09.18-.21.78-.91.99-1.22.2-.31.41-.26.69-.16.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
                    </svg>
                    WhatsApp Consult Inquiry
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
