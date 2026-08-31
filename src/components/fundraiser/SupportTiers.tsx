import Image from "next/image";

import { Section, SectionHeading } from "@/components/ui/Section";
import { CheckIcon } from "@/components/brand/Icons";
import { TierButton } from "@/components/fundraiser/TierButton";
import { supportTiers } from "@/content/fundraiser";
import {
  DONATION_ENV_VARS,
  isDonationConfigured,
  missingDonationTiers,
} from "@/lib/donate";

const EBOOK_TITLE =
  "Is your Zakah Valid? 37 Mistakes Most Muslims Make (And how to fix them)";

function RewardList({
  rewards,
  tone = "light",
}: {
  rewards: string[];
  tone?: "light" | "gold";
}) {
  return (
    <ul className="flex flex-col gap-3">
      {rewards.map((reward) => (
        <li key={reward} className="flex items-start gap-3">
          <CheckIcon
            className={`mt-1 size-4 shrink-0 ${
              tone === "gold" ? "text-za-gold-ink" : "text-za-luminous"
            }`}
          />
          <span className="text-[0.9375rem] leading-relaxed text-za-text">
            {reward}
          </span>
        </li>
      ))}
    </ul>
  );
}

/**
 * Monthly support tiers.
 *
 * The $10 entry point is given the widest, most prominent treatment because it
 * is the campaign's stated entry pledge — not because it is the most chosen.
 * No tier is labelled "most popular", no annual discount is offered, and there
 * is no countdown: none of that exists in the approved material.
 */
export function SupportTiers() {
  const [entry, ...rest] = supportTiers;

  return (
    <Section id="support" tone="canvas" spacing="loose" labelledBy="support-title">
      <div className="za-shell">
        <SectionHeading
          eyebrow="Choose your monthly impact"
          id="support-title"
          title="Whether you are a student or a seasoned investor, your Sadaqah is the engine that drives this mission."
          className="max-w-4xl"
        />

        {/* Developer-facing only. Never rendered in a production build. */}
        {!isDonationConfigured && process.env.NODE_ENV === "development" ? (
          <div className="mt-10 rounded-za-lg border border-za-gold/50 bg-za-gold/10 p-5 text-sm text-za-text">
            <p className="font-semibold">
              Donation links are not configured ({missingDonationTiers.length} of{" "}
              {supportTiers.length} tiers).
            </p>
            <p className="mt-2 text-za-muted">
              Set the following in <code className="font-mono">.env.local</code>{" "}
              — each must be an absolute <code className="font-mono">https:</code>{" "}
              checkout URL from the payment provider:
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-xs text-za-muted">
              {missingDonationTiers.map((tier) => (
                <li key={tier}>{DONATION_ENV_VARS[tier]}</li>
              ))}
            </ul>
          </div>
        ) : null}

        {/* Entry tier — $10 The Foundation --------------------------------- */}
        <article
          aria-labelledby="tier-entry-title"
          className="mt-12 overflow-hidden rounded-za-xl border border-za-green/25 bg-za-surface shadow-za-card"
        >
          <div className="grid lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
            <div className="p-7 sm:p-10">
              <p className="za-eyebrow text-za-gold-ink">
                The campaign entry point
              </p>

              <div className="mt-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-display text-[clamp(2.25rem,1.9rem+1.6vw,3rem)] leading-none font-bold tracking-[-0.03em] text-za-text tabular-nums">
                  {entry.amountLabel}
                </p>
                <p className="text-[0.9375rem] font-medium text-za-muted">
                  / month
                </p>
                <h3
                  id="tier-entry-title"
                  className="w-full font-display text-[1.25rem] font-semibold text-za-green"
                >
                  {entry.name}
                </h3>
              </div>

              <p className="za-measure mt-6 text-[0.9375rem] leading-relaxed text-za-muted">
                {entry.impact}
              </p>

              <div className="mt-8 border-t border-za-hairline pt-7">
                <p className="za-eyebrow mb-4 text-za-muted">Your reward</p>
                <RewardList rewards={entry.rewards} tone="gold" />
              </div>

              <TierButton
                tier={entry.id}
                tierName={entry.name}
                amountLabel={entry.amountLabel}
                prominent
                className="mt-8 sm:max-w-xs"
              />
            </div>

            {/* Tangible proof of the reward: the approved cover of the
                38-question self-audit. The checklist itself stays behind the
                fundraising flow — it is not published to a public URL. */}
            <div className="relative flex items-center justify-center overflow-hidden border-t border-za-hairline bg-za-evergreen p-8 lg:border-t-0 lg:border-l">
              <Image
                src="/fundraiser/zakah-self-audit-checklist-cover.png"
                alt="Cover of the Zakah Advisor donor checklist: “What Your Charity Isn’t Telling You — The Ultimate Zakah Self-Audit”, 38 essential questions to verify before you donate."
                width={800}
                height={1024}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 300px, 70vw"
                className="h-auto w-full max-w-[17rem] rounded-za shadow-za-lift"
              />
            </div>
          </div>
        </article>

        {/* Remaining tiers ------------------------------------------------- */}
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {rest.map((tier) => (
            <li
              key={tier.id}
              className="flex flex-col rounded-za-lg border border-za-hairline bg-za-surface p-7 transition-[border-color,box-shadow] duration-300 hover:border-za-green/25 hover:shadow-za-card"
            >
              <div className="flex flex-wrap items-baseline gap-x-2">
                <p className="font-display text-[1.875rem] leading-none font-bold tracking-[-0.03em] text-za-text tabular-nums">
                  {tier.amountLabel}
                </p>
                <p className="text-sm font-medium text-za-muted">/ month</p>
              </div>

              <h3 className="mt-3 font-display text-[1.125rem] font-semibold text-za-green">
                {tier.name}
              </h3>

              <p className="mt-4 text-[0.9375rem] leading-relaxed text-za-muted">
                {tier.impact}
              </p>

              <div className="mt-6 border-t border-za-hairline pt-6">
                <p className="za-eyebrow mb-4 text-za-muted">Your reward</p>
                <RewardList rewards={tier.rewards} />
              </div>

              {/* mt-auto keeps every button on a common baseline even though
                  the tiers deliberately carry different amounts of copy. */}
              <TierButton
                tier={tier.id}
                tierName={tier.name}
                amountLabel={tier.amountLabel}
                className="mt-8"
              />
            </li>
          ))}
        </ul>

        {/* The $25 publication, set as type rather than mocked up as a cover:
            no approved cover artwork for it was supplied. */}
        <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <div className="rounded-za-lg border border-za-hairline bg-za-surface p-7 lg:p-9">
            <p className="za-eyebrow text-za-gold-ink">
              Included from $25 / month
            </p>
            <p className="mt-5 font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-snug font-bold text-za-text">
              “{EBOOK_TITLE}”
            </p>
            <p className="mt-4 text-[0.9375rem] text-za-muted">
              A 174-page publication from Zakah Advisor.
            </p>
          </div>

          <div className="rounded-za-lg border border-za-hairline bg-za-surface p-7 lg:p-9">
            <p className="za-eyebrow text-za-gold-ink">Every tier</p>
            <p className="mt-5 font-display text-[clamp(1.125rem,1rem+0.6vw,1.5rem)] leading-snug font-bold text-za-text">
              Given as recurring Sadaqah, never as Zakah.
            </p>
            <p className="za-measure mt-4 text-[0.9375rem] text-za-muted">
              Zakah has strict categories, and our operational costs do not fall
              into them. Your obligatory charity stays where it belongs.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
