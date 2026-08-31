import { Section, SectionHeading } from "@/components/ui/Section";
import { capabilityIcons } from "@/components/brand/Icons";
import { capabilities } from "@/content/fundraiser";

/**
 * The four operating principles.
 *
 * Deliberately separate from the formal four-pillar assessment methodology in
 * <AuditMethodology />: this is what Zakah Advisor does, that is how a charity
 * is graded. The two frameworks are never merged.
 */
export function Capabilities() {
  return (
    <Section tone="canvas" labelledBy="capabilities-title">
      <div className="za-shell">
        <SectionHeading
          eyebrow="What we do"
          id="capabilities-title"
          title="We do the heavy, exhausting work of financial verification so you do not have to."
          className="max-w-4xl"
        />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => {
            const Icon = capabilityIcons[capability.icon];

            return (
              <li
                key={capability.id}
                className="flex flex-col rounded-za-lg border border-za-hairline bg-za-surface p-7 transition-[border-color,box-shadow] duration-300 hover:border-za-green/25 hover:shadow-za-card lg:p-9"
              >
                <Icon className="size-11 shrink-0" />

                <h3 className="mt-7 font-display text-[1.1875rem] leading-snug font-semibold text-za-text">
                  {capability.title}
                  {capability.arabicName ? (
                    <span className="ml-2 font-sans text-[0.9375rem] font-medium text-za-gold-ink">
                      ({capability.arabicName})
                    </span>
                  ) : null}
                </h3>

                <p className="za-measure mt-4 text-[0.9375rem] leading-relaxed text-za-muted">
                  {capability.body}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </Section>
  );
}
