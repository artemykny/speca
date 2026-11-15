import type { Meta, StoryObj } from "@storybook/react-vite"
import { useId, useState, type CSSProperties } from "react"
import {
  CheckIcon,
  CheckCircleIcon,
  CircleIcon,
  FileCodeIcon,
  FilesIcon,
  FolderIcon,
  GitBranchIcon,
  GitDiffIcon,
  MagnifyingGlassIcon,
  StackIcon,
  XIcon,
} from "@phosphor-icons/react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Badge,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Button,
  Checkbox,
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
  Label,
  Progress,
  ProgressLabel,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
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

const activities = [
  { value: "explorer", label: "Explorer", Icon: FilesIcon },
  { value: "changes", label: "Changes", Icon: GitDiffIcon },
  { value: "version-control", label: "Version control", Icon: GitBranchIcon },
]
const totals = files.reduce(
  (sum, file) => ({
    added: sum.added + file.added,
    removed: sum.removed + file.removed,
  }),
  { added: 0, removed: 0 }
)

function DiffStats({ added, removed }: { added: number; removed: number }) {
  return (
    <span
      className="inline-flex shrink-0 gap-2 text-xs tabular-nums"
      aria-label={`${added} additions, ${removed} deletions`}
    >
      <span className="text-primary">+{added}</span>
      <span className="text-destructive">−{removed}</span>
    </span>
  )
}

