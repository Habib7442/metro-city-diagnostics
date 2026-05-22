'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Clock, Award, UserCheck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DoctorCardProps {
  entry: {
    id: string;
    hospital: {
      name: string;
      tagline: string;
    };
    doctor: {
      name: string;
      qualification: string[];
      designation: string;
      hospital_affiliation?: string;
      specialization: string;
      image?: string;
    };
    location: {
      address: string;
      pin_code: string;
      city: string;
      state: string;
    };
    contact: {
      phone_numbers: string[];
      whatsapp_number: string;
    };
    timing: {
      days: string;
      time: string;
      appointment_required: boolean;
    };
    fees?: number | string | null;
    highlights?: {
      title: string;
      value: string;
    }[];
    description?: {
      english?: string;
      bengali?: string[];
    };
  };
}

export default function DoctorCard({ entry }: DoctorCardProps) {
  const waUrl = entry.id === 'ihr-opd'
    ? `https://wa.me/91${entry.contact.whatsapp_number}?text=Hello%2C%20I%20would%20like%20to%20pre-register%20and%20book%20a%20spot%20for%20the%20upcoming%20${encodeURIComponent(entry.doctor.name)}%20at%20Metro-City%20Diagnostics.`
    : `https://wa.me/91${entry.contact.whatsapp_number}?text=Hello%2C%20I%20would%20like%20to%20book%20an%20appointment%20with%20${encodeURIComponent(entry.doctor.name)}%20at%20Metro-City%20Diagnostics.`;

  return (
    <div className="bg-[#FAFAFB] rounded-lg border border-neutral-200 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow group/card h-full">
      {/* Upper Body */}
      <div className="p-6 md:p-8 flex-grow flex flex-col">
        {/* Doctor Profile Image / Initials Avatar */}
        <div className="flex items-center gap-4 mb-4">
          {entry.doctor.image ? (
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
            <h3 className="text-lg font-bold text-navy-900 leading-tight group-hover/card:text-gold-700 transition-colors">
              {entry.doctor.name}
            </h3>
            <p className="text-xs font-semibold text-gold-700 tracking-wider uppercase mt-1">
              {entry.doctor.designation}
            </p>
          </div>
        </div>

        {/* Details stack - packed tightly at the top */}
        <div className="space-y-4 pt-4 border-t border-neutral-200/60 mt-2">
          {/* Consultation Fee Pill */}
          <div className="flex items-center">
            {typeof entry.fees === 'string' ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                CONSULTATION FEE: {entry.fees}
              </span>
            ) : entry.fees === null ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500 uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                CONSULTATION FEE: Contact for pricing
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                CONSULTATION FEE: ₹{entry.fees || 500}
              </span>
            )}
          </div>

          {/* Specialty */}
          <div className="flex gap-3">
            <UserCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase tracking-wider">
                Specialization
              </span>
              <span className="text-xs text-neutral-600">
                {entry.doctor.specialization}
              </span>
            </div>
          </div>

          {/* Timings Section */}
          <div className="flex gap-3 bg-white rounded-lg p-3.5 border border-neutral-200/50">
            <Clock className="h-4.5 w-4.5 text-navy-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-bold text-navy-950 block uppercase tracking-wider">
                Timings
              </span>
              <span className="text-[11px] font-medium text-neutral-500 block mt-0.5">
                {entry.timing.days}
              </span>
              <span className="text-xs font-bold text-navy-900 block mt-0.5">
                {entry.timing.time}
              </span>
              {entry.timing.appointment_required && (
                <span className="inline-block mt-2 text-[9px] font-extrabold uppercase bg-gold-100 text-gold-700 px-2 py-0.5 rounded">
                  Appointment Required
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Credentials & Info Details (Displayed Static & Always Visible) */}
        <div className="mt-6 pt-4 border-t border-neutral-200/60 w-full space-y-4">
          {/* Qualifications */}
          <div className="flex gap-3">
            <Award className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase tracking-wider">
                Qualifications
              </span>
              <span className="text-xs font-semibold text-neutral-700">
                {entry.doctor.qualification.join(', ')}
              </span>
            </div>
          </div>

          {/* Affiliation */}
          <div className="flex gap-3">
            <ShieldCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-semibold text-neutral-400 block uppercase tracking-wider">
                Hospital Affiliation
              </span>
              <span className="text-xs text-neutral-600 italic">
                {entry.doctor.hospital_affiliation || 'N/A'}
              </span>
            </div>
          </div>

          {/* Highlights if present */}
          {entry.highlights && Array.isArray(entry.highlights) && (
            <div className="grid grid-cols-3 gap-2 bg-navy-50/30 p-2.5 rounded-lg border border-navy-100/40">
              {entry.highlights.map((h, i) => (
                <div key={i} className="text-center">
                  <span className="block text-[9px] font-bold text-neutral-400 uppercase tracking-wider leading-none">
                    {h.title}
                  </span>
                  <span className="block text-xs font-extrabold text-navy-950 mt-1.5 leading-none">
                    {h.value}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Description if present */}
          {entry.description && (
            <div className="space-y-3 pt-2">
              {entry.description.english && (
                <p className="text-xs text-neutral-500 leading-relaxed italic text-center">
                  "{entry.description.english}"
                </p>
              )}
              {entry.description.bengali && Array.isArray(entry.description.bengali) && (
                <div className="bg-gold-50/60 border border-gold-200/40 rounded-lg p-3 text-xs text-gold-950 space-y-1.5 font-medium leading-relaxed">
                  {entry.description.bengali.map((line, i) => (
                    <p key={i} className="text-center font-display">
                      {line}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer conversion panel stays at bottom and aligns perfectly across row */}
      <div className="p-6 bg-neutral-100/50 border-t border-neutral-200/50 space-y-3 mt-auto">
        {entry.id === 'ihr-opd' ? (
          <Button
            asChild
            className="w-full bg-[#C8A24F] hover:bg-[#B38F3B] text-white font-bold h-11 rounded tracking-wide shadow-sm"
          >
            <a href={`tel:${entry.contact.phone_numbers[0]}`}>Call to Pre-register Spot</a>
          </Button>
        ) : (
          <Button
            asChild
            className="w-full bg-gold-500 hover:bg-gold-600 text-white font-bold h-11 rounded tracking-wide shadow-sm"
          >
            <Link href={`/book?doctor=${entry.id}`}>Book Appointment</Link>
          </Button>
        )}
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
}
