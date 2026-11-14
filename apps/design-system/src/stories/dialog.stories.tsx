import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { Button } from "../components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"

function CreateChangeDialog() {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [created, setCreated] = useState("")

  return (
    <div className="grid gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger render={<Button />}>Create change</DialogTrigger>
        <DialogContent>
          <form className="grid gap-4" onSubmit={(event) => {
            event.preventDefault()
            if (!name.trim()) return
            setCreated(name.trim())
            setName("")
            setOpen(false)
          }}>
            <DialogHeader>
              <DialogTitle>Create change</DialogTitle>
              <DialogDescription>Give the change a name. This example keeps it in memory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-2">
              <Label htmlFor={id}>Name</Label>
              <Input id={id} value={name} onChange={(event) => setName(event.target.value)} placeholder="Update navigation" required />
            </div>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <Button type="submit" disabled={!name.trim()}>Create change</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <p role="status" className="text-sm text-muted-foreground">{created ? `Created “${created}”.` : ""}</p>
    </div>
  )
}

const meta = { title: "Components/Dialog", component: CreateChangeDialog } satisfies Meta<typeof CreateChangeDialog>
export default meta
export const Default: StoryObj<typeof meta> = {}
