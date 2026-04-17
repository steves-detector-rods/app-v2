# Steve's Detector Rods — v2 Rebuild (Living Plan)

> This is the cross-session source of truth for the `app-v2` rebuild. It reflects the approved design from the Claude Design prototype and supersedes the pre-design draft that previously lived here. Update the **Status** section after every milestone so future sessions inherit current state.

---

## Context

`stevesdetectorrods.com` is a hand-coded PHP site with no shopping cart — every order is done by email. Competitors (Anderson, Detect-Ed) and every authorized retailer already sit on modern Shopify stores with real checkout, reviews, filtering, and mobile support, so direct customers are routinely kicked over to a retailer (and lower margins) just to complete a purchase. The rebuild fixes that by shipping a modern, statically-generated e-commerce site that preserves Steve's craftsman voice and deep engineering content.

The design is a full Claude Design prototype: 7 JSX files + HTML shell + data layer, living at `/tmp/sdr-design/sdr-re-write/` during this engagement. The prototype is the visual + interaction spec and takes precedence everywhere. This rebuild implements the prototype 1:1 in Next.js 14 + Tailwind + Snipcart, fills gaps the prototype didn't cover (FAQ, policies, redirects, SEO, real checkout, real images), and ships page-by-page top-down.

## Decisions locked in

- **Framework:** Next.js 16 App Router (React 19, Turbopack), TypeScript, SSG wherever possible. Node 24 pinned via `.nvmrc` + `engines`.
- **Styling:** Tailwind CSS with custom theme tokens
- **Commerce:** Snipcart (CDN script) — Stripe + PayPal + Apple/Google Pay; 2% fee, no monthly
- **Accent color:** Terracotta `#B8452F` (the Tweaks default that survived design iteration)
- **Images:** `<WeavePlaceholder>` SVG stand-ins for v1; swap real photos into `product.images[]` later with no code changes
- **Rollout:** Page-by-page, top of nav down
- **Hosting:** Vercel free tier
- **Forms:** Formspree (contact) + Buttondown/Mailchimp (newsletter)
- **Analytics:** GA4 + Vercel Analytics
- **Search:** Fuse.js client-side

## Status

Check items off as milestones ship. If a milestone finishes partially, add a `(partial)` note and list what's outstanding.

- [x] **M0** — Project bootstrap (Next.js app, deps, Tailwind config, fonts, Snipcart script) ✓ builds clean
- [x] **M1** — Design system primitives + layout shell (nav, footer, mega menus, mobile drawer, announcement bar) ✓ builds clean
   - Primitives: Button, Icon, Stars, ColorSwatch, AvailDot, Badge, CompatTag, BrandMark, WeavePlaceholder
   - Layout: AnnouncementBar, Nav, MegaMenu (detector + products), MobileDrawer, Footer
   - Cart scaffolding: CartProvider context (localStorage-backed) — UI drawer lands in M7
   - Newsletter form (client component) wired in footer — endpoint wiring in M15
- [x] **M2** — Product data layer (46 products in TS seed + compatibility map + `lib/products.ts`) ✓ 46 verified
   - **Deviation from original plan:** catalog lives in `data/products.ts` (single type-checked module) rather than 46 JSON files. Shared spec templates keep it DRY. Easier to diff/review; if we ever need per-product JSON a short export script can emit it.
   - 46 products across 6 types, 4 featured, 3 CarbonPro
   - Testimonials in `data/testimonials.json` (3 seed entries)
   - `lib/products.ts`: `getAllProducts, getProductBySlug, filterProducts, getProductsForDetector, getProductsForBrand, getFeaturedProducts, getCrossSellProducts, getRelatedProducts, getFilterOptions`
- [x] **M3** — Homepage ✓ builds clean
   - All 7 sections: Hero (with weave bg + glowing rotated shaft + 3 stats), ShopByDetector, CategoryCards, FeaturedProducts (uses `<ProductCard>`), WhyCarbon, TestimonialRow, HandcraftedBanner
   - `<ProductCard>` built in `components/products/` (pulled forward from M4)
