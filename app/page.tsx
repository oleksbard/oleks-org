import { Hero } from "@/components/home/Hero";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { LatestNote } from "@/components/home/LatestNote";
import { getFeaturedGames } from "@/lib/content/games";
import { getAllNotes } from "@/lib/content/notes";

export default async function Home() {
  const [featured, notes] = await Promise.all([
    getFeaturedGames(),
    getAllNotes(),
  ]);
  const latestNote = notes[0] ?? null;

  return (
    <>
      <Hero />
      <FeaturedGames games={featured} />
      <LatestNote note={latestNote} />
    </>
  );
}
