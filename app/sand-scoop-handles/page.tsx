import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { Icon } from "@/components/ui/Icon";
import {
  getAllScoopBrands,
  getAllScoopHandles,
  getScoopHandlePriceFrom,
} from "@/lib/scoop-brands";
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sand Scoop Handles — Carbon-Fiber Handles for 8 Scoop Brands",
  description:
    "Carbon-fiber sand scoop handles for Stealth, CKG, CooB, T-REX, Xtreme, Stavr, Honey Badger, and Dune scoops — plus custom builds for makes we don't stock. Handle-only, sold separately: for bare scoops or replacing a heavy wood or steel handle. 46.5in, foam-filled, stainless hardware.",
  alternates: { canonical: "/sand-scoop-handles" },
  openGraph: {
    title: "Sand Scoop Handles — Carbon-Fiber, Handle Only",
    description:
      "Carbon-fiber scoop handles for 8 sand-scoop brands, plus custom builds for other makes. Bought a bare scoop, or replacing wood or steel? Hand-built in Norman, Oklahoma.",
    url: "/sand-scoop-handles",
  },
};

/**
 * The two ways people arrive here. Roughly an even split.
 *
 * Path one has three distinct practical facts a bare-scoop buyer needs, so it
 * renders as a list. Path two has exactly one argument — strength-to-weight —
 * so it gets a single emphasised block instead of three diluted bullets.
 */
const PATHS: Array<{
  kicker: string;
  title: string;
  body: string;
  points?: string[];
  highlight?: { label: string; statement: string };
}> = [
  {
    kicker: "Path one",
    title: "Your scoop came without a handle.",
    body: "Plenty of scoops ship as a basket only — bought bare on the aftermarket, or from a maker who treats the handle as an add-on you skipped. You don't need a replacement. You need the handle, and you need the right one for your mount.",
    points: [
      "Handle only — this is the part, not a whole scoop.",
      "Matched per scoop brand, so it bolts to your mount.",
      "One hole to drill in the handle, to match your mount.",
    ],
  },
  {
    kicker: "Path two",
    title: "You're digging with wood or steel.",
    body: "The other half of our customers already have a handle — a wooden shaft or a metal tube — and it's heavier than the job needs. A loaded scoop is basket, wet sand, and handle, and you lift all three out of the hole on every single dig.",
    highlight: {
      label: "Strength-to-weight",
      statement:
        "This is the whole argument for carbon. Pound for pound, carbon fiber is stiffer and stronger than steel, aluminum, or wood — so a carbon tube reaches the rigidity a scoop handle needs at a fraction of the weight it takes to get there any other way.",
    },
  },
];

/** Material comparison — the actual upsell. Qualitative on purpose: see note below. */
const COMPARISON: Array<[string, string, string, string]> = [
  [
    "Weight per lift",
    "Heaviest, worse when wet",
    "Heavy",
    "Lightest of the three",
  ],
  [
    "In water",
    "Absorbs it; swells and splits",
    "Corrodes or pits over time",
    "Doesn't absorb, doesn't corrode",
  ],
  [
    "If water gets in",
    "Soaks through the grain",
    "Hollow tube holds water and sand",
    "Closed-cell foam, nowhere to fill",
  ],
  [
    "After a hard season",
    "Warps, cracks at the mount",
    "Takes a permanent bend",
    "Returns to straight",
  ],
  [
    "At the mount",
    "Splits around the bolts",
    "Bare tube, no backing",
    'ABS plastic core, lower 6"',
  ],
  [
    "Fasteners",
    "Whatever's in it",
    "Often plated steel",
    "Stainless, no plating",
  ],
  ["Grip", "Bare wood", "Bare tube or foam sleeve", "Textured non-slip PVC"],
  ["Warranty", "None", "Varies", "Lifetime on the carbon"],
];

