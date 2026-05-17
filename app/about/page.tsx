import type { Metadata } from "next";
import { PageStub } from "@/components/layout/PageStub";

export const metadata: Metadata = {
  title: "About",
  description: "Software developer. TypeScript, React, Node, Next.js.",
};

export default function AboutPage() {
  return (
    <PageStub
      kicker="04 · About"
      title="About."
      note="Bio, what I work on, and how to reach me. The long version lands soon — the email link in the footer works in the meantime."
    />
  );
}
