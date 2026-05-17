import type { Metadata } from "next";
import { getGameMeta, getGameSlugs } from "@/lib/content/games";
import { GameShell } from "@/components/games/GameShell";

export const dynamicParams = false;

export async function generateStaticParams() {
  const slugs = await getGameSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getGameMeta(slug);
  return { title: meta.title, description: meta.summary };
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = await getGameMeta(slug);
  const { default: Body } = await import(`@/content/games/${slug}.mdx`);
  return (
    <GameShell meta={meta}>
      <Body />
    </GameShell>
  );
}
