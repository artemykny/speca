# Change lifecycle

A change is a group of file changes within one [branch worktree](../version-control/branches.md).

## Workflow

The user chooses how to start a change:

- **Start planned change** begins with [planning](planning.md).
- **Start change propagation** begins directly with [propagation](propagation.md).

Planning and propagation are stages of the same change. Both paths end with [final review](final-review.md).

If the agent finds a problem during propagation, it stops and returns to the previous step with feedback. The affected [entities](../entities/structure.md) are updated at that step before propagation resumes.

## Work sessions

Changes run only in [active branches](../version-control/branches.md), with at most one ongoing change per branch, including planning, propagation, and final review. Once the change is archived, the branch can start another.

Stopping a change stops its running agents. Closing the app stops all running agents. After reopening the app, the user can continue work in the same agent sessions.

## Persistence and archival

Speca stores every change on disk. When the change completes, Speca moves its record to a Git-ignored directory and moves its UI entry into the Archived folder under Changes.

The user can inspect the whole archived change. Its record is temporary local data.
