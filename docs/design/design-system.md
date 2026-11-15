# Design system

The React library lives in [apps/design-system](../../apps/design-system/). It uses shadcn/ui components, Tailwind CSS, and Storybook for interactive examples.

## Run locally

Use Node.js 22.12 or newer. From the repository root:

```sh
cd apps/design-system
npm ci
npm run storybook
```

Open <http://localhost:6006>. Select a story to interact with a component, edit its properties in Controls, or switch the theme in the toolbar.

Start with **Foundations → Overview** to compare controls together. **Patterns → Change review** demonstrates file filtering, review markers, and local approval using the library components.

## Visual direction

Use the [shadcn preset `b2Dd34kYS`](https://ui.shadcn.com/create?preset=b2Dd34kYS): Rhea components, zinc neutrals, emerald accents and charts, Geist, Phosphor icons, and small radii. `apps/design-system/src/styles.css` contains the preset theme.

The [interactive mockup](mockups/index.html) loads the built library stylesheet. Run `npm run build` before opening it.

## Extend the library

Add base components with the configured shadcn CLI:

```sh
npx shadcn add tooltip
```

Export components from `src/index.ts`. Add examples under `src/stories/`. Paths in this section are relative to the library directory.

Use semantic tokens instead of literal colors. Check new components in both themes, at narrow widths, and with keyboard navigation. Preserve visible focus, explicit field labels, and reduced-motion behavior. Tables should scroll within their container when columns cannot fit.

## Validate and consume

Run from the library directory:

```sh
npm run typecheck
npm run build
npm run build-storybook
```

The library build writes JavaScript, type declarations, and CSS to `apps/design-system/dist/`. The catalog build writes a static site to `apps/design-system/storybook-static/`.

Install the built library directory as a local dependency in a consuming React app, then import its styles once at the app entry point:

```tsx
import { Button } from "@speca/ui"
import "@speca/ui/styles.css"
```
