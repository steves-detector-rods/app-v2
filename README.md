# Steve's Detector Rods — v2

Production rebuild of stevesdetectorrods.com on **Next.js 16 + React 19 + Tailwind CSS**, with Snipcart handling cart and checkout. Hand-built in Norman, OK since 2018.

- **Live (staging):** https://dev.stevesdetectorrods.com
- **Plan + milestone status:** [`ai-website-rebuild-plan.md`](./ai-website-rebuild-plan.md)

## Stack

- Next.js 16 App Router, TypeScript, SSG where possible
- Tailwind CSS (custom theme)
- Snipcart — cart, checkout, payment gateways
- Fuse.js — client-side product search
- MDX (`next-mdx-remote`) — blog + policies
- Formspree — contact form
- GA4 + Vercel Analytics
- Hosted on Vercel (free tier)

## Local development

```bash
nvm use
npm install
cp .env.local.example .env.local
# fill in Snipcart / Formspree / GA keys
npm run dev
```

## Scripts

- `npm run dev` — dev server (http://localhost:3000)
- `npm run build` — production build (Turbopack)
- `npm run start` — run production build locally
- `npm run typecheck` — tsc --noEmit
- `npm run lint` — ESLint

## Dependency notes

Three deliberate constraints, all pending upstream fixes — check before "upgrading" them:

- **`typescript` held at 6.x.** TS 7 typechecks and builds fine here, but `typescript-eslint`
  hard-refuses TS 7.0 (`typescript-eslint does not support TS 7.0`), which breaks `npm run lint`
  outright. Revisit when typescript-eslint ships TS 7 support.
- **`eslint` held at 9.x.** ESLint 10 crashes via `eslint-plugin-react` (pulled in by
  `eslint-config-next`), which still calls the removed `context.getFilename()` and peers at
  `eslint ^9.7`. No compatible release exists yet.
- **`overrides.next`** lifts `postcss` and `sharp` off Next's own pins (8.4.31 / ^0.34.5), both of
  which carry high-severity advisories. Scoped to Next's subtree so unrelated dependents are
  unaffected. Drop once Next ships updated pins. `sharp` 0.35 is why `engines.node` is `>=20.9.0`.
  `brace-expansion` is deliberately *not* overridden — v5 changed its export shape and breaks
  minimatch/eslint; that advisory clears with ESLint 10.

## Layout

```
app/           Next.js App Router pages + layouts
components/    layout · ui · products · filters · home · compatibility · cart · contact · policies
lib/           products · blog · seo · search · snipcart · filters · compatibility · legacy-redirects
data/          products (46-SKU TS catalog) · compatibility · testimonials · faq · retailers
content/       MDX — blog posts + policy pages
types/         shared TypeScript types
middleware.ts  301 for /product.php?id=SKU → /products/[slug]
```

