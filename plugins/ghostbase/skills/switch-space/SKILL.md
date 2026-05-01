---
name: switch-space
description: Use when the user wants to inspect, change, confirm, or troubleshoot the active Ghostbase client or space before using space-aware Ghostbase MCP tools.
---

# Ghostbase Switch Space

If this skill is invoked directly, treat `$ARGUMENTS` as the user's space-selection request.

Use this skill as the space-selection workflow for Ghostbase. Most Ghostbase writing tools read from the saved active space, so set it before writing, reviewing, or searching when the client matters.

Quick start:

1. If the user only asks what space is active, call `list_spaces`.
2. If the user names a client or space, call `set_active_space` with `space_name` or `space_id`.
3. If the name is ambiguous, use `list_spaces` and ask the user to choose from the matching spaces.
4. Confirm the selected active space plainly.

Workflow:

0. If Ghostbase tools are unavailable, tell the user to connect the Ghostbase connector or plugin, then stop.

1. Inspect when needed
Call `list_spaces()` to see the current active space and the accessible spaces when the user asks to inspect, confirm, troubleshoot, or choose from multiple spaces.

2. Save the active space
Call `set_active_space(space_name=...)` when the user gives a readable client or space name. Call `set_active_space(space_id=...)` when the user gives an exact Ghostbase space ID.

3. Continue the parent workflow
After changing spaces, continue the user's writing, review, search, or originality task using the new active space.

Rules:
- Prefer setting the active space once before later Ghostbase MCP tool calls.
- If multiple spaces could match a user-provided name, ask for clarification or use the exact returned matches.
- If the user switches clients mid-task, set the new space before calling `load_writing_packet`, `search_knowledge_base`, `verify_originality`, or `review_draft`.
