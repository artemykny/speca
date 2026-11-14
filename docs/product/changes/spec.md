# Changes specification

## Purpose

Coordinate agent work from a requested change through review and completion.

## Requirements

### Requirement: Branch-scoped change

A change SHALL group file changes in one [active branch worktree](../version-control/spec.md#requirement-active-branch-isolation), with at most one ongoing change per branch through planning, propagation, and final review.

#### Scenario: Prevent overlapping changes in a branch

- **GIVEN** `feature/onboarding` has a change awaiting final review
- **WHEN** the user tries to start another change in that branch
- **THEN** another change cannot start until the current change is archived

#### Scenario: Require an active branch

- **GIVEN** a Git branch has no active worktree
- **WHEN** the user tries to start a change there
- **THEN** the change cannot start while the branch is inactive

### Requirement: Change entry points

Speca SHALL offer planned changes and direct propagation as entry points to the same change workflow, both ending in final review.

#### Scenario: Start with a plan

- **WHEN** the user selects **Start planned change**
- **THEN** the change begins with planning

#### Scenario: Start with affected files

- **WHEN** the user selects **Start change propagation**
- **THEN** the change begins with propagation

### Requirement: Planning request

Speca SHALL require an **Entities to plan** scope and a **Message** before starting the first planning iteration.

#### Scenario: Submit a complete request

- **WHEN** the user submits scope “Update product documentation and design” and message “Allow members to skip onboarding”
- **THEN** the first planning iteration starts with both inputs

#### Scenario: Leave an input empty

- **WHEN** the user leaves either the scope or message empty
- **THEN** the first planning iteration cannot start

### Requirement: Planning responses

The agent SHALL return questions alone, a draft plan with questions, or a plan ready for approval; a plan is a Markdown file with a change summary and affected files with proposed content changes.

#### Scenario: Ask before proposing content

- **GIVEN** the agent needs clarification before drafting
- **WHEN** it returns a planning response
- **THEN** the response can contain questions without a plan

#### Scenario: Review a draft or ready plan

- **WHEN** the agent returns a draft plan with questions or a ready plan
- **THEN** the user can inspect the Markdown plan and compare original and proposed content for each affected file

### Requirement: Planning clarification

The agent SHALL ask questions when the request is unclear or has multiple ways forward, accepting suggested or user-written answers.

#### Scenario: Choose the onboarding audience

- **GIVEN** the request does not say whether onboarding applies to existing members
- **WHEN** the agent asks which audience to use
- **THEN** the user can choose a suggested answer or write a custom answer

### Requirement: Planning comments

Speca SHALL support editable, deletable comments anchored to selected text in a plan or either side of a proposed file change, visible only in their originating iteration.

#### Scenario: Comment on proposed content

- **GIVEN** the user is reviewing the latest planning iteration
- **WHEN** the user selects text in proposed file content and saves a comment
- **THEN** the comment is associated with that selection and iteration and can be edited or deleted

#### Scenario: Comment on other review surfaces

- **WHEN** the user selects text in the plan or original file content
- **THEN** the user can attach a comment to that selection

#### Scenario: Inspect a comment from an earlier iteration

- **GIVEN** a comment was created in iteration 1
- **WHEN** the user switches between iterations 1 and 2
- **THEN** the comment is visible only in iteration 1

### Requirement: Comment attachments

Speca SHALL attach saved planning comments to the next response to the agent while allowing attachment removal without deleting the comment.

#### Scenario: Detach feedback

- **GIVEN** saving a comment attached it to the next response
- **WHEN** the user removes that attachment
- **THEN** the comment remains in its iteration and is excluded from that response

### Requirement: Planning revisions

The agent SHALL incorporate submitted feedback, answers, and scope changes into the next plan iteration.

#### Scenario: Revise scope and content

- **GIVEN** the current proposal covers product documentation
- **WHEN** the user adds design to the scope and submits feedback about the proposed content
- **THEN** the next iteration incorporates the expanded scope and feedback

### Requirement: Planning history

Speca SHALL expose earlier planning iterations as read-only, including plans, proposed file content, questions, and submitted responses with attached comments.

#### Scenario: Return from history to current work

- **GIVEN** iteration 2 is the latest iteration
- **WHEN** the user opens iteration 1
- **THEN** its review history is inspectable but cannot be edited or responded to
- **AND** returning to iteration 2 allows review and response to continue

### Requirement: Plan approval

Speca SHALL allow approval only for a ready plan with no unsent feedback, applying its proposed file changes and starting propagation on approval.

#### Scenario: Approve a ready plan

- **GIVEN** the latest plan is ready and no feedback remains unsent
- **WHEN** the user approves it
- **THEN** its proposed file changes are applied and propagation starts for affected entities

#### Scenario: Block premature approval

- **GIVEN** the plan still needs answers or the user has unsent feedback
- **WHEN** the user reviews the available actions
- **THEN** plan approval is unavailable

### Requirement: Propagation eligibility

Speca SHALL triage a file only after its dependency, parent, or brief changes and all its dependencies are fresh.

#### Scenario: Wait for an upstream file

- **GIVEN** design depends on product requirements and code depends on design
- **WHEN** product requirements change and design is outdated
- **THEN** design is eligible for triage once its dependencies are fresh, while code waits for design

#### Scenario: Skip unaffected files

- **GIVEN** a file's dependencies, parent, and brief have not changed
- **WHEN** propagation computes eligible files
- **THEN** that file does not need triage

### Requirement: Independent file triage

The agent SHALL decide independently for each eligible file whether content changes are needed and explain the decision.

#### Scenario: Separate affected files by need

- **GIVEN** two files are eligible for triage
- **WHEN** the agent determines that one needs changes and the other does not
- **THEN** each file receives its own decision and reason

### Requirement: Triage selection approval

Speca SHALL present all triage results with files needing changes selected, waiting for user review if any listed file uses **Ask first**, and otherwise continuing automatically.

#### Scenario: Review mixed autonomy settings

- **GIVEN** a triage list contains both **Ask first** and **Act independently** files
- **WHEN** results are presented
- **THEN** the user can adjust the selection and must approve it before propagation continues

#### Scenario: Continue without selection review

- **GIVEN** every file in the triage list uses **Act independently**
- **WHEN** triage results are ready
- **THEN** propagation continues with the agent's selection

### Requirement: Triage outcomes

Speca SHALL record checked dependency versions for files confirmed as needing no content change and launch entity refresh for selected files.

#### Scenario: Confirm unchanged content

- **GIVEN** triage checked dependency version `v2` and the file is confirmed as needing no content change
- **WHEN** Speca applies the triage decision
- **THEN** the file's content is unchanged and its recorded dependency version becomes `v2`

#### Scenario: Refresh a selected file

- **GIVEN** a file is confirmed as needing changes
- **WHEN** Speca applies the triage decision
- **THEN** the file enters the entity refresh workflow

### Requirement: Propagation progression

Speca SHALL recompute eligible files after resolving each iteration and finish propagation when no affected files remain [outdated](../entities/spec.md#requirement-dependency-freshness).

#### Scenario: Continue downstream

- **GIVEN** design has been resolved and code depends on it
- **WHEN** Speca recomputes affected files
- **THEN** code is considered using the updated dependency state

#### Scenario: Finish propagation

- **WHEN** every affected file is fresh after resolving an iteration
- **THEN** propagation finishes

### Requirement: Propagation history and forecast

Speca SHALL expose current and completed propagation iterations and a provisional dependency-ordered plan of future files and what they are waiting for.

#### Scenario: Inspect completed work

- **WHEN** the user opens a completed propagation iteration
- **THEN** its files, triage reasons and decisions, content revisions, verification results, and approvals are inspectable

#### Scenario: Revise future work

- **GIVEN** a future file is waiting for an upstream decision
- **WHEN** triage decisions or approved changes resolve the current iteration
- **THEN** the forecast is recomputed, including whether content changes remain necessary

### Requirement: Refresh context

Speca SHALL provide the refresh agent with the entity type, type-specific and generic instructions, parent, brief, dependencies, whole current content, and children with their briefs and dependencies.

#### Scenario: Refresh a design entity

- **WHEN** refresh starts for a design entity with child screens
- **THEN** the agent receives the design's full context and the child screens' briefs and dependencies

### Requirement: Direct refresh edits

The refresh agent SHALL edit entities directly and validate its changes, including content edits, child creation or deletion, and edits to children's briefs or dependencies as needed.

#### Scenario: Revise content and child scope

- **GIVEN** updated requirements affect a design and one of its child screens
- **WHEN** the agent refreshes the design
- **THEN** it can edit the design's content and the child's brief directly and validate the changes

### Requirement: Refresh results

The agent SHALL end each refresh iteration with `success(summary)` or `error(details)`.

#### Scenario: Report successful validation

- **WHEN** the agent completes its changes and validation
- **THEN** `success(summary)` reports completed changes, validation results, and any differences between the intended and produced result

#### Scenario: Report contradictions

- **WHEN** contradictory requirements prevent completion
- **THEN** `error(details)` identifies the contradictions and involved entities, changes already made, and incomplete validation

#### Scenario: Request missing information

- **WHEN** critical missing information prevents completion
- **THEN** `error(details)` includes questions needed to resolve it, changes already made, and incomplete validation

#### Scenario: Report a validation failure

- **WHEN** the agent cannot check correctness because tests cannot run
- **THEN** `error(details)` describes the failure, changes already made, and incomplete validation

### Requirement: Refresh approval

Speca SHALL require user approval to finish a successful refresh at every autonomy setting, recording the dependency versions used by that refresh on approval.

#### Scenario: Review an independent agent's result

- **GIVEN** an entity uses **Act independently** and its refresh returned success
- **WHEN** the result is presented
- **THEN** the user can request another iteration or approve it, and refresh remains unfinished until approval

#### Scenario: Approve after a dependency changes

- **GIVEN** refresh used dependency version `v2`, but that dependency changed to `v3` during review
- **WHEN** the user approves the result
- **THEN** approval is allowed and records `v2`, leaving the entity outdated

### Requirement: Propagation problem recovery

Speca SHALL stop propagation when the agent finds a problem and return to the previous step with feedback so affected entities can be updated before propagation resumes.

#### Scenario: Resolve a reported problem

- **GIVEN** propagation encounters contradictory requirements
- **WHEN** the agent reports the problem
- **THEN** propagation stops and the previous step receives feedback
- **AND** the affected entities are updated there before propagation resumes

### Requirement: Agent session lifecycle

Speca SHALL stop a change's agents when that change stops, stop all running agents when the app closes, and allow continuation in the same sessions after reopening.

#### Scenario: Stop a change

- **GIVEN** agents are running for an ongoing change
- **WHEN** the user stops that change
- **THEN** its running agents stop

#### Scenario: Close and reopen the app

- **GIVEN** agents are running in active branches
- **WHEN** the app closes and is reopened
- **THEN** those agents stopped at closure and the user can continue work in the same sessions

### Requirement: Final review availability

Speca SHALL make final review available only after propagation finishes and all refreshes in the change are approved.

#### Scenario: Wait for a refresh approval

- **GIVEN** a refresh is still awaiting approval
- **WHEN** the user inspects the change
- **THEN** final review is unavailable

#### Scenario: Open final review

- **GIVEN** propagation has finished and every refresh is approved
- **WHEN** the user opens the change
- **THEN** final review is available

### Requirement: Final review contents

Speca SHALL show the combined diff from before the change began to its final result, attributing each changed file to the plan or an approved refresh and listing reviewed files without content changes separately.

#### Scenario: Review combined work

- **GIVEN** a plan edited product requirements, a refresh edited design, and triage confirmed code needed no changes
- **WHEN** the user opens final review
- **THEN** the combined diff attributes product changes to the plan and design changes to the approved refresh
- **AND** code appears in the separate list of reviewed files without content changes

### Requirement: Change persistence

Speca SHALL store every change on disk.

#### Scenario: Inspect a change after restart

- **GIVEN** a change has recorded planning and propagation work
- **WHEN** the app restarts
- **THEN** the stored change record remains available

### Requirement: Completion and archival

Approval of final review SHALL complete the change, move its record into a Git-ignored directory, and place its UI entry in the **Archived** folder under **Changes**.

#### Scenario: Complete and inspect a change

- **WHEN** the user approves final review
- **THEN** the completed change is archived and the branch can start another change
- **AND** the user can inspect the entire archived record as temporary local data
