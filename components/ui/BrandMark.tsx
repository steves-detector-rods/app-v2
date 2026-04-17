import type { BrandSlug } from "@/types/product";

const LETTERS: Record<BrandSlug, string> = {
  minelab: "M",
  garrett: "G",
  xp: "XP",
  tarsacci: "T",
};

interface BrandMarkProps {
  brand: BrandSlug;
  size?: number;
}

export function BrandMark({ brand, size = 44 }: BrandMarkProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid rgba(200,150,62,0.27)",
        color: "#B8452F",
        fontWeight: 600,
        fontSize: size * 0.38,
        letterSpacing: "-0.02em",
        borderRadius: 2,
        background: "#11121A",
      }}
      aria-label={`${brand} brand mark`}
    >
      {LETTERS[brand]}
    </div>
  );
}
