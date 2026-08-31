# Zakah Advisor — Fundraising Website

The Zakah Advisor fundraising landing page and legal disclaimers, built for
ZakahAdvisor.org.

Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS v4.
Everything renders statically; the only client JavaScript is the header, the FAQ
accordion, the mobile sticky CTA and the CTA click tracking.

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values you have
npm run dev                    # http://localhost:3000
```

| Script                      | What it does                                                        |
| --------------------------- | ------------------------------------------------------------------- |
| `npm run dev`               | Development server                                                    |
| `npm run build`             | Production build                                                      |
| `npm run build:production`  | **Use this to deploy.** Verifies donation config, then builds         |
| `npm run start`             | Serve a production build                                              |
| `npm run lint`              | ESLint                                                                |
| `npm run typecheck`         | `tsc --noEmit`                                                        |
| `npm run verify:donations`  | Fails if any tier or the site URL is unconfigured                     |
| `npm run assets:brand`      | Rebuilds the raster brand assets (see *Brand assets*)                 |

There is no test runner in this project: the page has no business logic to unit
test. Correctness is enforced by `typecheck`, `lint` and the production build.

---

## Routes

| Route              | Description                                                       |
| ------------------ | ----------------------------------------------------------------- |
| `/`                | The fundraising landing page                                       |
| `/legal`           | Legal Disclaimers & Terms of Use                                   |
| `/opengraph-image` | Generated 1200×630 social card                                     |
| `/sitemap.xml`     | Both routes                                                        |
| `/robots.txt`      | Allow-all, plus the sitemap                                        |
| `/icon.svg`, `/apple-icon.png`, `/favicon.ico` | App icons, generated from the approved mark |

All in-page navigation targets anchors on `/`: `#why-it-matters`, `#threats`,
`#solution`, `#how-we-audit`, `#guardians`, `#support`, `#faq`.

---

## Donation links

**No payment provider exists in this repository, and no merchant account was
supplied with the source material.** Rather than invent a checkout URL, every
destination is read from the environment:

```
NEXT_PUBLIC_DONATE_10_URL     $10  / month — The Foundation
NEXT_PUBLIC_DONATE_25_URL     $25  / month — The Educator
NEXT_PUBLIC_DONATE_50_URL     $50  / month — The Vanguard
NEXT_PUBLIC_DONATE_100_URL    $100 / month — The Guardian
NEXT_PUBLIC_DONATE_200_URL    $200+/ month — The Visionary
```

Each must be an absolute `https:` URL pointing at the provider's **hosted**
checkout (Stripe, Donorbox, Givebutter, LaunchGood or equivalent). This
application never collects or stores card details.

How it behaves:

- **Configured** — each tier button is a real link to that tier's checkout.
- **Not configured** — that tier's button renders disabled rather than sending a
  donor somewhere plausible but wrong. In development a banner names the exact
  variables to set; nothing is shown to a visitor.
- **Deployment** — `npm run build:production` runs `verify:donations` first and
  exits non-zero if any tier or `NEXT_PUBLIC_SITE_URL` is missing or invalid, so
  a build with dead tier buttons cannot ship.

All of this lives in `src/lib/donate.ts`. Component code never contains a URL.

Every *other* CTA on the page — header, hero, threats, independence, campaign,
final, mobile sticky — deliberately scrolls to the `#support` tier section rather
than jumping straight to a checkout. Identical buttons behave identically.

---

## Where the content lives

Public copy is data, not JSX, so it can be reviewed and revised without touching
layout:

| File                          | Contents                                                          |
| ----------------------------- | ----------------------------------------------------------------- |
| `src/content/fundraiser.ts`   | Donor concerns, threats, capabilities, audit pillars, tiers, FAQ   |
| `src/content/scripture.ts`    | Qur'anic and Hadith passages **extracted from the source `.docx`** |
| `src/content/legal.ts`        | Legal Disclaimers & Terms of Use, verbatim                         |
| `src/content/site.ts`         | Site name, domain, navigation, CTA label                           |

Rules that apply when editing any of these:

- Never add a statistic, endorsement, scholar, rating, donor count or fundraising
  promise that is not in the approved source material.
- Never restate a religious position in stronger terms than the source does.
- `scripture.ts` is **generated**, not typed. Do not hand-edit the Arabic or
  "tidy" its diacritics — re-extract from the approved document instead.
- The four-pillar assessment methodology (`auditPillars`) and the four operating
  principles (`capabilities`) are separate frameworks. Do not merge them.
- The methodology section and FAQ 3 both read from `auditPillars`, so a revision
  to that wording is a single-object edit.

---

## Brand assets

The delivered brand package is committed under `brand-source/` — the SVG, AI,
EPS, PNG, favicon and monochrome variants, plus the branding guide.

