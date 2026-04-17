import type { BrandSlug, ColorSlug, Material, ProductType } from "@/types/product";

export type Sort = "featured" | "price-asc" | "price-desc" | "rating";

const VALID_BRANDS: BrandSlug[] = ["minelab", "garrett", "xp", "tarsacci"];
const VALID_TYPES: ProductType[] = [
  "complete-shaft",
  "upper-shaft",
  "lower-rod",
  "two-piece",
  "scoop-handle",
  "accessory",
];
const VALID_MATERIALS: Material[] = ["carbon-fiber", "glass-fiber"];
const VALID_COLORS: ColorSlug[] = ["black", "red", "blue", "green", "camo", "white"];
const VALID_SORTS: Sort[] = ["featured", "price-asc", "price-desc", "rating"];

type RawParams = Record<string, string | string[] | undefined>;

function toArray(value: string | string[] | undefined): string[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

export interface ParsedFilters {
  brands: BrandSlug[];
  types: ProductType[];
  materials: Material[];
  colors: ColorSlug[];
  inStockOnly: boolean;
  sort: Sort;
}

export function parseFilters(params: RawParams): ParsedFilters {
  const brands = toArray(params.brand).filter((v): v is BrandSlug =>
    VALID_BRANDS.includes(v as BrandSlug)
  );
  const types = toArray(params.type).filter((v): v is ProductType =>
    VALID_TYPES.includes(v as ProductType)
  );
  const materials = toArray(params.material).filter((v): v is Material =>
    VALID_MATERIALS.includes(v as Material)
  );
  const colors = toArray(params.color).filter((v): v is ColorSlug =>
    VALID_COLORS.includes(v as ColorSlug)
  );
  const inStockOnly = params.inStock === "1";
  const sortRaw = Array.isArray(params.sort) ? params.sort[0] : params.sort;
  const sort: Sort = VALID_SORTS.includes(sortRaw as Sort) ? (sortRaw as Sort) : "featured";

  return { brands, types, materials, colors, inStockOnly, sort };
}
