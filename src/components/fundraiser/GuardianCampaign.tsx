import { Section } from "@/components/ui/Section";
import { AuditRings } from "@/components/brand/Motifs";
import { ScriptureBlock } from "@/components/ui/ScriptureBlock";
import { CtaButton } from "@/components/ui/CtaButton";
import { baqarah } from "@/content/scripture";

/**
 * The campaign block.
 *
 * The goal of 1,000 is stated; no current count and no progress bar is shown.
 * There is no data source for a live figure, and a fabricated one would be
 * exactly the kind of thing this organisation exists to catch.
 */
export function GuardianCampaign() {
  return (
    <Section
      id="guardians"
      tone="evergreen"
      spacing="loose"
      labelledBy="guardians-title"
      className="overflow-hidden border-t border-za-hairline-dark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-64 -right-64 -z-10 w-[46rem] text-za-gold opacity-[0.09]"
      >
        <AuditRings className="size-full" />
      </div>

      <div className="za-shell">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <div>
            <p className="za-eyebrow flex items-center gap-3 text-za-gold">
              <span aria-hidden="true" className="h-px w-7 bg-za-gold/60" />
              The call
            </p>

            <h2 id="guardians-title" className="za-h2 mt-6 text-za-on-dark">
              Join the FIRST 1,000 Zakah Guardians
            </h2>

            <p className="za-lede za-measure mt-7 text-za-on-dark">
              We are launching an urgent global campaign to find 1,000
              visionaries willing to pledge just $10 a month in recurring
              Sadaqah.
            </p>

            <p className="za-measure mt-6 text-za-on-dark-muted">
              This is not just about keeping a website online. This is about
              building a sustainable, global authority that forces the entire
              Islamic charity sector to elevate its standards through strict
              accountability.
            </p>

            <p className="za-measure mt-6 text-za-on-dark-muted">
              By funding our operations, you are actively purifying the
              ecosystem of Islamic charity. You earn a share of the reward for
              every single dollar we successfully route away from mishandling
              and place directly into the hands of an orphan, a widow, or a
              stranded traveller in Gaza, Yemen, or beyond. Your $10 could save
              a $1,000 for those who need it!
            </p>

            <div className="mt-10">
              <CtaButton location="campaign" />
            </div>
          </div>

          {/* Goal plate — a target, not a progress meter. */}
          <div className="lg:pt-16">
            <div className="rounded-za-xl border border-za-hairline-dark bg-white/[0.035] p-7 sm:p-9">
              <p className="za-eyebrow text-za-on-dark-muted">
                Founding Guardians — the goal
              </p>
              <p className="mt-4 font-display text-[clamp(3rem,2.2rem+3.6vw,4.75rem)] leading-none font-bold tracking-[-0.04em] text-za-gold tabular-nums">
                1,000
              </p>

              <div
                aria-hidden="true"
                className="my-7 h-px w-full bg-za-hairline-dark"
              />

              <dl className="flex flex-col gap-5">
                <div>
                  <dt className="za-eyebrow text-za-on-dark-muted">
                    Entry pledge
                  </dt>
                  <dd className="mt-1.5 font-display text-[1.375rem] font-bold text-za-on-dark tabular-nums">
                    $10{" "}
                    <span className="font-sans text-[0.9375rem] font-medium text-za-on-dark-muted">
                      / month
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="za-eyebrow text-za-on-dark-muted">
                    Given as
                  </dt>
                  <dd className="mt-1.5 text-[0.9375rem] text-za-on-dark">
                    Recurring Sadaqah — never Zakah
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <ScriptureBlock
          scripture={baqarah}
          tone="dark"
          intro="Allah ﷻ commands us to give from the best of what we have earned:"
          className="mt-16"
        />
      </div>
    </Section>
  );
}
