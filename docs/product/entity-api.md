# Entity API

Agents use the speca entity API to work with workspace entities.

## Entity operations

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

The [entity type](entity-type.md) defines supported content edits and operations for creating, deleting, and renaming children. A child's content is edited through the child's own operations.

Integrations can expose any operation. For example, a code integration can:

- Run tests.
- Run the npm `build` script.
- Format source files.
- Generate code from a schema.

## Integrations

Integrations carry out API operations using the underlying tools and services. For example:

- A code integration maps a code entity to a tree of directories and files.
- A Figma integration maps a design entity to a document, screen, or component.
- A Google Docs integration maps a document entity to a Google document.
- An AutoCAD integration maps a drawing entity to a `.dwg` file.
