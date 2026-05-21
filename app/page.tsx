import Link from 'next/link';
import Image from 'next/image';
import {
  Activity,
  Calendar,
  Clock,
  Phone,
  ShieldCheck,
  Star,
  MapPin,
  ArrowRight,
  ChevronRight,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { featuredServices, reviews } from '@/lib/content';
import { SITE } from '@/lib/seo';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#FAFAFB]">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-20 text-white lg:py-28">
        {/* Background micro-graphics */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,162,79,0.15),transparent_50%)]" />
        <div className="absolute -left-48 top-12 h-96 w-96 rounded-full bg-navy-500/10 blur-3xl" />
        
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Hero Content */}
            <div className="space-y-6 lg:col-span-7">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide text-gold-300 backdrop-blur-sm border border-white/10">
                <ShieldCheck className="h-3.5 w-3.5 text-gold-500" />
                <span>Your Trusted Health Partner in Silchar</span>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.1]">
                Accurate Diagnostics, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-300">
                  Trusted Care
                </span>{' '}
                for Silchar
              </h1>

              <p className="max-w-xl text-base leading-relaxed text-neutral-300 sm:text-lg">
                Metro-City Diagnostics delivers high-precision blood work, pathology tests, digital X-rays, and obstetric/pelvic ultrasounds. Experience patient-first diagnostics with convenient home sample collection across Cachar.
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Button
                  asChild
                  className="bg-gold-500 font-semibold text-white hover:bg-gold-600 hover:shadow-lg transition-all rounded px-8 h-12 text-base w-full sm:w-auto"
                >
                  <Link href="/book" id="hero-cta-book">
                    Book Home Collection
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold rounded px-8 h-12 text-base w-full sm:w-auto"
                >
                  <Link href="/services" id="hero-cta-services">
                    Browse Services
                  </Link>
                </Button>
              </div>

              {/* Key Trust highlights */}
              <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-8 sm:grid-cols-3">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">EQAS Standard Certified</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">Smart Digital Reports</span>
                </div>
                <div className="flex items-center gap-2.5 col-span-2 sm:col-span-1">
                  <CheckCircle2 className="h-5 w-5 text-gold-500 flex-shrink-0" />
                  <span className="text-xs text-neutral-300 font-medium">Home Sample Pickup</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Container */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-[450px] lg:max-w-none">
                {/* Decorative border frame */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-lg border-2 border-gold-500/40" />
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-navy-800 shadow-2xl">
                  <Image
                    src="/assets/metro-city-diagnostics-exterior.jpeg"
                    alt="Metro-City Diagnostics Clinic Entrance, Silchar"
                    fill
                    sizes="(max-w-768px) 100vw, 50vw"
                    priority
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Patient Workflow Section */}
      <section className="py-20 lg:py-28 bg-[#FAFAFB]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
              Simple Diagnostics
            </span>
            <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
              How Home Sample Collection Works
            </h2>
            <p className="text-sm text-neutral-500 mt-4">
              Get tested from the comfort of your home in 3 simple steps. No long queues, no wait times.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200/50 shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-gold-100 transition-colors">
                01
              </span>
              <div className="bg-navy-50 h-12 w-12 rounded-full flex items-center justify-center text-navy-950 mb-6 font-semibold">
                <Calendar className="h-5 w-5 text-navy-800" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-3">1. Book Your Test</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Select your required test or health checkup package online, or call us at{' '}
                <span className="font-bold text-navy-900">{SITE.contact.phoneDisplay}</span> to book a convenient time.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200/50 shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-gold-100 transition-colors">
                02
              </span>
              <div className="bg-navy-50 h-12 w-12 rounded-full flex items-center justify-center text-navy-950 mb-6 font-semibold">
                <UserCheck className="h-5 w-5 text-navy-800" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-3">2. Professional Collection</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Our certified, experienced phlebotomist visits your home or office following strict hygiene standards to collect your blood sample.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-8 border border-neutral-200/50 shadow-sm relative group hover:shadow-md transition-shadow">
              <span className="absolute top-6 right-8 text-5xl font-black text-neutral-100 group-hover:text-gold-100 transition-colors">
                03
              </span>
              <div className="bg-navy-50 h-12 w-12 rounded-full flex items-center justify-center text-navy-950 mb-6 font-semibold">
                <ShieldCheck className="h-5 w-5 text-navy-800" />
              </div>
              <h3 className="text-lg font-bold text-navy-950 mb-3">3. Digital Reports</h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Samples are processed at our modern lab. Verified digital reports are sent directly to your WhatsApp and email within 12-24 hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Services & Packages */}
      <section className="py-20 lg:py-28 bg-white border-y border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Popular Diagnostics
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
                Featured Tests & Health Packages
              </h2>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center text-sm font-bold text-navy-900 hover:text-gold-600 transition-colors group"
            >
              View all
              <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Test Cards Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service) => (
              <div
                key={service.slug}
                className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-neutral-300 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-navy-50 text-navy-900 text-xs font-bold px-2.5 py-1 rounded capitalize">
                      {service.category}
                    </span>
                    {service.turnaroundHours && (
                      <span className="text-xs text-neutral-400 flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gold-500" />
                        {service.turnaroundHours} hr report
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-navy-950 mb-2 leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-sm text-neutral-500 line-clamp-3 mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="border-t border-neutral-100 pt-4 mt-2">
                  <div className="flex items-end justify-between mb-4">
                    <div>
                      <span className="text-[10px] text-neutral-400 uppercase font-semibold block leading-tight">
                        Price
                      </span>
                      {service.price ? (
                        <>
                          {service.priceNote && (
                            <span className="text-xs text-neutral-400 mr-1">{service.priceNote}</span>
                          )}
                          <span className="text-xl font-extrabold text-navy-900">
                            ₹{service.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-bold text-gold-600">
                          {service.priceNote || 'Call for price'}
                        </span>
                      )}
                    </div>
                    {service.sampleType && (
                      <span className="text-xs text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                        {service.sampleType}
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      asChild
                      variant="outline"
                      size="sm"
                      className="border-neutral-200 text-neutral-700 hover:bg-neutral-50 rounded"
                    >
                      <Link href={`/services/${service.slug}`}>Details</Link>
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      className="bg-gold-500 hover:bg-gold-600 text-white font-semibold rounded"
                    >
                      <Link href={`/book?test=${service.slug}`}>Book</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Packages Highlight section */}
          <div className="mt-16 bg-navy-950 text-white rounded-lg p-8 md:p-12 relative overflow-hidden shadow-lg border border-navy-900">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,162,79,0.12),transparent_40%)]" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-4">
                <span className="inline-block bg-gold-500 text-navy-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Special Offer
                </span>
                <h3 className="text-2xl font-bold font-display sm:text-3xl">
                  Comprehensive Health Checkup Packages
                </h3>
                <p className="text-sm text-neutral-300 max-w-xl">
                  Our essential and advanced health profiles combine complete blood counts, lipids, sugar, liver/kidney profiles, and thyroid levels to check your vital systems.
                </p>
                <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
                  <span className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-gold-500" />
                    60+ Parameters Screened
                  </span>
                  <span className="flex items-center gap-2 text-xs text-neutral-300">
                    <CheckCircle2 className="h-4 w-4 text-gold-500" />
                    Up to 40% Package Discount
                  </span>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col sm:items-end justify-center">
                <div className="text-left sm:text-right mb-6">
                  <p className="text-xs text-neutral-400">Starting from just</p>
                  <p className="text-3xl font-extrabold text-white mt-1">
                    ₹1,499 <span className="text-sm text-neutral-400 line-through">₹2,200</span>
                  </p>
                </div>
                <div className="flex gap-4 w-full sm:w-auto">
                  <Button
                    asChild
                    className="bg-gold-500 font-semibold text-white hover:bg-gold-600 hover:shadow-md transition-all rounded px-6 w-full sm:w-auto"
                  >
                    <Link href="/services?category=package">View Packages</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Video Media Showcase */}
      <section className="py-20 lg:py-28 bg-[#FAFAFB]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left: Video */}
            <div className="lg:col-span-6">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-navy-950 shadow-xl border border-neutral-200">
                <video
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                  poster="/assets/banner.png"
                  muted
                  loop
                  playsInline
                >
                  <source src="/assets/business-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>

            {/* Right: Copy */}
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Inside Our Clinic
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl">
                Advanced Equipment & Sanitized Environment
              </h2>
              <p className="text-sm leading-relaxed text-neutral-500">
                Take a virtual tour of our modern pathology facility in Silchar. We use automated analytical equipment from leading international suppliers, ensuring premium testing standards with minimal human interference.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="bg-gold-100 h-9 w-9 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Hygienic Sampling Booths</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Our collection stations are sanitized after every single appointment.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="bg-gold-100 h-9 w-9 rounded-full flex items-center justify-center text-gold-600 flex-shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Rapid Turnaround Processing</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Emergency samples are fast-tracked automatically by our laboratory sorting systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Patient Reviews Section */}
      <section className="py-20 lg:py-28 bg-white border-y border-neutral-100">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
              Patient Testimonials
            </span>
            <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl mt-2">
              What Our Patients Say
            </h2>
            <p className="text-sm text-neutral-500 mt-4">
              Real reviews from real patients in Silchar who have tested with us.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {reviews.map((review, idx) => (
              <div
                key={idx}
                className="bg-[#FAFAFB] rounded-lg p-6 border border-neutral-200/50 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-gold-500 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-600 italic leading-relaxed mb-6 whitespace-pre-line">
                    "{review.body}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-neutral-200/60 pt-4 mt-2">
                  <div>
                    <h5 className="font-bold text-navy-900 text-xs">{review.author}</h5>
                    <span className="text-[10px] text-neutral-400">
                      {new Date(review.date).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Local Map Embed & Directions */}
      <section className="py-20 lg:py-28 bg-[#FAFAFB]">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Map Details */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-widest font-bold text-gold-600">
                Visit Clinic
              </span>
              <h2 className="text-3xl font-bold font-display text-navy-900 sm:text-4xl">
                Location & Walking Directions
              </h2>
              <p className="text-sm leading-relaxed text-neutral-500">
                We are centrally located at Birbal Bazar, Meherpur, Silchar. Easily accessible by auto-rickshaw or personal vehicles with dedicated parking outside.
              </p>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Landmarks</h4>
                    <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
                      Adjacent to the Co-operative Bank, Meherpur Branch. Opposite Birbal Bazar, near the Vivekananda Statue.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Timings</h4>
                    <p className="text-xs text-neutral-500 mt-1">
                      Mon - Sat: 7 AM - 8 PM <br /> Sun: 7 AM - 1 PM
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Phone className="h-5 w-5 text-gold-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-navy-950 text-sm">Direct Contact</h4>
                    <a
                      href={SITE.contact.phoneTel}
                      className="text-xs font-bold text-navy-900 hover:text-gold-600 transition-colors"
                    >
                      {SITE.contact.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  asChild
                  className="bg-navy-900 hover:bg-navy-950 text-white font-semibold rounded px-6 h-11"
                >
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Metro-City+Diagnostics+Silchar"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Google Maps
                  </a>
                </Button>
              </div>
            </div>

            {/* Right: Map Embed */}
            <div className="lg:col-span-7">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-neutral-200 shadow-md bg-white">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7243.64653953248!2d92.78565079895019!3d24.801504468480108!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374e4bcc779b118d%3A0xf60370683024c700!2sMetro-City%20Diagnostics!5e0!3m2!1sen!2sin!4v1779330698021!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Metro-City Diagnostics Google Maps Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
