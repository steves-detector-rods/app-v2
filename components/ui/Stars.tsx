interface StarsProps {
  rating: number;
  size?: number;
  color?: string;
  className?: string;
}

export function Stars({ rating, size = 12, color = "#B8452F", className }: StarsProps) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        gap: 1,
        color,
        fontSize: size,
        lineHeight: 1,
      }}
      aria-label={`Rated ${rating} out of 5`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const filled = i < full;
        const isHalf = i === full && half;
        const opacity = filled ? 1 : isHalf ? 0.5 : 0.3;
        return (
          <span key={i} style={{ opacity }} aria-hidden>
            {filled || isHalf ? "★" : "☆"}
          </span>
        );
      })}
    </span>
  );
}
