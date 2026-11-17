import {
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
} from "react"
import {
  ArrowClockwiseIcon,
  ArrowUpIcon,
  ArrowSquareOutIcon,
  ChatCircleIcon,
  CheckIcon,
  CheckCircleIcon,
  CodeIcon,
  CopyIcon,
  DownloadSimpleIcon,
  FileTextIcon,
  GearIcon,
  GitDiffIcon,
  PaperclipIcon,
  PencilSimpleIcon,
  PlusIcon,
  RobotIcon,
  SidebarIcon,
  SquareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
  XIcon,
  CaretLeftIcon,
  CaretRightIcon,
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
  Attachment as AttachmentCard,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Bubble,
  BubbleContent,
  Button,
  ButtonGroup,
  Checkbox,
  CodeBlock,
  CodeBlockActions,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockHeader,
  CodeBlockLine,
  CodeBlockTitle,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
  Kbd,
  Label,
  Marker,
  MarkerContent,
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageHeader,
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
  Progress,
  ProgressLabel,
  ProgressValue,
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireItem,
  QuestionnaireSubmit,
  QuestionnaireTitle,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Skeleton,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Toaster,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  Trace,
  TraceCollapsible,
  TraceCollapsibleContent,
  TraceCollapsibleTrigger,
  TraceDescription,
  TraceIcon,
  TraceLine,
  TraceTitle,
  createToastManager,
  useHighlightedCode,
  cn,
} from "../../index"
import {
  chatReducer,
  initialChat,
  initialPrompt,
  isBusy,
  isRunning,
  patch,
  plan,
  responseFor,
  sources,
  toolNames,
  type Action,
  type Attachment,
  type ChatState,
  type Run,
  type Scenario,
  type ToolName,
} from "./model"

const statuses = {
  clarification: "Needs your input",
  planning: "Preparing a plan",
  approval: "Awaiting approval",
  tools: "Working",
  streaming: "Writing response",
  complete: "Complete",
  stopped: "Stopped",
  error: "Tool failed",
  declined: "Declined",
}
const suggestions = [
  "Review keyboard navigation",
  "Summarize the proposed change",
  "Check the mobile layout",
]
const models = ["Balanced", "Fast", "Thorough"].map((value) => ({
  value,
  label: value,
}))
const toolsOutput: Record<ToolName, { input: string; output: string }> = {
  "Search workspace": {
    input: '{ "query": "active branch navigation" }',
    output:
      "Found navigation.md, branch-switcher.tsx, and navigation.test.tsx.",
  },
  "Read files": {
    input: '{ "paths": ["navigation.md", "branch-switcher.tsx"] }',
    output:
      "The branch label uses the default branch. The change should use the active branch.",
  },
  "Run checks": {
    input: '{ "checks": ["branch visibility", "keyboard", "mobile"] }',
    output: "3 simulated checks passed. No workspace files were changed.",
  },
}

type Notice = (title: string, type?: "success" | "error" | "info") => void
type Inspector =
  | { kind: "artifact"; run: Run }
  | { kind: "source"; index: number }
  | { kind: "attachment"; file: Attachment }
  | null

function IconButton({
  label,
  children,
  onClick,
  disabled,
  pressed,
}: {
  label: string
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  pressed?: boolean
}) {
  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            type="button"
            variant={pressed ? "secondary" : "ghost"}
            size="icon-sm"
            aria-label={label}
            aria-pressed={pressed}
            disabled={disabled}
            onClick={onClick}
          />
        }
      >
        {children}
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  )
}

function FileChips({
  files,
  onRemove,
  onOpen,
}: {
  files: Attachment[]
  onRemove?: (id: string) => void
  onOpen: (file: Attachment) => void
}) {
  return (
    <AttachmentGroup className="flex-wrap overflow-visible">
      {files.map((file) => (
        <AttachmentCard key={file.id} size="sm">
          <AttachmentMedia>
            <FileTextIcon aria-hidden="true" />
          </AttachmentMedia>
          <AttachmentContent>
            <button
              type="button"
              onClick={() => onOpen(file)}
              className="max-w-40 rounded-sm text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <AttachmentTitle>{file.name}</AttachmentTitle>
              <AttachmentDescription>
                {Math.max(1, Math.round(file.size / 1024))} KB
              </AttachmentDescription>
            </button>
          </AttachmentContent>
          {onRemove && (
            <AttachmentActions>
              <AttachmentAction
                aria-label={`Remove ${file.name}`}
                onClick={() => onRemove(file.id)}
              >
                <XIcon />
              </AttachmentAction>
            </AttachmentActions>
          )}
        </AttachmentCard>
      ))}
    </AttachmentGroup>
  )
}

