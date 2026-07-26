"use client";

import Link from "next/link";
import { useState } from "react";
import { BRANDS, MODELS_BY_BRAND } from "@/lib/compatibility";
import { Icon } from "@/components/ui/Icon";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const [brandsOpen, setBrandsOpen] = useState(false);
  const [expandedBrand, setExpandedBrand] = useState<string | null>(null);

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 lg:hidden transition-opacity duration-200"
        style={{
          background: "#000",
          opacity: open ? 0.5 : 0,
          visibility: open ? "visible" : "hidden",
          zIndex: 80,
        }}
      />
      <div
        className="fixed inset-y-0 right-0 flex flex-col lg:hidden transition-transform duration-250 ease-out text-bg"
        style={{
          width: 340,
          maxWidth: "100vw",
          background: "#0A0B10",
          transform: open ? "translateX(0)" : "translateX(100%)",
          zIndex: 90,
          boxShadow: "-20px 0 60px -20px rgba(0,0,0,0.3)",
        }}
      >
        <div
          className="flex justify-between items-center border-b border-ink-line"
          style={{ padding: "20px 24px" }}
        >
          <div className="font-mono text-[11px] tracking-eyebrow uppercase" style={{ color: "#888" }}>
            Menu
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="bg-transparent border-none cursor-pointer text-bg"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto" style={{ padding: "12px 0" }}>
          <DrawerLink href="/find-your-shaft" onClose={onClose} accent>
            Find Your Shaft
          </DrawerLink>
          <DrawerRow
            label="Shop by Detector"
            open={brandsOpen}
            onToggle={() => setBrandsOpen(!brandsOpen)}
          />
          {brandsOpen && (
            <div style={{ paddingLeft: 18 }}>
              {BRANDS.map((b) => (
                <div key={b.slug}>
                  <DrawerRow
                    label={b.name}
                    sublabel={`${b.count} products`}
                    open={expandedBrand === b.slug}
                    onToggle={() =>
                      setExpandedBrand(expandedBrand === b.slug ? null : b.slug)
                    }
                    small
                  />
                  {expandedBrand === b.slug && (
                    <div style={{ paddingLeft: 18, paddingBottom: 8 }}>
                      {MODELS_BY_BRAND[b.slug].map((m) => (
                        <DrawerLink
                          key={m.slug}
                          href={`/detectors/${b.slug}/${m.slug}`}
                          onClose={onClose}
                          small
                        >
                          {m.name}
                        </DrawerLink>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          <DrawerLink href="/products" onClose={onClose}>
            All Products
          </DrawerLink>
          <DrawerLink href="/carbonpro" onClose={onClose}>
            CarbonPro
          </DrawerLink>
          <DrawerLink href="/about" onClose={onClose}>
            About
          </DrawerLink>
          <DrawerLink href="/blog" onClose={onClose}>
            Blog
          </DrawerLink>
          <DrawerLink href="/faq" onClose={onClose}>
            FAQ
          </DrawerLink>
          <DrawerLink href="/contact" onClose={onClose}>
            Contact
          </DrawerLink>
        </nav>
      </div>
    </>
  );
}

function DrawerLink({
  href,
  onClose,
  children,
  accent,
  small,
}: {
  href: string;
  onClose: () => void;
  children: React.ReactNode;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <Link
      href={href}
      prefetch={false}
      onClick={onClose}
      className="block border-b border-ink-line-soft"
      style={{
        color: accent ? "#B8452F" : "#CDCBBF",
        padding: small ? "10px 24px" : "14px 24px",
        fontSize: small ? 13 : 14,
        fontWeight: accent ? 600 : 500,
        letterSpacing: accent ? "0.08em" : "normal",
        textTransform: accent ? "uppercase" : "none",
      }}
    >
      {children}
    </Link>
  );
}

function DrawerRow({
  label,
  sublabel,
  open,
  onToggle,
  small,
}: {
  label: string;
  sublabel?: string;
  open: boolean;
  onToggle: () => void;
  small?: boolean;
}) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between bg-transparent border-none border-b border-ink-line-soft cursor-pointer text-left text-bg"
      style={{
        padding: small ? "10px 24px" : "14px 24px",
        fontSize: small ? 13 : 14,
        fontWeight: 500,
      }}
    >
      <span>
        {label}
        {sublabel && (
          <span className="ml-2 font-mono text-[10px]" style={{ color: "#666" }}>
            {sublabel.toUpperCase()}
          </span>
        )}
      </span>
      <Icon name="chev" size={14} color={open ? "#B8452F" : "#888"} />
    </button>
  );
}
