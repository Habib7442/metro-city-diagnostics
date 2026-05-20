# AI Workflow Rules

## Incremental Scoping
1. **Focus on One Unit:** Implement the project feature-by-feature, focusing on one single, isolated unit of work per prompt session.
2. **Small PR Increments:** Make small, clear updates instead of multi-file modifications that span database, UI, and background API configurations simultaneously.
3. **No Speculative Coding:** Do not implement features, utility functions, or components that are not explicitly documented in the active progress tracker or specs.

## When to Split Work
Split tasks into separate milestones if:
* They span multiple layout pages (e.g. implementing the Services catalog and About page together).
* They combine complex client logic (e.g. form validations) with external API notifications.
* They require installing new package dependencies.
* Verification cannot be completed quickly within a single terminal execution.

## Handling Ambiguity
* **No Product Guesses:** If a requirement is missing or ambiguous (e.g., price points or address details), do not make assumptions. Write the issue under the "Open Questions" header in `context/progress-tracker.md` and ask the user directly.
* **Keep Docs Synced:** Always update the architecture, style variables, or overview context files before writing code if a design change is decided.

## Protected Files
* Do not modify generated base primitives in `/components/ui/` (e.g. button.tsx) unless specifically instructed to add styling properties.
* Do not write configuration modifications to `postcss.config.mjs` or `eslint.config.mjs` without checking standard compatibility rules.

## Verification Checklist
Before concluding any implementation unit:
1. Ensure `npm run build` compiles with zero errors (TypeScript + Next.js build).
2. Validate that the changed component matches all design rules in `ui-context.md`.
3. Check that no invariants listed in `architecture.md` are violated.
4. Record the completed unit under the "Completed" header in `context/progress-tracker.md`.
