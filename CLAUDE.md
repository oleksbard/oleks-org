# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — start dev server (Turbopack) on http://localhost:3000
- `npm run build` — production build (Turbopack)
- `npm start` — serve the built app
- `npm run lint` — ESLint (flat config, `eslint-config-next` core-web-vitals + typescript presets)

There is no test runner configured.

## Architecture

Next.js 16 App Router with React 19 and styled-components 6. TypeScript strict, path alias `@/*` → repo root.

styled-components is wired up for SSR via three coordinated pieces — changing one without the others will break hydration or produce FOUC:

1. [next.config.ts](next.config.ts) sets `compiler.styledComponents: true` so SWC handles the babel-plugin-styled-components transform (stable class names, displayName, SSR identifier). It also pins `turbopack.root` to this directory because a parent dir contains another lockfile.
2. [lib/registry.tsx](lib/registry.tsx) is a client component that creates a `ServerStyleSheet` per request and flushes collected styles into the streamed HTML via `useServerInsertedHTML`. On the client it short-circuits and just renders children.
3. [app/layout.tsx](app/layout.tsx) wraps `{children}` in `<StyledComponentsRegistry>` so every route inherits the SSR-aware style collection. Inside the registry, [components/layout/ThemeProvider.tsx](components/layout/ThemeProvider.tsx) supplies the theme to `styled-components`' `ThemeProvider` and mounts [components/primitives/GlobalStyles.tsx](components/primitives/GlobalStyles.tsx) (a `createGlobalStyle` reset). Both are client components; the registry must wrap the theme provider, not the other way around, so SSR sheet flushing captures global + themed styles in one pass.

Any component that uses `styled` from `styled-components` (including `createGlobalStyle`) must be a Client Component (`"use client"`) — Server Components cannot render styled-components. Pages stay RSC and compose `"use client"` section components; [app/page.tsx](app/page.tsx) → [components/home/Hero.tsx](components/home/Hero.tsx) is the reference pattern.

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

- [components/layout/Header.tsx](components/layout/Header.tsx) — pixel-font wordmark + primary nav (games · photography · notes · about). Active state is driven by [components/layout/NavLink.tsx](components/layout/NavLink.tsx) via `usePathname()`.
- [components/layout/Footer.tsx](components/layout/Footer.tsx) — single Elsewhere group (GitHub, LinkedIn, email, Notes RSS). GitHub and LinkedIn are real; `hello@oleks.dev` and `/rss.xml` are placeholders until real values are wired in.
- The `<main>` is unstyled in the layout itself; sticky-footer behavior comes from `body { display: grid; grid-template-rows: auto 1fr auto; min-height: 100dvh; }` in [components/primitives/GlobalStyles.tsx](components/primitives/GlobalStyles.tsx). Pages should render a top-level styled `<section>`, not their own `<main>`.
- Placeholder pages (`/games`, `/photography`, `/about`) reuse [components/layout/PageStub.tsx](components/layout/PageStub.tsx) — kicker + display title + note + status. They become real pages by swapping the stub for a feature component.

### MDX content pipeline

`@next/mdx` is wired up in [next.config.ts](next.config.ts) (`pageExtensions` includes `md` and `mdx`; the export is wrapped in `withMDX(...)`). [mdx-components.tsx](mdx-components.tsx) at the repo root is **required** by Next 16's App Router — removing it breaks all MDX rendering. Keep it minimal; per-route style overrides go in the route's shell component (e.g. wrapping MDX in [components/primitives/Prose.tsx](components/primitives/Prose.tsx)).

Notes live as MDX files under [content/notes/](content/notes/) and are read at request time by [lib/content/notes.ts](lib/content/notes.ts) — an RSC-only loader that:

- Lists slugs via `fs.readdir`, filtering for `.mdx`.
- Parses frontmatter with `gray-matter`.
- Normalizes the `date` field: YAML auto-parses bare ISO dates into JS `Date` objects, so the loader converts both `Date` and `string` inputs back to `YYYY-MM-DD`. Quoting the date in frontmatter (`date: "2026-05-17"`) also works but is not required.

The dynamic note route at [app/notes/[slug]/page.tsx](app/notes/[slug]/page.tsx) uses the canonical Next 16 pattern: `await import(\`@/content/notes/${slug}.mdx\`)` for the body, `generateStaticParams` from the slug list, and `export const dynamicParams = false` so unknown slugs 404 instead of rendering at request time. To add a project case-study pipeline later, mirror this exact shape with `content/projects/` and `app/games/[slug]/page.tsx`.

Frontmatter shape (see [content/notes/site-launch.mdx](content/notes/site-launch.mdx) for the canonical example):

```yaml
---
title: First note
date: 2026-05-17
summary: One-line preview.
---
```

## Maintaining this file

Any change that alters architecture, introduces a new convention, or adds a non-obvious wiring (SSR boundaries, providers, build flags, path aliases, env vars, scripts) must be reflected here in the same change — this file is the source of truth for future agents.

When this file exceeds **250 lines**, split sections into topic files under `./docs/` (e.g. `docs/architecture.md`, `docs/styling.md`) and replace the section here with a one-line link: `- [Styling](docs/styling.md) — styled-components SSR wiring`. Keep `## Commands` and the top-level overview inline; only move detailed sections out.
