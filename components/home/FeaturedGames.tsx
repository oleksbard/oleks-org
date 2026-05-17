"use client";

import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import { GameCard } from "@/components/games/GameCard";
import type { GameMeta } from "@/lib/content/games";

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

const Grid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.space[7]};
  }
`;

export function FeaturedGames({ games }: { games: GameMeta[] }) {
  if (games.length === 0) return null;
  return (
    <Section>
      <Container>
        <Header>
          <Kicker>Featured</Kicker>
          <SeeAll href="/games">all →</SeeAll>
        </Header>
        <Grid>
          {games.slice(0, 2).map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
