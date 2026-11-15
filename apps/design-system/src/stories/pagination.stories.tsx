import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from "../components/ui/pagination"

function Example() {
  const [page, setPage] = useState(1)

  return (
    <div className="grid gap-4">
      <Pagination><PaginationContent>
        <PaginationItem><PaginationPrevious href={`#page-${Math.max(1, page - 1)}`} aria-disabled={page === 1} onClick={(event) => { event.preventDefault(); setPage(Math.max(1, page - 1)) }} /></PaginationItem>
        {[1, 2, 3].map((number) => <PaginationItem key={number}><PaginationLink href={`#page-${number}`} isActive={page === number} onClick={(event) => { event.preventDefault(); setPage(number) }}>{number}</PaginationLink></PaginationItem>)}
        <PaginationItem><PaginationNext href={`#page-${Math.min(3, page + 1)}`} aria-disabled={page === 3} onClick={(event) => { event.preventDefault(); setPage(Math.min(3, page + 1)) }} /></PaginationItem>
      </PaginationContent></Pagination>
      <p role="status" className="text-center text-sm text-muted-foreground">Page {page} of 3</p>
    </div>
  )
}

const meta = {
  title: "Components/Pagination",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
