# Entity operations specification

## Requirements

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
