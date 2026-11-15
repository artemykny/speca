import type { Meta, StoryObj } from "@storybook/react-vite"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "../components/ui/sheet"
import { Button } from "../components/ui/button"

function Example() {
  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetHeader><SheetTitle>Change details</SheetTitle><SheetDescription>Review the files included in this draft.</SheetDescription></SheetHeader>
        <ul className="grid gap-2 px-6 py-4 text-sm"><li>navigation.md</li><li>search.md</li></ul>
        <SheetFooter><SheetClose render={<Button variant="outline" />}>Close</SheetClose></SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

const meta = {
  title: "Components/Sheet",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
