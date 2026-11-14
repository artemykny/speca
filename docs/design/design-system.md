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

Start with **Foundations → Overview** to compare controls together. **Patterns → Change review** demonstrates filtering, file selection, review markers, and approval with local example data.

## Visual direction

Use neutral matte gray surfaces, compact controls, and thin dividers. Organize the overview as a component catalog with section navigation. Match workspace layouts to the [interactive mockup](mockups/index.html): an activity rail, navigation sidebar, central document, and context panel that stack on narrow screens. Reserve smoked glass for status or live output; keep documents and forms flat.

Shared material tokens live in `apps/design-system/src/material.css`; semantic theme roles live in `src/styles.css` within that library. Use Helvetica Neue with Arial as a fallback, tabular numerals for values, and monospace for code. Use the shared material colors, with transparency for shadows, highlights, and glass. The accent marks primary actions and active controls. Distinguish status with labels and shapes.

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
