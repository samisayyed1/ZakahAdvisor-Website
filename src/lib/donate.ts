/**
 * Centralised donation-link configuration.
 *
 * No payment provider exists in this repository yet, and no merchant account,
 * checkout route or payment link was supplied with the source material. Rather
 * than invent one, every checkout destination is read from the environment and
 * validated here. Components never see a raw URL string from anywhere else.
 *
 * Card data is never handled by this application. Each tier link is expected to
 * point at a hosted checkout (Stripe, Donorbox, Givebutter, LaunchGood or
 * equivalent) operated by the payment provider.
 *
 * Production readiness: `npm run verify:donations` fails when any tier is
 * unconfigured, and `npm run build:production` runs it before `next build`.
 * See README.md → "Donation links".
 */

import type { SupportTier } from "@/content/fundraiser";

export type TierId = SupportTier["id"];

/**
 * Next.js inlines `process.env.NEXT_PUBLIC_*` only for full, static property
 * accesses — so each variable is spelled out rather than looked up dynamically.
 */
const rawLinks: Record<TierId, string | undefined> = {
  "10": process.env.NEXT_PUBLIC_DONATE_10_URL,
  "25": process.env.NEXT_PUBLIC_DONATE_25_URL,
  "50": process.env.NEXT_PUBLIC_DONATE_50_URL,
  "100": process.env.NEXT_PUBLIC_DONATE_100_URL,
  "200": process.env.NEXT_PUBLIC_DONATE_200_URL,
};

export const DONATION_ENV_VARS: Record<TierId, string> = {
  "10": "NEXT_PUBLIC_DONATE_10_URL",
  "25": "NEXT_PUBLIC_DONATE_25_URL",
  "50": "NEXT_PUBLIC_DONATE_50_URL",
  "100": "NEXT_PUBLIC_DONATE_100_URL",
  "200": "NEXT_PUBLIC_DONATE_200_URL",
};

/**
 * Accepts only absolute `https:` URLs. This rejects empty strings, relative
 * paths, and `javascript:`/`data:` values that would otherwise become an
 * injection vector through the environment.
 */
export function isValidCheckoutUrl(value: string | undefined): value is string {
  if (!value) return false;
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

const entries = Object.entries(rawLinks) as [TierId, string | undefined][];

/** Validated checkout URL per tier; `null` where the tier is unconfigured. */
export const donationLinks: Record<TierId, string | null> = Object.fromEntries(
  entries.map(([id, value]) => [id, isValidCheckoutUrl(value) ? value : null]),
) as Record<TierId, string | null>;

/** Tiers still awaiting a real checkout URL. */
export const missingDonationTiers: TierId[] = entries
  .filter(([id]) => donationLinks[id] === null)
  .map(([id]) => id);

/** True only when every tier resolves to a valid https checkout URL. */
export const isDonationConfigured = missingDonationTiers.length === 0;

export function getCheckoutUrl(tier: TierId): string | null {
  return donationLinks[tier];
}
