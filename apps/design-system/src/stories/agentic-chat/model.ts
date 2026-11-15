export type Phase =
  | "clarification"
  | "planning"
  | "approval"
  | "tools"
  | "streaming"
  | "complete"
  | "stopped"
  | "error"
  | "declined"
export type Scenario =
  "complete" | "approval" | "clarification" | "streaming" | "error" | "empty"
export type ToolName = "Search workspace" | "Read files" | "Run checks"
export type Attachment = { id: string; name: string; size: number }
export type Request = {
  prompt: string
  attachments: Attachment[]
  mode: "agent" | "ask"
  model: string
  tools: ToolName[]
  clarify: boolean
  fail: boolean
}
export type Run = Request & {
  id: number
  phase: Phase
  resumePhase: Phase | null
  scope: string
  step: number
  textLength: number
  approval: "pending" | "approved" | "declined" | null
  versions: string[]
  version: number
  feedback: "up" | "down" | null
  failureUsed: boolean
}
export type ChatState = { runs: Run[]; queue: Request[]; nextId: number }
export type Action =
  | { type: "load"; state: ChatState }
  | { type: "send"; request: Request; editId?: number }
  | { type: "tick" }
  | { type: "answer"; scope: string }
  | { type: "approve" }
  | { type: "decline" }
  | { type: "stop" }
  | { type: "resume" }
  | { type: "retry" }
  | { type: "regenerate"; id: number }
  | { type: "version"; id: number; version: number }
  | { type: "feedback"; id: number; feedback: "up" | "down" }
  | { type: "restore"; id: number }
  | { type: "remove-queued"; index: number }
  | { type: "send-queued" }

export const toolNames: ToolName[] = [
  "Search workspace",
  "Read files",
  "Run checks",
]
export const initialPrompt =
  "Review the workspace navigation and prepare a change that keeps the active branch visible."
export const sources = [
  {
    name: "navigation.md",
    path: "docs/workspace/navigation.md",
    text: "The active branch appears above the entity tree. Choose the branch control to switch branches. Entities remain grouped by directory.",
  },
  {
    name: "branch-switcher.tsx",
    path: "src/workspace/branch-switcher.tsx",
    text: "The branch control displays the active branch name and exposes the accessible label “Switch branch”.",
  },
  {
    name: "navigation.test.tsx",
    path: "src/workspace/navigation.test.tsx",
    text: "The navigation example checks branch visibility, keyboard focus, and narrow layouts.",
  },
]
export const patch =
  "export function Navigation() {\n  const workspace = useWorkspace()\n  const branch = workspace.activeBranch\n\n  return (\n    <Sidebar>\n      <BranchSwitcher branch={branch} />\n      <EntityTree root={workspace.root} />\n    </Sidebar>\n  )\n}"
export const plan = [
  "Inspect navigation and branch context",
  "Prepare the change for review",
  "Check keyboard access and narrow layouts",
]
export const isRunning = (phase: Phase) =>
  ["planning", "tools", "streaming"].includes(phase)
export const isBusy = (phase: Phase) =>
  isRunning(phase) || phase === "approval" || phase === "clarification"

export function responseFor(run: Run) {
  const lead =
    run.mode === "ask"
      ? "Here is a suggested approach for"
      : "I prepared a demo change for"
  const detail = run.versions.length
    ? " This revision makes the branch control’s keyboard behavior explicit."
    : " The active branch stays visible above the entity tree, with a labeled control for switching branches."
  return `${lead} “${run.prompt}”.${detail}\n\nScope: ${run.scope || "Navigation and branch switching"}. ${run.tools.includes("Run checks") ? "The simulated checks cover branch visibility, keyboard focus, and narrow layouts." : "Automated checks were not requested."} Review the proposed code and source excerpts below before applying the draft.`
}

function createRun(request: Request, id: number): Run {
  return {
    ...request,
    id,
    phase: request.clarify ? "clarification" : "planning",
    resumePhase: null,
    scope: "",
    step: 0,
    textLength: 0,
    approval: null,
    versions: [],
    version: 0,
    feedback: null,
    failureUsed: false,
  }
}

export function initialChat(
  scenario: Scenario = "complete",
  prompt = initialPrompt
): ChatState {
  if (scenario === "empty") return { runs: [], queue: [], nextId: 1 }
  const run = createRun(
    {
      prompt,
      attachments: [{ id: "fixture", name: "navigation.md", size: 2048 }],
      mode: "agent",
      model: "Balanced",
      tools: [...toolNames],
      clarify: false,
      fail: false,
    },
    1
  )
  run.phase = scenario
  run.scope = "Navigation and branch switching"
  run.step =
    scenario === "approval" || scenario === "clarification"
      ? 0
      : scenario === "error"
        ? 1
        : 3
  run.approval =
    scenario === "approval"
      ? "pending"
      : scenario === "clarification"
        ? null
        : "approved"
  if (scenario === "complete") {
    const response = responseFor(run)
    run.versions = [response]
    run.textLength = response.length
  }
  if (scenario === "streaming") run.textLength = 80
  if (scenario === "error") run.failureUsed = true
  return { runs: [run], queue: [], nextId: 2 }
}

