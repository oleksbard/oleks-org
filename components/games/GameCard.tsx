"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import type { GameMeta } from "@/lib/content/games";

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};

  &:hover h3 {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const Cover = styled.div`
  aspect-ratio: 16 / 10;
  background: ${({ theme }) => theme.color.ink};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  position: relative;
`;

const CoverImage = styled(Image)`
  object-fit: cover;
  image-rendering: pixelated;
`;

const CoverPlaceholder = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: repeating-linear-gradient(
      45deg,
      transparent 0,
      transparent 6px,
      rgba(247, 246, 242, 0.06) 6px,
      rgba(247, 246, 242, 0.06) 7px
    );
  }
`;

const PlaceholderLabel = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.7rem;
  color: ${({ theme }) => theme.color.canvas};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[1]};
`;

const TopRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.space[3]};
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.6rem;
  color: ${({ theme }) => theme.color.muted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

const Title = styled.h3`
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
  font-size: 0.92rem;
  color: ${({ theme }) => theme.color.muted};
  margin: 0;
  line-height: 1.5;
`;

export function GameCard({ game }: { game: GameMeta }) {
  return (
    <Card href={`/games/${game.slug}`}>
      <Cover>
        {game.cover ? (
          <CoverImage
            src={game.cover}
            alt={`${game.title} cover`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            unoptimized
          />
        ) : (
          <CoverPlaceholder>
            <PlaceholderLabel>WIP</PlaceholderLabel>
          </CoverPlaceholder>
        )}
      </Cover>
      <Meta>
        <TopRow>
          <span>{game.year}</span>
          {game.tech.length > 0 && <span>{game.tech.join(" · ")}</span>}
        </TopRow>
        <Title>{game.title}</Title>
        {game.summary && <Summary>{game.summary}</Summary>}
      </Meta>
    </Card>
  );
}
