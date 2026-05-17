import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "Photography",
  description: "Semi-professional photography — selected frames.",
};

export default function PhotographyPage() {
  return (
    <PageStub
      kicker="02 · Photography"
      title="Frames."
      note="Selected work from the camera roll. Editorial mosaic with mixed aspect ratios — the gallery and lightbox land soon."
    />
  );
}
