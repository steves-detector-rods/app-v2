import compat from "@/data/compatibility.json";
import type { Brand, BrandSlug, Model } from "@/types/product";

export const BRANDS = compat.brands as Brand[];
export const MODELS_BY_BRAND = compat.modelsByBrand as Record<BrandSlug, Model[]>;

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export function getModel(brandSlug: string, modelSlug: string): Model | undefined {
  return MODELS_BY_BRAND[brandSlug as BrandSlug]?.find((m) => m.slug === modelSlug);
}
