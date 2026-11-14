# Change

A change is a group of file changes within one [branch worktree](branch.md).

## Workflow

The user chooses how to start a change:

- **Start planned change** begins with [planning](plan.md).
- **Start change propagation** begins directly with [propagation](change-propagation.md).

Planning and propagation are stages of the same change. Both paths end with final review.

If the agent finds a problem during propagation, it stops and returns to the previous step with feedback. The affected [entities](entity-structure.md) are updated at that step before propagation resumes.

## Work sessions

Changes run only in [active branches](branch.md), with at most one ongoing change per branch, including planning, propagation, and final review. Once the change is archived, the branch can start another.

Stopping a change stops its running agents. Closing the app stops all running agents. After reopening the app, the user can continue work in the same agent sessions.

## Final review

Final review becomes available when propagation has finished and all refreshes in the change have been approved.

The user reviews the combined diff from before the change began to its final result. Each changed file indicates whether its changes came from the plan or an approved refresh. Files reviewed during propagation without content changes appear in a separate list.

## Persistence and archival

Speca stores every change on disk. Approval of the final review completes the change. Speca then moves its record to a Git-ignored directory and moves its UI entry into the Archived folder under Changes.

The user can inspect the whole archived change. Its record is temporary local data.
