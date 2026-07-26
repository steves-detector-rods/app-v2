import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/products/ProductCard";
import { Accordion } from "@/components/ui/Accordion";
import { CollectionHeader } from "@/components/products/CollectionHeader";
import {
  getAllScoopBrands,
  getScoopBrand,
  getScoopHandlesForBrand,
} from "@/lib/scoop-brands";
import { breadcrumbJsonLd, faqJsonLd, itemListJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return getAllScoopBrands().map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand } = await params;
  const b = getScoopBrand(brand);
  if (!b) return {};
  return {
    title: b.metaTitle,
    description: b.metaDescription,
    alternates: { canonical: `/sand-scoop-handles/${b.slug}` },
    openGraph: {
      title: b.metaTitle,
      description: b.metaDescription,
      url: `/sand-scoop-handles/${b.slug}`,
    },
  };
}

export default async function ScoopBrandPage({ params }: PageProps) {
  const { brand } = await params;
  const b = getScoopBrand(brand);
  if (!b) notFound();

  const products = getScoopHandlesForBrand(b);
  const siblings = getAllScoopBrands().filter((x) => x.slug !== b.slug);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Sand Scoop Handles", href: "/sand-scoop-handles" },
    { label: b.name },
  ];

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqJsonLd(b.faq) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd(breadcrumbs) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: itemListJsonLd({
            name: `${b.name} Sand Scoop Handles`,
            description: b.metaDescription,
            url: `/sand-scoop-handles/${b.slug}`,
            products,
          }),
        }}
      />

      <CollectionHeader
        title={`${b.name} Scoop Handles`}
        subtitle={b.heroHeadline}
        breadcrumbs={breadcrumbs}
      />

      {/* Intro + use case */}
      <section style={{ padding: "60px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 14 }}
          >
            — {b.tagline}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <p
              className="text-text"
              style={{ fontSize: 17, lineHeight: 1.7, maxWidth: 560 }}
            >
              {b.intro}
            </p>
            <div>
              <div
                className="font-mono uppercase text-text-muted"
                style={{ fontSize: 11, letterSpacing: "0.12em", marginBottom: 12 }}
              >
                Where it gets used
              </div>
              <p
                className="text-text-muted"
                style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 560 }}
              >
                {b.useCase}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="bg-surface-alt" style={{ padding: "70px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <h2
            className="font-sans font-bold text-text"
            style={{
              fontSize: "clamp(24px, 3.2vw, 32px)",
              letterSpacing: "-0.02em",
              marginBottom: 32,
            }}
          >
            {products.length === 1
              ? `The ${b.name} build.`
              : `${products.length} builds for ${b.name} scoops.`}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Fitment + why upgrade */}
      <section style={{ padding: "80px 24px" }}>
        <div className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14" style={{ maxWidth: 1200 }}>
          <div>
            <div
              className="font-mono text-[11px] uppercase"
              style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 16 }}
            >
              — Fitment
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(22px, 2.6vw, 28px)",
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              What it fits.
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {b.fitment.map((line) => (
                <li
                  key={line}
                  className="text-text-muted border-b border-border"
                  style={{ fontSize: 15, lineHeight: 1.6, padding: "14px 0" }}
                >
                  {line}
                </li>
              ))}
            </ul>
            <p
              className="text-text-muted"
              style={{ fontSize: 14, lineHeight: 1.6, marginTop: 20 }}
            >
              Not sure what mount you have?{" "}
              <Link href="/contact" className="text-accent">
                Send Steve a photo
              </Link>{" "}
              and he&apos;ll confirm the fit before you order.
            </p>
          </div>
          <div>
            <div
              className="font-mono text-[11px] uppercase"
              style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 16 }}
            >
              — Why bother
            </div>
            <h2
              className="font-sans font-bold text-text"
              style={{
                fontSize: "clamp(22px, 2.6vw, 28px)",
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}
            >
              What changes.
            </h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {b.whyUpgrade.map((line, i) => (
                <li
                  key={line}
                  className="flex gap-4"
                  style={{ padding: "14px 0" }}
                >
                  <span
                    className="font-mono"
                    style={{ color: "#B8452F", fontSize: 12, paddingTop: 4 }}
                  >
                    0{i + 1}
                  </span>
                  <span
                    className="text-text-muted"
                    style={{ fontSize: 15, lineHeight: 1.6 }}
                  >
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-surface-alt" style={{ padding: "80px 24px" }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 12 }}
          >
            — Questions we get
          </div>
          <h2
            className="font-sans font-bold text-text"
            style={{
              fontSize: "clamp(26px, 3.4vw, 36px)",
              letterSpacing: "-0.02em",
              marginBottom: 40,
            }}
          >
            {b.name} scoop handle FAQ.
          </h2>
          <Accordion items={b.faq} />
        </div>
      </section>

      {/* Sibling brands — internal linking */}
      <section style={{ padding: "70px 24px 110px" }}>
        <div className="mx-auto" style={{ maxWidth: 1200 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{ color: "#9A3624", letterSpacing: "0.25em", marginBottom: 20 }}
          >
            — Other scoop brands we build for
          </div>
          <div className="flex flex-wrap gap-3">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/sand-scoop-handles/${s.slug}`}
                prefetch={false}
                className="font-mono uppercase border border-border hover:border-accent transition-colors no-underline text-text"
                style={{ padding: "12px 18px", fontSize: 12, letterSpacing: "0.1em" }}
              >
                {s.name}
              </Link>
            ))}
          </div>
          <p
            className="text-text-muted"
            style={{ fontSize: 14.5, lineHeight: 1.65, marginTop: 24, maxWidth: 640 }}
          >
            Running something else? These are the brands we stock handles for, not the
            limit of what Steve can build.{" "}
            <Link href="/contact" className="text-accent">
              Send him the make and the mount dimensions
            </Link>{" "}
            and he&apos;ll tell you whether a one-off is possible.
          </p>
        </div>
      </section>
    </div>
  );
}
