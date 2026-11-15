import type { Meta, StoryObj } from "@storybook/react-vite"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "../components/ui/accordion"

function Example() {
  return (
    <Accordion className="w-[min(28rem,85vw)]" defaultValue={["changes"]}>
      <AccordionItem value="changes">
        <AccordionTrigger>What is a change?</AccordionTrigger>
        <AccordionContent>A named set of edits that you can review together.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="review">
        <AccordionTrigger>How do I review edits?</AccordionTrigger>
        <AccordionContent>Open a change and compare its files before approving it.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

const meta = {
  title: "Components/Accordion",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
