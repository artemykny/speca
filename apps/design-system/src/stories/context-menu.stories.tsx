import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "../components/ui/context-menu"

function Example() {
  const [action, setAction] = useState("")

  return (
    <div className="grid gap-4">
      <ContextMenu>
        <ContextMenuTrigger tabIndex={0} className="flex h-40 w-[min(24rem,85vw)] items-center justify-center rounded-lg border border-dashed text-sm">Right-click or press Shift+F10</ContextMenuTrigger>
        <ContextMenuContent><ContextMenuItem onClick={() => setAction("Opened")}>Open</ContextMenuItem><ContextMenuItem onClick={() => setAction("Duplicated")}>Duplicate</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem disabled>Delete</ContextMenuItem></ContextMenuContent>
      </ContextMenu>
      <p role="status" className="text-sm text-muted-foreground">{action || "No action selected."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Context menu",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
