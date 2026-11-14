# Entity type definition

An entity type is a reusable definition of an entity's structure, supported operations, and UI presentation. It defines:

- **Fields** — which brief and content fields are available.
- **Children** — which child entities it can contain, including named children and collections.
- **Operations** — how its own content can be edited; how it can create, delete, and rename children; and any additional actions it supports.
- **UI presentation** — how the entity is presented in the user interface.

Types use the shared [entity structure](../entities/structure.md) and [entity API](../entities/operations.md).

## Examples

### Feature entity type

A `Feature` type defined through the UI could have:

- **Brief fields** — `intent`, a text field describing what the feature should cover.
- **Content fields** — `limitations`, a text field describing the feature's constraints.
- **Children** — a `specs` collection of `Spec` entities.

### Code directory entity type

A custom `Code directory` type could define:

- **Brief fields** — `intent`, a text field describing what the code should implement.
- **Content fields** — none.
- **Children** — a collection of directory and file entities.
- **Operations** — create, delete, and rename children; expose [code integration operations](../entities/operations.md#integrations).
- **UI presentation** — a file tree and test and build output.
