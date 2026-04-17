import { ProductCard } from "@/components/products/ProductCard";
import type { Product } from "@/types/product";

interface CrossSellRowProps {
  eyebrow: string;
  title: string;
  products: Product[];
}

export function CrossSellRow({ eyebrow, title, products }: CrossSellRowProps) {
  if (products.length === 0) return null;
  return (
    <div className="bg-surface-alt" style={{ padding: "80px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div style={{ marginBottom: 32 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#9A3624",
              letterSpacing: "0.2em",
              marginBottom: 10,
            }}
          >
            — {eyebrow}
          </div>
          <h3
            className="font-sans font-bold text-text"
            style={{ fontSize: 32, letterSpacing: "-0.02em" }}
          >
            {title}
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
