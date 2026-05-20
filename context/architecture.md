# Architecture Context

## Stack

| Layer | Technology | Role |
| :--- | :--- | :--- |
| **Framework** | Next.js 16 (App Router) + TypeScript | Core rendering engine, routing, SEO generation, and API fallbacks |
| **Styling** | Tailwind CSS v4 | Native utility styling configured directly via CSS variables |
| **Components** | Radix UI + shadcn/ui | Accessible primitives and baseline component structures (e.g. Buttons, Accordion) |
| **Forms** | React Hook Form + Zod | Form state management and schema-based client/server validation |
| **Icons** | Lucide React | Lightweight vector icons with unified stroke sizes |
| **Deployment** | Vercel | Jamstack hosting and API serverless execution |

## System Boundaries

The application uses a flat directory layout at the root of the project (there is no `src/` directory):

* `/app` — Contains Next.js routes, layouts, page templates, custom 404/500 handlers, and dynamic API endpoints.
* `/components` — Reusable presentation layers.
  * `/components/ui/` — Low-level accessible primitives (shadcn base).
* `/lib` — Code utilities and configuration scripts.
  * `/lib/content.ts` — The offline CMS containing service lists, packages, FAQs, and reviews.
  * `/lib/theme.ts` — TypeScript design tokens mirroring the Tailwind variables.
  * `/lib/seo.ts` — SEO structures and JSON-LD schema generators.
* `/public` — Static assets, logos, and default OG image assets.
* `/context` — The Six-File Context system documenting project rules and progress.

## Storage Model

* **File-Based CMS (`lib/content.ts`)**: All services, pricing details, FAQS, credentials, and clinician listings are static TypeScript arrays. They are served via React Server Components with zero runtime database queries.
* **Form Requests**: The booking form acts purely as a transactional forwarder. It compiles the reservation data and forwards it to the clinic via Resend (SMTP/email) and triggers a WhatsApp redirection deep-link. No user booking details or patient records are saved to disk or databases.

## Auth and Access Model

* **Public Web Access**: The entire site is publicly accessible. There are no user sign-ins, restricted patient portals, or role-based logins in version 1.
* **API Rate Limiting**: The booking endpoints will use simple rate limits (e.g. IP-based blocks via Vercel Edge Middleware or header validations) to prevent spamming.

## Invariants (Crucial Rules)

1. **No PHI Collection:** Under no circumstances should the website collect, request, or store Protected Health Information (PHI) like medical history, symptoms, or test results. Only booking coordinates (Name, Phone, Selected Test, Date, and Address for Home Collection) are allowed.
2. **SEO Coverage:** Every public route must render corresponding SEO metadata using Next.js Metadata API and inject descriptive JSON-LD schema (e.g., `MedicalBusiness`, `LocalBusiness`, `FAQPage`, or `MedicalTest`).
3. **Responsive Target ID:** Every interactive CTA, input field, and menu link must have a unique, semantic `id` attribute to support automated end-to-end integration and accessibility testing.
4. **Tailwind v4 Token Compliance:** No inline hex colors or arbitrary margin/padding values are allowed in JSX. All visual variables must align with the theme values declared in `app/globals.css`.
