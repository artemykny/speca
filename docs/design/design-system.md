# Design system

The React library lives in [apps/design-system](../../apps/design-system/). It includes all components from the configured shadcn/ui registry, Tailwind CSS, and Storybook for interactive examples.

## Run locally

Use Node.js 22.12 or newer. From the repository root:

```sh
cd apps/design-system
npm ci
npm run storybook
```

Open <http://localhost:6006>. Browse **Components** for the complete catalog, interact with the examples, edit properties in Controls where available, or switch the theme in the toolbar.

Start with **Foundations → Overview** to compare all components together, grouped by purpose on one page. **Patterns → Change review** demonstrates file filtering, review markers, and local approval.

**Patterns → Agentic chat** demonstrates conversation history, attachments, clarification, plan approval, tool activity, streaming, queued follow-ups, response versions, sources, and artifact review. Use its story variants to start at an empty conversation, approval, clarification, streaming, or a tool error. Agent settings control the next message's tools and simulated failures. All responses and actions use local demo state; no model or workspace is connected.

## Visual direction

Use the [shadcn preset `b2Dd34kYS`](https://ui.shadcn.com/create?preset=b2Dd34kYS): Rhea components, zinc neutrals, emerald accents and charts, Geist, Phosphor icons, and small radii. `apps/design-system/src/styles.css` contains the preset theme.

The [interactive mockup](mockups/index.html) loads the built library stylesheet. Run `npm run build` before opening it.

## Extend the library

Install newly available base components with the configured shadcn CLI. Keep existing files when prompted to preserve local customizations:

```sh
npx shadcn add --all --yes
```

Export components from `src/index.ts`. Add examples under `src/stories/`. Paths in this section are relative to the library directory.

Use semantic tokens instead of literal colors. Check new components in both themes, at narrow widths, and with keyboard navigation. Preserve visible focus, explicit field labels, and reduced-motion behavior. Tables should scroll within their container when columns cannot fit.

## Validate and consume

Run from the library directory:

```sh
npm run typecheck
npm test
npm run build
npm run build-storybook
```

The library build writes JavaScript, type declarations, and CSS to `apps/design-system/dist/`. The catalog build writes a static site to `apps/design-system/storybook-static/`.

Install the built library directory as a local dependency in a consuming React app, then import its styles once at the app entry point:

```tsx
import { Button } from "@speca/ui"
import "@speca/ui/styles.css"
```

Wrap components that use tooltips in `TooltipProvider`. Mount `Toaster` to display notifications sent through the exported `toast` manager.
