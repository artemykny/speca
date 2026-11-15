import type { Meta, StoryObj } from "@storybook/react-vite"
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "../components/ui/drawer"
import { Button } from "../components/ui/button"

function Example() {
  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader><DrawerTitle>Change details</DrawerTitle><DrawerDescription>Review the files included in this draft.</DrawerDescription></DrawerHeader>
        <ul className="grid gap-2 px-6 py-4 text-sm"><li>navigation.md</li><li>search.md</li></ul>
        <DrawerFooter><DrawerClose render={<Button variant="outline" />}>Close</DrawerClose></DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

const meta = {
  title: "Components/Drawer",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
