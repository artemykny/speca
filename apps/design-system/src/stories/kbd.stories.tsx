import type { Meta, StoryObj } from "@storybook/react-vite"
import { Kbd, KbdGroup } from "../components/ui/kbd"

function Example() {
  return (
    <p className="flex items-center gap-3 text-sm">Open search <KbdGroup><Kbd>⌘</Kbd><Kbd>K</Kbd></KbdGroup></p>
  )
}

const meta = {
  title: "Components/Kbd",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
