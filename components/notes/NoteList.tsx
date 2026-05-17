"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import type { NoteMeta } from "@/lib/content/notes";
import { formatLongDate } from "@/lib/date";

const Section = styled.section`
  min-height: 60vh;
  padding-block: ${({ theme }) => theme.space[8]}
    ${({ theme }) => theme.space[7]};
`;

const Kicker = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.muted};
  text-transform: uppercase;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.type.h1};
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1;
  margin: ${({ theme }) => theme.space[3]} 0 ${({ theme }) => theme.space[7]};
  color: ${({ theme }) => theme.color.ink};
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
`;

const Item = styled.li`
  border-top: 1px solid ${({ theme }) => theme.color.line};

  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.color.line};
  }
`;

const Row = styled(Link)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[2]};
  padding-block: ${({ theme }) => theme.space[5]};
  transition: opacity ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover h2 {
    color: ${({ theme }) => theme.color.accent};
  }

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 9rem 1fr;
    gap: ${({ theme }) => theme.space[5]};
    align-items: baseline;
  }
`;

const DateStamp = styled.time`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.62rem;
  color: ${({ theme }) => theme.color.muted};
  letter-spacing: 0.04em;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const NoteTitle = styled.h2`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.type.h3};
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0;
  color: ${({ theme }) => theme.color.ink};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};
`;

const Summary = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.color.muted};
  margin: 0;
  line-height: 1.5;
`;

const Empty = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.body};
  color: ${({ theme }) => theme.color.muted};
`;

export function NoteList({ notes }: { notes: NoteMeta[] }) {
  return (
    <Section>
      <Container>
        <Kicker>03 · Notes</Kicker>
        <Title>Notes.</Title>
        {notes.length === 0 ? (
          <Empty>No notes yet.</Empty>
        ) : (
          <List>
            {notes.map((note) => (
              <Item key={note.slug}>
                <Row href={`/notes/${note.slug}`}>
                  <DateStamp dateTime={note.date}>{formatLongDate(note.date)}</DateStamp>
                  <Body>
                    <NoteTitle>{note.title}</NoteTitle>
                    {note.summary && <Summary>{note.summary}</Summary>}
                  </Body>
                </Row>
              </Item>
            ))}
          </List>
        )}
      </Container>
    </Section>
  );
}