const FAQ = [
  {
    id: "scoop-handle-only",
    question: "Is this just the handle, or the whole scoop?",
    answer:
      "Just the handle. We don't make baskets. About half the people who buy these bought a scoop that came as a basket only — either bare on the aftermarket, or from a maker who sells the handle separately — so if that's you, this is the missing part and not a replacement. Pick your scoop brand and the handle is built to bolt to that mount.",
  },
  {
    id: "scoop-no-handle",
    question: "I bought a bare scoop. What else do I need?",
    answer:
      "Usually just the handle, and ability to drill a hole in the handle (most scoops' mounts have a pre-drilled bolt hole, so a hole needs to be drilled in the handle to match the location of the holes in the mount). The handle is built to fit the mount already on your basket.",
  },
  {
    id: "scoop-why-carbon",
    question: "Why carbon fiber instead of wood, steel, or aluminum?",
    answer:
      "Weight and water, mostly. Carbon is lighter than wood or steel at the same stiffness, and every ounce in the handle is an ounce you lift along with the basket and the wet sand — a few hundred times in a long session, which is where it compounds. Then there's water: wood can absorb it and gets heavier as the day goes on before splitting around the bolt holes. Steel and aluminum corrode, and at times can take a permanent bend. A hollow metal handle can also fill with water and sand, which is dead weight you then lift on every dig. Carbon doesn't absorb water, doesn't corrode, and returns to straight — and the foam fill means there's nowhere for water to collect.",
  },
  {
    id: "scoop-carbon-worth",
    question: "Is carbon actually worth it over a cheap metal handle?",
    answer:
      "If you hunt occasionally, honestly probably not — a metal handle will do the job and cost less. The case for carbon is hours. If you're out weekly, or you're in the surf for long sessions, it pays for itself in reducing the weight you are carrying during the hunt",
  },
  {
    id: "scoop-other-makes",
    question: "My scoop brand isn't listed. Can you still help?",
    answer:
      "Most of the time, yes. The brands on this page are the ones we usually keep stock handles for, not the limit of what Steve can build. Send him the make of your scoop, a photo of the mount, and measurements of the inner diameter of the mount/sleeve; with dimensions in hand, a one-off requires the ordering of a proper-sized carbon tube, and then some routine shop work. He'll tell you what's possible and what it costs before you commit to anything.",
  },
  {
    id: "scoop-fit",
    question: "How do I know it fits my scoop?",
    answer:
      "Pick your scoop brand from the list on this page — each brand has its own handle build. designed to fit that specific scoop.",
  },
  {
    id: "scoop-length",
    question: "Why is every handle 46 1/2 inches?",
    answer:
      "It's the length that suits a standing dig for most people, which is how the large majority of scoop hunting happens. This length also avoids added shipping charges that an oversized (48\") package is assessed, by most shipping companies.  Custom lengths aren't a stock option, but Steve does one-off builds when he has the dimensions in hand — contact him directly if you need something materially different.",
  },
  {
    id: "scoop-foam",
    question: "What does the foam fill actually do?",
    answer:
      'Many people think the foam makes the handle float, but a sealed handle floats with or without foam.  What the foam does, is "takes up space" inside the hollow handle, preventing the handle from filling completely with water should water ever intrude into the handle',
  },
  {
    id: "scoop-abs",
    question: "Why is there plastic in a carbon handle?",
    answer:
      "The lower 6 inches carry an ABS plastic core because that's where the mounting bolt inserts through and where compression and leverage load concentrate. Carbon is excellent in bending along the tube, but a bolt-through hole in a hollow, thin-wall tube is a stress point. The ABS core gives the fastener something to bear against.",
  },
  {
    id: "scoop-salt",
    question: "Is it safe in saltwater?",
    answer:
      "Yes. The carbon doesn't corrode and all the hardware (when included) is marine-grade stainless — no plated fasteners to bleed rust. Rinse it with fresh water along with the rest of your gear; salt/sand left in the mount is what can eventually make disassembly difficult.",
  },
];

