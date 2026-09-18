import { LogoIcon } from "@/components/brand/Logo";
import { ZWatermark } from "@/components/brand/Motifs";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SectionMedia } from "@/components/ui/SectionMedia";
import { sectionMedia, zakahEstimateSource } from "@/content/fundraiser";
import { sectionNumber } from "@/content/site";

const fronts = [
  {
    number: "1",
    title: "Institutional lack of transparency",
  },
  {
    number: "2",
    title: "Widespread financial illiteracy",
  },
];

/**
 * What the estimate could do. One source sentence — "It is enough to rebuild
 * Gaza, stabilise Sudan, and ensure no widow or orphan sleeps hungry" — split
 * at its own commas so it scans. The words are unchanged.
 */
const enoughTo = [
  "Rebuild Gaza",
  "Stabilise Sudan",
  "Ensure no widow or orphan sleeps hungry",
];

/**
 * The sourced estimate, as a Deep Teal key-statistic plate.
 *
 * A fixed, sourced figure on a static plate — never a counter, a live metric or
 * an animated number — with its attribution directly beneath it as plain text.
 * No URL is invented.
 */
function EstimatePlate() {
  return (
    <figure className="za-dark-ground rounded-za-xl bg-za-evergreen px-6 py-8 text-za-on-dark shadow-za-lift sm:px-9 sm:py-10">
      <div className="flex items-center justify-between gap-4">
        <p className="za-eyebrow text-za-on-dark-muted">
          Estimated annual global Zakah
        </p>
        <LogoIcon variant="inverse" className="size-7 shrink-0 opacity-70" />
      </div>

      <p className="mt-5 font-display text-[clamp(1.25rem,0.55rem+3.4vw,2.75rem)] leading-none font-bold tracking-[-0.03em] text-za-gold tabular-nums">
        $200,000,000,000
      </p>

      <div aria-hidden="true" className="my-7 h-px w-full bg-za-hairline-dark" />

      <p className="text-[1.0625rem] leading-snug text-za-on-dark">
        On the raw numbers, theoretically more than enough to eradicate extreme
        poverty across the Muslim world{" "}
        <strong className="font-bold text-za-gold">twice over</strong>.
      </p>

      <p className="za-eyebrow mt-7 text-za-on-dark-muted">It is enough to</p>

      <ul className="mt-4 flex flex-col gap-3">
        {enoughTo.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 font-display text-[1.0625rem] leading-snug font-semibold text-za-on-dark"
          >
            {/* Olive: the page's secondary accent. */}
            <span
              aria-hidden="true"
              className="mt-[0.45em] size-2 shrink-0 rounded-full bg-za-luminous-ink"
            />
            {item}
          </li>
        ))}
      </ul>

      <figcaption className="mt-8 border-t border-za-hairline-dark pt-5 text-[0.8125rem] leading-relaxed text-za-on-dark-muted">
        <span className="font-medium text-za-on-dark">Source: </span>
        {zakahEstimateSource}
      </figcaption>
    </figure>
  );
}

/**
 * Section 01 — the scale of the trust.
 *
 * Restructured by the landing page review of 2026-09-15 so it scans before it
 * reads: the question and the sourced figure sit side by side, then the answer
 * — two fronts — follows as its own block, with its key phrases carried by
 * type weight rather than buried mid-paragraph.
 *
 * The estimate plate moved here from the hero, which had been restating the
 * same figure. This section's opening sentence ("If you look at the raw
 * numbers…") repeated the plate, so it is removed, and the Gaza sentence that
 * followed it now lives on the plate. The plate no longer closes on "Yet global
 * poverty persists": the heading right beside it says exactly that.
 */
export function WhyItMatters() {
  return (
    <Section id="why-it-matters" tone="canvas" labelledBy="why-it-matters-title">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-za-green opacity-[0.016]"
      >
        <ZWatermark className="size-full" />
      </div>

      <div className="za-shell">
        {/* The question, beside the figure that raises it. */}
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
          <SectionHeading
            className="lg:order-2"
            number={sectionNumber("why-it-matters")}
            eyebrow="The scale of the trust"
            id="why-it-matters-title"
            title={
              <>
                Yet, global poverty
                <br className="hidden sm:block" /> persists. Why?
              </>
            }
          />

          <div className="lg:order-1">
            <EstimatePlate />
          </div>
        </div>

        {/* The answer. Dark ground: this is the argument the section exists to
            make, and on a light panel it was reading as a description people
            scrolled past (review, 2026-09-17). */}
        <div className="za-dark-ground mt-16 rounded-za-xl bg-za-evergreen px-6 py-12 text-za-on-dark sm:px-10 sm:py-14 lg:mt-24 lg:px-14 lg:py-16">
          <p className="za-measure font-display text-[clamp(1.25rem,1.1rem+0.7vw,1.625rem)] leading-snug font-semibold text-za-on-dark">
            Because the modern Islamic charity sector is{" "}
            <span className="text-za-luminous-ink">fundamentally broken</span>,
            and the third pillar of our religion is being compromised on two
            major fronts:
          </p>

          <ol className="mt-10 grid gap-4 sm:grid-cols-2">
            {fronts.map((front) => (
              <li
                key={front.number}
                className="flex items-center gap-5 rounded-za-lg border border-za-hairline-dark bg-white/[0.04] p-6 sm:p-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-[2.5rem] leading-none font-bold text-za-gold tabular-nums"
                >
                  {front.number}
                </span>
                <span className="font-display text-[clamp(1.125rem,1.05rem+0.35vw,1.3125rem)] leading-snug font-semibold text-za-on-dark">
                  {front.title}
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-14 grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-16">
            <p className="za-measure text-[1.0625rem] leading-relaxed text-za-on-dark-muted">
              <strong className="font-semibold text-za-on-dark">
                We are terrified of making a mistake in our Wudu,
              </strong>{" "}
              yet we regularly calculate our Zakah on the back of a napkin in
              five minutes, click a generic “donate” button online, and simply
              hope Allah accepts it.
            </p>

            <p className="za-measure border-l-2 border-za-gold pl-6 font-display text-[clamp(1.125rem,1.02rem+0.5vw,1.5rem)] leading-snug font-semibold text-za-on-dark">
              Ignorance about Zakah is not bliss. It is an active hazard to your
              Akhirah.
            </p>
          </div>
        </div>

        <SectionMedia media={sectionMedia["why-it-matters"]} />
      </div>
    </Section>
  );
}
