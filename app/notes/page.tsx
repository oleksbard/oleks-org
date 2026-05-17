import type { Metadata } from "next";
import { getAllNotes } from "@/lib/content/notes";
import { NoteList } from "@/components/notes/NoteList";

export const metadata: Metadata = {
  title: "Notes",
  description: "Short updates and changelog-style posts.",
};

export default async function NotesPage() {
  const notes = await getAllNotes();
  return <NoteList notes={notes} />;
}
