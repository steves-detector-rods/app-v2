import { SCOOP_BRANDS } from "@/data/scoop-brands";
import { PRODUCTS } from "@/data/products";
import type { Product, ScoopBrand } from "@/types/product";

export function getAllScoopBrands(): ScoopBrand[] {
  return SCOOP_BRANDS;
}

export function getScoopBrand(slug: string): ScoopBrand | undefined {
  return SCOOP_BRANDS.find((b) => b.slug === slug);
}

/** All scoop-handle SKUs, regardless of brand. */
export function getAllScoopHandles(): Product[] {
  return PRODUCTS.filter((p) => p.type === "scoop-handle");
}

/** The SKUs belonging to one scoop brand, in the order declared in the data. */
export function getScoopHandlesForBrand(brand: ScoopBrand): Product[] {
  return brand.productSlugs
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

/** Lowest advertised price across the scoop-handle line, for metadata and copy. */
export function getScoopHandlePriceFrom(): number {
  const handles = getAllScoopHandles();
  return handles.reduce((min, p) => Math.min(min, p.priceFrom), Infinity);
}
