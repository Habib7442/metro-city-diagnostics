'use client';

import { useState } from 'react';
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
  isHorizontal?: boolean;
}

export default function DoctorCard({ entry, isHorizontal = false }: DoctorCardProps) {
  const [isQualExpanded, setIsQualExpanded] = useState(false);
  const [isAffilExpanded, setIsAffilExpanded] = useState(false);

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const message = entry.id === 'ihr-opd'
      ? `Hello, I would like to pre-register and book a spot for the upcoming ${entry.doctor.name} at Metro-City Diagnostics.`
      : `Hello, I would like to book an appointment with ${entry.doctor.name} at Metro-City Diagnostics.`;
    const isAndroid = typeof window !== 'undefined' && /Android/i.test(navigator.userAgent);
    const isMobile = typeof window !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let url = '';
    if (isAndroid) {
      url = `intent://send?phone=91${entry.contact.whatsapp_number}&text=${encodeURIComponent(message)}#Intent;scheme=whatsapp;package=com.whatsapp;end`;
    } else if (isMobile) {
      url = `whatsapp://send?phone=91${entry.contact.whatsapp_number}&text=${encodeURIComponent(message)}`;
    } else {
      url = `https://web.whatsapp.com/send?phone=91${entry.contact.whatsapp_number}&text=${encodeURIComponent(message)}`;
    }
    
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  // Render timing section jsx helper to keep code DRY
  const renderTimings = () => (
    <div className="flex gap-3 bg-white rounded-lg p-3.5 border border-neutral-200/50 w-full">
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
  );

  // Render fees jsx helper
  const renderFees = () => {
    if (typeof entry.fees === 'string') {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-sm border border-emerald-600 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          CONSULTATION FEE: {entry.fees}
        </span>
      );
    }
    if (entry.fees === null) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-sm border border-emerald-600 uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          CONSULTATION FEE: Contact for pricing
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-700 text-white shadow-sm border border-emerald-600">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
        CONSULTATION FEE: ₹{entry.fees || 500}
      </span>
    );
  };

  const renderButtons = () => (
    <div className="space-y-3 w-full">
      {entry.id === 'ihr-opd' ? (
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded tracking-wide shadow-sm transition-all"
        >
          <a href={`tel:${entry.contact.phone_numbers[0]}`}>Call to Pre-register Spot</a>
        </Button>
      ) : (
        <Button
          asChild
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded tracking-wide shadow-sm transition-all"
        >
          <Link href={`/book?doctor=${entry.id}`}>Book Appointment</Link>
        </Button>
      )}
      <button
        type="button"
        onClick={handleWhatsAppClick}
        className="flex items-center justify-center gap-2 rounded border border-neutral-200 bg-white hover:bg-neutral-50 py-2.5 text-xs font-bold text-neutral-800 transition-colors w-full cursor-pointer"
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
      </button>
    </div>
  );

  if (isHorizontal) {
    return (
      <div className="bg-[#FAFAFB] rounded-lg border border-neutral-200 overflow-hidden shadow-sm flex flex-col md:flex-row hover:shadow-md transition-shadow group/card w-full">
        {/* Main Content Area (Left side on desktop) */}
        <div className="p-6 md:p-8 flex-grow flex flex-col justify-between md:w-2/3">
          <div>
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
                <h3 className="text-xl font-extrabold text-navy-900 leading-tight group-hover/card:text-gold-700 transition-colors sm:text-2xl font-display">
                  {entry.doctor.name}
                </h3>
                <p className="text-xs font-semibold text-gold-700 tracking-wider uppercase mt-1">
                  {entry.doctor.designation}
                </p>
              </div>
            </div>

            {/* Qualifications, Speciality & Affiliation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-5 border-y border-neutral-200/60 my-5">
              {/* Specialty */}
              <div className="flex gap-2.5">
                <UserCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                    Specialization
                  </span>
                  <span className="inline-block mt-1 text-xs font-bold text-navy-900 bg-navy-50/80 border border-navy-100/80 px-2.5 py-0.5 rounded-md shadow-sm">
                    {entry.doctor.specialization}
                  </span>
                </div>
              </div>

              {/* Qualifications */}
              <div className="flex gap-2.5">
                <Award className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                    Qualifications
                  </span>
                  {entry.doctor.qualification.length > 2 && !isQualExpanded ? (
                    <span className="text-xs font-semibold text-neutral-700 block mt-1">
                      {entry.doctor.qualification.slice(0, 2).join(', ')}...
                      <button
                        type="button"
                        onClick={() => setIsQualExpanded(true)}
                        className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline ml-1.5 focus:outline-none cursor-pointer inline"
                      >
                        Expand More
                      </button>
                    </span>
                  ) : entry.doctor.qualification.length > 2 && isQualExpanded ? (
                    <span className="text-xs font-semibold text-neutral-700 block mt-1">
                      {entry.doctor.qualification.join(', ')}
                      <button
                        type="button"
                        onClick={() => setIsQualExpanded(false)}
                        className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline ml-1.5 focus:outline-none cursor-pointer inline"
                      >
                        Show Less
                      </button>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-neutral-700 block mt-1">
                      {entry.doctor.qualification.join(', ')}
                    </span>
                  )}
                </div>
              </div>

              {/* Affiliation */}
              <div className="flex gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="min-w-0 flex-1">
                  <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                    Hospital Affiliation
                  </span>
                  {entry.doctor.hospital_affiliation ? (
                    entry.doctor.hospital_affiliation.length > 40 && !isAffilExpanded ? (
                      <span className="text-xs text-neutral-600 italic block mt-1">
                        <span className="line-clamp-1">{entry.doctor.hospital_affiliation}</span>
                        <button
                          type="button"
                          onClick={() => setIsAffilExpanded(true)}
                          className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline mt-0.5 focus:outline-none cursor-pointer inline-block"
                        >
                          Read More
                        </button>
                      </span>
                    ) : entry.doctor.hospital_affiliation.length > 40 && isAffilExpanded ? (
                      <span className="text-xs text-neutral-600 italic block mt-1">
                        {entry.doctor.hospital_affiliation}
                        <button
                          type="button"
                          onClick={() => setIsAffilExpanded(false)}
                          className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline ml-1.5 focus:outline-none cursor-pointer inline"
                        >
                          Show Less
                        </button>
                      </span>
                    ) : (
                      <span className="text-xs text-neutral-600 italic block mt-1">
                        {entry.doctor.hospital_affiliation}
                      </span>
                    )
                  ) : (
                    <span className="text-xs text-neutral-600 italic block mt-1">N/A</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Highlights if present */}
            {entry.highlights && Array.isArray(entry.highlights) && (
              <div className="grid grid-cols-3 gap-4 bg-navy-50/30 p-3.5 rounded-lg border border-navy-100/40">
                {entry.highlights.map((h, i) => (
                  <div key={i} className="text-center">
                    <span className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider leading-none">
                      {h.title}
                    </span>
                    <span className="block text-sm font-extrabold text-navy-950 mt-1.5 leading-none">
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
                  <p className="text-xs text-neutral-500 leading-relaxed italic">
                    "{entry.description.english}"
                  </p>
                )}
                {entry.description.bengali && Array.isArray(entry.description.bengali) && (
                  <div className="bg-gold-50/60 border border-gold-200/40 rounded-lg p-3 text-xs text-gold-950 space-y-1.5 font-medium leading-relaxed">
                    {entry.description.bengali.map((line, i) => (
                      <p key={i} className="font-display">
                        {line}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar/CTA Area (Right side on desktop) */}
        <div className="p-6 md:p-8 bg-neutral-100/40 border-t md:border-t-0 md:border-l border-neutral-200/50 flex flex-col justify-between items-center gap-6 md:w-1/3">
          {/* Fees Pill */}
          <div className="w-full flex justify-center md:justify-start">
            {renderFees()}
          </div>

          {/* Timings */}
          <div className="w-full">
            {renderTimings()}
          </div>

          {/* Actions */}
          <div className="w-full mt-auto">
            {renderButtons()}
          </div>
        </div>
      </div>
    );
  }

  // Otherwise, render normal vertical layout:
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
            {renderFees()}
          </div>

          {/* Specialty */}
          <div className="flex gap-3">
            <UserCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                Specialization
              </span>
              <span className="inline-block mt-1 text-xs font-bold text-navy-900 bg-navy-50/80 border border-navy-100/80 px-2.5 py-0.5 rounded-md shadow-sm">
                {entry.doctor.specialization}
              </span>
            </div>
          </div>

          {/* Timings Section */}
          {renderTimings()}
        </div>

        {/* Credentials & Info Details (Displayed Static & Always Visible) */}
        <div className="mt-6 pt-4 border-t border-neutral-200/60 w-full space-y-4">
          {/* Qualifications */}
          <div className="flex gap-3">
            <Award className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                Qualifications
              </span>
                  {entry.doctor.qualification.length > 2 && !isQualExpanded ? (
                    <span className="text-xs font-semibold text-neutral-700 block mt-1">
                      {entry.doctor.qualification.slice(0, 2).join(', ')}...
                      <button
                        type="button"
                        onClick={() => setIsQualExpanded(true)}
                        className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline ml-1.5 focus:outline-none cursor-pointer inline"
                      >
                        Expand More
                      </button>
                    </span>
                  ) : entry.doctor.qualification.length > 2 && isQualExpanded ? (
                    <span className="text-xs font-semibold text-neutral-700 block mt-1">
                      {entry.doctor.qualification.join(', ')}
                      <button
                        type="button"
                        onClick={() => setIsQualExpanded(false)}
                        className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline ml-1.5 focus:outline-none cursor-pointer inline"
                      >
                        Show Less
                      </button>
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-neutral-700 block mt-1">
                      {entry.doctor.qualification.join(', ')}
                    </span>
                  )}
            </div>
          </div>

          {/* Affiliation */}
          <div className="flex gap-3">
            <ShieldCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0 mt-0.5" />
            <div className="min-w-0 flex-1">
              <span className="text-[10px] font-semibold text-neutral-500 block uppercase tracking-wider">
                Hospital Affiliation
              </span>
              {entry.doctor.hospital_affiliation ? (
                entry.doctor.hospital_affiliation.length > 40 && !isAffilExpanded ? (
                  <span className="text-xs text-neutral-600 italic block mt-1">
                    <span className="line-clamp-1">{entry.doctor.hospital_affiliation}</span>
                    <button
                      type="button"
                      onClick={() => setIsAffilExpanded(true)}
                      className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline mt-0.5 focus:outline-none cursor-pointer inline-block"
                    >
                      Read More
                    </button>
                  </span>
                ) : entry.doctor.hospital_affiliation.length > 40 && isAffilExpanded ? (
                  <span className="text-xs text-neutral-600 italic block mt-1">
                    {entry.doctor.hospital_affiliation}
                    <button
                      type="button"
                      onClick={() => setIsAffilExpanded(false)}
                      className="text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline ml-1.5 focus:outline-none cursor-pointer inline"
                    >
                      Show Less
                    </button>
                  </span>
                ) : (
                  <span className="text-xs text-neutral-600 italic block mt-1">
                    {entry.doctor.hospital_affiliation}
                  </span>
                )
              ) : (
                <span className="text-xs text-neutral-600 italic block mt-1">N/A</span>
              )}
            </div>
          </div>

          {/* Highlights if present */}
          {entry.highlights && Array.isArray(entry.highlights) && (
            <div className="grid grid-cols-3 gap-2 bg-navy-50/30 p-2.5 rounded-lg border border-navy-100/40">
              {entry.highlights.map((h, i) => (
                <div key={i} className="text-center">
                  <span className="block text-[9px] font-bold text-neutral-500 uppercase tracking-wider leading-none">
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
      <div className="p-6 bg-neutral-100/50 border-t border-neutral-250/50 space-y-3 mt-auto">
        {renderButtons()}
      </div>
    </div>
  );
}

