import type { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = buildMetadata({
  title: 'Privacy Policy — Metro-City Diagnostics',
  description: 'Learn about our data collection, security measures, and privacy policies regarding your diagnostic tests and medical records.',
  path: '/privacy',
});

export default function PrivacyPage() {
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
            Security & Trust
          </span>
          <h1 className="text-3xl font-extrabold font-display leading-tight sm:text-4xl md:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-neutral-300 text-sm md:text-base max-w-2xl leading-relaxed">
            Metro-City Diagnostics is committed to protecting your personal and sensitive medical data. This policy outlines how we handle, store, and secure your information.
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
              <div className="flex gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-neutral-500 bg-neutral-100 px-3 py-1 rounded-full">
                  <Shield className="h-3.5 w-3.5 text-gold-600" /> NABL Standard Compliance
                </span>
              </div>
            </div>

            {/* Introduction */}
            <div className="prose prose-neutral max-w-none text-sm md:text-base leading-relaxed text-neutral-600 space-y-6">
              <p>
                At <strong>Metro-City Diagnostics</strong>, we understand that your medical records and diagnostic results are highly sensitive. Protecting your privacy is our utmost priority. We handle all personal and clinical data in strict accordance with relevant digital healthcare guidelines and Indian medical regulations.
              </p>

              <hr className="border-neutral-100 my-8" />

              {/* 1. Information We Collect */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <Eye className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">1. Information We Collect</h2>
                </div>
                <p>
                  To conduct testing and deliver accurate reports, we collect the following categories of information:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Personal Identification:</strong> Name, age, gender, date of birth, and contact information (phone number, WhatsApp number, and email address).</li>
                  <li><strong>Clinical Information:</strong> Doctor prescriptions, clinical symptoms, test histories, and diagnostic results generated from collected samples.</li>
                  <li><strong>Payment Details:</strong> Transaction records for billings, bank transfers, or UPI receipts (we do not store raw card credentials or passwords).</li>
                  <li><strong>Address Data:</strong> Residential address, specifically for booking and executing home sample collection requests.</li>
                </ul>
              </div>

              {/* 2. How We Use Your Data */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <FileText className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">2. How We Use Your Data</h2>
                </div>
                <p>
                  Your information is processed strictly for diagnostic, billing, and communication purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Processing clinical samples and generating diagnostic reports.</li>
                  <li>Delivering electronic reports via WhatsApp, SMS, or email for patient convenience.</li>
                  <li>Scheduling and optimizing home collection visits by our certified phlebotomists.</li>
                  <li>Managing patient profiles to facilitate historical comparison of medical tests.</li>
                  <li>Answering customer queries and resolving payment or billing issues.</li>
                </ul>
              </div>

              {/* 3. Data Protection & Security */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <Lock className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">3. Data Protection & Security</h2>
                </div>
                <p>
                  We implement robust digital and administrative controls to protect your data from unauthorized access or leakage:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Restricted Access:</strong> Only authorized laboratory personnel, pathologists, and medical advisers are granted access to clinical results.</li>
                  <li><strong>Encrypted Communications:</strong> We use secure protocols to transmit reports electronically via WhatsApp and email.</li>
                  <li><strong>Secure Storage:</strong> Diagnostic records are stored on password-protected cloud databases with regular security backups.</li>
                </ul>
              </div>

              {/* 4. Disclosure to Third Parties */}
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-navy-50 rounded-lg text-navy-900">
                    <Shield className="h-5 w-5 text-navy-900" />
                  </div>
                  <h2 className="text-xl font-bold font-display text-navy-950">4. Sharing Your Data</h2>
                </div>
                <p>
                  We <strong>never sell, lease, or rent</strong> your personal or diagnostic data. We only share information in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>With Your Referring Physician:</strong> If requested during booking, we send reports directly to your prescribing doctor.</li>
                  <li><strong>As Required by Law:</strong> In compliance with government regulations or public health agencies (e.g., reporting mandated communicable diseases).</li>
                </ul>
              </div>

              {/* 5. Contact Us */}
              <div className="bg-navy-950 text-white rounded-lg p-6 mt-8 space-y-4">
                <h3 className="text-lg font-bold font-display text-gold-400">Questions or Concerns?</h3>
                <p className="text-xs text-neutral-300">
                  If you have questions about our privacy policy or would like to request changes to your stored contact details, please get in touch with our data controller.
                </p>
                <div className="pt-2">
                  <Button asChild className="bg-gold-500 hover:bg-gold-600 text-white font-bold h-10 px-4 rounded text-xs">
                    <Link href="/contact">Contact Data Officer</Link>
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
