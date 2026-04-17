import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CollectionHeader } from "@/components/products/CollectionHeader";
import { ProductBrowser } from "@/components/products/ProductBrowser";
import { parseFilters } from "@/lib/filters";
import { BRANDS, MODELS_BY_BRAND, getBrand, getModel } from "@/lib/compatibility";
import type { BrandSlug } from "@/types/product";

interface PageProps {
  params: Promise<{ brand: string; model: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export function generateStaticParams() {
  const out: Array<{ brand: string; model: string }> = [];
  for (const b of BRANDS) {
    for (const m of MODELS_BY_BRAND[b.slug]) {
      out.push({ brand: b.slug, model: m.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand, model } = await params;
  const b = getBrand(brand);
  const m = getModel(brand, model);
  if (!b || !m) return {};
  return {
    title: `${b.name} ${m.name} — Shafts, Lower Rods, Accessories`,
    description: `Every shaft, lower rod, and accessory we build for the ${b.name} ${m.name}.`,
  };
}

export default async function BrandModelPage({ params, searchParams }: PageProps) {
  const { brand, model } = await params;
  const b = getBrand(brand);
  const m = getModel(brand, model);
  if (!b || !m) notFound();
  const sp = await searchParams;
  const initial = parseFilters(sp);

  return (
    <div className="bg-surface" style={{ minHeight: "calc(100vh - 72px)" }}>
      <CollectionHeader
        title={`${b.name} ${m.name}`}
        subtitle="Every shaft, lower, and accessory built for your machine."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Detectors", href: "/products" },
          { label: b.name, href: `/detectors/${b.slug}` },
          { label: m.name },
        ]}
      />
      <ProductBrowser
        locked={{ brand: brand as BrandSlug, model }}
        initial={initial}
      />
    </div>
  );
}
