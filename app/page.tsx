import { Hero } from "@/components/home/Hero";
import { FeaturedGames } from "@/components/home/FeaturedGames";
import { LatestNotes } from "@/components/home/LatestNotes";
import { getFeaturedGames } from "@/lib/content/games";
import { getAllNotes } from "@/lib/content/notes";

export default async function Home() {
  const [featured, notes] = await Promise.all([
    getFeaturedGames(),
    getAllNotes(),
  ]);

  return (
    <>
      <Hero />
      <FeaturedGames games={featured} />
      <LatestNotes notes={notes} />
    </>
  );
}
