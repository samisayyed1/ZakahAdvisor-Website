import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next.js 16 restricts `quality` to this allow-list. 90 exists for the
     * charity rating report, whose fine text degrades visibly at the default.
     */
    qualities: [75, 90],
  },
  /**
   * The page ships no third-party scripts, no inline event handlers and no
   * remote assets, so the policy can stay tight. `'unsafe-inline'` is required
   * for styles because Next injects critical CSS inline; scripts do not need
   * it because Next hydration payloads are nonce-free static chunks served
   * from the same origin.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
