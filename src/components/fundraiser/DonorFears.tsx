import { Section, SectionHeading } from "@/components/ui/Section";
import { donorFears } from "@/content/fundraiser";

/**
 * The concerns a careful donor actually carries.
 *
 * Every item is drawn from a problem already established in the fundraiser copy
 * or the 38-question donor checklist. No new ruling, no new statistic, and no
 * imagery — the discomfort here comes from precision, not from pressure.
 */
export function DonorFears() {
  return (
    <Section tone="surface" labelledBy="donor-fears-title">
      <div className="za-shell">
        <SectionHeading
          eyebrow="Before you click donate"
          id="donor-fears-title"
          title="The questions that keep conscientious donors awake."
          lede="None of these are hypothetical. Each one is a gap between a sincere intention and a verifiable outcome."
          className="max-w-3xl"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {donorFears.map((fear, index) => (
            <li
              key={fear.id}
              // The fifth concern fills the remaining track rather than leaving
              // a hole — five items, no invented sixth card.
              className={`flex flex-col rounded-za-lg border border-za-hairline bg-za-surface p-7 transition-colors duration-300 hover:border-za-green/25 hover:bg-za-canvas lg:p-8 ${
                index === donorFears.length - 1 ? "sm:col-span-2" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="za-eyebrow text-za-gold-ink tabular-nums"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-5 font-display text-[1.125rem] leading-snug font-semibold text-za-text">
                {fear.question}
              </h3>

              <p className="za-measure mt-4 text-[0.9375rem] leading-relaxed text-za-muted">
                {fear.detail}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
