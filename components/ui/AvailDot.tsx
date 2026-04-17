interface AvailDotProps {
  inStock: boolean;
}

export function AvailDot({ inStock }: AvailDotProps) {
  const color = inStock ? "#5BB06B" : "#C89B3C";
  return (
    <span
      aria-hidden
      style={{
        display: "inline-block",
        width: 7,
        height: 7,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 0 2px ${color}22`,
      }}
    />
  );
}
