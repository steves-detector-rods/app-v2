import testimonials from "@/data/testimonials.json";
import { Stars } from "@/components/ui/Stars";
import type { Testimonial } from "@/types/product";

const TESTIMONIALS = testimonials as Testimonial[];

export function TestimonialRow() {
  return (
    <section className="bg-surface" style={{ padding: "120px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1440 }}>
        <div style={{ marginBottom: 56 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#9A3624",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — 05 / From the forums
          </div>
          <h2
            className="font-sans font-bold text-text"
            style={{ fontSize: 48, letterSpacing: "-0.02em" }}
          >
            What detectorists say.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="flex flex-col gap-5 bg-surface-alt border border-border"
              style={{ padding: 36 }}
            >
              <Stars rating={t.rating} size={14} />
              <p
                className="text-pretty font-sans text-text"
                style={{ fontSize: 17, lineHeight: 1.55, fontWeight: 400 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div
                className="mt-auto border-t border-border"
                style={{ paddingTop: 16 }}
              >
                <div className="font-semibold text-[14px] text-text">{t.name}</div>
                <div
                  className="font-mono text-[12px] text-text-muted mt-0.5"
                  style={{ letterSpacing: "0.04em" }}
                >
                  {t.detector.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
