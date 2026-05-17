"use client";

import styled, { css } from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Anchor = styled(Link)<{ $active: boolean }>`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.92rem;
  color: ${({ theme, $active }) =>
    $active ? theme.color.ink : theme.color.muted};
  transition: color ${({ theme }) => theme.motion.fast}
    ${({ theme }) => theme.motion.ease};
  position: relative;

  &:hover {
    color: ${({ theme }) => theme.color.ink};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      &::before {
        content: "·";
        color: ${theme.color.accent};
        position: absolute;
        left: -0.7em;
        top: 0;
      }
    `}
`;

export function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(href + "/"));
  return (
    <Anchor href={href} $active={isActive}>
      {children}
    </Anchor>
  );
}