function updateLast(state: ChatState, update: (run: Run) => Run): ChatState {
  if (!state.runs.length) return state
  return {
    ...state,
    runs: state.runs.map((run, index) =>
      index === state.runs.length - 1 ? update(run) : run
    ),
  }
}

export function chatReducer(state: ChatState, action: Action): ChatState {
  const last = state.runs.at(-1)
  switch (action.type) {
    case "load":
      return action.state
    case "send": {
      if (!action.request.prompt.trim()) return state
      if (action.editId !== undefined) {
        const index = state.runs.findIndex((run) => run.id === action.editId)
        if (index < 0 || (last && isBusy(last.phase))) return state
        return {
          ...state,
          runs: [
            ...state.runs.slice(0, index),
            createRun(action.request, state.nextId),
          ],
          queue: [],
          nextId: state.nextId + 1,
        }
      }
      if (last && isBusy(last.phase))
        return { ...state, queue: [...state.queue, action.request] }
      return {
        ...state,
        runs: [...state.runs, createRun(action.request, state.nextId)],
        nextId: state.nextId + 1,
      }
    }
    case "tick":
      return updateLast(state, (run) => {
        if (run.phase === "planning")
          return {
            ...run,
            phase: run.mode === "agent" ? "approval" : "tools",
            approval: run.mode === "agent" ? "pending" : null,
          }
        if (run.phase === "tools") {
          if (run.fail && !run.failureUsed && run.tools.length > 0)
            return { ...run, phase: "error", failureUsed: true }
          const step = Math.min(run.step + 1, run.tools.length)
          return {
            ...run,
            step,
            phase: step >= run.tools.length ? "streaming" : "tools",
          }
        }
        if (run.phase === "streaming") {
          const response = responseFor(run)
          const textLength = Math.min(run.textLength + 24, response.length)
          if (textLength === response.length)
            return {
              ...run,
              phase: "complete",
              textLength,
              versions: [...run.versions, response],
              version: run.versions.length,
            }
          return { ...run, textLength }
        }
        return run
      })
    case "answer":
      return updateLast(state, (run) =>
        run.phase === "clarification"
          ? { ...run, scope: action.scope, phase: "planning" }
          : run
      )
    case "approve":
      return updateLast(state, (run) =>
        run.phase === "approval"
          ? { ...run, phase: "tools", approval: "approved" }
          : run
      )
    case "decline":
      return updateLast(state, (run) =>
        run.phase === "approval"
          ? { ...run, phase: "declined", approval: "declined" }
          : run
      )
    case "stop":
      return updateLast(state, (run) =>
        isRunning(run.phase)
          ? { ...run, phase: "stopped", resumePhase: run.phase }
          : run
      )
    case "resume":
      return updateLast(state, (run) =>
        run.phase === "stopped"
          ? { ...run, phase: run.resumePhase ?? "planning", resumePhase: null }
          : run
      )
    case "retry":
      return updateLast(state, (run) =>
        run.phase === "error" ? { ...run, phase: "tools" } : run
      )
    case "regenerate":
      if (!last || last.id !== action.id || last.phase !== "complete")
        return state
      return updateLast(state, (run) => ({
        ...run,
        phase: "streaming",
        textLength: 0,
        feedback: null,
      }))
    case "version":
      return {
        ...state,
        runs: state.runs.map((run) =>
          run.id === action.id &&
          action.version >= 0 &&
          action.version < run.versions.length
            ? { ...run, version: action.version }
            : run
        ),
      }
    case "feedback":
      return {
        ...state,
        runs: state.runs.map((run) =>
          run.id === action.id
            ? {
                ...run,
                feedback:
                  run.feedback === action.feedback ? null : action.feedback,
              }
            : run
        ),
      }
    case "restore": {
      const index = state.runs.findIndex((run) => run.id === action.id)
      if (index < 0 || (last && isBusy(last.phase))) return state
      return { ...state, runs: state.runs.slice(0, index + 1), queue: [] }
    }
    case "remove-queued":
      return {
        ...state,
        queue: state.queue.filter((_, index) => index !== action.index),
      }
    case "send-queued": {
      if (
        !state.queue.length ||
        (last &&
          (isBusy(last.phase) ||
            last.phase === "stopped" ||
            last.phase === "error"))
      )
        return state
      const [request, ...queue] = state.queue
      return {
        ...state,
        runs: [...state.runs, createRun(request, state.nextId)],
        queue,
        nextId: state.nextId + 1,
      }
    }
  }
}
