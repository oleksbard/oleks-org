"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import type { NoteMeta } from "@/lib/content/notes";
import { formatLongDate } from "@/lib/date";

const Section = styled.section`
  padding-block: ${({ theme }) => theme.space[8]};
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[5]};
  margin-bottom: ${({ theme }) => theme.space[6]};
`;

const Kicker = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.7rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.muted};
  text-transform: uppercase;
`;

const SeeAll = styled(Link)`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.ink};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const Card = styled(Link)`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[3]};
  padding-block: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.color.line};
  border-bottom: 1px solid ${({ theme }) => theme.color.line};

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

const Title = styled.h2`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.type.h2};
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.1;
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
  max-width: 60ch;
`;

export function LatestNote({ note }: { note: NoteMeta | null }) {
  if (!note) return null;
  return (
    <Section>
      <Container>
        <Header>
          <Kicker>Latest</Kicker>
          <SeeAll href="/notes">all notes →</SeeAll>
        </Header>
        <Card href={`/notes/${note.slug}`}>
          <DateStamp dateTime={note.date}>{formatLongDate(note.date)}</DateStamp>
          <Body>
            <Title>{note.title}</Title>
            {note.summary && <Summary>{note.summary}</Summary>}
          </Body>
        </Card>
      </Container>
    </Section>
  );
}
