import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

const meta = {
  title: "Components/Tabs",
  component: TabsList,
  args: { variant: "default" },
  argTypes: { variant: { control: "select", options: ["default", "line"] } },
  render: (args) => (
    <Tabs defaultValue="overview" className="w-72">
      <TabsList {...args} aria-label="Change details">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="files">Files</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="py-4">Review the proposed navigation changes.</TabsContent>
      <TabsContent value="files" className="py-4">No files have changed yet.</TabsContent>
      <TabsContent value="history" className="py-4">No commits yet.</TabsContent>
    </Tabs>
  ),
} satisfies Meta<typeof TabsList>

export default meta
export const Default: StoryObj<typeof meta> = {}
export const Line: StoryObj<typeof meta> = { args: { variant: "line" } }
