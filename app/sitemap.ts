import type { MetadataRoute } from "next";
import { getGameSlugs } from "@/lib/content/games";
import { getNoteSlugs } from "@/lib/content/notes";
import { SITE } from "@/lib/site";

const STATIC_ROUTES = ["", "/games", "/notes", "/photography", "/about"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [gameSlugs, noteSlugs] = await Promise.all([
    getGameSlugs(),
    getNoteSlugs(),
  ]);
  const now = new Date();

  return [
    ...STATIC_ROUTES.map((path) => ({
      url: `${SITE.url}${path}`,
      lastModified: now,
    })),
    ...gameSlugs.map((slug) => ({
      url: `${SITE.url}/games/${slug}`,
      lastModified: now,
    })),
    ...noteSlugs.map((slug) => ({
      url: `${SITE.url}/notes/${slug}`,
      lastModified: now,
    })),
  ];
}
