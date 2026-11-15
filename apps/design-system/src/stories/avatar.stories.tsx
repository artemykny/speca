import type { Meta, StoryObj } from "@storybook/react-vite"
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "../components/ui/avatar"

function Example() {
  return (
    <AvatarGroup>
      <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>BK</AvatarFallback></Avatar>
      <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
      <AvatarGroupCount>+2</AvatarGroupCount>
    </AvatarGroup>
  )
}

const meta = {
  title: "Components/Avatar",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
