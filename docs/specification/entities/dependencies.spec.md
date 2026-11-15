# Entity dependencies specification

## Requirements

### Requirement: Versioned dependency references

Dependencies SHALL reference entities or individual content fields and record the version ID used.

#### Scenario: Depend on a content field

- **GIVEN** a spec uses a feature's `limitations` field at version `f1`
- **WHEN** the spec's dependencies are inspected
- **THEN** the reference identifies that field and records `f1`

#### Scenario: Depend on an entity

- **GIVEN** a design uses a product entity at version `v1`
- **WHEN** its dependencies are inspected
- **THEN** the reference identifies the product entity and records `v1`

### Requirement: Valid dependency graph

The entity graph SHALL remain acyclic with all references resolving to existing entities or content fields; brief fields are not dependency targets.

#### Scenario: Reject invalid targets

- **WHEN** a dependency references a missing entity, a missing field, or a brief field
- **THEN** the reference is not accepted as a valid dependency

#### Scenario: Reject dependency cycles

- **GIVEN** entity A depends on entity B
- **WHEN** B is made to depend on A, or A is made to depend on itself
- **THEN** the resulting dependency graph is not accepted as valid

### Requirement: Dependency freshness

Speca SHALL treat generated content as outdated when a dependency changes and fresh when refreshed using current dependency versions.

#### Scenario: Detect a changed field

- **GIVEN** a spec records `f1` for the feature's `limitations` field
- **WHEN** that field changes to `f2`
- **THEN** the spec's generated content is outdated

#### Scenario: Resolve outdated content

- **GIVEN** a spec is outdated because it records `f1` instead of current version `f2`
- **WHEN** a refresh uses `f2` and its dependency versions are recorded
- **THEN** the spec is fresh if its other recorded dependencies are also current
