# Entity structure

An entity represents something in a project, such as a feature or a spec. Its structure includes:

- **Brief** — what the parent expects it to cover.
- **Content** — information it stores.
- **Children** — other entities it contains.

The entity's type defines its brief, content, and children.

## Brief

A brief describes what the parent expects the entity to cover. It can contain multiple fields.

### Examples

- A spec's brief might have an `intent` field: “Check what happens when the invitee already belongs to the group.”

## Content

Content is the information an entity stores.

Each part of the content can depend on fields in the brief and other content.

The system records which versions of these dependencies were used during generation. If any dependency changes, the generated content becomes outdated but stays in place until it is updated.

### Examples

- A feature's content might include `limitations`.
- A spec's content might include `given`, `when`, and `then` sections.
- Generating a spec's `given` section may require the `intent` field in its brief and the parent feature's `limitations`.

## Children

Children are entities contained in another entity, each with its own brief, content, and children.

A child keeps its identity when renamed.

### Examples

- An application might have these children:

  - `design` — Design
  - `frontend` — Frontend code
  - `backend` — Backend code

- A feature can have a `specs` collection, with each spec identified by name.
