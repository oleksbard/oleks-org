"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    height: 100%;
    -webkit-text-size-adjust: 100%;
  }

  html,
  body {
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100dvh;
    display: grid;
    grid-template-rows: auto 1fr auto;
    background: ${({ theme }) => theme.color.canvas};
    color: ${({ theme }) => theme.color.ink};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: ${({ theme }) => theme.type.body};
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  h1, h2, h3, h4, h5, h6, p, ul, ol, figure {
    margin: 0;
    padding: 0;
  }

  ul, ol {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
  }

  img, svg, video {
    display: block;
    max-width: 100%;
    height: auto;
  }

  ::selection {
    background: ${({ theme }) => theme.color.accent};
    color: ${({ theme }) => theme.color.canvas};
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent};
    outline-offset: 3px;
  }
`;
