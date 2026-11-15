# Change propagation specification

## Requirements

### Requirement: Propagation eligibility

Speca SHALL triage a file only after its dependency, parent, or brief changes and all its dependencies are fresh.

#### Scenario: Wait for an upstream file

- **GIVEN** design depends on product requirements and code depends on design
- **WHEN** product requirements change and design is outdated
- **THEN** design is eligible for triage once its dependencies are fresh, while code waits for design

#### Scenario: Skip unaffected files

- **GIVEN** a file's dependencies, parent, and brief have not changed
- **WHEN** propagation computes eligible files
- **THEN** that file does not need triage

### Requirement: Independent file triage

The agent SHALL decide independently for each eligible file whether content changes are needed and explain the decision.

#### Scenario: Separate affected files by need

- **GIVEN** two files are eligible for triage
- **WHEN** the agent determines that one needs changes and the other does not
- **THEN** each file receives its own decision and reason

### Requirement: Triage selection approval

Speca SHALL present all triage results with files needing changes selected, waiting for user review if any listed file uses **Ask first**, and otherwise continuing automatically.

#### Scenario: Review mixed autonomy settings

- **GIVEN** a triage list contains both **Ask first** and **Act independently** files
- **WHEN** results are presented
- **THEN** the user can adjust the selection and must approve it before propagation continues

#### Scenario: Continue without selection review

- **GIVEN** every file in the triage list uses **Act independently**
- **WHEN** triage results are ready
- **THEN** propagation continues with the agent's selection

### Requirement: Triage outcomes

Speca SHALL record checked dependency versions for files confirmed as needing no content change and launch entity refresh for selected files.

#### Scenario: Confirm unchanged content

- **GIVEN** triage checked dependency version `v2` and the file is confirmed as needing no content change
- **WHEN** Speca applies the triage decision
- **THEN** the file's content is unchanged and its recorded dependency version becomes `v2`

#### Scenario: Refresh a selected file

- **GIVEN** a file is confirmed as needing changes
- **WHEN** Speca applies the triage decision
- **THEN** the file enters the entity refresh workflow

### Requirement: Propagation progression

Speca SHALL recompute eligible files after resolving each iteration and finish propagation when no affected files remain [outdated](../entities/dependencies.spec.md#requirement-dependency-freshness).

#### Scenario: Continue downstream

- **GIVEN** design has been resolved and code depends on it
- **WHEN** Speca recomputes affected files
- **THEN** code is considered using the updated dependency state

#### Scenario: Finish propagation

- **WHEN** every affected file is fresh after resolving an iteration
- **THEN** propagation finishes

### Requirement: Propagation history and forecast

Speca SHALL expose current and completed propagation iterations and a provisional dependency-ordered plan of future files and what they are waiting for.

#### Scenario: Inspect completed work

- **WHEN** the user opens a completed propagation iteration
- **THEN** its files, triage reasons and decisions, content revisions, verification results, and approvals are inspectable

#### Scenario: Revise future work

- **GIVEN** a future file is waiting for an upstream decision
- **WHEN** triage decisions or approved changes resolve the current iteration
- **THEN** the forecast is recomputed, including whether content changes remain necessary

### Requirement: Propagation problem recovery

Speca SHALL stop propagation when the agent finds a problem and return to the previous step with feedback so affected entities can be updated before propagation resumes.

#### Scenario: Resolve a reported problem

- **GIVEN** propagation encounters contradictory requirements
- **WHEN** the agent reports the problem
- **THEN** propagation stops and the previous step receives feedback
- **AND** the affected entities are updated there before propagation resumes
