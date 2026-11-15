# Workspace configuration specification

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
