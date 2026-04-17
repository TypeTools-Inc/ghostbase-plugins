---
name: research
description: Use when the user needs Ghostbase-backed research, factual grounding, idea mining, or strategic review before or during writing. This skill teaches when to call `search_knowledge_base` versus `ask_ai_cole`.
---

# Ghostbase Research

If this skill is invoked directly, treat `$ARGUMENTS` as the user's research question.

Choose the Ghostbase retrieval tool based on the type of help the user needs.

Use `search_knowledge_base(query)` when the user needs:
- factual support
- client-specific evidence
- examples from the active space
- source material to back up claims
- writing ideas or inspiration from the client's existing knowledge
- candidate topics, angles, or patterns when they are not sure what to write

Use `ask_ai_cole(question, context?)` when the user needs:
- strategic advice
- positioning
- messaging judgment
- critique of a proposed angle, hook, or structure
- offer or audience guidance

Note: `ask_ai_cole` always runs against the user's personal Ghostbase space. Use `search_knowledge_base` first when you need facts, examples, or source material from the active client space.

Recommended order:

1. Confirm the active space if client context matters.
Run `list_spaces` when the working space is unclear.
Run `set_active_space` when you need to save a different working space.

2. Start with the narrowest useful retrieval call.
For `search_knowledge_base`, prefer focused factual or idea-mining queries over broad topic dumps.
When the user is blocked on ideation, frame the query around likely themes, examples, stories, lessons, or source material from the active space.
When calling `ask_ai_cole`, include concise context only when it sharpens the coaching question.

3. Combine both tools only when the task needs both facts and strategy.
Typical pattern:
- `search_knowledge_base` first for evidence
- `ask_ai_cole` second for interpretation, prioritization, critique, or framing

Rules:
- Do not use `ask_ai_cole` as a replacement for factual grounding.
- Do not use `ask_ai_cole` as the first pass for raw topic ideation when `search_knowledge_base` can surface better grounded options.
- Do not skip `search_knowledge_base` when the user needs idea generation based on their own body of knowledge.
- Do not use `search_knowledge_base` when the user is really asking for messaging judgment or coaching.
- When retrieval results are weak, refine the query rather than pretending the first result set is sufficient.
