# Change propagation

Propagation brings affected entities up to date in dependency order. An affected entity is ready for an iteration once all its dependencies are [fresh](../entities/dependencies.md#freshness).

## Selecting entities for refresh

The user can see which entities are ready and start the iteration. A comment on an entity requires a content change, so Speca selects that entity for refresh without triage. This applies even if the entity is already fresh.

For an entity without a comment, a change to its parent, brief, or any dependency triggers triage. The agent explains whether the entity needs a content change. The user sees all results, with entities that need changes selected for refresh.

If any entity in the iteration uses **Ask first**, the user reviews the selection and can adjust triage decisions before approving it. Otherwise, Speca proceeds automatically.

## Applying changes

Before using a triage decision, Speca checks the entity again. If the entity is now fresh, Speca skips it. If it is still outdated but its version has changed, the agent repeats triage.

Speca [refreshes each selected entity](entity-refresh.md). For entities that need no content change, it records the dependency versions checked during triage.

If a problem blocks propagation, the agent explains it so the user can resolve it and resume. After each iteration, Speca identifies which entities are ready next. Propagation finishes automatically when all affected entities are fresh and all edits requested in comments are complete.

## Current, past, and upcoming iterations

For current and completed iterations on a branch, the user can inspect the entities involved, triage decisions and their reasons, content revisions, verification results, and approvals.

For upcoming iterations, the user can see which dependencies each entity is waiting for. Speca updates this plan after each iteration to reflect triage decisions and approved changes.
