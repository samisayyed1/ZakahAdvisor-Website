import { Section, SectionHeading } from "@/components/ui/Section";
import { auditPillars } from "@/content/fundraiser";

/**
 * The formal four-pillar charity assessment methodology.
 *
 * Distinct from the four operating principles in <Capabilities />. Both this
 * section and FAQ 3 read from the same `auditPillars` object, so the wording
 * lives in exactly one place.
 *
 * REVIEW DEPENDENCY: the internal meeting of 2026-08-27 assigned a revision of
 * this methodology description for clarity and accuracy. See the note on
 * `auditPillars` in src/content/fundraiser.ts.
 */
export function AuditMethodology() {
  return (
    <Section id="how-we-audit" tone="surface" labelledBy="methodology-title">
      <div className="za-shell">
        <SectionHeading
          eyebrow="The methodology"
          id="methodology-title"
          title="Four pillars. One rating."
          lede="Every charity we audit is assessed against the same rigorous four-pillar methodology, and every grade traces back to it."
          className="max-w-3xl"
        />

        <ol className="mt-14 grid gap-px overflow-hidden rounded-za-lg border border-za-hairline bg-za-hairline sm:grid-cols-2 lg:grid-cols-4">
          {auditPillars.map((pillar) => (
            <li
              key={pillar.number}
              className="flex flex-col bg-za-surface p-7 lg:p-8"
            >
              <span
                aria-hidden="true"
                // 3.49:1 on white. Audit Gold itself only reaches 2.5:1, so a quiet
                // numeral still uses the gold-ink token rather than a tint of the brand gold.
                className="font-display text-[2rem] leading-none font-bold text-za-gold-ink/75 tabular-nums"
              >
                {pillar.number}
              </span>

              <h3 className="mt-6 font-display text-[1.0625rem] leading-snug font-semibold text-za-text">
                {pillar.title}
              </h3>

              <p className="mt-3 text-[0.9375rem] leading-relaxed text-za-muted">
                {pillar.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
