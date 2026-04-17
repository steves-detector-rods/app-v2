"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";
import { Stars } from "@/components/ui/Stars";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { AvailDot } from "@/components/ui/AvailDot";
import { Badge } from "@/components/ui/Badge";
import { CompatTag } from "@/components/ui/CompatTag";
import { Button } from "@/components/ui/Button";
import { SnipcartAddButton } from "@/components/products/SnipcartAddButton";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product: p }: ProductCardProps) {
  const [color, setColor] = useState(p.colors[0]);
  const href = `/products/${p.slug}`;

  const hasOptions = p.colors.length > 1 || p.priceFrom !== p.priceTo;

  return (
    <div className="flex flex-col bg-surface border border-border">
      <Link href={href} prefetch={false} className="block relative">
        <div className="relative aspect-square">
          <WeavePlaceholder
            color={color}
            aspect="1/1"
            showGrip={p.type === "scoop-handle"}
          />
          {p.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant={p.badge === "CarbonPro" ? "carbonpro" : "default"}>
                {p.badge}
              </Badge>
            </div>
          )}
          {p.featured && !p.badge && (
            <div className="absolute top-3 left-3">
              <Badge variant="accent">Bestseller</Badge>
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-2 flex-1" style={{ padding: 18 }}>
        <div className="flex flex-wrap gap-1.5">
          {p.compat.slice(0, 1).map((c, i) => (
            <CompatTag key={i} small>
              {c.name}
            </CompatTag>
          ))}
          {p.material === "glass-fiber" && <CompatTag small>Glass-fiber</CompatTag>}
          {p.type === "scoop-handle" && p.compatText && (
            <CompatTag small>{p.compatText}</CompatTag>
          )}
        </div>

        <Link
          href={href}
          prefetch={false}
          className="font-sans font-semibold text-[15px] text-text leading-[1.3] tracking-[-0.005em]"
          style={{ minHeight: 38 }}
        >
          {p.shortName}
        </Link>

        <div className="flex items-center gap-1.5">
          <Stars rating={p.rating} size={11} />
          <span className="font-mono text-[11px] text-text-muted">({p.reviews})</span>
        </div>

        <div className="flex gap-1.5 mt-0.5">
          {p.colors.map((c) => (
            <ColorSwatch
              key={c}
              color={c}
              selected={color === c}
              onClick={(e) => {
                e.preventDefault();
                setColor(c);
              }}
              size={16}
            />
          ))}
        </div>

        <div
          className="flex justify-between items-center mt-auto"
          style={{ paddingTop: 10 }}
        >
          <div>
            <div className="font-sans font-bold text-[18px] text-text">
              {p.priceFrom === p.priceTo ? `$${p.priceFrom}` : `From $${p.priceFrom}`}
            </div>
            <div
              className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted"
              style={{ letterSpacing: "0.04em" }}
            >
              <AvailDot inStock={p.inStock} />
              {p.inStock ? "IN STOCK" : "MADE TO ORDER"}
            </div>
          </div>
          {hasOptions ? (
            <Link href={href} prefetch={false}>
              <Button variant="secondary" small>
                Options
              </Button>
            </Link>
          ) : (
            <SnipcartAddButton
              product={p}
              selection={{ color, length: "standard", qty: 1 }}
              variant="secondary"
              small
              stopPropagation
            >
              Add
            </SnipcartAddButton>
          )}
        </div>
      </div>
    </div>
  );
}
