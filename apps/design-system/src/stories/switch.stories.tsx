import type { Meta, StoryObj } from "@storybook/react-vite"
import { Switch } from "../components/ui/switch"
import { Label } from "../components/ui/label"

const meta = {
  title: "Components/Switch",
  component: Switch,
  args: { disabled: false },
  render: (args) => <Label><Switch {...args} />Show completed changes</Label>,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }
