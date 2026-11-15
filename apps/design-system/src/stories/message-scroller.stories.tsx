import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton } from "../components/ui/message-scroller"
import { Button } from "../components/ui/button"

function Example() {
  const [count, setCount] = useState(12)

  return (
    <div className="grid w-[min(28rem,85vw)] gap-4">
      <MessageScrollerProvider>
        <MessageScroller className="h-80 rounded-lg border">
          <MessageScrollerViewport aria-label="Review messages"><MessageScrollerContent className="gap-4 p-4">
            {Array.from({ length: count }, (_, index) => <MessageScrollerItem key={index} messageId={`message-${index}`}><p className="rounded-lg bg-muted p-4 text-sm">Review update {index + 1}: file checked.</p></MessageScrollerItem>)}
          </MessageScrollerContent></MessageScrollerViewport>
          <MessageScrollerButton direction="start" /><MessageScrollerButton />
        </MessageScroller>
      </MessageScrollerProvider>
      <Button variant="outline" onClick={() => setCount(count + 1)}>Add message</Button>
    </div>
  )
}

const meta = {
  title: "Components/Message scroller",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
