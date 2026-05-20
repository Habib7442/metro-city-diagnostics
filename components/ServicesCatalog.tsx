'use client';

/**
 * ServicesCatalog.tsx
 * Client-side catalog filtering component.
 * Synchronizes search input and category selections with URLSearchParams.
 */

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, Clock, ShieldCheck, X, FileText, CheckCircle2 } from 'lucide-react';
import { Service, ServiceCategory } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type Props = {
  initialServices: Service[];
};

const CATEGORIES: { value: 'all' | ServiceCategory; label: string }[] = [
  { value: 'all', label: 'All Services' },
  { value: 'pathology', label: 'Pathology / Blood Tests' },
  { value: 'radiology', label: 'Digital X-Ray' },
  { value: 'imaging', label: 'Ultrasound / Sonography' },
  { value: 'cardiac', label: 'ECG & Cardiology' },
  { value: 'package', label: 'Health Packages' },
];

export default function ServicesCatalog({ initialServices }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Search input state
  const activeCategory = (searchParams.get('category') || 'all') as 'all' | ServiceCategory;
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');

  // Synchronize category or query to URL search parameters
  const updateParams = (category: string, query: string) => {
    const params = new URLSearchParams();
    if (category && category !== 'all') {
      params.set('category', category);
    }
    if (query) {
      params.set('q', query);
    }
    startTransition(() => {
      router.push(`/services?${params.toString()}`);
    });
  };

  const handleCategoryChange = (val: 'all' | ServiceCategory) => {
    updateParams(val, searchQuery);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateParams(activeCategory, searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
    updateParams(activeCategory, '');
  };

  // Filter logic on client to ensure immediate visual responsiveness
  const filteredServices = initialServices.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      !searchQuery ||
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.sampleType && service.sampleType.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Tabs Controls */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
        <form onSubmit={handleSearchSubmit} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search by test name, keywords (e.g., lipid, blood, ultrasound)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded border border-neutral-200 py-3 pl-11 pr-10 text-sm focus:border-gold-500 focus:outline-none bg-neutral-50/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-4.5 w-4.5" />
              </button>
            )}
          </div>
          <Button
            type="submit"
            className="bg-navy-900 text-white font-semibold hover:bg-navy-950 px-8 py-3.5 h-12 rounded transition-colors"
          >
            Search
          </Button>
        </form>

        {/* Categories Navigation Bar */}
        <div className="flex flex-wrap gap-2 mt-6 border-t border-neutral-100 pt-6">
          {CATEGORIES.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleCategoryChange(tab.value)}
              className={cn(
                'rounded px-4 py-2 text-xs font-semibold uppercase tracking-wider border transition-all duration-150',
                activeCategory === tab.value
                  ? 'bg-navy-950 text-white border-navy-950 shadow-sm'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50 hover:text-navy-900'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Services Count / Pending Loader */}
      <div className="flex items-center justify-between text-sm text-neutral-500 px-1">
        <div>
          Showing <span className="font-bold text-navy-900">{filteredServices.length}</span> tests
          {searchQuery && (
            <span>
              {' '}
              matching "<span className="font-semibold text-neutral-700">{searchQuery}</span>"
            </span>
          )}
        </div>
        {isPending && <span className="text-xs text-gold-600 font-medium animate-pulse">Filtering...</span>}
      </div>

      {/* Grid of Results */}
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredServices.map((service) => (
            <div
              key={service.slug}
              className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-neutral-300 transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-navy-50 text-navy-900 text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded">
                    {service.category === 'package' ? 'Health Package' : service.category}
                  </span>
                  {service.turnaroundHours && (
                    <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5 text-gold-500" />
                      {service.turnaroundHours} hr
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-navy-950 mb-2 leading-snug group-hover:text-gold-600 transition-colors">
                  {service.name}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-6 line-clamp-3">
                  {service.shortDescription}
                </p>
              </div>

              <div className="border-t border-neutral-100 pt-4 mt-2">
                {/* Meta details */}
                {service.sampleType && (
                  <div className="flex items-center gap-1.5 text-xs text-neutral-400 mb-4">
                    <span className="font-medium text-neutral-500">Sample:</span>
                    <span>{service.sampleType}</span>
                  </div>
                )}

                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-[10px] text-neutral-400 uppercase font-semibold block leading-tight">
                      Test Fee
                    </span>
                    <span className="text-xl font-extrabold text-navy-900">
                      ₹{service.price}
                    </span>
                    {service.priceNote && (
                      <span className="text-[10px] text-neutral-400 block mt-0.5">
                        *{service.priceNote}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded text-xs font-semibold"
                  >
                    <Link href={`/services/${service.slug}`}>Details</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded text-xs"
                  >
                    <Link href={`/book?test=${service.slug}`}>Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-neutral-200 rounded-lg shadow-sm">
          <FileText className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
          <h4 className="font-bold text-navy-900 mb-1">No Tests Found</h4>
          <p className="text-sm text-neutral-500 max-w-sm mx-auto">
            We couldn't find any test matching your filters. Please adjust your keywords or choose another category.
          </p>
          <button
            onClick={handleClear}
            className="mt-4 text-xs font-bold text-gold-600 hover:text-gold-700 hover:underline"
          >
            Clear Search & Filters
          </button>
        </div>
      )}

      {/* Bottom info section */}
      <div className="bg-navy-950 text-white rounded-lg p-6 flex flex-col md:flex-row items-center justify-between gap-4 border border-navy-900 shadow-md">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-10 w-10 text-gold-500 flex-shrink-0" />
          <div>
            <h5 className="font-bold text-sm">Need a specialized test not listed here?</h5>
            <p className="text-xs text-neutral-400 mt-0.5">
              We process hundreds of specialized parameters via our referral network.
            </p>
          </div>
        </div>
        <a
          href="tel:09957357278"
          className="bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded px-5 py-2.5 text-xs shadow-sm hover:shadow transition-all"
        >
          Call Support: 099573 57278
        </a>
      </div>
    </div>
  );
}
