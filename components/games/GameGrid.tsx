"use client";

import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import { GameCard } from "@/components/games/GameCard";
import type { GameMeta } from "@/lib/content/games";

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

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space[7]};
  }
`;

const Empty = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.body};
  color: ${({ theme }) => theme.color.muted};
`;

export function GameGrid({ games }: { games: GameMeta[] }) {
  return (
    <Section>
      <Container>
        <Kicker>01 · Games &amp; Projects</Kicker>
        <Title>Games &amp; Projects.</Title>
        {games.length === 0 ? (
          <Empty>No games yet.</Empty>
        ) : (
          <Grid>
            {games.map((game) => (
              <GameCard key={game.slug} game={game} />
            ))}
          </Grid>
        )}
      </Container>
    </Section>
  );
}
