"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import { Prose } from "@/components/primitives/Prose";
import type { NoteMeta } from "@/lib/content/notes";
import { formatLongDate } from "@/lib/date";

const Section = styled.section`
  padding-block: ${({ theme }) => theme.space[8]}
    ${({ theme }) => theme.space[7]};
`;

const Back = styled(Link)`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.62rem;
  color: ${({ theme }) => theme.color.muted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: ${({ theme }) => theme.space[6]};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &::before {
    content: "← ";
    color: ${({ theme }) => theme.color.accent};
  }

  &:hover {
    color: ${({ theme }) => theme.color.ink};
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
  margin-bottom: ${({ theme }) => theme.space[6]};
  padding-bottom: ${({ theme }) => theme.space[6]};
`;

const DateStamp = styled.time`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.62rem;
  color: ${({ theme }) => theme.color.muted};
  letter-spacing: 0.04em;
`;

const Title = styled.h1`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.type.h1};
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin: 0;
  color: ${({ theme }) => theme.color.ink};
`;

export function NoteShell({
  meta,
  children,
}: {
  meta: NoteMeta;
  children: React.ReactNode;
}) {
  return (
    <Section>
      <Container>
        <Back href="/notes">notes</Back>
        <Header>
          <DateStamp dateTime={meta.date}>{formatLongDate(meta.date)}</DateStamp>
          <Title>{meta.title}</Title>
        </Header>
        <Prose>{children}</Prose>
      </Container>
    </Section>
  );
}
