"use client";

import { useState } from "react";
import Link from "next/link";
import { BRANDS, MODELS_BY_BRAND } from "@/lib/compatibility";
import type { BrandSlug } from "@/types/product";
import { PRODUCTS } from "@/data/products";
import { BrandMark } from "@/components/ui/BrandMark";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductCard } from "@/components/products/ProductCard";

type Step = 1 | 2 | 3;

export function FinderFlow() {
  const [step, setStep] = useState<Step>(1);
  const [brand, setBrand] = useState<BrandSlug | null>(null);
  const [model, setModel] = useState<string | null>(null);

  const currentBrand = brand ? BRANDS.find((b) => b.slug === brand) : null;
  const currentModel =
    brand && model ? MODELS_BY_BRAND[brand].find((m) => m.slug === model) : null;

  const results = PRODUCTS.filter((p) =>
    p.compat.some((c) => c.brand === brand && c.model === model)
  );

  const grouped: Record<string, typeof PRODUCTS> = {};
  for (const p of results) {
    const key =
      p.material === "glass-fiber" ? "Glass-Fiber (Non-Conductive)" : p.typeName + "s";
    (grouped[key] ||= []).push(p);
  }

  const reset = () => {
    setStep(1);
    setBrand(null);
    setModel(null);
  };

  return (
    <div
      className="bg-surface-alt"
      style={{ minHeight: "calc(100vh - 72px)", padding: "60px 24px 120px" }}
    >
      <div className="mx-auto" style={{ maxWidth: 1280 }}>
        {/* Step progress */}
        <div
          className="flex items-center gap-3.5 font-mono uppercase text-text-muted"
          style={{ marginBottom: 40, fontSize: 11, letterSpacing: "0.12em" }}
        >
          <StepDot
            n={1}
            active={step === 1}
            done={step > 1}
            onClick={() => setStep(1)}
          />
          <div
            style={{
              width: 40,
              height: 1,
              background: step > 1 ? "#B8452F" : "#E3E1D6",
            }}
          />
          <StepDot
            n={2}
            active={step === 2}
            done={step > 2}
            onClick={() => (brand ? setStep(2) : null)}
          />
          <div
            style={{
              width: 40,
              height: 1,
              background: step > 2 ? "#B8452F" : "#E3E1D6",
            }}
          />
          <StepDot n={3} active={step === 3} />
          <div className="ml-4 text-text">
            {step === 1
              ? "Choose your brand"
              : step === 2
              ? "Choose your model"
              : "Your matched products"}
          </div>
        </div>

        {step === 1 && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <div
                className="font-mono text-[11px] uppercase"
                style={{
                  color: "#9A3624",
                  letterSpacing: "0.25em",
                  marginBottom: 14,
                }}
              >
                — Find Your Shaft
              </div>
              <h1
                className="font-sans font-bold text-text"
                style={{
                  fontSize: 56,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginBottom: 16,
                }}
              >
                What detector do
                <br />
                you own?
              </h1>
              <p
                className="text-text-muted"
                style={{ fontSize: 16, maxWidth: 560, lineHeight: 1.6 }}
              >
                We build for 14 machines across 4 brands. Pick yours and we&apos;ll show every
                part that fits.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {BRANDS.map((b) => (
                <button
                  key={b.slug}
                  onClick={() => {
                    setBrand(b.slug);
                    setStep(2);
                  }}
                  className="hover-lift flex flex-col gap-6 bg-surface border border-border cursor-pointer text-left"
                  style={{ padding: 40, minHeight: 280 }}
                >
                  <BrandMark brand={b.slug} size={64} />
                  <div className="mt-auto">
                    <div
                      className="font-sans font-semibold text-text mb-1.5"
                      style={{ fontSize: 24, letterSpacing: "-0.01em" }}
                    >
                      {b.name}
                    </div>
                    <div
                      className="font-mono text-[12px] text-text-muted"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {MODELS_BY_BRAND[b.slug].length} MODELS · {b.count} PRODUCTS
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && currentBrand && (
          <div>
            <div style={{ marginBottom: 48 }}>
              <button
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-text-muted text-[13px] mb-4"
              >
                <Icon name="chevL" size={12} /> Back to brand
              </button>
              <div
                className="font-mono text-[11px] uppercase"
                style={{
                  color: "#9A3624",
                  letterSpacing: "0.25em",
                  marginBottom: 14,
                }}
              >
                — {currentBrand.name}
              </div>
              <h1
                className="font-sans font-bold text-text"
                style={{
                  fontSize: 56,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.05,
                  marginBottom: 16,
                }}
              >
                Which {currentBrand.name}
                <br />
                model?
              </h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {MODELS_BY_BRAND[currentBrand.slug].map((m) => (
                <button
                  key={m.slug}
                  onClick={() => {
                    setModel(m.slug);
                    setStep(3);
                  }}
                  className="hover-lift flex justify-between items-center bg-surface border border-border cursor-pointer text-left"
                  style={{ padding: 28 }}
                >
                  <div>
                    <div
                      className="font-sans font-semibold text-text"
                      style={{ fontSize: 18, letterSpacing: "-0.005em" }}
                    >
                      {m.name}
                    </div>
                    <div
                      className="font-mono text-[12px] text-text-muted mt-1"
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {m.count} PRODUCTS
                    </div>
                  </div>
                  <Icon name="arrowR" size={16} color="#9A3624" />
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && currentBrand && currentModel && (
          <div>
            <div
              className="flex flex-wrap justify-between items-end gap-5"
              style={{ marginBottom: 48 }}
            >
              <div>
                <button
                  onClick={() => setStep(2)}
                  className="inline-flex items-center gap-1.5 bg-transparent border-none cursor-pointer text-text-muted text-[13px] mb-4"
                >
                  <Icon name="chevL" size={12} /> Back to models
                </button>
                <div
                  className="font-mono text-[11px] uppercase"
                  style={{
                    color: "#9A3624",
                    letterSpacing: "0.25em",
                    marginBottom: 14,
                  }}
                >
                  — Matched {results.length} products
                </div>
                <h1
                  className="font-sans font-bold text-text"
                  style={{
                    fontSize: 48,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  Built for your {currentBrand.name} {currentModel.name}.
                </h1>
              </div>
              <Button variant="ghost" onClick={reset}>
                Start over
              </Button>
            </div>

            {results.length === 0 ? (
              <div
                className="bg-surface border border-border text-center"
                style={{ padding: 60 }}
              >
                <p className="text-text-muted mb-4">
                  No prebuilt SKUs for this model yet — but we likely can custom-build.
                </p>
                <Link href="/contact">
                  <Button variant="primary">Request a custom build</Button>
                </Link>
              </div>
            ) : (
              <>
                {Object.entries(grouped).map(([category, prods]) => (
                  <div key={category} style={{ marginBottom: 48 }}>
                    <div
                      className="flex justify-between items-baseline border-b border-border"
                      style={{ marginBottom: 20, paddingBottom: 12 }}
                    >
                      <h3
                        className="font-sans font-semibold text-text"
                        style={{ fontSize: 20, letterSpacing: "-0.01em" }}
                      >
                        {category}
                      </h3>
                      <div
                        className="font-mono text-[11px] text-text-muted"
                        style={{ letterSpacing: "0.08em" }}
                      >
                        {prods.length} OPTIONS
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      {prods.map((p) => (
                        <ProductCard key={p.slug} product={p} />
                      ))}
                    </div>
                  </div>
                ))}
                <div
                  className="bg-surface border border-border flex flex-wrap justify-between items-center gap-5"
                  style={{ padding: 36, marginTop: 40 }}
                >
                  <div>
                    <div
                      className="font-sans font-semibold text-text"
                      style={{ fontSize: 18, marginBottom: 4 }}
                    >
                      Don&apos;t see what you need?
                    </div>
                    <div className="text-text-muted text-[14px]">
                      We custom-build for most detectors. Tall Man lengths, unusual colors,
                      counterweight-ready configs.
                    </div>
                  </div>
                  <Link href="/contact">
                    <Button variant="secondary">
                      Request a custom build <Icon name="arrowR" size={12} />
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

interface StepDotProps {
  n: number;
  active?: boolean;
  done?: boolean;
  onClick?: () => void;
}

function StepDot({ n, active, done, onClick }: StepDotProps) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="flex items-center justify-center bg-transparent cursor-pointer font-mono"
      style={{
        width: 26,
        height: 26,
        borderRadius: "50%",
        background: done ? "#B8452F" : active ? "#14151E" : "transparent",
        border: `1px solid ${active || done ? "transparent" : "#E3E1D6"}`,
        color: done ? "#0A0B10" : active ? "#fff" : "#6A6B73",
        fontSize: 11,
        fontWeight: 600,
      }}
      aria-label={`Step ${n}`}
    >
      {done ? "✓" : n}
    </button>
  );
}
