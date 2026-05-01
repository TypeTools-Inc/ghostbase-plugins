---
name: write
description: Use when the user wants Ghostbase-assisted drafting, rewriting, editing, outlining, repurposing, or idea generation for audience-facing writing such as LinkedIn posts, emails, newsletters, articles, tweets, or another writing format.
---

# Ghostbase Write

If this skill is invoked directly, treat `$ARGUMENTS` as the user's writing request.

Use this skill as the Ghostbase writing workflow. The MCP tools provide the current capabilities and packet content; this skill decides when and how to combine them.

Quick start:

1. Define the job: format, audience, goal, source material, and whether the user wants ideas, a first draft, a rewrite, or a critique.
2. Set the working space with `list_spaces` and `set_active_space` when the client or active space matters.
3. Gather direction before drafting. Use `search_knowledge_base` for facts, stories, examples, ideas, and source material. Use `ask_ai_cole` only for strategic writing judgment, business positioning, message-market fit, or a stuck point the packet cannot solve.
4. For LinkedIn or X posts, call `verify_originality` once the topic, hook, thesis, or angle is clear enough to compare against prior posts.
5. Call `load_writing_packet` with the closest supported `format` value from the tool schema, then draft or revise using the returned packet as the source of truth.

Workflow:

0. If Ghostbase tools are unavailable, tell the user to connect the Ghostbase connector or plugin, then stop.

1. Select the space
Use `list_spaces` when the active client is unclear or the user names a client. Use `set_active_space` with `space_name` or `space_id` before space-aware calls.

2. Classify the writing task
Infer the format from the request when it is obvious. Use the closest supported `format` value from the `load_writing_packet` tool schema. Use `format="other"` only when none of the more specific formats match; it provides voice and anti-AI writing guidance without format-specific playbooks.

Ask one clarifying question when the format or audience is genuinely ambiguous and the wrong choice would change the draft.

3. Choose the supporting path
For ideation-heavy requests, search the knowledge base first. Mine for themes, stories, lessons, examples, recurring arguments, and source material. If the user is still stuck on what strategic direction or positioning to choose, use `ask_ai_cole` with the strongest available context.

Use `ask_ai_cole` only when the user is stuck on the strategic direction, business positioning, audience promise, message-market fit, or the larger writing strategy behind the piece. Do not use it for raw outlines, normal structure, sequencing, template choice, or routine drafting mechanics.

For direct drafting or rewriting, use the user's stated topic, hook, thesis, or angle directly. Search the knowledge base only when the draft needs client-specific facts, proof, examples, or source material. Use `ask_ai_cole` when the user asks for strategic messaging help, positioning help, or business-level critique.

For LinkedIn posts, use `search_templates(format="linkedin", query?)` after the angle is clear when a body structure would help. Pick the best-fit template and pass its `id` as `template_id` into `load_writing_packet(format="linkedin")`.

Use `search_proven_hooks(format="linkedin", query?)` only when the user explicitly asks for more hook options, different openings, or a fresh hook direction beyond the packet's selected proven hooks.

4. Check originality for social posts
For LinkedIn or X posts, call `verify_originality(format, query)` once the intended topic, hook, thesis, or angle is clear, and do it before loading the packet. Treat the result as framing guidance, not a veto. Repeated topics are normal; use the result to avoid echoing prior hooks, angles, openings, or examples.

5. Load the packet
Call `load_writing_packet` after the direction is set. The returned packet is the source of truth for voice, format rules, anti-AI guidance, and any format-specific playbooks.

For LinkedIn, if the packet includes `assistantWritingPacket`, treat it as the primary drafting layer:
- `corePlaybook` = non-negotiable LinkedIn rules
- `selectedTemplate` = the chosen body structure
- `selectedProvenHooks` = proven hook options linked to that template
- `voiceId` = author voice guidance
- `antiAiWritingGuide` = anti-AI writing guidance

6. Draft or revise
Use the packet as the instruction set. Blend in grounded facts, retrieved examples, and AI Cole guidance only where they materially improve the piece. Preserve the user's core point unless they ask for a new angle.

7. Re-run tools when the task changes
If the user changes the space, call `set_active_space` again. If the format changes, call `load_writing_packet` again. If the core angle changes for LinkedIn or X, call `verify_originality` again. If new factual claims appear, run a narrower `search_knowledge_base` query.

Rules:
- Do not draft a supported format before loading the matching Ghostbase packet unless the user explicitly asks for a rough non-Ghostbase draft.
- Do not skip `verify_originality` before drafting a LinkedIn or X post when originality is relevant to the request.
- Do not call `load_writing_packet(format="linkedin")` or `load_writing_packet(format="tweet")` until the topic, hook, thesis, or angle is clear enough to verify originality.
- All space-aware Ghostbase MCP tools use the saved active space.
- When `verify_originality` finds overlap, prefer changing the angle, hook, examples, or takeaway before changing the topic completely.
- Ask a clarifying question when the format is genuinely ambiguous instead of guessing.
- Do not call `search_proven_hooks` by default for LinkedIn drafting. Use it only when the user explicitly asks for additional or different hook options.
- `finalize` is optional and currently low-value; do not rely on it as part of the core workflow.
