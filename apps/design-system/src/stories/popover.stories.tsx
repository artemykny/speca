import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from "../components/ui/popover"
import { Button } from "../components/ui/button"
import { Label } from "../components/ui/label"
import { Input } from "../components/ui/input"

function Example() {
  const id = useId()

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>Edit change name</PopoverTrigger>
      <PopoverContent className="grid gap-4"><PopoverHeader><PopoverTitle>Change name</PopoverTitle><PopoverDescription>Choose a descriptive name for this draft.</PopoverDescription></PopoverHeader><div className="grid gap-2"><Label htmlFor={id}>Name</Label><Input id={id} defaultValue="Update navigation" /></div></PopoverContent>
    </Popover>
  )
}

const meta = {
  title: "Components/Popover",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