- [x] **M4** — Collection page + `<ProductCard>` + `/detectors/[brand]/[model]` routes ✓ builds clean
   - `<ProductCard>` (client, for interactive swatch + add), `<ProductBrowser>` (client, URL-synced filters + sort + chips), `<FilterGroup>`, `<FilterCheck>`, `<Chip>`, `<CollectionHeader>`
   - Routes: `/products` (all-products), `/detectors/[brand]`, `/detectors/[brand]/[model]` — all SSG via `generateStaticParams()`
   - `lib/filters.ts` — URL-searchParam parser (brand, type, material, color, inStock, sort)
- [x] **M5** — Find Your Shaft 3-step flow ✓ builds clean
   - `app/find-your-shaft/page.tsx` + `<FinderFlow>` client component
   - 3 steps (brand → model → matched products), grouped results by type + glass-fiber callout
   - Fallback: "No match — request a custom build" with link to /contact
- [x] **M6** — Product Detail Page ✓ builds clean — 46 PDPs pre-rendered via `generateStaticParams`
   - `app/products/[slug]/page.tsx` (server) + `<PDPInteractive>` (client) + `<PDPTabs>` (client)
   - `<ImageGallery>` with `yet-another-react-lightbox`
   - `<VariantSelector>` embedded — color swatches, length (Standard / Tall Man + inches), qty stepper
   - **Snipcart wiring** via `lib/snipcart.ts` — color/length upcharges expressed as option price modifiers (`Red[+20]`, `Tall Man[+5]`). Single `data-item-price` = product base, so Snipcart server-side validation always matches.
   - Trust row (Hand-assembled / Free shipping $149+ / Lifetime warranty)
   - Tabs: Description (with "Note from Steve" callout) / Specs / Engineering / Reviews (distribution bar + sample reviews)
   - Cross-sell rows below: "Pairs well" (from `crossSell[]`) + "Also built for your [model]" (auto-derived)
   - **CW-Ready deviation:** rather than a toggle on EQ.CS-01 that bumps price, we kept EQ.CS-02 as its own SKU — cleaner for Snipcart validation.
- [x] **M7** — Cart integration ✓ builds clean
   - **Deviation from prototype:** using Snipcart's native cart drawer (heavily CSS-overridden in `globals.css`) rather than a custom drawer. Tradeoff: ~90% design fidelity for a fraction of the code. Custom drawer can land as a follow-up if pixel parity matters.
   - `<SnipcartAddButton>` — shared component used by both ProductCard (inline Add) and PDP
   - `CartProvider` refactored to subscribe to `window.Snipcart.store` for itemCount (drives nav badge) and expose `openCart()` (triggers Snipcart drawer)
   - Free-shipping threshold + Stripe checkout handled by Snipcart dashboard config (not code)
- [x] **M8** — Search Overlay (Fuse.js) ✓ builds clean
   - `lib/search.ts` — cached Fuse index across name, shortName, sku, compat.name, tags, typeName, blurb
   - `components/ui/SearchOverlay.tsx` — full-screen overlay, 32px input, top 6 results w/ weave thumb + SKU + price
   - ⌘K / Ctrl+K to open, Esc to close, focus trap into input
   - Mounted once in `app/layout.tsx`
- [x] **M9** — CarbonPro page ✓ builds clean
   - Dark hero: "Same designs. Same materials. $30 less."
   - Shop grid of `isCarbonPro === true` products
   - Comparison table (9 rows): Steve's line vs CarbonPro
   - FAQ accordion (4 Qs) using new `<Accordion>` primitive (will be reused in M12)
- [x] **M10** — About page ✓ builds clean
   - Hero + Story long-form + 4-stat grid + `#why-carbon-fiber` anchor section + "Where to Buy" retailer grid (8 seed retailers in `data/retailers.json`)
