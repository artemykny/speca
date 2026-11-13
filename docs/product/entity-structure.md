# Entity structure

An entity represents something in a workspace, such as a feature or a spec. Its structure includes:

- **Metadata** — its current version, version history, and dependencies.
- **Brief** — what the parent expects it to cover.
- **Content** — information it stores.
- **Children** — other entities it contains.

The [entity type](entity-type.md) defines its brief, content, and children.

## Metadata

Every entity has:

- **Version** — the ID of the entity's current revision.
- **Version history** — a record of all the entity's revisions, retaining at least their IDs.
- **Dependencies** — references to other entities or specific content fields of other entities, including the version ID of each dependency used.

Every field in an entity's brief or content also has its own version ID.

If a dependency changes, the entity's generated content becomes outdated but stays in place until it is updated.

## Brief

A brief describes what the parent expects the entity to cover. It can contain multiple fields.

Only the parent reads and sets the brief. Brief fields are not dependency targets.

### Examples

- A spec's brief might have an `intent` field: “Check what happens when the invitee already belongs to the group.”

## Content

Content is the information an entity stores, organized into fields.

### Examples

- A feature's content might include `limitations`.
- A spec's content might include `given`, `when`, and `then` fields.
- A spec can depend on the parent feature's `limitations` content field.

## Children

Children are entities contained in another entity, each with its own brief, content, and children.

A child keeps its identity when renamed.

### Examples

- An application might have these children:

  - `design` — Design
  - `frontend` — Frontend code
  - `backend` — Backend code

- A feature can have a `specs` collection, with each spec identified by name.
