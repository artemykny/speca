# Branch context

A branch's context consists of its open tabs. Switching between active branches saves the current branch's context and restores the selected branch's context.

Running agents continue in their branch's worktree when the user switches branches. Pending reviews remain available in their branch.

Saved branch contexts persist across Speca restarts. Activating a branch restores its saved context if one exists. Closing a branch preserves its saved context; deleting its Git branch deletes the context.

<!-- TODO: Add branch chats. -->
