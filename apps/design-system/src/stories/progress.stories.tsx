import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Progress, ProgressLabel, ProgressValue } from "../components/ui/progress"
import { Button } from "../components/ui/button"

function Example() {
  const [value, setValue] = useState(25)

  return (
    <div className="grid w-[min(24rem,85vw)] gap-4">
      <Progress value={value}><ProgressLabel>Files reviewed</ProgressLabel><ProgressValue /></Progress>
      <Button variant="outline" onClick={() => setValue(value === 100 ? 0 : value + 25)}>{value === 100 ? "Reset" : "Review next file"}</Button>
    </div>
  )
}

const meta = {
  title: "Components/Progress",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
