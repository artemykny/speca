# Default entity types

When you first open a repository without Speca configuration, Speca creates `.speca/` at the repository root, whether the repository is empty or already contains files. This directory holds the configuration for the default entity types.

The two default types use paths relative to the repository root.

- `Entity type` represents a type definition and includes all its subtypes. Speca stores these definitions in `entity_types/`.
- `File` represents files, and its `Directory` subtype represents directories. Both apply throughout the repository tree, excluding `entity_types/` and its contents.

## Example repository

Every workspace includes a root brief.

```text
project/
├── .speca/         # Workspace configuration
├── brief.md        # Root brief
├── entity_types/   # Entity type definitions
├── README.md       # File
└── src/            # Directory
    └── main.js     # File
```
