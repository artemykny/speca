# Branches

A branch in Speca is a Git branch. It is active when it has an isolated worktree: a separate working directory in the workspace's repository.

Active branches persist across Speca restarts. Tabs and work sessions follow the [branch context](branch-context.md).

## Create a branch

Creating a branch uses the Git branch name entered by the user and creates its worktree. A name conflict requires a different name before creation.

## Activate an existing Git branch

An inactive Git branch can be inspected temporarily without creating a worktree or changing the current working branch. Inspection provides access to its history and ends when another branch is selected.

Making a branch active requires an explicit user action that creates its isolated worktree and opens its context.

When a Git branch already has a Speca worktree, opening it returns to that context instead of creating another worktree.

Activation completes when the worktree is ready. Failed worktree preparation can be retried.

## Merge a branch

Merging applies the source Git branch's committed changes to the target, then removes the source worktree. The source is no longer active; its Git branch remains available to inspect or explicitly activate again.

If merging fails, keep the source worktree. If worktree removal fails after a successful merge, keep the branch active and allow retrying removal without repeating the merge.

## Close or delete a branch

Closing a branch removes its worktree and makes it inactive. Its Git branch remains available for later activation.

Closing or deleting the current branch switches to another active branch if one exists. Otherwise, the workspace remains open with no active branch. Git branches can still be inspected, created, or explicitly activated.

Uncommitted work is kept by default. Removing a worktree with uncommitted changes requires explicit confirmation to discard those changes.
