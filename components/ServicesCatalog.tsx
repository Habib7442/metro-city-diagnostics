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
  { value: 'neurology', label: 'Neurology' },
  { value: 'heart', label: 'Cardiology' },
  { value: 'hearing', label: 'Hearing Tests' },
  { value: 'vascular', label: 'Vascular' },
];

export default function ServicesCatalog({ initialServices }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Search input state
  const activeCategory = (searchParams.get('category') || 'all') as 'all' | ServiceCategory;
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [expandedServices, setExpandedServices] = useState<Record<string, boolean>>({});

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
              placeholder="Search by test name, keywords (e.g., lipid, blood, mri, eeg, ecg)..."
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
            const isExpanded = !!expandedServices[service.slug];
            const limit = 8;
            const displayTests = isExpanded ? (service.tests || []) : (service.tests || []).slice(0, limit);
            const hasMore = service.tests && service.tests.length > limit;

            const isPackage = service.category === 'package';
            const nameLower = service.name.toLowerCase();
            const isSilver = isPackage && nameLower.includes('silver');
            const isGold = isPackage && nameLower.includes('gold');
            const isPlatinum = isPackage && nameLower.includes('platinum');
            const isExpert = isPackage && nameLower.includes('expert');
            const isProActive = isPackage && nameLower.includes('proactive');
            const isActive = isPackage && nameLower.includes('active') && !nameLower.includes('proactive');
            const isVitalPlus = isPackage && nameLower.includes('vital plus');
            const isVital = isPackage && nameLower.includes('vital') && !nameLower.includes('plus');
            const isEssential = isPackage && nameLower.includes('essential');
            const isBasic = isPackage && nameLower.includes('basic');
            const isChamp1 = isPackage && nameLower.includes('champ 1');
            const isChamp2 = isPackage && nameLower.includes('champ 2');
            const isChamp3 = isPackage && nameLower.includes('champ 3');

            // Test category classification
            const isBlood = !isPackage && service.category === 'blood';
            const isUrine = !isPackage && service.category === 'urine';
            const isStool = !isPackage && service.category === 'stool';
            const isSputum = !isPackage && service.category === 'sputum';
            const isImaging = !isPackage && service.category === 'imaging';
            const isNeurology = !isPackage && service.category === 'neurology';
            const isHeart = !isPackage && service.category === 'heart';
            const isHearing = !isPackage && service.category === 'hearing';
            const isVascular = !isPackage && service.category === 'vascular';

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
            } else if (isExpert) {
              cardStyle = "hover:shadow-md hover:shadow-purple-50/50 hover:border-purple-200";
              badgeStyle = "bg-purple-50 text-purple-700 border border-purple-200/50";
              badgeLabel = "Expert Package";
              titleStyle = "text-purple-800 group-hover:text-purple-900";
              checkIconStyle = "text-purple-500";
              buttonStyle = "bg-purple-700 hover:bg-purple-800 text-white";
            } else if (isProActive) {
              cardStyle = "hover:shadow-md hover:shadow-fuchsia-50/50 hover:border-fuchsia-200";
              badgeStyle = "bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/50";
              badgeLabel = "ProActive Package";
              titleStyle = "text-fuchsia-800 group-hover:text-fuchsia-900";
              checkIconStyle = "text-fuchsia-500";
              buttonStyle = "bg-fuchsia-700 hover:bg-fuchsia-800 text-white";
            } else if (isActive) {
              cardStyle = "hover:shadow-md hover:shadow-emerald-50/50 hover:border-emerald-200";
              badgeStyle = "bg-emerald-50 text-emerald-700 border border-emerald-200/50";
              badgeLabel = "Active Package";
              titleStyle = "text-emerald-800 group-hover:text-emerald-900";
              checkIconStyle = "text-emerald-500";
              buttonStyle = "bg-emerald-700 hover:bg-emerald-800 text-white";
            } else if (isVitalPlus) {
              cardStyle = "hover:shadow-md hover:shadow-rose-50/50 hover:border-rose-200";
              badgeStyle = "bg-rose-50 text-rose-700 border border-rose-200/50";
              badgeLabel = "Vital Plus Package";
              titleStyle = "text-rose-800 group-hover:text-rose-900";
              checkIconStyle = "text-rose-500";
              buttonStyle = "bg-rose-700 hover:bg-rose-800 text-white";
            } else if (isVital) {
              cardStyle = "hover:shadow-md hover:shadow-indigo-50/50 hover:border-indigo-200";
              badgeStyle = "bg-indigo-50 text-indigo-700 border border-indigo-200/50";
              badgeLabel = "Vital Package";
              titleStyle = "text-indigo-800 group-hover:text-indigo-900";
              checkIconStyle = "text-indigo-500";
              buttonStyle = "bg-indigo-700 hover:bg-indigo-800 text-white";
            } else if (isEssential) {
              cardStyle = "hover:shadow-md hover:shadow-amber-50/50 hover:border-amber-200";
              badgeStyle = "bg-amber-50 text-amber-700 border border-amber-200/50";
              badgeLabel = "Essential Package";
              titleStyle = "text-amber-800 group-hover:text-amber-900";
              checkIconStyle = "text-amber-500";
              buttonStyle = "bg-amber-700 hover:bg-amber-800 text-white";
            } else if (isBasic) {
              cardStyle = "hover:shadow-md hover:shadow-blue-50/50 hover:border-blue-200";
              badgeStyle = "bg-blue-50 text-blue-700 border border-blue-200/50";
              badgeLabel = "Basic Package";
              titleStyle = "text-blue-800 group-hover:text-blue-900";
              checkIconStyle = "text-blue-500";
              buttonStyle = "bg-blue-700 hover:bg-blue-800 text-white";
            } else if (isChamp1) {
              cardStyle = "hover:shadow-md hover:shadow-cyan-50/50 hover:border-cyan-200";
              badgeStyle = "bg-cyan-50 text-cyan-800 border border-cyan-200/50";
              badgeLabel = "Champ 1 Package";
              titleStyle = "text-cyan-800 group-hover:text-cyan-900";
              checkIconStyle = "text-cyan-500";
              buttonStyle = "bg-cyan-700 hover:bg-cyan-800 text-white";
            } else if (isChamp2) {
              cardStyle = "hover:shadow-md hover:shadow-teal-50/50 hover:border-teal-200";
              badgeStyle = "bg-teal-50 text-teal-800 border border-teal-200/50";
              badgeLabel = "Champ 2 Package";
              titleStyle = "text-teal-800 group-hover:text-teal-900";
              checkIconStyle = "text-teal-500";
              buttonStyle = "bg-teal-700 hover:bg-teal-800 text-white";
            } else if (isChamp3) {
              cardStyle = "hover:shadow-md hover:shadow-emerald-50/50 hover:border-emerald-200";
              badgeStyle = "bg-emerald-50 text-emerald-800 border border-emerald-200/50";
              badgeLabel = "Champ 3 Package";
              titleStyle = "text-emerald-800 group-hover:text-emerald-900";
              checkIconStyle = "text-emerald-500";
              buttonStyle = "bg-emerald-700 hover:bg-emerald-800 text-white";
            } else if (isBlood) {
              cardStyle = "hover:shadow-md hover:shadow-rose-50/50 hover:border-rose-300";
              badgeStyle = "bg-rose-50 text-rose-700 border border-rose-200/50";
              badgeLabel = "Blood Test";
              titleStyle = "text-navy-950 group-hover:text-rose-600";
              buttonStyle = "bg-rose-600 hover:bg-rose-700 text-white";
            } else if (isUrine) {
              cardStyle = "hover:shadow-md hover:shadow-amber-50/50 hover:border-amber-300";
              badgeStyle = "bg-amber-50 text-amber-800 border border-amber-200/50";
              badgeLabel = "Urine Test";
              titleStyle = "text-navy-950 group-hover:text-amber-600";
              buttonStyle = "bg-amber-600 hover:bg-amber-700 text-white";
            } else if (isStool) {
              cardStyle = "hover:shadow-md hover:shadow-emerald-50/50 hover:border-emerald-300";
              badgeStyle = "bg-emerald-50 text-emerald-800 border border-emerald-200/50";
              badgeLabel = "Stool Test";
              titleStyle = "text-navy-950 group-hover:text-emerald-600";
              buttonStyle = "bg-emerald-600 hover:bg-emerald-700 text-white";
            } else if (isSputum) {
              cardStyle = "hover:shadow-md hover:shadow-teal-50/50 hover:border-teal-300";
              badgeStyle = "bg-teal-50 text-teal-800 border border-teal-200/50";
              badgeLabel = "Sputum Test";
              titleStyle = "text-navy-950 group-hover:text-teal-600";
              buttonStyle = "bg-teal-600 hover:bg-teal-700 text-white";
            } else if (isImaging) {
              cardStyle = "hover:shadow-md hover:shadow-violet-50/50 hover:border-violet-300";
              badgeStyle = "bg-violet-50 text-violet-800 border border-violet-200/50";
              badgeLabel = "Imaging Scan";
              titleStyle = "text-navy-950 group-hover:text-violet-600";
              buttonStyle = "bg-violet-600 hover:bg-violet-700 text-white";
            } else if (isNeurology) {
              cardStyle = "hover:shadow-md hover:shadow-indigo-50/50 hover:border-indigo-300";
              badgeStyle = "bg-indigo-50 text-indigo-800 border border-indigo-200/50";
              badgeLabel = "Neurology Test";
              titleStyle = "text-navy-950 group-hover:text-indigo-600";
              buttonStyle = "bg-indigo-600 hover:bg-indigo-700 text-white";
            } else if (isHeart) {
              cardStyle = "hover:shadow-md hover:shadow-fuchsia-50/50 hover:border-fuchsia-300";
              badgeStyle = "bg-fuchsia-50 text-fuchsia-800 border border-fuchsia-200/50";
              badgeLabel = "Heart Test";
              titleStyle = "text-navy-950 group-hover:text-fuchsia-600";
              buttonStyle = "bg-fuchsia-600 hover:bg-fuchsia-700 text-white";
            } else if (isHearing) {
              cardStyle = "hover:shadow-md hover:shadow-cyan-50/50 hover:border-cyan-300";
              badgeStyle = "bg-cyan-50 text-cyan-800 border border-cyan-200/50";
              badgeLabel = "Hearing Test";
              titleStyle = "text-navy-950 group-hover:text-cyan-600";
              buttonStyle = "bg-cyan-600 hover:bg-cyan-700 text-white";
            } else if (isVascular) {
              cardStyle = "hover:shadow-md hover:shadow-sky-50/50 hover:border-sky-300";
              badgeStyle = "bg-sky-50 text-sky-800 border border-sky-200/50";
              badgeLabel = "Vascular Test";
              titleStyle = "text-navy-950 group-hover:text-sky-600";
              buttonStyle = "bg-sky-600 hover:bg-sky-700 text-white";
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
                            {displayTests.map((test) => (
                              <span key={test} className="bg-navy-50/50 border border-navy-100/40 rounded-full px-2.5 py-0.5 text-[10px] text-navy-900 font-medium">
                                {test}
                              </span>
                            ))}
                            {hasMore && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setExpandedServices(prev => ({
                                    ...prev,
                                    [service.slug]: !prev[service.slug]
                                  }));
                                }}
                                className={cn(
                                  "border rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm transition-all cursor-pointer",
                                  isExpanded
                                    ? "bg-neutral-200 border-neutral-300 text-neutral-700 hover:bg-neutral-350"
                                    : "bg-navy-950/10 border-navy-950/20 text-navy-950 hover:bg-navy-950/20"
                                )}
                              >
                                {isExpanded ? 'Show Less' : `+${service.tests.length - limit} more`}
                              </button>
                            )}
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
