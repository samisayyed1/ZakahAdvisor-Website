import Image from "next/image";

/**
 * The approved Zakah Advisor logo.
 *
 * Both files are the delivered vector artwork with the packaged background
 * plate removed and the viewBox tightened — the geometry itself is untouched.
 * Per the brand guide the wordmark is never re-typed from a font, never
 * recoloured beyond the two approved variants, and never stretched, rotated,
 * shadowed or placed over busy imagery.
 *
 *  - `light`   — Institutional Green + Audit Gold, for light surfaces.
 *  - `inverse` — Luminous Green + Audit Gold, for dark surfaces.
 */

const SOURCES = {
  light: "/brand/logo-horizontal.svg",
  inverse: "/brand/logo-horizontal-inverse.svg",
} as const;

const ICON_SOURCES = {
  light: "/brand/logo-icon.svg",
  inverse: "/brand/logo-icon-inverse.svg",
} as const;

type Variant = keyof typeof SOURCES;

type LogoProps = {
  variant?: Variant;
  className?: string;
  priority?: boolean;
  /**
   * Decorative when the logo sits inside a link that already carries the
   * accessible name, so the name is not announced twice.
   */
  decorative?: boolean;
};

export function Logo({
  variant = "light",
  className,
  priority = false,
  decorative = false,
}: LogoProps) {
  return (
    <Image
      src={SOURCES[variant]}
      alt={decorative ? "" : "Zakah Advisor"}
      aria-hidden={decorative || undefined}
      // Intrinsic ratio of the delivered artwork (3.156:1). Set explicitly so
      // the header reserves its box before the SVG lands — no layout shift.
      width={4862}
      height={1540}
      unoptimized
      priority={priority}
      className={className}
    />
  );
}

export function LogoIcon({
  variant = "light",
  className,
  decorative = true,
}: LogoProps) {
  return (
    <Image
      src={ICON_SOURCES[variant]}
      alt={decorative ? "" : "Zakah Advisor"}
      aria-hidden={decorative || undefined}
      width={3000}
      height={3002}
      unoptimized
      className={className}
    />
  );
}
