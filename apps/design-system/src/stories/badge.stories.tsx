import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "../components/ui/badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Draft", variant: "default" },
  argTypes: { variant: { control: "select", options: ["default", "secondary", "destructive", "outline", "ghost", "link", "success", "warning", "info"] } },
} satisfies Meta<typeof Badge>

export default meta
export const Default: StoryObj<typeof meta> = {}

export const Statuses: StoryObj<typeof meta> = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">Draft</Badge>
      <Badge variant="info">In progress</Badge>
      <Badge variant="warning">Needs review</Badge>
      <Badge variant="success">Approved</Badge>
      <Badge variant="destructive">Blocked</Badge>
    </div>
  ),
}
