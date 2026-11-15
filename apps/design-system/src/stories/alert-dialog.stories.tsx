import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "../components/ui/alert-dialog"
import { Button } from "../components/ui/button"

function Example() {
  const [discarded, setDiscarded] = useState(false)

  return (
    <div className="grid gap-4">
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="outline" />}>Discard draft</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Discard this draft?</AlertDialogTitle><AlertDialogDescription>This example only updates the status below.</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter><AlertDialogCancel>Keep draft</AlertDialogCancel><AlertDialogAction onClick={() => setDiscarded(true)}>Discard</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <p role="status" className="text-sm text-muted-foreground">{discarded ? "Draft discarded." : "Draft retained."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Alert dialog",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
