import type { Meta, StoryObj } from "@storybook/react-vite"
import { AgenticChat } from "./agentic-chat/pattern"

const meta = {
  title: "Patterns/Agentic chat",
  component: AgenticChat,
  parameters: { layout: "fullscreen" },
  args: { initialScenario: "complete", simulateToolError: false },
  argTypes: {
    initialScenario: {
      control: "select",
      options: [
        "complete",
        "approval",
        "clarification",
        "streaming",
        "error",
        "empty",
      ],
    },
    simulateToolError: { control: "boolean" },
  },
} satisfies Meta<typeof AgenticChat>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const AwaitingApproval: Story = { args: { initialScenario: "approval" } }
export const Clarification: Story = {
  args: { initialScenario: "clarification" },
}
export const Streaming: Story = { args: { initialScenario: "streaming" } }
export const ToolError: Story = { args: { initialScenario: "error" } }
export const EmptyConversation: Story = { args: { initialScenario: "empty" } }
