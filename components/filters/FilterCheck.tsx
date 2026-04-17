"use client";

import { Icon } from "@/components/ui/Icon";

interface FilterCheckProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}

export function FilterCheck({ label, count, checked, onChange }: FilterCheckProps) {
  return (
    <label
      className="flex items-center gap-2.5 cursor-pointer text-[13px] text-text"
      style={{ padding: "3px 0" }}
    >
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          width: 16,
          height: 16,
          border: checked ? "1px solid #B8452F" : "1px solid #E3E1D6",
          background: checked ? "#B8452F" : "transparent",
        }}
      >
        {checked && <Icon name="check" size={10} color="#0A0B10" />}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && (
        <span className="font-mono text-[11px] text-text-muted">{count}</span>
      )}
    </label>
  );
}
