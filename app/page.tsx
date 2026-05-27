'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  ChevronRight,
  UserCheck,
  CheckCircle2,
  Award,
  Quote,
} from 'lucide-react';
import { featuredServices, reviews } from '@/lib/content';
import { SITE } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import doctorsData from '@/lib/doctors.json';
import { cn } from '@/lib/utils';

// Helper to parse review body (separate tags from comments)
const parseReviewBody = (body: string) => {
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
  const knownTags = [
    'Accurate testing',
    'Detailed reports',
    'Clean rooms',
    'Easy booking',
    'Quick service',
    'Reasonably priced',
    'Subsidies available',
    'Well connected',
    'Easily accessible',
    'Friendly staff'
  ];

  const tags: string[] = [];
  const commentLines: string[] = [];

  lines.forEach(line => {
    if (knownTags.includes(line)) {
      tags.push(line);
    } else {
      commentLines.push(line);
    }
  });

  return {
    tags,
    comment: commentLines.join(' ')
  };
};

// Helper to get beautiful dynamic gradients for avatars based on author name
const getAvatarGradient = (name: string) => {
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradients = [
    'from-blue-600 to-indigo-700',
    'from-emerald-600 to-teal-700',
    'from-purple-600 to-indigo-700',
    'from-rose-500 to-red-600',
    'from-amber-500 to-gold-600',
    'from-violet-600 to-purple-800',
    'from-sky-500 to-blue-700',
  ];
  return gradients[hash % gradients.length];
};

const GALLERY_THUMBNAILS = [
  '/assets/gallery/1.webp',
  '/assets/gallery/2.webp',
  '/assets/gallery/3.webp',
  '/assets/gallery/4.webp',
];

