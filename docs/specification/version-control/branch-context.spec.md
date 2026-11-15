# Branch context specification

## Requirements

### Requirement: Branch context

Speca SHALL maintain a separate set of open tabs for each branch and save and restore that context when switching active branches.

#### Scenario: Switch between work contexts

- **GIVEN** `main` has a product tab open and `feature/onboarding` has a design tab open
- **WHEN** the user switches from `main` to `feature/onboarding` and back
- **THEN** each branch restores its own tabs

### Requirement: Branch work continuity

Speca SHALL keep running agents and pending reviews associated with their branch when the user switches branches.

#### Scenario: Switch away from ongoing work

- **GIVEN** an agent is running and a review is pending in `feature/onboarding`
- **WHEN** the user switches to `main`
- **THEN** the agent continues in the onboarding worktree and its pending review remains available in that branch

### Requirement: Branch context deletion

Speca SHALL delete a branch's saved context when its Git branch is deleted.

#### Scenario: Delete a Git branch

- **GIVEN** `feature/onboarding` has a saved context
- **WHEN** its Git branch is deleted
- **THEN** that context is deleted
