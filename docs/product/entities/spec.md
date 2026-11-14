# Entities specification

## Purpose

Represent workspace content and the relationships that determine whether it is current.

## Requirements

### Requirement: Entity structure

Each entity SHALL have metadata, a brief, content, and children governed by its [entity type](../entity-types/spec.md).

#### Scenario: Represent a feature

- **GIVEN** a feature with an `intent` brief field, a `limitations` content field, and a collection of specs
- **WHEN** its structure is inspected
- **THEN** the brief expresses what its parent expects it to cover
- **AND** content is organized into fields
- **AND** each contained spec is itself an entity

### Requirement: Stable child identity

Speca SHALL preserve a child's identity when it is renamed.

#### Scenario: Rename a spec

- **GIVEN** a feature contains a spec identified as `spec-1` and named `invite`
- **WHEN** the child is renamed to `invite-existing-member`
- **THEN** its identity remains `spec-1`

### Requirement: Revision metadata

Each entity SHALL expose its current revision ID, a history retaining at least all revision IDs, and version IDs for each brief and content field.

#### Scenario: Inspect a revised entity

- **GIVEN** an entity has revisions `v1` and `v2`, with `v2` current
- **WHEN** its metadata and field versions are inspected
- **THEN** its current version is `v2`, its history includes `v1` and `v2`, and each brief and content field has a version ID

### Requirement: Parent-owned brief

Speca SHALL allow an entity and its parent to read its brief, while allowing only the parent to edit it.

#### Scenario: Set a child's intent

- **GIVEN** a feature contains a spec with an `intent` brief field
- **WHEN** the feature reads or sets that field
- **THEN** access is through the parent-to-child relationship

#### Scenario: Read an entity's own brief

- **GIVEN** a feature sets its child spec's `intent` to “Check invitations for existing members”
- **WHEN** the spec's agent reads its own brief through the entity API
- **THEN** it receives that intent

#### Scenario: Prevent an entity from editing its own brief

- **GIVEN** a feature has set its child spec's `intent`
- **WHEN** the spec's agent attempts to edit its own brief
- **THEN** the edit is not permitted

#### Scenario: Access another entity's brief without being its parent

- **GIVEN** a spec belongs to a feature
- **WHEN** an entity other than that spec or its parent attempts to read or set the spec's brief
- **THEN** that access is not permitted

### Requirement: Agent autonomy inheritance

Speca SHALL resolve an entity's agent autonomy from its explicit **Ask first** or **Act independently** setting, or inherit it from the parent when unset.

#### Scenario: Inherit autonomy

- **GIVEN** a feature uses **Ask first** and its child has no explicit setting
- **WHEN** the child's autonomy is resolved
- **THEN** it uses **Ask first**

#### Scenario: Override autonomy

- **GIVEN** a feature uses **Ask first**
- **WHEN** the user sets its child to **Act independently**
- **THEN** the child uses **Act independently**

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

### Requirement: Default entity API

Every entity SHALL expose the shared inspection and navigation operations to agents.

#### Scenario: Inspect an entity through the API

- **WHEN** an agent inspects a feature through the entity API
- **THEN** it can inspect the type, current entity version, content field versions, revision history, supported operations, content, its own brief, children, and dependencies with recorded versions
- **AND** it can open referenced entities
- **AND** as the parent, it can read and set a child's brief and inspect its brief field versions

### Requirement: Type-specific edits

Content edits and additional operations SHALL follow the entity's type, with a child's content edited through the child's own operations.

#### Scenario: Edit child content

- **GIVEN** a feature contains a spec with an operation for editing its content
- **WHEN** an agent edits the spec's content
- **THEN** it invokes the spec's operation

### Requirement: Integration operations

Integrations SHALL carry out entity API operations through underlying tools or services and may expose additional operations.

#### Scenario: Invoke a configured code operation

- **GIVEN** a code integration exposes an operation that runs the npm `build` script
- **WHEN** an agent invokes that operation
- **THEN** the integration runs that script using the underlying code tooling
