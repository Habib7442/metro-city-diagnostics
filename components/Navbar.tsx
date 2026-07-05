'use client';

/**
 * Navbar.tsx
 * Global header navigation component.
 * Features glassmorphism background, mobile hamburger slide-out,
 * and high-contrast Gold CTA.
 */

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone, Clock, MapPin, Star } from 'lucide-react';
import { primaryNav } from '@/lib/content';
import { SITE } from '@/lib/seo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-200/60 bg-white/85 backdrop-blur-md">
      {/* Top Banner (Desktop Only) */}
      <div className="hidden border-b border-white/5 bg-navy-950 py-2.5 text-xs text-neutral-200 md:block">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 text-gold-500" />
              <span>Mon - Sat: 7:30 AM - 8:30 PM | Sun: Closed</span>
            </span>
            <span className="h-3 w-px bg-white/10" />
            <span className="flex items-center gap-2 text-neutral-300">
              <MapPin className="h-3.5 w-3.5 text-gold-500" />
              <span>Birbal Bazar, Meherpur, Silchar</span>
            </span>
          </div>
          <div className="flex items-center gap-5">
            {/* Google Rating Badge */}
            <a
              href="https://g.page/r/CQDHJDBocAP2EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:bg-white/5 px-2.5 py-1 rounded-full border border-white/10 transition-all"
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-neutral-100">4.9</span>
                <div className="flex gap-0.5 text-gold-500">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>
            </a>

            <span className="h-3 w-px bg-white/10" />

            <a
              href={SITE.contact.phoneTel}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
            >
              <Phone className="h-3.5 w-3.5 text-gold-500" />
              <span>{SITE.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Area */}
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              onClick={closeMenu}
              id="nav-logo"
              className="flex items-center gap-2.5 hover:opacity-95 transition-opacity group"
            >
              <div className="bg-white rounded-full p-1.5 flex items-center justify-center shadow-sm w-11 h-11 border border-neutral-200/60 flex-shrink-0 overflow-hidden">
                <Image
                  src="/logo.png"
                  alt="Metro-City Diagnostics Logo"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-navy-950 text-sm md:text-base tracking-wider leading-tight group-hover:text-gold-600 transition-colors">
                  METRO-CITY
                </span>
                <span className="font-display font-extrabold text-gold-600 text-[10px] md:text-[11px] tracking-widest uppercase leading-none mt-0.5">
                  DIAGNOSTICS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {primaryNav.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  id={`nav-${link.label.toLowerCase()}`}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-gold-600 relative py-1.5',
                    isActive
                      ? 'text-navy-900 font-semibold after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-gold-500'
                      : 'text-neutral-600'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-4">
            <a
              href={SITE.social.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 border border-gold-500/80 hover:bg-gold-500/10 text-gold-700 font-bold px-3 py-2 rounded text-xs transition-all shadow-sm cursor-pointer mr-1"
            >
              ⭐ Write a Review
            </a>
            <Button
              asChild
              className="bg-blue-600 font-semibold text-white hover:bg-blue-700 hover:shadow-md transition-all rounded px-5 h-11"
            >
              <Link href="/book" id="nav-cta-book">
                Book a Test
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center rounded p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 focus:outline-none focus:ring-2 focus:ring-gold-500"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={cn(
          'fixed left-0 right-0 top-20 bottom-0 z-40 w-full bg-white transition-all duration-300 lg:hidden border-t border-neutral-100 overflow-y-auto h-[calc(100vh-5rem)]',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
        )}
        id="mobile-menu"
      >
        <div className="space-y-1 px-4 py-6 shadow-inner">
          {primaryNav.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                id={`mobile-nav-${link.label.toLowerCase()}`}
                className={cn(
                  'block rounded px-4 py-3.5 text-base font-medium transition-all',
                  isActive
                    ? 'bg-navy-50 text-navy-900 font-semibold'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-navy-900'
                )}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-6 border-t border-neutral-100 mt-4 px-4 flex flex-col gap-4">
            <a
              href={SITE.social.googleBusiness}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center gap-2.5 rounded-lg border border-gold-300 bg-gold-50/50 hover:bg-gold-50 py-3.5 px-4 text-base font-bold text-gold-700 justify-center transition-colors shadow-sm cursor-pointer"
            >
              ⭐ Write a Google Review
            </a>
            <div className="flex items-center gap-3 text-sm text-neutral-600">
              <Clock className="h-5 w-5 text-gold-500 flex-shrink-0" />
              <span>
                Mon - Sat: 7:30 AM - 8:30 PM <br /> Sun: Closed
              </span>
            </div>
            <a
              href={SITE.contact.phoneTel}
              className="flex items-center gap-3 rounded-lg border border-neutral-200 py-3.5 px-4 text-base font-bold text-navy-900 justify-center hover:bg-neutral-50 transition-colors"
            >
              <Phone className="h-5 w-5 text-gold-500" />
              Call Support: {SITE.contact.phoneDisplay}
            </a>
            <Button
              asChild
              className="bg-blue-600 font-semibold text-white hover:bg-blue-700 w-full py-4 h-12 text-base rounded shadow-sm"
              onClick={closeMenu}
            >
              <Link href="/book" id="mobile-nav-cta-book">
                Book a Test
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
