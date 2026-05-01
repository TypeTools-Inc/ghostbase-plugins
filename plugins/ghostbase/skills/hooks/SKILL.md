---
name: hooks
description: Use when the user explicitly wants Ghostbase-backed hook exploration, stronger hook options, different hook directions, or fresher openings for a draft. For now, this skill uses the proven-hook catalog for LinkedIn only.
---

# Ghostbase Hooks

If this skill is invoked directly, treat `$ARGUMENTS` as the user's hook request.

Use this skill as the supplemental hook-exploration workflow. Normal LinkedIn drafting should use the hooks returned by `load_writing_packet`; this skill is for explicit requests for more, different, stronger, or fresher openings.

Quick start:

1. Confirm the request is for LinkedIn, since `search_proven_hooks` currently supports LinkedIn only.
2. Make the topic, angle, audience, or desired hook direction explicit.
3. Use `search_knowledge_base` first when the user needs grounded topic ideas or source material.
4. Call `search_proven_hooks(format="linkedin", query?)`.
5. Use the returned patterns to write fresh hooks; do not present the pattern metadata as final copy.

Workflow:

0. If Ghostbase tools are unavailable, tell the user to connect the Ghostbase connector or plugin, then stop.

1. Confirm LinkedIn
If the request is not clearly for a LinkedIn post, ask a clarifying question or say that Ghostbase's proven hook catalog is currently LinkedIn-only.

2. Clarify the hook brief
If the user's idea is vague, clarify the topic, audience, and desired opening style. If the user needs grounded topic ideas from their own corpus first, use `search_knowledge_base`.

3. Search the catalog
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

4. Write fresh hooks
Pick the strongest-matching patterns and write fresh hooks for the user's specific topic. If the user asks for multiple directions, vary the hook style across the selected patterns.

5. Add strategic judgment when needed
If the user wants help choosing between generated hooks and the decision depends on positioning, audience promise, or the larger writing strategy, use `ask_ai_cole` with the candidate hooks and goal as context. Otherwise, use the packet and your own editorial judgment.

Rules:
- `search_proven_hooks` is currently for LinkedIn only.
- Treat the tool output as hook-pattern guidance, not as finished copy.
- Write fresh hooks for the user's topic instead of copying a prior opening verbatim.
- Use `ask_ai_cole` only when hook choice depends on strategic positioning or the user is stuck on the larger writing direction.
- Do not call `search_proven_hooks` during normal Ghostbase drafting unless the user explicitly asks for more hooks, different hooks, stronger openings, or a new hook direction.
- If a LinkedIn writing packet is already loaded and it includes `selectedProvenHooks`, use those first.
