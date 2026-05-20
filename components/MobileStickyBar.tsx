/**
 * MobileStickyBar.tsx
 * Floating conversion bar displayed on mobile viewports.
 * Gives instant click-to-call, WhatsApp chat, and booking form shortcuts.
 */

import Link from 'next/link';
import { Phone, Calendar } from 'lucide-react';
import { SITE } from '@/lib/seo';

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-neutral-200/80 bg-white/95 shadow-xl backdrop-blur-md md:hidden">
      <div className="grid h-full grid-cols-3 divide-x divide-neutral-100">
        {/* Action 1: Call Support */}
        <a
          href={SITE.contact.phoneTel}
          id="mobile-sticky-call"
          className="flex flex-col items-center justify-center text-navy-900 active:bg-neutral-50 transition-colors"
        >
          <Phone className="h-5 w-5 text-navy-700" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mt-1">
            Call Now
          </span>
        </a>

        {/* Action 2: WhatsApp Chat */}
        <a
          href={SITE.contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          id="mobile-sticky-whatsapp"
          className="flex flex-col items-center justify-center active:bg-neutral-50 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-5 w-5 flex-shrink-0"
          >
            <path fill="#25D366" d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12z" />
            <path fill="#FFF" fillRule="evenodd" d="M12 4.3c-4.25 0-7.7 3.45-7.7 7.7 0 1.36.35 2.68 1.02 3.86l-1.09 3.98 4.07-1.07c1.14.62 2.43.95 3.73.95 4.25 0 7.7-3.45 7.7-7.7S16.25 4.3 12 4.3zm4.56 10.92c-.25.7-1.22 1.3-1.68 1.35-.46.05-.9-.15-2.88-.94-2.53-1.02-4.14-3.6-4.27-3.77-.12-.17-1.03-1.37-1.03-2.62 0-1.25.65-1.86.88-2.1.23-.25.5-.31.67-.31.17 0 .34 0 .49.01.16.01.37-.06.58.45.21.52.73 1.78.79 1.91.06.13.1.28.01.46-.08.18-.13.3-.26.45-.13.15-.27.34-.39.46-.14.14-.28.29-.12.57.16.27.71 1.17 1.52 1.9.1.09.2.18.3.26 1.04.81 1.83 1.05 2.14 1.18.3.13.48.11.66-.09.18-.21.78-.91.99-1.22.2-.31.41-.26.69-.16.27.1 1.72.81 2.02.96.3.15.5.22.57.35.07.13.07.75-.18 1.45z" />
          </svg>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mt-1">
            WhatsApp
          </span>
        </a>

        {/* Action 3: Book Test CTA */}
        <Link
          href="/book"
          id="mobile-sticky-book"
          className="flex flex-col items-center justify-center bg-gold-500 text-white active:bg-gold-600 transition-colors"
        >
          <Calendar className="h-5 w-5" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white mt-1">
            Book Test
          </span>
        </Link>
      </div>
    </div>
  );
}
