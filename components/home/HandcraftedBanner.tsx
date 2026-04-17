import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

const STATS = [
  { n: "Since 2018", label: "In business" },
  { n: "46 SKUs", label: "Across 14 models" },
  { n: "3–5 days", label: "Standard build time" },
];

export function HandcraftedBanner() {
  return (
    <section
      className="relative overflow-hidden text-bg"
      style={{ background: "#0F1018", padding: "120px 24px" }}
    >
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-20 items-center"
        style={{ maxWidth: 1440 }}
      >
        <div>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#B8452F",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — 06 / The shop
          </div>
          <h2
            className="font-sans font-bold text-balance"
            style={{
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.02,
              marginBottom: 24,
            }}
          >
            Hand-assembled
            <br />
            in Norman, Oklahoma.
          </h2>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.65,
              color: "#CDCBBF",
              maxWidth: 560,
              marginBottom: 32,
            }}
          >
            Every shaft is built to order, measured, torqued, and inspected by Steve himself. No
            factory line. No contract assemblers. No mystery stock. If it ships from us,
            Steve&apos;s hands were on it.
          </p>
          <div
            className="flex flex-wrap"
            style={{ gap: 36, marginBottom: 40 }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="font-sans font-light"
                  style={{
                    fontSize: 28,
                    letterSpacing: "-0.02em",
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
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <Link href="/about">
            <Button variant="onDark">
              Our story <Icon name="arrowR" size={12} />
            </Button>
          </Link>
        </div>
        {/* Shop-photo placeholder */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "4/5",
            background: "#14151E",
            border: "1px solid #1E1F28",
          }}
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                "repeating-linear-gradient(135deg, #181A26 0 14px, #14151E 14px 28px)",
            }}
          />
          <div
            className="absolute inset-5 flex items-center justify-center text-center"
            style={{ border: "1px dashed #2A2C38" }}
          >
            <div
              className="font-mono text-[11px]"
              style={{
                color: "#555",
                letterSpacing: "0.15em",
                lineHeight: 1.6,
              }}
            >
              [ PHOTO ]
              <br />
              STEVE IN THE SHOP
              <br />
              WORKING ON A CF SHAFT
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
