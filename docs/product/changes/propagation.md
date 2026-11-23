# Change propagation

Propagation brings affected entities up to date in dependency order. A change to an entity’s parent, brief, or dependencies makes it eligible for [refresh](entity-refresh.md). Every comment on an entity requires an edit, so even a fresh entity must be refreshed.

## Running an iteration

In each iteration, Speca refreshes every affected entity whose dependencies are all [fresh](../entities/dependencies.md#freshness). The user can see which entities are ready before starting propagation.

Refreshes within an iteration are independent. If one fails, edits from the other refreshes stay in the worktree.

After all refreshes succeed, Speca checks the [agent autonomy](../entities/structure.md#identity-and-metadata) of every entity in the iteration, including those that needed no edits. If any uses **Ask first**, Speca waits for the user to approve the iteration. If all use **Act independently**, the iteration completes automatically.

Once the iteration completes, Speca starts the next one if any entities are ready. Propagation finishes when all affected entities are fresh and all edits requested in comments are complete. If a problem blocks propagation, the agent explains it so the user can resolve it and resume.

## Iteration history

For current and completed iterations on a branch, the user can inspect the entities involved, refresh results, content revisions, and approvals. For upcoming iterations, the user can see which dependencies each entity is waiting for.
