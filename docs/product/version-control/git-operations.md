# Git operations

Users work with Git directly in the app: inspect history, stage and commit changes, manage remotes, fetch, pull, push, rebase, and manage stashes and tags. [Branch operations](branches.md) manage branches and their worktrees.

## External changes

Speca detects repository changes made outside the app on startup, when it regains focus, and while running. It updates available branches, worktree state, and history to match the repository.

If an active branch's worktree is removed externally, Speca removes the branch from its active branches.
