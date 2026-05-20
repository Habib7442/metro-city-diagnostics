import type { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Award, Users, ChevronRight, Activity, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildMetadata, pageSeo, jsonLdProps, organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Us — Trusted Diagnostic Lab in Silchar since 1976',
  description:
    'Learn about Metro-City Diagnostics, serving Silchar and Cachar since 1976. Explore our high-precision pathology analyzers, digital X-rays, expert medical directors, and quality certifications.',
  path: '/about',
  keywords: ['about Metro City Diagnostics', 'best lab in Silchar'],
});

export default function AboutPage() {
  const orgSchema = organizationJsonLd;

  return (
    <div className="bg-[#FAFAFB] min-h-screen">
      {/* Schema Injection */}
      <script {...jsonLdProps(orgSchema)} />

      {/* Hero Banner Section */}
      <section className="bg-navy-950 text-white py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-90 z-0" />
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="inline-block bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-extrabold px-3 py-1 rounded uppercase tracking-wider mb-4">
              Our Legacy Since 1976
            </span>
            <h1 className="text-4xl font-extrabold font-display leading-tight sm:text-5xl md:text-6xl mb-6">
              A Legacy of Clinical Trust and Care in Silchar
            </h1>
            <p className="text-neutral-300 text-lg leading-relaxed mb-8">
              Metro-City Diagnostics has been at the forefront of providing accurate pathology, high-resolution digital X-rays, and modern obstetric sonography to the people of Cachar and the Barak Valley for half a century.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-gold-500 hover:bg-gold-600 text-white font-bold h-12 rounded px-6 shadow-sm"
              >
                <Link href="/services">Explore Services</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 font-bold h-12 rounded px-6"
              >
                <Link href="/contact">Get Directions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Core Narrative */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Image/Branding Card */}
            <div className="lg:col-span-5">
              <div className="bg-navy-900 text-white p-8 md:p-12 rounded-2xl relative overflow-hidden shadow-lg border border-navy-800">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
                <h3 className="text-2xl font-bold font-display mb-4">Why Metro-City?</h3>
                <p className="text-sm text-neutral-300 leading-relaxed mb-6">
                  For nearly 50 years, our core focus has remained unchanged: combining clinical authority and strict control systems with a warm, caring environment for our patients.
                </p>
                <ul className="space-y-4">
                  {[
                    'Automated hematology & bio-chemistry analyzers',
                    'High-resolution digital X-ray equipment',
                    'Strict internal quality audit controls',
                    'Convenient home sample collection across Silchar',
                  ].map((value, idx) => (
                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-neutral-200">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                      <span>{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-bold font-display text-navy-900 leading-tight sm:text-4xl">
                Serving Cachar with Uncompromising Quality
              </h2>
              <p className="text-neutral-600 text-base leading-relaxed">
                Founded in **1976**, Metro-City Diagnostics was established with a singular vision: bringing world-class laboratory pathology and diagnostic facilities to Silchar. Over the decades, we have continually upgraded our machinery and medical practices to align with national and global guidelines.
              </p>
              <p className="text-neutral-600 text-base leading-relaxed">
                Our facilities are managed by experienced medical pathologists and radiologist advisors who inspect every report to guarantee extreme precision. Whether it is a routine blood cell panel or specialized thyroid profile, our clinical team works diligently to deliver verified reports back to your phone via WhatsApp in record time.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
                <div>
                  <span className="text-3xl font-black text-navy-950 font-display block">1976</span>
                  <span className="text-xs font-semibold text-neutral-400 uppercase mt-1 block">
                    Established Year
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-black text-navy-950 font-display block">100k+</span>
                  <span className="text-xs font-semibold text-neutral-400 uppercase mt-1 block">
                    Patients Served
                  </span>
                </div>
                <div>
                  <span className="text-3xl font-black text-navy-950 font-display block">24 Hours</span>
                  <span className="text-xs font-semibold text-neutral-400 uppercase mt-1 block">
                    Report Turnaround
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white border-y border-neutral-200">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-display text-navy-900 leading-tight sm:text-4xl mb-4">
              Our Core Operational Pillars
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base leading-relaxed">
              Every sample, report, and booking is processed with precision, ensuring absolute peace of mind for you and your family.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: 'Clinical Accuracy',
                desc: 'Our laboratory operates under strict internal controls and external quality assurance schemes, yielding double-verified diagnostic metrics.',
              },
              {
                icon: Clock,
                title: 'Fast Turnaround',
                desc: 'We optimize laboratory processing pipelines to deliver digital reports via WhatsApp and Email within 12 to 24 hours.',
              },
              {
                icon: Users,
                title: 'Patient-First Focus',
                desc: 'From our clean clinic lobby to professional home collection technicians, we treat every patient like a valued neighbor.',
              },
              {
                icon: Award,
                title: 'Fair Pricing',
                desc: 'We are committed to providing premium diagnostics services at accessible rates across the entire Barak Valley region.',
              },
            ].map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div key={idx} className="p-6 bg-neutral-50 rounded-xl border border-neutral-200/60 shadow-xs flex flex-col justify-between">
                  <div className="mb-4">
                    <div className="h-12 w-12 bg-navy-50 text-navy-950 rounded-lg flex items-center justify-center mb-4">
                      <IconComp className="h-6 w-6 text-navy-700" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-950 mb-2">{pillar.title}</h3>
                    <p className="text-xs text-neutral-500 leading-relaxed">{pillar.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Laboratory Equipment & Infrastructure */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold font-display text-navy-900 leading-tight sm:text-4xl mb-6">
                Advanced Laboratory Infrastructure
              </h2>
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                To guarantee extreme accuracy, our laboratory pathology center is equipped with modern, fully-automated analysis instrumentation. We systematically eliminate human error using barcoded samples and direct interface analyzers.
              </p>
              <div className="space-y-4">
                {[
                  {
                    title: 'Automated Biochemistry Analyzers',
                    desc: 'Direct-read spectrometry for highly accurate blood sugars, lipid profiles, liver, and kidney panels.',
                  },
                  {
                    title: 'High-Resolution Obstetric Sonography',
                    desc: 'Safe, radiation-free pelvic scanning to examine fetal health, soft tissues, and abdomens.',
                  },
                  {
                    title: 'Low-Exposure Digital Radiology',
                    desc: 'Instant chest and bone X-ray scans with reduced dosage, finalized within minutes.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="h-2 w-2 rounded-full bg-gold-500 mt-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold text-navy-950 text-sm">{item.title}</h4>
                      <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-navy-950 p-8 rounded-xl text-white relative overflow-hidden border border-navy-900 shadow-md">
              <span className="text-[10px] font-extrabold uppercase bg-gold-500/20 text-gold-300 px-3 py-1 rounded tracking-wider border border-gold-500/20 mb-4 inline-block">
                Our Guarantee
              </span>
              <h3 className="text-2xl font-bold font-display mb-4">Double-Checked Verified Reports</h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                All clinical profiles (CBC, Liver Panels, Hormones) are validated under strict diagnostic checks. Should any parameter deviate from expected limits, we run repeat assays to confirm metrics before dispatching the final digital report.
              </p>
              <Button
                asChild
                className="bg-gold-500 hover:bg-gold-600 text-white font-bold h-11 rounded"
              >
                <Link href="/book">Book Sample Collection Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
