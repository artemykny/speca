import type { Meta, StoryObj } from "@storybook/react-vite"

function Colors() {
  return (
    <div className="grid max-w-2xl grid-cols-2 gap-6 sm:grid-cols-3">
      {["background", "foreground", "primary", "secondary", "muted", "accent", "destructive", "border", "ring"].map((token) => (
        <div key={token} className="grid gap-2">
          <div className="h-16 w-28 rounded-lg border" style={{ background: `var(--${token})` }} />
          <span className="text-sm">{token}</span>
        </div>
      ))}
    </div>
  )
}

const meta = { title: "Foundations/Colors", component: Colors } satisfies Meta<typeof Colors>
export default meta
export const Default: StoryObj<typeof meta> = {}
