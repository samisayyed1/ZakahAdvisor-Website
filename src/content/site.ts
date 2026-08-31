/**
 * Site-level constants.
 *
 * Nothing in this file may be invented. Postal addresses, registration numbers,
 * phone numbers, e-mail addresses and social handles are deliberately absent:
 * none were supplied in the approved source material.
 */

export const site = {
  name: "Zakah Advisor",
  /** Brand spelling, exactly as used across the approved materials. */
  domain: "ZakahAdvisor.org",
  title: "Zakah Advisor | Independent Zakah Charity Audits & Education",
  description:
    "Support independent charity audits and Zakah education. Zakah Advisor helps donors understand where Zakah goes, evaluate charities, and navigate modern Zakah obligations.",
  /**
   * Related project, referenced in the fundraiser FAQ. Rendered as plain text —
   * no verified public URL was supplied, so none is fabricated.
   */
  relatedProject: "Madinah.com",
} as const;

/**
 * Canonical origin. Set NEXT_PUBLIC_SITE_URL in the deployment environment;
 * the fallback is only ever used for local development, so no false production
 * canonical is hard-coded.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

/**
 * Sub-path the site is served from, e.g. "/ZakahAdvisor-Website" on the GitHub
 * Pages preview. Empty for a normal root deployment. next/link applies this
 * automatically; plain anchors have to be prefixed with `rootHref`.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Builds a root-relative href that survives a base path. */
export const rootHref = (path: string) => `${basePath}/${path.replace(/^\//, "")}`;

/**
 * Resolves a file in `public/`. `next/image` does not apply the base path to an
 * unoptimized `src`, so every public asset reference goes through here.
 */
export const asset = rootHref;

export const navItems = [
  { label: "Why It Matters", href: "#why-it-matters" },
  { label: "How We Audit", href: "#how-we-audit" },
  { label: "Guardians", href: "#guardians" },
  { label: "FAQ", href: "#faq" },
] as const;

/** Every primary call to action resolves here. */
export const SUPPORT_ANCHOR = "#support";

export const CTA_LABEL = "Become a Zakah Guardian";
