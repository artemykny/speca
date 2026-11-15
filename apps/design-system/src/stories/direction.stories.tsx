import type { Meta, StoryObj } from "@storybook/react-vite"
import { DirectionProvider } from "../components/ui/direction"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"

function Example() {
  return (
    <div className="grid gap-6">
      {(["ltr", "rtl"] as const).map((direction) => (
        <DirectionProvider key={direction} direction={direction}>
          <div dir={direction} className="grid w-[min(20rem,85vw)] gap-3 rounded-lg border p-4">
            <p className="text-sm font-medium">{direction === "ltr" ? "Left to right" : "Right to left"}</p>
            <RadioGroup defaultValue="draft" aria-label={`${direction} status`}>
              <Label className="flex items-center gap-2"><RadioGroupItem value="draft" />Draft</Label>
              <Label className="flex items-center gap-2"><RadioGroupItem value="approved" />Approved</Label>
            </RadioGroup>
          </div>
        </DirectionProvider>
      ))}
    </div>
  )
}

const meta = {
  title: "Components/Direction",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
