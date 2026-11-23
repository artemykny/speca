# Entity refresh

Refresh uses an agent to update an [entity](../entities/structure.md) from its context.

## Context

- Entity type.
- Agent instructions for the entity type.
- Generic agent instructions.
- Parent.
- Brief.
- Comments on the entity.
- Dependencies.
- Current content of the whole entity.
- Children, including:
  - Briefs.
  - Dependencies.

## Changes

The agent checks the current content against its context and makes any necessary edits directly:

- Modify content.
- Modify children:
  - Creation.
  - Brief edits.
  - Deletion.
  - Dependency updates.
- Validate changes.

## Result

The agent ends each iteration with one of two calls.

### Success

The agent calls `success(summary)` only when it verifies that the entity meets all requirements in its brief, dependencies, and user feedback. The summary reports the validation results and explains what changed or why no edit was needed.

### Error

`error(details)` reports a problem that prevents successful completion:

- **Contradictions** — a list of contradictions and the entities involved.
- **Critical lack of information** — a list of questions needed to resolve the missing information.
- **Generic error** — a description of another failure, such as being unable to check correctness because tests cannot run.

Error details include any changes already made and validation left incomplete.

## Refresh flow

During review, the user can give feedback and request another pass on the entity. For a standalone refresh, the user approves the result to finish.

When the refresh is complete, Speca records the dependency versions the agent used. For example, if the agent used version 2 of a dependency and version 3 arrives during review, the user can approve the result based on version 2. The entity stays [outdated](../entities/dependencies.md#freshness) until a refresh checks it against version 3.
