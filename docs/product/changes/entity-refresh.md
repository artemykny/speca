# Entity refresh

Refresh uses an agent to update an [entity](../entities/structure.md) from its context.

## Context

- Entity type.
- Agent instructions for the entity type.
- Generic agent instructions.
- Parent.
- Brief.
- Dependencies.
- Current content of the whole entity.
- Children, including:
  - Briefs.
  - Dependencies.

## Changes

The agent edits entities directly during refresh:

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

`success(summary)` reports the completed changes, validation results, and any differences between the intended result and what the agent produced. The user can request another iteration or approve the result to finish the refresh. Approval is required at every agent autonomy setting. On approval, the system records the dependency versions used during the refresh.

Changes to dependencies during review do not block approval. If their current versions differ from the recorded versions, the entity remains outdated.

### Error

`error(details)` reports a problem that prevents successful completion:

- **Contradictions** — a list of contradictions and the entities involved.
- **Critical lack of information** — a list of questions needed to resolve the missing information.
- **Generic error** — a description of another failure, such as being unable to check correctness because tests cannot run.

Error details include any changes already made and validation left incomplete.