function ReviewNavigation({
  panel,
  setPanel,
  expanded,
  reviewed,
  completed,
  onFile,
  onView,
}: {
  panel: string
  setPanel: (panel: string) => void
  expanded: string[]
  reviewed: string[]
  completed: boolean
  onFile: (path: string) => void
  onView: (view: string) => void
}) {
  const id = useId()
  const { setOpenMobile } = useSidebar()
  const navigate = (view: string) => {
    onView(view)
    setOpenMobile(false)
  }

  return (
    <Sidebar aria-label="Workspace navigation">
      <div className="flex h-full min-h-0">
        <nav
          aria-label="Activity bar"
          className="flex w-14 shrink-0 flex-col items-center border-r py-3"
        >
          <span
            className="mb-5 grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground"
            aria-label="Speca"
          >
            <StackIcon className="size-5" />
          </span>
          <ToggleGroup
            orientation="vertical"
            aria-label="Workspace panels"
            value={[panel]}
            onValueChange={(next) => {
              if (next.length) setPanel(next[0])
            }}
          >
            {activities.map(({ value, label, Icon }) => (
              <Tooltip key={value}>
                <TooltipTrigger
                  render={
                    <ToggleGroupItem
                      value={value}
                      aria-label={label}
                      aria-controls={`${id}-panel`}
                      className="size-9 p-0"
                    />
                  }
                >
                  <Icon className="size-5" />
                </TooltipTrigger>
                <TooltipContent side="right">{label}</TooltipContent>
              </Tooltip>
            ))}
          </ToggleGroup>
        </nav>
        <div id={`${id}-panel`} className="flex min-w-0 flex-1 flex-col">
          <SidebarHeader className="gap-3 p-4">
            <h2 className="font-semibold">
              {activities.find((activity) => activity.value === panel)?.label}
            </h2>
            <span className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground">
              <GitBranchIcon className="size-4 shrink-0" />
              <span className="truncate" title="feature/navigation">
                feature/navigation
              </span>
            </span>
          </SidebarHeader>
          <SidebarSeparator className="mx-0" />
          <SidebarContent>
            {panel === "changes" && (
              <SidebarGroup>
                <SidebarGroupLabel>Current change</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        isActive
                        size="lg"
                        className="h-auto items-start py-3"
                        onClick={() => navigate("files")}
                      >
                        <GitDiffIcon />
                        <span className="whitespace-normal!">
                          Improve workspace navigation
                        </span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            {panel === "version-control" && (
              <SidebarGroup>
                <SidebarGroupLabel>Working tree</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        onClick={() => navigate("files")}
                        className="pr-8"
                      >
                        <GitDiffIcon />
                        <span>Changed files</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>{files.length}</SidebarMenuBadge>
                    </SidebarMenuItem>
                  </SidebarMenu>
                  <div className="px-3 py-2">
                    <DiffStats {...totals} />
                  </div>
                </SidebarGroupContent>
              </SidebarGroup>
            )}
            <SidebarGroup>
              <SidebarGroupLabel>
                {panel === "explorer"
                  ? "Workspace files"
                  : "Files in this change"}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {files.map((file) => (
                    <SidebarMenuItem key={file.path}>
                      <SidebarMenuButton
                        size="sm"
                        isActive={expanded.includes(file.path)}
                        onClick={() => {
                          onFile(file.path)
                          setOpenMobile(false)
                        }}
                        title={file.path}
                        className="pr-8"
                      >
                        <FileCodeIcon />
                        <span>{file.name}</span>
                      </SidebarMenuButton>
                      {reviewed.includes(file.path) && (
                        <SidebarMenuBadge>
                          <CheckIcon
                            aria-label="Reviewed"
                            className="size-3.5 text-primary"
                          />
                        </SidebarMenuBadge>
                      )}
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarSeparator className="mx-0" />
          <SidebarFooter className="gap-3 p-4">
            <Badge
              variant={completed ? "default" : "outline"}
              className="self-start"
            >
              {completed ? "Approved" : "Final review"}
            </Badge>
            <p className="text-xs text-muted-foreground">Speca workspace</p>
          </SidebarFooter>
        </div>
      </div>
    </Sidebar>
  )
}

function ReviewHistory({
  reviewedCount,
  completed,
}: {
  reviewedCount: number
  completed: boolean
}) {
  const headingId = useId()
  return (
    <aside
      aria-label="Change context"
      className="space-y-6 border-t p-5 xl:w-64 xl:shrink-0 xl:border-t-0 xl:border-l"
    >
      <Progress value={reviewedCount} max={files.length} className="gap-2">
        <ProgressLabel className="text-xs">Files reviewed</ProgressLabel>
        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
          {reviewedCount} / {files.length}
        </span>
      </Progress>
      <Separator />
      <section aria-labelledby={headingId}>
        <h2 id={headingId} className="mb-3 text-sm font-medium">
          Change history
        </h2>
        <ItemGroup>
          {[
            {
              title: "Plan approved",
              description: "Workspace navigation",
              done: true,
            },
            {
              title: "Propagation complete",
              description:
                "Branch switcher and tests updated; refreshes approved.",
              done: true,
            },
            {
              title: completed ? "Change approved" : "Final review",
              description: completed
                ? "Approval recorded locally."
                : "Review the combined changes before approving.",
              done: completed,
            },
          ].map(({ title, description, done }) => (
            <Item
              key={title}
              size="xs"
              role="listitem"
              className="items-start px-0"
            >
              <ItemMedia variant="icon">
                {done ? (
                  <CheckCircleIcon className="text-primary" />
                ) : (
                  <CircleIcon className="text-muted-foreground" />
                )}
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{title}</ItemTitle>
                <ItemDescription className="line-clamp-none text-xs leading-5">
                  {description}
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </section>
      <Separator />
      <p className="text-xs leading-5 text-muted-foreground">
        This preview uses local state. Approval does not change a repository.
      </p>
    </aside>
  )
}

function WorkspaceReview() {
  const id = useId()
  const [expanded, setExpanded] = useState<string[]>([files[0].path])
  const [query, setQuery] = useState("")
  const [filter, setFilter] = useState<string | null>("all")
  const [reviewed, setReviewed] = useState<string[]>([])
  const [completed, setCompleted] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [panel, setPanel] = useState("changes")
  const [view, setView] = useState("files")
  const visibleFiles = files.filter(
    (file) =>
      file.path.toLowerCase().includes(query.toLowerCase()) &&
      (filter === "all" || file.origin === filter)
  )
  const clearFilters = () => {
    setQuery("")
    setFilter("all")
  }
  const toggleReviewed = (path: string, checked: boolean) =>
    setReviewed((previous) =>
      checked
        ? [...new Set([...previous, path])]
        : previous.filter((item) => item !== path)
    )
  const openFile = (path: string) => {
    setExpanded([path])
    setView("files")
    clearFilters()
    requestAnimationFrame(() =>
      document
        .getElementById(`${id}-${path}`)
        ?.scrollIntoView({ block: "nearest" })
    )
  }

  return (
    <TooltipProvider>
      <SidebarProvider
        style={{ "--sidebar-width": "19.5rem" } as CSSProperties}
        className="text-sm"
      >
        <ReviewNavigation
          panel={panel}
          setPanel={setPanel}
          expanded={expanded}
          reviewed={reviewed}
          completed={completed}
          onFile={openFile}
          onView={setView}
        />
        <SidebarInset className="min-w-0">
          <header className="flex h-14 shrink-0 items-center gap-3 border-b px-4 md:px-6">
            <Tooltip>
              <TooltipTrigger render={<SidebarTrigger />} />
              <TooltipContent>Toggle navigation</TooltipContent>
            </Tooltip>
            <Separator
              orientation="vertical"
              className="h-4 data-vertical:self-center"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden sm:block">
                  Workspace
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden sm:block" />
                <BreadcrumbItem>Changes</BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Final review</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <Badge variant="outline" className="ml-auto hidden sm:inline-flex">
              Local preview
            </Badge>
          </header>
          <div className="flex min-w-0 flex-1 flex-col xl:flex-row">
            <div className="min-w-0 flex-1">
              <div className="space-y-5 px-4 pt-6 md:px-8 md:pt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={completed ? "default" : "secondary"}>
                    {completed ? "Approved" : "Ready for review"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Plan and approved refreshes
                  </span>
                </div>
                <h1 className="text-2xl font-semibold tracking-tight">
                  Improve workspace navigation
                </h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
                  Keep the active branch visible above the entity tree. Review
                  the combined diff before completing this change.
                </p>
              </div>
              <Tabs
                value={view}
                onValueChange={(value) => setView(String(value))}
                className="mt-6 min-w-0 gap-0"
              >
                <div className="border-b px-4 md:px-8">
                  <TabsList
                    variant="line"
                    aria-label="Review view"
                    className="gap-4"
                  >
                    <TabsTrigger value="files">
                      <GitDiffIcon />
                      Changed files{" "}
                      <Badge variant="secondary">{files.length}</Badge>
                    </TabsTrigger>
                    <TabsTrigger value="summary">Summary</TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent
                  value="files"
                  className="min-w-0 space-y-5 p-4 md:p-8"
                >
                  {completed && (
                    <Alert role="status">
                      <CheckCircleIcon />
                      <AlertTitle>Change approved</AlertTitle>
                      <AlertDescription>
                        Approval recorded locally. Your review markers are
                        preserved.
                      </AlertDescription>
                    </Alert>
                  )}
                  <div className="flex flex-wrap items-center gap-3">
                    <InputGroup className="min-w-40 flex-1">
                      <InputGroupAddon>
                        <MagnifyingGlassIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        aria-label="Filter files"
                        placeholder="Filter files…"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                      />
                      {query && (
                        <InputGroupAddon align="inline-end">
                          <InputGroupButton
                            size="icon-xs"
                            aria-label="Clear file search"
                            onClick={() => setQuery("")}
                          >
                            <XIcon />
                          </InputGroupButton>
                        </InputGroupAddon>
                      )}
                    </InputGroup>
                    <Select
                      items={filters}
                      value={filter}
                      onValueChange={setFilter}
                    >
                      <SelectTrigger aria-label="Change origin">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {filters.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
                    <span role="status">
                      {visibleFiles.length} of {files.length} files
                    </span>
                    <Button
                      size="xs"
                      variant="ghost"
                      disabled={!visibleFiles.length}
                      onClick={() =>
                        setExpanded(
                          visibleFiles.every((file) =>
                            expanded.includes(file.path)
                          )
                            ? []
                            : visibleFiles.map((file) => file.path)
                        )
                      }
                    >
                      {visibleFiles.length > 0 &&
                      visibleFiles.every((file) => expanded.includes(file.path))
                        ? "Collapse all"
                        : "Expand all"}
                    </Button>
                  </div>
                  {visibleFiles.length ? (
                    <Accordion
                      multiple
                      value={expanded}
                      onValueChange={(value) => setExpanded(value as string[])}
                      aria-label="Changed files"
                    >
                      {visibleFiles.map((file) => {
                        const index = files.indexOf(file)
                        return (
                          <AccordionItem
                            key={file.path}
                            value={file.path}
                            id={`${id}-${file.path}`}
                          >
                            <div className="grid grid-cols-1 items-center gap-x-3 pr-4 sm:grid-cols-[minmax(0,1fr)_auto] [&>h3]:min-w-0">
                              <AccordionTrigger
                                className="min-w-0 items-center gap-3 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
                                aria-label={file.name}
                              >
                                <FileCodeIcon className="size-4 shrink-0 text-muted-foreground" />
                                <span className="min-w-0 flex-1 space-y-1">
                                  <span className="block break-all text-xs sm:text-sm">
                                    {file.path}
                                  </span>
                                  <span className="flex flex-wrap items-center gap-2 text-xs font-normal text-muted-foreground">
                                    {file.origin === "Plan"
                                      ? "From plan"
                                      : "Approved refresh"}
                                    <DiffStats
                                      added={file.added}
                                      removed={file.removed}
                                    />
                                  </span>
                                </span>
                              </AccordionTrigger>
                              <div className="ml-auto flex items-center gap-2 pb-3 pl-4 sm:py-3">
                                <Checkbox
                                  id={`${id}-reviewed-${index}`}
                                  checked={reviewed.includes(file.path)}
                                  disabled={completed}
                                  aria-label={`Mark ${file.name} reviewed`}
                                  onCheckedChange={(checked) =>
                                    toggleReviewed(file.path, checked)
                                  }
                                />
                                <Label
                                  htmlFor={`${id}-reviewed-${index}`}
                                  className="text-xs"
                                >
                                  Reviewed
                                </Label>
                              </div>
                            </div>
                            <AccordionContent>
                              <CodeBlock size="sm">
                                <CodeBlockHeader>
                                  <CodeBlockTitle>Combined diff</CodeBlockTitle>
                                  <CodeBlockActions>
                                    <CodeBlockCopyButton
                                      value={diffs[index].join("\n")}
                                      aria-label={`Copy diff for ${file.name}`}
                                    />
                                  </CodeBlockActions>
                                </CodeBlockHeader>
                                <CodeBlockContent
                                  lineNumbers
                                  role="region"
                                  aria-label={`Illustrative diff for ${file.name}`}
                                >
                                  {diffs[index].map((line, lineIndex) => (
                                    <CodeBlockLine
                                      key={lineIndex}
                                      variant={
                                        line.startsWith("+")
                                          ? "added"
                                          : line.startsWith("-")
                                            ? "removed"
                                            : "default"
                                      }
                                    >
                                      {line.startsWith("+") ||
                                      line.startsWith("-")
                                        ? line.slice(1)
                                        : line}
                                    </CodeBlockLine>
                                  ))}
                                </CodeBlockContent>
                              </CodeBlock>
                            </AccordionContent>
                          </AccordionItem>
                        )
                      })}
                    </Accordion>
                  ) : (
                    <Empty className="border">
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <MagnifyingGlassIcon />
                        </EmptyMedia>
                        <EmptyTitle>No matching files</EmptyTitle>
                        <EmptyDescription>
                          Try a different file name or change origin.
                        </EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        <Button variant="outline" onClick={clearFilters}>
                          Clear filters
                        </Button>
                      </EmptyContent>
                    </Empty>
                  )}
                </TabsContent>
                <TabsContent value="summary" className="space-y-6 p-4 md:p-8">
                  <section className="space-y-3">
                    <h2 className="text-lg font-medium">
                      Keep branch context visible
                    </h2>
                    <p className="max-w-xl leading-6 text-muted-foreground">
                      The active branch now appears above the entity tree. The
                      branch switcher, navigation tests, and workspace
                      documentation were updated together.
                    </p>
                  </section>
                  <ItemGroup>
                    {[
                      {
                        title: "Navigation",
                        description:
                          "Show the active branch and provide a branch switcher.",
                      },
                      {
                        title: "Tests",
                        description:
                          "Check that the active branch remains visible.",
                      },
                      {
                        title: "Documentation",
                        description:
                          "Describe branch selection in the workspace.",
                      },
                    ].map(({ title, description }) => (
                      <Item
                        key={title}
                        variant="outline"
                        size="sm"
                        role="listitem"
                      >
                        <ItemMedia variant="icon">
                          <FolderIcon />
                        </ItemMedia>
                        <ItemContent>
                          <ItemTitle>{title}</ItemTitle>
                          <ItemDescription>{description}</ItemDescription>
                        </ItemContent>
                      </Item>
                    ))}
                  </ItemGroup>
                  <Button variant="outline" onClick={() => setView("files")}>
                    <GitDiffIcon />
                    Review changed files
                  </Button>
                </TabsContent>
              </Tabs>
              <footer className="flex flex-wrap items-center justify-between gap-4 border-t px-4 py-4 md:px-8">
                <p role="status" className="text-xs text-muted-foreground">
                  {reviewed.length} of {files.length} files reviewed
                </p>
                <AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <AlertDialogTrigger render={<Button disabled={completed} />}>
                    <CheckIcon />
                    {completed ? "Change approved" : "Approve change"}
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Complete this change?</AlertDialogTitle>
                      <AlertDialogDescription>
                        {reviewed.length} of {files.length} files marked
                        reviewed. This preview records approval locally.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Keep reviewing</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          setCompleted(true)
                          setDialogOpen(false)
                        }}
                      >
                        Approve change
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </footer>
            </div>
            <ReviewHistory
              reviewedCount={reviewed.length}
              completed={completed}
            />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}

const meta = {
  title: "Patterns/Change review",
  component: WorkspaceReview,
  parameters: {
    layout: "fullscreen",
    docs: { story: { inline: false, height: 900 } },
  },
} satisfies Meta<typeof WorkspaceReview>
export default meta
export const Default: StoryObj<typeof meta> = {}
