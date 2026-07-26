import Link from "next/link";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";
import { Icon } from "@/components/ui/Icon";

const CATS = [
  {
    slug: "complete-shaft",
    name: "Complete Shafts",
    desc: "Replace your entire stock shaft with a zero-flex carbon build.",
    count: 9,
    href: "/products?type=complete-shaft",
  },
  {
    slug: "lower-rod",
    name: "Lower Rods",
    desc: "Carbon-fiber and glass-fiber options. Standard and Tall Man lengths.",
    count: 18,
    href: "/products?type=lower-rod",
  },
  {
    slug: "scoop-handle",
    name: "Sand Scoop Handles",
    desc: 'Heavy-duty 46.5" carbon handles for 8 sand-scoop brands.',
    count: 9,
    href: "/sand-scoop-handles",
  },
  {
    slug: "accessory",
    name: "Accessories",
    desc: "Arm cuffs, counterweight tubes, specialty mounts.",
    count: 4,
    href: "/products?type=accessory",
  },
];

export function CategoryCards() {
  return (
    <section className="bg-surface-alt" style={{ padding: "120px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div
          className="flex flex-wrap justify-between items-end gap-5"
          style={{ marginBottom: 56 }}
        >
          <div>
            <div
              className="font-mono text-[11px] uppercase"
              style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 14 }}
            >
              — 02 / The catalog
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: 48,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
              }}
            >
              Shop by what you need.
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 font-semibold uppercase"
            style={{
              color: "#9A3624",
              fontSize: 13,
              letterSpacing: "0.1em",
            }}
          >
            View all 46 products <Icon name="arrowR" size={12} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {CATS.map((c) => (
            <Link
              key={c.slug}
              href={c.href}
              prefetch={false}
              className="hover-lift bg-surface border border-border"
            >
              <div style={{ aspectRatio: "4/3" }}>
                <WeavePlaceholder color="black" label={c.slug} aspect="4/3" />
              </div>
              <div style={{ padding: 24 }}>
                <div className="flex justify-between items-center mb-2">
                  <div
                    className="font-sans font-semibold text-text"
                    style={{ fontSize: 19, letterSpacing: "-0.01em" }}
                  >
                    {c.name}
                  </div>
                  <span className="font-mono text-[11px] text-text-muted">{c.count}</span>
                </div>
                <p
                  className="text-text-muted mb-4"
                  style={{ fontSize: 13, lineHeight: 1.55 }}
                >
                  {c.desc}
                </p>
                <div
                  className="inline-flex items-center gap-1.5 font-semibold uppercase"
                  style={{
                    color: "#9A3624",
                    fontSize: 12,
                    letterSpacing: "0.08em",
                  }}
                >
                  Shop <Icon name="arrowR" size={11} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
