import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import {
  ArrowUpRightIcon,
  FileDiffIcon,
  Columns2Icon,
  XIcon,
  SquareIcon,
  GitBranchIcon,
  PlusIcon,
  SearchIcon,
} from "lucide-react"
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Label,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../index"

function Overview() {
  const id = useId()
  const [activeSection, setActiveSection] = useState("Actions")
  return (
    <div className="component-catalog">
      <aside className="catalog-navigation">
        <p className="text-lg font-medium">Speca</p>
        <p className="mt-1 text-xs text-muted-foreground">Design system</p>
        <nav aria-label="Component sections" className="mt-6">
          {["Actions", "Navigation", "Status", "Fields", "Data"].map((name) => (
            <a
              key={name}
              href={`#${name.toLowerCase()}`}
              aria-current={activeSection === name ? "location" : undefined}
              onClick={() => setActiveSection(name)}
            >{name}</a>
          ))}
        </nav>
      </aside>
      <main className="catalog-content">
        <header className="catalog-heading">
          <h1>Interface components</h1>
          <p>Controls for planning, propagation, and review.</p>
        </header>
          <section
            id="actions"
            aria-labelledby="actions-heading"
            className="catalog-section"
          >
            <div>
              <h2 id="actions-heading" className="text-sm font-medium">
                Actions
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Emphasis & sizing
              </p>
            </div>
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="utility"><FileDiffIcon />View diff</Button>
                <Button variant="utility"><Columns2Icon />Compare</Button>
                <Button variant="secondary"><XIcon />Cancel</Button>
                <Button variant="utility"><SquareIcon />Stop agent</Button>
                <Button variant="outline"><ArrowUpRightIcon />Open example</Button>
                <Button><PlusIcon />Start change</Button>
              </div>
              <details className="catalog-size-examples" open>
                <summary>Button sizes & disabled state</summary>
              <div className="flex flex-wrap items-end gap-5">
                {(["xs", "sm", "default", "lg"] as const).map((size, index) => (
                  <div key={size} className="space-y-2">
                    <Button size={size} variant="outline">
                      Continue
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      {["24", "28", "36", "44"][index]} px
                    </p>
                  </div>
                ))}
                <div className="space-y-2">
                  <Button disabled>Continue</Button>
                  <p className="text-xs text-muted-foreground">Disabled</p>
                </div>
              </div>
              </details>
            </div>
          </section>
          <section
            id="navigation"
            aria-labelledby="navigation-heading"
            className="catalog-section"
          >
            <div>
              <h2 id="navigation-heading" className="text-sm font-medium">
                Navigation
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                View & context
              </p>
            </div>
            <div className="grid gap-4">
              <Tabs defaultValue="files">
                <TabsList aria-label="Example navigation">
                  <TabsTrigger value="files">
                    Changed files{" "}
                    <span className="text-xs text-muted-foreground">4</span>
                  </TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                </TabsList>
                <TabsContent
                  value="files"
                  className="pt-3 text-xs text-muted-foreground"
                >
                  2 files from the plan, 2 from approved refreshes.
                </TabsContent>
                <TabsContent
                  value="history"
                  className="pt-3 text-xs text-muted-foreground"
                >
                  Propagation finished. Final review is available.
                </TabsContent>
                <TabsContent
                  value="summary"
                  className="pt-3 text-xs text-muted-foreground"
                >
                  Keep the active branch visible in workspace navigation.
                </TabsContent>
              </Tabs>
              <Button size="sm" variant="outline" className="w-fit">
                <GitBranchIcon />
                feature/navigation
              </Button>
            </div>
          </section>
          <section
            id="status"
            aria-labelledby="status-heading"
            className="catalog-section"
          >
            <div>
              <h2 id="status-heading" className="text-sm font-medium">
                Status
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Neutral & semantic
              </p>
            </div>
            <div className="flex flex-wrap items-start gap-4">
              <Badge variant="secondary">Draft</Badge>
              <Badge variant="info">In progress</Badge>
              <Badge variant="warning">Needs review</Badge>
              <Badge variant="success">Approved</Badge>
              <Badge variant="destructive">Blocked</Badge>
            </div>
          </section>
          <section
            id="fields"
            aria-labelledby="fields-heading"
            className="catalog-section"
          >
            <div>
              <h2 id="fields-heading" className="text-sm font-medium">
                Fields
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Default & validation
              </p>
            </div>
            <div className="catalog-fields">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-name`}>Change name</Label>
                  <Input
                    id={`${id}-name`}
                    defaultValue="Improve workspace navigation"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${id}-description`}>Instructions</Label>
                  <Textarea
                    id={`${id}-description`}
                    defaultValue="Keep the active branch visible when switching between entities."
                    className="min-h-20"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`${id}-branch`}>Branch name</Label>
                  <Input
                    id={`${id}-branch`}
                    defaultValue="feature/navigation updates"
                    aria-invalid="true"
                    aria-describedby={`${id}-error`}
                  />
                  <p id={`${id}-error`} className="text-xs text-destructive">
                    Use hyphens in place of spaces.
                  </p>
                </div>
                <div className="relative">
                  <SearchIcon
                    aria-hidden="true"
                    className="absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
                  />
                  <Input
                    aria-label="Search component example"
                    placeholder="Find an entity…"
                    className="pl-9"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Checkbox id={`${id}-dependencies`} defaultChecked />
                  <Label htmlFor={`${id}-dependencies`}>
                    Include dependencies
                  </Label>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor={`${id}-notify`}>Notify when ready</Label>
                  <Switch id={`${id}-notify`} defaultChecked />
                </div>
              </div>
            </div>
          </section>
          <section
            id="data"
            aria-labelledby="data-heading"
            className="catalog-section"
          >
            <div>
              <h2 id="data-heading" className="text-sm font-medium">
                Data
              </h2>
              <p className="mt-1 text-xs text-muted-foreground">
                Rows & selection
              </p>
            </div>
            <div className="min-w-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Entity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Workspace navigation</TableCell>
                    <TableCell className="text-muted-foreground">
                      Specification
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">Approved</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow data-state="selected">
                    <TableCell className="font-medium">
                      Branch switcher
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      Component
                    </TableCell>
                    <TableCell>
                      <Badge variant="warning">Needs review</Badge>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Entity tree</TableCell>
                    <TableCell className="text-muted-foreground">
                      Component
                    </TableCell>
                    <TableCell>
                      <Badge variant="info">In progress</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </section>
      </main>
    </div>
  )
}
const meta = {
  title: "Foundations/Overview",
  component: Overview,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof Overview>
export default meta
export const Default: StoryObj<typeof meta> = {}