`public/brand/` holds the four web variants actually used:

| File                            | Use                                             |
| ------------------------------- | ----------------------------------------------- |
| `logo-horizontal.svg`           | Light surfaces (Institutional Green + Audit Gold) |
| `logo-horizontal-inverse.svg`   | Dark surfaces (Luminous Green + Audit Gold)       |
| `logo-icon.svg` / `-inverse.svg`| Icon-only mark                                    |
| `logo-horizontal*.png`          | Raster fallback for social and e-mail only        |

These are the delivered vector artwork with the packaged background plate removed
and the viewBox tightened — the geometry is untouched. The wordmark is never
re-typed from a font. Per the brand guide the horizontal logo is never rendered
below 120px wide (the header uses 126px / 139px).

To regenerate everything from `brand-source/`:

```bash
python3 scripts/build-brand-svgs.py     # web SVGs + src/app/icon.svg
npm run assets:brand                    # icons, favicon, raster fallbacks, imagery
```

Design tokens — colours, type ramp, radii, shadows, measure — are centralised in
`src/app/globals.css`. Components use tokens; no component contains a raw hex
value.

---

## Analytics

`src/lib/analytics.ts` is a vendor-neutral event layer. **No analytics provider
is installed**, and none is injected. Events push to `window.dataLayer` when a
container exists and are otherwise a no-op:

- `guardian_cta_clicked` — with the CTA's location
- `support_tier_selected`, `checkout_started` — with the tier
- `faq_opened` — with the question
- `legal_opened`

To enable a provider, add the script in `src/app/layout.tsx` and, if it is not
GTM/GA4, extend `dispatch` in `analytics.ts`. Components never call a vendor SDK
directly.

Events deliberately carry nothing beyond a CTA location and a tier label. Do not
extend them with wealth figures, calculator inputs or other sensitive financial or
religious detail.

**Hotjar** is referenced in the project's internal notes but is not installed
here. The site currently sets no cookies and has no consent mechanism, so adding
behavioural tracking is a decision with a privacy-policy dependency (below) —
not a config change.

---

## Public preview (GitHub Pages)

`.github/workflows/deploy-pages.yml` publishes a preview on every push to
`main`:

**https://samisayyed1.github.io/ZakahAdvisor-Website/**

It is a **preview, not production**. Pages serves static files from a repository
sub-path, so that build runs in export mode (`NEXT_EXPORT=1`): no image
optimizer, no response headers, and no checkout links — the tier buttons render
disabled there, exactly as they do in any unconfigured environment. Production
goes to a Next.js host via `npm run build:production`.

To reproduce the export locally:

```bash
NEXT_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/ZakahAdvisor-Website \
  NEXT_PUBLIC_SITE_URL=https://samisayyed1.github.io/ZakahAdvisor-Website \
  npm run build      # writes ./out
```

Note that `next/image` does not apply a base path to an unoptimized `src`, so
every reference into `public/` goes through `asset()` in `src/content/site.ts`.

---

## Deployment

1. Set `NEXT_PUBLIC_SITE_URL` to the canonical origin, e.g.
   `https://zakahadvisor.org` (no trailing slash). Canonical tags, Open Graph,
   the sitemap and robots.txt all derive from it; without it they fall back to
   `http://localhost:3000` rather than asserting a false production URL.
2. Set the five `NEXT_PUBLIC_DONATE_*_URL` values.
3. Build with `npm run build:production`.
4. Serve with `npm run start` (Node 20.9+), or deploy to any Next.js 16 host.

Both routes prerender to static HTML. Security headers (`X-Content-Type-Options`,
`Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`) are set in
`next.config.ts`; if the host adds its own, reconcile there.

---

## Outstanding external dependencies

Things this repository genuinely cannot supply:

- **Live checkout URLs** for the five tiers — from the payment provider's
  dashboard. Guarded by `verify:donations`.
- **Production `NEXT_PUBLIC_SITE_URL`.**
- **Privacy Policy** — none was supplied, and none is fabricated here. The site
  as it stands collects nothing and needs none. It becomes a legal prerequisite
  the moment analytics, Hotjar or any form is added.
- **A verified Madinah.com URL** — the FAQ references Madinah.com as plain text
  because no confirmed public URL was supplied. Add one and it can become a link.
- **The 174-page publication** referenced by the $25 tier — no file or cover
  artwork was supplied, so the tier presents it typographically rather than as a
  mocked-up cover.

## Outstanding review dependency

The internal meeting of 2026-08-27 assigned a revision of the **four-pillar audit
methodology** description for clarity and accuracy. The wording currently shown
is the approved public wording; it is held in one place (`auditPillars` in
`src/content/fundraiser.ts`) so the revision is a single edit. No "pending review"
notice is shown to visitors.
