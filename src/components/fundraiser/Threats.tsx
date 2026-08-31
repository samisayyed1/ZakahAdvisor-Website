import { Section, SectionHeading } from "@/components/ui/Section";
import { ScriptureBlock } from "@/components/ui/ScriptureBlock";
import { CtaButton } from "@/components/ui/CtaButton";
import { modernAssets, threats } from "@/content/fundraiser";
import { anfal } from "@/content/scripture";

export function Threats() {
  const [blackBox, financialGap] = threats;

  return (
    <Section id="threats" tone="canvas" spacing="loose" labelledBy="threats-title">
      <div className="za-shell">
        <SectionHeading
          eyebrow="The problem"
          id="threats-title"
          title="The Two Major Threats to Your Zakah"
          className="max-w-3xl"
        />

        {/* Threat 1 — The Charity Black Box -------------------------------- */}
        <article
          id={blackBox.id}
          aria-labelledby={`${blackBox.id}-title`}
          className="mt-16 border-t border-za-hairline pt-12 lg:mt-20 lg:pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <header className="lg:sticky lg:top-28 lg:self-start">
              <p className="za-eyebrow text-za-gold-ink tabular-nums">
                Threat {blackBox.index}
              </p>
              <h3
                id={`${blackBox.id}-title`}
                className="za-h3 mt-4 text-za-text"
              >
                {blackBox.title}
              </h3>
            </header>

            <div>
              {blackBox.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={`za-measure text-[1.0625rem] leading-relaxed text-za-muted ${
                    index === 0 ? "text-za-text" : "mt-5"
                  }`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <ScriptureBlock
            scripture={anfal}
            intro="Allah ﷻ explicitly warns us about mishandling our sacred duties:"
            className="mt-12"
          />

          <p className="za-measure mt-12 font-display text-[clamp(1.125rem,1.02rem+0.5vw,1.5rem)] leading-snug font-semibold text-za-text">
            {blackBox.closing}
          </p>

          <div className="mt-9">
            <CtaButton location="threats" className="w-full sm:w-auto" />
            <p className="za-measure-tight mt-4 text-sm text-za-muted">
              Help us preserve the third pillar of Islam by funding our
              independent charity audits and educational hubs.
            </p>
          </div>
        </article>

        {/* Threat 2 — The Modern Financial Gap ----------------------------- */}
        <article
          id={financialGap.id}
          aria-labelledby={`${financialGap.id}-title`}
          className="mt-16 border-t border-za-hairline pt-12 lg:mt-24 lg:pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:gap-16">
            <header className="lg:sticky lg:top-28 lg:self-start">
              <p className="za-eyebrow text-za-gold-ink tabular-nums">
                Threat {financialGap.index}
              </p>
              <h3
                id={`${financialGap.id}-title`}
                className="za-h3 mt-4 text-za-text"
              >
                {financialGap.title}
              </h3>
            </header>

            <div>
              {financialGap.paragraphs.map((paragraph, index) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className={`za-measure text-[1.0625rem] leading-relaxed text-za-muted ${
                    index === 0 ? "text-za-text" : "mt-5"
                  }`}
                >
                  {paragraph}
                </p>
              ))}

              <p className="za-measure mt-8 text-[1.0625rem] leading-relaxed text-za-text">
                {financialGap.closing}
              </p>
            </div>
          </div>

          {/* Where classical Fiqh meets a modern balance sheet. Labels and
              notes restate the asset classes named in the source copy and the
              donor checklist — no new calculation rule is introduced. */}
          <dl className="mt-12 grid gap-px overflow-hidden rounded-za-lg border border-za-hairline bg-za-hairline sm:grid-cols-2 lg:grid-cols-4">
            {modernAssets.map((asset) => (
              <div key={asset.label} className="bg-za-surface p-6 lg:p-7">
                <dt className="font-display text-[1rem] leading-snug font-semibold text-za-green">
                  {asset.label}
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-za-muted">
                  {asset.note}
                </dd>
              </div>
            ))}
          </dl>
        </article>
      </div>
    </Section>
  );
}
