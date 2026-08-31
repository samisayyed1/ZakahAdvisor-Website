import type { NextConfig } from "next";

/**
 * Two build modes.
 *
 * Default — a Node server build. This is what production uses.
 *
 * `NEXT_EXPORT=1` — a fully static export, used by the GitHub Pages preview
 * workflow. Pages serves the site from a repository sub-path and cannot run the
 * image optimizer or set response headers, so those are adjusted here rather
 * than compromising the real deployment.
 */
const isExport = process.env.NEXT_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isExport
    ? {
        output: "export" as const,
        basePath: basePath || undefined,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {
        images: {
          /**
           * Next.js 16 restricts `quality` to this allow-list. 90 exists for the
           * charity rating report, whose fine text degrades visibly at the default.
           */
          qualities: [75, 90],
        },
        /**
         * The page ships no third-party scripts, no inline event handlers and no
         * remote assets, so the policy can stay tight. Static exports are served
         * by GitHub Pages, which ignores these, so they are set only for the
         * server build.
         */
        async headers() {
          return [
            {
              source: "/:path*",
              headers: [
                { key: "X-Content-Type-Options", value: "nosniff" },
                {
                  key: "Referrer-Policy",
                  value: "strict-origin-when-cross-origin",
                },
                { key: "X-Frame-Options", value: "SAMEORIGIN" },
                {
                  key: "Permissions-Policy",
                  value: "camera=(), microphone=(), geolocation=(), payment=()",
                },
              ],
            },
          ];
        },
      }),
};

export default nextConfig;
