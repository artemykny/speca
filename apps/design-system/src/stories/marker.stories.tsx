import type { Meta, StoryObj } from "@storybook/react-vite"
import { Marker, MarkerIcon, MarkerContent } from "../components/ui/marker"
import { CheckCircleIcon } from "@phosphor-icons/react"

function Example() {
  return (
    <div className="grid w-[min(24rem,85vw)] gap-6">
      <Marker><MarkerIcon><CheckCircleIcon /></MarkerIcon><MarkerContent>Review completed</MarkerContent></Marker>
      <Marker variant="separator"><MarkerContent>New updates</MarkerContent></Marker>
      <Marker variant="border"><MarkerContent>Today</MarkerContent></Marker>
    </div>
  )
}

const meta = {
  title: "Components/Marker",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
