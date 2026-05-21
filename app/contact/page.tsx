import type { Metadata } from 'next';
import { Phone, Mail, MapPin, Clock, Compass, ExternalLink } from 'lucide-react';
import { SITE, buildMetadata, pageSeo, jsonLdProps, organizationJsonLd } from '@/lib/seo';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = buildMetadata({
  title: 'Contact Us & Location Directions — Birbal Bazar, Silchar',
  description:
    'Find Metro-City Diagnostics in Meherpur, Silchar. View laboratory timings, support numbers, email address, written landmarks directions, and interactive maps.',
  path: '/contact',
  keywords: ['Metro City Diagnostics address', 'diagnostic center Meherpur Silchar'],
});

export default function ContactPage() {
  const orgSchema = organizationJsonLd;

  return (
    <div className="bg-[#FAFAFB] py-12 md:py-20 min-h-screen">
      {/* Schema Injection */}
      <script {...jsonLdProps(orgSchema)} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block bg-navy-50 text-navy-900 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
            Get In Touch
          </span>
          <h1 className="text-4xl font-extrabold font-display text-navy-900 leading-tight sm:text-5xl mb-4">
            Contact Metro-City Diagnostics
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg leading-relaxed">
            Have questions about sample collections, fasting guides, or digital report delivery? Connect with our patient support desk or visit our Birbal Bazar center.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Map */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Contact Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1: Call & WhatsApp */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm flex items-start gap-4">
                <Phone className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-navy-900 text-sm">Call & WhatsApp</h3>
                  <a
                    href={SITE.contact.phoneTel}
                    className="block text-base font-bold text-navy-950 hover:text-gold-500 transition-colors mt-2"
                  >
                    {SITE.contact.phoneDisplay}
                  </a>
                  <a
                    href={SITE.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-semibold text-green-500 hover:text-green-600 transition-colors mt-1.5 gap-1"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

              {/* Card 2: Support Email */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm flex items-start gap-4">
                <Mail className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-navy-900 text-sm">Support Email</h3>
                  <a
                    href={`mailto:${SITE.contact.email}`}
                    className="block text-sm font-semibold text-neutral-600 hover:text-navy-950 transition-colors mt-2 break-all"
                  >
                    {SITE.contact.email}
                  </a>
                  <span className="text-[10px] text-neutral-400 block mt-1">
                    Typically replies in 2-4 hours
                  </span>
                </div>
              </div>
            </div>

            {/* Operating Hours & Directions */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8 shadow-sm space-y-6">
              <div className="flex gap-4">
                <Clock className="h-6 w-6 text-gold-500 flex-shrink-0 mt-0.5" />
                <div className="w-full">
                  <h3 className="font-bold text-navy-900 text-base mb-3">Operating Timings</h3>
                  <div className="text-xs sm:text-sm text-neutral-500 space-y-2">
                    <p className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="font-semibold text-neutral-700">Monday - Saturday:</span>
                      <span className="font-bold text-navy-900">7:30 AM - 8:30 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="font-semibold text-neutral-700">Sunday:</span>
                      <span className="font-bold text-navy-900">Closed</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-neutral-100 pt-6 flex gap-4">
                <Compass className="h-6 w-6 text-gold-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-navy-900 text-base mb-3">Landmarks & Directions</h3>
                  <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed">
                    Metro-City Diagnostics is centrally located in <strong className="font-semibold text-navy-950">Meherpur, Birbal Bazar, Silchar</strong>, easily accessible via major town transit routes:
                  </p>
                  <ul className="list-disc pl-5 mt-3 space-y-2 text-xs sm:text-sm text-neutral-500">
                    <li>Located near the <strong className="font-semibold text-navy-950">Vivekananda Statue Co-operative Building</strong> right off the highway.</li>
                    <li>Approximately <strong className="font-semibold text-navy-950">1.8 km</strong> from Silchar Medical College & Hospital.</li>
                    <li>Easily accessible by local auto-rickshaws and cabs with designated parking space directly in front of our entrance.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Interactive Maps Embed */}
            <div className="bg-white rounded-lg border border-neutral-200 overflow-hidden shadow-sm">
              <div className="p-4 bg-neutral-50 border-b border-neutral-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4.5 w-4.5 text-navy-700" />
                  <span className="text-xs font-bold text-navy-900">Google Maps Navigation Location</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Metro-City+Diagnostics+Silchar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-gold-700 hover:text-gold-800 flex items-center gap-1 transition-colors"
                >
                  Open in Maps
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <div className="h-[350px] w-full bg-neutral-100">
                <iframe
                  title="Metro-City Diagnostics Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7243.64653953248!2d92.78565079895019!3d24.801504468480108!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e4bcc779b118d%3A0xf60370683024c700!2sMetro-City%20Diagnostics!5e0!3m2!1sen!2sin!4v1779330698021!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-5">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
