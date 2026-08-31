import type { MetadataRoute } from "next";

import { siteUrl } from "@/content/site";

// Emitted once at build time. `output: "export"` (the GitHub Pages preview)
// requires this to be explicit.
export const dynamic = "force-static";


export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/legal`,
      changeFrequency: "yearly",
      priority: 0.4,
    },
  ];
}
