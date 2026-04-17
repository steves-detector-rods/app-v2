import type { Product } from "@/types/product";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stevesdetectorrods.com";

export function productJsonLd(product: Product): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.blurb ?? product.shortName,
    sku: product.sku,
    brand: { "@type": "Brand", name: "Steve's Detector Rods" },
    category: product.typeName,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: product.priceFrom,
      highPrice: product.priceTo,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      url: `${SITE_URL}/products/${product.slug}`,
    },
    aggregateRating:
      product.reviews > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviews,
          }
        : undefined,
  });
}

export function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Steve's Detector Rods",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.svg`,
    foundingDate: "2018",
    email: "steve@stevesdetectorrods.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Norman",
      addressRegion: "OK",
      addressCountry: "US",
    },
    sameAs: [
      "https://www.facebook.com/stevesdetectorrods",
      "https://www.youtube.com/@stevesdetectorrods",
    ],
  });
}

export function breadcrumbJsonLd(items: Array<{ label: string; href?: string }>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.label,
      item: b.href ? `${SITE_URL}${b.href}` : undefined,
    })),
  });
}

export function articleJsonLd(params: {
  title: string;
  slug: string;
  date: string;
  author: string;
  excerpt: string;
}): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.title,
    datePublished: params.date,
    author: { "@type": "Person", name: params.author },
    description: params.excerpt,
    url: `${SITE_URL}/blog/${params.slug}`,
  });
}
