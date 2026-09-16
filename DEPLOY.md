# Deploying the Zakah Advisor landing page

Written for the web developer taking this live.

## What this is

A **Next.js 16 application** (React 19, TypeScript, Tailwind 4). It is **not a
WordPress theme or plugin** and cannot be installed into WordPress. It is built
into a set of files and served as its own site.

Two ways to run it, below. Route B is the one to pick if it has to live on the
same hosting as the existing WordPress site.

---

## Before you start: the values you need

The build **will refuse to run for production** until these six are set. That
gate is deliberate — it stops the site going live with dead donate buttons.

| Variable | What it is |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Final public origin, no trailing slash, e.g. `https://zakahadvisor.org` |
| `NEXT_PUBLIC_DONATE_10_URL` | Hosted checkout link, $10 tier |
| `NEXT_PUBLIC_DONATE_25_URL` | Hosted checkout link, $25 tier |
| `NEXT_PUBLIC_DONATE_50_URL` | Hosted checkout link, $50 tier |
| `NEXT_PUBLIC_DONATE_100_URL` | Hosted checkout link, $100 tier |
| `NEXT_PUBLIC_DONATE_200_URL` | Hosted checkout link, $200+ tier |

Each donate URL must be an absolute `https://` link from the payment provider
(Stripe, Donorbox, Givebutter, LaunchGood or equivalent). **These do not exist
yet** — Zakah Advisor has to create them in the payment dashboard and send them
to you. The site never handles card details itself; each button hands off to the
provider's own checkout page.

Put them in a file called `.env.local` in the project root:

```
NEXT_PUBLIC_SITE_URL=https://zakahadvisor.org
NEXT_PUBLIC_DONATE_10_URL=https://...
NEXT_PUBLIC_DONATE_25_URL=https://...
NEXT_PUBLIC_DONATE_50_URL=https://...
NEXT_PUBLIC_DONATE_100_URL=https://...
NEXT_PUBLIC_DONATE_200_URL=https://...
```

Never commit that file. `.gitignore` already excludes it.

---

## Get it running locally first

Needs **Node 20.9 or newer** (22 recommended) and npm.

```bash
git clone https://github.com/samisayyed1/ZakahAdvisor-Website.git
cd ZakahAdvisor-Website
npm install
npm run dev
```

Open http://localhost:3000. Check the page before you deploy anything.

```bash
npm run verify:donations   # confirms all six values above are set correctly
```

---

## Route A — host it properly (recommended)

Deploy to any host that runs Next.js 16 (Vercel, Netlify, Cloudflare, or your
own Node server). Point the domain or a subdomain at it.

```bash
npm run build:production   # runs the donation check, then builds
npm run start              # serves it
```

On Vercel/Netlify you connect the GitHub repo, paste the six variables into the
host's environment settings, and it builds on every push. Nothing else to do.

You get image optimisation and the security headers set in `next.config.ts`.

**WordPress stays where it is.** Put this on its own subdomain, e.g.
`zakah.1web.com` or the real `zakahadvisor.org`, and point the DNS there.

---

## Route B — static files on the existing server

If it must sit on the same hosting as WordPress (cPanel, plain Apache/nginx,
no Node available at runtime), export it to plain HTML/CSS/JS:

```bash
NEXT_EXPORT=1 npm run build
```

This produces an **`out/` folder**. Upload the contents of that folder to the
server by FTP/SFTP. No Node, no database, no PHP required — it is static files.

Two placements:

**On a subdomain (simplest, recommended)** — e.g. `zakah.1web.com` pointed at
its own folder. Upload `out/` there. Nothing else needed.

**In a subfolder of the WordPress site** — e.g. `1web.com/zakah`. You must build
with the path baked in:

```bash
NEXT_EXPORT=1 NEXT_PUBLIC_BASE_PATH=/zakah npm run build
```

Then upload `out/` to that folder, and make sure WordPress does not swallow the
URL — WordPress's `.htaccess` rewrites unknown paths to `index.php`, so add an
exclusion above the WordPress block:

```apache
RewriteCond %{REQUEST_URI} ^/zakah
RewriteRule ^ - [L]
```

Two caveats for this route:
- Next.js image optimisation is off; images are served as-is.
- The security headers in `next.config.ts` are **not** applied — set
  `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options` and
  `Permissions-Policy` on the web server instead.

Donate buttons still work on this route: the checkout links are baked in at
build time, so rebuild and re-upload whenever they change.

---

## Please do not

- **Rebuild it as a WordPress theme.** That is a rewrite, not a deployment, and
  the copy on this page is signed off word for word. If WordPress must own the
  URL, use Route B.
- **Retype any of the text.** The wording, the Qur'an and Hadith passages and
  the tier rewards are all approved copy taken from the source document. Layout
  and hosting are yours; the words are not.

---

## After it is live, check

1. All seven **Donate Now** buttons scroll to the support tiers.
2. Each of the five tier buttons opens the correct provider checkout.
3. The page looks right on a phone.
4. `https://<your-domain>/robots.txt` and `/sitemap.xml` return your real domain,
   not `localhost` — if they say localhost, `NEXT_PUBLIC_SITE_URL` was not set at
   build time.

## Questions

`README.md` in this repo covers the design tokens, the content files and how to
change copy and imagery without touching components.
