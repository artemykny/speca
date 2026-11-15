import type { Preview } from "@storybook/react-vite"
import { useEffect } from "react"
import "../src/styles.css"
import "./docs.css"

const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Component color theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      useEffect(() => {
        document.documentElement.classList.toggle("dark", context.globals.theme === "dark")
      }, [context.globals.theme])
      return <Story />
    },
  ],
  parameters: {
    layout: "centered",
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    options: { storySort: { order: ["Foundations", ["Overview", "Colors"], "Patterns", "Components"] } },
    a11y: { test: "todo" },
  },
  tags: ["autodocs"],
}

export default preview
