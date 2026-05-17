"use client";

import styled from "styled-components";
import type { Theme } from "@/lib/theme";

type SpaceToken = keyof Theme["space"];

type StackProps = {
  $gap?: SpaceToken;
  $direction?: "row" | "column" | "row-reverse" | "column-reverse";
  $align?: "start" | "center" | "end" | "stretch" | "baseline";
  $justify?: "start" | "center" | "end" | "space-between" | "space-around";
  $wrap?: boolean;
};

const alignMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  stretch: "stretch",
  baseline: "baseline",
} as const;

const justifyMap = {
  start: "flex-start",
  center: "center",
  end: "flex-end",
  "space-between": "space-between",
  "space-around": "space-around",
} as const;

export const Stack = styled.div<StackProps>`
  display: flex;
  flex-direction: ${({ $direction = "column" }) => $direction};
  gap: ${({ theme, $gap = "4" }) => theme.space[$gap]};
  align-items: ${({ $align = "stretch" }) => alignMap[$align]};
  justify-content: ${({ $justify = "start" }) => justifyMap[$justify]};
  flex-wrap: ${({ $wrap }) => ($wrap ? "wrap" : "nowrap")};
`;
