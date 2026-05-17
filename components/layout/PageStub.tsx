"use client";

import styled from "styled-components";
import { Container } from "@/components/primitives/Container";

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
  margin: ${({ theme }) => theme.space[3]} 0 ${({ theme }) => theme.space[5]};
  color: ${({ theme }) => theme.color.ink};
`;

const Note = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.body};
  color: ${({ theme }) => theme.color.muted};
  max-width: 52ch;
  margin: 0;
  line-height: 1.6;
`;

const Status = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.color.ink};
  display: inline-block;
  margin-top: ${({ theme }) => theme.space[6]};

  &::before {
    content: "> ";
    color: ${({ theme }) => theme.color.accent};
  }
`;

type PageStubProps = {
  kicker: string;
  title: string;
  note?: string;
  status?: string;
};

export function PageStub({
  kicker,
  title,
  note,
  status = "coming soon",
}: PageStubProps) {
  return (
    <Section>
      <Container>
        <Kicker>{kicker}</Kicker>
        <Title>{title}</Title>
        {note && <Note>{note}</Note>}
        <Status>{status}</Status>
      </Container>
    </Section>
  );
}
