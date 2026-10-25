import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "DevVault — Free Developer Notes & Learning Guides";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoData = await readFile(
    join(process.cwd(), "public/images/devvault-logo.png"),
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          background: "#FFFCF7",
          color: "#111827",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            marginBottom: 36,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse does not support next/image */}
          <img
            src={logoSrc}
            width={64}
            height={64}
            alt=""
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              objectFit: "cover",
            }}
          />
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.03em" }}>
            DevVault
          </div>
        </div>
        <div
          style={{
            fontSize: 60,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            maxWidth: 920,
          }}
        >
          Learn to Code. One Concept at a Time.
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 26,
            color: "#64748B",
            maxWidth: 740,
          }}
        >
          Free developer notes, cheat sheets, and practical learning guides.
        </div>
        <div
          style={{
            marginTop: 32,
            display: "flex",
            color: "#EA580C",
            fontSize: 22,
            fontWeight: 600,
          }}
        >
          @thegodavaricoder
        </div>
      </div>
    ),
    { ...size },
  );
}
