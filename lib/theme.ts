export const theme = {
  color: {
    ink: "#0E0E10",
    canvas: "#F7F6F2",
    muted: "#7A7A7A",
    line: "rgba(14, 14, 16, 0.08)",
    accent: "#FF5A1F",
  },
  font: {
    sans: "var(--font-geist-sans), system-ui, -apple-system, sans-serif",
    mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, monospace",
    pixel: 'var(--font-pixel), "Press Start 2P", ui-monospace, monospace',
  },
  space: {
    "0": "0",
    "1": "0.25rem",
    "2": "0.5rem",
    "3": "0.75rem",
    "4": "1rem",
    "5": "1.5rem",
    "6": "2rem",
    "7": "3rem",
    "8": "4rem",
    "9": "6rem",
    "10": "8rem",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
  },
  type: {
    caption: "clamp(0.75rem, 0.2vw + 0.7rem, 0.875rem)",
    body: "clamp(0.95rem, 0.3vw + 0.9rem, 1.0625rem)",
    lead: "clamp(1.125rem, 0.5vw + 1rem, 1.375rem)",
    h3: "clamp(1.25rem, 1vw + 1rem, 1.75rem)",
    h2: "clamp(1.75rem, 2vw + 1.25rem, 2.5rem)",
    h1: "clamp(2.5rem, 4vw + 1.5rem, 4.5rem)",
    display: "clamp(3rem, 7vw + 1rem, 7rem)",
  },
  layout: {
    maxWidth: "72rem",
    gutter: "clamp(1rem, 3vw, 2rem)",
  },
  bp: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
  },
  motion: {
    fast: "120ms",
    base: "220ms",
    slow: "420ms",
    ease: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  },
} as const;

export type Theme = typeof theme;
