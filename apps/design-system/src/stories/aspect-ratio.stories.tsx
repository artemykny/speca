import type { Meta, StoryObj } from "@storybook/react-vite"
import { AspectRatio } from "../components/ui/aspect-ratio"

function Example() {
  return (
    <div className="w-[min(28rem,85vw)]">
      <AspectRatio ratio={16 / 9} className="flex items-center justify-center rounded-lg bg-muted text-muted-foreground">16:9 preview</AspectRatio>
    </div>
  )
}

const meta = {
  title: "Components/Aspect ratio",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
