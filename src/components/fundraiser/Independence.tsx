import { Section } from "@/components/ui/Section";
import { AuditGrid } from "@/components/brand/Motifs";
import { CtaButton } from "@/components/ui/CtaButton";
import { CloseIcon } from "@/components/brand/Icons";

/** The three funding sources Zakah Advisor refuses, per the source copy. */
const refusals = [
  "No commissions",
  "No kickbacks",
  "No institutional funding from the charities we audit",
];

/**
 * The differentiation section. Deep Evergreen, maximum weight — this is the
 * argument the whole fundraiser rests on, and it bridges into the ask.
 */
export function Independence() {
  return (
    <Section
      id="independence"
      tone="evergreen"
      spacing="loose"
      labelledBy="independence-title"
      className="overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-za-luminous opacity-[0.045]"
      >
        <AuditGrid className="size-full" />
      </div>

      <div className="za-shell">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="za-eyebrow flex items-center gap-3 text-za-gold">
              <span aria-hidden="true" className="h-px w-7 bg-za-gold/60" />
              Independence
            </p>

            <h2
              id="independence-title"
              className="za-h2 mt-6 text-balance text-za-on-dark"
            >
              Why We Refuse Charity Money{" "}
              <span className="text-za-luminous-ink">
                (And Why We Need YOU)
              </span>
            </h2>

            <ul className="mt-10 flex flex-col gap-3">
              {refusals.map((refusal) => (
                <li
                  key={refusal}
                  className="flex items-start gap-3 text-[0.9375rem] text-za-on-dark"
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border border-za-gold/50 text-za-gold"
                  >
                    <CloseIcon className="size-3" />
                  </span>
                  {refusal}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="za-lede za-measure text-za-on-dark">
              Here is another uncomfortable truth: the standard model for many
              “charity watchdogs” or donation portals is to take a percentage
              cut from the charities they feature.
            </p>

            <p className="mt-7 font-display text-[clamp(1.25rem,1.1rem+0.7vw,1.75rem)] leading-snug font-bold text-za-gold">
              We absolutely refuse to do this.
            </p>

            <p className="za-measure mt-7 text-za-on-dark-muted">
              If we take money from the charities we are supposed to be
              auditing, our objectivity is compromised. We cannot fiercely
              critique an organisation’s Shariah compliance if that same
              organisation is paying our server bills. To remain truly
              independent, unbiased, and ruthless in our audits, we must be
              funded entirely by the community.
            </p>

            <p className="za-measure mt-10 border-l-2 border-za-gold pl-6 font-display text-[clamp(1.125rem,1.02rem+0.5vw,1.5rem)] leading-snug font-semibold text-za-on-dark">
              Zakah Advisor exists to protect YOUR Zakah. But who protects Zakah
              Advisor?
            </p>

            <div className="mt-9">
              <CtaButton location="independence" />
              <p className="za-measure-tight mt-4 text-sm text-za-on-dark-muted">
                Help us preserve the third pillar of Islam by funding our
                independent charity audits and educational hubs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
