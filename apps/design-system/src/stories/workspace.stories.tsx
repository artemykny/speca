import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { CheckIcon, CaretRightIcon, GitDiffIcon, FilesIcon, GitBranchIcon, MagnifyingGlassIcon } from "@phosphor-icons/react"
import {
  Badge, Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Checkbox, Dialog, DialogClose, DialogContent,
  DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
  Input, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "../index"

const files = [
  {
    name: "navigation.tsx",
    path: "src/workspace/navigation.tsx",
    origin: "Plan",
    added: 24,
    removed: 8,
  },
  {
    name: "branch-switcher.tsx",
    path: "src/workspace/branch-switcher.tsx",
    origin: "Refresh",
    added: 18,
    removed: 5,
  },
  {
    name: "navigation.test.tsx",
    path: "src/workspace/navigation.test.tsx",
    origin: "Refresh",
    added: 32,
    removed: 2,
  },
  {
    name: "navigation.md",
    path: "docs/workspace/navigation.md",
    origin: "Plan",
    added: 12,
    removed: 4,
  },
]
const filters = [
  { label: "All files", value: "all" },
  { label: "From plan", value: "Plan" },
  { label: "From refresh", value: "Refresh" },
]
const diffs = [
  [
    "export function Navigation() {",
    "  const workspace = useWorkspace()",
    "- const branch = workspace.defaultBranch",
    "+ const branch = workspace.activeBranch",
    "",
    "  return (",
    "    <Sidebar>",
    "+     <BranchSwitcher branch={branch} />",
    "      <EntityTree root={workspace.root} />",
    "    </Sidebar>",
    "  )",
    "}",
  ],
  [
    "export function BranchSwitcher({ branch }) {",
    "  return (",
    "-   <span>{branch.name}</span>",
    '+   <Button variant="ghost" aria-label="Switch branch">',
    "+     <GitBranchIcon />",
    "+     {branch.name}",
    "+   </Button>",
    "  )",
    "}",
  ],
  [
    'describe("workspace navigation", () => {',
    '+ it("keeps the active branch visible", () => {',
    '+   render(<Workspace branch="feature/navigation" />)',
    '+   expect(screen.getByRole("button", {',
    '+     name: "Switch branch",',
    "+   })).toBeVisible()",
    "+ })",
    "})",
  ],
  [
    "# Workspace navigation",
    "",
    "- The default branch appears in the sidebar.",
    "+ The active branch appears above the entity tree.",
    "+ Choose the branch control to switch branches.",
    "",
    "Entities remain grouped by directory.",
  ],
]

function WorkspaceReview() {
  const id = useId()
  const [selected, setSelected] = useState<number | null>(0)
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<string | null>("all")
  const [reviewed, setReviewed] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [panel, setPanel] = useState("changes")
  const [view, setView] = useState("files")
  const visibleFiles = files.filter((file) =>
    file.path.toLowerCase().includes(query.toLowerCase()) &&
    (filter === "all" || file.origin === filter)
  )
  const toggleReviewed = (path: string, checked: boolean) =>
    setReviewed((previous) => checked
      ? [...new Set([...previous, path])]
      : previous.filter((item) => item !== path))

  return (
    <div className="grid min-h-dvh grid-cols-[3rem_minmax(0,1fr)] text-sm md:h-dvh md:grid-cols-[3rem_13rem_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)_auto] md:overflow-hidden xl:grid-cols-[3rem_13rem_minmax(0,1fr)_15rem] xl:grid-rows-[minmax(0,1fr)]">
      <nav className="row-span-3 flex flex-col items-center gap-3 border-r p-2 md:row-span-2 xl:row-span-1" aria-label="Activity bar">
        {[
          { value: "explorer", label: "Explorer", Icon: FilesIcon },
          { value: "changes", label: "Changes", Icon: GitDiffIcon },
          { value: "version-control", label: "Version control", Icon: GitBranchIcon },
        ].map(({ value, label, Icon }) => (
          <Button key={value} size="icon" variant={panel === value ? "default" : "outline"}
            aria-label={label} title={label} aria-pressed={panel === value}
            aria-controls={`${id}-navigation`} onClick={() => setPanel(value)}>
            <Icon />
          </Button>
        ))}
      </nav>
      <aside id={`${id}-navigation`} className="min-w-0 space-y-4 border-b bg-sidebar p-4 md:row-span-2 md:overflow-y-auto md:border-r md:border-b-0 xl:row-span-1" aria-label="Navigation">
        <h2 className="text-lg font-medium">{panel === "changes" ? "Changes" : panel === "explorer" ? "Explorer" : "Version control"}</h2>
        <p className="mt-2 flex items-start gap-2 text-xs"><GitBranchIcon className="size-3.5 shrink-0" /><span className="break-all">feature/navigation</span></p>
        {panel === "changes" && (
          <div className="mt-6">
            <Button variant="secondary" className="h-auto w-full justify-start whitespace-normal text-left" aria-current="page" onClick={() => setView("files")}>
              <GitDiffIcon className="size-4 shrink-0" />
              <span>Improve workspace navigation</span>
            </Button>
            <p className="mt-3 px-2 text-xs">{completed ? "Approved" : "Final review"}</p>
          </div>
        )}
        {panel === "explorer" && (
          <nav className="mt-6" aria-label="Workspace files">
            {files.map((file, index) => (
              <Button key={file.path} variant={view === "files" && selected === index ? "secondary" : "ghost"} className="h-auto w-full justify-start whitespace-normal text-left"
                aria-current={view === "files" && selected === index ? "page" : undefined}
                onClick={() => { setSelected(index); setView("files"); setQuery(""); setFilter("all") }}>
                <FilesIcon className="size-3.5 shrink-0" /><span className="break-all">{file.name}</span>
              </Button>
            ))}
          </nav>
        )}
        {panel === "version-control" && (
          <section className="mt-6 space-y-3 text-xs">
            <h3 className="font-medium">Working tree</h3>
            <p>{files.length} changed files</p>
            <p><span className="text-primary">+86</span><span className="ml-3 text-destructive">−19</span></p>
            <Button variant="outline" size="sm" onClick={() => setView("files")}>View changes</Button>
          </section>
        )}
      </aside>
      <main className="col-start-2 min-w-0 p-4 md:col-start-3 md:min-h-0 md:overflow-y-auto md:p-6">
        <Tabs value={view} onValueChange={(value) => setView(String(value))} className="min-w-0 gap-6">
          <TabsList aria-label="Review view" className="max-w-full">
            <TabsTrigger value="files">Final review</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="files" className="min-w-0 space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-3 text-lg font-medium">
              <h1>Changed files</h1>
              <span className="text-xs">{files.length} files</span>
            </header>
            <Card size="sm" role="status">
              <CardContent className="flex flex-wrap items-center justify-between gap-3">
              <span className="flex items-center gap-2"><CheckIcon className="size-4" />{completed ? "Change approved" : "Ready for final review"}</span>
              <span className="text-xs text-muted-foreground">{reviewed.length} of {files.length} reviewed</span>
              </CardContent>
            </Card>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-0 flex-1">
                <MagnifyingGlassIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                <Input aria-label="Filter files" placeholder="Filter files…" className="pl-9 text-xs"
                  value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
              <Select items={filters} value={filter} onValueChange={setFilter}>
                <SelectTrigger aria-label="Change origin" className="text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{filters.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <section aria-label="Changed files" className="space-y-4">
              {visibleFiles.map((file) => {
                const index = files.indexOf(file)
                const expanded = selected === index
                return (
                  <Card key={file.path} size="sm">
                    <CardHeader className="flex flex-wrap items-center justify-between gap-4">
                      <Button variant="ghost" className="h-auto min-w-0 justify-start whitespace-normal text-left" aria-label={file.name}
                        aria-expanded={expanded} aria-controls={`${id}-diff-${index}`}
                        onClick={() => setSelected(expanded ? null : index)}>
                        <CaretRightIcon aria-hidden="true" className={`size-4 shrink-0 ${expanded ? "rotate-90" : ""}`} />
                        <span className="min-w-0"><span className="block break-all font-medium">{file.path}</span>
                          <span className="mt-1 block text-xs">{file.origin === "Plan" ? "Applied from plan" : "Approved refresh"}</span>
                        </span>
                      </Button>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${id}-reviewed-${index}`} checked={reviewed.includes(file.path)} disabled={completed}
                          aria-label={`Mark ${file.name} reviewed`} onCheckedChange={(checked) => toggleReviewed(file.path, checked)} />
                        <Label htmlFor={`${id}-reviewed-${index}`} className="text-xs">Reviewed</Label>
                      </div>
                    </CardHeader>
                    <CardContent id={`${id}-diff-${index}`} hidden={!expanded} aria-label={`Diff for ${file.name}`} className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
                        <span>Working tree / Combined diff</span>
                        <span><span className="text-primary">+{file.added}</span><span className="ml-3 text-destructive">−{file.removed}</span></span>
                      </div>
                      <div className="max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label={`Illustrative diff for ${file.name}`}>
                        <pre className="min-w-max text-xs leading-6">{diffs[index].map((line, lineIndex) => (
                          <div key={lineIndex} className={line.startsWith("+") ? "bg-primary/10 text-primary" : line.startsWith("-") ? "text-destructive" : "text-foreground"}>
                            <span aria-hidden="true" className="mr-3 inline-block w-10 border-r pr-3 text-right text-muted-foreground select-none">{lineIndex + 1}</span>
                            <code>{line || " "}</code>
                          </div>
                        ))}</pre>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
              {visibleFiles.length === 0 && (
                <div className="py-8">
                  <p className="font-medium">No matching files</p>
                  <p className="mt-1 text-xs">Try a different name or origin.</p>
                  <Button variant="outline" size="sm" className="mt-3" onClick={() => { setQuery(""); setFilter("all") }}>Clear filters</Button>
                </div>
              )}
            </section>
            <footer className="flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs">{completed ? "Approval recorded locally." : "Plan and approved refreshes included."}</p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger render={<Button disabled={completed} />}><CheckIcon />{completed ? "Change completed" : "Approve change"}</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Complete this change?</DialogTitle>
                    <DialogDescription>{reviewed.length} of {files.length} files marked reviewed. This preview records approval locally.</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogClose render={<Button variant="outline" />}>Keep reviewing</DialogClose>
                    <Button onClick={() => { setCompleted(true); setDialogOpen(false) }}>Approve change</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </footer>
          </TabsContent>
          <TabsContent value="summary" className="min-w-0 space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-3 text-lg font-medium"><h1>Keep branch context visible</h1></header>
            <p className="max-w-xl leading-6">The active branch now appears above the entity tree. The branch switcher, navigation tests, and workspace documentation were updated together.</p>
            <div className="my-6 flex flex-wrap gap-3"><Badge variant="default">Planning complete</Badge><Badge variant="default">Propagation complete</Badge></div>
            <p className="text-xs">Example content for evaluating the design system.</p>
          </TabsContent>
        </Tabs>
      </main>
      <aside className="col-start-2 space-y-4 border-t bg-sidebar p-4 md:col-start-3 md:max-h-64 md:overflow-y-auto xl:col-start-4 xl:row-start-1 xl:max-h-none xl:border-t-0 xl:border-l" aria-label="Context">
        <h2 className="font-medium">Change history</h2>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>Workspace navigation</CardDescription>
          </CardHeader>
          <CardContent><Badge>Approved</Badge></CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Propagation</CardTitle>
            <CardDescription>Branch switcher and tests</CardDescription>
          </CardHeader>
          <CardContent><Badge>Refreshes approved</Badge></CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardTitle>Final review</CardTitle>
            <CardDescription>{reviewed.length} of {files.length} files reviewed</CardDescription>
          </CardHeader>
          <CardContent><Badge variant={completed ? "default" : "outline"}>{completed ? "Approved" : "Needs review"}</Badge></CardContent>
        </Card>
      </aside>
    </div>
  )
}

const meta = {
  title: "Patterns/Change review",
  component: WorkspaceReview,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof WorkspaceReview>
export default meta
export const Default: StoryObj<typeof meta> = {}
