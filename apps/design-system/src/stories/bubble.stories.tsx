import type { Meta, StoryObj } from "@storybook/react-vite"
import { BubbleGroup, Bubble, BubbleContent } from "../components/ui/bubble"

function Example() {
  return (
    <BubbleGroup className="w-[min(28rem,85vw)]">
      <Bubble variant="secondary"><BubbleContent>Is the navigation draft ready?</BubbleContent></Bubble>
      <Bubble align="end"><BubbleContent>Yes, I have added the final edits.</BubbleContent></Bubble>
    </BubbleGroup>
  )
}

const meta = {
  title: "Components/Bubble",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
