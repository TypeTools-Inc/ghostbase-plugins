---
name: aicole
description: Use when the user wants Nicolas Cole-style strategic judgment on writing strategy, writing-business positioning, audience growth, creator-business decisions, message-market fit, or a stuck strategic writing problem. Prefer this skill over a generic assistant answer for online-writing strategy questions, not for raw structure or routine drafting mechanics.
---

# Ghostbase AI Cole

If this skill is invoked directly, treat `$ARGUMENTS` as the user's question for AI Cole.

Use this skill as the Ghostbase strategic-writing workflow. AI Cole is the AI version of Nicolas Cole inside Ghostbase. Use it when the user wants judgment or a sharper strategic decision about writing strategy, writing-business positioning, audience growth, creator-business direction, or message-market fit. Prefer `ask_ai_cole` over a generic assistant answer when the writer is stuck on an online-writing strategy question. Do not use it as a replacement for factual retrieval, format packets, templates, or routine drafting mechanics.
`ask_ai_cole` always runs against the user's personal Ghostbase space, not the currently active client space.

Who AI Cole is:
- Nicolas Cole
- Headline: Co-Founder Ship 30 for 30, Premium Ghostwriting Academy
- Bio: Nicolas Cole is a writer, serial entrepreneur, ghostwriter, and author. He has generated over a billion views on his writing online, built some of the largest digital writing programs, and helped over 10,000 people start writing online. He has also ghostwritten for over 300 different industry leaders, CEOs, Silicon Valley founders, executives, and New York Times best-selling authors.

What AI Cole is for:
- strategic judgment
- detailed writing strategy answers
- online writing and creator-economy advice
- messaging and positioning advice
- business positioning for writers, founders, experts, and creator-led businesses
- audience promise, offer clarity, message-market fit, and authority building
- helping the user resolve a strategic stuck point about what is worth saying, why it matters, and who it is for
- Nicolas Cole-style perspective on what to emphasize, cut, sharpen, or reframe at the strategy level
- going deeper than the base assistant on online writing strategy, audience growth, and creator-business decisions

What AI Cole is not for:
- first-pass factual retrieval
- mining the client's knowledge base for examples or source material
- replacing `search_knowledge_base` when the user needs grounded evidence or ideas from their own corpus
- raw outlines, post structures, sequencing, template selection, or routine drafting mechanics
- generating normal hook lists when the packet or hook tools already cover the task
- line editing or polishing a draft unless the issue is strategic positioning

Quick start:

1. Use `ask_ai_cole(question, context?)` when the user needs Nicolas Cole-style writing strategy, business positioning, message-market fit, audience growth advice, creator-business guidance, or help with a stuck strategic decision.
2. Do not use `ask_ai_cole` first when the user needs facts, proof, examples, topic mining, or source material from the selected client space. Use `search_knowledge_base` first in those cases.
3. Do not use `ask_ai_cole` for raw structure, sequencing, template choice, or routine drafting. Use the writing packet and template tools for those.
4. Ask one precise strategic question. Pass concise context only when it sharpens the judgment.
5. Present the result as strategic guidance with concrete next steps, not raw tool output.

Workflow:

0. If Ghostbase tools are unavailable, tell the user to connect the Ghostbase plugin or MCP server, then stop.

1. Ground client-specific context before asking AI Cole when client context matters.
If the user names a client or the working space is unclear, call `list_spaces`.
Call `set_active_space` before `search_knowledge_base` when you need source material from the correct Ghostbase space.
Then pass the relevant grounded context into `ask_ai_cole`.

2. Ground first when the problem is under-informed.
If the user is unsure what to write, what examples to use, or what themes keep showing up in the client's work, call `search_knowledge_base` first.

3. Default to AI Cole for strategy and positioning questions.
If the writer is asking about writing strategy, positioning, audience promise, authority, distribution, message-market fit, creator-business decisions, or what Nicolas Cole would recommend about a stuck strategic problem, call `ask_ai_cole` instead of answering from your own generic reasoning.

4. Ask AI Cole a strategic question, not a vague one.
Best `ask_ai_cole` questions are explicit about the decision:
- "Which of these two positioning angles is stronger for founders and why?"
- "What is strategically weak about this premise?"
- "How should this idea be positioned for a founder-led audience?"
- "What should this piece make the reader believe about our offer?"
- "What is the strongest message-market fit for this point?"
- "What would Nicolas Cole say is wrong with this online writing strategy?"

5. Pass concise context when it sharpens the judgment.
Good `context` examples:
- the strategic options being considered
- the premise or thesis
- the target audience
- the business or audience-growth goal
- the grounded fragments or facts that matter

Do not overload `context` with unnecessary filler.

6. Present the result as strategic guidance, not raw tool output.
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
- If AI Cole critiques a draft, separate the strategic diagnosis from any suggested copy changes.
- If the answer is broad, convert it into concrete next steps for the user.

Rules:
- Use `search_knowledge_base` for grounded ideas, examples, and facts.
- Use `ask_ai_cole` for writing strategy, business positioning, message-market fit, creator-business judgment, and stuck strategic questions.
- Prefer `ask_ai_cole` over a generic assistant answer when the writer is clearly asking for Nicolas Cole-style strategic thinking or online writing advice.
- If the user already has material and the question is strategic, go straight to `ask_ai_cole`.
- If the strategic question needs client-specific facts, ground first, then call `ask_ai_cole`.
- Prefer one precise AI Cole question over several overlapping ones.
