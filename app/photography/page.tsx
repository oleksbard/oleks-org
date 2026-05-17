import type { Metadata } from "next";
import { PhotoGrid } from "@/components/photography/PhotoGrid";
import { photos } from "@/content/photos";

export const metadata: Metadata = {
  title: "Photography",
  description: "Selected frames from the camera roll.",
};

export default function PhotographyPage() {
  return <PhotoGrid photos={photos} />;
}
