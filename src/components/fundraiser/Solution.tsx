import { Section } from "@/components/ui/Section";
import { AuditGrid, CrescentSweep } from "@/components/brand/Motifs";
import { site } from "@/content/site";

const bridge = [
  {
    label: "Orthodox Islamic scholarship",
    note: "Classical Fiqh, applied without shortcuts.",
  },
  {
    label: "Forensic financial auditing",
    note: "Public filings, real numbers, no marketing.",
  },
  {
    label: "Published transparency",
    note: "Our methodology and sources, in the open.",
  },
];

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
          <p className="za-eyebrow flex items-start gap-3 text-za-gold">
            <span aria-hidden="true" className="mt-[0.58em] h-px w-7 bg-za-gold/60" />
            The solution
          </p>

          <h2 id="solution-title" className="za-h2 mt-6 text-za-on-dark">
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

        <dl className="mt-14 grid gap-px overflow-hidden rounded-za-lg border border-za-hairline-dark bg-za-hairline-dark sm:grid-cols-3">
          {bridge.map((item) => (
            <div key={item.label} className="bg-za-evergreen p-7 lg:p-8">
              <dt className="font-display text-[1.0625rem] leading-snug font-semibold text-za-on-dark">
                {item.label}
              </dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed text-za-on-dark-muted">
                {item.note}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
