import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Toggle } from "../components/ui/toggle"
import { TextBIcon } from "@phosphor-icons/react"

function Example() {
  const [bold, setBold] = useState(false)

  return (
    <div className="grid gap-4">
      <Toggle aria-label="Bold text" variant="outline" pressed={bold} onPressedChange={setBold}><TextBIcon /></Toggle>
      <p className={bold ? "text-sm font-bold" : "text-sm"}>Preview text</p>
    </div>
  )
}

const meta = {
  title: "Components/Toggle",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
