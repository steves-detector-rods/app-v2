"use client";

import { useState, type ReactNode } from "react";
import { Icon } from "@/components/ui/Icon";

export interface AccordionItem {
  id: string;
  question: string;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  initiallyOpen?: string | null;
}

export function Accordion({ items, initiallyOpen = null }: AccordionProps) {
  const [open, setOpen] = useState<string | null>(initiallyOpen);

  return (
    <div className="border-t border-border">
      {items.map((item) => {
        const isOpen = open === item.id;
        return (
          <div
            key={item.id}
            className="border-b border-border"
          >
            <button
              onClick={() => setOpen(isOpen ? null : item.id)}
              aria-expanded={isOpen}
              className="w-full flex justify-between items-center bg-transparent border-none cursor-pointer text-left"
              style={{ padding: "20px 0" }}
            >
              <span
                className="font-sans font-semibold text-text"
                style={{ fontSize: 16, letterSpacing: "-0.005em" }}
              >
                {item.question}
              </span>
              <Icon name={isOpen ? "minus" : "plus"} size={16} color="#9A3624" />
            </button>
            {isOpen && (
              <div
                className="text-text-muted"
                style={{ padding: "0 0 20px 0", fontSize: 15, lineHeight: 1.65 }}
              >
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