- [x] **M11** — Blog index + MDX posts ✓ builds clean — 4 pages pre-rendered
   - `content/blog/*.mdx` with frontmatter: title, date, author, excerpt, tag, relatedProducts[]
   - `lib/blog.ts` reads MDX files, parses with `gray-matter`, sorts newest-first
   - `app/blog/page.tsx` — card grid index
   - `app/blog/[slug]/page.tsx` — MDX post rendered via `next-mdx-remote/rsc` with shared component styles, related-products row at bottom
   - 4 seed posts: carbon vs glass fiber, install walkthrough, Tarsacci launch, torque-by-hand
- [x] **M12** — FAQ page *(prototype gap — new)* ✓ 14 Qs across 5 categories with sticky jump-to nav and FAQ JSON-LD for Google rich results
- [x] **M13** — Contact page ✓ Form → Formspree (with mailto: fallback), detector dropdown populated from compatibility data, `?product=slug` pre-fills subject and message, Suspense-wrapped for searchParams
- [x] **M14** — Policy pages *(prototype gap — new)* ✓ Shipping, Returns & Warranty, Privacy — MDX content rendered through shared `<PolicyPage>` component with custom typography
- [x] **M15** — SEO, redirects, analytics, launch prep ✓ builds clean
   - `app/sitemap.ts` — enumerates static routes + 46 products + 14 brand/model combos + 4 blog posts
   - `app/robots.ts`
   - `lib/seo.ts` — `productJsonLd`, `organizationJsonLd`, `breadcrumbJsonLd`, `articleJsonLd`
   - Product JSON-LD (AggregateOffer + AggregateRating) injected into PDPs; Organization JSON-LD on homepage; FAQPage JSON-LD on /faq; BreadcrumbList on PDPs
   - `next.config.mjs` — 15 PHP-path → new-route 301 redirects
   - `middleware.ts` + `lib/legacy-redirects.ts` — /product.php?id=SKU and /product2.php?id=SKU → /products/[slug] via 46-entry SKU map
   - `@next/third-parties/google` GoogleAnalytics wired to `NEXT_PUBLIC_GA_ID` (no-op when unset)

---

## Design system (exact values from prototype)

### Tailwind tokens

```ts
// tailwind.config.ts — extend theme
colors: {
  bg:              '#F3F1E8',  // warm cream canvas — body bg
  surface:         '#FFFFFF',  // cards, content areas
  'surface-alt':   '#F3F1E8',  // alternating section bg (same as body)
  ink:             '#0A0B10',  // near-black — header/footer/dark sections
  'ink-soft':      '#0F1018',  // slightly lifted dark panels (note-from-steve card, carbonpro hero)
  text:            '#14151E',  // body text on light
  'text-muted':    '#6A6B73',  // secondary text, labels, meta
  border:          '#E3E1D6',  // dividers, card borders
  accent:          '#B8452F',  // terracotta — CTAs, prices, active states
  'accent-hover':  '#9A3624',  // 15% darker
  success:         '#2F7D4F',  // in-stock dot
  warn:            '#C89B3C',  // "made to order" dot / amber
  'cart-progress': '#FAF5E8',  // free-shipping banner bg
  carbonpro:       '#1E3A5F',  // CarbonPro badge bg
},
borderRadius: { DEFAULT: '0', sm: '2px', pill: '9999px' }, // editorial = hard corners
```

### Typography

- Inter 300/400/500/600/700/800 — primary family
- JetBrains Mono 400/500/600 — labels, SKUs, meta, prices-subline
- Hero H1: 72px / lh 1.02 / -0.03em / weight 700
- Section H2: 48–56px / lh 1.05 / -0.02em / weight 700
- Section eyebrow: 11px mono, `accent-hover`, `0.25em` tracking, uppercase, format `— 01 / Start here`
- Body: 15–17px / lh 1.6–1.7 / weight 400
- Buttons: 12–13px uppercase, `0.08em` tracking, weight 600
- Radius: `0` everywhere except color swatches and circular elements

