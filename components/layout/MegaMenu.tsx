"use client";

import Link from "next/link";
import { BRANDS, MODELS_BY_BRAND } from "@/lib/compatibility";
import { BrandMark } from "@/components/ui/BrandMark";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";

interface MegaMenuProps {
  kind: "detector" | "products";
  onNavigate: () => void;
}

export function MegaMenu({ kind, onNavigate }: MegaMenuProps) {
  return (
    <div
      className="absolute inset-x-0 border-t border-b border-ink-line"
      style={{ top: "100%", background: "#0F1018", zIndex: 49 }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "32px 24px" }}>
        {kind === "detector" ? (
          <MegaDetector onNavigate={onNavigate} />
        ) : (
          <MegaProducts onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
}

function MegaDetector({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-4 gap-10">
      {BRANDS.map((b) => (
        <div key={b.slug}>
          <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-ink-line-soft">
            <BrandMark brand={b.slug} size={32} />
            <div>
              <div className="text-bg font-semibold text-[14px]">{b.name}</div>
              <div
                className="font-mono text-[10px] uppercase"
                style={{ color: "#666", letterSpacing: "0.1em" }}
              >
                {b.count} PRODUCTS
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            {MODELS_BY_BRAND[b.slug].map((m) => (
              <Link
                key={m.slug}
                href={`/detectors/${b.slug}/${m.slug}`}
                onClick={onNavigate}
                prefetch={false}
                className="text-[13px] py-[3px] flex justify-between hover:text-bg"
                style={{ color: "#CDCBBF" }}
              >
                <span>{m.name}</span>
                <span
                  className="font-mono text-[11px]"
                  style={{ color: "#555" }}
                >
                  {m.count}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ProductCat {
  slug: string;
  name: string;
  desc: string;
  href: string;
}

const CATS: ProductCat[] = [
  {
    slug: "complete-shaft",
    name: "Complete Shaft Systems",
    desc: "Full replacement shafts",
    href: "/products?type=complete-shaft",
  },
  {
    slug: "lower-rod",
    name: "Lower Rods",
    desc: "Carbon-fiber, single-piece",
    href: "/products?type=lower-rod",
  },
  {
    slug: "two-piece",
    name: "Two-Piece Lowers",
    desc: "Collapsible, travel-ready",
    href: "/products?type=two-piece",
  },
  {
    slug: "scoop-handle",
    name: "Sand Scoop Handles",
    desc: "Carbon handles for 8 scoop brands",
    href: "/sand-scoop-handles",
  },
  {
    slug: "accessory",
    name: "Accessories",
    desc: "Cuffs, counterweights, mounts",
    href: "/products?type=accessory",
  },
  {
    slug: "glass-fiber",
    name: "Glass-Fiber (Non-Conductive)",
    desc: "For saltwater & sensitive machines",
    href: "/products?material=glass-fiber",
  },
];

function MegaProducts({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-3 gap-5">
      {CATS.map((c) => (
        <Link
          key={c.slug}
          href={c.href}
          onClick={onNavigate}
          prefetch={false}
          className="flex gap-4 p-4 border border-ink-line-soft hover:border-accent transition-colors"
          style={{ background: "#141520" }}
        >
          <div style={{ width: 64, height: 64, flexShrink: 0 }}>
            <WeavePlaceholder color="black" aspect="1/1" />
          </div>
          <div>
            <div className="text-bg font-semibold text-[14px] mb-1">{c.name}</div>
            <div className="text-[12px]" style={{ color: "#888" }}>
              {c.desc}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
