# Change planning

Starting a planned change opens a form with two inputs:

- **Entities to plan** — the scope, such as “Update product documentation and design.”
- **Message** — what the user wants to change.

The user fills in both inputs and submits the form to start the first planning iteration. Other affected entities are handled through [change propagation](propagation.md).

The plan is a Markdown file containing:

- A summary of the change.
- The affected files and proposed changes to their contents.

## Reviewing proposals

The agent can return questions alone, a draft plan with questions, or a plan ready for approval. The user can compare each file's original and proposed content.

The agent asks questions when something is unclear or there are multiple ways to proceed. The user can choose a suggested answer or provide their own.

The user can comment on selected text in the plan or in either the original or proposed file content. Comments can be edited or deleted. Saving a comment attaches it to the next response to the agent; removing the attachment keeps the comment. Comments belong to the iteration where they were created and are visible only in that iteration.

The user can request revisions to the plan or proposed file changes. The agent incorporates the user's feedback, answers, and scope changes into the next plan iteration.

The user can approve a ready plan when no feedback remains unsent. Approval applies its proposed file changes and starts propagation.

## Iteration history

The user can inspect earlier plans, proposed file content, questions, and submitted responses, including attached comments. Earlier iterations are read-only. The user returns to the latest iteration to continue reviewing or responding.
