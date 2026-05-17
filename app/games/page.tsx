import type { Metadata } from "next";
import { getAllGames } from "@/lib/content/games";
import { GameGrid } from "@/components/games/GameGrid";

export const metadata: Metadata = {
  title: "Games & Projects",
  description: "Small games and other side projects.",
};

export default async function GamesPage() {
  const games = await getAllGames();
  return <GameGrid games={games} />;
}
