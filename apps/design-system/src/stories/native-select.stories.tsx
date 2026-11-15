import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { NativeSelect, NativeSelectOption, NativeSelectOptGroup } from "../components/ui/native-select"
import { Label } from "../components/ui/label"

function Example() {
  const id = useId()

  return (
    <div className="grid w-[min(20rem,85vw)] gap-2">
      <Label htmlFor={id}>Change status</Label>
      <NativeSelect id={id} defaultValue="draft"><NativeSelectOptGroup label="In progress"><NativeSelectOption value="draft">Draft</NativeSelectOption><NativeSelectOption value="review">In review</NativeSelectOption></NativeSelectOptGroup><NativeSelectOption value="approved">Approved</NativeSelectOption></NativeSelect>
    </div>
  )
}

const meta = {
  title: "Components/Native select",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