### Component inventory

Ported 1:1 from `primitives.jsx`:

- `<Button>` — primary / secondary / dark / ghost / onDark / outlineOnDark
- `<Icon>` — 17-item set (search, cart, chev, chevL, chevR, close, menu, check, filter, plus, minus, star, arrowR, tool, shield, usa, truck, fb, yt, ig)
- `<Stars>` — filled/half/empty SVG stars
- `<ColorSwatch>` — 22/24/36px circles with selected ring
- `<AvailDot>` — 7px dot with glow, green when in stock
- `<Badge>` — default / accent / muted / carbonpro
- `<CompatTag>` — muted mono pill
- `<WeavePlaceholder>` — carbon-fiber weave SVG, per-color tinted, w/ shaft shape overlay
- `<BrandMark>` — letter-based brand mark (M/G/XP/T)

---

## Build order

### M0 — Bootstrap
1. `npx create-next-app@14 . --ts --tailwind --app --eslint --no-src-dir --import-alias="@/*"`
2. Install: `fuse.js yet-another-react-lightbox next-mdx-remote gray-matter @next/third-parties clsx`
3. Write `tailwind.config.ts` with tokens above
4. Configure `next/font` (Inter + JetBrains Mono) in `app/layout.tsx`, expose via CSS variables
5. Add Snipcart CSS link + script + hidden `<div id="snipcart">` to `app/layout.tsx` (API key via `process.env.NEXT_PUBLIC_SNIPCART_API_KEY`)
6. Add `.env.local` with placeholder keys
7. Write Snipcart theme overrides to `app/globals.css`

### M1 — Design system + layout shell
Port from `primitives.jsx` + `layout.jsx`:
- All primitives listed above → `components/ui/`
- `<AnnouncementBar>` with 5s message rotator + dismiss (gap-filler)
- `<Nav>` with hover mega-menus (`<MegaDetector>`, `<MegaProducts>`), sticky top, cart count badge, mobile hamburger
- `<MobileDrawer>` (gap-filler — prototype only stubbed this)
- `<Footer>` with 4 columns + newsletter inline form

### M2 — Product data layer
- `data/products/*.json` × 46 (catalog in original plan §4.4 + prototype `data.jsx`)
  - Fields: `slug, name, shortName, sku, type, material, compat[], priceFrom, priceTo, variants[], addOns[], colors[], images[], specs{}, description, designHighlights, crossSell[], rating, reviews, inStock, availabilityNote, badge?, featured?, customLengthAvailable?, customLengthSurcharge?`
- `data/compatibility.json` — brands[] → models[] → products[] graph
- `data/testimonials.json` — 3 seed entries from prototype
- `lib/products.ts` — helpers: `getAllProducts, getProductBySlug, filterProducts, getProductsForDetector, getCrossSellProducts, getRelatedProducts, getFilterOptions`
- Types: `types/product.ts`

### M3 — Homepage (`app/page.tsx`)
Port `homepage.jsx`. Components in `components/home/`:
- `<Hero>` — weave bg, rotated shaft w/ glow, stats strip (14/46/4.9★)
- `<ShopByDetector>` — 4-col brand card grid with model peek
- `<CategoryCards>` — 4-col (Complete Shafts / Lower Rods / Scoop Handles / Accessories)
- `<FeaturedProducts>` — 4 `<ProductCard>`s where `featured === true`
- `<WhyCarbon>` — dark 2-col with 4 benefit callouts
- `<TestimonialRow>` — 3 quote cards
- `<HandcraftedBanner>` — dark, shop photo placeholder, stats

### M4 — Collection + ProductCard + detector routes
- `<ProductCard>` in `components/products/`
- `<FilterSidebar>` with groups: Brand / Model / Type / Material / Color / Availability
- Sort: featured / price-asc / price-desc / rating
- `<Chip>` for active filters
- URL sync via `useSearchParams()`
- Routes: `/products`, `/detectors/[brand]`, `/detectors/[brand]/[model]` — all SSG via `generateStaticParams()`

