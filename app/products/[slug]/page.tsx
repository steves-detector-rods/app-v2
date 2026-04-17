import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getCrossSellProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { PDPInteractive } from "@/components/products/PDPInteractive";
import { PDPTabs } from "@/components/products/PDPTabs";
import { SpecsTable } from "@/components/products/SpecsTable";
import { EngineeringContent } from "@/components/products/EngineeringContent";
import { ReviewsBlock } from "@/components/products/ReviewsBlock";
import { CrossSellRow } from "@/components/products/CrossSellRow";
import { breadcrumbJsonLd, productJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) return {};
  const compatList = p.compat.map((c) => c.name).join(", ");
  return {
    title: p.name,
    description: `${p.name} — ${p.blurb ?? "Hand-built carbon-fiber."} From $${p.priceFrom}. ${
      compatList ? `Compatible with ${compatList}.` : ""
    } Hand-assembled in the USA.`.trim(),
    openGraph: {
      title: p.name,
      description: p.blurb ?? p.shortName,
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const p = getProductBySlug(slug);
  if (!p) notFound();

  const cross = getCrossSellProducts(p);
  const related = getRelatedProducts(p);
  const relatedLabel =
    p.compat[0]?.name ??
    (p.type === "scoop-handle" ? "scoop" : "detector");

  return (
    <div className="bg-surface">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(p) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: `${p.typeName}s`, href: `/products?type=${p.type}` },
            { label: p.name, href: `/products/${p.slug}` },
          ]),
        }}
      />
      {/* Breadcrumbs */}
      <div
        className="border-b border-border"
        style={{ padding: "20px 24px" }}
      >
        <div
          className="mx-auto font-mono text-[11px] text-text-muted"
          style={{ maxWidth: 1440, letterSpacing: "0.08em" }}
        >
          <Link href="/" className="uppercase">
            Home
          </Link>
          <span style={{ margin: "0 10px" }}>/</span>
          <Link
            href={`/products?type=${p.type}`}
            className="uppercase text-text-muted"
          >
            {p.typeName.toUpperCase()}S
          </Link>
          <span style={{ margin: "0 10px" }}>/</span>
          <span className="text-text">{p.sku}</span>
        </div>
      </div>

      {/* Main (gallery + purchase block) */}
      <div
        className="mx-auto grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
        style={{ maxWidth: 1440, padding: "48px 24px", gap: 64 }}
      >
        <PDPInteractive product={p} />
      </div>

      {/* Tabs */}
      <div
        className="mx-auto"
        style={{ maxWidth: 1440, padding: "40px 24px 80px" }}
      >
        <PDPTabs
          reviewCount={p.reviews}
          description={<DescriptionBlock product={p} />}
          specs={<SpecsTable product={p} />}
          engineering={<EngineeringContent product={p} />}
          reviews={<ReviewsBlock product={p} />}
        />
      </div>

      {cross.length > 0 && (
        <CrossSellRow
          eyebrow="Complete your setup"
          title="Pairs well with this"
          products={cross}
        />
      )}
      {related.length > 0 && (
        <CrossSellRow
          eyebrow="Also built for this machine"
          title={`Also built for your ${relatedLabel}`}
          products={related}
        />
      )}
    </div>
  );
}

function DescriptionBlock({ product: p }: { product: { typeName: string; compat: Array<{ name: string }>; description?: string; blurb?: string } }) {
  const detectorName = p.compat[0]?.name || "listed detectors";
  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-[2fr_1fr]"
      style={{ gap: 60, maxWidth: 1100 }}
    >
      <div>
        <p
          className="text-pretty text-text"
          style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20 }}
        >
          Our <strong>standard {p.typeName.toLowerCase()}</strong> for the{" "}
          {detectorName} is the upgrade we wanted for our own machines. The upper includes 4
          cuff-adjustment holes and a control-box mounting hole in the same positions as the
          factory shaft — this is a drop-in, not a conversion.
        </p>
        <p
          className="text-text-muted"
          style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}
        >
          The heavy-duty cam lock is injection-molded nylon, not ABS. It&apos;s stronger, it
          doesn&apos;t slip, and the camming surface is machined to lock flush so you don&apos;t
          get rod rotation under load. End caps are injection-molded plastic with an interference
          fit — no glue, no rattle.
        </p>
        <p
          className="text-text-muted"
          style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}
        >
          Every complete shaft ships with one standard-length lower rod. Need an extra lower?
          Contact us for the add-on pricing. Need a custom length? Select &ldquo;Tall Man&rdquo;
          and specify up to 30&quot;.
        </p>
        <div
          className="bg-surface-alt border border-border"
          style={{ padding: 20, borderLeft: "3px solid #B8452F" }}
        >
          <div
            className="font-semibold uppercase text-text"
            style={{ fontSize: 12, letterSpacing: "0.1em", marginBottom: 8 }}
          >
            What&apos;s included
          </div>
          <ul
            className="text-text-muted m-0"
            style={{ padding: "0 0 0 18px", fontSize: 14, lineHeight: 1.8 }}
          >
            <li>1× upper shaft (3K twill carbon-fiber, glossy)</li>
            <li>1× standard-length lower rod</li>
            <li>1× heavy-duty cam lock (nylon)</li>
            <li>1× injection-molded end cap</li>
            <li>All stainless-steel hardware</li>
          </ul>
        </div>
      </div>
      <div>
        <div
          className="text-bg"
          style={{ padding: 24, background: "#0F1018" }}
        >
          <div
            className="font-mono uppercase"
            style={{
              color: "#B8452F",
              fontSize: 10,
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            NOTE FROM STEVE
          </div>
          <p
            className="m-0"
            style={{ fontSize: 14, lineHeight: 1.6, color: "#CDCBBF" }}
          >
            This is the same build I run on my personal {detectorName}. If you have an odd
            configuration — unusual cuff position, specialty coil, rare battery pack — email me.
            I&apos;ll build around it.
          </p>
          <div
            className="font-mono"
            style={{
              marginTop: 16,
              fontSize: 12,
              color: "#888",
            }}
          >
            — Steve
          </div>
        </div>
      </div>
    </div>
  );
}
