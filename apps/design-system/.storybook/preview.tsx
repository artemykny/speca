import { DocsContainer, type DocsContainerProps } from "@storybook/addon-docs/blocks"
import type { Preview } from "@storybook/react-vite"
import { GLOBALS_UPDATED } from "storybook/internal/core-events"
import { useLayoutEffect, useSyncExternalStore, type PropsWithChildren } from "react"
import { getMode, initialMode, themes } from "./theme"
import "../src/styles.css"
import "./docs.css"

function useDocumentTheme(mode: keyof typeof themes) {
  useLayoutEffect(() => {
    const root = document.documentElement
    // Isolated Docs stories have their own document and no toolbar globals.
    const host = window.frameElement?.closest("[data-story-block]")?.ownerDocument.documentElement
    if (host) {
      const sync = () => {
        root.classList.toggle("dark", host.classList.contains("dark"))
      }
      sync()
      const observer = new MutationObserver(sync)
      observer.observe(host, { attributeFilter: ["class"] })
      return () => observer.disconnect()
    }
    root.classList.toggle("dark", mode === "dark")
  }, [mode])
}

const docsThemes = {
  light: { ...themes.light, fontBase: "var(--font-sans)" },
  dark: { ...themes.dark, fontBase: "var(--font-sans)" },
}

function ThemedDocs({ context, children }: PropsWithChildren<DocsContainerProps>) {
  const mode = useSyncExternalStore(
    (notify) => {
      context.channel.on(GLOBALS_UPDATED, notify)
      return () => context.channel.off(GLOBALS_UPDATED, notify)
    },
    () => getMode(context.getStoryContext(context.componentStories()[0]).globals.theme)
  )
  useDocumentTheme(mode)
  const theme = docsThemes[mode]
  return <DocsContainer context={context} theme={theme}>{children}</DocsContainer>
}

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Design system color theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: initialMode },
  decorators: [
    (Story, context) => {
      useDocumentTheme(getMode(context.globals.theme))
      return <Story />
    },
  ],
  parameters: {
    layout: "centered",
    docs: { container: ThemedDocs },
    backgrounds: { disable: true },
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: { storySort: { order: ["Foundations", ["Overview", "Colors"], "Patterns", "Components"] } },
    a11y: { test: "todo" },
  },
  tags: ["autodocs"],
}

export default preview
