import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState } from "react"
import { CheckIcon, ChevronRightIcon, FileDiffIcon, FilesIcon, GitBranchIcon, SearchIcon } from "lucide-react"
import {
  Badge, Button, Checkbox, Dialog, DialogClose, DialogContent,
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
    <div className="workspace-layout">
      <nav className="workspace-activity" aria-label="Activity bar">
        {[
          { value: "explorer", label: "Explorer", Icon: FilesIcon },
          { value: "changes", label: "Changes", Icon: FileDiffIcon },
          { value: "version-control", label: "Version control", Icon: GitBranchIcon },
        ].map(({ value, label, Icon }) => (
          <Button key={value} size="icon" variant={panel === value ? "default" : "utility"}
            aria-label={label} title={label} aria-pressed={panel === value}
            aria-controls={`${id}-navigation`} onClick={() => setPanel(value)}>
            <Icon />
          </Button>
        ))}
      </nav>
      <aside id={`${id}-navigation`} className="workspace-navigation" aria-label="Navigation">
        <h2>{panel === "changes" ? "Changes" : panel === "explorer" ? "Explorer" : "Version control"}</h2>
        <p className="mt-2 flex items-start gap-2 text-xs"><GitBranchIcon className="size-3.5 shrink-0" /><span className="break-all">feature/navigation</span></p>
        {panel === "changes" && (
          <div className="mt-6">
            <button className="workspace-nav-item" aria-current="page" onClick={() => setView("files")}>
              <FileDiffIcon className="size-4 shrink-0" />
              <span>Improve workspace navigation</span>
            </button>
            <p className="mt-3 px-2 text-xs">{completed ? "Approved" : "Final review"}</p>
          </div>
        )}
        {panel === "explorer" && (
          <nav className="mt-6" aria-label="Workspace files">
            {files.map((file, index) => (
              <button key={file.path} className="workspace-nav-item"
                aria-current={view === "files" && selected === index ? "page" : undefined}
                onClick={() => { setSelected(index); setView("files"); setQuery(""); setFilter("all") }}>
                <FilesIcon className="size-3.5 shrink-0" /><span className="break-all">{file.name}</span>
              </button>
            ))}
          </nav>
        )}
        {panel === "version-control" && (
          <section className="mt-6 space-y-3 text-xs">
            <h3 className="font-medium">Working tree</h3>
            <p>{files.length} changed files</p>
            <p><span className="text-success">+86</span><span className="ml-3 text-destructive">−19</span></p>
            <Button variant="outline" size="sm" onClick={() => setView("files")}>View changes</Button>
          </section>
        )}
      </aside>
      <main className="workspace-main">
        <Tabs value={view} onValueChange={(value) => setView(String(value))} className="workspace-review-tabs">
          <TabsList aria-label="Review view" className="workspace-document-tabs">
            <TabsTrigger value="files">Final review</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>
          <TabsContent value="files" className="workspace-document">
            <header className="workspace-document-heading">
              <h1>Changed files</h1>
              <span className="text-xs">{files.length} files</span>
            </header>
            <div className="instrument-display workspace-status" role="status">
              <span className="flex items-center gap-2"><CheckIcon className="size-4" />{completed ? "Change approved" : "Ready for final review"}</span>
              <span className="text-xs text-[var(--display-muted)]">{reviewed.length} of {files.length} reviewed</span>
            </div>
            <div className="workspace-file-filters">
              <div className="relative min-w-0 flex-1">
                <SearchIcon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2" />
                <Input aria-label="Filter files" placeholder="Filter files…" className="pl-9 text-xs"
                  value={query} onChange={(event) => setQuery(event.target.value)} />
              </div>
              <Select items={filters} value={filter} onValueChange={setFilter}>
                <SelectTrigger aria-label="Change origin" className="text-xs"><SelectValue /></SelectTrigger>
                <SelectContent>{filters.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <section aria-label="Changed files" className="workspace-file-list">
              {visibleFiles.map((file) => {
                const index = files.indexOf(file)
                const expanded = selected === index
                return (
                  <article key={file.path} className="workspace-file">
                    <div className="workspace-file-heading">
                      <button className="workspace-file-toggle" aria-label={file.name}
                        aria-expanded={expanded} aria-controls={`${id}-diff-${index}`}
                        onClick={() => setSelected(expanded ? null : index)}>
                        <ChevronRightIcon aria-hidden="true" className={`size-4 shrink-0 ${expanded ? "rotate-90" : ""}`} />
                        <span className="min-w-0"><span className="block break-all font-medium">{file.path}</span>
                          <span className="mt-1 block text-xs">{file.origin === "Plan" ? "Applied from plan" : "Approved refresh"}</span>
                        </span>
                      </button>
                      <div className="flex items-center gap-2">
                        <Checkbox id={`${id}-reviewed-${index}`} checked={reviewed.includes(file.path)} disabled={completed}
                          aria-label={`Mark ${file.name} reviewed`} onCheckedChange={(checked) => toggleReviewed(file.path, checked)} />
                        <Label htmlFor={`${id}-reviewed-${index}`} className="text-xs">Reviewed</Label>
                      </div>
                    </div>
                    <section id={`${id}-diff-${index}`} hidden={!expanded} aria-label={`Diff for ${file.name}`}>
                      <div className="workspace-diff-heading">
                        <span>Working tree / Combined diff</span>
                        <span><span className="text-success">+{file.added}</span><span className="ml-3 text-destructive">−{file.removed}</span></span>
                      </div>
                      <div className="workspace-diff" tabIndex={0} role="region" aria-label={`Illustrative diff for ${file.name}`}>
                        <pre>{diffs[index].map((line, lineIndex) => (
                          <div key={lineIndex} className={line.startsWith("+") ? "bg-success-muted text-success" : line.startsWith("-") ? "text-destructive" : "text-foreground"}>
                            <span aria-hidden="true" className="workspace-line-number">{lineIndex + 1}</span>
                            <code>{line || " "}</code>
                          </div>
                        ))}</pre>
                      </div>
                    </section>
                  </article>
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
            <footer className="workspace-review-footer">
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
          <TabsContent value="summary" className="workspace-document">
            <header className="workspace-document-heading"><h1>Keep branch context visible</h1></header>
            <p className="max-w-xl leading-6">The active branch now appears above the entity tree. The branch switcher, navigation tests, and workspace documentation were updated together.</p>
            <div className="my-6 flex flex-wrap gap-3"><Badge variant="success">Planning complete</Badge><Badge variant="success">Propagation complete</Badge></div>
            <p className="text-xs">Example content for evaluating the design system.</p>
          </TabsContent>
        </Tabs>
      </main>
      <aside className="workspace-inspector" aria-label="Context">
        <h2>Change history</h2>
        <section className="workspace-history-stage">
          <h3>Plan</h3>
          <p>Workspace navigation</p>
          <Badge variant="success">Approved</Badge>
        </section>
        <section className="workspace-history-stage">
          <h3>Propagation</h3>
          <p>Branch switcher and tests</p>
          <Badge variant="success">Refreshes approved</Badge>
        </section>
        <section className="workspace-history-stage">
          <h3>Final review</h3>
          <p>{reviewed.length} of {files.length} files reviewed</p>
          <Badge variant={completed ? "success" : "warning"}>{completed ? "Approved" : "Needs review"}</Badge>
        </section>
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
