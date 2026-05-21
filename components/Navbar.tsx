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
import { Menu, X, Phone, Clock } from 'lucide-react';
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
      <div className="hidden border-b border-neutral-100 bg-navy-950 py-1.5 text-xs text-neutral-200 md:block">
        <div className="container mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gold-500" />
              Mon - Sat: 7:30 AM - 8:30 PM | Sun: Closed
            </span>
            <span className="font-medium text-gold-300">
              📍 Birbal Bazar, Meherpur, Silchar
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SITE.contact.phoneTel}
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="h-3 w-3 text-gold-500" />
              {SITE.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo Area */}
          <div className="flex flex-shrink-0 items-center">
            <Link href="/" onClick={closeMenu} id="nav-logo" className="relative block">
              <Image
                src="/logo.png"
                alt="Metro-City Diagnostics Logo"
                width={190}
                height={50}
                className="h-11 w-auto object-contain md:h-12"
                priority
              />
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
              href={SITE.contact.phoneTel}
              className="flex flex-col items-end mr-2 text-right group"
            >
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">
                Need Help? Call Us
              </span>
              <span className="text-sm font-bold text-navy-900 group-hover:text-gold-600 transition-colors flex items-center gap-1">
                <Phone className="h-3.5 w-3.5 text-gold-500" />
                {SITE.contact.phoneDisplay}
              </span>
            </a>
            <Button
              asChild
              className="bg-gold-500 font-semibold text-white hover:bg-gold-600 hover:shadow-md transition-all rounded px-5 h-11"
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
              className="bg-gold-500 font-semibold text-white hover:bg-gold-600 w-full py-4 h-12 text-base rounded shadow-sm"
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
