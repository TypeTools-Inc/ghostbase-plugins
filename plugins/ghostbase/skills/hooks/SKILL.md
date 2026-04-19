---
name: hooks
description: Use when the user explicitly wants Ghostbase-backed hook exploration, stronger hook options, different hook directions, or fresher openings for a draft. For now, this skill uses the proven-hook catalog for LinkedIn only.
---

# Ghostbase Hooks

If this skill is invoked directly, treat `$ARGUMENTS` as the user's hook request.

Use the Ghostbase MCP tools in this order unless a step is clearly unnecessary.

1. Determine whether the request is for LinkedIn.
For now, `search_proven_hooks` supports LinkedIn only.
If the request is not clearly for a LinkedIn post, ask a clarifying question or say that Ghostbase's proven hook catalog is currently LinkedIn-only.

2. Make the topic, angle, audience, or desired hook direction explicit before searching.
If the user wants hooks for a vague idea, first clarify the topic, audience, and desired opening style.
If the user needs grounded topic ideas from their own corpus before hook exploration, use `search_knowledge_base`.
If the user wants Nicolas Cole-style judgment on which direction is strongest, use `ask_ai_cole` after hook options exist.

3. Search the proven-hook catalog.
Call `search_proven_hooks(format="linkedin", query?)` with the clearest available description of:
- the topic
- the audience
- the emotional tone
- the desired hook direction

The tool returns proven hook metadata only:
- `id`
- `name`
- `description`
- `bestFor`
- `avoidWhen`

4. Use the returned proven hooks as pattern guidance, then write fresh hooks.
Do not parrot the metadata back as the final answer.
Pick the strongest-matching proven hook patterns and write fresh hooks for the user's specific topic.
If the user asks for multiple directions, vary the hook style across the selected proven hooks.

5. Keep this supplemental to normal drafting.
Do not call `search_proven_hooks` during normal Ghostbase drafting unless the user explicitly asks for more hooks, different hooks, stronger openings, or a new hook direction.
If a LinkedIn writing packet is already loaded and it includes `selectedProvenHooks`, use those first. Only search the wider catalog when the user wants options beyond those template-linked hooks.

Rules:
- `search_proven_hooks` is currently for LinkedIn only.
- Treat the tool output as hook-pattern guidance, not as finished copy.
- Write fresh hooks for the user's topic instead of copying a prior opening verbatim.
- If the user wants help choosing between generated hooks, use `ask_ai_cole`.
