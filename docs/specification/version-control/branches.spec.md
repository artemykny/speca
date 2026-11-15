# Branches specification

## Requirements

### Requirement: Active branch isolation

A Speca branch SHALL be a Git branch that becomes active only when its isolated worktree is ready.

#### Scenario: Create a branch

- **WHEN** the user creates `feature/onboarding` with an available Git branch name
- **THEN** Speca creates that branch and its separate working directory in the workspace's repository
- **AND** activation completes when worktree preparation succeeds

#### Scenario: Resolve a name conflict

- **GIVEN** `feature/onboarding` already exists
- **WHEN** the user tries to create another branch with that name
- **THEN** creation requires a different name

#### Scenario: Retry worktree preparation

- **WHEN** worktree preparation fails
- **THEN** activation remains incomplete and preparation can be retried

### Requirement: Inactive branch inspection

Speca SHALL allow temporary history inspection of an inactive Git branch without activating it or changing the current working branch.

#### Scenario: Inspect another branch

- **GIVEN** `main` is the current working branch and `feature/onboarding` is inactive
- **WHEN** the user inspects `feature/onboarding`
- **THEN** its history is available without creating a worktree or switching the working branch
- **AND** inspection ends when another branch is selected

### Requirement: Explicit branch activation

Speca SHALL require an explicit activation action to prepare an inactive branch's worktree and open its context.

#### Scenario: Activate an existing branch

- **GIVEN** `feature/onboarding` exists without a Speca worktree
- **WHEN** the user activates it
- **THEN** Speca prepares its isolated worktree and opens its context

#### Scenario: Reuse an active branch

- **GIVEN** `feature/onboarding` already has a Speca worktree
- **WHEN** the user opens that branch
- **THEN** Speca returns to its context without creating another worktree

### Requirement: Persistent branch state

Speca SHALL preserve active branches and saved branch contexts across app restarts.

#### Scenario: Reopen the app

- **GIVEN** `feature/onboarding` is active with saved tabs
- **WHEN** the app restarts and the branch's worktree still exists
- **THEN** the branch remains active and its saved context is available

### Requirement: Branch merge

Speca SHALL merge the source branch's committed changes into the target before removing the source worktree.

#### Scenario: Complete a merge

- **WHEN** `feature/onboarding` is successfully merged into `main` and worktree removal succeeds
- **THEN** its committed changes are in `main` and the source branch is inactive
- **AND** the source Git branch remains available for inspection or explicit activation

#### Scenario: Preserve a failed merge's worktree

- **WHEN** merging `feature/onboarding` into `main` fails
- **THEN** the source worktree is kept

#### Scenario: Retry cleanup after a successful merge

- **GIVEN** the merge succeeded but source worktree removal failed
- **WHEN** the user retries cleanup
- **THEN** Speca retries worktree removal without repeating the merge
- **AND** the source remains active until removal succeeds

### Requirement: Branch closure

Speca SHALL remove a closed branch's worktree while preserving its Git branch and saved context for later activation.

#### Scenario: Close and reactivate a branch

- **GIVEN** `feature/onboarding` has a saved context and no uncommitted changes
- **WHEN** the user closes it
- **THEN** it becomes inactive and its worktree is removed
- **AND** later explicit activation restores its saved context

### Requirement: Current branch removal

Speca SHALL select another active branch when the current branch is closed or deleted, or keep the workspace open without an active branch when none remains.

#### Scenario: Another active branch remains

- **GIVEN** `main` and `feature/onboarding` are active, with onboarding selected
- **WHEN** the user closes or deletes the onboarding branch
- **THEN** Speca switches to `main`

#### Scenario: Remove the last active branch

- **GIVEN** the current branch is the only active branch
- **WHEN** it is closed or deleted
- **THEN** the workspace remains open with no active branch
- **AND** Git branches can still be inspected, created, or explicitly activated

### Requirement: Uncommitted work protection

Speca SHALL preserve uncommitted work by default and require explicit discard confirmation before removing a worktree containing it.

#### Scenario: Decline to discard changes

- **GIVEN** a branch's worktree contains an uncommitted edit
- **WHEN** the user requests worktree removal without confirming discard
- **THEN** the worktree and its uncommitted edit are kept
