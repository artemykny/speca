import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Item, ItemMedia, ItemContent, ItemTitle, ItemDescription, ItemActions } from "../components/ui/item"
import { Button } from "../components/ui/button"
import { FileTextIcon } from "@phosphor-icons/react"

function Example() {
  const [reviewed, setReviewed] = useState(false)

  return (
    <div className="grid w-[min(28rem,85vw)] gap-3">
      <Item variant="outline"><ItemMedia variant="icon"><FileTextIcon /></ItemMedia><ItemContent><ItemTitle>Update navigation</ItemTitle><ItemDescription>Three files are ready for review.</ItemDescription></ItemContent><ItemActions><Button variant="outline" size="sm" onClick={() => setReviewed(!reviewed)}>{reviewed ? "Undo" : "Mark reviewed"}</Button></ItemActions></Item>
      <p role="status" className="text-sm text-muted-foreground">{reviewed ? "Reviewed." : "Awaiting review."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Item",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
