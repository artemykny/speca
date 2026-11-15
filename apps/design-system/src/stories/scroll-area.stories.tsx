import type { Meta, StoryObj } from "@storybook/react-vite"
import { ScrollArea } from "../components/ui/scroll-area"
import { Separator } from "../components/ui/separator"

function Example() {
  return (
    <ScrollArea className="h-64 w-[min(24rem,85vw)] rounded-lg border" aria-label="Changed files">
      <div className="p-4"><h3 className="mb-4 text-sm font-medium">Changed files</h3>{Array.from({ length: 20 }, (_, index) => <div key={index}><p className="py-2 text-sm">document-{index + 1}.md</p>{index < 19 && <Separator />}</div>)}</div>
    </ScrollArea>
  )
}

const meta = {
  title: "Components/Scroll area",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
