import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "../components/ui/empty"
import { Button } from "../components/ui/button"
import { FolderIcon } from "@phosphor-icons/react"

function Example() {
  const [created, setCreated] = useState(false)

  return (
    <div className="w-[min(28rem,85vw)]">
      {created ? <p role="status" className="rounded-lg border p-6 text-sm">New draft created.</p> : (
        <Empty className="border"><EmptyHeader><EmptyMedia variant="icon"><FolderIcon /></EmptyMedia><EmptyTitle>No changes yet</EmptyTitle><EmptyDescription>Create a draft to start editing.</EmptyDescription></EmptyHeader><EmptyContent><Button onClick={() => setCreated(true)}>Create draft</Button></EmptyContent></Empty>
      )}
    </div>
  )
}

const meta = {
  title: "Components/Empty",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
