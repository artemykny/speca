import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { Label } from "../components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"

const items = [
  { label: "Draft", value: "draft" },
  { label: "In review", value: "review" },
  { label: "Completed", value: "completed" },
]

function StatusSelect({ disabled = false }) {
  const id = useId()
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>Status</Label>
      <Select items={items} defaultValue="draft" disabled={disabled}>
        <SelectTrigger id={id} className="w-56"><SelectValue /></SelectTrigger>
        <SelectContent>
          {items.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}

const meta = { title: "Components/Select", component: StatusSelect, args: { disabled: false } } satisfies Meta<typeof StatusSelect>
export default meta
export const Default: StoryObj<typeof meta> = {}
export const Disabled: StoryObj<typeof meta> = { args: { disabled: true } }
