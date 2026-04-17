"use client";

import { ButtonHTMLAttributes } from "react";
import type { ColorSlug } from "@/types/product";

const BG: Record<ColorSlug, string> = {
  black: "#111",
  red: "#7A1C1F",
  blue: "#1F3B6B",
  green: "#1F3A22",
  camo: "repeating-linear-gradient(45deg, #2A3018 0 6px, #3C4424 6px 12px, #5D4B29 12px 18px)",
  white: "#EAE8DE",
};

interface ColorSwatchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  color: ColorSlug;
  selected?: boolean;
  size?: number;
}

export function ColorSwatch({
  color,
  selected = false,
  size = 22,
  ...rest
}: ColorSwatchProps) {
  return (
    <button
      {...rest}
      type="button"
      aria-label={color}
      aria-pressed={selected}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: BG[color],
        border: selected ? "2px solid #B8452F" : "1px solid #33343F",
        outline: selected ? "1px solid #0F0F17" : "none",
        outlineOffset: selected ? "-4px" : 0,
        cursor: "pointer",
        padding: 0,
        boxShadow: selected ? "0 0 0 1px #B8452F" : "none",
      }}
    />
  );
}
