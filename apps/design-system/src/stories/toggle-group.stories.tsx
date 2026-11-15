import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ToggleGroup, ToggleGroupItem } from "../components/ui/toggle-group"
import { TextAlignLeftIcon, TextAlignCenterIcon, TextAlignRightIcon } from "@phosphor-icons/react"

function Example() {
  const [alignment, setAlignment] = useState<string[]>(["left"])

  return (
    <div className="grid w-[min(24rem,85vw)] gap-4">
      <ToggleGroup aria-label="Text alignment" variant="outline" value={alignment} onValueChange={(next) => { if (next.length) setAlignment(next) }}>
        <ToggleGroupItem value="left" aria-label="Align left"><TextAlignLeftIcon /></ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center"><TextAlignCenterIcon /></ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right"><TextAlignRightIcon /></ToggleGroupItem>
      </ToggleGroup>
      <p className="rounded-lg border p-4 text-sm" style={{ textAlign: alignment[0] as "left" | "center" | "right" }}>Preview text</p>
    </div>
  )
}

const meta = {
  title: "Components/Toggle group",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
