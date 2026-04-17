"use client";

import { ReactNode, useState } from "react";
import { Icon } from "@/components/ui/Icon";

interface FilterGroupProps {
  title: string;
  children: ReactNode;
  initiallyOpen?: boolean;
}

export function FilterGroup({ title, children, initiallyOpen = true }: FilterGroupProps) {
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <div
      className="border-b border-border"
      style={{ marginBottom: 24, paddingBottom: 20 }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-transparent border-none cursor-pointer text-left"
        style={{ marginBottom: open ? 14 : 0 }}
      >
        <div
          className="font-sans font-semibold uppercase text-text text-[12px]"
          style={{ letterSpacing: "0.1em" }}
        >
          {title}
        </div>
        <Icon name={open ? "minus" : "plus"} size={14} color="#6A6B73" />
      </button>
      {open && <div className="flex flex-col gap-2">{children}</div>}
    </div>
  );
}
