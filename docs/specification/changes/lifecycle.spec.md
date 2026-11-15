# Change lifecycle specification

## Requirements

### Requirement: Branch-scoped change

A change SHALL group file changes in one [active branch worktree](../version-control/branches.spec.md#requirement-active-branch-isolation), with at most one ongoing change per branch through planning, propagation, and final review.

#### Scenario: Prevent overlapping changes in a branch

- **GIVEN** `feature/onboarding` has a change awaiting final review
- **WHEN** the user tries to start another change in that branch
- **THEN** another change cannot start until the current change is archived

#### Scenario: Require an active branch

- **GIVEN** a Git branch has no active worktree
- **WHEN** the user tries to start a change there
- **THEN** the change cannot start while the branch is inactive

### Requirement: Change entry points

Speca SHALL offer planned changes and direct propagation as entry points to the same change workflow, both ending in final review.

#### Scenario: Start with a plan

- **WHEN** the user selects **Start planned change**
- **THEN** the change begins with planning

#### Scenario: Start with affected files

- **WHEN** the user selects **Start change propagation**
- **THEN** the change begins with propagation

### Requirement: Agent session lifecycle

Speca SHALL stop a change's agents when that change stops, stop all running agents when the app closes, and allow continuation in the same sessions after reopening.

#### Scenario: Stop a change

- **GIVEN** agents are running for an ongoing change
- **WHEN** the user stops that change
- **THEN** its running agents stop

#### Scenario: Close and reopen the app

- **GIVEN** agents are running in active branches
- **WHEN** the app closes and is reopened
- **THEN** those agents stopped at closure and the user can continue work in the same sessions

### Requirement: Change persistence

Speca SHALL store every change on disk.

#### Scenario: Inspect a change after restart

- **GIVEN** a change has recorded planning and propagation work
- **WHEN** the app restarts
- **THEN** the stored change record remains available

### Requirement: Completion and archival

Approval of final review SHALL complete the change, move its record into a Git-ignored directory, and place its UI entry in the **Archived** folder under **Changes**.

#### Scenario: Complete and inspect a change

- **WHEN** the user approves final review
- **THEN** the completed change is archived and the branch can start another change
- **AND** the user can inspect the entire archived record as temporary local data
