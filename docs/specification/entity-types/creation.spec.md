# Creating entity types specification

## Requirements

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
