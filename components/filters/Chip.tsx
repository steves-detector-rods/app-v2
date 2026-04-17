"use client";

import { Icon } from "@/components/ui/Icon";

interface ChipProps {
  label: string;
  onRemove: () => void;
}

export function Chip({ label, onRemove }: ChipProps) {
  return (
    <button
      onClick={onRemove}
      className="inline-flex items-center gap-2 bg-ink text-bg font-mono uppercase cursor-pointer border-none"
      style={{
        padding: "5px 10px",
        fontSize: 11,
        letterSpacing: "0.05em",
      }}
      aria-label={`Remove filter ${label}`}
    >
      {label}
      <Icon name="close" size={10} color="#F3F1E8" />
    </button>
  );
}
