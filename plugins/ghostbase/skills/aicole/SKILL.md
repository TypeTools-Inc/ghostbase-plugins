---
name: aicole
description: Use when the user wants AI Cole's strategic judgment on positioning, messaging, structure, hook quality, angle selection, critique, or prioritization. This skill teaches what AI Cole is, when to call `ask_ai_cole`, and how to present the result.
---

# Ghostbase AI Cole

If this skill is invoked directly, treat `$ARGUMENTS` as the user's question for AI Cole.

AI Cole is Ghostbase's Nicolas Cole strategy layer. Use it when the user wants judgment, critique, or a sharper strategic decision. Do not use it as a replacement for factual retrieval from the client's space.

Who AI Cole is:
- Nicolas Cole
- Headline: Co-Founder Ship 30 for 30, Premium Ghostwriting Academy
- Bio: Nicolas Cole is a writer, serial entrepreneur, ghostwriter, and author. He has generated over a billion views on his writing online, built some of the largest digital writing programs, and helped over 10,000 people start writing online. He has also ghostwritten for over 300 different industry leaders, CEOs, Silicon Valley founders, executives, and New York Times best-selling authors.

What AI Cole is for:
- strategic judgment
- messaging and positioning advice
- critique of hooks, angles, openings, and structure
- helping the user decide what is strongest, weakest, or most worth pursuing
- Nicolas Cole-style perspective on what to emphasize, cut, sharpen, or reframe

What AI Cole is not for:
- first-pass factual retrieval
- mining the client's knowledge base for examples or source material
- replacing `search_knowledge_base` when the user needs grounded evidence or ideas from their own corpus

Use `ask_ai_cole(question, context?)` when the user needs:
- positioning help
- messaging judgment
- critique of a hook, angle, structure, or draft direction
- prioritization between multiple options
- stronger framing after ideas or source material already exist
- Nicolas Cole-style strategic guidance on what to emphasize, cut, or double down on

Do not use `ask_ai_cole` first when the user needs:
- facts
- examples
- proof
- topic mining from the client's own body of work
- source material from the selected space

In those cases, use `search_knowledge_base` first. Then call `ask_ai_cole` once there is actual material to evaluate.

Recommended workflow:

1. Confirm the active space when client context matters.
If the user names a client or the working space is unclear, call `list_spaces`.
Call `set_active_space` before `ask_ai_cole` when you need the answer grounded in the correct Ghostbase space.

2. Ground first when the problem is under-informed.
If the user is unsure what to write, what examples to use, or what themes keep showing up in the client's work, call `search_knowledge_base` first.

3. Ask AI Cole a strategic question, not a vague one.
Best `ask_ai_cole` questions are explicit about the decision:
- "Which of these two LinkedIn angles is stronger and why?"
- "What is weak about this hook?"
- "How should this draft be reframed for founders?"
- "What should be the core takeaway of this post?"

4. Pass concise context when it sharpens the judgment.
Good `context` examples:
- the candidate hooks
- the draft opening
- the target audience
- the post goal
- the grounded fragments or facts that matter

Do not overload `context` with unnecessary filler.

5. Present the result as strategic guidance, not raw tool output.
`ask_ai_cole` returns a structured result that includes:
- `answer`: the main AI Cole response
- `citations`: supporting source references

When you reply to the user:
- lead with the answer
- summarize the key recommendation in plain language
- use the citations only when they add confidence or traceability
- do not dump the raw JSON unless the user explicitly asks for it

Interpretation rules:
- Treat the `answer` as Ghostbase's recommended strategic direction.
- If AI Cole identifies a stronger option, say which option wins and why.
- If AI Cole critiques a draft, separate the diagnosis from the suggested change.
- If the answer is broad, convert it into concrete next steps for the user.

Rules:
- Use `search_knowledge_base` for grounded ideas, examples, and facts.
- Use `ask_ai_cole` for judgment, prioritization, critique, framing, and messaging strategy.
- If the user already has material, go straight to `ask_ai_cole`.
- If the user has no material yet, ground first, then call `ask_ai_cole`.
- Prefer one precise AI Cole question over several overlapping ones.
