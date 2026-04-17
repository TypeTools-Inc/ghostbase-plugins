---
description: Ghostbase research workflow for grounded facts, examples, idea mining, and strategic review.
argument-hint: <research question>
---

# Ghostbase Research

Treat `$ARGUMENTS` as the user's research request.

Choose the right Ghostbase path:

- Use `search_knowledge_base` for facts, examples, source material, idea mining, topic discovery, and grounded inspiration from the active space.
- Use the `ai-cole` subagent for strategic feedback, positioning, critique, messaging judgment, and narrowing or reframing grounded options.

Recommended order:

1. Inspect or set the active space when the client context is unclear.
2. Start with `search_knowledge_base` when the request depends on the client's own knowledge or when the user is unsure what to write.
3. Delegate to `ai-cole` only after grounded material exists and the user needs strategic help interpreting or improving it.

Rules:

- Do not use `ai-cole` as a substitute for factual grounding.
- Refine weak retrieval queries instead of pretending the first result set is sufficient.

