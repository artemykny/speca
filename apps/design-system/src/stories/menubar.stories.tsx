import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator } from "../components/ui/menubar"

function Example() {
  const [action, setAction] = useState("Choose an action.")

  return (
    <div className="grid gap-4">
      <Menubar><MenubarMenu><MenubarTrigger>File</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setAction("New draft created")}>New draft</MenubarItem><MenubarItem onClick={() => setAction("Draft opened")}>Open draft</MenubarItem><MenubarSeparator /><MenubarItem disabled>Export</MenubarItem></MenubarContent></MenubarMenu><MenubarMenu><MenubarTrigger>Edit</MenubarTrigger><MenubarContent><MenubarItem onClick={() => setAction("Last edit undone")}>Undo</MenubarItem><MenubarItem onClick={() => setAction("Last edit restored")}>Redo</MenubarItem></MenubarContent></MenubarMenu></Menubar>
      <p role="status" className="text-sm text-muted-foreground">{action}</p>
    </div>
  )
}

const meta = {
  title: "Components/Menubar",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
