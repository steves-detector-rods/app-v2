import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";
import { BRANDS, MODELS_BY_BRAND } from "@/lib/compatibility";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://stevesdetectorrods.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/products",
    "/find-your-shaft",
    "/carbonpro",
    "/about",
    "/blog",
    "/faq",
    "/contact",
    "/policies/shipping",
    "/policies/returns",
    "/policies/privacy",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));

  const productRoutes: MetadataRoute.Sitemap = getAllProducts().map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const detectorRoutes: MetadataRoute.Sitemap = BRANDS.flatMap((b) => [
    {
      url: `${SITE_URL}/detectors/${b.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...MODELS_BY_BRAND[b.slug].map((m) => ({
      url: `${SITE_URL}/detectors/${b.slug}/${m.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ]);

  const blogRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...detectorRoutes, ...blogRoutes];
}
