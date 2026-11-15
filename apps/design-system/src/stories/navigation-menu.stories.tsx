import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent, NavigationMenuLink } from "../components/ui/navigation-menu"

function Example() {
  const [page, setPage] = useState("Changes")

  return (
    <div className="grid gap-4">
      <NavigationMenu aria-label="Workspace"><NavigationMenuList>
        <NavigationMenuItem><NavigationMenuTrigger>Workspace</NavigationMenuTrigger><NavigationMenuContent className="w-48">{["Changes", "Files", "Reviews"].map((name) => <NavigationMenuLink key={name} href={`#${name.toLowerCase()}`} onClick={(event) => { event.preventDefault(); setPage(name) }}>{name}</NavigationMenuLink>)}</NavigationMenuContent></NavigationMenuItem>
        <NavigationMenuItem><NavigationMenuLink href="#settings" onClick={(event) => { event.preventDefault(); setPage("Settings") }}>Settings</NavigationMenuLink></NavigationMenuItem>
      </NavigationMenuList></NavigationMenu>
      <p role="status" className="text-sm text-muted-foreground">Selected: {page}</p>
    </div>
  )
}

const meta = {
  title: "Components/Navigation menu",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
