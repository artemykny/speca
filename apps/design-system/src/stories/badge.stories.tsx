import type { Meta, StoryObj } from "@storybook/react-vite"
import { Badge } from "../components/ui/badge"

const meta = {
  title: "Components/Badge",
  component: Badge,
  args: { children: "Draft", variant: "default" },
  argTypes: { variant: { control: "select", options: ["default", "secondary", "destructive", "outline", "ghost", "link"] } },
} satisfies Meta<typeof Badge>

export default meta
export const Default: StoryObj<typeof meta> = {}
