import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuCheckboxItem } from "../components/ui/dropdown-menu"
import { Button } from "../components/ui/button"

function Example() {
  const [action, setAction] = useState("Draft ready")
  const [watching, setWatching] = useState(false)

  return (
    <div className="grid gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" />}>Change actions</DropdownMenuTrigger>
        <DropdownMenuContent><DropdownMenuItem onClick={() => setAction("Opened draft")}>Open draft</DropdownMenuItem><DropdownMenuItem onClick={() => setAction("Duplicated draft")}>Duplicate</DropdownMenuItem><DropdownMenuSeparator /><DropdownMenuCheckboxItem checked={watching} onCheckedChange={setWatching}>Watch updates</DropdownMenuCheckboxItem></DropdownMenuContent>
      </DropdownMenu>
      <p role="status" className="text-sm text-muted-foreground">{action}. {watching ? "Watching updates." : "Updates muted."}</p>
    </div>
  )
}

const meta = {
  title: "Components/Dropdown menu",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
