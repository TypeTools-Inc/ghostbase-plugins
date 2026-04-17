---
description: Ghostbase writing workflow for drafting, rewriting, outlining, or idea generation in supported formats.
argument-hint: <what to write>
---

# Ghostbase Write

Treat `$ARGUMENTS` as the user's writing request.

Use the Ghostbase workflow in this order unless a step is clearly unnecessary:

1. Confirm the active space when the client or working space is unclear.
2. Set the active space before any space-aware Ghostbase request.
3. Infer the format when it is obvious, otherwise ask a concise clarifying question.
4. Call `prepare_writing` before drafting any supported Ghostbase format.
5. Use `search_knowledge_base` for grounded ideas, examples, facts, and source material.
6. Use the `ai-cole` subagent for strategic review, positioning, structure, or messaging judgment after the material is grounded.
7. Draft or revise using the loaded packet as the source of truth.

Rules:

- Treat the packet returned by `prepare_writing` as authoritative for voice, format, and natural-writing guidance.
- Use `search_knowledge_base` when the user is unsure what to write, needs angles, or needs supporting examples from the selected space.
- Do not skip packet loading for supported formats unless the user explicitly wants a rough non-Ghostbase draft.

