import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export type NoteMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
};

type RawFrontmatter = {
  title: string;
  date: string | Date;
  summary?: string;
};

function normalizeDate(input: string | Date): string {
  return input instanceof Date ? input.toISOString().slice(0, 10) : input;
}

async function readMeta(slug: string): Promise<NoteMeta> {
  const raw = await fs.readFile(path.join(NOTES_DIR, `${slug}.mdx`), "utf8");
  const fm = matter(raw).data as RawFrontmatter;
  return {
    slug,
    title: fm.title,
    date: normalizeDate(fm.date),
    summary: fm.summary,
  };
}

export async function getNoteSlugs(): Promise<string[]> {
  const entries = await fs.readdir(NOTES_DIR);
  return entries
    .filter((e) => e.endsWith(".mdx"))
    .map((e) => e.replace(/\.mdx$/, ""));
}

export async function getAllNotes(): Promise<NoteMeta[]> {
  const slugs = await getNoteSlugs();
  const notes = await Promise.all(slugs.map(readMeta));
  return notes.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getNoteMeta(slug: string): Promise<NoteMeta> {
  return readMeta(slug);
}
