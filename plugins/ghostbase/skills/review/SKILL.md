---
name: review
description: Use when the user wants Ghostbase-backed editorial review of an existing draft, including AI-pattern detection, active-space voice scoring, and general quality critique for a supported format such as LinkedIn posts, emails, newsletters, articles, or tweets.
---

# Ghostbase Review

If this skill is invoked directly, treat `$ARGUMENTS` as the draft-review request.

Use the Ghostbase MCP tools in this order unless a step is clearly unnecessary.

1. Set or confirm the active space.
If the user names a client or space, or if the working space is unclear, call `list_spaces`.
Call `set_active_space` with `space_name` or `space_id` to save the correct active space.

2. Determine the format before reviewing.
Infer the format from the request when it is obvious.
Use these mappings:
- LinkedIn post -> `linkedin`
- Email -> `email`
- Newsletter -> `newsletter`
- Article or blog post -> `article`
- Tweet or X post -> `tweet`
If more than one format is plausible, ask a clarifying question before calling `review_draft`.
If the requested deliverable is unsupported, say so explicitly.

3. Run the structured review.
Call `review_draft(content, format)` on the provided draft.
Treat the returned JSON as the source of truth for:
- AI-pattern findings
- active-space voice accuracy score
- general quality review
- overall score and priority actions

4. Run originality verification when the user asks whether the piece is too close to existing LinkedIn or X posts.
For LinkedIn posts or X posts, call `verify_originality(format, query)` when the user wants to know whether the topic, hook, thesis, or angle overlaps too closely with previously published same-platform posts in the active space.
Use the draft's core hook, thesis, or angle as the query.
Treat the result as guidance on what to avoid repeating. Repeated topics are normal; the main question is whether the draft needs a fresher angle, opening, or approach.

5. Present the result as an editorial review, not raw tool output.
When you reply to the user:
- lead with the overall score and the highest-priority issues
- call out any AI patterns with the quoted snippets and locations
- explain the voice score plainly
- summarize the strongest quality issues and the next edits to make
- include the originality result when you ran `verify_originality`, with emphasis on whether the topic is still usable and which hooks, angles, or openings to avoid echoing
- do not dump the raw JSON unless the user explicitly asks for it

6. Rewrite only when asked.
If the user wants the draft fixed after the review:
- use the review result as the edit brief
- if format-specific writing guidance is needed, call the matching load tool:
- LinkedIn -> `load_linkedin_post_packet`
- Email -> `load_email_packet`
- Newsletter -> `load_email_packet`
- Article -> `load_article_packet`
- X post -> `load_x_post_packet`
- then revise the draft

Rules:
- Do not run `review_draft` until the format is known.
- Do not run `verify_originality` for formats other than LinkedIn posts or X posts.
- Do not guess the format when it is genuinely ambiguous.
- All space-aware Ghostbase MCP tools use the saved active space.
- Do not frame a non-fresh topic as a failure by default; use the originality result to explain whether the draft simply needs a different angle or opening.
- If the user asks only for critique, stop after the review and recommendations.
- If the user asks for a revision after the review, preserve the user's core message and fix the highest-priority issues first.
