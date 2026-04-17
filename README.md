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

