import type { Meta, StoryObj } from "@storybook/react-vite"
import { Trace, TraceLine, TraceIcon, TraceTitle, TraceDescription, TraceCollapsible, TraceCollapsibleTrigger, TraceCollapsibleContent } from "../components/ui/trace"
import { CheckCircleIcon, FileTextIcon } from "@phosphor-icons/react"

function Example() {
  return (
    <Trace className="w-[min(28rem,85vw)]">
      <TraceLine><TraceIcon><CheckCircleIcon /></TraceIcon><TraceTitle>Files loaded</TraceTitle><TraceDescription>3 files</TraceDescription></TraceLine>
      <TraceCollapsible><TraceCollapsibleTrigger><TraceLine><TraceIcon><FileTextIcon /></TraceIcon><TraceTitle>Review changes</TraceTitle></TraceLine></TraceCollapsibleTrigger><TraceCollapsibleContent><ul className="grid gap-2 text-sm"><li>navigation.md — reviewed</li><li>search.md — reviewed</li><li>settings.md — pending</li></ul></TraceCollapsibleContent></TraceCollapsible>
      <TraceLine status="pending"><TraceTitle>Awaiting approval</TraceTitle></TraceLine>
    </Trace>
  )
}

const meta = {
  title: "Components/Trace",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
