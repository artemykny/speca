import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

const meta = {
  title: "Components/Label",
  component: Label,
  args: { children: "Change name" },
  render: function Example(args) {
    const id = useId()
    return <div className="grid w-72 gap-2"><Label {...args} htmlFor={id} /><Input id={id} placeholder="Update navigation" /></div>
  },
} satisfies Meta<typeof Label>

export default meta
export const Default: StoryObj<typeof meta> = {}
