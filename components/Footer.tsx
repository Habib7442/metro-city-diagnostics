/**
 * Footer.tsx
 * Global footer component.
 * Features deep navy background and structured layouts for local SEO optimization.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { footerNav } from '@/lib/content';
import { SITE } from '@/lib/seo';

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-neutral-300 border-t border-navy-950">
      {/* Top section: Info boxes */}
      <div className="border-b border-navy-800 py-12">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Box 1: Address */}
            <div className="flex gap-4">
              <MapPin className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Our Location</h4>
                <p className="text-sm leading-relaxed text-neutral-400">
                  {SITE.address.streetAddress},<br />
                  {SITE.address.addressLocality}, {SITE.address.addressRegion} {SITE.address.postalCode}
                </p>
                <p className="text-xs font-bold text-gold-300 mt-2.5 flex items-center gap-1.5">
                  <span>📍</span>
                  <span>Near Vivekananda Statue</span>
                </p>
              </div>
            </div>

            {/* Box 2: Hours */}
            <div className="flex gap-4">
              <Clock className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Working Hours</h4>
                <div className="text-sm text-neutral-400 space-y-2">
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-neutral-400 w-20 flex-shrink-0">Mon - Sat:</span>
                    <span className="font-semibold text-neutral-200">7:30 AM - 8:30 PM</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-neutral-400 w-20 flex-shrink-0">Sunday:</span>
                    <span className="inline-flex items-center font-extrabold text-[10px] uppercase tracking-wider text-rose-400 bg-rose-950/40 border border-rose-900/40 px-2 py-0.5 rounded shadow-sm">
                      Closed
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3: Contact */}
            <div className="flex gap-4">
              <Phone className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Call & WhatsApp</h4>
                <a
                  href={SITE.contact.phoneTel}
                  className="block text-base font-bold text-white hover:text-gold-500 transition-colors mb-1"
                >
                  {SITE.contact.phoneDisplay}
                </a>
                <a
                  href={SITE.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs font-semibold text-neutral-300 hover:text-white gap-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 flex-shrink-0"
                  >
                    <path fill="#25D366" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" />
                    <path fill="#FFF" fillRule="evenodd" d="M12 4.3c-4.25 0-7.7 3.45-7.7 7.7 0 1.36.35 2.68 1.02 3.86l-1.09 3.98 4.07-1.07c1.14.62 2.43.95 3.73.95 4.25 0 7.7-3.45 7.7-7.7S16.25 4.3 12 4.3zm4.56 10.92c-.25.7-1.22 1.3-1.68 1.35-.46.05-.9-.15-2.88-.94-2.53-1.02-4.14-3.6-4.27-3.77-.12-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.1.23-.25.5-.31.67-.31.17 0 .34 0 .49.01.16.01.37-.06.58.45.21.52.73 1.78.79 1.91.06.13.1.28.01.46-.08.18-.13.3-.26.45-.13.15-.27.34-.39.46-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9.1.09.2.18.3.26 1.04.81 1.83 1.05 2.14 1.18.3.13.48.11.66-.09.18-.21.78-.91.99-1.22.2-.31.41-.26.69-.16.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
                  </svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Box 4: Email */}
            <div className="flex gap-4">
              <Mail className="h-6 w-6 text-gold-500 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Support Email</h4>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="block text-sm text-neutral-400 hover:text-white transition-colors"
                >
                  {SITE.contact.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mid section: Nav lists */}
      <div className="py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Brand pane */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="inline-flex items-center gap-3.5 hover:opacity-90 transition-opacity group">
                <div className="bg-white rounded-lg p-2 flex items-center justify-center shadow-sm w-12 h-12 flex-shrink-0 overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Metro-City Diagnostics Logo"
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-black text-white text-base tracking-wider leading-tight group-hover:text-gold-300 transition-colors">
                    METRO-CITY
                  </span>
                  <span className="font-display font-extrabold text-gold-500 text-[11px] tracking-widest uppercase leading-none mt-0.5">
                    DIAGNOSTICS
                  </span>
                </div>
              </Link>
              <p className="text-sm leading-relaxed text-neutral-400 max-w-md">
                A premium diagnostic center and pathology laboratory located in Meherpur, Silchar.
                Dedicated to providing accurate, quick reports and home collection services across Cachar.
              </p>
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-xs text-neutral-400 font-medium">
                  Equipped with Modern Pathology & Radiology Scanners
                </span>
              </div>
            </div>

            {/* Links lists */}
            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-6">
                Our Services
              </h5>
              <ul className="space-y-4 text-sm">
                {footerNav.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-6">
                Quick Links
              </h5>
              <ul className="space-y-4 text-sm">
                {footerNav.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-neutral-400 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-white uppercase tracking-wider text-xs mb-6">
                Accreditation & Trust
              </h5>
              <div className="space-y-4 text-sm text-neutral-400">
                <p>
                  Our lab operates under strict internal quality controls, participating in external quality programs for blood chemistry, hematology, and hormones.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom section: Legal & Copyright */}
      <div className="bg-navy-950 py-8 text-xs text-neutral-400 border-t border-navy-900/60">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p>© 2026 {SITE.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {footerNav.legal.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-neutral-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={SITE.social.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors flex items-center gap-1 text-[11px]"
            >
              Google Maps Location
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