function CodePreview({ diff = false }: { diff?: boolean }) {
  const lines = useHighlightedCode(patch, "tsx")
  return (
    <CodeBlock size="sm">
      <CodeBlockHeader>
        <CodeBlockTitle>navigation.tsx</CodeBlockTitle>
        <CodeBlockActions>
          <CodeBlockCopyButton value={patch} />
        </CodeBlockActions>
      </CodeBlockHeader>
      <CodeBlockContent lineNumbers>
        {lines.map((line, index) => (
          <CodeBlockLine
            key={index}
            variant={diff && (index === 2 || index === 6) ? "added" : "default"}
          >
            {line}
          </CodeBlockLine>
        ))}
      </CodeBlockContent>
    </CodeBlock>
  )
}

function ToolActivity({ run }: { run: Run }) {
  return (
    <Trace className="rounded-xl bg-muted/65 p-4">
      {run.tools.map((tool, index) => {
        const done = index < run.step
        const failed = run.phase === "error" && index === run.step
        const running = run.phase === "tools" && index === run.step
        return (
          <TraceCollapsible key={tool}>
            <TraceCollapsibleTrigger>
              <TraceLine
                status={
                  failed
                    ? "error"
                    : running
                      ? "running"
                      : !done
                        ? "pending"
                        : undefined
                }
              >
                <TraceIcon>
                  {running ? (
                    <Spinner />
                  ) : done ? (
                    <CheckCircleIcon />
                  ) : (
                    <CodeIcon />
                  )}
                </TraceIcon>
                <TraceTitle>{tool}</TraceTitle>
                <TraceDescription>
                  {failed
                    ? "Failed"
                    : done
                      ? "Done"
                      : running
                        ? "Running"
                        : "Queued"}
                </TraceDescription>
              </TraceLine>
            </TraceCollapsibleTrigger>
            <TraceCollapsibleContent>
              <div className="space-y-3 text-xs">
                <p className="font-medium">Input</p>
                <pre className="overflow-auto rounded-lg bg-muted p-3">
                  {toolsOutput[tool].input}
                </pre>
                <p className="font-medium">Output</p>
                <p>
                  {failed
                    ? "The demo tool timed out. Retry to continue from this step."
                    : done
                      ? toolsOutput[tool].output
                      : "Waiting for this step to run."}
                </p>
              </div>
            </TraceCollapsibleContent>
          </TraceCollapsible>
        )
      })}
      {!run.tools.length && (
        <p className="text-sm text-muted-foreground">
          Tools are disabled for this response.
        </p>
      )}
    </Trace>
  )
}

