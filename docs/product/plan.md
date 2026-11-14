# Plan

The user specifies which entities to plan changes for, using instructions such as “Update product documentation and design.” Other affected entities are handled through [change propagation](change-propagation.md).

The plan is a Markdown file containing:

- A summary of the change.
- The affected files and proposed changes to their contents.

The agent asks questions when something is unclear or there are multiple ways to proceed. The user can choose a suggested answer or provide their own.

The user can request revisions to the plan or proposed file changes. The agent incorporates the user's feedback, answers, and scope changes into the next plan iteration.

The user can approve a ready plan when no feedback remains unsent. Approval applies its proposed file changes and starts propagation.
