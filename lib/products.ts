import { PRODUCTS } from "@/data/products";
import type {
  BrandSlug,
  ColorSlug,
  Material,
  Product,
  ProductType,
} from "@/types/product";

export interface ProductFilters {
  brands?: BrandSlug[];
  models?: string[];
  types?: ProductType[];
  materials?: Material[];
  colors?: ColorSlug[];
  inStockOnly?: boolean;
  carbonProOnly?: boolean;
}

export function getAllProducts(): Product[] {
  return PRODUCTS;
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function filterProducts(filters: ProductFilters = {}): Product[] {
  const {
    brands = [],
    models = [],
    types = [],
    materials = [],
    colors = [],
    inStockOnly = false,
    carbonProOnly = false,
  } = filters;

  return PRODUCTS.filter((p) => {
    // Brand filter — scoop handles and universal accessories don't filter out.
    if (brands.length) {
      const universal = p.type === "scoop-handle" || p.type === "accessory";
      const matches = p.compat.some((c) => brands.includes(c.brand));
      if (!universal && !matches) return false;
      if (!universal && brands.length && !matches) return false;
    }
    if (models.length && !p.compat.some((c) => models.includes(c.model))) return false;
    if (types.length && !types.includes(p.type)) return false;
    if (materials.length && !materials.includes(p.material)) return false;
    if (colors.length && !p.colors.some((c) => colors.includes(c))) return false;
    if (inStockOnly && !p.inStock) return false;
    if (carbonProOnly && !p.isCarbonPro) return false;
    return true;
  });
}

export function getProductsForDetector(brand: BrandSlug, model: string): Product[] {
  return PRODUCTS.filter((p) =>
    p.compat.some((c) => c.brand === brand && c.model === model)
  );
}

export function getProductsForBrand(brand: BrandSlug): Product[] {
  return PRODUCTS.filter((p) => p.compat.some((c) => c.brand === brand));
}

export function getFeaturedProducts(limit = 4): Product[] {
  return PRODUCTS.filter((p) => p.featured).slice(0, limit);
}

export function getCrossSellProducts(product: Product): Product[] {
  if (!product.crossSell?.length) return [];
  return product.crossSell
    .map((slug) => PRODUCTS.find((p) => p.slug === slug))
    .filter((p): p is Product => Boolean(p));
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return PRODUCTS.filter(
    (x) =>
      x.slug !== product.slug &&
      x.compat.some((c1) =>
        product.compat.some((c2) => c1.brand === c2.brand && c1.model === c2.model)
      )
  ).slice(0, limit);
}

export interface FilterOptions {
  brands: Array<{ slug: BrandSlug; name: string; count: number }>;
  types: Array<{ slug: ProductType; name: string; count: number }>;
  materials: Array<{ slug: Material; name: string; count: number }>;
  colors: ColorSlug[];
}

const BRAND_NAMES: Record<BrandSlug, string> = {
  minelab: "Minelab",
  garrett: "Garrett",
  xp: "XP",
  tarsacci: "Tarsacci",
};

const TYPE_LABELS: Record<ProductType, string> = {
  "complete-shaft": "Complete Shafts",
  "upper-shaft": "Upper Shafts",
  "lower-rod": "Lower Rods",
  "two-piece": "Two-Piece Lowers",
  "scoop-handle": "Scoop Handles",
  "accessory": "Accessories",
};

export function getFilterOptions(scope: Product[] = PRODUCTS): FilterOptions {
  const brandCount = new Map<BrandSlug, number>();
  const typeCount = new Map<ProductType, number>();
  const materialCount = new Map<Material, number>();
  const colorSet = new Set<ColorSlug>();

  for (const p of scope) {
    for (const c of p.compat) brandCount.set(c.brand, (brandCount.get(c.brand) ?? 0) + 1);
    typeCount.set(p.type, (typeCount.get(p.type) ?? 0) + 1);
    materialCount.set(p.material, (materialCount.get(p.material) ?? 0) + 1);
    for (const c of p.colors) colorSet.add(c);
  }

  return {
    brands: (Object.keys(BRAND_NAMES) as BrandSlug[]).map((slug) => ({
      slug,
      name: BRAND_NAMES[slug],
      count: brandCount.get(slug) ?? 0,
    })),
    types: (Object.keys(TYPE_LABELS) as ProductType[]).map((slug) => ({
      slug,
      name: TYPE_LABELS[slug],
      count: typeCount.get(slug) ?? 0,
    })),
    materials: [
      { slug: "carbon-fiber", name: "Carbon Fiber", count: materialCount.get("carbon-fiber") ?? 0 },
      { slug: "glass-fiber", name: "Glass Fiber (non-conductive)", count: materialCount.get("glass-fiber") ?? 0 },
    ],
    colors: Array.from(colorSet),
  };
}
