import { useId } from "react";
import type { ColorSlug } from "@/types/product";

const COLOR_MAP: Record<ColorSlug, string> = {
  black: "#0D0E14",
  red: "#4A1618",
  blue: "#14223A",
  green: "#17261B",
  camo: "#1F2418",
  white: "#E5E4DC",
};

interface WeavePlaceholderProps {
  color?: ColorSlug;
  tint?: string;
  label?: string;
  aspect?: string;
  showGrip?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function WeavePlaceholder({
  color = "black",
  tint,
  label,
  aspect = "1/1",
  showGrip = false,
  className,
  style,
}: WeavePlaceholderProps) {
  const base = COLOR_MAP[color] || tint || "#13141C";
  const isLight = color === "white";
  const fg = isLight ? "#9A9888" : "#2A2C38";
  const hl = isLight ? "#C9C7B9" : "#3B3E4F";
  // Stable across SSR + hydration; unique per instance.
  // CSS `url(#…)` is picky about `:` chars, so strip them from React's raw id.
  const patternId = `twill-${color}-${useId().replace(/:/g, "")}`;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        aspectRatio: aspect,
        width: "100%",
        background: `radial-gradient(ellipse at 30% 20%, ${hl} 0%, ${base} 55%, #000 140%)`,
        overflow: "hidden",
        borderRadius: 2,
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
          opacity: isLight ? 0.15 : 0.35,
          mixBlendMode: "overlay",
        }}
      >
        <defs>
          <pattern
            id={patternId}
            patternUnits="userSpaceOnUse"
            width="8"
            height="8"
            patternTransform="rotate(20)"
          >
            <rect width="8" height="8" fill={base} />
            <rect x="0" y="0" width="4" height="4" fill={fg} />
            <rect x="4" y="4" width="4" height="4" fill={fg} />
            <rect x="0" y="0" width="1" height="4" fill={hl} opacity="0.6" />
            <rect x="4" y="4" width="1" height="4" fill={hl} opacity="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "78%",
            height: "10%",
            background: `linear-gradient(180deg, ${hl}dd 0%, ${base} 35%, #000 50%, ${base} 65%, ${hl}66 100%)`,
            borderRadius: 4,
            boxShadow: `0 18px 36px -8px rgba(0,0,0,0.6), 0 1px 0 ${hl}55 inset`,
            position: "relative",
          }}
        >
          <svg
            width="100%"
            height="100%"
            style={{ position: "absolute", inset: 0, opacity: 0.7 }}
          >
            <rect width="100%" height="100%" fill={`url(#${patternId})`} />
          </svg>
          <div
            style={{
              position: "absolute",
              left: "62%",
              top: "-60%",
              width: 32,
              height: "220%",
              background: "linear-gradient(180deg, #222 0%, #0a0a0a 100%)",
              borderRadius: 3,
              boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -6,
              top: "-20%",
              width: 14,
              height: "140%",
              background: "#0a0a0a",
              borderRadius: "50%",
            }}
          />
          {showGrip && (
            <div
              style={{
                position: "absolute",
                left: 0,
                top: "-30%",
                width: "20%",
                height: "160%",
                background:
                  "repeating-linear-gradient(45deg, #0c0c0c 0 4px, #1a1a1a 4px 8px)",
                borderRadius: 4,
              }}
            />
          )}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.45) 100%)",
          pointerEvents: "none",
        }}
      />
      {label && (
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 12,
            fontSize: 10,
            letterSpacing: "0.12em",
            fontFamily: "var(--font-mono), ui-monospace, monospace",
            color: "#8a8a95",
            textTransform: "uppercase",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}
