import type { Meta, StoryObj } from "@storybook/react-vite"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "../components/ui/collapsible"
import { Button } from "../components/ui/button"

function Example() {
  return (
    <Collapsible className="grid w-[min(24rem,85vw)] gap-3">
      <CollapsibleTrigger render={<Button variant="outline" />}>Toggle changed files</CollapsibleTrigger>
      <CollapsibleContent><ul className="grid gap-2 rounded-lg border p-4 text-sm"><li>navigation.md</li><li>search.md</li><li>settings.md</li></ul></CollapsibleContent>
    </Collapsible>
  )
}

const meta = {
  title: "Components/Collapsible",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
