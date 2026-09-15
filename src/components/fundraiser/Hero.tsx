import { AuditRings, AuditGrid } from "@/components/brand/Motifs";
import { CtaButton, SecondaryLink } from "@/components/ui/CtaButton";
import { ArrowDownIcon } from "@/components/brand/Icons";

/**
 * Hero.
 *
 * One column: the claim, the question, and the figure inside the sentence that
 * carries it. The sourced estimate plate that used to sit beside this copy now
 * opens section 01, where the same figure was being restated (landing page
 * review, 2026-09-15).
 *
 * The figure is set in bold Audit Gold — the colour the page reserves for key
 * statistics, 4.81:1 on Deep Teal — so it is the first thing a scanning eye
 * lands on. It is never animated or counted up.
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
        <div className="za-rise max-w-4xl">
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
            estimated{" "}
            <strong className="font-bold text-za-gold tabular-nums">
              $200,000,000,000
            </strong>{" "}
            in Zakah. That’s too many zeros to count!
          </p>

          <div className="mt-9 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
            <CtaButton location="hero" className="w-full sm:w-auto" />
            <SecondaryLink href="#solution" tone="dark">
              See how we protect Zakah
              <ArrowDownIcon className="size-4" />
            </SecondaryLink>
          </div>
        </div>
      </div>
    </section>
  );
}
