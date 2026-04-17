"use client";

import type { CSSProperties, ReactNode } from "react";
import clsx from "clsx";
import type { Product } from "@/types/product";
import { productToSnipcartAttrs, type SnipcartSelection } from "@/lib/snipcart";

interface SnipcartAddButtonProps {
  product: Product;
  selection?: SnipcartSelection;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  variant?: "primary" | "secondary";
  small?: boolean;
  /** Stop propagation so clicking Add inside a linked ProductCard doesn't navigate. */
  stopPropagation?: boolean;
}

export function SnipcartAddButton({
  product,
  selection,
  children,
  className,
  style,
  variant = "primary",
  small = false,
  stopPropagation = false,
}: SnipcartAddButtonProps) {
  const sel: SnipcartSelection =
    selection ?? { color: product.colors[0], length: "standard", qty: 1 };
  const attrs = productToSnipcartAttrs(product, sel);

  const variantStyle =
    variant === "primary"
      ? { background: "#B8452F", color: "#0A0B10", border: "1px solid #B8452F" }
      : { background: "transparent", color: "#14151E", border: "1px solid #E3E1D6" };

  return (
    <button
      type="button"
      onClick={stopPropagation ? (e) => e.stopPropagation() : undefined}
      className={clsx(
        "snipcart-add-item inline-flex items-center justify-center gap-2 font-semibold uppercase font-sans cursor-pointer",
        small ? "text-[12px]" : "text-[13px]",
        className
      )}
      style={{
        padding: small ? "8px 14px" : "14px 22px",
        letterSpacing: "0.08em",
        ...variantStyle,
        ...style,
      }}
      {...(attrs as Record<string, string>)}
    >
      {children}
    </button>
  );
}
