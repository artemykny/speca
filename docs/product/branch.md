# Branch

A Speca branch is a working context backed by a Git branch and its own worktree: a separate working directory in the workspace's repository.

## Branch context

A branch's context consists of its open tabs and chats. Each Speca branch has its own context. Switching branches restores the selected branch's context.

## Create a branch

New branches start from `main`.

Creating a branch derives a Git branch name from the title and creates its worktree. For example, “Add billing page” becomes `add-billing-page`. A name conflict requires a different name before creation.

## Open an existing Git branch

Users can open a Git branch without an associated Speca branch. Opening it creates the branch context and worktree. Archived contexts retain their association.

When a Git branch already has a Speca worktree, opening it returns to that context instead of creating another worktree.

## Completed branches

Active branches represent ongoing work. When a Git branch is merged or deleted, its branch context is archived, with chats and change history accessible.

Archiving a context and deleting its Git branch are separate actions. Removing a worktree must preserve uncommitted work or require an explicit decision to discard it.
