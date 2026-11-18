# Change lifecycle

A change is a group of file changes within one [branch worktree](../version-control/branches.md).

## Workflow

An active branch can have multiple [plans](planning.md) in progress. The user can create and review them while [propagation](propagation.md) runs.

If the agent finds a problem during propagation, it stops and returns to the previous step with feedback. The affected [entities](../entities/structure.md) are updated at that step before propagation resumes.

## Work sessions

Each branch runs one propagation iteration at a time.

Stopping a change stops its running agents. Closing the app stops all running agents. After reopening the app, the user can continue work in the same agent sessions.

## Persistence and archival

Speca stores every change on disk. When a planned change completes, Speca moves its record to a Git-ignored directory.

The user can inspect the whole archived plan. Its record is temporary local data.
