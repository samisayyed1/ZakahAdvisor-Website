import { readFile } from "node:fs/promises";
import path from "node:path";

import { ImageResponse } from "next/og";

export const alt =
  "Zakah Advisor — The $200 Billion Trust. Independent Zakah charity audits and education.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// The card never varies, so it is generated once at build time. Required
// explicitly by `output: "export"` (the GitHub Pages preview build).
export const dynamic = "force-static";

/**
 * Branded social-sharing card.
 *
 * Deep Evergreen ground, the approved dark-background logo artwork, Audit Gold
 * accent and the campaign's own headline. No photography, no invented figures.
 * Fonts are the real brand faces, committed under src/app/_og-fonts so the
 * build never depends on a network fetch.
 */
export default async function OpengraphImage() {
  // Fully literal paths: a computed path here would make the bundler trace the
  // entire project into the server output.
  const fonts = path.join(process.cwd(), "src/app/_og-fonts");
  const [logo, montserratBold, montserratSemiBold, inter] = await Promise.all([
    readFile(path.join(process.cwd(), "public/brand/logo-horizontal-inverse.png")),
    readFile(path.join(fonts, "Montserrat-Bold.ttf")),
    readFile(path.join(fonts, "Montserrat-SemiBold.ttf")),
    readFile(path.join(fonts, "Inter-Regular.ttf")),
  ]);

  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#003334",
          padding: "72px 80px",
          position: "relative",
        }}
      >
        {/* Audit rings, bled off the right edge. */}
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: -240,
            right: -220,
            width: 780,
            height: 780,
            borderRadius: 780,
            border: "2px solid rgba(197, 160, 89, 0.22)",
          }}
        />
        <div
          style={{
            position: "absolute",
            display: "flex",
            top: -150,
            right: -130,
            width: 600,
            height: 600,
            borderRadius: 600,
            border: "2px solid rgba(197, 160, 89, 0.16)",
          }}
        />

        <img src={logoSrc} alt="" width={340} height={108} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter",
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#C5A059",
            }}
          >
            An independent Zakah accountability initiative
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 22,
              fontFamily: "Montserrat",
              fontWeight: 700,
              fontSize: 84,
              letterSpacing: -2.5,
              lineHeight: 1.04,
              color: "#E8EDE9",
            }}
          >
            The $200 Billion Trust
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontFamily: "Montserrat",
              fontWeight: 600,
              fontSize: 34,
              lineHeight: 1.25,
              color: "#9DBB79",
            }}
          >
            Is your Zakah funding the Ummah, or funding a black box?
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 96,
              height: 3,
              backgroundColor: "#C5A059",
            }}
          />
          <div
            style={{
              display: "flex",
              marginTop: 24,
              fontFamily: "Inter",
              fontSize: 26,
              color: "#A9B5AD",
            }}
          >
            ZakahAdvisor.org — Independent charity audits &amp; Zakah education
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Montserrat", data: montserratBold, weight: 700, style: "normal" },
        {
          name: "Montserrat",
          data: montserratSemiBold,
          weight: 600,
          style: "normal",
        },
        { name: "Inter", data: inter, weight: 400, style: "normal" },
      ],
    },
  );
}
