import Image from "next/image";

import { Section } from "@/components/ui/Section";
import { CtaButton } from "@/components/ui/CtaButton";
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
    <Section tone="cream" labelledBy="rating-caption">
      <div className="za-shell">
        <figure>
          {/* Report frame ------------------------------------------------- */}
          <div className="overflow-hidden rounded-za-lg border border-za-hairline bg-za-surface shadow-za-card">
            <div className="flex items-center gap-2 border-b border-za-hairline bg-za-canvas px-4 py-3">
              <span aria-hidden="true" className="flex gap-1.5">
                <span className="size-2.5 rounded-full bg-za-hairline" />
                <span className="size-2.5 rounded-full bg-za-hairline" />
                <span className="size-2.5 rounded-full bg-za-hairline" />
              </span>
              <span className="za-eyebrow ml-2 truncate text-za-muted">
                Zakah Advisor Charity Rating Report
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

          <figcaption id="rating-caption" className="mt-5 text-sm text-za-muted">
            Example of Zakah Advisor charity ratings.
          </figcaption>
        </figure>

        {/* The source document places a call to action here, after the rating
            figure. Its supporting line is the document's own wording. */}
        <div className="mt-12">
          <CtaButton location="rating" className="w-full sm:w-auto" />
          <p className="za-measure-tight mt-4 text-sm text-za-muted">
            Help us preserve the third pillar of Islam by funding our
            independent charity audits and educational hubs.
          </p>
        </div>
      </div>
    </Section>
  );
}