function RunView({
  run,
  latest,
  blocked,
  dispatch,
  onEdit,
  inspect,
  copy,
  onRestore,
}: {
  run: Run
  latest: boolean
  blocked: boolean
  dispatch: Dispatch<Action>
  onEdit: (run: Run) => void
  inspect: (value: Inspector) => void
  copy: (text: string) => void
  onRestore: (id: number) => void
}) {
  const [openSections, setOpenSections] = useState<string[]>(
    run.phase === "approval" ? ["plan"] : []
  )
  useEffect(() => {
    if (run.phase === "approval") setOpenSections(["plan"])
  }, [run.phase])
  const output =
    run.phase === "complete"
      ? run.versions[run.version]
      : responseFor(run).slice(0, run.textLength)
  const resultVisible = run.phase === "complete"
  return (
    <div className="space-y-7">
      <Message align="end">
        <MessageContent>
          <MessageHeader>You</MessageHeader>
          <Bubble variant="secondary" align="end" className="max-w-[92%]">
            <BubbleContent>{run.prompt}</BubbleContent>
          </Bubble>
          {!!run.attachments.length && (
            <FileChips
              files={run.attachments}
              onOpen={(file) => inspect({ kind: "attachment", file })}
            />
          )}
          <MessageFooter>
            <span>
              {run.mode === "agent" ? "Agent" : "Ask"} · {run.model}
            </span>
            <IconButton
              label="Edit message"
              disabled={blocked}
              onClick={() => onEdit(run)}
            >
              <PencilSimpleIcon />
            </IconButton>
          </MessageFooter>
        </MessageContent>
      </Message>
      <Message>
        <MessageAvatar className="self-start bg-primary/10">
          <Avatar>
            <AvatarFallback className="bg-primary/10 text-primary">
              <RobotIcon />
            </AvatarFallback>
          </Avatar>
        </MessageAvatar>
        <MessageContent className="gap-4">
          <MessageHeader className="gap-2 px-0">
            <span className="font-semibold text-foreground">Speca</span>
            <span>·</span>
            <span>{statuses[run.phase]}</span>
            {isRunning(run.phase) && <Spinner className="size-3" />}
          </MessageHeader>
          {run.phase === "clarification" ? (
            <Questionnaire
              className="rounded-xl bg-muted/65 p-4"
              onSubmit={(event) => {
                event.preventDefault()
                const scope = new FormData(event.currentTarget).get("scope")
                if (scope) dispatch({ type: "answer", scope: String(scope) })
              }}
            >
              <QuestionnaireItem name="scope" required>
                <QuestionnaireTitle>
                  What should this review cover?
                </QuestionnaireTitle>
                <QuestionnaireDescription>
                  I will use this scope to prepare the plan.
                </QuestionnaireDescription>
                <QuestionnaireChoices>
                  <QuestionnaireChoice value="Navigation and branch switching">
                    Navigation and branch switching
                  </QuestionnaireChoice>
                  <QuestionnaireChoice value="Keyboard access and narrow layouts">
                    Keyboard access and narrow layouts
                  </QuestionnaireChoice>
                </QuestionnaireChoices>
              </QuestionnaireItem>
              <QuestionnaireActions>
                <QuestionnaireSubmit>
                  Continue with this scope
                </QuestionnaireSubmit>
              </QuestionnaireActions>
            </Questionnaire>
          ) : (
          <Accordion value={openSections} onValueChange={setOpenSections}>
              <AccordionItem value="plan" className="border-b-0">
                <AccordionTrigger className="py-2 text-sm">
                  Plan ·{" "}
                  {run.phase === "complete" ? "3 of 3 complete" : "3 steps"}
                </AccordionTrigger>
                <AccordionContent>
                  <ol className="grid gap-3">
                    {plan.map((step, index) => (
                      <li
                        key={step}
                        className="flex items-center gap-3 text-sm"
                      >
                        <span
                          className={cn(
                            "flex size-5 shrink-0 items-center justify-center rounded-full border text-xs",
                            resultVisible &&
                              "border-primary/20 bg-primary/10 text-primary"
                          )}
                        >
                          {resultVisible ? <CheckIcon /> : index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
          {run.phase === "planning" && (
            <div className="space-y-3" aria-label="Preparing plan">
              <Skeleton className="h-3 w-4/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          )}
          {run.approval && (
            <div
              className={cn(
                "rounded-xl bg-muted/65 p-4",
                run.approval === "pending" && "border-primary/30 bg-primary/5"
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="text-sm font-medium">
                    {run.approval === "pending"
                      ? "Approve this plan?"
                      : run.approval === "approved"
                        ? "Plan approved"
                        : "Plan declined"}
                  </h3>
                  <p className="mt-1 text-xs/relaxed text-muted-foreground">
                    {run.approval === "declined"
                      ? "The run ended without executing tools."
                      : "Inspect the selected context and prepare a draft. All actions stay inside this demo."}
                  </p>
                </div>
                <Badge variant="outline">{run.approval}</Badge>
              </div>
              {run.approval === "pending" && (
                <div className="mt-4 flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => dispatch({ type: "approve" })}
                  >
                    <CheckIcon />
                    Approve plan
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => dispatch({ type: "decline" })}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          )}
          {["tools", "streaming", "complete", "error", "stopped"].includes(
            run.phase
          ) && <ToolActivity run={run} />}
          {run.phase === "tools" && (
            <Progress
              value={run.tools.length ? (run.step / run.tools.length) * 100 : 0}
            >
              <ProgressLabel>Tool progress</ProgressLabel>
              <ProgressValue />
            </Progress>
          )}
          {run.phase === "error" && (
            <Alert variant="destructive">
              <AlertTitle>Tool run interrupted</AlertTitle>
              <AlertDescription>
                <p>The demo tool timed out. Completed steps are preserved.</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch({ type: "retry" })}
                >
                  <ArrowClockwiseIcon />
                  Retry tool
                </Button>
              </AlertDescription>
            </Alert>
          )}
          {run.phase === "stopped" && (
            <Alert>
              <AlertTitle>Response stopped</AlertTitle>
              <AlertDescription>
                <p>Your partial response is saved.</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => dispatch({ type: "resume" })}
                >
                  Resume response
                </Button>
              </AlertDescription>
            </Alert>
          )}
          {!!output && (
            <div
              className="space-y-3 text-sm/7"
              aria-label="Assistant response"
            >
              {output.split("\n\n").map((paragraph, index) => (
                <p key={index} className="whitespace-pre-wrap break-words">
                  {paragraph}
                </p>
              ))}
            </div>
          )}
          {run.phase === "streaming" && (
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Spinner className="size-3" />
              Writing response…
            </span>
          )}
          {resultVisible && (
            <>
              <div
                className="flex flex-wrap items-center gap-2"
                aria-label="Sources"
              >
                <span className="text-xs text-muted-foreground">Sources</span>
                {sources.map((source, index) => (
                  <HoverCard key={source.name}>
                    <HoverCardTrigger
                      render={
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={() => inspect({ kind: "source", index })}
                        />
                      }
                    >
                      {index + 1}. {source.name}
                    </HoverCardTrigger>
                    <HoverCardContent>
                      <p className="text-sm font-medium">{source.path}</p>
                      <p className="mt-2 text-xs/relaxed text-muted-foreground">
                        {source.text}
                      </p>
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
              <div className="overflow-hidden rounded-xl border">
                <div className="flex items-center gap-3 bg-muted/30 p-4">
                  <GitDiffIcon className="size-5 text-primary" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-medium">Navigation change</h3>
                    <p className="text-xs text-muted-foreground">
                      Proposed artifact · 2 highlighted lines
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => inspect({ kind: "artifact", run })}
                  >
                    Review
                    <ArrowSquareOutIcon />
                  </Button>
                </div>
                <div className="p-3">
                  <CodePreview diff />
                </div>
              </div>
              <MessageFooter className="flex-wrap justify-between gap-2 px-0">
                <div className="flex items-center gap-1">
                  <IconButton
                    label="Copy response"
                    onClick={() => copy(output ?? "")}
                  >
                    <CopyIcon />
                  </IconButton>
                  <IconButton
                    label="Helpful response"
                    pressed={run.feedback === "up"}
                    onClick={() =>
                      dispatch({ type: "feedback", id: run.id, feedback: "up" })
                    }
                  >
                    <ThumbsUpIcon />
                  </IconButton>
                  <IconButton
                    label="Unhelpful response"
                    pressed={run.feedback === "down"}
                    onClick={() =>
                      dispatch({
                        type: "feedback",
                        id: run.id,
                        feedback: "down",
                      })
                    }
                  >
                    <ThumbsDownIcon />
                  </IconButton>
                  <IconButton
                    label="Regenerate response"
                    disabled={!latest}
                    onClick={() => dispatch({ type: "regenerate", id: run.id })}
                  >
                    <ArrowClockwiseIcon />
                  </IconButton>
                </div>
                <div className="flex items-center gap-2">
                  {run.versions.length > 1 && (
                    <ButtonGroup>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label="Previous response version"
                        disabled={run.version === 0}
                        onClick={() =>
                          dispatch({
                            type: "version",
                            id: run.id,
                            version: run.version - 1,
                          })
                        }
                      >
                        <CaretLeftIcon />
                      </Button>
                      <span className="self-center text-xs tabular-nums">
                        {run.version + 1}/{run.versions.length}
                      </span>
                      <Button
                        size="icon-xs"
                        variant="ghost"
                        aria-label="Next response version"
                        disabled={run.version === run.versions.length - 1}
                        onClick={() =>
                          dispatch({
                            type: "version",
                            id: run.id,
                            version: run.version + 1,
                          })
                        }
                      >
                        <CaretRightIcon />
                      </Button>
                    </ButtonGroup>
                  )}
                  <Button
                    size="xs"
                    variant="ghost"
                    disabled={blocked}
                    onClick={() => onRestore(run.id)}
                  >
                    Restore checkpoint
                  </Button>
                </div>
              </MessageFooter>
            </>
          )}
        </MessageContent>
      </Message>
    </div>
  )
}

function download(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const link = document.createElement("a")
  link.href = url
  link.download = name
  link.click()
  window.setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function ArtifactInspector({
  inspect,
  close,
  applied,
  onApply,
}: {
  inspect: Inspector
  close: () => void
  applied: boolean
  onApply: () => void
}) {
  return (
    <Sheet
      open={inspect !== null}
      onOpenChange={(open) => {
        if (!open) close()
      }}
    >
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>
            {inspect?.kind === "artifact"
              ? "Navigation change"
              : inspect?.kind === "source"
                ? sources[inspect.index].name
                : inspect?.file.name}
          </SheetTitle>
          <SheetDescription>
            {inspect?.kind === "artifact"
              ? "Review the proposed artifact and simulated checks."
              : inspect?.kind === "source"
                ? sources[inspect.index].path
                : "Attached file metadata. File contents are not uploaded or read."}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-5 px-6 pb-6">
          {inspect?.kind === "artifact" ? (
            <>
              <Tabs defaultValue="preview">
                <TabsList aria-label="Artifact view">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="diff">Changes</TabsTrigger>
                  <TabsTrigger value="checks">Checks</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="pt-4">
                  <CodePreview />
                </TabsContent>
                <TabsContent value="diff" className="pt-4">
                  <CodePreview diff />
                </TabsContent>
                <TabsContent value="checks" className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Simulated check</TableHead>
                        <TableHead>Result</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        "Active branch visible",
                        "Keyboard focus preserved",
                        "Narrow layout fits",
                      ].map((check) => (
                        <TableRow key={check}>
                          <TableCell>{check}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">
                              {inspect.run.tools.includes("Run checks")
                                ? "Passed"
                                : "Not requested"}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TabsContent>
              </Tabs>
              <div className="flex flex-wrap gap-2">
                <Button disabled={applied} onClick={onApply}>
                  <CheckIcon />
                  {applied ? "Applied locally" : "Apply demo draft"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    download("navigation.tsx", patch, "text/plain")
                  }
                >
                  <DownloadSimpleIcon />
                  Download code
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                This action changes only the example state.
              </p>
            </>
          ) : inspect?.kind === "source" ? (
            <blockquote className="border-l-2 border-primary/40 pl-4 text-sm/7">
              {sources[inspect.index].text}
            </blockquote>
          ) : inspect ? (
            <div className="space-y-2 text-sm">
              <p>Name: {inspect.file.name}</p>
              <p>Size: {inspect.file.size.toLocaleString()} bytes</p>
              <Badge variant="outline">Local attachment</Badge>
            </div>
          ) : null}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function AgenticChat({
  initialScenario = "complete",
  simulateToolError = false,
}: {
  initialScenario?: Scenario
  simulateToolError?: boolean
}) {
  const [toastManager] = useState(() => createToastManager())
  return (
    <TooltipProvider>
      <Toaster toastManager={toastManager}>
        <ChatWorkspace
          key={`${initialScenario}-${simulateToolError}`}
          initialScenario={initialScenario}
          simulateToolError={simulateToolError}
          notice={(title, type = "info") => toastManager.add({ title, type })}
        />
      </Toaster>
    </TooltipProvider>
  )
}

function ChatWorkspace({
  initialScenario,
  simulateToolError,
  notice,
}: {
  initialScenario: Scenario
  simulateToolError: boolean
  notice: Notice
}) {
  const id = useId()
  const [state, dispatch] = useReducer(
    chatReducer,
    initialScenario,
    initialChat
  )
  const [saved, setSaved] = useState<Record<string, ChatState>>({})
  const [conversation, setConversation] = useState("Navigation review")
  const [history, setHistory] = useState([
    "Navigation review",
    "Search experience",
    "Release checklist",
  ])
  const [historyQuery, setHistoryQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const [files, setFiles] = useState<Attachment[]>([])
  const [model, setModel] = useState("Balanced")
  const [mode, setMode] = useState<"agent" | "ask">("agent")
  const [enabledTools, setEnabledTools] = useState<ToolName[]>([...toolNames])
  const [clarify, setClarify] = useState(false)
  const [fail, setFail] = useState(simulateToolError)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [inspect, setInspect] = useState<Inspector>(null)
  const [appliedArtifacts, setAppliedArtifacts] = useState<string[]>([])
  const [editId, setEditId] = useState<number | undefined>()
  const [restoreId, setRestoreId] = useState<number | null>(null)
  const [sessionKey, setSessionKey] = useState(0)
  const fileInput = useRef<HTMLInputElement>(null)
  const composer = useRef<HTMLTextAreaElement>(null)
  const last = state.runs.at(-1)
  const busy = !!last && isBusy(last.phase)
  const running = !!last && isRunning(last.phase)
  const contextTokens = Math.ceil(
    state.runs.reduce(
      (total, run) =>
        total +
        run.prompt.length +
        (run.versions[run.version]?.length ?? run.textLength),
      0
    ) / 4
  )

  useEffect(() => {
    if (!last || !isRunning(last.phase)) return
    const timeout = window.setTimeout(
      () => dispatch({ type: "tick" }),
      last.phase === "streaming"
        ? last.model === "Fast"
          ? 20
          : 45
        : last.model === "Thorough"
          ? 1400
          : 850
    )
    return () => window.clearTimeout(timeout)
  }, [last])

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      notice("Copied to clipboard", "success")
    } catch {
      notice("Clipboard unavailable. Select the text to copy it.", "error")
    }
  }

  function send() {
    if (!draft.trim()) return
    dispatch({
      type: "send",
      editId,
      request: {
        prompt: draft.trim(),
        attachments: files,
        mode,
        model,
        tools: [...enabledTools],
        clarify,
        fail,
      },
    })
    if (busy) notice("Follow-up added to the queue")
    setDraft("")
    setFiles([])
    setEditId(undefined)
  }

  function edit(run: Run) {
    setEditId(run.id)
    setDraft(run.prompt)
    setFiles(run.attachments)
    setMode(run.mode)
    setModel(run.model)
    composer.current?.focus()
  }

  const historyPanel = (
    <div className="flex h-full min-h-0 flex-col gap-5 bg-sidebar p-4">
      <div className="flex items-center gap-2 px-1">
        <span className="flex size-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <RobotIcon />
        </span>
        <span className="font-semibold tracking-tight">Speca</span>
        <Badge variant="outline" className="ml-auto">
          Demo
        </Badge>
      </div>
      <Button
        variant="outline"
        className="justify-start"
        disabled={busy}
        onClick={() => {
          setRestoreId(-1)
          setSidebarOpen(false)
        }}
      >
        <PlusIcon />
        New conversation
      </Button>
      <Input
        aria-label="Search conversations"
        placeholder="Find a conversation…"
        value={historyQuery}
        onChange={(event) => setHistoryQuery(event.target.value)}
      />
      <ScrollArea className="min-h-0 flex-1">
        <nav className="grid gap-1" aria-label="Conversations">
          {history
            .filter((name) =>
              name.toLowerCase().includes(historyQuery.toLowerCase())
            )
            .map((name) => (
              <Button
                key={name}
                variant={conversation === name ? "secondary" : "ghost"}
                className="h-auto justify-start whitespace-normal py-2 text-left"
                disabled={busy && name !== conversation}
                onClick={() => {
                  if (name === conversation) {
                    setSidebarOpen(false)
                    return
                  }
                  setSaved((previous) => ({
                    ...previous,
                    [conversation]: state,
                  }))
                  dispatch({
                    type: "load",
                    state:
                      saved[name] ??
                      initialChat(
                        "complete",
                        name === "Search experience"
                          ? "Review search results and suggest clearer empty states."
                          : "Prepare a release checklist for the workspace."
                      ),
                  })
                  setConversation(name)
                  setDraft("")
                  setFiles([])
                  setEditId(undefined)
                  setSidebarOpen(false)
                  setSessionKey(sessionKey + 1)
                }}
              >
                <ChatCircleIcon className="shrink-0" />
                <span>{name}</span>
              </Button>
            ))}
          {!history.some((name) =>
            name.toLowerCase().includes(historyQuery.toLowerCase())
          ) && (
            <p className="px-2 text-sm text-muted-foreground">
              No matching conversations.
            </p>
          )}
        </nav>
      </ScrollArea>
      <div className="space-y-3 border-t pt-4">
        <p className="text-xs/relaxed text-muted-foreground">
          Interactive example. Responses, sources, and tool results are
          simulated.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => setSettingsOpen(true)}
        >
          <GearIcon />
          Agent settings
        </Button>
      </div>
    </div>
  )

  return (
    <div className="grid h-dvh min-h-[36rem] grid-cols-[minmax(0,1fr)] overflow-hidden bg-background text-foreground lg:grid-cols-[15rem_minmax(0,1fr)]">
      <aside className="hidden min-h-0 bg-sidebar lg:block">{historyPanel}</aside>
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-72 gap-0 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Conversations</SheetTitle>
            <SheetDescription>
              Choose a conversation or start a new one.
            </SheetDescription>
          </SheetHeader>
          {historyPanel}
        </SheetContent>
      </Sheet>
      <main className="flex min-h-0 min-w-0 flex-col">
        <header className="flex min-h-16 shrink-0 items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <Button
              variant="ghost"
              size="icon-sm"
              className="lg:hidden"
              aria-label="Open conversations"
              onClick={() => setSidebarOpen(true)}
            >
              <SidebarIcon />
            </Button>
            <div className="min-w-0">
              <h1 className="truncate text-sm font-medium">{conversation}</h1>
              <p className="text-xs text-muted-foreground">Workspace agent</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Popover>
              <PopoverTrigger render={<Button variant="ghost" size="sm" />}>
                Context{" "}
                <Badge variant="secondary" className="ml-1">
                  {sources.length}
                </Badge>
              </PopoverTrigger>
              <PopoverContent className="space-y-4">
                <PopoverHeader>
                  <PopoverTitle>Conversation context</PopoverTitle>
                </PopoverHeader>
                <Progress value={Math.min((contextTokens / 8000) * 100, 100)}>
                  <ProgressLabel>Estimated tokens</ProgressLabel>
                  <ProgressValue>
                    {() => `${contextTokens.toLocaleString()} / 8,000`}
                  </ProgressValue>
                </Progress>
                <div className="grid gap-2">
                  {sources.map((source, index) => (
                    <Button
                      key={source.name}
                      variant="ghost"
                      size="sm"
                      className="justify-start"
                      onClick={() => setInspect({ kind: "source", index })}
                    >
                      <FileTextIcon />
                      {source.name}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <IconButton
              label="Export conversation"
              onClick={() =>
                download(
                  "conversation.json",
                  JSON.stringify(state.runs, null, 2),
                  "application/json"
                )
              }
            >
              <DownloadSimpleIcon />
            </IconButton>
            <IconButton
              label="Agent settings"
              onClick={() => setSettingsOpen(true)}
            >
              <GearIcon />
            </IconButton>
          </div>
        </header>
        <MessageScrollerProvider key={sessionKey} defaultScrollPosition="start">
          <MessageScroller className="min-h-0 flex-1">
            <MessageScrollerViewport aria-label="Conversation messages">
              <MessageScrollerContent className="mx-auto max-w-3xl gap-9 px-4 py-8 sm:px-8">
                {!state.runs.length ? (
                  <Empty className="my-auto px-0">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <RobotIcon />
                      </EmptyMedia>
                      <EmptyTitle>What would you like to change?</EmptyTitle>
                      <EmptyDescription>
                        Explore the workspace, review an idea, or prepare a
                        draft with an agent.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      {[initialPrompt, ...suggestions].map((text) => (
                        <Button
                          key={text}
                          variant="outline"
                          className="h-auto w-full justify-start whitespace-normal py-3 text-left"
                          onClick={() => {
                            setDraft(text)
                            composer.current?.focus()
                          }}
                        >
                          {text}
                          <ArrowUpIcon className="ml-auto shrink-0" />
                        </Button>
                      ))}
                    </EmptyContent>
                  </Empty>
                ) : (
                  <>
                    <Marker variant="separator">
                      <MarkerContent>Today · Local example</MarkerContent>
                    </Marker>
                    {state.runs.map((run, index) => (
                      <MessageScrollerItem
                        key={run.id}
                        messageId={`run-${run.id}`}
                        scrollAnchor
                      >
                        <RunView
                          run={run}
                          latest={index === state.runs.length - 1}
                          blocked={busy}
                          dispatch={dispatch}
                          onEdit={edit}
                          inspect={setInspect}
                          copy={copy}
                          onRestore={setRestoreId}
                        />
                      </MessageScrollerItem>
                    ))}
                    {last?.phase === "complete" && (
                      <div className="flex flex-wrap gap-2 pb-2">
                        {suggestions.map((text) => (
                          <Button
                            key={text}
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setDraft(text)
                              composer.current?.focus()
                            }}
                          >
                            {text}
                          </Button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </MessageScrollerContent>
            </MessageScrollerViewport>
            <MessageScrollerButton />
            <MessageScrollerButton direction="start" />
          </MessageScroller>
        </MessageScrollerProvider>
        <div className="mx-auto w-full max-w-3xl shrink-0 space-y-3 px-4 pb-4 pt-2 sm:px-8">
          {!!state.queue.length && (
            <div className="rounded-xl border bg-muted/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium">
                  Queued follow-ups ({state.queue.length})
                </p>
                <Button
                  size="xs"
                  variant="ghost"
                  disabled={
                    busy || last?.phase === "stopped" || last?.phase === "error"
                  }
                  onClick={() => dispatch({ type: "send-queued" })}
                >
                  Send next
                </Button>
              </div>
              <ul className="grid gap-1">
                {state.queue.map((request, index) => (
                  <li key={index} className="flex min-w-0 items-center gap-2">
                    <span className="flex-1 truncate text-xs">
                      {request.prompt}
                    </span>
                    <IconButton
                      label={`Remove queued message ${index + 1}`}
                      onClick={() => dispatch({ type: "remove-queued", index })}
                    >
                      <XIcon />
                    </IconButton>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {editId !== undefined && (
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Editing your message. Sending starts a new run.</span>
              <Button
                size="xs"
                variant="ghost"
                onClick={() => {
                  setEditId(undefined)
                  setDraft("")
                  setFiles([])
                }}
              >
                Cancel edit
              </Button>
            </div>
          )}
          {!!files.length && (
            <FileChips
              files={files}
              onRemove={(fileId) =>
                setFiles(files.filter((file) => file.id !== fileId))
              }
              onOpen={(file) => setInspect({ kind: "attachment", file })}
            />
          )}
          <form
            onSubmit={(event) => {
              event.preventDefault()
              send()
            }}
          >
            <Label htmlFor={`${id}-composer`} className="sr-only">
              Message the agent
            </Label>
            <InputGroup className="rounded-3xl border-transparent bg-muted">
              <InputGroupTextarea
                ref={composer}
                id={`${id}-composer`}
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder={
                  busy
                    ? "Add a follow-up to the queue…"
                    : "Ask about this workspace…"
                }
                className="max-h-36 min-h-20 resize-none px-4 py-3"
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    !event.shiftKey &&
                    !event.nativeEvent.isComposing
                  ) {
                    event.preventDefault()
                    send()
                  }
                }}
              />
              <InputGroupAddon
                align="block-end"
                className="flex-wrap justify-between gap-2 px-3 pb-3"
              >
                <div className="flex flex-wrap items-center gap-1">
                  <IconButton
                    label="Attach files"
                    onClick={() => fileInput.current?.click()}
                  >
                    <PaperclipIcon />
                  </IconButton>
                  <Select
                    items={models}
                    value={model}
                    onValueChange={(value) => {
                      if (value) setModel(value)
                    }}
                  >
                    <SelectTrigger
                      aria-label="Demo model"
                      size="sm"
                      className="border-0 bg-transparent text-xs"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <ToggleGroup
                    value={[mode]}
                    onValueChange={(value) => {
                      if (value[0] === "agent" || value[0] === "ask")
                        setMode(value[0])
                    }}
                    size="sm"
                    spacing={0}
                    aria-label="Conversation mode"
                  >
                    <ToggleGroupItem value="agent">Agent</ToggleGroupItem>
                    <ToggleGroupItem value="ask">Ask</ToggleGroupItem>
                  </ToggleGroup>
                </div>
                <div className="flex items-center gap-2">
                  {running && (
                    <InputGroupButton
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => dispatch({ type: "stop" })}
                    >
                      <SquareIcon />
                      Stop
                    </InputGroupButton>
                  )}
                  <InputGroupButton
                    type="submit"
                    size="icon-sm"
                    variant="default"
                    aria-label={
                      busy
                        ? "Queue message"
                        : editId !== undefined
                          ? "Send edited message"
                          : "Send message"
                    }
                    disabled={!draft.trim()}
                  >
                    <ArrowUpIcon />
                  </InputGroupButton>
                </div>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <input
            ref={fileInput}
            type="file"
            multiple
            className="sr-only"
            tabIndex={-1}
            aria-label="Attach local files"
            onChange={(event) => {
              const selected = Array.from(event.target.files ?? []).map(
                (file, index) => ({
                  id: `${Date.now()}-${index}-${file.name}`,
                  name: file.name,
                  size: file.size,
                })
              )
              setFiles((previous) => [...previous, ...selected])
              event.target.value = ""
            }}
          />
          <div className="flex items-center justify-between gap-2 text-[11px] text-muted-foreground">
            <span>Demo only · No connected model or workspace</span>
            <span className="hidden sm:inline">
              <Kbd>Shift</Kbd> + <Kbd>Enter</Kbd> for a new line
            </span>
          </div>
        </div>
      </main>
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agent settings</DialogTitle>
            <DialogDescription>
              Configure the next message in this local example.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <FieldLabel>Available tools</FieldLabel>
              <div className="grid gap-3">
                {toolNames.map((tool) => (
                  <Label key={tool} className="flex items-center gap-3">
                    <Checkbox
                      checked={enabledTools.includes(tool)}
                      onCheckedChange={(checked) =>
                        setEnabledTools((previous) =>
                          checked
                            ? [...previous, tool]
                            : previous.filter((item) => item !== tool)
                        )
                      }
                    />
                    {tool}
                  </Label>
                ))}
              </div>
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor={`${id}-clarify`}>
                Ask a clarification question
              </FieldLabel>
              <Switch
                id={`${id}-clarify`}
                checked={clarify}
                onCheckedChange={setClarify}
              />
            </Field>
            <Field orientation="horizontal">
              <FieldLabel htmlFor={`${id}-failure`}>
                Simulate a tool failure
              </FieldLabel>
              <Switch
                id={`${id}-failure`}
                checked={fail}
                onCheckedChange={setFail}
              />
            </Field>
            <FieldDescription>
              Agent mode asks for plan approval. Ask mode proceeds directly to
              the selected tools. A failed tool succeeds when retried.
            </FieldDescription>
          </FieldGroup>
          <Button onClick={() => setSettingsOpen(false)}>Done</Button>
        </DialogContent>
      </Dialog>
      <ArtifactInspector
        inspect={inspect}
        close={() => setInspect(null)}
        applied={
          inspect?.kind === "artifact" &&
          appliedArtifacts.includes(`${conversation}/${inspect.run.id}`)
        }
        onApply={() => {
          if (inspect?.kind === "artifact")
            setAppliedArtifacts((previous) => [
              ...previous,
              `${conversation}/${inspect.run.id}`,
            ])
          notice("Draft applied in this demo", "success")
        }}
      />
      <AlertDialog
        open={restoreId !== null}
        onOpenChange={(open) => {
          if (!open) setRestoreId(null)
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {restoreId === -1
                ? "Start a new conversation?"
                : "Restore this checkpoint?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {restoreId === -1
                ? "This resets the active demo conversation."
                : "Later messages and queued follow-ups will be removed from this demo."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (restoreId === -1) {
                  setSaved((previous) => ({
                    ...previous,
                    [conversation]: state,
                  }))
                  dispatch({ type: "load", state: initialChat("empty") })
                  setDraft("")
                  setFiles([])
                  setEditId(undefined)
                  setSessionKey(sessionKey + 1)
                  setConversation(`New conversation ${history.length - 2}`)
                  setHistory((previous) => [
                    `New conversation ${history.length - 2}`,
                    ...previous,
                  ])
                } else if (restoreId !== null)
                  dispatch({ type: "restore", id: restoreId })
                setRestoreId(null)
                notice("Conversation updated", "success")
              }}
            >
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
