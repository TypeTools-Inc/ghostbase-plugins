---
name: research
description: Use when the user needs Ghostbase-backed research, factual grounding, idea mining, or writing-strategy help before or during writing. This skill teaches when to call `search_knowledge_base` versus `ask_ai_cole`.
---

# Ghostbase Research

If this skill is invoked directly, treat `$ARGUMENTS` as the user's research question.

Use this skill as the Ghostbase context-gathering workflow before or during writing. It decides whether the assistant needs grounded material, strategic writing judgment, or both.

Quick start:

1. Set the active space with `list_spaces` and `set_active_space` when client context matters.
2. Use `search_knowledge_base` for facts, evidence, examples, stories, source material, idea mining, and grounded topic discovery.
3. Use `ask_ai_cole` for writing strategy, business positioning, audience promise, message-market fit, creator-business advice, or a stuck strategic decision.
4. When a task needs both, search first, then pass concise grounded context into `ask_ai_cole`.

Workflow:

0. If Ghostbase tools are unavailable, tell the user to connect the Ghostbase plugin or MCP server, then stop.

1. Select the space
Run `list_spaces` when the working space is unclear. Run `set_active_space` when the user names a client or when source material must come from a specific Ghostbase space.

2. Choose the retrieval path
Use `search_knowledge_base(query)` when the user needs factual support, client-specific evidence, examples from the active space, source material to back up claims, writing ideas, inspiration, or candidate topics and angles.

Use `ask_ai_cole(question, context?)` when the user needs writing strategy, business positioning, messaging judgment, offer guidance, audience guidance, message-market fit, creator-business advice, or a Nicolas Cole-style answer to a stuck strategic question.

3. Search narrowly
For `search_knowledge_base`, prefer focused factual or idea-mining queries over broad topic dumps. When the user is blocked on ideation, frame the query around likely themes, examples, stories, lessons, objections, or source material from the active space.

4. Add strategy after grounding
When the task needs facts and strategic judgment, use `search_knowledge_base` first, then call `ask_ai_cole` with concise context for positioning, message-market fit, or the larger writing/business decision.

5. Return useful synthesis
Do not dump raw retrieval results. Summarize the usable facts, examples, angles, and strategic implications. If the user is writing next, recommend whether to load a writing packet.

Rules:
- Do not use `ask_ai_cole` as a replacement for factual grounding.
- Do not use `ask_ai_cole` as the first pass for raw topic ideation when `search_knowledge_base` can surface better grounded options.
- Do not skip `search_knowledge_base` when the user needs idea generation based on their own body of knowledge.
- Do not use `search_knowledge_base` when the user is really asking for messaging judgment or coaching.
- Do not use `ask_ai_cole` for raw outlines, normal structure, sequencing, template choice, or routine drafting mechanics.
- When retrieval results are weak, refine the query rather than pretending the first result set is sufficient.
