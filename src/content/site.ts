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

/**
 * The primary call to action.
 *
 * Changed from "Become a Zakah Guardian" at the internal meeting of 2026-09-01:
 * the identity framing was landing after the click, not before it, so the label
 * now names the action instead of the role. "Guardian" survives everywhere it
 * is actually earned — the campaign section, the tier names and the FAQ.
 *
 * Every instance points at the same destination, so every instance carries the
 * same words: identical links with identical names is the correct behaviour
 * here, not a duplicate-label problem.
 */
export const CTA_LABEL = "Donate Now";

/**
 * The numbered sections of the fundraiser page, in page order.
 *
 * A section's numeral is its position in this list, so reordering the page
 * means reordering this list — no number is ever typed into a component. The
 * hero is deliberately unnumbered: it introduces the page rather than being a
 * step in it.
 */
export const sectionSequence = [
  "why-it-matters",
  "donor-fears",
  "threats",
  "solution",
  "rating-example",
  "how-we-audit",
  "capabilities",
  "independence",
  "guardians",
  "support",
  "faq",
  "final",
] as const;

export type SectionKey = (typeof sectionSequence)[number];

/** Two-digit numeral for a section, e.g. "01". */
export const sectionNumber = (key: SectionKey) =>
  String(sectionSequence.indexOf(key) + 1).padStart(2, "0");
