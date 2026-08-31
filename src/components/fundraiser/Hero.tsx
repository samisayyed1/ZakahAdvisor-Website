import { AuditRings, AuditGrid } from "@/components/brand/Motifs";
import { LogoIcon } from "@/components/brand/Logo";
import { CtaButton, SecondaryLink } from "@/components/ui/CtaButton";
import { ArrowDownIcon } from "@/components/brand/Icons";
import { zakahEstimateSource } from "@/content/fundraiser";

/**
 * Hero.
 *
 * The $200,000,000,000 figure is presented as a fixed, sourced estimate on a
 * static plate — never as a counter, a live metric or an animated number. Its
 * attribution sits directly beneath it as plain text; no URL is invented.
 */
export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="za-dark-ground relative isolate overflow-hidden bg-za-evergreen pt-28 pb-16 text-za-on-dark sm:pt-32 sm:pb-20 lg:pt-40 lg:pb-28"
    >
      {/* Structure, at 2–5% intensity. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 text-za-luminous opacity-[0.05]"
      >
        <AuditGrid className="size-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-56 -z-10 hidden w-[46rem] text-za-gold opacity-[0.10] lg:block"
      >
        <AuditRings className="size-full" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-black/20"
      />

      <div className="za-shell">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          {/* Copy ------------------------------------------------------- */}
          <div className="za-rise">
            <p className="za-eyebrow flex items-start gap-3 text-za-gold">
              <span aria-hidden="true" className="mt-[0.58em] h-px w-7 bg-za-gold/60" />
              An independent Zakah accountability initiative
            </p>

            <h1 id="hero-title" className="za-h1 mt-6 text-za-on-dark">
              The $200 Billion Trust
            </h1>

            <p className="za-h3 mt-6 max-w-[24ch] font-display font-semibold text-za-luminous-ink sm:max-w-none">
              Is your Zakah Funding the Ummah, or Funding a Black Box?
            </p>

            <p className="za-lede za-measure mt-7 text-za-on-dark-muted">
              An uncomfortable truth is hiding in plain sight within the global
              Muslim community. Every single year, the Ummah generates an
              estimated $200,000,000,000 in Zakah. That’s too many zeros to
              count!
            </p>

            <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
              <CtaButton location="hero" className="w-full sm:w-auto" />
              <SecondaryLink href="#solution" tone="dark">
                See how we protect Zakah
                <ArrowDownIcon className="size-4" />
              </SecondaryLink>
            </div>
          </div>

          {/* The estimate plate ----------------------------------------- */}
          <figure className="za-rise relative [animation-delay:120ms]">
            <div className="relative overflow-hidden rounded-za-xl border border-za-hairline-dark bg-white/[0.035] px-6 py-8 sm:px-9 sm:py-10">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-24 w-[26rem] text-za-luminous opacity-[0.13]"
              >
                <AuditRings className="size-full" />
              </div>

              <div className="relative">
                <div className="flex items-center justify-between gap-4">
                  <p className="za-eyebrow text-za-on-dark-muted">
                    Estimated annual global Zakah
                  </p>
                  <LogoIcon
                    variant="inverse"
                    className="size-7 shrink-0 opacity-70"
                  />
                </div>

                <p className="mt-5 font-display text-[clamp(1.25rem,0.55rem+3.4vw,2.75rem)] font-bold tracking-[-0.03em] text-za-gold tabular-nums">
                  $200,000,000,000
                </p>

                <div
                  aria-hidden="true"
                  className="mt-6 mb-6 h-px w-full bg-za-hairline-dark"
                />

                <p className="text-[0.9375rem] leading-relaxed text-za-on-dark-muted">
                  On the raw numbers, theoretically more than enough to
                  eradicate extreme poverty across the Muslim world twice over.
                  Yet global poverty persists.
                </p>

                <figcaption className="mt-6 text-[0.8125rem] leading-relaxed text-za-on-dark-muted/80">
                  <span className="font-medium text-za-on-dark-muted">
                    Source:{" "}
                  </span>
                  {zakahEstimateSource}
                </figcaption>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
