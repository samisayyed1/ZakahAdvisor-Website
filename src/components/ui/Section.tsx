import type { ReactNode } from "react";

/**
 * Section shell, label and heading.
 *
 * Neighbouring sections never share a ground (landing page review,
 * 2026-09-15): Deep Teal for the major, high-impact sections, warm off-white
 * for main content, light green/cream for supporting sections. Tone is an
 * explicit prop rather than something a section decides for itself, so the
 * rhythm is set once per section and can be audited straight down the page.
 */

const tones = {
  canvas: "bg-za-canvas text-za-text",
  cream: "bg-za-cream text-za-text",
  evergreen: "za-dark-ground bg-za-evergreen text-za-on-dark",
} as const;

type Tone = keyof typeof tones;

type SectionProps = {
  id?: string;
  tone?: Tone;
  children: ReactNode;
  className?: string;
  /** Vertical rhythm. `tight` for linked sections that read as one movement. */
  spacing?: "default" | "tight" | "loose";
  labelledBy?: string;
};

const spacings = {
  tight: "py-14 sm:py-16 lg:py-20",
  default: "py-16 sm:py-20 lg:py-28",
  loose: "py-20 sm:py-28 lg:py-36",
} as const;

export function Section({
  id,
  tone = "canvas",
  children,
  className = "",
  spacing = "default",
  labelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`relative isolate ${tones[tone]} ${spacings[spacing]} ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * The first two of the three levels that open every section: a large gold
 * numeral, then the label. The heading that follows is the third.
 *
 * The numeral is decorative sequence, hidden from assistive technology; the
 * label and heading carry the meaning. Pass the numeral from `sectionNumber()`
 * in `@/content/site` — never as a literal.
 */
export function SectionLabel({
  number,
  children,
  tone = "light",
  className = "",
}: {
  number?: string;
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  const isDark = tone === "dark";

  return (
    <div className={`flex flex-col ${className}`}>
      {number ? (
        <span
          aria-hidden="true"
          // Audit Gold on Deep Teal (4.81:1). On the light grounds Audit Gold
          // falls under the 3:1 large-text floor, so they use the numeral shade.
          className={`font-display text-[clamp(2.5rem,2.1rem+1.8vw,3.5rem)] leading-none font-bold tracking-[-0.04em] tabular-nums ${
            isDark ? "text-za-gold" : "text-za-gold-numeral"
          }`}
        >
          {number}
        </span>
      ) : null}

      <p
        className={`za-label ${number ? "mt-3" : ""} ${
          isDark ? "text-za-on-dark" : "text-za-green"
        }`}
      >
        {children}
      </p>
    </div>
  );
}

type SectionHeadingProps = {
  /** Two-digit numeral from `sectionNumber()`. */
  number?: string;
  eyebrow?: string;
  title: ReactNode;
  /** Rendered as the section's own heading level. */
  id?: string;
  lede?: ReactNode;
  tone?: "light" | "dark";
  align?: "start" | "center";
  className?: string;
  as?: "h2" | "h3";
};

export function SectionHeading({
  number,
  eyebrow,
  title,
  id,
  lede,
  tone = "light",
  align = "start",
  className = "",
  as: Heading = "h2",
}: SectionHeadingProps) {
  const isDark = tone === "dark";
  const titleTone = isDark ? "text-za-on-dark" : "text-za-text";
  const ledeTone = isDark ? "text-za-on-dark-muted" : "text-za-muted";
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <SectionLabel
          number={number}
          tone={tone}
          className={`mb-5 ${align === "center" ? "items-center" : "items-start"}`}
        >
          {eyebrow}
        </SectionLabel>
      ) : null}

      <Heading id={id} className={`za-h2 ${titleTone}`}>
        {title}
      </Heading>

      {lede ? (
        <div
          className={`za-lede za-measure mt-6 ${ledeTone} ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {lede}
        </div>
      ) : null}
    </div>
  );
}
