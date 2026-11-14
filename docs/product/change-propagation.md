# Change propagation

Propagation handles the affected files in a [change](change.md). A file needs triage only if a dependency, its parent, or its brief has changed.

## Propagation iterations

Each iteration follows this sequence:

1. Show files that need triage and whose dependencies are all fresh.
2. The agent triages each file independently, deciding whether its content needs to change and explaining why.
3. Present the results for all files, with those requiring changes selected. If any listed file uses **Ask first**, wait for the user to review and approve the selection, adjusting it if needed. Otherwise, continue automatically.
4. For each file confirmed as needing no content changes, update its recorded dependency versions to those checked during triage.
5. Launch the [entity refresh workflow](entity-refresh.md) for each selected file.
6. After the current files are resolved, recompute eligible files and return to step 1.

Propagation finishes when no affected files remain [outdated](entity-structure.md#metadata).

## History and future plan

The user can inspect completed and current propagation iterations, including their files, triage reasons and decisions, content revisions, verification results, and approvals.

The future iteration plan shows dependent files in dependency order and what they are waiting for. It is provisional: triage may find that no content change is needed. Recompute the plan as decisions and approved changes resolve each iteration.
