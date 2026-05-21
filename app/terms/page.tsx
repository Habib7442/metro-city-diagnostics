import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Calendar, CheckSquare, AlertCircle, ArrowLeft } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = buildMetadata({
  title: 'Terms of Service — Metro-City Diagnostics',
  description: 'Review the terms and conditions for diagnostic testing, bookings, payments, and report collection at Metro-City Diagnostics.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <div className="bg-[#FAFAFB] min-h-screen font-sans">
      {/* Hero Banner Section */}
      <section className="bg-navy-950 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-950 opacity-90 z-0" />
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center text-xs font-bold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-widest gap-2 mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Home
          </Link>
          <span className="inline-block bg-gold-500/20 text-gold-300 border border-gold-500/30 text-xs font-extrabold px-3 py-1 rounded uppercase tracking-wider mb-4">
            Legal Terms
          </span>
          <h1 className="text-3xl font-extrabold font-display leading-tight sm:text-4xl md:text-5xl mb-4">
            Terms of Service
          </h1>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Please read these terms and conditions carefully before booking diagnostic tests or utilizing home sample collection services with Metro-City Diagnostics.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 md:p-12 shadow-sm space-y-10">
            {/* Header info */}
            <div className="border-b border-neutral-100 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-neutral-400">Last Updated</p>
                <p className="text-sm font-bold text-navy-950 mt-1">October 16, 2025</p>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose prose-neutral max-w-none text-sm md:text-base leading-relaxed text-neutral-600 space-y-6">
              <p>
                Welcome to <strong>Metro-City Diagnostics</strong>. By visiting our center in Silchar, scheduling tests online, or requesting home sample collection, you agree to comply with and be bound by the following terms of service.
              </p>

              <hr className="border-neutral-100 my-8" />

              {/* 1. Services Provided */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <FileText className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">1. Nature of Services</h2>
                </div>
                <p>
                  Metro-City Diagnostics operates a clinical pathology and imaging facility providing diagnostic investigations (blood tests, urine routine, scans, X-rays). 
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Our reports are intended strictly for clinical assistance to support diagnosing medical professionals.</li>
                  <li>A diagnostic report does not constitute a direct prescription or immediate medical therapy. Patients must consult with qualified physicians to interpret and act on report findings.</li>
                </ul>
              </div>

              {/* 2. Appointments & Bookings */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <Calendar className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">2. Bookings & Home Collection</h2>
                </div>
                <p>
                  We aim to facilitate timely sample collection, but scheduling is subject to the following rules:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Preparation:</strong> Patients are solely responsible for adhering to pre-test instructions (e.g., fasting requirements, abstaining from medication) as outlined in the service list or communicated via phone.</li>
                  <li><strong>Home Collection:</strong> Phlebotomists will visit within the designated time frame. However, delays caused by unforeseen traffic or weather in Silchar will be communicated as early as possible.</li>
                  <li><strong>Cancellations:</strong> Bookings can be cancelled or rescheduled free of charge up to 2 hours before the scheduled time slot.</li>
                </ul>
              </div>

              {/* 3. Payments & Refunds */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <CheckSquare className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">3. Payments & Billing</h2>
                </div>
                <p>
                  Payments must be settled prior to sample processing or during physical report delivery:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prices for services are subject to change without prior notice, but booked rates will remain locked.</li>
                  <li>Payment options include Cash, credit/debit cards, and UPI transfers.</li>
                  <li><strong>Refunds:</strong> Refunds for cancelled orders will be processed within 5-7 working days back to the original source.</li>
                </ul>
              </div>

              {/* 4. Limitation of Liability */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <AlertCircle className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">4. Liability & Disclaimers</h2>
                </div>
                <p>
                  While Metro-City Diagnostics employs strict quality assurance procedures and calibrated equipment:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>We are not responsible for report delays resulting from mechanical failures, complex analysis requirements, or circumstances beyond our control.</li>
                  <li>The clinical team is not liable for health consequences arising from a patient’s failure to consult their doctor or for self-treating based on report outcomes.</li>
                </ul>
              </div>

              {/* Contact Us */}
              <div className="bg-navy-950 text-white rounded-lg p-6 mt-8 space-y-4">
                <h3 className="text-lg font-bold font-display text-gold-400">Need Assistance?</h3>
                <p className="text-xs text-neutral-300">
                  If you have any feedback or dispute regarding our terms, please feel free to reach out to clinic support.
                </p>
                <div className="pt-2">
                  <Button asChild className="bg-gold-500 hover:bg-gold-600 text-white font-bold h-10 px-4 rounded text-xs">
                    <Link href="/contact">Contact Support</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
