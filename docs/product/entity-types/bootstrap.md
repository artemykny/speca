# Default entity types

When you first open a directory without a Git repository, Speca initializes Git and selects the main repository’s working directory. Its branch stays inactive. If the directory already has a Git repository, Speca uses its current branch.

If the repository has no Speca configuration, Speca checks for `brief.md` at the repository root. If the file exists, Speca reports that `brief.md` already exists. Otherwise, Speca creates the root brief and stores the default entity type configuration in `.speca/`.

Agent autonomy for the workspace root defaults to **Ask first**.

The two default types use paths relative to the repository root.

- `Entity type` represents a type definition and includes all its subtypes. Speca stores these definitions in `entity_types/`.
- `File` represents files, and its `Directory` subtype represents directories. Both apply throughout the repository tree, excluding `entity_types/` and its contents.

## Example repository

```text
project/
├── .speca/         # Workspace configuration
├── brief.md        # Root brief
├── entity_types/   # Entity type definitions
├── README.md       # File
└── src/            # Directory
    └── main.js     # File
```