### M5 — Find Your Shaft (`app/find-your-shaft/page.tsx`)
- Port `finder.jsx`
- 3-step React state flow, no URL transitions, in-page scroll-to-top on step change
- Results grouped by product type; glass-fiber separately

### M6 — PDP (`app/products/[slug]/page.tsx`)
- SSG for all 46 slugs
- Above-the-fold: 55/45 two-col → single-col mobile
- `<ImageGallery>` — main + 4 thumbs + lightbox (yet-another-react-lightbox)
- `<VariantSelector>` — color / length (Standard / Tall Man + inches input) / config (Std / CW-Ready +$25) / add-ons / qty
- `<SnipcartButton>` — dynamic data-attributes; custom fields for color/config/length/add-ons
- Trust row (hand-assembled / free shipping $149+ / lifetime warranty)
- Tabs: Description (+ "Note from Steve" card) / Specifications / Design & Engineering / Reviews
- Cross-sell row at bottom ("Also built for your [model]")

### M7 — Cart Drawer
- 420px right-slide drawer
- Line items with variant subline, qty stepper, remove
- Subtotal + shipping ($12 flat, free ≥ $149) + progress banner
- Checkout button opens Snipcart modal
- `localStorage` persistence via `CartProvider`

### M8 — Search Overlay
- Triggered by nav search icon / ⌘K
- Full-screen dark, 32px mono input, bottom-border accent
- Fuse.js index over name/description/compat/sku
- Top 6 results with weave thumb + SKU + price

