# Entity types specification

## Purpose

Let users define reusable kinds of workspace entities.

## Requirements

### Requirement: Type definition

An entity type SHALL define available brief and content fields, allowed named children and collections, supported operations, and UI presentation within the shared [entity model and API](../entities/spec.md).

#### Scenario: Define a feature type

- **WHEN** a user defines a `Feature` type with an `intent` brief field, a `limitations` content field, and a `specs` collection of `Spec` entities
- **THEN** those fields and that child collection form the type's structure

#### Scenario: Define code directory children

- **WHEN** a custom `Code directory` type defines a collection of directory and file entities
- **THEN** the type can provide operations for creating, deleting, and renaming those children

### Requirement: UI-defined types

Speca SHALL derive operations and UI presentation for types created through the app's structure editor.

#### Scenario: Create a type through the app

- **WHEN** a user defines a type's brief fields, content fields, and children using available field types
- **THEN** Speca derives the type's operations and presentation from that structure

### Requirement: Custom types

The JavaScript SDK SHALL allow custom types to implement their operations and UI presentation explicitly.

#### Scenario: Present a code directory

- **GIVEN** a custom `Code directory` type with an `intent` brief field, no content fields, and directory and file children
- **WHEN** its SDK implementation supplies code operations and a file tree with test and build output
- **THEN** entities of that type use the supplied operations and presentation
