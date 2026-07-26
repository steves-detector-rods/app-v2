export type ColorSlug =
  | "black"
  | "red"
  | "blue"
  | "green"
  | "camo"
  | "white";

export type BrandSlug = "minelab" | "garrett" | "xp" | "tarsacci";

export type ProductType =
  | "complete-shaft"
  | "upper-shaft"
  | "lower-rod"
  | "two-piece"
  | "scoop-handle"
  | "accessory";

export type Material = "carbon-fiber" | "glass-fiber";

export interface Compat {
  brand: BrandSlug;
  model: string;
  name: string;
}

export interface Variant {
  id: string;
  color: ColorSlug;
  configuration?: "Standard" | "CW-Ready";
  price: number;
}

export interface AddOn {
  id: string;
  name: string;
  price: number;
}

export interface ProductImage {
  src: string;
  alt: string;
}

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  sku: string;
  type: ProductType;
  typeName: string;
  material: Material;
  vendor?: string;
  isCarbonPro?: boolean;
  featured?: boolean;
  inStock: boolean;
  availabilityNote?: string;
  customLengthAvailable?: boolean;
  customLengthSurcharge?: number;
  compat: Compat[];
  compatText?: string;
  priceFrom: number;
  priceTo: number;
  colors: ColorSlug[];
  variants?: Variant[];
  addOns?: AddOn[];
  images?: ProductImage[];
  specs?: Record<string, string>;
  description?: string;
  blurb?: string;
  designHighlights?: string;
  crossSell?: string[];
  rating: number;
  reviews: number;
  tint?: string;
  badge?: string;
  tags?: string[];
}

export interface Brand {
  slug: BrandSlug;
  name: string;
  count: number;
}

export interface Model {
  slug: string;
  name: string;
  count: number;
}

export interface Compatibility {
  brands: Brand[];
  modelsByBrand: Record<BrandSlug, Model[]>;
}

export interface ScoopBrandFaq {
  id: string;
  question: string;
  answer: string;
}

/** A third-party sand-scoop brand we build replacement handles for. */
export interface ScoopBrand {
  slug: string;
  name: string;
  fullName: string;
  productSlugs: string[];
  metaTitle: string;
  metaDescription: string;
  tagline: string;
  heroHeadline: string;
  intro: string;
  useCase: string;
  fitment: string[];
  whyUpgrade: string[];
  faq: ScoopBrandFaq[];
}

export interface Testimonial {
  quote: string;
  name: string;
  detector: string;
  rating: number;
}
