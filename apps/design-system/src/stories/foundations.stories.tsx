import type { Meta, StoryObj } from "@storybook/react-vite"

const groups = [
  { name: "Surfaces", tokens: ["background", "card", "popover", "sidebar"] },
  {
    name: "Content & controls",
    tokens: [
      "foreground",
      "muted-foreground",
      "primary",
      "secondary",
      "accent",
      "border",
      "input",
      "ring",
    ],
  },
  {
    name: "Feedback",
    tokens: [
      "destructive",
    ],
  },
]

function Colors() {
  return (
    <main className="mx-auto max-w-4xl space-y-8 px-6 py-10">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Color roles</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Shared semantic tokens adapt to the selected theme.
        </p>
      </header>
      {groups.map((group) => (
        <section key={group.name}>
          <h2 className="mb-4 text-sm font-semibold">{group.name}</h2>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {group.tokens.map((token) => (
              <div key={token} className="min-w-0 space-y-2">
                <div
                  className="h-20 rounded-lg border"
                  style={{ background: `var(--${token})` }}
                />
                <p className="text-xs text-muted-foreground">{token}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}

const meta = {
  title: "Foundations/Colors",
  component: Colors,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Colors>
export default meta
export const Default: StoryObj<typeof meta> = {}
