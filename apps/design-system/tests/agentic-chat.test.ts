import assert from "node:assert/strict"
import test from "node:test"
import {
  chatReducer,
  initialChat,
  isRunning,
  type ChatState,
  type Request,
} from "../src/stories/agentic-chat/model.ts"

const request: Request = {
  prompt: "Review keyboard navigation",
  attachments: [],
  mode: "agent",
  model: "Fast",
  tools: ["Search workspace", "Read files", "Run checks"],
  clarify: false,
  fail: false,
}
const last = (state: ChatState) => state.runs.at(-1)!
function finish(state: ChatState) {
  let ticks = 0
  while (isRunning(last(state).phase) && ticks++ < 100)
    state = chatReducer(state, { type: "tick" })
  assert.ok(ticks < 100, "run should finish within the tick limit")
  return state
}

test("agent tools wait for approval and a declined run stays terminal", () => {
  let state = chatReducer(initialChat("empty"), { type: "send", request })
  state = chatReducer(state, { type: "tick" })
  assert.equal(last(state).phase, "approval")
  assert.equal(last(chatReducer(state, { type: "tick" })).step, 0)
  const declined = chatReducer(state, { type: "decline" })
  assert.equal(last(finish(declined)).phase, "declined")
  const complete = finish(chatReducer(state, { type: "approve" }))
  assert.equal(last(complete).phase, "complete")
  assert.equal(last(complete).step, 3)
  assert.equal(last(complete).versions.length, 1)
})

test("clarification stores the selected scope before planning", () => {
  let state = chatReducer(initialChat("empty"), {
    type: "send",
    request: { ...request, clarify: true },
  })
  assert.equal(last(state).phase, "clarification")
  state = chatReducer(state, { type: "answer", scope: "Keyboard access" })
  assert.equal(last(state).scope, "Keyboard access")
  assert.equal(last(state).phase, "planning")
})

test("ask mode skips approval and respects disabled tools", () => {
  const state = finish(
    chatReducer(initialChat("empty"), {
      type: "send",
      request: { ...request, mode: "ask", tools: [] },
    })
  )
  assert.equal(last(state).phase, "complete")
  assert.equal(last(state).approval, null)
  assert.equal(last(state).step, 0)
  assert.match(last(state).versions[0], /checks were not requested/)
})

test("stopping freezes partial output and resuming continues it", () => {
  const streaming = initialChat("streaming")
  const stopped = chatReducer(streaming, { type: "stop" })
  assert.equal(last(stopped).phase, "stopped")
  assert.equal(last(chatReducer(stopped, { type: "tick" })).textLength, 80)
  const complete = finish(chatReducer(stopped, { type: "resume" }))
  assert.equal(last(complete).phase, "complete")
})

test("a tool failure retries once without restarting completed steps", () => {
  let state = chatReducer(initialChat("empty"), {
    type: "send",
    request: { ...request, mode: "ask", fail: true },
  })
  state = finish(state)
  assert.equal(last(state).phase, "error")
  state = finish(chatReducer(state, { type: "retry" }))
  assert.equal(last(state).phase, "complete")
  assert.equal(last(state).failureUsed, true)
  assert.equal(last(state).step, 3)
})

test("busy runs queue follow-ups and send-next does not bypass approval", () => {
  const queued = chatReducer(initialChat("approval"), { type: "send", request })
  assert.equal(queued.runs.length, 1)
  assert.equal(queued.queue.length, 1)
  assert.equal(chatReducer(queued, { type: "send-queued" }).runs.length, 1)
  const complete = finish(chatReducer(queued, { type: "approve" }))
  const next = chatReducer(complete, { type: "send-queued" })
  assert.equal(next.runs.length, 2)
  assert.equal(next.queue.length, 0)
  assert.equal(last(next).prompt, request.prompt)
})

test("regeneration retains previous versions and feedback toggles", () => {
  let state = finish(chatReducer(initialChat(), { type: "regenerate", id: 1 }))
  assert.equal(last(state).versions.length, 2)
  assert.equal(last(state).version, 1)
  state = chatReducer(state, { type: "version", id: 1, version: 0 })
  assert.equal(last(state).version, 0)
  assert.equal(
    last(chatReducer(state, { type: "version", id: 1, version: 99 })).version,
    0
  )
  state = chatReducer(state, { type: "feedback", id: 1, feedback: "up" })
  assert.equal(last(state).feedback, "up")
  assert.equal(
    last(chatReducer(state, { type: "feedback", id: 1, feedback: "up" }))
      .feedback,
    null
  )
})

test("editing an earlier prompt replaces its branch and clears its queue", () => {
  const state = finish(
    chatReducer(initialChat(), {
      type: "send",
      request: { ...request, mode: "ask" },
    })
  )
  const edited = chatReducer(state, { type: "send", request, editId: 1 })
  assert.equal(edited.runs.length, 1)
  assert.equal(last(edited).prompt, request.prompt)
  assert.equal(last(edited).id, 3)
  assert.equal(last(edited).phase, "planning")
})

test("restoring a checkpoint removes later messages", () => {
  const state = finish(
    chatReducer(initialChat(), {
      type: "send",
      request: { ...request, mode: "ask" },
    })
  )
  assert.equal(state.runs.length, 2)
  const restored = chatReducer(state, { type: "restore", id: 1 })
  assert.equal(restored.runs.length, 1)
  assert.equal(restored.queue.length, 0)
  assert.equal(restored.nextId, 3)
})

test("loading conversations preserves independent state and ignores blank sends", () => {
  const saved = initialChat("approval")
  const loaded = chatReducer(initialChat("empty"), {
    type: "load",
    state: saved,
  })
  assert.equal(loaded, saved)
  assert.equal(
    chatReducer(loaded, {
      type: "send",
      request: { ...request, prompt: "  " },
    }),
    loaded
  )
})
