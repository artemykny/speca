import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter, SidebarInset, SidebarTrigger } from "../components/ui/sidebar"
import { TooltipProvider } from "../components/ui/tooltip"
import { FolderIcon, FileTextIcon, CheckCircleIcon } from "@phosphor-icons/react"

function Example() {
  const [page, setPage] = useState("Changes")

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader><p className="px-2 py-1 text-sm font-semibold group-data-[collapsible=icon]:sr-only">Speca</p></SidebarHeader>
          <SidebarContent><SidebarGroup><SidebarGroupLabel>Workspace</SidebarGroupLabel><SidebarGroupContent><SidebarMenu>{[{ name: "Changes", icon: FileTextIcon }, { name: "Files", icon: FolderIcon }, { name: "Reviews", icon: CheckCircleIcon }].map(({ name, icon: Icon }) => <SidebarMenuItem key={name}><SidebarMenuButton tooltip={name} isActive={page === name} onClick={() => setPage(name)}><Icon /><span>{name}</span></SidebarMenuButton></SidebarMenuItem>)}</SidebarMenu></SidebarGroupContent></SidebarGroup></SidebarContent>
          <SidebarFooter><p className="px-2 py-1 text-xs text-muted-foreground group-data-[collapsible=icon]:sr-only">Design system example</p></SidebarFooter>
        </Sidebar>
        <SidebarInset><header className="flex items-center gap-3 border-b p-4"><SidebarTrigger /><h1 className="font-medium">{page}</h1></header><p role="status" className="p-6 text-sm text-muted-foreground">Viewing {page.toLowerCase()}.</p></SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

const meta = {
  title: "Components/Sidebar",
  component: Example,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
