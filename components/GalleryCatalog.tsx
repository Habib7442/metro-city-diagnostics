'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GalleryItem {
  id: string;
  src: string;
  title: string;
  category: string;
  categoryValue: 'all' | 'lab' | 'radiology' | 'sonography' | 'care';
  description: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'lab',
    src: '/assets/gallery/1.webp',
    title: 'Advanced Pathology Laboratory',
    category: 'Pathology Lab',
    categoryValue: 'lab',
    description: 'Equipped with fully automated biochemistry analyzers, high-speed hematology systems, and high-precision immunology testing wings.'
  },
  {
    id: 'scanning',
    src: '/assets/gallery/2.webp',
    title: 'Digital Imaging & Radiography Suite',
    category: 'Radiology Wing',
    categoryValue: 'radiology',
    description: 'State-of-the-art digital X-ray scan systems providing ultra-low dose diagnostic scans with immediate imaging delivery.'
  },
  {
    id: 'ultrasound',
    src: '/assets/gallery/3.webp',
    title: '3D/4D High-Resolution Sonography',
    category: 'Sonography Suite',
    categoryValue: 'sonography',
    description: 'Clinical grade high-definition obstetric imaging, pelvic scans, abdominal ultrasound studies, and echocardiography screens.'
  },
  {
    id: 'reception',
    src: '/assets/gallery/4.webp',
    title: 'Patient Care & Consultation Lounge',
    category: 'Patient Care & Consulting',
    categoryValue: 'care',
    description: 'Designed with client comfort in mind, containing streamlined check-in zones, spacious waiting lounges, and private doctor consulting rooms.'
  }
];

const CATEGORIES: { value: 'all' | 'lab' | 'radiology' | 'sonography' | 'care'; label: string }[] = [
  { value: 'all', label: 'All Facility Wings' },
  { value: 'lab', label: 'Pathology Lab' },
  { value: 'radiology', label: 'Radiology' },
  { value: 'sonography', label: 'Sonography' },
  { value: 'care', label: 'Patient Care' },
];

export default function GalleryCatalog() {
  const [activeTab, setActiveTab] = useState<'all' | 'lab' | 'radiology' | 'sonography' | 'care'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter(
    (item) => activeTab === 'all' || item.categoryValue === activeTab
  );

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const prevIndex = (lightboxIndex - 1 + filteredItems.length) % filteredItems.length;
    setLightboxIndex(prevIndex);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    const nextIndex = (lightboxIndex + 1) % filteredItems.length;
    setLightboxIndex(nextIndex);
  };

  return (
    <div className="space-y-10">
      {/* Category Tabs */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm flex flex-wrap gap-2 justify-center sm:justify-start">
        {CATEGORIES.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={cn(
              'rounded px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all duration-150',
              activeTab === tab.value
                ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-navy-900'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setLightboxIndex(index)}
            className="group relative bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-gold-300 transition-all duration-300 cursor-pointer flex flex-col justify-between isolate"
          >
            {/* Image Box */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-navy-900 isolate">
              <Image
                src={item.src}
                alt={item.title}
                fill
                sizes="(max-w-768px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
              {/* Glassmorphic Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-navy-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <Maximize2 className="h-5 w-5" />
                </span>
              </div>
            </div>

            {/* Description Info Panel */}
            <div className="p-6 border-t border-neutral-100 flex-grow flex flex-col justify-between">
              <div>
                <span className="inline-block text-[9px] uppercase tracking-widest font-extrabold px-2.5 py-1 rounded bg-navy-50 text-navy-900 border border-navy-100/50 mb-3">
                  {item.category}
                </span>
                <h3 className="text-lg font-bold text-navy-950 leading-snug group-hover:text-gold-600 transition-colors mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-neutral-100 flex justify-between items-center text-xs">
                <span className="font-semibold text-gold-600 group-hover:underline">
                  View Full Resolution →
                </span>
                <span className="text-neutral-400">Metro-City Diagnostics</span>
              </div>
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
            <div className="relative aspect-[16/10] w-full max-h-[60vh] md:max-h-[70vh] bg-black overflow-hidden flex items-center justify-center">
              <Image
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />

              {/* Navigation Arrows */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-sm cursor-pointer shadow-md transition-all focus:outline-none z-30"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 backdrop-blur-sm cursor-pointer shadow-md transition-all focus:outline-none z-30"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Captions Detail Panel */}
            <div className="p-6 bg-navy-950 text-white border-t border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-200">
                  {filteredItems[lightboxIndex].title}
                </h4>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-gold-500/20 text-gold-300 border border-gold-500/30 px-3 py-1 rounded">
                  {filteredItems[lightboxIndex].category}
                </span>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed max-w-3xl">
                {filteredItems[lightboxIndex].description}
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center text-xs text-neutral-500">
                <span>Facility Wing Gallery</span>
                <span>Image {lightboxIndex + 1} of {filteredItems.length}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
