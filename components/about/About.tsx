"use client";

import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import { SITE } from "@/lib/site";

const Section = styled.section`
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
  margin: ${({ theme }) => theme.space[3]} 0 ${({ theme }) => theme.space[6]};
  color: ${({ theme }) => theme.color.ink};
`;

const Lead = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.lead};
  color: ${({ theme }) => theme.color.muted};
  margin: 0;
  max-width: 56ch;
  line-height: 1.5;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[4]};
  max-width: 60ch;
  margin-top: ${({ theme }) => theme.space[6]};

  p {
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.type.body};
    color: ${({ theme }) => theme.color.ink};
    line-height: 1.65;
    margin: 0;
  }
`;

const Block = styled.div`
  margin-top: ${({ theme }) => theme.space[8]};
  padding-top: ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.color.line};
  display: grid;
  gap: ${({ theme }) => theme.space[3]};

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: 10rem 1fr;
    gap: ${({ theme }) => theme.space[6]};
  }
`;

const BlockLabel = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.62rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.muted};
  text-transform: uppercase;
`;

const Stack = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const A = styled.a`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.color.ink};
  width: fit-content;
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const TechLine = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.color.ink};
  margin: 0;
  line-height: 1.5;
`;

export function About() {
  return (
    <Section>
      <Container>
        <Kicker>04 · About</Kicker>
        <Title>About.</Title>
        <Lead>
          I&rsquo;m a software developer building for the web — increasingly
          with AI in the loop.
        </Lead>
        <Body>
          <p>
            Day-to-day I work with TypeScript, React, Node, and Next.js.
            Outside of work I make small games and shoot semi-professionally.
          </p>
          <p>
            This site is where I keep those things together: short notes when
            I have something to share, the games and side projects I keep
            coming back to, and a handful of frames I&rsquo;m proud of.
          </p>
        </Body>
        <Block>
          <BlockLabel>Currently</BlockLabel>
          <Body>
            <p>
              Building this site. Cooking on a small game. Watching the AI
              tooling space closely.
            </p>
          </Body>
        </Block>
        <Block>
          <BlockLabel>Stack</BlockLabel>
          <TechLine>
            TypeScript · React · Node.js · Next.js · AI tooling · styled-components
          </TechLine>
        </Block>
        <Block>
          <BlockLabel>Elsewhere</BlockLabel>
          <Stack>
            <A href={SITE.social.github} target="_blank" rel="noreferrer">
              GitHub ↗
            </A>
            <A href={SITE.social.linkedin} target="_blank" rel="noreferrer">
              LinkedIn ↗
            </A>
            <A href={`mailto:${SITE.email}`}>{SITE.email}</A>
          </Stack>
        </Block>
      </Container>
    </Section>
  );
}
