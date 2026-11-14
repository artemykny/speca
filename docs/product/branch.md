# Branch

A Speca branch is an active Git branch with its own worktree: a separate working directory in the workspace's repository.

## Branch context

A branch's context consists of its open tabs. Switching between active branches saves the current branch's context and restores the selected branch's context. Active branches are Git branches the user has created or explicitly made active whose worktrees have not been removed.

Active branches and saved branch contexts persist across Speca restarts.

<!-- TODO: Add branch chats. -->

## Create a branch

Creating a branch uses the Git branch name entered by the user and creates its worktree. A name conflict requires a different name before creation.

## Activate an existing Git branch

An inactive Git branch can be inspected temporarily without creating a worktree or changing the current working branch. Inspection provides access to its history and ends when another branch is selected.

Activation requires an explicit user action. It creates the branch's worktree and opens its context. If a context was saved previously, activation restores it.

When a Git branch already has a Speca worktree, opening it returns to that context instead of creating another worktree.

Activation completes when the worktree is ready. Failed worktree preparation can be retried.

## Merge a branch

Merging applies the source Git branch's committed changes to the target, then removes the source worktree. The source is no longer active; its Git branch remains available to inspect or explicitly activate again.

If merging fails, keep the source worktree. If worktree removal fails after a successful merge, keep the branch active and allow retrying removal without repeating the merge.

## Close or delete a branch

Closing a branch removes its worktree and makes it inactive. Its Git branch and saved context remain available for later activation.

Closing or deleting the current branch switches to another active branch if one exists. Otherwise, the workspace remains open with no active branch. Git branches can still be inspected, created, or explicitly activated.

Uncommitted work is kept by default. Removing a worktree with uncommitted changes requires explicit confirmation to discard those changes.

When a Git branch is deleted, its saved context is deleted.

## External Git changes

Speca detects repository changes made outside the app on startup, when it regains focus, and while running. It updates available branches, worktree state, and history to match the repository.

If an active branch's worktree is removed externally, Speca removes the branch from its active branches.
