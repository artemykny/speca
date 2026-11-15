# Change planning specification

## Requirements

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
