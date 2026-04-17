"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type {
  BrandSlug,
  ColorSlug,
  Material,
  Product,
  ProductType,
} from "@/types/product";
import { PRODUCTS } from "@/data/products";
import { BRANDS } from "@/lib/compatibility";
import { ProductCard } from "@/components/products/ProductCard";
import { FilterGroup } from "@/components/filters/FilterGroup";
import { FilterCheck } from "@/components/filters/FilterCheck";
import { Chip } from "@/components/filters/Chip";
import { ColorSwatch } from "@/components/ui/ColorSwatch";
import { Button } from "@/components/ui/Button";

const TYPE_OPTIONS: Array<{ slug: ProductType; label: string }> = [
  { slug: "complete-shaft", label: "Complete Shafts" },
  { slug: "upper-shaft", label: "Upper Shafts" },
  { slug: "lower-rod", label: "Lower Rods" },
  { slug: "two-piece", label: "Two-Piece Lowers" },
  { slug: "scoop-handle", label: "Scoop Handles" },
  { slug: "accessory", label: "Accessories" },
];

const COLOR_OPTIONS: ColorSlug[] = ["black", "red", "blue", "green", "camo", "white"];

type Sort = "featured" | "price-asc" | "price-desc" | "rating";

interface ProductBrowserProps {
  /** Pre-applied filters (from route scope: brand / model). These cannot be toggled off. */
  locked?: {
    brand?: BrandSlug;
    model?: string;
  };
  /** Initial filter state sourced from URL searchParams (server-side). */
  initial: {
    brands: BrandSlug[];
    types: ProductType[];
    materials: Material[];
    colors: ColorSlug[];
    inStockOnly: boolean;
    sort: Sort;
  };
}

