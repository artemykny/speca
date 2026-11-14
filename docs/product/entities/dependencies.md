# Entity dependencies

An entity's dependencies reference other entities or specific content fields of other entities. Each reference records the version ID used. Brief fields are not dependency targets.

For example, a spec can depend on the parent feature's `limitations` content field.

## Graph constraints

The entity graph must remain valid and acyclic: every reference must resolve to an existing entity or field, and no entity may depend on itself, directly or indirectly.

## Freshness

If a dependency changes, the entity's generated content becomes outdated. It becomes fresh again when a process refreshes it using the current dependency versions. [Propagation](../changes/propagation.md) determines which affected files need content changes.
