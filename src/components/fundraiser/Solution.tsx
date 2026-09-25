import { Section, SectionLabel } from "@/components/ui/Section";
import { AuditGrid, CrescentSweep } from "@/components/brand/Motifs";
import { SectionMedia } from "@/components/ui/SectionMedia";
import { sectionMedia } from "@/content/fundraiser";
import { sectionNumber, site } from "@/content/site";

/** The turn from problem to solution. */
export function Solution() {
  return (
    <Section
      id="solution"
      tone="evergreen"
      spacing="loose"
      labelledBy="solution-title"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-za-luminous opacity-[0.04]"
      >
        <AuditGrid className="size-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-72 -left-64 -z-10 w-[52rem] text-za-gold opacity-[0.08]"
      >
        <CrescentSweep className="size-full" />
      </div>

      <div className="za-shell">
        <div className="max-w-4xl">
          <SectionLabel number={sectionNumber("solution")} tone="dark">
            The solution
          </SectionLabel>

          <h2 id="solution-title" className="za-h2 mt-5 text-za-on-dark">
            {site.domain}
          </h2>

          <p className="za-h3 mt-7 font-display font-semibold text-za-luminous-ink">
            We are not here to hand you a simple calculator. We are here to act
            as the absolute shield for your wealth.
          </p>

          <p className="za-lede za-measure mt-8 text-za-on-dark-muted">
            Zakah Advisor is striving to be the world’s most comprehensive,
            uncompromising ecosystem designed to protect the donor, hold
            charities accountable, and guarantee the rights of the poor. We
            bridge orthodox Islamic scholarship with forensic financial
            auditing.
          </p>
        </div>

        <SectionMedia media={sectionMedia.solution} />

      </div>
    </Section>
  );
}
