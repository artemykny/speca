# Workspace

A workspace uses a directory backed by a Git repository by default. It contains:

- Entities content.
- Installed entity types.

## Entity navigation

The user can browse the entity tree and installed entity types, open them in tabs, and inspect an entity's content, children, type, version, and freshness.

The entity view lists its dependencies under **Depends on** and the entities that depend on it under **Used by**. The user can follow these references to open related entities and compare recorded dependency versions with current versions.

## Git operations

Users work with Git directly in the app: inspect history, stage and commit changes, manage remotes, fetch, pull, push, rebase, and manage stashes and tags.

## Configuration

Installed entity types are configured in `.speca/` within the workspace directory.
