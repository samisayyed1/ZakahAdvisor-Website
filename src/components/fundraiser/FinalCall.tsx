import { Section } from "@/components/ui/Section";
import { ScriptureBlock } from "@/components/ui/ScriptureBlock";
import { CtaButton } from "@/components/ui/CtaButton";
import { CrescentSweep } from "@/components/brand/Motifs";
import { hadithZakah } from "@/content/scripture";

/**
 * The closing section.
 *
 * Weight comes from typography, whitespace and restraint. The Hadith is not
 * animated, not overlaid on imagery, and not used as a marketing device.
 */
export function FinalCall() {
  return (
    <Section
      id="final"
      tone="evergreen"
      spacing="loose"
      labelledBy="final-title"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-80 -right-72 -z-10 w-[56rem] text-za-gold opacity-[0.07]"
      >
        <CrescentSweep className="size-full" />
      </div>

      <div className="za-shell">
        <div className="max-w-3xl">
          <p className="za-eyebrow flex items-center gap-3 text-za-gold">
            <span aria-hidden="true" className="h-px w-7 bg-za-gold/60" />
            The final verdict
          </p>

          <h2 id="final-title" className="za-h2 mt-6 text-za-on-dark">
            Your wealth is a test.
          </h2>

          <p className="za-lede za-measure mt-7 text-za-on-dark-muted">
            The Prophet ﷺ warned us that on the Day of Judgement, unpurified
            wealth will manifest as a terrifying punishment. We cannot afford to
            be careless with the third pillar of our religion.
          </p>
        </div>

        <ScriptureBlock
          scripture={hadithZakah}
          tone="dark"
          className="mt-12 max-w-4xl"
        />

        <div className="mt-14 max-w-3xl">
          <p className="za-measure text-za-on-dark-muted">
            The standard is set. The infrastructure is built. We have begun
            auditing the first wave of charities, but with thousands more
            operating in the dark, we urgently need your support to scale this
            work and audit every major organisation across the globe, and to
            develop a 100+ educational resources about Zakah (Articles,
            Podcasts, Videos, Interviews with scholars, etc).
          </p>

          <p className="mt-9 font-display text-[clamp(1.375rem,1.15rem+1.05vw,2.125rem)] leading-tight font-bold text-balance text-za-on-dark">
            Will you be one of the 1,000 visionaries who secures the integrity
            of Zakah for generations to come?
          </p>

          <div className="mt-10">
            <CtaButton location="final" />
            <p className="za-measure-tight mt-4 text-sm text-za-on-dark-muted">
              Help us preserve the third pillar of Islam by funding our
              independent charity audits and educational hubs.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
