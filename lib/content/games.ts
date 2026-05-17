import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const GAMES_DIR = path.join(process.cwd(), "content", "games");

export type GameLinks = {
  live?: string;
  repo?: string;
};

export type GameMeta = {
  slug: string;
  title: string;
  year: number;
  summary?: string;
  tech: string[];
  cover?: string;
  links: GameLinks;
  featured: boolean;
};

type RawFrontmatter = {
  title: string;
  year: number | string;
  summary?: string;
  tech?: string[];
  cover?: string;
  links?: GameLinks;
  featured?: boolean;
};

async function readMeta(slug: string): Promise<GameMeta> {
  const raw = await fs.readFile(path.join(GAMES_DIR, `${slug}.mdx`), "utf8");
  const fm = matter(raw).data as RawFrontmatter;
  return {
    slug,
    title: fm.title,
    year: typeof fm.year === "string" ? parseInt(fm.year, 10) : fm.year,
    summary: fm.summary,
    tech: fm.tech ?? [],
    cover: fm.cover,
    links: fm.links ?? {},
    featured: fm.featured ?? false,
  };
}

export async function getGameSlugs(): Promise<string[]> {
  const entries = await fs.readdir(GAMES_DIR);
  return entries
    .filter((e) => e.endsWith(".mdx"))
    .map((e) => e.replace(/\.mdx$/, ""));
}

export async function getAllGames(): Promise<GameMeta[]> {
  const slugs = await getGameSlugs();
  const games = await Promise.all(slugs.map(readMeta));
  return games.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return a.title.localeCompare(b.title);
  });
}

export async function getFeaturedGames(): Promise<GameMeta[]> {
  const games = await getAllGames();
  return games.filter((g) => g.featured);
}

export async function getGameMeta(slug: string): Promise<GameMeta> {
  return readMeta(slug);
}
