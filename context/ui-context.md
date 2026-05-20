# UI Context

## Theme
* **Palette:** Deep Navy + Warm Gold. Convey clinical authority, precision, and local hospitality.
* **Layout Design:** Modern, clean, and highly readable. Maintain a **60/30/10 ratio** (60% background/white space, 30% structural navy backgrounds/headings, 10% premium gold accents on CTAs, badges, highlights, and icons).
* **Dark/Light Mode:** Default is Light Mode (`neutral.50` off-white base) with structural dark components (e.g., Navy Header/Footer and Navy Hero cards). 

## Colors

All styling must use these Tailwind color tokens rather than hardcoded hex codes.

| Semantic Token | CSS Variable | Hex Value | Application |
| :--- | :--- | :--- | :--- |
| **Navy 900** (Primary) | `--color-navy-900` | `#0A1F44` | Hero backgrounds, primary headings, core CTAs |
| **Navy 800** | `--color-navy-800` | `#0B2545` | Footer, Navigation backgrounds |
| **Navy 700** | `--color-navy-700` | `#13315C` | Mid navy, secondary button outlines |
| **Navy 500** | `--color-navy-500` | `#3A6EA5` | Badge backgrounds, accent links, info icons |
| **Navy 100** | `--color-navy-100` | `#E2E8F4` | Soft panels, background highlights |
| **Gold 700** (Dark) | `--color-gold-700` | `#9C7B26` | Text on light backgrounds (WCAG compliant) |
| **Gold 500** (Accent) | `--color-gold-500` | `#C8A24F` | Accent markers, hover borders, CTA buttons |
| **Gold 300** | `--color-gold-300` | `#E8C97C` | Soft highlights, rating stars |
| **Gold 100** (Wash) | `--color-gold-100` | `#F6EBC9` | Page division strips |
| **Off-White** (Neutral) | `--color-neutral-50` | `#FAFAFB` | Main page backgrounds |
| **White** | `--color-neutral-0` | `#FFFFFF` | Card canvases, dropdown items |
| **Text Primary** | `--color-neutral-800` | `#1F2937` | Core body copy |
| **Text Heading** | `--color-neutral-900` | `#0F172A` | Sub-titles, light component headings |

## Typography

* **Headings (H1–H4):** **Fraunces** (Google Fonts variable serif, subset latin, weights: 400, 500, 600, 700). High clinical authority, premium editorial look.
* **Body / UI:** **Inter** (Google Fonts variable sans-serif, weights: 400, 500, 600, 700). Clean readability on mobile screens.
* **Numbers / Badges:** **JetBrains Mono** (Optional monospace for structured numeric data, e.g., prices or timing numbers).

### Typography Scale

| Token | Size | Line Height | Weight | Application |
| :--- | :--- | :--- | :--- | :--- |
| `display` | `4rem` (64px) | `1.05` | 600 | Homepage hero heading |
| `h1` | `3rem` (48px) | `1.1` | 600 | Page titles |
| `h2` | `2.25rem` (36px) | `1.2` | 600 | Section titles |
| `h3` | `1.75rem` (28px) | `1.3` | 500 | Card headings, subsection |
| `body-lg` | `1.125rem` (18px) | `1.6` | 400 | Lead intro copy |
| `body` | `1rem` (16px) | `1.6` | 400 | Main body text |
| `body-sm` | `0.875rem` (14px) | `1.5` | 400 | Captions, small forms |
| `eyebrow` | `0.8125rem` (13px) | `1.4` | 500 | Uppercase label headers |

## Border Radius

| Class | Value | Context |
| :--- | :--- | :--- |
| `rounded-sm` | `6px` | Inline badges, check boxes |
| `rounded` | `10px` | Form fields, buttons |
| `rounded-lg` | `16px` | Small cards, review boxes |
| `rounded-xl` | `24px` | Large hero cards, modals |
| `rounded-pill` | `999px` | Floating tags, chip buttons |

## Component Library
* Uses **shadcn/ui** built on **Radix UI** primitives.
* Location: `/components/ui/`
* Use standard Tailwind CSS v4 variables mapped inside `app/globals.css` to override component states.
* Ensure all form inputs have visible focused states (e.g. `focus-visible:ring-2 focus-visible:ring-gold-500`).

## Layout Patterns
1. **Header Navigation:** Top-fixed, thin navy border separator, transparent or solid navy backing depending on section.
2. **Sticky Mobile Bottom Bar:** Fixed on mobile screen bottoms containing click-to-call, WhatsApp deep link, and booking shortcuts.
3. **Card grids:** 1 column on mobile, transitioning to 2 on tablets and 3/4 on desktop viewports.
4. **Hero Sections:** Deep Navy backings with gold accent text overlays, displaying high-contrast typography.

## Icons
* **Library:** Lucide React
* **Stroke width:** `1.5px`
* **Default color:** `text-navy-700` or `text-navy-500` (on dark/navy bases).
* **Hover state:** `text-gold-500`
