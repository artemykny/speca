# Entity refresh specification

## Requirements

### Requirement: Refresh context

Speca SHALL provide the refresh agent with the entity type, type-specific and generic instructions, parent, brief, dependencies, whole current content, and children with their briefs and dependencies.

#### Scenario: Refresh a design entity

- **WHEN** refresh starts for a design entity with child screens
- **THEN** the agent receives the design's full context and the child screens' briefs and dependencies

### Requirement: Direct refresh edits

The refresh agent SHALL edit entities directly and validate its changes, including content edits, child creation or deletion, and edits to children's briefs or dependencies as needed.

#### Scenario: Revise content and child scope

- **GIVEN** updated requirements affect a design and one of its child screens
- **WHEN** the agent refreshes the design
- **THEN** it can edit the design's content and the child's brief directly and validate the changes

### Requirement: Refresh results

The agent SHALL end each refresh iteration with `success(summary)` or `error(details)`.

#### Scenario: Report successful validation

- **WHEN** the agent completes its changes and validation
- **THEN** `success(summary)` reports completed changes, validation results, and any differences between the intended and produced result

#### Scenario: Report contradictions

- **WHEN** contradictory requirements prevent completion
- **THEN** `error(details)` identifies the contradictions and involved entities, changes already made, and incomplete validation

#### Scenario: Request missing information

- **WHEN** critical missing information prevents completion
- **THEN** `error(details)` includes questions needed to resolve it, changes already made, and incomplete validation

#### Scenario: Report a validation failure

- **WHEN** the agent cannot check correctness because tests cannot run
- **THEN** `error(details)` describes the failure, changes already made, and incomplete validation

### Requirement: Refresh approval

Speca SHALL require user approval to finish a successful refresh at every autonomy setting, recording the dependency versions used by that refresh on approval.

#### Scenario: Review an independent agent's result

- **GIVEN** an entity uses **Act independently** and its refresh returned success
- **WHEN** the result is presented
- **THEN** the user can request another iteration or approve it, and refresh remains unfinished until approval

#### Scenario: Approve after a dependency changes

- **GIVEN** refresh used dependency version `v2`, but that dependency changed to `v3` during review
- **WHEN** the user approves the result
- **THEN** approval is allowed and records `v2`, leaving the entity outdated
