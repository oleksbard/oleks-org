# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (Turbopack) on http://localhost:3000
- `npm run build` — production build (Turbopack)
- `npm start` — serve the built app
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript presets)
- `npm run photos:manifest` — regenerate [content/photos.ts](content/photos.ts) from images in [public/photos/](public/photos/) (extracts dimensions + base64 LQIP blur via `plaiceholder` + `sharp`)

There is no test runner configured.

## Architecture

Next.js 16 App Router with React 19 and styled-components 6. TypeScript strict, path alias `@/*` → repo root.

styled-components is wired up for SSR via three coordinated pieces — changing one without the others will break hydration or produce FOUC:

1. [next.config.ts](next.config.ts) sets `compiler.styledComponents: true` so SWC handles the babel-plugin-styled-components transform (stable class names, displayName, SSR identifier). It also pins `turbopack.root` to this directory because a parent dir contains another lockfile.
2. [lib/registry.tsx](lib/registry.tsx) is a client component that creates a `ServerStyleSheet` per request and flushes collected styles into the streamed HTML via `useServerInsertedHTML`. On the client it short-circuits and just renders children.
3. [app/layout.tsx](app/layout.tsx) wraps `{children}` in `<StyledComponentsRegistry>` so every route inherits the SSR-aware style collection. Inside the registry, [components/layout/ThemeProvider.tsx](components/layout/ThemeProvider.tsx) supplies the theme to `styled-components`' `ThemeProvider` and mounts [components/primitives/GlobalStyles.tsx](components/primitives/GlobalStyles.tsx) (a `createGlobalStyle` reset). Both are client components; the registry must wrap the theme provider, not the other way around, so SSR sheet flushing captures global + themed styles in one pass.

Any component that uses `styled` from `styled-components` (including `createGlobalStyle`) must be a Client Component (`"use client"`) — Server Components cannot render styled-components. Pages stay RSC and compose `"use client"` section components: [app/page.tsx](app/page.tsx) is an `async` RSC that fetches content via `Promise.all([getFeaturedGames(), getAllNotes()])` and hands plain data to [Hero](components/home/Hero.tsx) / [FeaturedGames](components/home/FeaturedGames.tsx) / [LatestNote](components/home/LatestNote.tsx). Mirror this shape for any new top-level page — data loading on the server, presentation in `"use client"` siblings under `components/<feature>/`.

### Theme & primitives

- [lib/theme.ts](lib/theme.ts) exports a frozen `theme` object (colors, type scale, spacing, motion tokens) and a `Theme` type derived from it.
- [styled.d.ts](styled.d.ts) augments `styled-components`' `DefaultTheme` to equal `Theme`, so `${({ theme }) => …}` is fully typed across the app.
- Reusable primitives live in [components/primitives/](components/primitives/) (`Container`, `Stack`, `Prose`, `GlobalStyles`). Feature components live next to their domain (`components/home/`, `components/games/`, etc.).

### Fonts

Three font CSS variables are wired in [app/layout.tsx](app/layout.tsx) via `next/font/google` and exposed on `<html>`:

- `--font-geist-sans` — body and display type.
- `--font-geist-mono` — captions, role lines, inline code.
- `--font-pixel` — pixel accent (currently `Press Start 2P`; can swap to a self-hosted face via `next/font/local` without touching consumers since they all reference `theme.font.pixel`).

### Layout chrome

Every route shares the same shell, mounted once in [app/layout.tsx](app/layout.tsx) inside the theme provider:

```
<Header /> <main>{children}</main> <Footer />
```

- [components/layout/Header.tsx](components/layout/Header.tsx) — pixel-font wordmark + primary nav (games & projects · photography · notes · about). The first nav item links to `/games` but its label reads "games & projects" — that section holds games plus other side projects. Active state is driven by [components/layout/NavLink.tsx](components/layout/NavLink.tsx) via `usePathname()`.
- [components/layout/Footer.tsx](components/layout/Footer.tsx) — single Elsewhere group (GitHub, LinkedIn, email, Notes RSS). GitHub and LinkedIn are real; `hello@oleks.dev` and `/rss.xml` are placeholders until real values are wired in.
- The `<main>` is unstyled in the layout itself; sticky-footer behavior comes from `body { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; }` in [components/primitives/GlobalStyles.tsx](components/primitives/GlobalStyles.tsx). Pages should render a top-level styled `<section>`, not their own `<main>`.
- Placeholder pages (`/about`) reuse [components/layout/PageStub.tsx](components/layout/PageStub.tsx) — kicker + display title + note + status. They become real pages by swapping the stub for a feature component.

