import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";

const POINTS = [
  {
    t: "Zero flex",
    d: "3K twill CF is stiffer than aluminum pound-for-pound. No wobble at depth.",
  },
  {
    t: "40% lighter",
    d: "A typical complete shaft drops from 14oz factory to 8oz in our builds.",
  },
  {
    t: "Corrosion-proof",
    d: "Saltwater, sand, rain. Carbon fiber outlasts anodized aluminum by years.",
  },
  {
    t: "Precision fit",
    d: 'Every part hand-fitted. No shims, no wrap tape, no "it mostly fits."',
  },
];

export function WhyCarbon() {
  return (
    <section
      className="relative overflow-hidden text-bg"
      style={{ background: "#0A0B10", padding: "120px 24px" }}
    >
      {/* Subtle twill background */}
      <div className="absolute inset-0" style={{ opacity: 0.12 }}>
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="why-twill"
              patternUnits="userSpaceOnUse"
              width="12"
              height="12"
              patternTransform="rotate(20)"
            >
              <rect width="12" height="12" fill="#0A0B10" />
              <rect x="0" y="0" width="6" height="6" fill="#2A2C38" />
              <rect x="6" y="6" width="6" height="6" fill="#2A2C38" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#why-twill)" />
        </svg>
      </div>

      <div
        className="relative mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-20 items-center"
        style={{ maxWidth: 1440 }}
      >
        <div className="relative" style={{ aspectRatio: "4/5" }}>
          <WeavePlaceholder
            color="black"
            aspect="4/5"
            label="3K TWILL · GLOSS"
            style={{ border: "1px solid #1A1A24" }}
          />
        </div>
        <div>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#B8452F",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — 04 / The material
          </div>
          <h2
            className="font-sans font-bold"
            style={{
              fontSize: 48,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              marginBottom: 24,
            }}
          >
            Why every shaft
            <br />
            is carbon fiber.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.7,
              color: "#CDCBBF",
              maxWidth: 540,
              marginBottom: 40,
            }}
          >
            Factory shafts are built to a price, not a standard. Aluminum flexes under load.
            Plastic locks loosen and slip. We use 3K carbon-fiber twill, injection-molded nylon
            cam locks, and stainless hardware — because the coil is where the signal lives, and
            flex is where your target disappears.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2"
            style={{ gap: 28, marginBottom: 40 }}
          >
            {POINTS.map((p) => (
              <div
                key={p.t}
                style={{ borderLeft: "1px solid #B8452F", paddingLeft: 16 }}
              >
                <div
                  className="font-sans font-semibold"
                  style={{
                    fontSize: 17,
                    color: "#F3F1E8",
                    marginBottom: 6,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p.t}
                </div>
                <div style={{ fontSize: 13, color: "#888", lineHeight: 1.55 }}>
                  {p.d}
                </div>
              </div>
            ))}
          </div>
          <Link href="/about#why-carbon-fiber">
            <Button variant="outlineOnDark">
              Read the engineering deep-dive <Icon name="arrowR" size={12} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
