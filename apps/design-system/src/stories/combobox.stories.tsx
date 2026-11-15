import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { Combobox, ComboboxInput, ComboboxContent, ComboboxList, ComboboxItem, ComboboxEmpty } from "../components/ui/combobox"
import { Label } from "../components/ui/label"

function Example() {
  const id = useId()

  return (
    <div className="grid w-[min(20rem,85vw)] gap-2">
      <Label htmlFor={id}>Change status</Label>
      <Combobox items={["Draft", "In review", "Approved"]}>
        <ComboboxInput id={id} placeholder="Select a status" showClear />
        <ComboboxContent><ComboboxEmpty>No status found.</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxContent>
      </Combobox>
    </div>
  )
}

const meta = {
  title: "Components/Combobox",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
