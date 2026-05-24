# Notes — style criteria

Editorial guidance for notes published at `/notes`. These rules apply to every `.mdx` file under [content/notes/](../content/notes/) — project writeups, asides, observations, anything that lives there.

If you (or Claude) are about to write a note, read this first.

## Purpose

Notes are short, personal posts. A corner of the site for things that don't fit cleanly into a project page or a photo: what I built, what I tried, what surprised me, the occasional opinion. Not a manifesto blog, not a newsletter, not SEO bait.

A note should leave the reader with one concrete thing — an idea, a trick, a recommendation — not a vague feeling.

## Voice

- **First person.** "I built X" beats "X was built."
- **Casual but not chummy.** Talk like you'd explain it to a smart friend over coffee, not like you're hosting a podcast.
- **Specific over generic.** "Three wikis in three tabs" beats "managing multiple sources." One concrete detail is worth five abstract ones.
- **Dry humor is fine.** Self-aware framing ("intentionally boring stack") is fine. Don't lean on it — once per post, max.
- **No filler openers.** Skip "In today's fast-paced world…" and "I'm excited to announce…" Start with the thing.

## Length

Aim for **80–400 words**. If it crosses 500, ask whether it wants to be two notes — or a project page instead. One scroll on a phone is the right ballpark.

Brevity isn't a vow of silence. Say enough to make the point land. But don't pad.

## Structure

- **Lede** — one or two sentences that name the thing and the itch.
- **Body** — one or two beats. Pick a single interesting angle and dig in; don't list everything you could say.
- **Kicker** — a short close. Status update, link, "more soon," whatever fits. Don't write a trailing summary that repeats the body.

Headings (`##`) are optional and usually unnecessary for short notes. Reach for them only when the post genuinely has 2–3 distinct sections.

## Frontmatter

Every note needs this block at the top:

```yaml
---
title: Stardew Search
date: 2026-05-24
summary: One-line preview shown on the /notes index and in OG/RSS.
---
```

- `title` — required. Plain string, no trailing period.
- `date` — required, ISO `YYYY-MM-DD`. Unquoted is fine; the loader at [lib/content/notes.ts](../lib/content/notes.ts) normalizes `Date` and `string` inputs to a stable string.
- `summary` — optional but recommended. Used on the index page, in the RSS feed at [app/rss.xml/route.ts](../app/rss.xml/route.ts), and by the OG/Twitter card defaults. One sentence, ~120 characters.

## Do

- Lead with the concrete problem or moment that made you write this.
- Pick one interesting technical detail and explain it well, with a real example.
- Link to the thing you're writing about (repo, demo, paper, photo).
- Use bullet lists when you have a real list. Three is the minimum to justify one.
- Use code blocks (fenced with a language) when the code earns it. Inline `code` for identifiers and commands.
- Use *italics* for emphasis on a quoted phrase or example query.
- Use **bold** sparingly — for the stack one-liner, a key term, the kicker.

## Don't

- Don't write marketing voice. No "thrilled," "delighted," "unlock," "leverage."
- Don't write exhaustive feature lists. Pick one. Leave the rest for the project page.
- Don't recap what you just said. The last paragraph is for what's next, not for the TL;DR.
- Don't fabricate links or URLs. If the live URL doesn't exist yet, link the repo or leave it out.
- Don't add comments inside MDX explaining your choices. The note is the comment.
- Don't lean on em-dashes or similar "AI-tell" characters. Commas, parens, and semicolons usually do the same work.

## File conventions

- Path: `content/notes/<kebab-case-slug>.mdx`. The slug becomes the URL at `/notes/<slug>`.
- Slug should match the title's essence (`stardew-search`, not `i-built-a-stardew-valley-search-tool`).
- Extension is `.mdx` — `.md` files are ignored by [lib/content/notes.ts](../lib/content/notes.ts).
- No date prefix in the filename — the `date` frontmatter field is the source of truth, and the index is sorted by it.

## MDX features available

Notes render inside the `Prose` primitive at [components/primitives/Prose.tsx](../components/primitives/Prose.tsx), which already styles:

- Body text (sans, 1.65 line-height, 65ch max-width).
- `h1`–`h4` (you almost never want `h1` — the title handles that).
- Links (accent color, underlined, hover opacity).
- Inline `code` and fenced ```` ``` ```` blocks (dark background, mono).
- Blockquotes (accent left border, italic, muted color).
- Ordered and unordered lists.
- `<hr/>` and images (rounded corners).

You don't need to add wrapper components or custom styles for any of the above. Just write Markdown. If you find yourself reaching for a custom MDX component, ask whether the post really needs it — the answer is usually no.
