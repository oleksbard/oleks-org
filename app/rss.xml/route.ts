import { getAllNotes } from "@/lib/content/notes";
import { SITE } from "@/lib/site";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const notes = await getAllNotes();
  const items = notes
    .map((note) => {
      const url = `${SITE.url}/notes/${note.slug}`;
      const pub = new Date(note.date).toUTCString();
      const desc = note.summary
        ? `<description>${escapeXml(note.summary)}</description>`
        : "";
      return `    <item>
      <title>${escapeXml(note.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pub}</pubDate>
      ${desc}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE.name)} · Notes</title>
    <link>${SITE.url}/notes</link>
    <atom:link href="${SITE.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Short updates and changelog-style posts.</description>
    <language>en</language>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
