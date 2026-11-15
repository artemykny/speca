import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "../components/ui/breadcrumb"

function Example() {
  const [page, setPage] = useState("Update navigation")

  return (
    <div className="grid gap-4">
      <Breadcrumb><BreadcrumbList>
        <BreadcrumbItem><BreadcrumbLink href="#workspace" onClick={(event) => { event.preventDefault(); setPage("Workspace") }}>Workspace</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem><BreadcrumbLink href="#changes" onClick={(event) => { event.preventDefault(); setPage("Changes") }}>Changes</BreadcrumbLink></BreadcrumbItem>
        <BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Update navigation</BreadcrumbPage></BreadcrumbItem>
      </BreadcrumbList></Breadcrumb>
      <p role="status" className="text-sm text-muted-foreground">Selected: {page}</p>
    </div>
  )
}

const meta = {
  title: "Components/Breadcrumb",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
