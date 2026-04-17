import Link from "next/link";
import { BRANDS, MODELS_BY_BRAND } from "@/lib/compatibility";
import { BrandMark } from "@/components/ui/BrandMark";

export function ShopByDetector() {
  return (
    <section className="bg-surface" style={{ padding: "120px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div
          className="flex flex-wrap items-end justify-between gap-5"
          style={{ marginBottom: 56 }}
        >
          <div>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 14,
              }}
            >
              — 01 / Start here
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: 48,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                maxWidth: 700,
              }}
            >
              What detector are
              <br />
              you running?
            </h2>
          </div>
          <p
            className="text-text-muted"
            style={{ fontSize: 15, lineHeight: 1.6, maxWidth: 420 }}
          >
            Most buyers arrive knowing their machine, not a part number. Pick your detector and
            we&apos;ll surface everything that fits.
          </p>
        </div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 border border-border"
          style={{ background: "#E3E1D6", gap: 2 }}
        >
          {BRANDS.map((b, i) => (
            <Link
              key={b.slug}
              href={`/detectors/${b.slug}`}
              prefetch={false}
              className="hover-lift flex flex-col gap-5 bg-surface"
              style={{ padding: "48px 32px", minHeight: 320 }}
            >
              <div className="flex justify-between items-start">
                <BrandMark brand={b.slug} size={56} />
                <div
                  className="font-mono text-[10px] text-text-muted"
                  style={{ letterSpacing: "0.1em" }}
                >
                  {String(i + 1).padStart(2, "0")} / 04
                </div>
              </div>
              <div>
                <div
                  className="font-sans font-semibold text-text"
                  style={{ fontSize: 24, letterSpacing: "-0.01em" }}
                >
                  {b.name}
                </div>
                <div
                  className="font-mono text-[13px] text-text-muted mt-1"
                  style={{ letterSpacing: "0.05em" }}
                >
                  {b.count} PRODUCTS
                </div>
              </div>
              <div
                className="flex flex-col gap-1.5 mt-auto border-t border-border"
                style={{ paddingTop: 16 }}
              >
                {MODELS_BY_BRAND[b.slug].slice(0, 4).map((m) => (
                  <div
                    key={m.slug}
                    className="flex justify-between items-center text-[13px] text-text"
                  >
                    <span>{m.name}</span>
                    <span className="font-mono text-[10px] text-text-muted">→</span>
                  </div>
                ))}
                {MODELS_BY_BRAND[b.slug].length > 4 && (
                  <div className="text-[12px] text-text-muted mt-1">
                    + {MODELS_BY_BRAND[b.slug].length - 4} more
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
