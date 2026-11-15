# Git operations specification

## Requirements

### Requirement: Repository operations

Speca SHALL expose Git history, staging, commits, remotes, fetch, pull, push, rebase, stashes, and tags through the app.

#### Scenario: Review and commit local work

- **GIVEN** a workspace has local file changes
- **WHEN** the user works with Git in the app
- **THEN** the user can inspect history, stage changes, and commit them

#### Scenario: Manage repository synchronization and references

- **WHEN** the user opens repository operations
- **THEN** the user can manage remotes, fetch, pull, push, rebase, and manage stashes and tags

### Requirement: External repository changes

Speca SHALL reconcile branch availability, worktree state, and history with external Git changes on startup, on regaining focus, and while running.

#### Scenario: Discover an external commit

- **GIVEN** another tool commits to the workspace repository
- **WHEN** Speca detects the change while running or reconciles on startup or focus
- **THEN** its displayed history reflects the repository

#### Scenario: Discover an externally removed worktree

- **GIVEN** another tool removes an active branch's worktree
- **WHEN** Speca reconciles the repository
- **THEN** the branch is removed from the active branches
