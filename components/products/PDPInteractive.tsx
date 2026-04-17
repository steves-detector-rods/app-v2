"use client";

import { useState } from "react";
import Link from "next/link";
import type { Product, ColorSlug } from "@/types/product";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { AvailDot } from "@/components/ui/AvailDot";
import { Stars } from "@/components/ui/Stars";
import { CompatTag } from "@/components/ui/CompatTag";
import { Badge } from "@/components/ui/Badge";
import { ImageGallery } from "@/components/products/ImageGallery";
import { LengthOption } from "@/components/products/LengthOption";
import { SnipcartAddButton } from "@/components/products/SnipcartAddButton";
import { computeDisplayPrice } from "@/lib/snipcart";

interface PDPInteractiveProps {
  product: Product;
}

export function PDPInteractive({ product: p }: PDPInteractiveProps) {
  const [color, setColor] = useState<ColorSlug>(p.colors[0]);
  const [length, setLength] = useState<"standard" | "tall-man">("standard");
  const [qty, setQty] = useState(1);
  const [customLen, setCustomLen] = useState("");

  const selection = { color, length, customLen, qty };
  const unitPrice = computeDisplayPrice(p, { ...selection, qty: 1 });
  const lineTotal = computeDisplayPrice(p, selection);

  return (
    <>
      {/* Left column — gallery */}
      <div>
        <ImageGallery sku={p.sku} color={color} showGrip={p.type === "scoop-handle"} />
      </div>

      {/* Right column — purchase block */}
      <div>
        <div className="flex gap-2 flex-wrap mb-4">
          {p.compat.map((c, i) => (
            <CompatTag key={i}>{c.name}</CompatTag>
          ))}
          {p.material === "glass-fiber" && <CompatTag>Glass-fiber</CompatTag>}
          {p.badge && (
            <Badge variant={p.badge === "CarbonPro" ? "carbonpro" : "default"}>
              {p.badge}
            </Badge>
          )}
        </div>

        <h1
          className="font-sans font-bold text-text text-balance"
          style={{
            fontSize: 36,
            letterSpacing: "-0.02em",
            lineHeight: 1.15,
            marginBottom: 12,
          }}
        >
          {p.name}
        </h1>

        <div className="flex items-center gap-3 mb-6">
          <Stars rating={p.rating} size={14} />
          <span className="text-text-muted text-[13px]">
            {p.rating} · <span style={{ color: "#9A3624" }}>{p.reviews} reviews</span>
          </span>
          <span
            className="font-mono text-text-muted text-[12px]"
            style={{ letterSpacing: "0.08em" }}
          >
            · SKU {p.sku}
          </span>
        </div>

        <div className="mb-7">
          <div
            className="font-sans font-bold text-text"
            style={{ fontSize: 42, letterSpacing: "-0.02em", lineHeight: 1 }}
          >
            ${unitPrice}
            <span
              className="font-normal text-text-muted"
              style={{ fontSize: 14, marginLeft: 8 }}
            >
              + shipping
            </span>
          </div>
          <div
            className="flex items-center gap-2 text-text-muted"
            style={{ fontSize: 13, marginTop: 6 }}
          >
            <AvailDot inStock={p.inStock} />
            {p.availabilityNote ??
              (p.inStock ? "In Stock — Ships in 3–5 business days" : "Made to order — 4–8 weeks")}
          </div>
        </div>

        {p.blurb && (
          <p
            className="text-text-muted border-b border-border mb-8"
            style={{ fontSize: 15, lineHeight: 1.6, paddingBottom: 28 }}
          >
            {p.blurb}
          </p>
        )}

        {/* Color */}
        {p.colors.length > 1 && (
          <div className="mb-6">
            <div className="flex justify-between mb-2.5">
              <label
                className="font-semibold uppercase text-text"
                style={{ fontSize: 12, letterSpacing: "0.1em" }}
              >
                Color
              </label>
              <span className="text-text-muted text-[12px] capitalize">
                {color}
                {color !== "black" &&
                  color !== "white" &&
                  p.priceTo > p.priceFrom &&
                  ` · +$${p.priceTo - p.priceFrom}`}
              </span>
            </div>
            <div className="flex gap-2.5">
              {p.colors.map((c) => (
                <ColorSwatch
                  key={c}
                  color={c}
                  selected={color === c}
                  onClick={() => setColor(c)}
                  size={36}
                />
              ))}
            </div>
          </div>
        )}

        {/* Length */}
        {p.customLengthAvailable && (
          <div className="mb-6">
            <label
              className="block font-semibold uppercase text-text mb-2.5"
              style={{ fontSize: 12, letterSpacing: "0.1em" }}
            >
              Length
            </label>
            <div className="grid grid-cols-2 gap-2">
              <LengthOption
                selected={length === "standard"}
                onClick={() => setLength("standard")}
                title="Standard"
                sub="Factory length"
              />
              <LengthOption
                selected={length === "tall-man"}
                onClick={() => setLength("tall-man")}
                title="Tall Man"
                sub={`Custom · +$${p.customLengthSurcharge ?? 5}`}
              />
            </div>
            {length === "tall-man" && (
              <input
                value={customLen}
                onChange={(e) => setCustomLen(e.target.value)}
                placeholder="Desired length in inches (e.g. 28.5)"
                className="w-full border border-border bg-surface"
                style={{
                  padding: "12px 14px",
                  fontSize: 14,
                  marginTop: 8,
                }}
              />
            )}
          </div>
        )}

        {/* Qty + Add */}
        <div className="flex gap-2.5 mb-5">
          <div className="flex border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="bg-transparent border-none cursor-pointer text-text"
              style={{ width: 44, height: 52 }}
              aria-label="Decrease quantity"
            >
              <Icon name="minus" size={14} />
            </button>
            <div
              className="flex items-center justify-center font-sans font-semibold"
              style={{ width: 48, fontSize: 15 }}
            >
              {qty}
            </div>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="bg-transparent border-none cursor-pointer text-text"
              style={{ width: 44, height: 52 }}
              aria-label="Increase quantity"
            >
              <Icon name="plus" size={14} />
            </button>
          </div>
          <SnipcartAddButton
            product={p}
            selection={selection}
            className="flex-1"
            style={{ height: 52, padding: "0 22px" }}
          >
            Add to Cart — ${lineTotal} <Icon name="arrowR" size={14} />
          </SnipcartAddButton>
        </div>

        <div
          className="text-center text-text-muted mb-7"
          style={{ fontSize: 12 }}
        >
          Or{" "}
          <Link
            href={`/contact?product=${p.slug}`}
            style={{ color: "#9A3624", textDecoration: "underline" }}
          >
            request a fully custom build →
          </Link>
        </div>

        {/* Trust row */}
        <div
          className="grid grid-cols-3 gap-3 bg-surface-alt border border-border"
          style={{ padding: 20 }}
        >
          <TrustItem icon="tool" label="Hand-assembled" sub="Norman, OK" />
          <TrustItem icon="truck" label="Free shipping" sub="Orders over $149" />
          <TrustItem icon="shield" label="Lifetime warranty" sub="On the carbon" />
        </div>
      </div>
    </>
  );
}

function TrustItem({
  icon,
  label,
  sub,
}: {
  icon: "tool" | "truck" | "shield";
  label: string;
  sub: string;
}) {
  return (
    <div className="flex gap-2.5 items-start">
      <Icon name={icon} size={20} color="#9A3624" />
      <div>
        <div className="font-semibold text-text" style={{ fontSize: 12 }}>
          {label}
        </div>
        <div className="text-text-muted" style={{ fontSize: 11 }}>
          {sub}
        </div>
      </div>
    </div>
  );
}
