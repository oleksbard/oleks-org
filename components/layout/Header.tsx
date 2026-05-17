"use client";

import styled from "styled-components";
import Link from "next/link";
import { Container } from "@/components/primitives/Container";
import { NavLink } from "./NavLink";

const Bar = styled.header`
  padding-block: ${({ theme }) => theme.space[5]};
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.space[5]};
  flex-wrap: wrap;
`;

const Mark = styled(Link)`
  font-family: ${({ theme }) => theme.font.pixel};
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.color.ink};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};

  &:hover {
    color: ${({ theme }) => theme.color.accent};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: ${({ theme }) => theme.space[5]};
  flex-wrap: wrap;
`;

export function Header() {
  return (
    <Bar>
      <Container>
        <Inner>
          <Mark href="/" aria-label="Home">
            oleks/
          </Mark>
          <Nav aria-label="Primary">
            <NavLink href="/games">games &amp; projects</NavLink>
            <NavLink href="/photography">photography</NavLink>
            <NavLink href="/notes">notes</NavLink>
            <NavLink href="/about">about</NavLink>
          </Nav>
        </Inner>
      </Container>
    </Bar>
  );
}
