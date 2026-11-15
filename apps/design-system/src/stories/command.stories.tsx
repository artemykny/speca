import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "../components/ui/command"

function Example() {
  const [selected, setSelected] = useState("")

  return (
    <div className="grid w-[min(24rem,85vw)] gap-4">
      <Command className="rounded-lg border">
        <CommandInput placeholder="Search actions…" aria-label="Search actions" />
        <CommandList><CommandEmpty>No actions found.</CommandEmpty><CommandGroup heading="Workspace">{["Create change", "Open review", "View settings"].map((action) => <CommandItem key={action} onSelect={() => setSelected(action)}>{action}</CommandItem>)}</CommandGroup></CommandList>
      </Command>
      <p role="status" className="text-sm text-muted-foreground">{selected || "Select an action."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Command",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
