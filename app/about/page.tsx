import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ShieldCheck, 
  MapPin, 
  History, 
  Users, 
  Activity, 
  CheckCircle2, 
  Star, 
  Clock, 
  HeartHandshake, 
  Sparkles 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { buildMetadata, jsonLdProps, organizationJsonLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'About Metro-City Diagnostics — Meherpur, Silchar',
  description:
    'Learn about Metro-City Diagnostics in Meherpur, Silchar. Established in 01-2025, offering comprehensive medical diagnostics, lab testing, and sonography services.',
  path: '/about',
  keywords: [
    'Metro-City Diagnostics Silchar',
    'about Metro-City Diagnostics',
    'diagnostic lab Meherpur',
    'Sonography Centres Silchar'
  ],
});

export default function AboutPage() {
  const orgSchema = organizationJsonLd;

  return (
    <div className="bg-[#FAFAFB] min-h-screen">
      {/* Schema Injection */}
      <script {...jsonLdProps(orgSchema)} />

      {/* Hero Banner Section */}
      <section className="bg-navy-950 text-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-90 z-0" />
        {/* Subtle decorative background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-1.5 bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-extrabold px-3.5 py-1.5 rounded uppercase tracking-wider mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Established 01-2025
            </span>
            <h1 className="text-4xl font-extrabold font-display leading-tight sm:text-5xl md:text-6xl mb-6">
              About Metro-City Diagnostics
            </h1>
            <p className="text-neutral-300 text-lg sm:text-xl leading-relaxed max-w-3xl">
              A trusted partner in your healthcare journey, delivering high-precision laboratory testing, expert pathology audits, and patient-first diagnostics.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Detailed Sections */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* SECTION 1: Metro-City Diagnostics in Meherpur, Silchar */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
                    <Activity className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-navy-950">
                    Metro-City Diagnostics in Meherpur, Silchar
                  </h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Located in Meherpur, Silchar, Metro-City Diagnostics is a trusted name in the healthcare and diagnostic field, offering comprehensive medical diagnostics, lab testing, and healthcare services. Established in 01-2025, Metro-City Diagnostics is committed to providing high-quality, reliable healthcare solutions to patients of all ages. Operating from Monday:- 7:30 am - 8:30 pm, Tuesday:- 7:30 am - 8:30 pm, Wednesday:- 7:30 am - 8:30 pm, Thursday:- 7:30 am - 8:30 pm, Friday:- 7:30 am - 8:30 pm, Saturday:- 7:30 am - 8:30 pm, Sunday:- Closed, the center strives to ensure accuracy, comfort, and convenience for all clients and patients alike.
                </p>
              </div>

              {/* SECTION 2: Overview and Location */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
                    <MapPin className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-navy-950">
                    Overview and Location
                  </h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Metro-City Diagnostics specializes in Sonography Centres and a broad range of medical diagnostic and testing services, including both patient-focused diagnostics and specialized lab services for product testing. Conveniently situated near Near Vivekananda Co-Operative, Silchar Medical College Road, the center's accessible location in Meherpur, Silchar enables timely and efficient service, making it an ideal choice for individuals, healthcare providers, and companies requiring specialized diagnostic solutions.
                </p>
              </div>

              {/* SECTION 3: History and Commitment */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/5 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
                    <History className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-navy-950">
                    History and Commitment
                  </h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6">
                  Since its founding, Metro-City Diagnostics has been a leader in the Sonography Centres sector, consistently earning the trust of its clients through a commitment to accuracy and patient care. With a high rating of 5.0 stars based on 323 reviews, the center continues to be a cornerstone for healthcare needs, recognized for its dedication to patient and client satisfaction.
                </p>

                {/* Trust and Reviews Stats Display */}
                <div className="flex flex-wrap items-center gap-6 p-4 rounded-xl bg-[#FAFAFB] border border-neutral-200/60">
                  <div className="flex items-center gap-1.5 text-gold-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-navy-950">
                    5.0 / 5.0 Star Rating
                  </div>
                  <div className="h-4 w-px bg-neutral-300 hidden sm:block" />
                  <div className="text-xs sm:text-sm text-neutral-500">
                    Based on 323 Verified Customer Reviews
                  </div>
                </div>
              </div>

              {/* SECTION 4: Expert Team of Professionals */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
                    <Users className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-navy-950">
                    Expert Team of Professionals
                  </h2>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  At Metro-City Diagnostics in Meherpur, Silchar, patients and clients are supported by a team of highly skilled professionals, including licensed doctors, certified lab technicians and specialized staff trained in advanced diagnostic techniques. The team's dedication to accuracy, patient comfort, and care ensures that every diagnostic process—from routine tests to specialized screenings—is conducted with precision and empathy.
                </p>
              </div>

              {/* SECTION 5: Services Offered */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-8 shadow-sm transition-all duration-300 hover:shadow-md">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="h-10 w-10 rounded-lg bg-navy-50 text-navy-700 flex items-center justify-center">
                    <ShieldCheck className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-navy-950">
                    Services Offered
                  </h2>
                </div>
                <div className="text-neutral-600 text-sm sm:text-base leading-relaxed space-y-4">
                  <p>
                    Metro-City Diagnostics offers a comprehensive range of medical and diagnostic services designed to meet diverse healthcare needs. For patient diagnostics, they provide specialized testing such as RCT (Root Canal), Sinusitis, Fistula Treatment, and advanced imaging solutions. They also offer a variety of preventive health packages tailored for all age groups, as well as wellness assessments to support proactive health management.
                  </p>
                  <p>
                    Additionally, Metro-City Diagnostics provides high-standard diagnostic lab services for product testing, catering to industries that require quality control and compliance checks.
                  </p>
                </div>
              </div>

              {/* SECTION 6: Summary */}
              <div className="bg-navy-950 text-white rounded-2xl p-8 md:p-10 shadow-sm relative overflow-hidden border border-navy-900">
                <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-center gap-3.5 mb-5 relative z-10">
                  <div className="h-10 w-10 rounded-lg bg-gold-500/20 text-gold-300 flex items-center justify-center">
                    <HeartHandshake className="h-5.5 w-5.5" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-white">
                    Summary
                  </h2>
                </div>
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed relative z-10 mb-8">
                  Metro-City Diagnostics in Meherpur, Silchar is dedicated to delivering reliable and high-quality diagnostic and lab testing services. With a team of experienced professionals, a wide range of diagnostic options, and a reputation for precision, Metro-City Diagnostics ensures that every patient and client receives the care, accuracy, and efficiency they deserve. For healthcare and diagnostic solutions in Silchar, Metro-City Diagnostics remains a trusted provider, committed to excellence in every aspect of patient and client care.
                </p>
                <div className="flex flex-wrap gap-4 relative z-10">
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold h-11 rounded shadow-xs"
                  >
                    <Link href="/services">View Available Services</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10 font-bold h-11 rounded"
                  >
                    <Link href="/contact">Get Location Directions</Link>
                  </Button>
                </div>
              </div>

            </div>

            {/* Right Column: Sidebar / Operating Info Panel */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Quick Details Card */}
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
                <h3 className="font-bold text-navy-950 text-lg border-b border-neutral-100 pb-3 mb-4">
                  Quick Details
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase block">
                        Operating Hours
                      </span>
                      <span className="text-sm font-bold text-navy-950 mt-1 block">
                        Monday - Saturday
                      </span>
                      <span className="text-xs text-neutral-600 block mt-0.5">
                        7:30 AM - 8:30 PM
                      </span>
                      <span className="text-sm font-bold text-red-600 mt-2 block">
                        Sunday
                      </span>
                      <span className="text-xs text-neutral-600 block mt-0.5">
                        Closed
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 border-t border-neutral-100 pt-4">
                    <MapPin className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase block">
                        Address Location
                      </span>
                      <span className="text-xs text-neutral-600 leading-relaxed block mt-1">
                        Near Vivekananda Co-Operative, Silchar Medical College Road, Meherpur, Silchar, Assam 788015
                      </span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 border-t border-neutral-100 pt-4">
                    <ShieldCheck className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <span className="text-xs font-semibold text-neutral-400 uppercase block">
                        Our Certifications
                      </span>
                      <span className="text-xs text-neutral-600 leading-relaxed block mt-1">
                        High-quality lab infrastructure, specialized Sonography Centres compliance, and expert pathologists.
                      </span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Core Quality Pillars */}
              <div className="bg-navy-900 text-white rounded-2xl p-6 shadow-sm border border-navy-800">
                <h3 className="font-bold text-white text-lg border-b border-navy-800 pb-3 mb-4">
                  Our Commitment
                </h3>
                <ul className="space-y-4">
                  {[
                    '5.0 Star Rated Quality Care',
                    '323 Verified Customer Reviews',
                    'Accurate Sonography Screening',
                    'Reliable Product Testing Diagnostics',
                    'Expert Licensed Pathologist Audits'
                  ].map((item, i) => (
                    <li key={i} className="flex gap-2.5 text-xs text-neutral-200">
                      <CheckCircle2 className="h-4.5 w-4.5 text-gold-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
