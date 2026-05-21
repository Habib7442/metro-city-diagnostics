/**
 * MobileStickyBar.tsx
 * Floating conversion bar displayed on mobile viewports.
 * Gives instant click-to-call, packages list, and booking form shortcuts.
 */

import Link from 'next/link';
import { Phone, Calendar, Package } from 'lucide-react';
import { SITE } from '@/lib/seo';

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 h-16 border-t border-neutral-200/80 bg-white/95 shadow-xl backdrop-blur-md md:hidden">
      <div className="grid h-full grid-cols-3 divide-x divide-neutral-100">
        {/* Action 1: Call Support */}
        <a
          href={SITE.contact.phoneTel}
          id="mobile-sticky-call"
          className="flex flex-col items-center justify-center bg-white text-navy-900 active:bg-neutral-50 transition-colors"
        >
          <Phone className="h-5 w-5 text-navy-700" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mt-1">
            Call Now
          </span>
        </a>

        {/* Action 2: Premium Packages (STANDOUT ACCENT COLOR + HOT BADGE) */}
        <Link
          href="/services?category=package"
          id="mobile-sticky-packages"
          className="relative flex flex-col items-center justify-center bg-gold-500 text-white active:bg-gold-600 transition-colors"
        >
          <span className="absolute -top-2 left-1/2 -translate-x-1/2 flex h-4 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-rose-600 px-2 text-[8px] font-black uppercase tracking-widest text-white shadow-[0_2px_8px_rgba(225,29,72,0.5)] border border-white animate-pulse">
            HOT
          </span>
          <Package className="h-5 w-5 text-white" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-white mt-1">
            Packages
          </span>
        </Link>

        {/* Action 3: Book Test CTA */}
        <Link
          href="/book"
          id="mobile-sticky-book"
          className="flex flex-col items-center justify-center bg-white text-navy-900 active:bg-neutral-50 transition-colors"
        >
          <Calendar className="h-5 w-5 text-navy-700" />
          <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-600 mt-1">
            Book Test
          </span>
        </Link>
      </div>
    </div>
  );
}

