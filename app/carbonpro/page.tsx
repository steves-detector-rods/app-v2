import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Accordion } from "@/components/ui/Accordion";

export const metadata: Metadata = {
  title: "CarbonPro — Premium shafts, factory-assembled",
  description:
    "CarbonPro is the same design, same materials, factory-assembled instead of hand-built. Same quality at a lower price.",
};

const COMPARISON = [
  ["Carbon-fiber tubes", "3K twill, glossy", "3K twill, glossy"],
  ["Cam lock", "Injection-molded nylon", "Injection-molded nylon"],
  ["Hardware", "All stainless steel", "All stainless steel"],
  ["End caps", "Injection-molded plastic", "Injection-molded plastic"],
  ["Assembly", "Hand-built by Steve", "Factory, batch-assembled"],
  ["Custom lengths", "Yes (Tall Man option)", "Standard only"],
  ["Color options", "5 colors", "2 colors"],
  ["Lead time", "3–5 days", "In-stock, same day"],
  ["Price", "From $129", "From $99"],
];

const FAQ = [
  {
    id: "cp-why",
    question: "What's the difference between CarbonPro and Steve's?",
    answer: (
      <>
        Same tubes, same cam locks, same hardware. The difference is how they&apos;re put
        together: Steve&apos;s line is hand-assembled in the Norman shop (inspected, torqued,
        logged); CarbonPro is factory-assembled to the same spec sheet at batch volumes. The
        CarbonPro line lets us offer the design at a lower price without changing the
        materials.
      </>
    ),
  },
  {
    id: "cp-warranty",
    question: "Does CarbonPro have the same warranty?",
    answer: (
      <>Yes — lifetime warranty on the carbon itself. Hardware is one year.</>
    ),
  },
  {
    id: "cp-custom",
    question: "Can I get a Tall Man custom length in CarbonPro?",
    answer: (
      <>
        No — custom lengths are only available on Steve&apos;s line. CarbonPro is
        stocked in standard lengths. If you need custom, order from the main catalog.
      </>
    ),
  },
  {
    id: "cp-compatibility",
    question: "Which detectors does CarbonPro cover?",
    answer: (
      <>
        Currently Minelab Equinox 600/800 only. We&apos;re expanding to the 700/900 and
        Manticore in 2026. Sign up for the newsletter to hear about drops.
      </>
    ),
  },
];

export default function CarbonProPage() {
  const products = getAllProducts().filter((p) => p.isCarbonPro);

  return (
    <div className="bg-surface">
      {/* Dark hero */}
      <section
        className="text-bg"
        style={{ background: "#0F1018", padding: "100px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{ color: "#B8452F", letterSpacing: "0.25em", marginBottom: 16 }}
          >
            — The CarbonPro line
          </div>
          <h1
            className="font-sans font-bold"
            style={{
              fontSize: 64,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              marginBottom: 24,
              maxWidth: 800,
            }}
          >
            Same designs.
            <br />
            Same materials.
            <br />
            <span style={{ color: "#B8452F" }}>$30 less.</span>
          </h1>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#CDCBBF",
              maxWidth: 640,
            }}
          >
            CarbonPro is the same shaft, factory-assembled instead of hand-built. Identical
            carbon-fiber tubes, identical hardware — just not torqued by Steve. For buyers who
            want the product, not the provenance.
          </p>
        </div>
      </section>

      {/* Shop grid */}
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
              — Shop the CarbonPro catalog
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{ fontSize: 36, letterSpacing: "-0.02em" }}
            >
              Currently {products.length} SKU{products.length === 1 ? "" : "s"}.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison table */}
      <section
        className="bg-surface-alt"
        style={{ padding: "80px 24px" }}
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
              — Side by side
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{ fontSize: 36, letterSpacing: "-0.02em" }}
            >
              Steve&apos;s vs. CarbonPro.
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table
              className="w-full border-collapse bg-surface border border-border"
              style={{ minWidth: 700 }}
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
                    Feature
                  </th>
                  <th
                    className="font-sans font-semibold text-text text-left"
                    style={{ padding: "16px 20px", fontSize: 14 }}
                  >
                    Steve&apos;s Line
                  </th>
                  <th
                    className="font-sans font-semibold text-text text-left"
                    style={{ padding: "16px 20px", fontSize: 14 }}
                  >
                    CarbonPro
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(([feature, steves, carbonpro], i) => (
                  <tr key={i} className="border-b border-border">
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
                      className="text-text"
                      style={{ padding: "14px 20px", fontSize: 14 }}
                    >
                      {steves}
                    </td>
                    <td
                      className="text-text"
                      style={{ padding: "14px 20px", fontSize: 14 }}
                    >
                      {carbonpro}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              style={{ fontSize: 36, letterSpacing: "-0.02em" }}
            >
              CarbonPro FAQ.
            </h2>
          </div>
          <Accordion items={FAQ} />
        </div>
      </section>
    </div>
  );
}
