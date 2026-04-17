import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { getProductBySlug } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Icon } from "@/components/ui/Icon";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";
import { Badge } from "@/components/ui/Badge";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.excerpt,
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-sans font-bold text-text"
      style={{
        fontSize: 28,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        marginTop: 40,
        marginBottom: 16,
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-sans font-semibold text-text"
      style={{
        fontSize: 20,
        letterSpacing: "-0.01em",
        marginTop: 32,
        marginBottom: 12,
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-text"
      style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20 }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="text-text"
      style={{
        fontSize: 17,
        lineHeight: 1.7,
        marginBottom: 20,
        paddingLeft: 24,
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 8 }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: "#14151E", fontWeight: 600 }} {...props} />
  ),
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = (post.frontmatter.relatedProducts ?? [])
    .map((s) => getProductBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="bg-surface">
      <article style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px 80px" }}>
        <Link
          href="/blog"
          prefetch={false}
          className="inline-flex items-center gap-1.5 text-text-muted mb-6"
          style={{ fontSize: 13 }}
        >
          <Icon name="chevL" size={12} /> All posts
        </Link>

        <div className="flex gap-2.5 items-center mb-4">
          {post.frontmatter.tag && <Badge variant="muted">{post.frontmatter.tag}</Badge>}
          <span
            className="font-mono text-text-muted uppercase"
            style={{ fontSize: 11, letterSpacing: "0.06em" }}
          >
            {formatDate(post.frontmatter.date)} · by {post.frontmatter.author}
          </span>
        </div>

        <h1
          className="font-sans font-bold text-text text-balance mb-6"
          style={{
            fontSize: 44,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
          }}
        >
          {post.frontmatter.title}
        </h1>

        <div style={{ aspectRatio: "16/9", marginBottom: 40 }}>
          <WeavePlaceholder color="black" aspect="16/9" />
        </div>

        <div className="prose-body">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>
      </article>

      {related.length > 0 && (
        <section
          className="bg-surface-alt"
          style={{ padding: "60px 24px 100px" }}
        >
          <div className="mx-auto" style={{ maxWidth: 1200 }}>
            <div style={{ marginBottom: 32 }}>
              <div
                className="font-mono text-[11px] uppercase"
                style={{
                  color: "#9A3624",
                  letterSpacing: "0.25em",
                  marginBottom: 10,
                }}
              >
                — Mentioned in this post
              </div>
              <h3
                className="font-sans font-bold text-text"
                style={{ fontSize: 28, letterSpacing: "-0.02em" }}
              >
                Related products
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