export default function SandScoopHandlesPage() {
  const brands = getAllScoopBrands();
  const handles = getAllScoopHandles();
  const priceFrom = getScoopHandlePriceFrom();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Sand Scoop Handles" },
  ];

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(FAQ) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: itemListJsonLd({
            name: "Sand Scoop Handles",
            description:
              "Carbon-fiber replacement handles for sand scoops, hand-built in Norman, Oklahoma.",
            url: "/sand-scoop-handles",
            products: handles,
          }),
        }}
      />

      {/* Dark hero */}
      <section
        className="text-bg"
        style={{ background: "#0F1018", padding: "100px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#B8452F",
              letterSpacing: "0.25em",
              marginBottom: 16,
            }}
          >
            — Sand scoop handles · handle only
          </div>
          <h1
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(30px, 4.6vw, 60px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.04,
              marginBottom: 24,
              maxWidth: 940,
            }}
          >
            No handle in the box?
            <br />
            Or one made of wood or steel?
            <br />
            <span style={{ color: "#B8452F" }}>Carbon fiber, either way.</span>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#CDCBBF",
              maxWidth: 660,
            }}
          >
            We build the handle, not the basket. About half our customers bought
            a scoop that arrived without one; the other half are replacing
            something heavier than the job needs. We stock handles for{" "}
            {brands.length} scoop brands, each matched to that brand&apos;s
            mount — and if yours isn&apos;t on the list, Steve builds one-offs.
            Foam-filled, non-slip grip, all stainless hardware, ${priceFrom}.
          </p>
          <div className="flex flex-wrap gap-3" style={{ marginTop: 36 }}>
            <Link
              href="#brands"
              className="font-mono uppercase inline-flex items-center gap-2 no-underline"
              style={{
                background: "#B8452F",
                color: "#F3F1E8",
                padding: "14px 24px",
                fontSize: 12,
                letterSpacing: "0.12em",
              }}
            >
              Find your scoop brand <Icon name="arrowR" size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Two-path fork — the two reasons people land here */}
      <section style={{ padding: "80px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div style={{ marginBottom: 44 }}>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 12,
              }}
            >
              — Two ways people get here
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              Which one are you?
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PATHS.map((p) => (
              <div
                key={p.kicker}
                className="flex flex-col bg-surface border border-border"
                style={{ padding: "32px" }}
              >
                <div
                  className="font-mono uppercase"
                  style={{
                    color: "#9A3624",
                    fontSize: 11,
                    letterSpacing: "0.18em",
                    marginBottom: 14,
                  }}
                >
                  {p.kicker}
                </div>
                <h3
                  className="font-sans font-bold text-text"
                  style={{
                    fontSize: "clamp(20px, 2.4vw, 25px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.15,
                    marginBottom: 16,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  className="text-text-muted"
                  style={{ fontSize: 15.5, lineHeight: 1.68, marginBottom: 22 }}
                >
                  {p.body}
                </p>
                {p.points && (
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 4px 0",
                    }}
                  >
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-3 text-text"
                        style={{
                          fontSize: 14.5,
                          lineHeight: 1.55,
                          padding: "8px 0",
                        }}
                      >
                        <span style={{ color: "#B8452F", flexShrink: 0 }}>
                          —
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {p.highlight && (
                  <div
                    className="bg-surface-alt mt-auto"
                    style={{
                      padding: "22px 24px",
                      borderLeft: "3px solid #B8452F",
                    }}
                  >
                    <div
                      className="font-mono uppercase"
                      style={{
                        color: "#9A3624",
                        fontSize: 11,
                        letterSpacing: "0.18em",
                        marginBottom: 10,
                      }}
                    >
                      {p.highlight.label}
                    </div>
                    <p
                      className="text-text"
                      style={{ fontSize: 15, lineHeight: 1.65 }}
                    >
                      {p.highlight.statement}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand grid — the internal-linking hub */}
      <section
        id="brands"
        className="bg-surface-alt"
        style={{ padding: "80px 24px", scrollMarginTop: 80 }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div style={{ marginBottom: 40 }}>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 12,
              }}
            >
              — Shop by scoop brand
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              Which scoop are you running?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {brands.map((b) => (
              <Link
                key={b.slug}
                href={`/sand-scoop-handles/${b.slug}`}
                prefetch={false}
                className="flex flex-col bg-surface border border-border hover:border-accent transition-colors no-underline"
                style={{ padding: "24px" }}
              >
                <div
                  className="font-sans font-bold text-text"
                  style={{
                    fontSize: 22,
                    letterSpacing: "-0.02em",
                    marginBottom: 8,
                  }}
                >
                  {b.name}
                </div>
                <div
                  className="text-text-muted"
                  style={{ fontSize: 14, lineHeight: 1.55, marginBottom: 16 }}
                >
                  {b.tagline}
                </div>
                <div
                  className="font-mono uppercase text-text-muted mt-auto"
                  style={{ fontSize: 11, letterSpacing: "0.1em" }}
                >
                  View handle →
                </div>
              </Link>
            ))}
          </div>

          {/* Unsupported makes — Steve builds one-offs */}
          <div
            className="bg-surface"
            style={{
              marginTop: 32,
              padding: "32px 36px",
              borderLeft: "3px solid #B8452F",
            }}
          >
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div style={{ maxWidth: 720 }}>
                <h3
                  className="font-sans font-bold text-text"
                  style={{
                    fontSize: "clamp(20px, 2.4vw, 25px)",
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  Don&apos;t see your scoop?
                </h3>
                <p
                  className="text-text-muted"
                  style={{ fontSize: 15.5, lineHeight: 1.68 }}
                >
                  These are the brands we keep handles in stock for — not the
                  only ones Steve can build for. Scoop makers come and go, and
                  mounts vary more than a brand list suggests. Send him the make
                  of your scoop, a photo of the mount, and a couple of
                  measurements across the bolt holes, and he&apos;ll tell you
                  whether he can build to it and what it would cost. Custom
                  one-offs are a normal part of the shop&apos;s work, not a
                  favour.
                </p>
              </div>
              <Link
                href="/contact"
                prefetch={false}
                className="font-mono uppercase inline-flex items-center gap-2 no-underline"
                style={{
                  background: "#B8452F",
                  color: "#F3F1E8",
                  padding: "14px 24px",
                  fontSize: 12,
                  letterSpacing: "0.12em",
                  flexShrink: 0,
                }}
              >
                Ask about your scoop <Icon name="arrowR" size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Carbon-fiber upsell */}
      <section
        className="text-bg"
        style={{ background: "#14151E", padding: "90px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#B8452F",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — Why carbon
          </div>
          <h2
            className="font-sans font-bold"
            style={{
              fontSize: "clamp(26px, 3.4vw, 40px)",
              letterSpacing: "-0.02em",
              lineHeight: 1.08,
              marginBottom: 22,
              maxWidth: 780,
            }}
          >
            Every dig lifts the handle too.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.68,
              color: "#CDCBBF",
              maxWidth: 660,
              marginBottom: 48,
            }}
          >
            A loaded scoop is basket, wet sand, and handle, and you lift all
            three out of the hole every time you dig. Ounces in the handle
            don&apos;t sound like much on their own — multiplied across a few
            hundred recoveries, and across every mile you carry the scoop
            between targets, they decide whether you finish the hunt strong or
            pack up early.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              [
                "It stays straight",
                "Wood warps and splits around the bolt holes. Steel and aluminum take a permanent bend after enough hard digs. Carbon returns to its original shape.",
              ],
              [
                "It ignores saltwater",
                "No corrosion, no water absorption, no pitting — and no plated steel in the build to bleed rust into wet sand.",
              ],
              [
                "It can't waterlog",
                "A hollow handle takes on water and sand through the season, and that's dead weight you lift on every dig. Closed-cell foam leaves nowhere for it to collect.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <div
                  className="font-sans font-semibold"
                  style={{ fontSize: 17, marginBottom: 10, color: "#F3F1E8" }}
                >
                  {title}
                </div>
                <p
                  style={{ fontSize: 14.5, lineHeight: 1.65, color: "#9A9BA3" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Material comparison */}
      <section style={{ padding: "80px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div style={{ marginBottom: 40 }}>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 12,
              }}
            >
              — Side by side
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              Wood vs. metal vs. carbon.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse bg-surface border border-border"
              style={{ minWidth: 820 }}
            >
              <thead>
                <tr className="border-b border-border">
                  <th
                    className="font-mono uppercase text-text-muted text-left"
                    style={{
                      padding: "16px 20px",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                    }}
                  >
                    &nbsp;
                  </th>
                  <th
                    className="font-sans font-semibold text-text-muted text-left"
                    style={{ padding: "16px 20px", fontSize: 14 }}
                  >
                    Wooden Handle
                  </th>
                  <th
                    className="font-sans font-semibold text-text-muted text-left"
                    style={{ padding: "16px 20px", fontSize: 14 }}
                  >
                    Steel or Aluminum
                  </th>
                  <th
                    className="font-sans font-semibold text-text text-left"
                    style={{
                      padding: "16px 20px",
                      fontSize: 14,
                      borderLeft: "2px solid #B8452F",
                    }}
                  >
                    Steve&apos;s Carbon Handle
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feature, wood, metal, ours]) => (
                  <tr key={feature} className="border-b border-border">
                    <td
                      className="font-mono uppercase text-text-muted"
                      style={{
                        padding: "14px 20px",
                        fontSize: 12,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {feature}
                    </td>
                    <td
                      className="text-text-muted"
                      style={{ padding: "14px 20px", fontSize: 14 }}
                    >
                      {wood}
                    </td>
                    <td
                      className="text-text-muted"
                      style={{ padding: "14px 20px", fontSize: 14 }}
                    >
                      {metal}
                    </td>
                    <td
                      className="text-text font-medium"
                      style={{
                        padding: "14px 20px",
                        fontSize: 14,
                        borderLeft: "2px solid #B8452F",
                      }}
                    >
                      {ours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* All SKUs */}
      <section className="bg-surface-alt" style={{ padding: "80px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div style={{ marginBottom: 40 }}>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 12,
              }}
            >
              — Every scoop handle we build
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              Every handle, ${priceFrom}.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {handles.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "80px 24px 120px" }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <div style={{ marginBottom: 40 }}>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 12,
              }}
            >
              — Questions we get
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(26px, 3.4vw, 36px)",
                letterSpacing: "-0.02em",
              }}
            >
              Scoop handle FAQ.
            </h2>
          </div>
          <Accordion items={FAQ} />
        </div>
      </section>
    </div>
  );
}
