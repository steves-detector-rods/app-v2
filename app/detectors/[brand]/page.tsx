import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionHeader } from "@/components/products/CollectionHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { parseFilters } from "@/lib/filters";
import { BRANDS, getBrand } from "@/lib/compatibility";
import type { BrandSlug } from "@/types/product";

interface PageProps {
  params: Promise<{ brand: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  return BRANDS.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) return {};
  return {
    title: `${b.name} — Carbon-Fiber Shafts & Lower Rods`,
    description: `Every shaft, lower rod, and accessory we build for ${b.name} detectors.`,
  };
}

export default async function BrandPage({ params, searchParams }: PageProps) {
  const { brand } = await params;
  const b = getBrand(brand);
  if (!b) notFound();
  const sp = await searchParams;
  const initial = parseFilters(sp);

  return (
    <div className="bg-surface" style={{ minHeight: "calc(100vh - 72px)" }}>
      <CollectionHeader
        title={b.name}
        subtitle={`Every product built for ${b.name} detectors.`}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Detectors", href: "/products" },
          { label: b.name },
        ]}
      />
      <ProductBrowser locked={{ brand: brand as BrandSlug }} initial={initial} />
    </div>
  );
}
