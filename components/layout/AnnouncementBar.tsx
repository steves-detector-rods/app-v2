"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Free US shipping on orders over $149",
  "Hand-assembled in Norman, Oklahoma",
  "Custom lengths & builds — every shaft, every detector",
];

export function AnnouncementBar() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % MESSAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="text-center border-b border-ink-line font-mono"
      style={{
        background: "#08080C",
        color: "#D7D4C5",
        fontSize: 12,
        padding: "9px 20px",
        letterSpacing: "0.06em",
      }}
      role="status"
      aria-live="polite"
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
        <span
          style={{
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#B8452F",
          }}
          aria-hidden
        />
        {MESSAGES[idx]}
      </span>
    </div>
  );
}
