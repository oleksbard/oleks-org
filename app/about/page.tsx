import type { Metadata } from "next";
import { About } from "@/components/about/About";

export const metadata: Metadata = {
  title: "About",
  description: "Software developer. TypeScript, React, Node, AI.",
};

export default function AboutPage() {
  return <About />;
}
