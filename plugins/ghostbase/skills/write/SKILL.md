---
name: write
description: Use when the user wants Ghostbase-assisted drafting, rewriting, editing, outlining, or idea generation for a supported format such as LinkedIn posts, emails, newsletters, articles, or tweets. This skill teaches the standard Ghostbase MCP workflow, format inference, and tool order.
---

# Ghostbase Write

If this skill is invoked directly, treat `$ARGUMENTS` as the user's writing request.

Use the Ghostbase MCP tools in this order unless a step is clearly unnecessary.

1. Set or confirm the active space.
If the user names a client or space, or if the working space is unclear, call `list_spaces`.
Call `set_active_space` with `space_name` or `space_id` to save the correct active space.

2. Determine the format before drafting.
Infer the format from the request when it is obvious.
Use these mappings:
- LinkedIn post -> `linkedin`
- Email -> `email`
- Newsletter -> `newsletter`
- Article or blog post -> `article`
- Tweet or X post -> `tweet`
If more than one format is plausible, ask a clarifying question before calling `prepare_writing`.
If the requested deliverable is unsupported, say so explicitly.

3. Prepare the writing packet before drafting.
Call `prepare_writing(format, topic?)` before drafting or revising any supported deliverable.
Treat the returned packet as the source of truth for voice, format rules, and anti-AI writing guidance.

4. Choose the right supporting context path.
Use `search_knowledge_base(query)` for factual retrieval, source material, examples, and idea mining from the selected Ghostbase space.
Use the `ai-cole` subagent for strategic review, prioritization, positioning, structural decisions, or messaging judgment after material has been grounded.

For ideation-heavy requests:
- If the user is unsure what to write, what angle to take, or what examples to use, call `search_knowledge_base` immediately after `prepare_writing`.
- Use idea-mining queries aimed at themes, stories, lessons, examples, or recurring topics in the active space.
- Treat `search_knowledge_base` as the primary tool for topic discovery and first-pass hook material.
- Delegate to the `ai-cole` subagent only after options exist and the user needs help judging, narrowing, or strategically reframing them.

For direct drafting or rewriting:
- If the user already knows what they want to say, call `prepare_writing` first.
- Call `search_knowledge_base` only when the draft needs client-specific facts, examples, proof, or source material.
- Delegate to the `ai-cole` subagent only when the user wants messaging help, positioning help, or a strategic review of the direction.

5. Draft or revise after the packet is loaded.
Use the packet as the primary instruction set.
Blend in grounded facts and AI Cole guidance only where they materially improve the draft.

6. Re-run tools when the task changes.
If the user changes the client or space, run `list_spaces` if needed and then `set_active_space` again.
If the user changes the format, run `prepare_writing` again.
If new factual claims appear, run `search_knowledge_base` again with narrower queries.
If the user says they do not know what to write, run `search_knowledge_base` to mine ideas from the active space before attempting a draft.

Rules:
- Do not draft a supported format before `prepare_writing` unless the user explicitly asks for a rough non-Ghostbase draft.
- Prefer the saved active space over passing `client_id`; use `client_id` only as a one-off override when necessary.
- Ask a clarifying question when the format is genuinely ambiguous instead of guessing.
- If the requested format is unsupported, say so explicitly instead of silently mapping it to something else.
- Use `search_knowledge_base` for topics, hook candidates, examples, and ideas grounded in the client's own knowledge; use the `ai-cole` subagent for judgment, prioritization, critique, framing, and messaging strategy.
- `finalize` is optional and currently low-value; do not rely on it as part of the core workflow.
