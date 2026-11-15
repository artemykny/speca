import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { Slider } from "../components/ui/slider"
import { Label } from "../components/ui/label"

function Example() {
  const id = useId()
  const [value, setValue] = useState([100])

  return (
    <div className="grid w-[min(24rem,85vw)] gap-4">
      <Label id={id}>Preview scale</Label>
      <Slider aria-labelledby={id} value={value} onValueChange={(next) => setValue(Array.isArray(next) ? next : [next])} min={50} max={150} step={10} />
      <p role="status" className="text-sm text-muted-foreground">{value[0]}%</p>
    </div>
  )
}

const meta = {
  title: "Components/Slider",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
