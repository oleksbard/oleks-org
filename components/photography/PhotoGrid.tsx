"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import { Lightbox } from "./Lightbox";
import type { Photo } from "@/content/photos";

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

const EmptyState = styled.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.body};
  color: ${({ theme }) => theme.color.muted};
  line-height: 1.7;
  max-width: 56ch;

  code {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 0.92em;
    padding: 0.1em 0.35em;
    background: ${({ theme }) => theme.color.line};
    border-radius: ${({ theme }) => theme.radius.sm};
    color: ${({ theme }) => theme.color.ink};
  }
`;

const Mosaic = styled.div`
  column-count: 2;
  column-gap: ${({ theme }) => theme.space[3]};

  @media (min-width: ${({ theme }) => theme.bp.md}) {
    column-count: 3;
  }

  @media (min-width: ${({ theme }) => theme.bp.xl}) {
    column-count: 4;
  }
`;

const Tile = styled.button`
  display: block;
  width: 100%;
  margin: 0 0 ${({ theme }) => theme.space[3]};
  padding: 0;
  background: none;
  border: 0;
  cursor: zoom-in;
  break-inside: avoid;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
  position: relative;

  &:hover img {
    transform: scale(1.02);
  }
`;

const Thumb = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
  transition: transform ${({ theme }) => theme.motion.slow}
    ${({ theme }) => theme.motion.ease};
`;

export function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClose = useCallback(() => setOpenIndex(null), []);
  const handlePrev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);
  const handleNext = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  return (
    <Section>
      <Container>
        <Kicker>02 · Photography</Kicker>
        <Title>Frames.</Title>
        {photos.length === 0 ? (
          <EmptyState>
            No photos yet. Drop image files into <code>public/photos/</code>{" "}
            and run <code>npm run photos:manifest</code> — the grid will
            populate automatically from the generated manifest.
          </EmptyState>
        ) : (
          <Mosaic>
            {photos.map((photo, index) => (
              <Tile
                key={photo.src}
                onClick={() => setOpenIndex(index)}
                aria-label={`Open ${photo.alt}`}
              >
                <Thumb
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  placeholder="blur"
                  blurDataURL={photo.blurDataURL}
                  sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"
                />
              </Tile>
            ))}
          </Mosaic>
        )}
      </Container>
      {openIndex !== null && (
        <Lightbox
          photo={photos[openIndex]}
          onClose={handleClose}
          onPrev={photos.length > 1 ? handlePrev : undefined}
          onNext={photos.length > 1 ? handleNext : undefined}
        />
      )}
    </Section>
  );
}
