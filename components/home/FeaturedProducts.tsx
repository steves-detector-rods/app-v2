import { getFeaturedProducts } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

export function FeaturedProducts() {
  const featured = getFeaturedProducts(4);

  return (
    <section className="bg-surface" style={{ padding: "120px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div
          className="flex justify-between items-end"
          style={{ marginBottom: 56 }}
        >
          <div>
            <div
              className="font-mono text-[11px] uppercase"
              style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 14 }}
            >
              — 03 / Best sellers
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{ fontSize: 48, letterSpacing: "-0.02em" }}
            >
              Most popular builds.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
