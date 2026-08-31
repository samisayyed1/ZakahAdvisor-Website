import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/brand/Logo";
import { Footer } from "@/components/fundraiser/Footer";
import { legalIntro, legalSections } from "@/content/legal";
import { CTA_LABEL, site, SUPPORT_ANCHOR } from "@/content/site";

export const metadata: Metadata = {
  title: "Legal Disclaimers & Terms of Use",
  description:
    "Zakah Advisor's legal disclaimers and terms of use, covering educational guidance, charity ratings, scholarly differences, accuracy, fair use, limitation of liability and external links.",
  alternates: { canonical: "/legal" },
  openGraph: {
    title: `Legal Disclaimers & Terms of Use | ${site.name}`,
    description:
      "Zakah Advisor's legal disclaimers and terms of use, covering educational guidance, charity ratings, scholarly differences, accuracy, fair use, limitation of liability and external links.",
    url: "/legal",
  },
};

/**
 * A simplified header for the legal route.
 *
 * The fundraiser header's anchors point at sections that only exist on the home
 * page, so this route gets its own — with an unambiguous route back.
 */
function LegalHeader() {
  return (
    <header className="border-b border-za-hairline bg-za-surface">
      <div className="za-shell flex h-18 items-center justify-between gap-4 lg:h-20">
        <Link
          href="/"
          aria-label={`${site.name} — home`}
          className="-m-2 shrink-0 rounded-za p-2"
        >
          <Logo decorative className="h-10 w-auto lg:h-11" />
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="hidden rounded-za px-3 py-2 text-[0.9375rem] font-medium text-za-text/80 transition-colors duration-200 hover:text-za-green sm:inline-flex"
          >
            Back to the fundraiser
          </Link>
          <Link
            href={`/${SUPPORT_ANCHOR}`}
            className="inline-flex min-h-11 items-center justify-center rounded-za bg-za-gold px-5 py-2.5 text-sm font-semibold text-za-text transition-colors duration-200 hover:bg-za-gold-hover"
          >
            {CTA_LABEL}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function LegalPage() {
  return (
    <>
      <LegalHeader />

      <main id="main" className="bg-za-canvas">
        <div className="za-shell py-16 sm:py-20 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)] lg:gap-20">
            {/* Contents ------------------------------------------------- */}
            <nav
              aria-labelledby="legal-contents-title"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <h2
                id="legal-contents-title"
                className="za-eyebrow font-sans text-za-muted"
              >
                Contents
              </h2>
              <ol className="mt-5 flex flex-col gap-2.5">
                <li>
                  <a
                    href={`#${legalIntro.headingId}`}
                    className="text-[0.9375rem] leading-snug text-za-text/85 underline decoration-za-hairline underline-offset-4 transition-colors duration-200 hover:text-za-green hover:decoration-za-green/50"
                  >
                    {legalIntro.headingTitle}
                  </a>
                </li>
                {legalSections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="text-[0.9375rem] leading-snug text-za-text/85 underline decoration-za-hairline underline-offset-4 transition-colors duration-200 hover:text-za-green hover:decoration-za-green/50"
                    >
                      <span className="text-za-muted tabular-nums">
                        {section.number}.
                      </span>{" "}
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {/* Document ------------------------------------------------- */}
            <article>
              <p className="za-eyebrow flex items-start gap-3 text-za-gold-ink">
                <span aria-hidden="true" className="mt-[0.58em] h-px w-7 bg-za-gold-ink/50" />
                Legal
              </p>

              <h1 className="za-h2 mt-6 text-za-text">{legalIntro.title}</h1>

              <section
                id={legalIntro.headingId}
                aria-labelledby={`${legalIntro.headingId}-title`}
                className="mt-12 scroll-mt-28"
              >
                <h2
                  id={`${legalIntro.headingId}-title`}
                  className="font-display text-[1.25rem] leading-snug font-semibold text-za-text"
                >
                  {legalIntro.headingTitle}
                </h2>
                {legalIntro.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 32)}
                    className="za-measure mt-4 text-[1.0625rem] leading-[1.7] text-za-muted"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>

              {legalSections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  aria-labelledby={`${section.id}-title`}
                  className="mt-12 scroll-mt-28 border-t border-za-hairline pt-12"
                >
                  <h2
                    id={`${section.id}-title`}
                    className="font-display text-[1.25rem] leading-snug font-semibold text-za-text"
                  >
                    <span className="mr-2 text-za-gold-ink tabular-nums">
                      {section.number}.
                    </span>
                    {section.title}
                  </h2>

                  {section.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="za-measure mt-4 text-[1.0625rem] leading-[1.7] text-za-muted"
                    >
                      {paragraph}
                    </p>
                  ))}
                </section>
              ))}

              <div className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-za-hairline pt-8">
                <Link
                  href="/"
                  className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-za-green underline decoration-za-green/35 underline-offset-[6px] transition-colors duration-200 hover:text-za-gold-ink hover:decoration-za-gold-ink"
                >
                  Back to the fundraiser
                </Link>
                <Link
                  href={`/${SUPPORT_ANCHOR}`}
                  className="inline-flex min-h-11 items-center text-[0.9375rem] font-medium text-za-green underline decoration-za-green/35 underline-offset-[6px] transition-colors duration-200 hover:text-za-gold-ink hover:decoration-za-gold-ink"
                >
                  Support tiers
                </Link>
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
