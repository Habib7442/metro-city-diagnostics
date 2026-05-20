# Metro-City Diagnostics — Website PRD

**Version:** 1.0
**Date:** May 2026
**Owner:** Metro-City Diagnostics, Silchar
**Status:** Draft — design + content spec for a developer to build against

---

## 1. Overview

### 1.1 Vision
Build a fast, modern, locally-optimized marketing and patient-facing website for **Metro-City Diagnostics**, a leading diagnostic center in Silchar, Assam. The site should convey clinical authority and warmth — premium healthcare that the people of the Barak Valley can trust — while making it dead-simple for patients to find services, see hours, book appointments, and contact the lab.

### 1.2 Business
- **Name:** Metro-City Diagnostics
- **Type:** Diagnostic center / pathology lab
- **Address:** Co-operative, near Vivekananda, Meherpur, Birbal Bazar, Silchar, Assam 788015
- **Phone:** +91 99573 57278
- **Google rating:** 4.8 / 5 (824 reviews)
- **Service area:** Silchar, Cachar district, greater Barak Valley

### 1.3 Goals
| Goal | KPI |
|------|-----|
| Drive online appointment bookings | ≥ 30 bookings/month within 3 months of launch |
| Rank top 3 on Google for "diagnostic center Silchar" | SERP position tracked weekly |
| Reduce phone-call volume for routine FAQs | ≥ 20% deflection via website content |
| Improve trust signaling for new patients | Bounce rate < 50%, time-on-page > 90s |
| Mobile-first reach (most patients on mobile) | ≥ 70% mobile traffic served at LCP < 2.5s |

### 1.4 Non-goals (v1)
- Full patient portal with login / report download
- Online payment for tests
- EMR / LIMS integration
- Multilingual UI (English-first; Bengali/Hindi flagged for v2)

---

## 2. Target Users

1. **First-time local patient** — referred by doctor, looking for address, hours, price, services.
2. **Returning patient** — needs phone number, booking link, report pickup info.
3. **Referring doctor / clinic** — wants to verify services offered, turnaround times, contact.
4. **Family booking on behalf** — often elderly or hospitalized patient, needs clear info fast.

---

## 3. Brand Identity

### 3.1 Tone of voice
- **Trustworthy** — never salesy. Calm, certain.
- **Warm** — we know our patients by name.
- **Precise** — medical accuracy without jargon.
- **Local** — references to Silchar, Barak Valley, Assam are welcome.

### 3.2 Color palette — *Deep Navy + Warm Gold (Premium Healthcare)*

| Token | Hex | Role |
|-------|-----|------|
| `navy.900` | `#0A1F44` | Primary — hero backgrounds, CTAs, headings on light |
| `navy.800` | `#0B2545` | Primary dark — nav, footer |
| `navy.700` | `#13315C` | Primary mid — secondary buttons |
| `navy.600` | `#1E4380` | Hover state for primary nav links |
| `navy.500` | `#3A6EA5` | Accent navy — icons, badges |
| `navy.100` | `#E2E8F4` | Light tint — info boxes, soft backgrounds |
| `gold.700` | `#9C7B26` | Gold dark — for text on light backgrounds (a11y) |
| `gold.600` | `#B8902F` | Gold mid |
| `gold.500` | `#C8A24F` | **Accent — primary gold** for CTAs, highlights, dividers |
| `gold.400` | `#D4B36A` | Gold hover state |
| `gold.300` | `#E8C97C` | Light gold — soft highlights, badges |
| `gold.100` | `#F6EBC9` | Wash — page background accent strips |
| `neutral.0` | `#FFFFFF` | Pure white |
| `neutral.50` | `#FAFAFB` | Off-white — page background |
| `neutral.100` | `#F4F6FA` | Card backgrounds, alt rows |
| `neutral.200` | `#E5E8EE` | Borders, dividers |
| `neutral.400` | `#9CA3AF` | Muted text, placeholders |
| `neutral.600` | `#4B5563` | Body text secondary |
| `neutral.800` | `#1F2937` | Body text primary |
| `neutral.900` | `#0F172A` | Headings on light backgrounds |
| `success` | `#1E8E5A` | Confirmations, "report ready" |
| `warning` | `#D97706` | Fasting required, prep notes |
| `error` | `#B91C1C` | Form errors |

**Usage rules:**
- Navy is the dominant color on backgrounds and structural elements.
- Gold is the *accent* — never large solid blocks. Use on CTAs, underlines, icons, dividers, hover rings.
- Never put gold text on white smaller than 16px without bumping to `gold.700` for WCAG AA contrast.
- Maintain 60/30/10 ratio: 60% white, 30% navy, 10% gold.

### 3.3 Typography

| Role | Font | Weights | Source |
|------|------|---------|--------|
| Display / H1–H3 | **Fraunces** | 400, 500, 600, 700 | Google Fonts |
| Body / UI | **Inter** | 400, 500, 600, 700 | Google Fonts |
| Mono / numbers | **JetBrains Mono** | 400, 500 | Google Fonts (optional) |

