# Entity operations

Agents use the Speca entity API to work with workspace entities.

## Default operations

Every entity supports these default operations:

- Inspect its type.
- Inspect its current version ID.
- Inspect the version ID of any content field.
- List its version history, including at least version IDs.
- List supported operations.
- Read content.
- List children.
- Read and set a child's brief and inspect its field version IDs.
- Open a referenced entity.
- List dependencies and their recorded version IDs.

Additional operations depend on the [entity type](../entity-types/definition.md). A child's content is edited through the child's own operations.

## Integrations

Integrations carry out API operations using the underlying tools and services.

Integrations can expose any operation. For example, a code integration can:

- Run tests.
- Run the npm `build` script.
- Format source files.
- Generate code from a schema.

Example mappings:

- A code integration maps a code entity to a tree of directories and files.
- A Figma integration maps a design entity to a document, screen, or component.
- A Google Docs integration maps a document entity to a Google document.
- An AutoCAD integration maps a drawing entity to a `.dwg` file.