export default function Home() {
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});
  return (
    <div className="flex flex-col w-full bg-[#FAFAFB]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-white lg:py-28">
        {/* Background micro-graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,79,0.15),transparent_50%)]" />
        <div className="absolute -left-48 top-12 h-96 w-96 rounded-full bg-navy-500/10 blur-3xl" />

        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Hero Content */}
            <div className="space-y-6 lg:col-span-7">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-gold-300 backdrop-blur-sm border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
                <span>Your Trusted Health Partner in Silchar</span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Accurate Diagnostics, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                  Trusted Care
                </span>{' '}
                for Silchar
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Metro-City Diagnostics delivers high-precision blood work, pathology tests, digital X-rays, and obstetric/pelvic ultrasounds. Experience patient-first diagnostics with convenient home sample collection across Cachar.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  asChild
                  className="bg-blue-600 font-semibold text-white hover:bg-blue-700 hover:shadow-lg transition-all rounded px-8 h-12 text-base w-full sm:w-auto"
                >
                  <Link href="/book" id="hero-cta-book">
                    Book Home Collection
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold rounded px-8 h-12 text-base w-full sm:w-auto"
                >
                  <Link href="/services" id="hero-cta-services">
                    Browse Services
                  </Link>
                </Button>
              </div>

              {/* Key Trust highlights */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">EQAS Standard Certified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">Smart Digital Reports</span>
                </div>
                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">Home Sample Pickup</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[520px] lg:max-w-none">
                {/* Premium double-layered border frame */}
                <div className="relative p-2 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-2xl shadow-gold-500/5">
                  <div className="relative aspect-[3/2] w-full rounded-xl overflow-hidden shadow-lg shadow-gold-500/10 isolate">
                    <Image
                      src="/assets/metro-city-diagnostics-exterior.png"
                      alt="Metro-City Diagnostics Clinic Entrance, Silchar"
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      priority
                      className="object-cover object-top rounded-xl animate-fade-in"
                    />
                    {/* Absolute gold border overlay to force perfect rounded corners */}
                    <div className="absolute inset-0 rounded-xl border-[3px] border-gold-500/90 pointer-events-none z-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Continuous Scrolling Gallery (Full-Width) */}
          <div className="border-t border-white/10 pt-8 mt-12 sm:mt-16">
            <span className="text-[10px] font-bold text-gold-400 uppercase tracking-widest block mb-4 text-center sm:text-left">
              Facility Walkthrough & Patient Care Gallery
            </span>
            <div className="relative overflow-hidden w-full rounded-xl bg-white/5 border border-white/10 p-2.5 backdrop-blur-sm">
              {/* Left and Right Fade Gradients */}
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-navy-950 to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-navy-950 to-transparent pointer-events-none z-10" />
              
              <div className="flex overflow-hidden w-full">
                <div className="flex gap-4 animate-marquee-ltr min-w-max">
                  {/* Quad rendering for longer track (since container is wider now) */}
                  {[...GALLERY_THUMBNAILS, ...GALLERY_THUMBNAILS, ...GALLERY_THUMBNAILS, ...GALLERY_THUMBNAILS].map((src, idx) => (
                    <div
                      key={idx}
                      className="relative w-[180px] h-[112px] flex-shrink-0 rounded-lg overflow-hidden border-2 border-gold-500/80 shadow-md shadow-black/40 hover:scale-[1.04] hover:border-gold-400 transition-all duration-300 group cursor-pointer"
                    >
                      <Image
                        src={src}
                        alt={`Clinic facility preview ${idx + 1}`}
                        width={180}
                        height={112}
                        className="object-cover rounded-md w-full h-full"
                      />
                      {/* Inner overlay on hover */}
                      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Patient Workflow Section */}
      <section className="py-20 lg:py-28 bg-[#FAFAFB]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
              Simple Diagnostics
            </span>
            <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
              How Home Sample Collection Works
            </h2>
            <p className="text-sm text-neutral-500 mt-4">
              Get tested from the comfort of your home in 3 simple steps. No long queues, no wait times.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200/50 shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-gold-100 transition-colors">
                01
              </span>
              <div className="bg-navy-50 h-12 w-12 rounded-full flex items-center justify-center text-navy-950 mb-6 font-semibold">
                <Calendar className="h-5 w-5 text-navy-800" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-3">1. Book Your Test</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Select your required test or health checkup package online, or call us at{' '}
                <span className="font-bold text-navy-900">{SITE.contact.phoneDisplay}</span> to book a convenient time.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200/50 shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-gold-100 transition-colors">
                02
              </span>
              <div className="bg-navy-50 h-12 w-12 rounded-full flex items-center justify-center text-navy-950 mb-6 font-semibold">
                <UserCheck className="h-5 w-5 text-navy-800" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-3">2. Professional Collection</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Our certified, experienced phlebotomist visits your home or office following strict hygiene standards to collect your blood sample.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200/50 shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-gold-100 transition-colors">
                03
              </span>
              <div className="bg-navy-50 h-12 w-12 rounded-full flex items-center justify-center text-navy-950 mb-6 font-semibold">
                <ShieldCheck className="h-5 w-5 text-navy-800" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-3">3. Digital Reports</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Samples are processed at our modern lab. Verified digital reports are sent directly to your WhatsApp and email within 12-24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3.5 Specialist Consultants Section */}
      <section className="py-20 lg:py-28 bg-white border-y border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Meet Our Experts
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
                Specialist Consultants
              </h2>
              <p className="text-sm text-neutral-500 mt-2 max-w-xl">
                Consult with experienced medical specialists and directors at Metro-City Diagnostics.
              </p>
            </div>
            <Link
              href="/doctors"
              className="inline-flex items-center text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors group"
              id="view-all-doctors-top"
            >
              View all doctors
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Doctors Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {doctorsData.slice(0, 6).map((entry) => {
              return (
                <div
                  key={entry.id}
                  className="bg-[#FAFAFB] rounded-lg border border-neutral-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group/card"
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
                        <h3 className="text-lg font-bold text-navy-900 leading-tight group-hover/card:text-gold-600 transition-colors">
                          {entry.doctor.name}
                        </h3>
                        <p className="text-xs font-semibold text-gold-700 tracking-wider uppercase mt-1">
                          {entry.doctor.designation}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-neutral-200/60">
                      {/* Consultation Fee Pill */}
                      <div className="flex items-center">
                        {typeof entry.fees === 'string' ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500 uppercase tracking-wider">
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                            Consultation Fee: {entry.fees}
                          </span>
                        ) : entry.fees === null ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500 uppercase tracking-wider">
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                            Consultation Fee: Contact for Pricing
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500 uppercase tracking-wider">
                            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
                            Consultation Fee: ₹{entry.fees !== undefined && entry.fees !== null ? entry.fees : 500}
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
                          <span className="inline-block mt-1 text-xs font-bold text-navy-900 bg-navy-50/80 border border-navy-100/80 px-2.5 py-0.5 rounded-md shadow-sm">
                            {entry.doctor.specialization}
                          </span>
                        </div>
                      </div>

                      {/* Timings */}
                      <div className="flex gap-3 bg-white rounded-lg p-3 border border-neutral-200/50 mt-1">
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
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action button */}
                  <div className="p-6 bg-neutral-100/50 border-t border-neutral-200/50">
                    {entry.id === 'ihr-opd' ? (
                      <Button
                        asChild
                        className="w-full bg-navy-900 hover:bg-navy-950 text-white font-bold h-10 rounded tracking-wide shadow-sm text-xs"
                      >
                        <a href={`tel:${entry.contact.phone_numbers[0]}`} id={`call-doctor-home-${entry.id}`}>
                          Call to Pre-register Spot
                        </a>
                      </Button>
                    ) : (
                      <Button
                        asChild
                        className="w-full bg-navy-900 hover:bg-navy-950 text-white font-bold h-10 rounded tracking-wide shadow-sm text-xs"
                      >
                        <Link href={`/book?doctor=${entry.id}`} id={`book-doctor-home-${entry.id}`}>
                          Book Appointment
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button at bottom */}
          <div className="mt-12 text-center">
            <Button
              asChild
              variant="outline"
              className="border-navy-900 text-navy-900 hover:bg-navy-50 font-bold rounded px-8 h-12 text-sm"
            >
              <Link href="/doctors" id="view-all-doctors-bottom">
                View All Doctors
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 4. Featured Services & Packages */}
      <section className="py-20 lg:py-28 bg-[#FAFAFB]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Popular Diagnostics
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
                Featured Tests & Health Packages
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors group"
            >
              View all
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, index) => {
              const isExpanded = !!expandedServices[service.slug];
              const limit = 8;
              const displayTests = isExpanded ? (service.tests || []) : (service.tests || []).slice(0, limit);
              const hasMore = service.tests && service.tests.length > limit;

              const isPackage = service.category === 'package';
              const nameLower = service.name.toLowerCase();
              const isSilver = isPackage && nameLower.includes('silver');
              const isGold = isPackage && nameLower.includes('gold');
              const isPlatinum = isPackage && nameLower.includes('platinum');
              const isExpert = isPackage && nameLower.includes('expert');
              const isProActive = isPackage && nameLower.includes('proactive');
              const isActive = isPackage && nameLower.includes('active') && !nameLower.includes('proactive');
              const isVitalPlus = isPackage && nameLower.includes('vital plus');
              const isVital = isPackage && nameLower.includes('vital') && !nameLower.includes('plus');
              const isEssential = isPackage && nameLower.includes('essential');
              const isBasic = isPackage && nameLower.includes('basic');
              const isChamp1 = isPackage && nameLower.includes('champ 1');
              const isChamp2 = isPackage && nameLower.includes('champ 2');
              const isChamp3 = isPackage && nameLower.includes('champ 3');

              // Test category classification
              const isBlood = !isPackage && service.category === 'blood';
              const isUrine = !isPackage && service.category === 'urine';
              const isStool = !isPackage && service.category === 'stool';
              const isSputum = !isPackage && service.category === 'sputum';
              const isImaging = !isPackage && service.category === 'imaging';              // Dynamic styles based on vertical column index (index % 3) for perfect grid symmetry
              const colIndex = index % 3;

              let cardStyle = "hover:shadow-md hover:border-neutral-300";
              let badgeStyle = "bg-navy-50 text-navy-900 border border-transparent";
              let badgeLabel = service.category === 'package' ? 'Health Package' : service.category === 'imaging' ? 'Imaging Scan' : `${service.category} Test`;
              let titleStyle = "text-navy-950 group-hover:text-gold-600";
              let checkIconStyle = "text-gold-500";
              let buttonStyle = "bg-blue-600 hover:bg-blue-700 text-white";

              if (colIndex === 0) {
                // Column 1: Cool Slate/Steel Blue Theme
                cardStyle = "hover:shadow-md hover:shadow-slate-100/50 hover:border-slate-350";
                badgeStyle = "bg-slate-100 text-slate-700 border border-slate-200/80";
                if (isSilver) badgeLabel = "Silver Package";
                else if (isExpert) badgeLabel = "Expert Package";
                else if (isVitalPlus) badgeLabel = "Vital Plus Package";
                else if (isBasic) badgeLabel = "Basic Package";
                else if (isChamp3) badgeLabel = "Champ 3 Package";
                titleStyle = "text-slate-800 group-hover:text-slate-950";
                checkIconStyle = "text-slate-500";
                buttonStyle = "bg-slate-700 hover:bg-slate-800 text-white";
              } else if (colIndex === 1) {
                // Column 2: Rich Gold/Amber Theme
                cardStyle = "hover:shadow-md hover:shadow-gold-50/50 hover:border-gold-300/80";
                badgeStyle = "bg-gold-50 text-gold-700 border border-gold-200/60";
                if (isGold) badgeLabel = "Gold Package";
                else if (isProActive) badgeLabel = "ProActive Package";
                else if (isVital) badgeLabel = "Vital Package";
                else if (isChamp1) badgeLabel = "Champ 1 Package";
                titleStyle = "text-gold-600 group-hover:text-gold-750 font-display";
                checkIconStyle = "text-gold-500";
                buttonStyle = "bg-gold-600 hover:bg-gold-700 text-white";
              } else {
                // Column 3: Premium Sky/Teal Theme
                cardStyle = "hover:shadow-md hover:shadow-sky-50/50 hover:border-sky-200";
                badgeStyle = "bg-sky-50 text-sky-850 border border-sky-200/50";
                if (isPlatinum) badgeLabel = "Platinum Package";
                else if (isActive) badgeLabel = "Active Package";
                else if (isEssential) badgeLabel = "Essential Package";
                else if (isChamp2) badgeLabel = "Champ 2 Package";
                titleStyle = "text-sky-800 group-hover:text-sky-900";
                checkIconStyle = "text-sky-600";
                buttonStyle = "bg-sky-700 hover:bg-sky-800 text-white";
              }

              return (
                <div
                  key={service.slug}
                  className={cn(
                    "rounded-lg border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between transition-all group",
                    cardStyle
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={cn("inline-block text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded capitalize", badgeStyle)}>
                        {badgeLabel}
                      </span>
                      {service.turnaroundHours && (
                        <span className="text-xs text-neutral-400 flex items-center gap-1 font-medium">
                          <Clock className="h-3.5 w-3.5 text-gold-500" />
                          {service.turnaroundHours} hr
                        </span>
                      )}
                    </div>
                    <h3 className={cn("text-lg font-bold mb-2 leading-snug transition-colors", titleStyle)}>
                      {service.name}
                    </h3>
                    {service.category === 'package' && service.includes ? (
                      <div className="mb-6 space-y-3.5">
                        <p className="text-xs text-neutral-600 font-semibold leading-relaxed">
                          {service.shortDescription.split('. Covers:')[0]}. Covers:
                        </p>
                        <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                          {service.includes.slice(0, 6).map((item) => (
                            <li key={item} className="flex items-center gap-2 text-xs text-neutral-600">
                              <CheckCircle2 className={cn("h-4 w-4 flex-shrink-0", checkIconStyle)} />
                              <span className="font-medium">{item}</span>
                            </li>
                          ))}
                          {service.includes.length > 6 && (
                            <li className="flex items-center gap-2 text-xs text-neutral-400 font-bold italic">
                              + {service.includes.length - 6} more
                            </li>
                          )}
                        </ul>
                        {service.tests && (
                          <div className="mt-4 pt-3 border-t border-neutral-100">
                            <span className="text-[10px] text-neutral-400 uppercase font-bold block mb-2 tracking-wider">
                              Key Tests Included:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {displayTests.map((test) => (
                                <span key={test} className="bg-navy-50/50 border border-navy-100/40 rounded-full px-2.5 py-0.5 text-[10px] text-navy-900 font-medium">
                                  {test}
                                </span>
                              ))}
                              {hasMore && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setExpandedServices(prev => ({
                                      ...prev,
                                      [service.slug]: !prev[service.slug]
                                    }));
                                  }}
                                  className={cn(
                                    "border rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm transition-all cursor-pointer",
                                    isExpanded
                                      ? "bg-neutral-200 border-neutral-300 text-neutral-700 hover:bg-neutral-350"
                                      : "bg-navy-950/10 border-navy-950/20 text-navy-950 hover:bg-navy-950/20"
                                  )}
                                >
                                  {isExpanded ? 'Show Less' : `+${service.tests.length - limit} more`}
                                </button>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-neutral-500 line-clamp-3 mb-6">
                        {service.shortDescription}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-neutral-100 pt-4 mt-2">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold block leading-tight">
                          Price
                        </span>
                        {service.price ? (
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-extrabold text-navy-900">
                              ₹{service.price}
                            </span>
                            {service.originalPrice && (
                              <span className="text-sm text-neutral-400 line-through font-semibold">
                                ₹{service.originalPrice}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm font-bold text-gold-600">
                            {service.priceNote || 'Call for price'}
                          </span>
                        )}
                      </div>
                      {service.sampleType && (
                        <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                          {service.sampleType}
                        </span>
                      )}
                    </div>
                    <div className="mt-2">
                      <Button
                        asChild
                        className={cn("w-full font-bold rounded h-12 text-sm shadow-sm transition-all", buttonStyle)}
                      >
                        <Link href={`/book?test=${service.slug}`}>Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Packages Highlight section */}
          <div className="mt-16 bg-navy-950 text-white rounded-lg p-8 md:p-12 relative overflow-hidden shadow-lg border border-navy-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,162,79,0.12),transparent_40%)]" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Special Offer
                </span>
                <h3 className="text-2xl font-bold font-display sm:text-3xl">
                  Comprehensive Health Checkup Packages
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl leading-relaxed">
                  Our <span className="text-slate-300 font-bold drop-shadow-sm">Silver</span>, <span className="text-gold-400 font-bold drop-shadow-sm">Gold</span>, and <span className="text-sky-300 font-bold drop-shadow-sm">Platinum</span> B2B health profiles offer a comprehensive analysis of complete blood counts, sugar, HbA1c, liver/kidney functions, lipids, thyroid, and vital vitamins.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <span className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-gold-500" />
                    Up to 60+ Parameters Screened
                  </span>
                  <span className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-gold-500" />
                    Up to 60%+ Package Discount
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:items-end justify-center">
                <div className="text-left sm:text-right mb-6">
                  <p className="text-xs text-neutral-400">Starting from just</p>
                  <p className="text-3xl font-extrabold text-white mt-1">
                    ₹1,100 <span className="text-sm text-neutral-400 line-through">₹2,940</span>
                  </p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Button
                    asChild
                    className="bg-blue-600 font-semibold text-white hover:bg-blue-700 hover:shadow-md transition-all rounded px-6 w-full sm:w-auto"
                  >
                    <Link href="/services?category=package">View Packages</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Video Media Showcase */}
      <section className="py-20 lg:py-28 bg-white border-y border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Video */}
            <div className="lg:col-span-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-navy-950 shadow-xl border border-neutral-200">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster="/assets/banner.png"
                  muted
                  loop
                  playsInline
                >
                  <source src="/assets/business-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Inside Our Clinic
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl">
                Advanced Equipment & Sanitized Environment
              </h2>
              <p className="text-sm leading-relaxed text-neutral-500">
                Take a virtual tour of our modern pathology facility in Silchar. We use automated analytical equipment from leading international suppliers, ensuring premium testing standards with minimal human interference.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-gold-100 h-9 w-9 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Hygienic Sampling Booths</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Our collection stations are sanitized after every single appointment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gold-100 h-9 w-9 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Rapid Turnaround Processing</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Emergency samples are fast-tracked automatically by our laboratory sorting systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Patient Reviews Section */}
      <section className="py-20 lg:py-28 bg-[#FAFAFB]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
              Patient Testimonials
            </span>
            <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
              What Our Patients Say
            </h2>
            <p className="text-sm text-neutral-500 mt-4">
              Real reviews from real patients in Silchar who have tested with us.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review, idx) => {
              const { tags, comment } = parseReviewBody(review.body);
              const initials = review.author
                .split(' ')
                .map(n => n[0])
                .join('')
                .slice(0, 2);
              const gradient = getAvatarGradient(review.author);

              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-neutral-150 shadow-[0_4px_25px_-5px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_-8px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
                >
                  {/* Decorative background quote graphic */}
                  <div className="absolute right-4 bottom-16 text-neutral-50 pointer-events-none select-none group-hover:text-neutral-100/70 transition-colors duration-300">
                    <Quote className="h-14 w-14 rotate-180 opacity-40" />
                  </div>

                  <div>
                    {/* Header: Profile */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-bold text-white text-xs shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] tracking-wider uppercase",
                        gradient
                      )}>
                        {initials}
                      </div>
                      <div className="min-w-0">
                        <h5 className="font-bold text-navy-950 text-xs truncate">{review.author}</h5>
                        <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold mt-0.5">
                          <CheckCircle2 className="h-3 w-3 fill-emerald-100" />
                          <span>Verified Review</span>
                        </div>
                      </div>
                    </div>

                    {/* Stars and Date */}
                    <div className="flex items-center justify-between mb-4 bg-neutral-50 px-3 py-1.5 rounded-lg border border-neutral-100">
                      <div className="flex items-center gap-0.5 text-gold-500">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="h-3.5 w-3.5 fill-current" />
                        ))}
                      </div>
                      <span className="text-[10px] text-neutral-400 font-medium">
                        {new Date(review.date).toLocaleDateString('en-IN', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    {/* Parsed Attribute Badges */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="bg-neutral-100/80 text-neutral-600 border border-neutral-200/40 text-[9px] font-semibold px-2 py-0.5 rounded-full tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Review Comment Quote */}
                    {comment && (
                      <p className="text-xs text-neutral-600 leading-relaxed italic relative z-10 pl-2 border-l-2 border-gold-400">
                        "{comment}"
                      </p>
                    )}
                  </div>

                  {/* Review Footnote and Trust indicator */}
                  <div className="border-t border-neutral-100 pt-3 mt-4 flex items-center justify-between text-[10px] text-neutral-400 font-medium">
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-gold-500 text-gold-500" />
                      <span>5.0 Rating</span>
                    </span>
                    <span>Silchar, Assam</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Local Map Embed & Directions */}
      <section className="py-20 lg:py-28 bg-white border-t border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Map Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Visit Clinic
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl">
                Location & Walking Directions
              </h2>
              <p className="text-sm leading-relaxed text-neutral-500">
                We are centrally located at Birbal Bazar, Meherpur, Silchar. Easily accessible by auto-rickshaw or personal vehicles with dedicated parking outside.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Landmarks</h4>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Adjacent to the Co-operative Bank, Meherpur Branch. Opposite Birbal Bazar, near the Vivekananda Statue.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Timings</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Mon - Sat: 7 AM - 8 PM <br /> Sun: 7 AM - 1 PM
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Direct Contact</h4>
                    <a
                      href={SITE.contact.phoneTel}
                      className="text-xs font-bold text-navy-900 hover:text-gold-600 transition-colors"
                    >
                      {SITE.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="bg-navy-900 hover:bg-navy-950 text-white font-semibold rounded px-6 h-11"
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Metro-City+Diagnostics+Silchar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Map Embed */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-200 shadow-md bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7243.64653953248!2d92.78565079895019!3d24.801504468480108!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e4bcc779b118d%3A0xf60370683024c700!2sMetro-City%20Diagnostics!5e0!3m2!1sen!2sin!4v1779330698021!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Metro-City Diagnostics Google Maps Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