### MDX content pipeline

`@next/mdx` is wired up in [next.config.ts](next.config.ts) (`pageExtensions` includes `md` and `mdx`; the export is wrapped in `withMDX(...)`). [mdx-components.tsx](mdx-components.tsx) at the repo root is **required** by Next 16's App Router — removing it breaks all MDX rendering. Keep it minimal; per-route style overrides go in the route's shell component (e.g. wrapping MDX in [components/primitives/Prose.tsx](components/primitives/Prose.tsx)).

Notes live as MDX files under [content/notes/](content/notes/) and are read at request time by [lib/content/notes.ts](lib/content/notes.ts) — an RSC-only loader that:

- Lists slugs via `fs.readdir`, filtering for `.mdx`.
- Parses frontmatter with `gray-matter`.
- Normalizes the `date` field: YAML auto-parses bare ISO dates into JS `Date` objects, so the loader converts both `Date` and `string` inputs back to `YYYY-MM-DD`. Quoting the date in frontmatter (`date: "2026-05-17"`) also works but is not required.

The dynamic note route at [app/notes/[slug]/page.tsx](app/notes/[slug]/page.tsx) uses the canonical Next 16 pattern: `await import(\`@/content/notes/${slug}.mdx\`)` for the body, `generateStaticParams` from the slug list, and `export const dynamicParams = false` so unknown slugs 404 instead of rendering at request time. The games pipeline at [app/games/[slug]/page.tsx](app/games/[slug]/page.tsx) + [lib/content/games.ts](lib/content/games.ts) mirrors this exact shape — when adding another MDX-backed section, copy this pair, not the notes pair (the games loader is richer: tech array, links object, cover, featured flag, year-based sort).

Frontmatter shapes (see seed files for canonical examples):

```yaml
# Notes — content/notes/<slug>.mdx
---
title: First note
date: 2026-05-17
summary: One-line preview.
---
```

```yaml
# Games — content/games/<slug>.mdx
---
title: Placeholder One
year: 2026
summary: One-line description.
tech: [TypeScript, Canvas, "Web Audio API"]
cover: /games/cover.png   # optional; falls back to a striped WIP block
links:
  live: https://example.com
  repo: https://github.com/...
featured: true            # surfaces on the home page later
---
```

Game covers should be pixel art served raw — the components pass `unoptimized` to `next/image` and apply `image-rendering: pixelated` so hard edges stay crisp at any scale.

### Photography

Photos live in [public/photos/](public/photos/) (originals or web-sized — anything `.jpg`/`.jpeg`/`.png`/`.webp`/`.avif`). [scripts/build-photo-manifest.ts](scripts/build-photo-manifest.ts) reads that directory, extracts dimensions + a 10px base64 LQIP via `plaiceholder` (which wraps `sharp`), and overwrites [content/photos.ts](content/photos.ts) with a typed `Photo[]`. The `tsx` runner is wired up as `npm run photos:manifest`.

[app/photography/page.tsx](app/photography/page.tsx) is a pure RSC that statically imports the manifest — no fs reads at runtime, so the manifest is bundled into the build. Add a photo by dropping the file into `public/photos/`, running the script, committing both the image and the regenerated manifest.

Visual pipeline (in [components/photography/](components/photography/)):

- **PhotoGrid** — CSS-columns masonry (2 / 3 / 4 columns at the `md` / `xl` breakpoints). `break-inside: avoid` per tile so images never split across columns. Reading order is column-then-row, which is the expected behavior for a visual gallery.
- **Lightbox** — `createPortal` into `document.body` so it escapes the section's stacking context. Locks `body { overflow: hidden }` on mount, listens for `Escape` / `ArrowLeft` / `ArrowRight`. Pure CSS keyframe animations (no `motion` dep). The portal is safe because the lightbox is conditionally rendered only after a user click, so it never SSRs.

Filenames become the `alt` text by default (`_` and `-` normalized to spaces). Override after-the-fact by editing the generated `content/photos.ts` if you need richer alts — but expect that change to be overwritten next time the script runs unless you also edit the script's `titleFromFilename`.

## Maintaining this file

Any change that alters architecture, introduces a new convention, or adds a non-obvious wiring (SSR boundaries, providers, build flags, path aliases, env vars, scripts) must be reflected here in the same change — this file is the source of truth for future agents.

When this file exceeds **250 lines**, split sections into topic files under `./docs/` (e.g. `docs/architecture.md`, `docs/styling.md`) and replace the section here with a one-line link: `- [Styling](docs/styling.md) — styled-components SSR wiring`. Keep `## Commands` and the top-level overview inline; only move detailed sections out.
