Personal site of Oleks Bardanov — games & projects, photography, notes.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · styled-components 6 · MDX.

## Commands

```bash
npm run dev              # dev server on http://localhost:3000
npm run build            # production build
npm start                # serve the build
npm run lint             # eslint
npm run photos:manifest  # regenerate content/photos.ts from public/photos/
```

## Content

- Notes: MDX in `content/notes/`.
- Games & projects: MDX in `content/games/`.
- Photos: drop files into `public/photos/`, run `npm run photos:manifest`, commit both.

Frontmatter shapes and the rest of the architecture live in [CLAUDE.md](CLAUDE.md).
