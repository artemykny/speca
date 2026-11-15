import type { Meta, StoryObj } from "@storybook/react-vite"
import { Skeleton } from "../components/ui/skeleton"

function Example() {
  return (
    <div role="status" aria-label="Loading change" className="flex w-[min(24rem,85vw)] items-center gap-4">
      <Skeleton className="size-12 shrink-0 rounded-full" />
      <div className="grid flex-1 gap-2"><Skeleton className="h-4 w-3/4" /><Skeleton className="h-4 w-full" /></div>
      <span className="sr-only">Loading change…</span>
    </div>
  )
}

const meta = {
  title: "Components/Skeleton",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
