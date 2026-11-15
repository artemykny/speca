# Entity type definition specification

## Requirements

### Requirement: Type definition

An entity type SHALL define available brief and content fields, allowed named children and collections, supported operations, and UI presentation within the shared [entity model](../entities/structure.spec.md) and [API](../entities/operations.spec.md).

#### Scenario: Define a feature type

- **WHEN** a user defines a `Feature` type with an `intent` brief field, a `limitations` content field, and a `specs` collection of `Spec` entities
- **THEN** those fields and that child collection form the type's structure

#### Scenario: Define code directory children

- **WHEN** a custom `Code directory` type defines a collection of directory and file entities
- **THEN** the type can provide operations for creating, deleting, and renaming those children
