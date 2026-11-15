import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId } from "react"
import { PlusIcon } from "@phosphor-icons/react"
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
} from "../index"

function Overview() {
  const id = useId()
  return (
    <main className="mx-auto grid max-w-5xl gap-6 p-6 md:p-10">
      <header className="space-y-2">
        <h1 className="text-2xl font-medium">Components</h1>
        <p className="text-sm text-muted-foreground">shadcn/ui components with the configured preset.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Buttons</CardTitle>
          <CardDescription>Variants, sizes, and disabled state.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button><PlusIcon data-icon="inline-start" />Create</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
          <Separator />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Fields</CardTitle>
            <CardDescription>Inputs and selection controls.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-2">
              <Label htmlFor={`${id}-name`}>Name</Label>
              <Input id={`${id}-name`} placeholder="Project name" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${id}-description`}>Description</Label>
              <Textarea id={`${id}-description`} placeholder="Describe your project" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`${id}-status`}>Status</Label>
              <Select defaultValue="draft" items={[
                { label: "Draft", value: "draft" },
                { label: "In review", value: "review" },
                { label: "Completed", value: "completed" },
              ]}>
                <SelectTrigger id={`${id}-status`} className="w-full"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="review">In review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id={`${id}-updates`} defaultChecked />
              <Label htmlFor={`${id}-updates`}>Receive updates</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch id={`${id}-notifications`} defaultChecked />
              <Label htmlFor={`${id}-notifications`}>Notifications</Label>
            </div>
          </CardContent>
        </Card>
        <div className="grid content-start gap-6">
          <Card>
            <CardHeader><CardTitle>Tabs</CardTitle></CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList aria-label="Project details">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="pt-3 text-sm text-muted-foreground">Project overview.</TabsContent>
                <TabsContent value="activity" className="pt-3 text-sm text-muted-foreground">Recent activity.</TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Badges</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

const meta = {
  title: "Foundations/Overview",
  component: Overview,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Overview>
export default meta
export const Default: StoryObj<typeof meta> = {}
