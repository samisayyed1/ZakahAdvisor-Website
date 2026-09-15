import Image from "next/image";

import { asset } from "@/content/site";
import {
  pendingSectionMedia,
  sectionMedia,
  type SectionMediaAsset,
} from "@/content/fundraiser";

/**
 * The image slot that sits directly beneath a section title.
 *
 * Added for the internal meeting of 2026-09-01: "incorporate imagery under
 * titles", so a visitor scrolling the highlights takes the argument even if
 * they read none of the prose.
 *
 * The slot renders nothing until approved artwork exists for it. That is
 * deliberate — this page is the fundraising front door of an organisation whose
 * product is catching charities in unverifiable claims, so stock photography
 * of unnamed beneficiaries is the one thing it must never carry. Sections wait
 * empty rather than being filled with something we cannot stand behind.
 *
 * Filling a slot is a content edit, not a development task: drop the file into
 * `public/fundraiser/`, then set `src`, `alt` and the intrinsic dimensions on
 * the matching entry in `sectionMedia` (src/content/fundraiser.ts). No
 * component changes, no deployment bottleneck.
 */
export function SectionMedia({
  media,
  className = "",
  priority = false,
}: {
  media: SectionMediaAsset;
  className?: string;
  priority?: boolean;
}) {
  if (!media.src) return null;

  return (
    <figure className={`mt-12 ${className}`}>
      <div className="overflow-hidden rounded-za-lg border border-za-hairline bg-za-surface shadow-za-card">
        <Image
          src={asset(media.src)}
          alt={media.alt}
          width={media.width}
          height={media.height}
          priority={priority}
          // The slot is full-bleed inside the page gutter at every breakpoint.
          sizes="(min-width: 1280px) 1152px, 100vw"
          className="h-auto w-full"
        />
      </div>

      {media.caption ? (
        <figcaption className="za-measure mt-4 text-sm text-za-muted">
          {media.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/**
 * Development-only summary of the slots still awaiting artwork, with the brief
 * for each. Never rendered in a production build, and never a placeholder in
 * the page itself: an empty slot on the live site is invisible, by design.
 *
 * This mirrors the unconfigured-donation notice in <SupportTiers />. It does
 * not fail the build the way `verify:donations` does — a missing checkout link
 * breaks the funnel, a missing image only leaves a section quieter.
 */
export function PendingSectionMediaNotice() {
  if (process.env.NODE_ENV !== "development") return null;
  if (pendingSectionMedia.length === 0) return null;

  return (
    <div className="za-shell py-10">
      <div className="rounded-za-lg border border-za-amber/50 bg-za-amber/10 p-5 text-sm text-za-text">
        <p className="font-semibold">
          Dev: {pendingSectionMedia.length} section image slot
          {pendingSectionMedia.length === 1 ? "" : "s"} awaiting approved
          artwork.
        </p>
        <p className="mt-2 text-za-muted">
          Drop the file into <code className="font-mono">public/fundraiser/</code>,
          then set <code className="font-mono">src</code>,{" "}
          <code className="font-mono">alt</code> and the intrinsic{" "}
          <code className="font-mono">width</code>/
          <code className="font-mono">height</code> on the matching entry in{" "}
          <code className="font-mono">sectionMedia</code>.
        </p>
        <ul className="mt-4 flex flex-col gap-2">
          {pendingSectionMedia.map((slot) => (
            <li key={slot} className="leading-relaxed text-za-muted">
              <code className="font-mono text-za-text">{slot}</code> —{" "}
              {sectionMedia[slot].brief}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
