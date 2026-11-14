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

## Extend the library

Add base components with the configured shadcn CLI:

```sh
npx shadcn add tooltip
```

Export components from `src/index.ts`. Add examples under `src/stories/`; shared theme tokens live in `src/styles.css`. Paths in this section are relative to the library directory.

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
