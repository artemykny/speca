import type { Meta, StoryObj } from "@storybook/react-vite"
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert"
import { InfoIcon } from "@phosphor-icons/react"

function Example() {
  return (
    <div className="grid w-[min(28rem,85vw)] gap-4">
      <Alert><InfoIcon /><AlertTitle>Ready for review</AlertTitle><AlertDescription>Your draft contains three updated files.</AlertDescription></Alert>
      <Alert variant="destructive"><InfoIcon /><AlertTitle>Could not save</AlertTitle><AlertDescription>Check your connection and try again.</AlertDescription></Alert>
    </div>
  )
}

const meta = {
  title: "Components/Alert",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