**Type scale (1.250 — major third):**

| Token | Size (px / rem) | Line height | Weight | Use |
|-------|-----------------|-------------|--------|-----|
| `display` | 64 / 4 | 1.05 | 600 | Hero |
| `h1` | 48 / 3 | 1.1 | 600 | Page title |
| `h2` | 36 / 2.25 | 1.2 | 600 | Section title |
| `h3` | 28 / 1.75 | 1.3 | 500 | Subsection |
| `h4` | 22 / 1.375 | 1.35 | 500 | Card title |
| `body-lg` | 18 / 1.125 | 1.6 | 400 | Lead paragraph |
| `body` | 16 / 1 | 1.6 | 400 | Default body |
| `body-sm` | 14 / 0.875 | 1.5 | 400 | Captions, meta |
| `eyebrow` | 13 / 0.8125 | 1.4 | 500 | Uppercase tracking-wide labels |

Fluid clamp on display/h1/h2 for mobile: `clamp(<mobile>, <vw>, <desktop>)`.

### 3.4 Spacing scale (4-point grid)
`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128` (px)

### 3.5 Radii
`sm: 6px`, `md: 10px`, `lg: 16px`, `xl: 24px`, `pill: 999px`

### 3.6 Shadows
- `shadow.sm` — `0 1px 2px rgba(10, 31, 68, 0.06)`
- `shadow.md` — `0 4px 12px rgba(10, 31, 68, 0.08)`
- `shadow.lg` — `0 12px 32px rgba(10, 31, 68, 0.12)`
- `shadow.gold` — `0 8px 24px rgba(200, 162, 79, 0.25)` (for primary CTAs)

### 3.7 Iconography
- **Library:** Lucide React (open-source, consistent stroke weight).
- Stroke 1.5px, color `navy.700` default, `gold.500` on hover/active.
- Medical icons used sparingly — flask, microscope, heart pulse, syringe.

### 3.8 Imagery
- Real clinic photography preferred. Avoid stock "doctor pointing at clipboard" tropes.
- If stock used: documentary tone, natural lighting, real-looking people.
- Photos of equipment, the building exterior on Birbal Bazar, the lab interior all reinforce local trust.
- Never use AI-generated medical imagery.

---

## 4. Information Architecture

```
/                    Home
/services            Services overview
/services/[slug]     Individual service page (Pathology, Radiology, etc.)
/about               About us / story / team / accreditations
/doctors             Doctors / consultants
/book                Online booking (or redirect to external booking)
/contact             Contact, map, hours
/faq                 Frequently asked questions
/reports             How to get reports (placeholder for v2 portal)
/privacy             Privacy policy
/terms               Terms
```

---

## 5. Page-by-page content

### 5.1 Home
1. **Hero** — navy background. Headline: *"Trusted diagnostics for the Barak Valley."* Sub: 4.8★ from 824 patients. CTAs: "Book a test" (gold) + "Call now" (outline).
2. **Trust strip** — NABL / NABH / ICMR logos (if applicable), years operating, tests per month.
3. **Services grid** — 6–8 cards: Pathology, Radiology, ECG, Ultrasound, X-Ray, Health Packages, Home Collection, Corporate.
4. **How it works** — 3 steps: Book → Visit / Home collect → Get reports.
5. **Featured health packages** — 3 packages with prices.
6. **Reviews carousel** — pull 5–6 of the Google reviews.
7. **Doctors / consultants** — small grid with photos and credentials.
8. **Location + hours** — map embed + opening hours table + phone CTA.
9. **FAQ teaser** — top 4 FAQs with link to full page.
10. **Footer** — contact, services, quick links, social, certifications.

### 5.2 Services
- Filterable grid by category (Pathology / Radiology / Cardiac / Imaging / Packages).
- Each service card: name, short description, price (or "Call for price"), prep instructions snippet, "Book this test" CTA.

### 5.3 Service detail (`/services/[slug]`)
- Hero with service name + price.
- "About this test" — 2–3 paragraphs.
- "Preparation" — bullet list (fasting, hydration, what to bring).
- "Turnaround time" — e.g. "Same day", "24 hours".
- "Sample type" — blood / urine / imaging.
- Related tests.
- CTA block — Book or call.

### 5.4 About
- Story / mission.
- Accreditations and certifications.
- Team — 4–8 doctor / technician profiles.
- Equipment list (with photos).
- Awards or community work.

### 5.5 Book
- Simple form: Name, Phone, Test(s), Preferred date, Home collection? (yes/no), Address (if yes), Notes.
- Submits to backend (out of scope for v1 — just POST endpoint + WhatsApp fallback).
- Trust microcopy: "We'll call within 30 minutes to confirm."

### 5.6 Contact
- Address with copy-to-clipboard.
- Phone (click-to-call).
- WhatsApp (deep link).
- Email.
- Google Maps embed centered on Meherpur, Birbal Bazar.
- Opening hours table.
- Directions from key Silchar landmarks (Vivekananda statue, Cachar District Hospital, NIT Silchar).

