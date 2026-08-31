import type { Metadata, Viewport } from "next";
import { Amiri, Inter, Montserrat } from "next/font/google";

import { site, siteUrl } from "@/content/site";
import "./globals.css";

/**
 * Typography per brand guide §6: Montserrat for display, Inter for UI and body.
 * Amiri carries the Qur'anic and Hadith passages — Montserrat and Inter have no
 * Arabic coverage, and sacred text needs a proper Naskh face.
 *
 * All three are self-hosted by next/font: no request leaves for Google, and the
 * fallback metrics are adjusted so there is no layout shift when they swap in.
 */

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-montserrat",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

// Regular only, and not preloaded: the Arabic passages are all below the fold,
// so preloading them would compete with the two faces the hero actually needs.
const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400"],
  variable: "--font-amiri",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  // Resolved from NEXT_PUBLIC_SITE_URL — never a hard-coded production origin.
  metadataBase: new URL(siteUrl),
  title: {
    default: site.title,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#003334",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${inter.variable} ${amiri.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only rounded-za bg-za-gold px-5 py-3 font-semibold text-za-text focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
