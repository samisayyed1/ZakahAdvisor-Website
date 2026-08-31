import type { Scripture } from "@/content/scripture";

/**
 * Qur'anic and Hadith text.
 *
 * Sacred text is given its own container, its own typeface and a great deal of
 * room. It is never treated as a decorative pull-quote, never animated, and
 * never cropped. The Arabic carries dir="rtl" lang="ar" so shaping, punctuation
 * and line breaking are handled correctly, and the leading is opened up so the
 * harakat never collide with the line above.
 */

type ScriptureBlockProps = {
  scripture: Scripture;
  tone?: "light" | "dark";
  /** Introduces the passage, e.g. "Allah ﷻ explicitly warns us…". */
  intro?: string;
  className?: string;
};

export function ScriptureBlock({
  scripture,
  tone = "light",
  intro,
  className = "",
}: ScriptureBlockProps) {
  const isDark = tone === "dark";

  const shell = isDark
    ? "border-za-hairline-dark bg-white/[0.03]"
    : "border-za-hairline bg-za-surface";
  const introTone = isDark ? "text-za-on-dark-muted" : "text-za-muted";
  const arabicTone = isDark ? "text-za-on-dark" : "text-za-green";
  const ruleTone = isDark ? "bg-za-gold/35" : "bg-za-gold/45";
  const translationTone = isDark ? "text-za-on-dark" : "text-za-text";
  const citationTone = isDark ? "text-za-gold" : "text-za-gold-ink";

  return (
    <figure
      className={`overflow-hidden rounded-za-lg border ${shell} ${className}`}
    >
      <div className="px-6 py-8 sm:px-10 sm:py-11">
        {intro ? (
          <p className={`za-measure mb-7 text-[0.9375rem] ${introTone}`}>{intro}</p>
        ) : null}

        <blockquote>
          <p
            dir="rtl"
            lang="ar"
            className={`font-arabic text-[clamp(1.35rem,1.05rem+1.35vw,2.05rem)] leading-[2.05] ${arabicTone}`}
          >
            {scripture.arabic}
          </p>

          <div className={`my-7 h-px w-16 ${ruleTone}`} aria-hidden="true" />

          <p
            className={`za-measure text-[clamp(1rem,0.97rem+0.18vw,1.125rem)] leading-[1.7] ${translationTone}`}
          >
            {scripture.translation}
          </p>
        </blockquote>

        <figcaption className={`za-eyebrow mt-6 ${citationTone}`}>
          {scripture.citation}
        </figcaption>
      </div>
    </figure>
  );
}
