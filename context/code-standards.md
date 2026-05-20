# Code Standards

## General
* **Single Responsibility:** Keep React components focused on rendering UI. Decouple helper logic, static data, and form schemas into standalone utility modules.
* **Component Organization:** Store generic global layouts and widgets in `/components`, primitives in `/components/ui`, and main routing files in `/app`.
* **Pragmatic DRY:** Avoid premature optimization. Keep duplication low, but do not combine unrelated UI patterns just to share styling.

## TypeScript
* **Strict Mode:** TypeScript `strict` must remain enabled. No compiler warnings or type overrides (`any` or `as never` workarounds).
* **Explicit Interfaces:** Define typed models for all components and dynamic API envelopes.
* **Strict Union Types:** Use union types (e.g. `ServiceCategory` in `lib/content.ts`) rather than strings to control data flows.

## Next.js (App Router)
* **Server Components by Default:** Keep the root files as server-rendered components. Download metadata, fetch static listings, and generate search schemas entirely server-side.
* **Use Client sparingly:** Mark files with `'use client'` only when they contain client state, browser events (such as click handlers, filters, carousels), or form hooks.
* **Metadata API:** Export static metadata dynamically per route rather than injecting `<head>` tags directly.

## Styling
* **Tailwind v4 Variables:** Rely on utility classes mapped to our design token dictionary. Avoid arbitrary values like `bg-[#0A1F44]` or `w-[44px]`. Instead, use `bg-navy-900` or `w-11`.
* **CSS Class Merging:** Always wrap conditional classes with the `cn(...)` utility (located in `lib/utils.ts`).
* **Clean CSS:** Write styles inside `app/globals.css` only for baseline selectors or the Tailwind theme variables `@theme` declaration.

## Form Handling & API Boundaries
* **Schema Validation:** Use **Zod** to declare form structures. Validate inputs on client submit, and re-validate on the server actions or API endpoints.
* **Spam Prevention:** Implement simple rate limiting on booking submissions.
* **Consistent Responses:** Keep API response formats identical, resolving either into success envelopes or error shapes:
  ```json
  { "success": true, "data": {} }
  // OR
  { "success": false, "error": "Descriptive error message" }
  ```

## Accessibility (WCAG 2.2 AA)
* **Contrast Compliance:** Avoid placing gold text on white backings unless utilizing `text-gold-700` (which is AA contrast verified).
* **Focus Visible States:** Always keep default browser outlines or provide custom styling for interactive components:
  ```tailwind
  focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2
  ```
* **Touch Targets:** All buttons, links, checkbox items, and input triggers must have active touch surfaces of at least **$44\times44\text{px}$** to allow seamless mobile taps.
* **Semantic Markups:** Do not use `div` elements for click events; use native `button` elements with proper text labels.
