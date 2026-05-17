"use client";

import styled from "styled-components";
import { Container } from "@/components/primitives/Container";

const Wrap = styled.footer`
  margin-top: ${({ theme }) => theme.space[9]};
  padding-block: ${({ theme }) => theme.space[7]}
    ${({ theme }) => theme.space[6]};
  border-top: 1px solid ${({ theme }) => theme.color.line};
`;

const Inner = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[6]};
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  align-items: end;
`;

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`;

const Label = styled.span`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.6rem;
  letter-spacing: 0.06em;
  color: ${({ theme }) => theme.color.muted};
  text-transform: uppercase;
`;

const Links = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`;

const A = styled.a`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.color.ink};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

export function Footer() {
  return (
    <Wrap>
      <Container>
        <Inner>
          <Group>
            <Label>Elsewhere</Label>
            <Links>
              <li>
                <A
                  href="https://github.com/oleksbard"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub ↗
                </A>
              </li>
              <li>
                <A
                  href="https://www.linkedin.com/in/obardano/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn ↗
                </A>
              </li>
              <li>
                <A href="mailto:hello@oleks.dev">hello@oleks.dev</A>
              </li>
              <li>
                <A href="/rss.xml">Notes RSS ↗</A>
              </li>
            </Links>
          </Group>
        </Inner>
      </Container>
    </Wrap>
  );
}
