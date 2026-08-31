import Image from "next/image";

import { Section, SectionHeading } from "@/components/ui/Section";
import { asset } from "@/content/site";

/**
 * The charity rating card, extracted from the fundraiser document at its
 * embedded resolution rather than re-screenshotted.
 *
 * On narrow viewports the card is not scaled down into illegibility: it keeps a
 * readable minimum width inside a horizontally scrollable frame.
 */
export function RatingExample() {
  return (
    <Section tone="canvas" labelledBy="rating-title">
      <div className="za-shell">
        <SectionHeading
          eyebrow="What an audit produces"
          id="rating-title"
          title="A rating you can actually read."
          lede="Every audit resolves into a published rating: a grade per core area, a score out of 100, and the registration and eligibility facts behind them."
          className="max-w-3xl"
        />

        <figure className="mt-14">
          {/* Report frame ------------------------------------------------- */}
          <div className="overflow-hidden rounded-za-lg border border-za-hairline bg-za-surface shadow-za-card">
            <div className="flex items-center gap-2 border-b border-za-hairline bg-za-canvas px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-za-hairline" />
                <span className="size-2.5 rounded-full bg-za-hairline" />
                <span className="size-2.5 rounded-full bg-za-hairline" />
              </span>
              <span className="za-eyebrow ml-2 truncate text-za-muted">
                Zakah Advisor — Charity Rating Report
              </span>
            </div>

            <div className="relative">
              <div className="overflow-x-auto overscroll-x-contain">
              <Image
                src={asset("/fundraiser/charity-rating-example.png")}
                alt="Example Zakah Advisor charity rating report. It shows an overall rating of B, 84 out of 100, built from four core-area grades: registered charity, financial accountability, Zakat policy compliance, and governance and leadership. A side panel lists the organisation's country, focus, chief executive, charity registration and tax-receipt eligibility, and a scores table breaks the total down by core area."
                width={1024}
                height={567}
                quality={90}
                sizes="(min-width: 1024px) 1024px, 100vw"
                  className="h-auto w-full min-w-[38rem] max-w-none"
                />
              </div>

              {/* Soft edge: signals there is more report to the right. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-za-surface to-transparent lg:hidden"
              />
            </div>
          </div>

          <figcaption className="mt-5 flex flex-col gap-2 text-sm text-za-muted sm:flex-row sm:items-baseline sm:justify-between">
            <span>
              <span className="font-medium text-za-text">Example</span> of Zakah
              Advisor charity ratings. The four core areas shown correspond to
              our published audit methodology.
            </span>
            <span className="shrink-0 text-za-muted lg:hidden">
              Scroll the report horizontally to read it in full.
            </span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
