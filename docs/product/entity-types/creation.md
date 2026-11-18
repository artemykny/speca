# Creating entity type packages

Create an entity of type `Entity type package` in the workspace repository. A package contains one or more entity type definitions. You can use those types in the workspace as soon as you define them.

## Define an entity type

The UI and JavaScript SDK use the same type and package format. Their packages appear together in the workspace’s entity type package list.

### UI

You can create an entity type in the UI using the simple format. Its brief fields, content fields, and children can use only the types listed below.

- Other entity types
- Simple types, including
  - Strings
  - Markdown
  - Selections — values chosen from options defined for the field, such as `draft` or `approved` for a status field.
  - Numbers
  - Booleans
- Arrays of supported types and string-keyed maps of supported types

Speca derives the entity’s UI and operations from the types you choose.

### JavaScript SDK

Write an advanced implementation in JavaScript to define the entity’s UI and operations explicitly.

## Share a package

Push the workspace repository to share its packages with anyone who has access. You can also keep packages in a dedicated Git repository. Before sharing, check the [dependency rules for remote installation](installation.md#package-dependencies).
