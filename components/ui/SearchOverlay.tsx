"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useCart } from "@/components/cart/CartProvider";
import { search } from "@/lib/search";
import { Icon } from "@/components/ui/Icon";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";

export function SearchOverlay() {
  const { searchOpen, closeSearch, openSearch } = useCart();
  const [q, setQ] = useState("");
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => search(q, 6), [q]);

  // Wait for client mount before creating the portal. This prevents both
  // SSR/CSR hydration mismatches *and* the `insertBefore` crash caused by
  // third-party scripts (Snipcart, browser extensions) mutating the body DOM
  // around us. Portaling straight to document.body sidesteps React's sibling
  // bookkeeping in the CartProvider subtree.
  useEffect(() => {
    setMounted(true);
  }, []);

  // ⌘K / Ctrl+K to open, Esc to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape" && searchOpen) {
        closeSearch();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [searchOpen, openSearch, closeSearch]);

  // Focus input when overlay opens
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    } else {
      setQ("");
    }
  }, [searchOpen]);

  if (!searchOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0"
      style={{
        background: "rgba(10,11,16,0.93)",
        zIndex: 150,
        padding: "80px 24px",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      <div className="mx-auto" style={{ maxWidth: 720 }}>
        <div className="flex justify-between" style={{ marginBottom: 24 }}>
          <div
            className="font-mono uppercase"
            style={{ fontSize: 11, color: "#888", letterSpacing: "0.2em" }}
          >
            SEARCH
          </div>
          <button
            onClick={closeSearch}
            aria-label="Close search"
            className="bg-transparent border-none cursor-pointer"
            style={{ color: "#F3F1E8" }}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search shafts, detectors, SKUs…"
          className="w-full bg-transparent border-none outline-none font-sans"
          style={{
            borderBottom: "2px solid #B8452F",
            color: "#F3F1E8",
            fontSize: 32,
            padding: "16px 0",
            fontWeight: 300,
          }}
        />
        {results.length > 0 && (
          <div
            className="border border-ink-line"
            style={{ marginTop: 32, background: "#0F1018" }}
          >
            {results.map(({ product: p }) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                onClick={() => {
                  closeSearch();
                  setQ("");
                }}
                prefetch={false}
                className="flex items-center gap-3.5 cursor-pointer border-b border-ink-line"
                style={{ padding: 16 }}
              >
                <div style={{ width: 48, height: 48 }}>
                  <WeavePlaceholder color={p.colors[0]} aspect="1/1" />
                </div>
                <div className="flex-1">
                  <div
                    className="font-semibold"
                    style={{ fontSize: 14, color: "#F3F1E8" }}
                  >
                    {p.shortName}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: 11,
                      color: "#888",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {p.sku} · From ${p.priceFrom}
                  </div>
                </div>
                <Icon name="arrowR" size={14} color="#888" />
              </Link>
            ))}
          </div>
        )}
        {q.length > 1 && results.length === 0 && (
          <div
            className="mt-8 font-mono text-center"
            style={{ color: "#888", fontSize: 13, letterSpacing: "0.04em" }}
          >
            No matches for <span style={{ color: "#F3F1E8" }}>&ldquo;{q}&rdquo;</span>. Try a
            detector model or SKU.
          </div>
        )}
        {q.length <= 1 && (
          <div
            className="mt-8 font-mono"
            style={{ color: "#666", fontSize: 12, letterSpacing: "0.1em" }}
          >
            TRY: equinox · manticore · glass-fiber · scoop · tall man · eq.cs-01
          </div>
        )}
        <div
          className="mt-10 font-mono text-center"
          style={{ color: "#555", fontSize: 10, letterSpacing: "0.15em" }}
        >
          ⌘K to open · ESC to close
        </div>
      </div>
    </div>,
    document.body
  );
}
