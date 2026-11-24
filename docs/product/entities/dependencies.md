# Entity dependencies

An entity's dependencies reference other entities or specific content fields of other entities. Each reference records the version ID used. Brief fields are not dependency targets.

For example, a spec can depend on the parent feature's `limitations` content field.

Entities can edit their own and their children's dependencies (add or remove references).

## Graph constraints

Speca checks each dependency against these constraints. If any dependency violates a constraint, the entity is invalid.

- Every reference must resolve to an existing entity or field.
- An entity's dependencies cannot include both a whole entity and a content field of that same entity.
- No entity may depend on itself, directly or indirectly.
- A parent cannot depend on its children or their content fields.

## Deleting an entity or content field

Deleting an entity or a content field requires user confirmation. By default, Speca removes references to the deleted entity and its content fields, or just to the deleted field when the entity remains. When confirming deletion, the user can tell Speca to skip reference removal, leaving those references unresolved.

## Freshness

If a dependency changes, the entity's generated content becomes outdated. It becomes fresh again when a process refreshes it using the current dependency versions.
