"use client";

import { ReactNode, useState } from "react";
import clsx from "clsx";

export type TabKey = "description" | "specs" | "engineering" | "reviews";

interface PDPTabsProps {
  reviewCount: number;
  description: ReactNode;
  specs: ReactNode;
  engineering: ReactNode;
  reviews: ReactNode;
}

export function PDPTabs({
  reviewCount,
  description,
  specs,
  engineering,
  reviews,
}: PDPTabsProps) {
  const [tab, setTab] = useState<TabKey>("description");
  const tabs: Array<[TabKey, string]> = [
    ["description", "Description"],
    ["specs", "Specifications"],
    ["engineering", "Design & Engineering"],
    ["reviews", `Reviews (${reviewCount})`],
  ];

  return (
    <>
      <div
        className="flex border-b border-border"
        style={{ gap: 4, marginBottom: 40 }}
        role="tablist"
      >
        {tabs.map(([key, label]) => (
          <button
            key={key}
            role="tab"
            aria-selected={tab === key}
            onClick={() => setTab(key)}
            className={clsx(
              "bg-transparent cursor-pointer font-sans text-[14px]",
              tab === key ? "font-semibold text-text" : "font-medium text-text-muted"
            )}
            style={{
              border: "none",
              padding: "16px 24px",
              borderBottom: tab === key ? "2px solid #B8452F" : "2px solid transparent",
              marginBottom: -1,
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {tab === "description" && description}
      {tab === "specs" && specs}
      {tab === "engineering" && engineering}
      {tab === "reviews" && reviews}
    </>
  );
}
