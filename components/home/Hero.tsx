"use client";

import Image from "next/image";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";

const Section = styled.section`
  min-height: 82vh;
  display: flex;
  align-items: center;
  padding-block: ${({ theme }) => theme.space[8]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${({ theme }) => theme.space[7]};
  align-items: center;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
    gap: ${({ theme }) => theme.space[8]};
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[6]};
  order: 2;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    order: 1;
  }
`;

const Eyebrow = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.7rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.muted};
  text-transform: uppercase;
`;

const Name = styled.h1`
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.type.display};
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin: 0;
  color: ${({ theme }) => theme.color.ink};
`;

const Role = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.lead};
  color: ${({ theme }) => theme.color.muted};
  margin: 0;
  max-width: 32ch;
`;

const Tagline = styled.p`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.78rem;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.color.ink};
  margin: 0;
  line-height: 1.6;

  &::before {
    content: "> ";
    color: ${({ theme }) => theme.color.accent};
  }
`;

const Caret = styled.span`
  display: inline-block;
  width: 0.5em;
  height: 1em;
  margin-left: 0.15em;
  vertical-align: -0.1em;
  background: ${({ theme }) => theme.color.ink};
  animation: blink 1.05s steps(2, end) infinite;

  @keyframes blink {
    50% {
      background: transparent;
    }
  }
`;

const MetaRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

const PortraitWrap = styled.div`
  order: 1;
  display: flex;
  justify-content: flex-start;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    order: 2;
    justify-content: flex-end;
  }
`;

const Portrait = styled(Image)`
  width: clamp(160px, 36vw, 320px);
  height: auto;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
`;

export function Hero() {
  return (
    <Section>
      <Container>
        <Grid>
          <Text>
            <Eyebrow>Oleks · 2026</Eyebrow>
            <MetaRow>
              <Name>
                Oleks
                <br />
                Bardanov.
              </Name>
              <Role>
                Software developer building things on the web with TypeScript,
                React, and Node.
              </Role>
            </MetaRow>
            <Tagline>
              currently: building this site
              <Caret />
            </Tagline>
          </Text>
          <PortraitWrap>
            <Portrait
              src="/hero.png"
              alt="Pixel-art portrait of Oleks Bardanov"
              width={256}
              height={256}
              priority
              unoptimized
            />
          </PortraitWrap>
        </Grid>
      </Container>
    </Section>
  );
}
