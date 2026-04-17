---
name: switch-space
description: Use when the user wants to inspect, change, confirm, or troubleshoot the active Ghostbase client or space before using other Ghostbase MCP tools.
---

# Ghostbase Switch Space

If this skill is invoked directly, treat `$ARGUMENTS` as the user's space-selection request.

Use `list_spaces` and `set_active_space` as the first Ghostbase actions when the current client or space matters.

Workflow:

1. Inspect first if the space is not explicit.
Call `list_spaces()` to see the current active space and the list of accessible spaces.

2. Save the new space when the user names one.
Call `set_active_space(space_name=...)` when the user gives a readable client name.
Call `set_active_space(space_id=...)` when the user gives an exact Ghostbase space ID.

3. Confirm the result in plain language.
After saving, tell the user which space is now active.

Rules:
- Prefer setting the active space once instead of passing `client_id` into every later tool call.
- If multiple spaces could match a user-provided name, ask for clarification or use the exact returned matches.
- If the user switches clients mid-task, set the new space before calling `prepare_writing`, `search_knowledge_base`, or `ask_ai_cole`.
