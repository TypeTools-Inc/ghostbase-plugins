---
name: ghostbase-verify-install
description: Use when the user wants to verify that Ghostbase skills, the Ghostbase MCP connector, and available Ghostbase tools are installed and working in Claude.
---

# Ghostbase Verify Install

If this skill is invoked directly, verify the Ghostbase install before doing any other work.

The goal is to confirm that Claude can see the Ghostbase skills, can access the Ghostbase MCP tools, and can call the space tool successfully.

Required checks:

1. Confirm these Ghostbase skills are available in Claude:
   - `/write`
   - `/research`
   - `/switch-space`
   - `/aicole`
   - `/hooks`
   - `/review`
   - `/ghostbase-verify-install`

2. Confirm these Ghostbase MCP tools are available:
   - `list_spaces`
   - `set_active_space`
   - `search_knowledge_base`
   - `load_writing_packet`
   - `verify_originality`
   - `review_draft`
   - `ask_ai_cole`
   - `search_templates`
   - `search_proven_hooks`
   - `finalize`

3. Call `list_spaces` and inspect the result.
   - Confirm the call succeeds.
   - List the user's accessible Ghostbase spaces by name.
   - State which space is currently active, if one is set.

Result:

- If the skills are available, the MCP tools are available, and `list_spaces` succeeds, tell the user that Ghostbase is installed correctly and ready to use.
- If anything is missing or fails, tell the user exactly what failed and the next setup step to fix it.

Keep the final answer short. Do not dump raw JSON unless the user asks for it.
