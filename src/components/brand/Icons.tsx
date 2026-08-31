import type { SVGProps } from "react";

/**
 * Custom iconography, drawn to the brand guide's rules (§9):
 *  - a perfectly circular outer path, echoing the Audit Glass;
 *  - one decisive angular element inside it;
 *  - two-tone, with Audit Gold reserved for the single "action" element;
 *  - a constant stroke weight across the whole set.
 *
 * Colour is taken from two CSS custom properties so the same icon works on a
 * light canvas (Institutional Green) and on Deep Evergreen (Luminous Green)
 * without arbitrary inversion:
 *   --icon-base   the circular structure
 *   --icon-accent the gold action element
 */

const BASE = "var(--icon-base, var(--color-za-green))";
const ACCENT = "var(--icon-accent, var(--color-za-gold))";
const WEIGHT = 3;

type BrandIconProps = Omit<SVGProps<SVGSVGElement>, "children">;

function IconFrame({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/** Forensic Charity Auditing — the Audit Glass reading a falling ledger line. */
export function AuditIcon(props: BrandIconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="20" cy="20" r="13" stroke={BASE} strokeWidth={WEIGHT} />
      <path d="M29.6 29.6 39.5 39.5" stroke={BASE} strokeWidth={WEIGHT + 1} />
      <path
        d="M13.8 23.6 18.6 18.2 22.6 21.8 27.4 13.6"
        stroke={ACCENT}
        strokeWidth={WEIGHT}
      />
    </IconFrame>
  );
}

/** Modern Financial Precision — a calibrated target locked on a single point. */
export function PrecisionIcon(props: BrandIconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="24" cy="24" r="15" stroke={BASE} strokeWidth={WEIGHT} />
      <path
        d="M24 6.5v6M24 35.5v6M6.5 24h6M35.5 24h6"
        stroke={BASE}
        strokeWidth={WEIGHT}
      />
      <path d="M24 18.5 29.5 24 24 29.5 18.5 24Z" stroke={ACCENT} strokeWidth={WEIGHT} />
    </IconFrame>
  );
}

/** Total Transparency (Amanah) — an open disclosure above the mnemonic dot. */
export function TransparencyIcon(props: BrandIconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="24" cy="24" r="15" stroke={BASE} strokeWidth={WEIGHT} />
      <path d="M15.5 27.5 24 18.2 32.5 27.5" stroke={ACCENT} strokeWidth={WEIGHT} />
      <circle cx="24" cy="32.6" r="2.4" fill={BASE} />
    </IconFrame>
  );
}

/** Zero Institutional Bias (Ikhlas) — institutional money, decisively refused. */
export function IndependenceIcon(props: BrandIconProps) {
  return (
    <IconFrame {...props}>
      <circle cx="24" cy="24" r="15" stroke={BASE} strokeWidth={WEIGHT} />
      <path d="M24 15.2 32.8 24 24 32.8 15.2 24Z" stroke={BASE} strokeWidth={WEIGHT} />
      <path d="M17.4 30.6 30.6 17.4" stroke={ACCENT} strokeWidth={WEIGHT} />
    </IconFrame>
  );
}

export const capabilityIcons = {
  audit: AuditIcon,
  precision: PrecisionIcon,
  transparency: TransparencyIcon,
  independence: IndependenceIcon,
} as const;

/* -------------------------------------------------------------------------- */
/* Utility icons — plain, unbranded, no icon package pulled in for four glyphs. */
/* -------------------------------------------------------------------------- */

export function ChevronIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M3.5 7h17M3.5 12h17M3.5 17h17" />
    </svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
    </svg>
  );
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ArrowDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M12 4.5v15M6 13.5l6 6 6-6" />
    </svg>
  );
}
