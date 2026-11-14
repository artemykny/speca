import type { Meta, StoryObj } from "@storybook/react-vite"
import { PlusIcon } from "lucide-react"
import { Button } from "../components/ui/button"

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Create change", variant: "default", size: "default", disabled: false },
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "utility", "outline", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["default", "pad", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
export const WithIcon: Story = {
  args: { children: <><PlusIcon data-icon="inline-start" />Create change</> },
}
export const Variants: Story = {
  render: () => (
    <div className="flex max-w-xl flex-wrap items-center gap-3">
      {(["default", "secondary", "utility", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
        <Button key={variant} variant={variant}>{variant}</Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs" variant="outline">Extra small</Button>
      <Button size="sm" variant="outline">Small</Button>
      <Button>Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
