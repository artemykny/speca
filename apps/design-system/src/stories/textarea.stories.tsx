import type { Meta, StoryObj } from "@storybook/react-vite"
import { Textarea } from "../components/ui/textarea"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  args: { "aria-label": "Change description", placeholder: "Describe the change", disabled: false, className: "w-72" },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const Invalid: Story = { args: { "aria-invalid": true, defaultValue: "Incomplete description" } }
