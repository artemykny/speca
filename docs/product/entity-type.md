# Entity type

An entity type is a reusable definition of an entity's structure, supported operations, and UI presentation. It defines:

- **Brief fields** — what information the parent can provide.
- **Content fields** — what information the entity stores.
- **Children** — which child entities it can contain, including named children and collections.
- **Operations** — how its own content can be edited; how it can create, delete, and rename children; and any additional actions it supports.
- **UI presentation** — how the entity is presented in the user interface.

Identity, version history, and dependency tracking belong to the shared [entity structure](entity-structure.md). Every type supports the default [entity API operations](entity-api.md).

## Creating an entity type

**Simple entity types** are created through the app UI by defining their brief fields, content fields, and children using the app's available field types. The app derives their operations and UI presentation from this structure.

**Custom entity types** are created through the JavaScript SDK, which allows their operations and UI presentation to be implemented explicitly.

## Examples

### Feature entity type

A simple `Feature` type could have:

- **Brief fields** — `intent`, a text field describing what the feature should cover.
- **Content fields** — `limitations`, a text field describing the feature's constraints.
- **Children** — a `specs` collection of `Spec` entities.

### Code directory entity type

A custom `Code directory` type could define:

- **Brief fields** — `intent`, a text field describing what the code should implement.
- **Content fields** — none.
- **Children** — a collection of directory and file entities.
- **Operations** — create, delete, and rename children; run tests, build, and format code.
- **UI presentation** — a file tree and test and build output.
