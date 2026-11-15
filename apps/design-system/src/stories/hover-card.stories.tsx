import type { Meta, StoryObj } from "@storybook/react-vite"
import { HoverCard, HoverCardTrigger, HoverCardContent } from "../components/ui/hover-card"
import { Avatar, AvatarFallback } from "../components/ui/avatar"

function Example() {
  return (
    <HoverCard>
      <HoverCardTrigger render={<a href="#reviewer" onClick={(event) => event.preventDefault()} className="text-sm underline underline-offset-4" />}>Alex Lee</HoverCardTrigger>
      <HoverCardContent className="flex gap-3"><Avatar><AvatarFallback>AL</AvatarFallback></Avatar><div className="grid gap-1"><p className="text-sm font-medium">Alex Lee</p><p className="text-sm text-muted-foreground">Reviewer for the navigation draft.</p></div></HoverCardContent>
    </HoverCard>
  )
}

const meta = {
  title: "Components/Hover card",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
