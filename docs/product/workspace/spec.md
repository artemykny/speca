# Workspace specification

## Purpose

Provide a place for users to organize software work and navigate its content.

## Requirements

### Requirement: Workspace contents

Speca SHALL use a directory backed by a Git repository by default to hold user-organized entity content and installed entity types.

#### Scenario: Organize software work

- **WHEN** a user organizes a workspace containing ideas, requirements, designs, code, and research
- **THEN** the user can choose which content belongs in the workspace and how to organize it as entities

### Requirement: Installed type configuration

Speca SHALL keep installed entity type configuration in the workspace's `.speca/` directory.

#### Scenario: Locate workspace configuration

- **GIVEN** a workspace at `/projects/example`
- **WHEN** its installed type configuration is inspected
- **THEN** that configuration is located in `/projects/example/.speca/`

### Requirement: Entity navigation

Speca SHALL let users browse entities and installed types in tabs, with tab state governed by [branch context](../version-control/spec.md#requirement-branch-context).

#### Scenario: Inspect an entity

- **WHEN** the user opens a feature from the entity tree
- **THEN** its tab exposes its content, children, type, version, and freshness

#### Scenario: Inspect an installed type

- **WHEN** the user opens a type from the installed types list
- **THEN** the type opens in a tab

### Requirement: Workspace feedback

Speca SHALL let users describe a change or leave a comment on any part of the workspace.

#### Scenario: Request a scoped change

- **WHEN** the user opens an entity containing product requirements
- **THEN** the user can describe a change or leave a comment about that content

### Requirement: Dependency navigation

Speca SHALL expose navigable incoming and outgoing dependency references with recorded and current versions.

#### Scenario: Follow a dependency

- **GIVEN** a design entity depends on product requirements at version `v1`, whose current version is `v2`
- **WHEN** the user inspects the design entity
- **THEN** **Depends on** lists the product requirements and allows comparing `v1` with `v2`
- **AND** following the reference opens the product requirements

#### Scenario: Find dependent entities

- **GIVEN** a design entity depends on product requirements
- **WHEN** the user inspects the product requirements
- **THEN** **Used by** lists the design entity and allows opening it
