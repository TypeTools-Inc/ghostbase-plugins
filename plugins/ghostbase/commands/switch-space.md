---
description: Inspect or change the active Ghostbase space before using other Ghostbase tools.
argument-hint: [space name or space id]
---

# Ghostbase Switch Space

Treat `$ARGUMENTS` as the requested Ghostbase space selection.

Workflow:

1. Use `list_spaces` when the active space is unknown or when you need to show options.
2. If the user provided a readable client name, call `set_active_space(space_name=...)`.
3. If the user provided an exact space id, call `set_active_space(space_id=...)`.
4. Confirm which space is active after the change.

Rules:

- Prefer saving the active space once instead of passing `client_id` into later Ghostbase tool calls.
- If multiple spaces match, ask for clarification instead of guessing.

