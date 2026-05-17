"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import { Container } from "@/components/primitives/Container";
import { Prose } from "@/components/primitives/Prose";
import type { GameMeta } from "@/lib/content/games";

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
`;

const TopRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[3]};
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.62rem;
  color: ${({ theme }) => theme.color.muted};
  letter-spacing: 0.06em;
  text-transform: uppercase;
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

const Lead = styled.p`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: ${({ theme }) => theme.type.lead};
  color: ${({ theme }) => theme.color.muted};
  margin: 0;
  max-width: 60ch;
  line-height: 1.5;
`;

const LinksRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space[4]};
  margin-top: ${({ theme }) => theme.space[2]};
`;

const ExternalLink = styled.a`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.color.ink};
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 4px;
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const CoverWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  background: ${({ theme }) => theme.color.ink};
  border-radius: ${({ theme }) => theme.radius.lg};
  overflow: hidden;
  margin-bottom: ${({ theme }) => theme.space[7]};
`;

const Cover = styled(Image)`
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
      transparent 8px,
      rgba(247, 246, 242, 0.06) 8px,
      rgba(247, 246, 242, 0.06) 9px
    );
  }
`;

const PlaceholderLabel = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.canvas};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
`;

const Divider = styled.hr`
  border: 0;
  border-top: 1px solid ${({ theme }) => theme.color.line};
  margin: ${({ theme }) => theme.space[7]} 0;
`;

export function GameShell({
  meta,
  children,
}: {
  meta: GameMeta;
  children: React.ReactNode;
}) {
  const techLine = meta.tech.join(" · ");
  return (
    <Section>
      <Container>
        <Back href="/games">games &amp; projects</Back>
        <Header>
          <TopRow>
            <span>{meta.year}</span>
            {techLine && <span>{techLine}</span>}
          </TopRow>
          <Title>{meta.title}</Title>
          {meta.summary && <Lead>{meta.summary}</Lead>}
          {(meta.links.live || meta.links.repo) && (
            <LinksRow>
              {meta.links.live && (
                <ExternalLink
                  href={meta.links.live}
                  target="_blank"
                  rel="noreferrer"
                >
                  Play ↗
                </ExternalLink>
              )}
              {meta.links.repo && (
                <ExternalLink
                  href={meta.links.repo}
                  target="_blank"
                  rel="noreferrer"
                >
                  Repo ↗
                </ExternalLink>
              )}
            </LinksRow>
          )}
        </Header>
        <CoverWrap>
          {meta.cover ? (
            <Cover
              src={meta.cover}
              alt={`${meta.title} cover`}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              unoptimized
              priority
            />
          ) : (
            <CoverPlaceholder>
              <PlaceholderLabel>WIP</PlaceholderLabel>
            </CoverPlaceholder>
          )}
        </CoverWrap>
        <Divider />
        <Prose>{children}</Prose>
      </Container>
    </Section>
  );
}
