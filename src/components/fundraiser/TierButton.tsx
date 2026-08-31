"use client";

import { useId } from "react";

import { track } from "@/lib/analytics";
import { DONATION_ENV_VARS, getCheckoutUrl, type TierId } from "@/lib/donate";

/**
 * The only control on the page that starts a checkout.
 *
 * Destinations come from the validated environment configuration in
 * `@/lib/donate` — never from a literal in this component. Card details are
 * never collected here; the link hands off to the provider's hosted checkout.
 *
 * When a tier has no configured URL the control is disabled rather than
 * pointing somewhere plausible-but-wrong, and `npm run verify:donations`
 * (wired into `npm run build:production`) fails the deployment before that
 * state can reach a visitor.
 */

type TierButtonProps = {
  tier: TierId;
  tierName: string;
  amountLabel: string;
  /** The entry-point tier gets the solid gold treatment. */
  prominent?: boolean;
  className?: string;
};

const base =
  "inline-flex min-h-12 w-full items-center justify-center rounded-za px-5 py-3.5 " +
  "text-[0.9375rem] font-semibold tracking-[0.01em] transition-[background-color,border-color,color] " +
  "duration-200 ease-[var(--ease-za)]";

export function TierButton({
  tier,
  tierName,
  amountLabel,
  prominent = false,
  className = "",
}: TierButtonProps) {
  const noteId = useId();
  const url = getCheckoutUrl(tier);

  const style = prominent
    ? "bg-za-gold text-za-text hover:bg-za-gold-hover"
    : "border border-za-green/30 text-za-green hover:border-za-green hover:bg-za-green hover:text-white";

  const label = (
    <>
      Give {amountLabel} a month
      <span className="sr-only"> — {tierName}</span>
    </>
  );

  if (!url) {
    return (
      <div className={className}>
        <button
          type="button"
          disabled
          aria-describedby={noteId}
          className={`${base} cursor-not-allowed border border-za-hairline bg-za-canvas text-za-muted`}
        >
          {label}
        </button>

        {/* Screen-reader users get the reason in production too; developers
            additionally get the exact variable name to set. */}
        <p id={noteId} className="sr-only">
          Checkout for this tier is not available yet.
        </p>

        {process.env.NODE_ENV === "development" ? (
          <p className="mt-2 text-xs leading-relaxed text-za-muted">
            <span className="font-medium text-za-text">Dev:</span> set{" "}
            <code className="font-mono">{DONATION_ENV_VARS[tier]}</code>
          </p>
        ) : null}
      </div>
    );
  }

  return (
    <a
      href={url}
      rel="noopener noreferrer"
      onClick={() => {
        track({ name: "support_tier_selected", tier, location: "tiers" });
        track({ name: "checkout_started", tier, location: "tiers" });
      }}
      className={`${base} ${style} ${className}`}
    >
      {label}
    </a>
  );
}
