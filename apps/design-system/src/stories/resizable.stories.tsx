import type { Meta, StoryObj } from "@storybook/react-vite"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "../components/ui/resizable"

function Example() {
  return (
    <ResizablePanelGroup orientation="horizontal" className="h-64 w-[min(32rem,85vw)] rounded-lg border">
      <ResizablePanel defaultSize="35%" minSize="20%"><div className="flex h-full items-center justify-center p-4 text-sm">Files</div></ResizablePanel>
      <ResizableHandle withHandle aria-label="Resize file panel" />
      <ResizablePanel defaultSize="65%" minSize="30%"><div className="flex h-full items-center justify-center p-4 text-sm">Change preview</div></ResizablePanel>
    </ResizablePanelGroup>
  )
}

const meta = {
  title: "Components/Resizable",
  component: Example,
} satisfies Meta<typeof Example>

export default meta
export const Default: StoryObj<typeof meta> = {}
