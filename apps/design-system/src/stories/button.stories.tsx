import type { Meta, StoryObj } from "@storybook/react-vite"
import { PlusIcon } from "lucide-react"
import { Button } from "../components/ui/button"

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Create change", variant: "default", size: "default", disabled: false },
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "outline", "ghost", "destructive", "link"] },
    size: { control: "select", options: ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"] },
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
      {(["default", "secondary", "outline", "ghost", "destructive", "link"] as const).map((variant) => (
        <Button key={variant} variant={variant}>{variant}</Button>
      ))}
    </div>
  ),
}
