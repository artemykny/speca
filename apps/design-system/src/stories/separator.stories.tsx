import type { Meta, StoryObj } from "@storybook/react-vite"
import { Separator } from "../components/ui/separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
  render: () => (
    <div className="grid w-72 gap-4 text-sm">
      <p>Change details</p>
      <Separator />
      <p className="text-muted-foreground">Files and history</p>
    </div>
  ),
} satisfies Meta<typeof Separator>

export default meta
export const Default: StoryObj<typeof meta> = {}
