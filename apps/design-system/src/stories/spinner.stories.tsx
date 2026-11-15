import type { Meta, StoryObj } from "@storybook/react-vite"
import { Spinner } from "../components/ui/spinner"
import { Button } from "../components/ui/button"

function Example() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <span role="status" className="flex items-center gap-2 text-sm"><Spinner aria-hidden="true" />Loading changes…</span>
      <Button disabled><Spinner aria-hidden="true" />Saving</Button>
    </div>
  )
}

const meta = {
  title: "Components/Spinner",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
