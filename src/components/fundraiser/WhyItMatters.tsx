import { Section, SectionHeading } from "@/components/ui/Section";
import { ZWatermark } from "@/components/brand/Motifs";

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
 * The editorial bridge out of the hero: the scale of the capital, the question
 * it raises, and the two fronts on which the third pillar is being compromised.
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <SectionHeading
            eyebrow="The scale of the trust"
            id="why-it-matters-title"
            title={
              <>
                Yet, global poverty
                <br className="hidden sm:block" /> persists. Why?
              </>
            }
            className="lg:sticky lg:top-28 lg:self-start"
          />

          <div>
            <p className="za-lede za-measure text-za-text">
              If you look at the raw numbers, this capital is theoretically more
              than enough to eradicate extreme poverty across the Muslim world,{" "}
              <em className="font-display font-semibold not-italic text-za-green">
                twice
              </em>
              . It is enough to rebuild Gaza, stabilise Sudan, and ensure no
              widow or orphan sleeps hungry.
            </p>

            <p className="za-measure mt-6 text-za-muted">
              Because the modern Islamic charity sector is fundamentally broken,
              and the third pillar of our religion is being compromised on two
              major fronts:
            </p>

            <ol className="mt-8 grid gap-px overflow-hidden rounded-za-lg border border-za-hairline bg-za-hairline sm:grid-cols-2">
              {fronts.map((front) => (
                <li
                  key={front.number}
                  className="flex items-baseline gap-4 bg-za-surface p-6"
                >
                  <span
                    aria-hidden="true"
                    className="font-display text-[1.375rem] font-bold text-za-gold-ink tabular-nums"
                  >
                    {front.number}
                  </span>
                  <span className="font-display text-[1.0625rem] leading-snug font-semibold text-za-text">
                    {front.title}
                  </span>
                </li>
              ))}
            </ol>

            <p className="za-measure mt-10 text-za-muted">
              We are terrified of making a mistake in our Wudu, yet we regularly
              calculate our Zakah on the back of a napkin in five minutes, click
              a generic “donate” button online, and simply hope Allah accepts
              it.
            </p>

            <p className="za-measure mt-8 border-l-2 border-za-gold pl-6 font-display text-[clamp(1.125rem,1.02rem+0.5vw,1.5rem)] leading-snug font-semibold text-za-text">
              Ignorance about Zakah is not bliss. It is an active hazard to your
              Akhirah.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
