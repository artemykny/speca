# Entity API

Agents use the speca entity API to work with project entities.

## Entity operations

Every entity supports these default operations:

- Inspect its type.
- Inspect its version.
- List supported operations.
- Read content.
- List children.
- Open a referenced entity.
- List content dependencies.

The entity type defines how its [brief, content, and children](entity-structure.md) can be edited.

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
