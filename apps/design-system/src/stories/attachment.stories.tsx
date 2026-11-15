import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Attachment, AttachmentMedia, AttachmentContent, AttachmentTitle, AttachmentDescription, AttachmentActions, AttachmentAction } from "../components/ui/attachment"
import { Button } from "../components/ui/button"
import { FileTextIcon, XIcon } from "@phosphor-icons/react"

function Example() {
  const [attached, setAttached] = useState(true)

  return (
    <div className="grid gap-4">
      {attached ? (
        <Attachment>
          <AttachmentMedia><FileTextIcon aria-hidden="true" /></AttachmentMedia>
          <AttachmentContent><AttachmentTitle>navigation.md</AttachmentTitle><AttachmentDescription>Markdown · 4 KB</AttachmentDescription></AttachmentContent>
          <AttachmentActions><AttachmentAction aria-label="Remove navigation.md" onClick={() => setAttached(false)}><XIcon /></AttachmentAction></AttachmentActions>
        </Attachment>
      ) : <Button variant="outline" onClick={() => setAttached(true)}>Restore attachment</Button>}
      <p role="status" className="text-sm text-muted-foreground">{attached ? "One file attached." : "Attachment removed."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Attachment",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
