import Fuse, { type IFuseOptions } from "fuse.js";
import type { Product } from "@/types/product";
import { PRODUCTS } from "@/data/products";

export interface SearchHit {
  product: Product;
  score: number;
}

const FUSE_OPTIONS: IFuseOptions<Product> = {
  includeScore: true,
  threshold: 0.35,
  distance: 200,
  keys: [
    { name: "name", weight: 3 },
    { name: "shortName", weight: 3 },
    { name: "sku", weight: 2 },
    { name: "compat.name", weight: 2 },
    { name: "compatText", weight: 1 },
    { name: "tags", weight: 1 },
    { name: "typeName", weight: 1 },
    { name: "blurb", weight: 1 },
  ],
};

let cachedFuse: Fuse<Product> | null = null;

function getFuse(): Fuse<Product> {
  if (!cachedFuse) cachedFuse = new Fuse(PRODUCTS, FUSE_OPTIONS);
  return cachedFuse;
}

export function search(query: string, limit = 6): SearchHit[] {
  if (!query || query.trim().length < 2) return [];
  return getFuse()
    .search(query.trim(), { limit })
    .map((r) => ({ product: r.item, score: r.score ?? 0 }));
}
