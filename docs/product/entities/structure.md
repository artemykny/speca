# Entity structure

An entity represents something in a workspace, such as a feature or a spec. It has metadata, a brief, content, and children, with a structure defined by its [type](../entity-types/definition.md).

## Identity and metadata

Every entity has:

- **Version** — the ID of its current revision.
- **Version history** — a record of all its revisions, retaining at least their IDs.
- [Dependencies](dependencies.md).
- **Agent autonomy** — **Ask first** or **Act independently**, inherited from the parent unless the user chooses a setting for the entity.

Every field in an entity's brief or content also has its own version ID.

## Brief

A brief describes what the parent expects the entity to cover. It can contain multiple fields. The entity and its parent can read the brief; only the parent can edit it.

For example, a spec's brief might have an `intent` field: “Check what happens when the invitee already belongs to the group.”

## Content

Content is the information an entity stores, organized into fields. See the [example type definitions](../entity-types/definition.md#examples).

## Children

Children are entities contained in another entity. A child keeps its identity when renamed.

An application might contain `design`, `frontend`, and `backend` entities for its design, frontend code, and backend code.
