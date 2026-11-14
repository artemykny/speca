# Change

A change is a group of file changes within one [branch worktree](branch.md).

## Workflow

1. [Plan](plan.md).
2. [Propagate the change](change-propagation.md).
3. Final review.

If the agent finds a problem during propagation, it stops and returns to the previous step with feedback. The affected [entities](entity-structure.md) are updated at that step before propagation resumes.

## Final review

Final review becomes available when propagation has finished and all refreshes in the change have been approved.

The user reviews the combined diff from before the change began to its final result. Each changed file indicates whether its changes came from the plan or an approved refresh. Files reviewed during propagation without content changes appear in a separate list.

## Persistence and archival

Speca stores every change on disk. Approval of the final review completes the change. Speca then moves its record to a Git-ignored directory and moves its UI entry into the Archived folder under Changes.
