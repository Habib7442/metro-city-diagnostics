'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = [
  '/assets/gallery/1.webp',
  '/assets/gallery/2.webp',
  '/assets/gallery/3.webp',
  '/assets/gallery/4.webp',
];

export default function GalleryCatalog() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = (lightboxIndex - 1 + IMAGES.length) % IMAGES.length;
    setLightboxIndex(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + 1) % IMAGES.length;
    setLightboxIndex(nextIndex);
  };

  return (
    <div className="space-y-10">
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {IMAGES.map((src, index) => (
          <div
            key={src}
            onClick={() => setLightboxIndex(index)}
            className="group relative bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-md hover:shadow-2xl hover:border-gold-400 transition-all duration-300 cursor-pointer aspect-[16/10] w-full isolate"
          >
            <Image
              src={src}
              alt={`Metro-City Diagnostics Clinic Gallery Image ${index + 1}`}
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              priority={index < 2}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
            {/* Glassmorphic Hover Overlay */}
            <div className="absolute inset-0 bg-navy-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="p-3.5 bg-white/20 backdrop-blur-md rounded-full border border-white/25 text-white shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <Maximize2 className="h-5.5 w-5.5" />
              </span>
            </div>
            {/* High-fidelity glowing inner accent outline on hover */}
            <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-gold-300/40 pointer-events-none z-10" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy-950/95 p-4 backdrop-blur-md animate-fade-in"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-50 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-sm cursor-pointer shadow-md transition-all focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Lightbox Wrapper */}
          <div
            className="relative flex flex-col max-w-5xl w-full max-h-[85vh] bg-navy-900 rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Viewport Frame */}
            <div className="relative aspect-[16/10] w-full max-h-[80vh] md:max-h-[85vh] bg-black overflow-hidden flex items-center justify-center">
              <Image
                src={IMAGES[lightboxIndex]}
                alt={`Metro-City Diagnostics Clinic Gallery Image ${lightboxIndex + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* Navigation Arrows */}
              {IMAGES.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-sm cursor-pointer shadow-md transition-all focus:outline-none z-30"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-sm cursor-pointer shadow-md transition-all focus:outline-none z-30"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
