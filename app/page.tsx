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
                  className="bg-gold-500 font-semibold text-white hover:bg-gold-600 hover:shadow-lg transition-all rounded px-8 h-12 text-base w-full sm:w-auto"
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
              <div className="relative mx-auto max-w-[450px] lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-gold-500/40" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy-800 shadow-2xl">
                  <Image
                    src="/assets/metro-city-diagnostics-exterior.png"
                    alt="Metro-City Diagnostics Clinic Entrance, Silchar"
                    fill
                    sizes="(max-w-768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
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
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-600 text-white shadow-sm border border-emerald-500">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          CONSULTATION FEE: ₹{entry.fees || 500}
                        </span>
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
                    <Button
                      asChild
                      className="w-full bg-navy-900 hover:bg-navy-950 text-white font-bold h-10 rounded tracking-wide shadow-sm text-xs"
                    >
                      <Link href={`/book?doctor=${entry.id}`} id={`book-doctor-home-${entry.id}`}>
                        Book Appointment
                      </Link>
                    </Button>
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
            {featuredServices.map((service) => {
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
              const isImaging = !isPackage && service.category === 'imaging';

              // Dynamic styles based on package tier (Silver, Gold, Platinum) or generic test
              let cardStyle = "hover:shadow-md hover:border-neutral-300";
              let badgeStyle = "bg-navy-50 text-navy-900 border border-transparent";
              let badgeLabel = service.category === 'package' ? 'Health Package' : service.category === 'imaging' ? 'Imaging Scan' : `${service.category} Test`;
              let titleStyle = "text-navy-950 group-hover:text-gold-600";
              let checkIconStyle = "text-gold-500";
              let buttonStyle = "bg-gold-500 hover:bg-gold-600 text-white";

              if (isSilver) {
                cardStyle = "hover:shadow-md hover:shadow-slate-100/50 hover:border-slate-350";
                badgeStyle = "bg-slate-100 text-slate-700 border border-slate-200/80";
                badgeLabel = "Silver Package";
                titleStyle = "text-slate-500 group-hover:text-slate-650";
                checkIconStyle = "text-slate-400";
                buttonStyle = "bg-slate-600 hover:bg-slate-750 text-white";
              } else if (isGold) {
                cardStyle = "hover:shadow-md hover:shadow-gold-50/50 hover:border-gold-300/80";
                badgeStyle = "bg-gold-50 text-gold-700 border border-gold-200/60";
                badgeLabel = "Gold Package";
                titleStyle = "text-gold-600 group-hover:text-gold-750";
                checkIconStyle = "text-gold-500";
                buttonStyle = "bg-gold-600 hover:bg-gold-750 text-white";
              } else if (isPlatinum) {
                cardStyle = "hover:shadow-md hover:shadow-sky-50/50 hover:border-sky-200";
                badgeStyle = "bg-sky-50 text-sky-800 border border-sky-200/50";
                badgeLabel = "Platinum Package";
                titleStyle = "text-sky-800 group-hover:text-sky-900";
                checkIconStyle = "text-sky-500";
                buttonStyle = "bg-sky-700 hover:bg-sky-800 text-white";
              } else if (isExpert) {
                cardStyle = "hover:shadow-md hover:shadow-purple-50/50 hover:border-purple-200";
                badgeStyle = "bg-purple-50 text-purple-700 border border-purple-200/50";
                badgeLabel = "Expert Package";
                titleStyle = "text-purple-800 group-hover:text-purple-900";
                checkIconStyle = "text-purple-500";
                buttonStyle = "bg-purple-700 hover:bg-purple-800 text-white";
              } else if (isProActive) {
                cardStyle = "hover:shadow-md hover:shadow-fuchsia-50/50 hover:border-fuchsia-200";
                badgeStyle = "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/50";
                badgeLabel = "ProActive Package";
                titleStyle = "text-fuchsia-800 group-hover:text-fuchsia-900";
                checkIconStyle = "text-fuchsia-500";
                buttonStyle = "bg-fuchsia-700 hover:bg-fuchsia-800 text-white";
              } else if (isActive) {
                cardStyle = "hover:shadow-md hover:shadow-emerald-50/50 hover:border-emerald-200";
                badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
                badgeLabel = "Active Package";
                titleStyle = "text-emerald-800 group-hover:text-emerald-900";
                checkIconStyle = "text-emerald-500";
                buttonStyle = "bg-emerald-700 hover:bg-emerald-800 text-white";
              } else if (isVitalPlus) {
                cardStyle = "hover:shadow-md hover:shadow-rose-50/50 hover:border-rose-200";
                badgeStyle = "bg-rose-50 text-rose-700 border border-rose-200/50";
                badgeLabel = "Vital Plus Package";
                titleStyle = "text-rose-800 group-hover:text-rose-900";
                checkIconStyle = "text-rose-500";
                buttonStyle = "bg-rose-700 hover:bg-rose-800 text-white";
              } else if (isVital) {
                cardStyle = "hover:shadow-md hover:shadow-indigo-50/50 hover:border-indigo-200";
                badgeStyle = "bg-indigo-50 text-indigo-700 border border-indigo-200/50";
                badgeLabel = "Vital Package";
                titleStyle = "text-indigo-800 group-hover:text-indigo-900";
                checkIconStyle = "text-indigo-500";
                buttonStyle = "bg-indigo-700 hover:bg-indigo-800 text-white";
              } else if (isEssential) {
                cardStyle = "hover:shadow-md hover:shadow-amber-50/50 hover:border-amber-200";
                badgeStyle = "bg-amber-50 text-amber-700 border border-amber-200/50";
                badgeLabel = "Essential Package";
                titleStyle = "text-amber-800 group-hover:text-amber-900";
                checkIconStyle = "text-amber-500";
                buttonStyle = "bg-amber-700 hover:bg-amber-800 text-white";
              } else if (isBasic) {
                cardStyle = "hover:shadow-md hover:shadow-blue-50/50 hover:border-blue-200";
                badgeStyle = "bg-blue-50 text-blue-700 border border-blue-200/50";
                badgeLabel = "Basic Package";
                titleStyle = "text-blue-800 group-hover:text-blue-900";
                checkIconStyle = "text-blue-500";
                buttonStyle = "bg-blue-700 hover:bg-blue-800 text-white";
              } else if (isChamp1) {
                cardStyle = "hover:shadow-md hover:shadow-cyan-50/50 hover:border-cyan-200";
                badgeStyle = "bg-cyan-50 text-cyan-800 border border-cyan-200/50";
                badgeLabel = "Champ 1 Package";
                titleStyle = "text-cyan-800 group-hover:text-cyan-900";
                checkIconStyle = "text-cyan-500";
                buttonStyle = "bg-cyan-700 hover:bg-cyan-800 text-white";
              } else if (isChamp2) {
                cardStyle = "hover:shadow-md hover:shadow-teal-50/50 hover:border-teal-200";
                badgeStyle = "bg-teal-50 text-teal-800 border border-teal-200/50";
                badgeLabel = "Champ 2 Package";
                titleStyle = "text-teal-800 group-hover:text-teal-900";
                checkIconStyle = "text-teal-500";
                buttonStyle = "bg-teal-700 hover:bg-teal-800 text-white";
              } else if (isChamp3) {
                cardStyle = "hover:shadow-md hover:shadow-emerald-50/50 hover:border-emerald-200";
                badgeStyle = "bg-emerald-50 text-emerald-800 border border-emerald-200/50";
                badgeLabel = "Champ 3 Package";
                titleStyle = "text-emerald-800 group-hover:text-emerald-900";
                checkIconStyle = "text-emerald-500";
                buttonStyle = "bg-emerald-700 hover:bg-emerald-800 text-white";
              } else if (isBlood) {
                cardStyle = "hover:shadow-md hover:shadow-rose-50/50 hover:border-rose-300";
                badgeStyle = "bg-rose-50 text-rose-700 border border-rose-200/50";
                badgeLabel = "Blood Test";
                titleStyle = "text-navy-950 group-hover:text-rose-600";
                buttonStyle = "bg-rose-600 hover:bg-rose-700 text-white";
              } else if (isUrine) {
                cardStyle = "hover:shadow-md hover:shadow-amber-50/50 hover:border-amber-300";
                badgeStyle = "bg-amber-50 text-amber-800 border border-amber-200/50";
                badgeLabel = "Urine Test";
                titleStyle = "text-navy-950 group-hover:text-amber-600";
                buttonStyle = "bg-amber-600 hover:bg-amber-700 text-white";
              } else if (isStool) {
                cardStyle = "hover:shadow-md hover:shadow-emerald-50/50 hover:border-emerald-300";
                badgeStyle = "bg-emerald-50 text-emerald-800 border border-emerald-200/50";
                badgeLabel = "Stool Test";
                titleStyle = "text-navy-950 group-hover:text-emerald-600";
                buttonStyle = "bg-emerald-600 hover:bg-emerald-700 text-white";
              } else if (isSputum) {
                cardStyle = "hover:shadow-md hover:shadow-teal-50/50 hover:border-teal-300";
                badgeStyle = "bg-teal-50 text-teal-800 border border-teal-200/50";
                badgeLabel = "Sputum Test";
                titleStyle = "text-navy-950 group-hover:text-teal-600";
                buttonStyle = "bg-teal-600 hover:bg-teal-700 text-white";
              } else if (isImaging) {
                cardStyle = "hover:shadow-md hover:shadow-violet-50/50 hover:border-violet-300";
                badgeStyle = "bg-violet-50 text-violet-800 border border-violet-200/50";
                badgeLabel = "Imaging Scan";
                titleStyle = "text-navy-950 group-hover:text-violet-600";
                buttonStyle = "bg-violet-600 hover:bg-violet-700 text-white";
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
                    className="bg-gold-500 font-semibold text-white hover:bg-gold-600 hover:shadow-md transition-all rounded px-6 w-full sm:w-auto"
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
