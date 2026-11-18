# Change propagation

Propagation handles the affected files in a [change](lifecycle.md). A file needs triage only if a dependency, its parent, or its brief has changed.

## Propagation iterations

Each iteration follows this sequence:

1. Show files that need triage and whose dependencies are all fresh.
2. When the user starts the pending iteration, the agent triages each file independently and explains whether its content needs to change.
3. Present the results for all files, with those requiring changes selected. If any listed file uses **Ask first**, wait for the user to review and approve the selection, adjusting it if needed. Otherwise, continue automatically.
4. Before acting on each result, recheck the file’s version and freshness. Skip files that are now fresh. If a file is still outdated and its version has changed since triage, triage it again.
5. For each file confirmed as needing no content changes, update its recorded dependency versions to those checked during triage.
6. Launch the [entity refresh workflow](entity-refresh.md) for each selected file.
7. After the current files are resolved, recompute eligible files and return to step 1.

The propagation change completes automatically when no affected files remain [outdated](../entities/dependencies.md#freshness).

## History and future plan

The user can inspect the branch’s completed and current propagation iterations, including their files, triage reasons and decisions, content revisions, verification results, and approvals.

The future iteration plan shows dependent files in dependency order and what they are waiting for. It is provisional: triage may find that no content change is needed. Recompute the plan as decisions and approved changes resolve each iteration.
