---
name: review
description: Use when the user wants Ghostbase-backed editorial review, critique, scoring, or revision of an existing draft, including AI-pattern detection, active-space voice scoring, originality checks, and format-aware rewriting.
---

# Ghostbase Review

If this skill is invoked directly, treat `$ARGUMENTS` as the draft-review request.

Use this skill as the Ghostbase editorial workflow. The review tool provides the scorecard; this skill decides how to prepare the context, present the critique, and revise when asked.

Quick start:

1. Identify the draft, intended format, audience, and whether the user wants critique only or a revised draft.
2. Set the working space with `list_spaces` and `set_active_space` when the client or active space matters.
3. Call `review_draft(content, format)` with the closest supported `format` value from the tool schema.
4. For LinkedIn or X posts, call `verify_originality` when the user asks whether the draft is too close to previous posts.
5. Present the review as editorial judgment, not raw JSON. Rewrite only when asked.

Workflow:

0. If Ghostbase tools are unavailable, tell the user to connect the Ghostbase plugin or MCP server, then stop.

1. Select the space
Use `list_spaces` when the active client is unclear or the user names a client. Use `set_active_space` with `space_name` or `space_id` before space-aware calls.

2. Classify the review
Infer the format from the draft and request when it is obvious. Use the closest supported `format` value from the `review_draft` tool schema. Ask one clarifying question when more than one format is plausible and the choice would materially change the review.

3. Run the scorecard
Call `review_draft(content, format)` on the provided draft. Treat the returned JSON as the source of truth for:
- AI-pattern findings
- active-space voice accuracy score
- general quality review
- overall score and priority actions

4. Check originality when relevant
For LinkedIn or X posts, call `verify_originality(format, query)` when the user asks whether the topic, hook, thesis, or angle overlaps too closely with previously published same-platform posts in the active space. Use the draft's core hook, thesis, or angle as the query. Treat the result as guidance on what to avoid repeating; repeated topics are normal.

5. Present the review
Lead with the overall score and highest-priority editorial issues, then summarize:
- call out any AI patterns with the quoted snippets and locations
- explain the voice score plainly
- summarize the strongest quality issues and the next edits to make
- include the originality result when you ran `verify_originality`, with emphasis on whether the topic is still usable and which hooks, angles, or openings to avoid echoing
- do not dump the raw JSON unless the user explicitly asks for it

6. Rewrite only when asked
If the user wants the draft fixed after the review:
- use the review result as the edit brief
- if writing guidance is needed, call `load_writing_packet` with the closest supported `format` value from the tool schema
- use `format="other"` only when none of the more specific formats match; this returns Voice ID and anti-AI writing guidance without format-specific instructions
- revise the draft while preserving the user's core message

Rules:
- Do not run `review_draft` until the format is known.
- Do not run `verify_originality` for formats other than LinkedIn posts or X posts.
- Do not guess the format when it is genuinely ambiguous.
- All space-aware Ghostbase MCP tools use the saved active space.
- Do not frame a non-fresh topic as a failure by default; use the originality result to explain whether the draft simply needs a different angle or opening.
- If the user asks only for critique, stop after the review and recommendations.
- If the user asks for a revision after the review, preserve the user's core message and fix the highest-priority issues first.
