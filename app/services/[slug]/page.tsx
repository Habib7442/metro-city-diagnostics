import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Clock, ShieldCheck, FileText, ArrowLeft, Calendar, HelpCircle, Phone, CheckCircle2 } from 'lucide-react';
import { services } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { SITE, jsonLdProps, medicalTestJsonLd } from '@/lib/seo';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate metadata dynamically
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);
  if (!service) return {};

  return {
    title: `${service.name} — Test Fee, Prep & Timings`,
    description: service.shortDescription,
    alternates: {
      canonical: `${SITE.url}/services/${resolvedParams.slug}`,
    },
  };
}

// Generate static params at build time
export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServiceDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const service = services.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Related services lookup
  const relatedServices = services.filter((s) =>
    service.relatedSlugs?.includes(s.slug)
  );

  // Construct JSON-LD Schema
  const testSchema = medicalTestJsonLd({
    name: service.name,
    description: service.shortDescription,
    price: service.price,
    sampleType: service.sampleType,
    preparation: service.preparation?.join(', '),
  });

  return (
    <div className="bg-[#FAFAFB] py-12 md:py-20 min-h-screen">
      {/* Dynamic Schema Injection */}
      <script {...jsonLdProps(testSchema)} />

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link & Breadcrumbs */}
        <div className="mb-8">
          <Link
            href="/services"
            className="inline-flex items-center text-xs font-bold text-neutral-500 hover:text-navy-950 transition-colors uppercase tracking-wider group"
          >
            <ArrowLeft className="h-4 w-4 mr-1.5 transform group-hover:-translate-x-0.5 transition-transform" />
            Back to Services Catalog
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Description & Details */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8 shadow-sm">
              <span className="inline-block bg-navy-50 text-navy-900 text-xs font-extrabold px-3 py-1 rounded uppercase tracking-wider mb-4">
                {service.category}
              </span>
              <h1 className="text-3xl font-bold font-display text-navy-900 leading-tight sm:text-4xl">
                {service.name}
              </h1>
              <p className="text-neutral-600 mt-6 text-sm sm:text-base leading-relaxed">
                {service.longDescription || service.shortDescription}
              </p>
            </div>

            {/* Preparation Guidelines */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-navy-950 mb-4 flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-gold-500" />
                Preparation Guidelines
              </h3>
              {service.preparation && service.preparation.length > 0 ? (
                <ul className="space-y-3.5">
                  {service.preparation.map((prep, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-neutral-500">
                      <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0 mt-0.5" />
                      <span>{prep}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-neutral-500">
                  No specific preparations or fasting requirements are necessary for this test.
                </p>
              )}
            </div>

            {/* Turnaround & Quality Assurance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm flex items-start gap-4">
                <Clock className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-navy-900 text-sm">Turnaround Time</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Reports will be finalized and sent to you via WhatsApp and Email within{' '}
                    <span className="font-semibold text-navy-900">{service.turnaroundHours || 24} hours</span> of sample collection.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm flex items-start gap-4">
                <ShieldCheck className="h-8 w-8 text-gold-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-navy-900 text-sm">Quality Checked</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                    Processed inside our modern laboratory under strict internal controls and external quality assays.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Pricing & Booking Actions Panel */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <div className="bg-navy-950 text-white rounded-lg border border-navy-900 p-6 md:p-8 shadow-md">
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold block mb-1">
                  Diagnostics Fee
                </span>
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="text-3xl font-black text-white">₹{service.price}</span>
                  {service.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through font-semibold">
                      ₹{service.originalPrice}
                    </span>
                  )}
                  {service.priceNote && (
                    <span className="text-xs text-neutral-400">*{service.priceNote}</span>
                  )}
                </div>
              </div>

              {/* Param specifications */}
              <div className="border-t border-white/10 py-5 space-y-3.5 text-xs text-neutral-300">
                {service.sampleType && (
                  <div className="flex justify-between">
                    <span>Sample Type:</span>
                    <span className="font-bold text-white uppercase">{service.sampleType}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Reports Method:</span>
                  <span className="font-bold text-white">WhatsApp / Email / Pickup</span>
                </div>
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <Button
                  asChild
                  className="bg-gold-500 hover:bg-gold-600 text-navy-950 font-bold w-full h-12 rounded transition-all shadow-sm"
                >
                  <Link href={`/book?test=${service.slug}`}>Book Sample Collection</Link>
                </Button>
                <a
                  href={`tel:${SITE.contact.phone}`}
                  className="flex items-center justify-center gap-2 rounded border border-white/10 hover:bg-white/5 py-3 text-xs font-bold text-white tracking-wider uppercase transition-colors"
                >
                  <Phone className="h-4 w-4 text-gold-500" />
                  Call Support: {SITE.contact.phoneDisplay}
                </a>
              </div>
            </div>

            {/* Related tests sidebar widget */}
            {relatedServices.length > 0 && (
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
                <h4 className="font-bold text-navy-950 text-sm mb-4">Related Diagnostic Tests</h4>
                <ul className="divide-y divide-neutral-100 space-y-3.5">
                  {relatedServices.map((rel) => (
                    <li key={rel.slug} className="pt-3.5 first:pt-0">
                      <Link
                        href={`/services/${rel.slug}`}
                        className="font-bold text-xs text-navy-900 hover:text-gold-600 transition-colors block leading-tight"
                      >
                        {rel.name}
                      </Link>
                      <div className="flex items-center justify-between mt-1.5 text-[10px] text-neutral-400">
                        <span>₹{rel.price}</span>
                        <span>{rel.turnaroundHours} hr report</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
