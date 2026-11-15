# Entity structure specification

## Requirements

### Requirement: Entity structure

Each entity SHALL have metadata, a brief, content, and children governed by its [entity type](../entity-types/definition.spec.md).

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
