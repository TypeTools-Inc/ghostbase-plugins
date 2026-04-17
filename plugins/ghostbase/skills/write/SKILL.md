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
If more than one format is plausible, ask a clarifying question before calling `prepare_writing` or `verify_originality`.
If the requested deliverable is unsupported, say so explicitly.

3. Decide the topic, hook, thesis, or angle before loading the packet when originality matters.
For LinkedIn posts or X posts, do not call `prepare_writing` until the intended topic, hook, thesis, or angle is clear enough to check originality.
If the user is still exploring what to say, use `search_knowledge_base` and `ask_ai_cole` first to land on the direction.

4. Choose the right supporting context path.
Use `search_knowledge_base(query)` for factual retrieval, source material, examples, and idea mining from the selected Ghostbase space.
Use `ask_ai_cole(question, context?)` for strategic review, prioritization, positioning, structural decisions, or messaging judgment after material has been grounded.
Use `verify_originality(format, query)` for LinkedIn or X posts once the intended topic, hook, thesis, or angle is clear, and do that before `prepare_writing`.

For ideation-heavy requests:
- If the user is unsure what to write, what angle to take, or what examples to use, call `search_knowledge_base` first.
- Use idea-mining queries aimed at themes, stories, lessons, examples, or recurring topics in the active space.
- Treat `search_knowledge_base` as the primary tool for topic discovery and first-pass hook material.
- Call `ask_ai_cole` only after options exist and the user needs help judging, narrowing, or strategically reframing them.
- For LinkedIn posts or X posts, once the angle is chosen, call `verify_originality` before loading the packet.

For direct drafting or rewriting:
- If the user already knows what they want to say, use that topic, hook, thesis, or angle directly.
- For LinkedIn posts or X posts, call `verify_originality` with the intended topic, hook, thesis, or angle before loading the packet.
- Call `search_knowledge_base` only when the draft needs client-specific facts, examples, proof, or source material.
- Call `ask_ai_cole` only when the user wants messaging help, positioning help, or a strategic review of the direction.

5. Prepare the writing packet after the direction is set.
Call `prepare_writing(format, topic?)` after the angle is clear and, for LinkedIn or X posts, after `verify_originality`.
Treat the returned packet as the source of truth for voice, format rules, and anti-AI writing guidance.

6. Draft or revise after the packet is loaded.
Use the packet as the primary instruction set.
Blend in grounded facts and AI Cole guidance only where they materially improve the draft.

7. Re-run tools when the task changes.
If the user changes the client or space, run `list_spaces` if needed and then `set_active_space` again.
If the user changes the format, run `prepare_writing` again.
If the user changes the core angle for a LinkedIn post or X post, run `verify_originality` again before drafting.
If new factual claims appear, run `search_knowledge_base` again with narrower queries.
If the user says they do not know what to write, run `search_knowledge_base` to mine ideas from the active space before attempting a draft.

Rules:
- Do not draft a supported format before `prepare_writing` unless the user explicitly asks for a rough non-Ghostbase draft.
- Do not skip `verify_originality` before drafting a LinkedIn or X post when originality is relevant to the request.
- Do not call `prepare_writing` for a LinkedIn post or X post until the topic, hook, thesis, or angle is clear enough to verify originality.
- All space-aware Ghostbase MCP tools use the saved active space.
- Ask a clarifying question when the format is genuinely ambiguous instead of guessing.
- If the requested format is unsupported, say so explicitly instead of silently mapping it to something else.
- Use `search_knowledge_base` for topics, hook candidates, examples, and ideas grounded in the client's own knowledge; use `ask_ai_cole` for judgment, prioritization, critique, framing, and messaging strategy.
- `finalize` is optional and currently low-value; do not rely on it as part of the core workflow.
