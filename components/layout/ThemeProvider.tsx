"use client";

import { ThemeProvider as SCThemeProvider } from "styled-components";
import { theme } from "@/lib/theme";
import { GlobalStyles } from "@/components/primitives/GlobalStyles";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <SCThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </SCThemeProvider>
  );
}
