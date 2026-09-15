"use client";

import type { ReactNode } from "react";

import { track, type CtaLocation } from "@/lib/analytics";
import { CTA_LABEL, SUPPORT_ANCHOR } from "@/content/site";

/**
 * The single primary call to action.
 *
 * Every "Donate Now" button on the page behaves identically: it moves the
 * visitor to the support-tier section, and it records where the click came from
 * so the tier CTAs are the only thing that ever starts a checkout. Identical
 * buttons never behave differently.
 *
 * Amber is the default and is reserved for this control. Anything else that
 * happens to be clickable uses an outline variant, so the page never offers the
 * reader two things that look equally like the primary action.
 */

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-za px-6 py-3.5 " +
  "text-center text-[0.9375rem] font-semibold tracking-[0.01em] " +
  "transition-[background-color,border-color,color,transform] duration-200 " +
  "ease-[var(--ease-za)] active:translate-y-px";

const variants = {
  /* Action Amber, the conversion colour set by the 2026-09-15 review. The
     near-black label holds 8.66:1 at rest and 6.94:1 on hover, so it never
     changes colour. Ratios are derived in globals.css. */
  amber:
    "bg-za-amber text-za-text hover:bg-za-amber-hover " +
    "shadow-[0_1px_0_rgba(0,0,0,0.08)]",
  /* Audit Gold with near-black text: 7.1:1, and 5.6:1 against the hover shade.
     White on gold would be 2.5:1, so it is never used. Retained for any action
     that must not compete with the donation CTA. */
  gold:
    "bg-za-gold text-za-text hover:bg-za-gold-hover " +
    "shadow-[0_1px_0_rgba(0,0,0,0.06)]",
  /* Outline for dark surfaces. */
  onDark:
    "border border-za-on-dark-muted/45 text-za-on-dark hover:border-za-gold hover:text-za-gold",
  /* Outline for light surfaces. */
  onLight:
    "border border-za-green/30 text-za-green hover:border-za-green hover:bg-za-green hover:text-white",
} as const;

type Variant = keyof typeof variants;

type CtaButtonProps = {
  location: CtaLocation;
  variant?: Variant;
  children?: ReactNode;
  className?: string;
  /** Overrides the destination; defaults to the support-tier section. */
  href?: string;
};

export function CtaButton({
  location,
  variant = "amber",
  children = CTA_LABEL,
  className = "",
  href = SUPPORT_ANCHOR,
}: CtaButtonProps) {
  return (
    <a
      href={href}
      onClick={() => track({ name: "guardian_cta_clicked", location })}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  );
}

/** A quiet secondary action, e.g. "See how we protect Zakah". */
export function SecondaryLink({
  href,
  children,
  tone = "dark",
  className = "",
}: {
  href: string;
  children: ReactNode;
  tone?: "dark" | "light";
  className?: string;
}) {
  const toneClass =
    tone === "dark"
      ? "text-za-on-dark hover:text-za-gold decoration-za-on-dark-muted/50 hover:decoration-za-gold"
      : "text-za-green hover:text-za-gold-ink decoration-za-green/35 hover:decoration-za-gold-ink";

  return (
    <a
      href={href}
      className={
        "inline-flex min-h-12 items-center gap-2 text-[0.9375rem] font-medium " +
        "underline decoration-1 underline-offset-[6px] transition-colors duration-200 " +
        `${toneClass} ${className}`
      }
    >
      {children}
    </a>
  );
}
