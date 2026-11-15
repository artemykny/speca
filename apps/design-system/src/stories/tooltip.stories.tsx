import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "../components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"

const meta = {
  title: "Components/Tooltip",
  component: TooltipContent,
  decorators: [(Story) => <TooltipProvider><Story /></TooltipProvider>],
  args: { children: "Save your changes", side: "top" },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger render={<Button variant="outline" />}>Save</TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
} satisfies Meta<typeof TooltipContent>

export default meta
export const Default: StoryObj<typeof meta> = {}
