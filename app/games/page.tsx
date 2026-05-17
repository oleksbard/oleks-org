import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "Games",
  description: "Small games I build on the side.",
};

export default function GamesPage() {
  return (
    <PageStub
      kicker="01 · Games"
      title="Games."
      note="Small browser games I build on the side. Real entries will appear here as I publish them."
    />
  );
}