export function ProductBrowser({ locked, initial }: ProductBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const [brands, setBrands] = useState<BrandSlug[]>(initial.brands);
  const [types, setTypes] = useState<ProductType[]>(initial.types);
  const [materials, setMaterials] = useState<Material[]>(initial.materials);
  const [colors, setColors] = useState<ColorSlug[]>(initial.colors);
  const [inStockOnly, setInStockOnly] = useState(initial.inStockOnly);
  const [sort, setSort] = useState<Sort>(initial.sort);

  const filtered = useMemo<Product[]>(() => {
    let out = PRODUCTS.filter((p) => {
      if (locked?.brand) {
        const matches = p.compat.some((c) => c.brand === locked.brand);
        const universal = p.type === "scoop-handle" || p.type === "accessory";
        if (!universal && !matches) return false;
      }
      if (locked?.model && !p.compat.some((c) => c.model === locked.model)) return false;
      if (brands.length) {
        const matches = p.compat.some((c) => brands.includes(c.brand));
        const universal = p.type === "scoop-handle" || p.type === "accessory";
        if (!universal && !matches) return false;
      }
      if (types.length && !types.includes(p.type)) return false;
      if (materials.length && !materials.includes(p.material)) return false;
      if (colors.length && !p.colors.some((c) => colors.includes(c))) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });

    if (sort === "price-asc") out = [...out].sort((a, b) => a.priceFrom - b.priceFrom);
    else if (sort === "price-desc") out = [...out].sort((a, b) => b.priceFrom - a.priceFrom);
    else if (sort === "rating") out = [...out].sort((a, b) => b.rating - a.rating);
    else out = [...out].sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

    return out;
  }, [brands, types, materials, colors, inStockOnly, sort, locked]);

  const activeCount =
    brands.length +
    types.length +
    materials.length +
    colors.length +
    (inStockOnly ? 1 : 0);

  // URL sync — replace the searchParams without pushing history
  const syncUrl = (overrides: Partial<{ brands: BrandSlug[]; types: ProductType[]; materials: Material[]; colors: ColorSlug[]; inStockOnly: boolean; sort: Sort }>) => {
    const next = new URLSearchParams(params.toString());
    const apply = (key: string, values: string[]) => {
      next.delete(key);
      values.forEach((v) => next.append(key, v));
    };
    apply("brand", overrides.brands ?? brands);
    apply("type", overrides.types ?? types);
    apply("material", overrides.materials ?? materials);
    apply("color", overrides.colors ?? colors);
    const stock = overrides.inStockOnly ?? inStockOnly;
    if (stock) next.set("inStock", "1");
    else next.delete("inStock");
    const s = overrides.sort ?? sort;
    if (s !== "featured") next.set("sort", s);
    else next.delete("sort");
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const toggle = <T extends string>(
    current: T[],
    setter: (next: T[]) => void,
    paramKey: keyof Parameters<typeof syncUrl>[0],
    value: T
  ) => {
    const nextValues = current.includes(value)
      ? current.filter((x) => x !== value)
      : [...current, value];
    setter(nextValues);
    syncUrl({ [paramKey]: nextValues } as never);
  };

  const clearAll = () => {
    setBrands([]);
    setTypes([]);
    setMaterials([]);
    setColors([]);
    setInStockOnly(false);
    syncUrl({
      brands: [],
      types: [],
      materials: [],
      colors: [],
      inStockOnly: false,
    });
  };

  return (
    <div
      className="mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12"
      style={{ maxWidth: 1440, padding: "40px 24px 80px" }}
    >
      {/* Sidebar */}
      <aside
        className="self-start overflow-y-auto"
        style={{ position: "sticky", top: 90, maxHeight: "calc(100vh - 120px)" }}
      >
        <div className="flex justify-between items-center mb-5">
          <div
            className="font-sans font-semibold uppercase text-text text-[12px]"
            style={{ letterSpacing: "0.12em" }}
          >
            Filter
          </div>
          {activeCount > 0 && (
            <button
              onClick={clearAll}
              className="bg-transparent border-none cursor-pointer underline text-[11px]"
              style={{ color: "#9A3624" }}
            >
              Clear all
            </button>
          )}
        </div>

        {!locked?.brand && (
          <FilterGroup title="Detector Brand">
            {BRANDS.map((b) => (
              <FilterCheck
                key={b.slug}
                label={b.name}
                count={b.count}
                checked={brands.includes(b.slug)}
                onChange={() => toggle(brands, setBrands, "brands", b.slug)}
              />
            ))}
          </FilterGroup>
        )}

        <FilterGroup title="Product Type">
          {TYPE_OPTIONS.map((o) => (
            <FilterCheck
              key={o.slug}
              label={o.label}
              count={PRODUCTS.filter((p) => p.type === o.slug).length}
              checked={types.includes(o.slug)}
              onChange={() => toggle(types, setTypes, "types", o.slug)}
            />
          ))}
        </FilterGroup>

        <FilterGroup title="Material">
          <FilterCheck
            label="Carbon Fiber"
            count={PRODUCTS.filter((p) => p.material === "carbon-fiber").length}
            checked={materials.includes("carbon-fiber")}
            onChange={() => toggle(materials, setMaterials, "materials", "carbon-fiber")}
          />
          <FilterCheck
            label="Glass Fiber (non-conductive)"
            count={PRODUCTS.filter((p) => p.material === "glass-fiber").length}
            checked={materials.includes("glass-fiber")}
            onChange={() => toggle(materials, setMaterials, "materials", "glass-fiber")}
          />
        </FilterGroup>

        <FilterGroup title="Color">
          <div className="flex flex-wrap" style={{ gap: 10, padding: "6px 0" }}>
            {COLOR_OPTIONS.map((c) => (
              <div
                key={c}
                className="text-center"
                style={{ fontSize: 10, color: "#6A6B73", fontFamily: "var(--font-mono)" }}
              >
                <ColorSwatch
                  color={c}
                  selected={colors.includes(c)}
                  onClick={() => toggle(colors, setColors, "colors", c)}
                  size={24}
                />
                <div
                  className="uppercase"
                  style={{ marginTop: 4, letterSpacing: "0.05em" }}
                >
                  {c}
                </div>
              </div>
            ))}
          </div>
        </FilterGroup>

        <FilterGroup title="Availability">
          <FilterCheck
            label="In Stock only"
            checked={inStockOnly}
            onChange={() => {
              const next = !inStockOnly;
              setInStockOnly(next);
              syncUrl({ inStockOnly: next });
            }}
          />
        </FilterGroup>
      </aside>

      {/* Results */}
      <div>
        <div
          className="flex justify-between items-center border-b border-border"
          style={{ marginBottom: 24, paddingBottom: 16 }}
        >
          <div
            className="font-mono text-[13px] text-text-muted"
            style={{ letterSpacing: "0.04em" }}
          >
            <span className="text-text font-semibold">{filtered.length}</span>{" "}
            {filtered.length === 1 ? "product" : "products"}
            {activeCount > 0 && (
              <>
                {" · "}
                <span style={{ color: "#9A3624" }}>
                  {activeCount} filter{activeCount > 1 ? "s" : ""}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <label
              className="font-mono text-[12px] uppercase text-text-muted"
              style={{ letterSpacing: "0.08em" }}
            >
              Sort
            </label>
            <select
              value={sort}
              onChange={(e) => {
                const next = e.target.value as Sort;
                setSort(next);
                syncUrl({ sort: next });
              }}
              className="sdr-select border border-border bg-surface cursor-pointer"
              style={{ padding: "6px 10px", fontSize: 13 }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
              <option value="rating">Best reviewed</option>
            </select>
          </div>
        </div>

        {activeCount > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {brands.map((b) => (
              <Chip
                key={`b-${b}`}
                label={BRANDS.find((x) => x.slug === b)?.name ?? b}
                onRemove={() => toggle(brands, setBrands, "brands", b)}
              />
            ))}
            {types.map((t) => (
              <Chip
                key={`t-${t}`}
                label={TYPE_OPTIONS.find((x) => x.slug === t)?.label ?? t}
                onRemove={() => toggle(types, setTypes, "types", t)}
              />
            ))}
            {materials.map((m) => (
              <Chip
                key={`m-${m}`}
                label={m}
                onRemove={() => toggle(materials, setMaterials, "materials", m)}
              />
            ))}
            {colors.map((c) => (
              <Chip key={`c-${c}`} label={c} onRemove={() => toggle(colors, setColors, "colors", c)} />
            ))}
            {inStockOnly && (
              <Chip
                label="In stock only"
                onRemove={() => {
                  setInStockOnly(false);
                  syncUrl({ inStockOnly: false });
                }}
              />
            )}
          </div>
        )}

        {filtered.length === 0 ? (
          <div
            className="bg-surface-alt border border-border text-center"
            style={{ padding: 80 }}
          >
            <div
              className="font-sans font-semibold text-text mb-2"
              style={{ fontSize: 20 }}
            >
              No products match.
            </div>
            <div className="text-text-muted text-[14px] mb-5">
              Try clearing filters or contact us for a custom build.
            </div>
            <Button variant="secondary" small onClick={clearAll}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
