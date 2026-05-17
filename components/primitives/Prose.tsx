"use client";

import styled from "styled-components";

export const Prose = styled.article`
  color: ${({ theme }) => theme.color.ink};
  font-family: ${({ theme }) => theme.font.sans};
  font-size: ${({ theme }) => theme.type.body};
  line-height: 1.65;
  max-width: 65ch;

  > * + * {
    margin-top: 1em;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.15;
    margin-top: 2em;
  }

  h1 {
    font-size: ${({ theme }) => theme.type.h1};
  }
  h2 {
    font-size: ${({ theme }) => theme.type.h2};
  }
  h3 {
    font-size: ${({ theme }) => theme.type.h3};
  }

  a {
    color: ${({ theme }) => theme.color.accent};
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 3px;
    transition: opacity ${({ theme }) => theme.motion.fast}
      ${({ theme }) => theme.motion.ease};

    &:hover {
      opacity: 0.7;
    }
  }

  code {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 0.92em;
    padding: 0.1em 0.35em;
    background: ${({ theme }) => theme.color.line};
    border-radius: ${({ theme }) => theme.radius.sm};
  }

  pre {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: 0.92em;
    padding: ${({ theme }) => theme.space[5]};
    background: ${({ theme }) => theme.color.ink};
    color: ${({ theme }) => theme.color.canvas};
    border-radius: ${({ theme }) => theme.radius.md};
    overflow-x: auto;
    line-height: 1.5;

    code {
      background: transparent;
      padding: 0;
      color: inherit;
    }
  }

  blockquote {
    border-left: 2px solid ${({ theme }) => theme.color.accent};
    padding-left: ${({ theme }) => theme.space[4]};
    color: ${({ theme }) => theme.color.muted};
    font-style: italic;
  }

  ul,
  ol {
    padding-left: 1.5em;
  }

  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }

  hr {
    border: 0;
    border-top: 1px solid ${({ theme }) => theme.color.line};
    margin: ${({ theme }) => theme.space[6]} 0;
  }

  img {
    border-radius: ${({ theme }) => theme.radius.md};
  }
`;