### 5.7 FAQ
Group by: General, Booking, Reports, Home Collection, Payment.
Accordion UI.

---

## 6. Functional Requirements

| # | Feature | Priority |
|---|---------|----------|
| F1 | Click-to-call buttons everywhere (mobile-first) | P0 |
| F2 | WhatsApp deep link (`https://wa.me/919957357278`) | P0 |
| F3 | Online booking form → email + WhatsApp notification | P0 |
| F4 | Google Maps embed on contact + home | P0 |
| F5 | Google reviews pulled or curated (manual JSON ok for v1) | P1 |
| F6 | Services filter and search | P1 |
| F7 | Sticky bottom-bar on mobile: Call / WhatsApp / Book | P0 |
| F8 | Sitemap.xml + robots.txt | P0 |
| F9 | Structured data (MedicalBusiness, LocalBusiness, FAQPage) | P0 |
| F10 | Analytics: GA4 + Microsoft Clarity | P1 |
| F11 | Cookie consent banner (India DPDP-compliant) | P1 |
| F12 | 404 + 500 custom pages | P1 |

---

## 7. Technical Requirements

- **Framework:** Next.js 14+ App Router, TypeScript strict mode.
- **Styling:** Tailwind CSS + design tokens from `src/lib/theme.ts`.
- **Components:** shadcn/ui (Radix) with theme overrides.
- **Forms:** React Hook Form + Zod.
- **Icons:** lucide-react.
- **Animation:** Framer Motion (sparingly — fade and slide only).
- **Hosting:** Vercel.
- **DNS / Email:** Cloudflare (recommended).
- **Image optimization:** `next/image`, AVIF + WebP.
- **Fonts:** `next/font` with Fraunces + Inter (variable fonts, subset latin).
- **State:** Server components by default; client only where needed.
- **Form backend:** Resend or SMTP for email; Twilio or 360dialog for WhatsApp Business API.

---

## 8. Performance budget

| Metric | Target |
|--------|--------|
| LCP (mobile) | < 2.5s |
| INP | < 200ms |
| CLS | < 0.05 |
| JS bundle (initial) | < 150 KB gz |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |
| Lighthouse SEO | 100 |

---

## 9. Accessibility

- **WCAG 2.2 AA** minimum.
- Skip-to-content link.
- All form fields labeled and `aria-describedby` linked to error/help text.
- Focus-visible rings — 2px `gold.500` offset.
- Contrast ratio ≥ 4.5:1 for body, ≥ 3:1 for large text.
- Reduced-motion respected.
- Touch targets ≥ 44×44 px.

---

## 10. SEO requirements

- Pre-rendered HTML for every public route (Next.js `generateStaticParams` where applicable).
- Per-page title, description, canonical, OG image — via `seo.ts`.
- JSON-LD: `MedicalBusiness`, `LocalBusiness`, `MedicalClinic`, `BreadcrumbList`, `FAQPage` (on FAQ).
- `sitemap.xml` regenerated on deploy.
- `robots.txt` — allow all, point to sitemap.
- Google Business Profile NAP consistency: name, address, phone identical to GBP listing.
- Local keyword targets:
  - "diagnostic center Silchar"
  - "pathology lab Silchar Assam"
  - "blood test Meherpur"
  - "ultrasound Silchar"
  - "X-ray Birbal Bazar"
  - "Metro City Diagnostics Silchar"
- Hreflang `en-IN`.
- Open Graph image: 1200×630, navy background with gold lockup of brand mark.

---

## 11. Security & Privacy

- No PHI stored on the website. Booking form just collects name/phone/preferred test — no health info.
- HTTPS only, HSTS.
- Form submissions rate-limited (Upstash Redis or Vercel KV).
- Privacy policy compliant with India's DPDP Act 2023.
- No third-party trackers without consent.

---

## 12. Acceptance criteria

- [ ] All P0 features shipped and verified on mobile + desktop.
- [ ] Lighthouse mobile scores ≥ targets in §8.
- [ ] All pages pass WCAG 2.2 AA via axe-core automated scan.
- [ ] JSON-LD validates with no warnings in Google Rich Results Test.
- [ ] Booking form submission delivered to clinic email + WhatsApp within 60s.
- [ ] Click-to-call works on iOS Safari, Android Chrome, in-app browsers (Instagram, Facebook).
- [ ] Site indexed by Google within 7 days of launch.

---

## 13. Out of scope (parked for v2+)

- Patient login + report download portal.
- Online payment.
- Multilingual UI (Bengali, Hindi, Assamese).
- Doctor consultation booking (tele-consult).
- Live chat.
- Loyalty / referral program.

---

## 14. Open questions

1. Confirm exact list of services and price points to publish.
2. Do you want the booking form to submit to an email, WhatsApp, or both?
3. Are there NABL / NABH / ISO accreditations to display? Need logo assets.
4. Photo shoot of the clinic and team — can we arrange one before launch, or use stock for v1?
5. Domain registered? (Suggest `metrocitydiagnostics.com` or `.in`.)
