import type { ReactNode } from "react";

/**
 * Section shell and heading.
 *
 * The page alternates deliberately between light editorial ground and Deep
 * Evergreen statement ground. That pacing carries the narrative — problem, then
 * solution, then independence, then action — so tone is an explicit prop rather
 * than something a section decides for itself.
 */

const tones = {
  canvas: "bg-za-canvas text-za-text",
  surface: "bg-za-surface text-za-text",
  evergreen: "bg-za-evergreen text-za-on-dark",
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

type SectionHeadingProps = {
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
  const eyebrowTone = isDark ? "text-za-gold" : "text-za-gold-ink";
  const titleTone = isDark ? "text-za-on-dark" : "text-za-text";
  const ledeTone = isDark ? "text-za-on-dark-muted" : "text-za-muted";
  const alignment =
    align === "center" ? "mx-auto text-center items-center" : "items-start";

  return (
    <div className={`flex flex-col ${alignment} ${className}`}>
      {eyebrow ? (
        <p className={`za-eyebrow mb-4 flex items-center gap-3 ${eyebrowTone}`}>
          <span
            aria-hidden="true"
            className={`h-px w-7 ${isDark ? "bg-za-gold/60" : "bg-za-gold-ink/50"}`}
          />
          {eyebrow}
        </p>
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
