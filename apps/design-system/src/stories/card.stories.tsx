import type { Meta, StoryObj } from "@storybook/react-vite"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"

const meta = {
  title: "Components/Card",
  component: Card,
  render: () => (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>Update navigation</CardTitle>
        <CardDescription>Workspace navigation proposal.</CardDescription>
      </CardHeader>
      <CardContent><Badge variant="secondary">Draft</Badge></CardContent>
    </Card>
  ),
} satisfies Meta<typeof Card>

export default meta
export const Default: StoryObj<typeof meta> = {}
