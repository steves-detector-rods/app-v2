import type { Metadata } from "next";
import { CollectionHeader } from "@/components/products/CollectionHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { parseFilters } from "@/lib/filters";
import type { ProductType } from "@/types/product";

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

const TYPE_TITLES: Record<ProductType, string> = {
  "complete-shaft": "Complete Shaft Systems",
  "upper-shaft": "Upper Shafts",
  "lower-rod": "Lower Rods",
  "two-piece": "Two-Piece Lower Shafts",
  "scoop-handle": "Sand Scoop Handles",
  "accessory": "Accessories",
};

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const initial = parseFilters(params);
  let title = "All Products";
  if (initial.types.length === 1) title = TYPE_TITLES[initial.types[0]];
  if (initial.materials.includes("glass-fiber")) title = "Glass-Fiber Rods";
  return {
    title,
    description:
      "Carbon-fiber and glass-fiber shafts, lower rods, two-piece lowers, scoop handles, and accessories. Hand-assembled in Norman, Oklahoma.",
  };
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const initial = parseFilters(params);

  let title = "All Products";
  let subtitle = "The full catalog. 46 SKUs across 6 product types.";
  if (initial.types.length === 1) {
    title = TYPE_TITLES[initial.types[0]];
    subtitle = `Everything we make in this category.`;
  }
  if (initial.materials.length === 1 && initial.materials[0] === "glass-fiber") {
    title = "Glass-Fiber Rods";
    subtitle = "Non-conductive lower rods for saltwater and sensitive machines.";
  }

  return (
    <div className="bg-surface" style={{ minHeight: "calc(100vh - 72px)" }}>
      <CollectionHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: title },
        ]}
      />
      <ProductBrowser initial={initial} />
    </div>
  );
}
