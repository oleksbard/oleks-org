import type { Metadata } from "next";
import { getNoteMeta, getNoteSlugs } from "@/lib/content/notes";
import { NoteShell } from "@/components/notes/NoteShell";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getNoteSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getNoteMeta(slug);
  return { title: meta.title, description: meta.summary };
}

export default async function NotePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = await getNoteMeta(slug);
  const { default: Body } = await import(`@/content/notes/${slug}.mdx`);
  return (
    <NoteShell meta={meta}>
      <Body />
    </NoteShell>
  );
}
