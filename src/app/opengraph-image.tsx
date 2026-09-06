import { ImageResponse } from "next/og";

export const alt = "DevVault";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#0C0C0B",
          color: "#F4F3EE",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#FFFCFA",
              color: "#141413",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            D
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: "-0.03em" }}>
            DevVault
          </div>
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 900,
          }}
        >
          Resources for Developers.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            color: "#A09E94",
            maxWidth: 720,
          }}
        >
          Notes, guides, cheat sheets and practical resources.
        </div>
      </div>
    ),
    { ...size },
  );
}
