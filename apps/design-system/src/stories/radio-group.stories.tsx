import type { Meta, StoryObj } from "@storybook/react-vite"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"

function Example() {
  return (
    <RadioGroup defaultValue="draft" aria-label="Change status">
      <Label className="flex items-center gap-2"><RadioGroupItem value="draft" />Draft</Label>
      <Label className="flex items-center gap-2"><RadioGroupItem value="review" />In review</Label>
      <Label className="flex items-center gap-2"><RadioGroupItem value="approved" />Approved</Label>
    </RadioGroup>
  )
}

const meta = {
  title: "Components/Radio group",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
