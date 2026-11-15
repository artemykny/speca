import type { Meta, StoryObj } from "@storybook/react-vite"
import { MessageGroup, Message, MessageAvatar, MessageContent, MessageHeader, MessageFooter } from "../components/ui/message"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Bubble, BubbleContent } from "../components/ui/bubble"

function Example() {
  return (
    <MessageGroup className="w-[min(28rem,85vw)] gap-6">
      <Message><MessageAvatar><Avatar><AvatarFallback>AL</AvatarFallback></Avatar></MessageAvatar><MessageContent><MessageHeader>Alex Lee</MessageHeader><Bubble variant="secondary"><BubbleContent>The navigation draft is ready.</BubbleContent></Bubble><MessageFooter>10:30</MessageFooter></MessageContent></Message>
      <Message align="end"><MessageContent><MessageHeader>You</MessageHeader><Bubble><BubbleContent>I will review it now.</BubbleContent></Bubble><MessageFooter>10:31</MessageFooter></MessageContent></Message>
    </MessageGroup>
  )
}

const meta = {
  title: "Components/Message",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
