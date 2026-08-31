/**
 * A thin, vendor-neutral conversion event layer.
 *
 * No analytics provider is currently configured in this repository, and none is
 * injected here. The layer exists so that components never hard-code a vendor
 * call: wiring GA4, GTM, Plausible, PostHog or Hotjar later means editing only
 * `dispatch` below.
 *
 * Privacy note: these events deliberately carry nothing beyond a CTA location
 * and a tier label. Do not extend them with wealth figures, calculator inputs,
 * donation amounts entered by a user, or any other sensitive financial or
 * religious detail.
 */

export type CtaLocation =
  | "header"
  | "hero"
  | "threats"
  | "independence"
  | "campaign"
  | "tiers"
  | "final"
  | "sticky-mobile";

export type AnalyticsEvent =
  | { name: "guardian_cta_clicked"; location: CtaLocation }
  | { name: "support_tier_selected"; tier: string; location: CtaLocation }
  | { name: "checkout_started"; tier: string; location: CtaLocation }
  | { name: "faq_opened"; question: string }
  | { name: "legal_opened"; location: "footer" | "legal-page" };

type DataLayerWindow = Window & {
  dataLayer?: Record<string, unknown>[];
};

/**
 * Records a conversion event.
 *
 * Safe to call from any client component: it is a no-op on the server, and a
 * no-op in the browser until a provider is connected.
 */
export function track(event: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  const { name, ...params } = event;
  const payload = { event: name, ...params };

  const w = window as DataLayerWindow;

  // GTM / GA4 pick this up automatically once a container is installed.
  if (Array.isArray(w.dataLayer)) {
    w.dataLayer.push(payload);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[analytics]", payload);
  }
}