### M9 — CarbonPro (`app/carbonpro/page.tsx`)
- Dark hero: "Same designs. Same materials. $30 less."
- Grid of products where `badge === 'CarbonPro'`
- Comparison table (Steve's vs. CarbonPro)
- CarbonPro-specific FAQ accordion

### M10 — About (`app/about/page.tsx`)
- MDX body + stats row (2018 / 14 / 46 / 8+)
- Photo placeholder
- `#why-carbon-fiber` anchor section
- Retailer grid from `data/retailers.json`

### M11 — Blog
- `app/blog/page.tsx` — card grid, 4 seed posts (from prototype list)
- `app/blog/[slug]/page.tsx` — MDX post w/ related-products row
- `content/blog/*.mdx` with frontmatter: `title, date, author, excerpt, featuredImage, relatedProducts[], tags[]`
- `lib/blog.ts` — loader, sorter, `getPostsByTag`, `getRelatedProducts`

### M12 — FAQ (prototype gap)
- `app/faq/page.tsx`
- `data/faq.json` — array of `{ category, question, answer }`
- Categories: Ordering & Payment / Shipping / Products / CarbonPro / Returns & Warranty
- Accordion using reusable `<Accordion>` primitive
- FAQ JSON-LD for Google rich results

### M13 — Contact (`app/contact/page.tsx`)
- Form (Name / Email / Subject / Detector model / Message)
- Submit → Formspree endpoint
- Side panel: direct email + shop note
- `?product=eq-cs-01` pre-fills subject = "Custom build — [Product]"

### M14 — Policies (prototype gap)
- `app/policies/{shipping,returns,privacy}/page.tsx`
- `content/policies/*.mdx` — migrate from current site where possible

### M15 — SEO, redirects, analytics
- `app/sitemap.ts` — all static routes + product slugs + blog slugs
- `app/robots.ts`
- `generateMetadata()` + Open Graph on every page
- `lib/seo.ts` JSON-LD helpers: `Product` (AggregateOffer), `FAQPage`, `Organization`, `BreadcrumbList`, `Article`
- `next.config.ts` — PHP-path permanent redirects (§6.4 of original plan)
- `middleware.ts` — `/product.php?id=EQ.CS-01` → new-slug lookup (46 entries)
- GA4 via `@next/third-parties/google`
- Snipcart e-commerce events hooked to `snipcart.events.on(...)`
- Lighthouse audit, target 90+ on all surfaces
- Sandbox Snipcart purchase end-to-end

---

## Snipcart integration notes

- Load CSS + JS from `cdn.snipcart.com/themes/v3.6.1/default/`
- Hidden `<div id="snipcart" data-api-key="…" data-config-modal-style="side" />` in root layout
- Every PDP renders one canonical Snipcart button with the active variant's data-attributes; React re-writes those attributes on variant change, so Snipcart's server-side price fetch always matches what's on screen
- Custom fields:
  - `custom1-name="Color"`, dropdown
  - `custom2-name="Configuration"`, dropdown (only on CW-eligible products)
  - `custom3-name="Custom Length (inches)"`, `custom3-type="textarea"`, optional — only required if Tall Man selected
  - `custom4-name="Add-ons"`, `custom4-options=…|…` — semicolon-delimited
- Shipping rates: flat by zone in Snipcart dashboard. Free over $149.
- Tax: Snipcart automatic US
- Webhook: POST new orders to `steve@stevesdetectorrods.com`

## Image strategy

- v1 renders `<WeavePlaceholder>` everywhere a real photo will go — tinted per color variant via shared `colorMap`
- `product.images[]` has real `src/alt` slots from day 1; swap placeholders for real photos file-by-file as Steve delivers, no component changes
- Keep weave thumbnails in cart/search even after hero shots exist — they're visually consistent

## Directory layout

```
app-v2/
├── ai-website-rebuild-plan.md   ← this file (living plan)
├── app/
│   ├── layout.tsx               root (nav + footer + Snipcart script)
│   ├── page.tsx                 homepage
│   ├── products/
│   │   ├── page.tsx             all-products collection
│   │   └── [slug]/page.tsx      PDP (SSG)
│   ├── detectors/[brand]/
│   │   ├── page.tsx             brand collection
│   │   └── [model]/page.tsx     brand+model collection
│   ├── find-your-shaft/page.tsx
│   ├── carbonpro/page.tsx
│   ├── about/page.tsx
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx
│   ├── policies/{shipping,returns,privacy}/page.tsx
│   ├── sitemap.ts · robots.ts · globals.css
├── components/
│   ├── layout/  ui/  products/  filters/  home/  compatibility/  cart/
├── lib/  products.ts  blog.ts  seo.ts  search.ts  snipcart.ts
├── data/
│   ├── products/*.json          46 files
│   └── compatibility.json  testimonials.json  faq.json  retailers.json  collections.json
├── content/  blog/*.mdx  policies/*.mdx
├── public/  images/{products,brands,blog,site}/  logo.svg  favicon.ico
├── types/  product.ts
├── middleware.ts  next.config.ts  tailwind.config.ts  tsconfig.json
```

## Verification cadence

After every milestone:
1. `npm run dev` → browser
2. Visual compare the milestone's surface(s) to the matching prototype JSX
3. Touch interactive state — hover mega menus, toggle filters, swap variants, open/close cart
4. M6/M7: real add-to-cart through Snipcart sandbox with variant + Tall Man custom length
5. Update Status checkboxes here in this file

Launch-readiness: walk the 20-point checklist in the original plan's §9 before DNS flip.

## Reference material

- Prototype source: `/tmp/sdr-design/sdr-re-write/project/*.jsx`
- Design chat transcript: `/tmp/sdr-design/sdr-re-write/chats/chat1.md`
- Product catalog (46-item list): original plan §4.4 (archived in this file's git history, or copy-pasteable from prototype `data.jsx`)
- Redirects list: original plan §6.4
- Launch checklist: original plan §9
- Competitive positioning: `competitive-analysis.md` (session outputs)
- Design rationale & voice: `design-analysis-and-proposal.md` (session outputs)
- Current site audit: `steves-detector-rods-site-audit.md` (session outputs)
