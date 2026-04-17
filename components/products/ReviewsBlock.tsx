import { Button } from "@/components/ui/Button";
import { Stars } from "@/components/ui/Stars";
import type { Product } from "@/types/product";

// v1: seed 3 sample reviews per product. Real reviews come later
// (Snipcart supports post-purchase review emails — M15).
const SAMPLE_REVIEWS: Array<{
  name: string;
  rating: number;
  detector: string;
  date: string;
  text: string;
}> = [
  {
    name: "Randy K.",
    rating: 5,
    detector: "Equinox 800",
    date: "Mar 2026",
    text:
      "Third shaft I've bought from Steve. Zero flex, perfect fit. The cam lock alone is a massive upgrade from stock.",
  },
  {
    name: "Dave P.",
    rating: 5,
    detector: "Equinox 700",
    date: "Feb 2026",
    text:
      'Tall Man at 30" came in exactly as specified. Custom build felt like a bespoke product, not a retrofit.',
  },
  {
    name: "Marco V.",
    rating: 4,
    detector: "Manticore",
    date: "Jan 2026",
    text:
      "Great shaft. Only gripe — wish there was an even longer Tall Man option. Otherwise, flawless.",
  },
];

const DIST = [
  { stars: 5, pct: 82 },
  { stars: 4, pct: 13 },
  { stars: 3, pct: 4 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 1 },
];

interface ReviewsBlockProps {
  product: Product;
}

export function ReviewsBlock({ product: p }: ReviewsBlockProps) {
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[280px_1fr]"
      style={{ gap: 60, maxWidth: 1100 }}
    >
      <div>
        <div
          className="font-sans font-bold text-text"
          style={{ fontSize: 56, letterSpacing: "-0.02em", lineHeight: 1 }}
        >
          {p.rating.toFixed(1)}
        </div>
        <Stars rating={p.rating} size={18} />
        <div
          className="font-mono text-text-muted mt-1.5"
          style={{ fontSize: 13, letterSpacing: "0.04em" }}
        >
          {p.reviews} REVIEWS
        </div>
        <div className="flex flex-col gap-2" style={{ marginTop: 24 }}>
          {DIST.map((d) => {
            const n = Math.round((p.reviews * d.pct) / 100);
            return (
              <div key={d.stars} className="flex items-center gap-2.5 text-[12px]">
                <span
                  className="font-mono text-text-muted"
                  style={{ width: 16 }}
                >
                  {d.stars}★
                </span>
                <div className="flex-1 bg-border" style={{ height: 6 }}>
                  <div
                    style={{ width: `${d.pct}%`, height: "100%", background: "#B8452F" }}
                  />
                </div>
                <span
                  className="font-mono text-text-muted text-right"
                  style={{ width: 28 }}
                >
                  {n}
                </span>
              </div>
            );
          })}
        </div>
        <Button variant="secondary" small style={{ marginTop: 24 }}>
          Write a review
        </Button>
      </div>
      <div className="flex flex-col" style={{ gap: 24 }}>
        {SAMPLE_REVIEWS.map((r, i) => (
          <div
            key={i}
            className="border-b border-border"
            style={{ paddingBottom: 24 }}
          >
            <div className="flex justify-between mb-2">
              <div>
                <div
                  className="font-sans font-semibold text-text"
                  style={{ fontSize: 15 }}
                >
                  {r.name}
                </div>
                <div
                  className="font-mono text-text-muted"
                  style={{ fontSize: 12, letterSpacing: "0.04em" }}
                >
                  {r.detector.toUpperCase()} · {r.date.toUpperCase()}
                </div>
              </div>
              <Stars rating={r.rating} size={13} />
            </div>
            <p className="text-text m-0" style={{ fontSize: 14, lineHeight: 1.6 }}>
              {r.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
