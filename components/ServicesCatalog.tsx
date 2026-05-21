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
  { value: 'blood', label: 'Blood Tests' },
  { value: 'urine', label: 'Urine Tests' },
  { value: 'stool', label: 'Stool Tests' },
  { value: 'sputum', label: 'Sputum Tests' },
  { value: 'imaging', label: 'Imaging & Scans' },
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
          {filteredServices.map((service) => {
            const isSilver = service.name.toLowerCase().includes('silver');
            const isGold = service.name.toLowerCase().includes('gold');
            const isPlatinum = service.name.toLowerCase().includes('platinum');

            // Dynamic styles based on package tier (Silver, Gold, Platinum) or generic test
            let cardStyle = "hover:shadow-md hover:border-neutral-300";
            let badgeStyle = "bg-navy-50 text-navy-900 border border-transparent";
            let badgeLabel = service.category === 'package' ? 'Health Package' : service.category === 'imaging' ? 'Imaging Scan' : `${service.category} Test`;
            let titleStyle = "text-navy-950 group-hover:text-gold-600";
            let checkIconStyle = "text-gold-500";
            let buttonStyle = "bg-gold-500 hover:bg-gold-600 text-white";

            if (isSilver) {
              cardStyle = "hover:shadow-md hover:shadow-slate-100/50 hover:border-slate-350";
              badgeStyle = "bg-slate-100 text-slate-700 border border-slate-200/80";
              badgeLabel = "Silver Package";
              titleStyle = "text-slate-500 group-hover:text-slate-650";
              checkIconStyle = "text-slate-400";
              buttonStyle = "bg-slate-600 hover:bg-slate-750 text-white";
            } else if (isGold) {
              cardStyle = "hover:shadow-md hover:shadow-gold-50/50 hover:border-gold-300/80";
              badgeStyle = "bg-gold-50 text-gold-700 border border-gold-200/60";
              badgeLabel = "Gold Package";
              titleStyle = "text-gold-600 group-hover:text-gold-750";
              checkIconStyle = "text-gold-500";
              buttonStyle = "bg-gold-600 hover:bg-gold-750 text-white";
            } else if (isPlatinum) {
              cardStyle = "hover:shadow-md hover:shadow-sky-50/50 hover:border-sky-200";
              badgeStyle = "bg-sky-50 text-sky-800 border border-sky-200/50";
              badgeLabel = "Platinum Package";
              titleStyle = "text-sky-800 group-hover:text-sky-900";
              checkIconStyle = "text-sky-500";
              buttonStyle = "bg-sky-700 hover:bg-sky-800 text-white";
            }

            return (
              <div
                key={service.slug}
                className={cn(
                  "rounded-lg border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between transition-all group",
                  cardStyle
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn("inline-block text-[10px] uppercase tracking-wider font-extrabold px-2.5 py-1 rounded", badgeStyle)}>
                      {badgeLabel}
                    </span>
                    {service.turnaroundHours && (
                      <span className="text-xs text-neutral-400 flex items-center gap-1.5 font-medium">
                        <Clock className="h-3.5 w-3.5 text-gold-500" />
                        {service.turnaroundHours} hr
                      </span>
                    )}
                  </div>
                  <h3 className={cn("text-lg font-bold mb-2 leading-snug transition-colors", titleStyle)}>
                    {service.name}
                  </h3>
                  {service.category === 'package' && service.includes ? (
                    <div className="mb-6 space-y-3.5">
                      <p className="text-xs text-neutral-600 font-semibold leading-relaxed">
                        {service.shortDescription.split('. Covers:')[0]}. Covers:
                      </p>
                      <ul className="grid grid-cols-2 gap-x-3 gap-y-2">
                        {service.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-neutral-600">
                            <CheckCircle2 className={cn("h-4 w-4 flex-shrink-0", checkIconStyle)} />
                            <span className="font-medium">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {service.tests && (
                        <div className="mt-4 pt-3 border-t border-neutral-100">
                          <span className="text-[10px] text-neutral-400 uppercase font-bold block mb-2 tracking-wider">
                            Key Tests Included:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {service.tests.map((test) => (
                              <span key={test} className="bg-navy-50/50 border border-navy-100/40 rounded-full px-2.5 py-0.5 text-[10px] text-navy-900 font-medium">
                                {test}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-neutral-500 leading-relaxed mb-6 line-clamp-3">
                      {service.shortDescription}
                    </p>
                  )}
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
                      {service.price ? (
                        <div className="flex items-baseline gap-2">
                          <span className="text-xl font-extrabold text-navy-900">
                            ₹{service.price}
                          </span>
                          {service.originalPrice && (
                            <span className="text-sm text-neutral-400 line-through font-semibold">
                              ₹{service.originalPrice}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-sm font-bold text-gold-600">
                          {service.priceNote || 'Call for price'}
                        </span>
                      )}
                      {service.price && service.priceNote && (
                        <span className="text-[10px] text-neutral-400 block mt-0.5">
                          *{service.priceNote}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <Button
                      asChild
                      className={cn("w-full font-bold rounded h-12 text-sm shadow-sm transition-all", buttonStyle)}
                    >
                      <Link href={`/book?test=${service.slug}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
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
