import type { Metadata } from "next";
import retailers from "@/data/retailers.json";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";

export const metadata: Metadata = {
  title: "About — One maker, 46 SKUs, built by hand",
  description:
    "Steve's Detector Rods started in a one-car garage in Norman, Oklahoma in 2018. Every shaft is still cut, fit, torqued, and inspected by Steve before it ships.",
};

const STATS: Array<[string, string]> = [
  ["2018", "Company founded"],
  ["14", "Detector models covered"],
  ["46", "Total SKUs"],
  ["8+", "Scoop brands supported"],
];

const RETAILERS = retailers as Array<{ name: string; url: string; blurb: string }>;

export default function AboutPage() {
  return (
    <div className="bg-surface">
      {/* Header */}
      <div
        className="border-b border-border"
        style={{ padding: "60px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#9A3624",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — About
          </div>
          <h1
            className="font-sans font-bold text-text"
            style={{
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            One maker. 46 SKUs. Built by hand.
          </h1>
        </div>
      </div>

      {/* Story + stats + photo */}
      <section style={{ padding: "60px 24px 100px" }}>
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-[1.3fr_1fr]"
          style={{ maxWidth: 1000, gap: 60, alignItems: "start" }}
        >
          <div>
            <p
              className="text-text"
              style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 20 }}
            >
              Steve&apos;s Detector Rods started in a one-car garage in Norman, Oklahoma in 2018.
              A detectorist, frustrated with factory shafts that flexed under a heavy coil,
              started building his own from 3K carbon fiber pulled from the racing-bike
              industry.
            </p>
            <p
              className="text-text-muted"
              style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}
            >
              Eight years later, the shop is still a one-maker operation. Every shaft, every
              lower, every scoop handle is cut, fit, torqued, and inspected by Steve before it
              ships. No contract assemblers. No overseas line. No mystery stock.
            </p>
            <p
              className="text-text-muted"
              style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}
            >
              We&apos;ve grown to 46 SKUs across 14 detector models because buyers kept asking —
              &ldquo;do you build for the CTX?&rdquo; &ldquo;can you do a Tall Man?&rdquo;
              &ldquo;what about the Tarsacci?&rdquo; We said yes, then we figured it out.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {STATS.map(([n, l]) => (
                <div
                  key={l}
                  style={{ borderLeft: "2px solid #B8452F", paddingLeft: 16 }}
                >
                  <div
                    className="font-sans font-light text-text"
                    style={{ fontSize: 40, letterSpacing: "-0.02em" }}
                  >
                    {n}
                  </div>
                  <div
                    className="font-mono text-text-muted uppercase"
                    style={{ fontSize: 12, letterSpacing: "0.1em" }}
                  >
                    {l}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className="relative overflow-hidden border border-border"
            style={{ aspectRatio: "4/5", background: "#14151E" }}
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
                className="font-mono"
                style={{
                  fontSize: 11,
                  color: "#555",
                  letterSpacing: "0.15em",
                  lineHeight: 1.6,
                }}
              >
                [ PHOTO ]<br />
                STEVE, THE SHOP<br />
                WORKBENCH
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Carbon Fiber — anchor target */}
      <section
        id="why-carbon-fiber"
        className="bg-surface-alt"
        style={{ padding: "100px 24px" }}
      >
        <div
          className="mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr]"
          style={{ maxWidth: 1100, gap: 60, alignItems: "center" }}
        >
          <div style={{ aspectRatio: "4/5" }}>
            <WeavePlaceholder color="black" aspect="4/5" label="3K TWILL · 45° BIAS" />
          </div>
          <div>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 14,
              }}
            >
              — The material
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: 40,
                letterSpacing: "-0.02em",
                lineHeight: 1.05,
                marginBottom: 24,
              }}
            >
              Why carbon fiber?
            </h2>
            <p
              className="text-text-muted"
              style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}
            >
              3K carbon fiber in a twill weave is stiffer pound-for-pound than 6061 aluminum
              and has near-zero thermal expansion. Factory shafts are built to a price, not a
              standard. Aluminum flexes under load. Plastic locks loosen and slip.
            </p>
            <p
              className="text-text-muted"
              style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}
            >
              We use 3K carbon-fiber twill, injection-molded nylon cam locks, and stainless
              hardware — because the coil is where the signal lives, and flex is where your
              target disappears. A typical complete shaft drops from 14oz factory to 8oz in
              our builds, while eliminating the wobble that kills detection depth.
            </p>
            <p
              className="text-text-muted"
              style={{ fontSize: 15, lineHeight: 1.7 }}
            >
              For the serious detectorist, we also offer glass-fiber lowers — completely
              non-conductive, which eliminates the phantom signals aluminum and carbon-fiber
              rods can introduce in saltwater or over mineralized soil.
            </p>
          </div>
        </div>
      </section>

      {/* Where to Buy */}
      <section style={{ padding: "100px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div style={{ marginBottom: 40 }}>
            <div
              className="font-mono text-[11px] uppercase"
              style={{
                color: "#9A3624",
                letterSpacing: "0.25em",
                marginBottom: 14,
              }}
            >
              — Authorized retailers
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: 36,
                letterSpacing: "-0.02em",
              }}
            >
              Also available at these shops.
            </h2>
            <p
              className="text-text-muted"
              style={{ fontSize: 15, maxWidth: 640, marginTop: 12, lineHeight: 1.6 }}
            >
              You can buy direct here or through any of our authorized retailers. Direct
              orders get custom-build options; retailers stock our standard configurations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {RETAILERS.map((r) => (
              <a
                key={r.name}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift bg-surface border border-border block"
                style={{ padding: 24 }}
              >
                <div
                  className="font-sans font-semibold text-text"
                  style={{ fontSize: 17, marginBottom: 6, letterSpacing: "-0.005em" }}
                >
                  {r.name} <span aria-hidden>↗</span>
                </div>
                <div className="text-text-muted" style={{ fontSize: 13, lineHeight: 1.6 }}>
                  {r.blurb}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
