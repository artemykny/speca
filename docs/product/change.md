# Change

A change is a group of file changes within one [branch worktree](branch.md).

## Workflow

1. Plan.
2. Repeat implementation and check.
3. Review.

If the agent finds a problem during implementation, it stops and returns to the previous step with feedback. The affected [entities](entity-structure.md) are updated at that step before implementation resumes.

## Plan

The plan describes the complete level-one change, which is propagated later. It is a Markdown file containing:

- A summary of the change.
- The affected files and proposed changes to their contents.

The agent asks questions when something is unclear or there are multiple ways to proceed. The user can choose a suggested answer or provide their own.

The user can comment on specific passages in the plan or affected files. Comments retain the quoted text. The agent uses answers, comments, and chat messages to revise the plan.
