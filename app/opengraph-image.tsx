import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Oleks Bardanov — software developer.";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#F7F6F2",
          color: "#0E0E10",
          fontFamily:
            "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#7A7A7A",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          oleks /
        </div>
        <div
          style={{
            fontSize: 144,
            fontWeight: 600,
            letterSpacing: -6,
            lineHeight: 0.95,
            display: "flex",
          }}
        >
          Oleks Bardanov.
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#7A7A7A",
            marginTop: 32,
            display: "flex",
          }}
        >
          Software developer · ts · react · node · ai
        </div>
        <div
          style={{
            fontSize: 24,
            color: "#FF5A1F",
            marginTop: 40,
            letterSpacing: 2,
            textTransform: "uppercase",
            display: "flex",
          }}
        >
          → oleks.dev
        </div>
      </div>
    ),
    { ...size },
  );
}
