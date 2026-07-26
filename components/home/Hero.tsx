import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const STATS = [
  { n: "14", label: "DETECTOR MODELS" },
  { n: "46", label: "SKUs IN THE SHOP" },
  { n: "4.9★", label: "AVG. 800+ REVIEWS" },
];

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b border-ink-line text-bg"
      style={{
        background: "#0A0B10",
        minHeight: 640,
      }}
    >
      {/* Carbon-fiber weave background */}
      <div className="absolute inset-0">
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{ opacity: 0.22 }}
        >
          <defs>
            <pattern
              id="hero-twill"
              patternUnits="userSpaceOnUse"
              width="10"
              height="10"
              patternTransform="rotate(20)"
            >
              <rect width="10" height="10" fill="#0A0B10" />
              <rect x="0" y="0" width="5" height="5" fill="#2A2C38" />
              <rect x="5" y="5" width="5" height="5" fill="#2A2C38" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-twill)" />
        </svg>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 40%, #1A1E2F 0%, #08080C 70%)",
          }}
        />
        {/* Rotated glowing shaft */}
        <div
          aria-hidden
          className="absolute"
          style={{
            top: "55%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-6deg)",
            width: "90%",
            maxWidth: 1100,
            height: 28,
            borderRadius: 4,
            background:
              "linear-gradient(180deg, #3B3E4F 0%, #0A0B10 35%, #000 50%, #0A0B10 65%, #3B3E4F 100%)",
            boxShadow:
              "0 40px 80px -10px rgba(0,0,0,0.8), 0 0 120px 20px rgba(184,69,47,0.18)",
          }}
        >
          <div
            className="absolute"
            style={{
              left: "62%",
              top: -16,
              width: 50,
              height: 60,
              background: "linear-gradient(180deg, #444 0%, #0a0a0a 100%)",
              borderRadius: 3,
            }}
          />
          <div
            className="absolute"
            style={{
              right: -12,
              top: -4,
              width: 24,
              height: 36,
              background: "#0a0a0a",
              borderRadius: "50%",
            }}
          />
        </div>
      </div>

      {/* Copy */}
      <div
        className="relative mx-auto"
        style={{ maxWidth: 1440, padding: "120px 24px 140px", zIndex: 2 }}
      >
        <div style={{ maxWidth: 820 }}>
          <div
            className="font-mono text-[11px] uppercase mb-5.5"
            style={{ color: "#B8452F", letterSpacing: "0.25em", marginBottom: 22 }}
          >
            — Hand-built since 2018
          </div>
          <h1
            className="font-sans font-bold text-balance mb-6"
            style={{
              fontSize: "clamp(30px, 5vw, 72px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}
          >
            Precision-built
            <br />
            <span style={{ color: "#B8452F" }}>carbon-fiber shafts</span>
            <br />
            <span style={{ color: "#B8452F" }}>&amp; sand scoop handles</span>
            <br />
            for serious detectorists.
          </h1>
          <p
            className="text-pretty"
            style={{
              fontSize: 17,
              lineHeight: 1.6,
              color: "#CDCBBF",
              maxWidth: 560,
              marginBottom: 40,
            }}
          >
            Hand-assembled in Norman, Oklahoma. Compatible with{" "}
            <strong style={{ color: "#F3F1E8" }}>14 detector models</strong> across
            Minelab, Garrett, XP, and Tarsacci — plus custom lengths, counterweight-ready
            builds, and non-conductive glass-fiber options.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/find-your-shaft">
              <Button variant="primary">
                Find Your Shaft <Icon name="arrowR" size={14} />
              </Button>
            </Link>
            <Link href="/products">
              <Button variant="outlineOnDark">Shop All Products</Button>
            </Link>
          </div>
        </div>

        {/* Side stats */}
        <div
          className="absolute hidden lg:flex items-end gap-10"
          style={{ right: 40, bottom: 40 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="text-right">
              <div
                className="font-sans font-light"
                style={{
                  fontSize: 40,
                  color: "#F3F1E8",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                }}
              >
                {s.n}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: 10,
                  color: "#888",
                  letterSpacing: "0.15em",
                  marginTop: 6,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
