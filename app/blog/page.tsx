import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";
import { Badge } from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Blog — News, how-tos, and notes from the shop",
  description:
    "Product announcements, detecting tips, carbon-fiber engineering deep-dives, and notes from Steve's workbench.",
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

const COLOR_CYCLE = ["black", "blue", "green", "red"] as const;

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="bg-surface">
      {/* Header */}
      <div
        className="border-b border-border"
        style={{ padding: "60px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#9A3624",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — Blog
          </div>
          <h1
            className="font-sans font-bold text-text"
            style={{
              fontSize: 56,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            News, how-tos, and notes from the shop.
          </h1>
        </div>
      </div>

      <section style={{ padding: "60px 24px 100px" }}>
        <div className="mx-auto" style={{ maxWidth: 1000 }}>
          {posts.length === 0 ? (
            <div
              className="bg-surface-alt border border-border text-center"
              style={{ padding: 60 }}
            >
              <div className="text-text-muted">No posts yet.</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((p, i) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  prefetch={false}
                  className="hover-lift border border-border bg-surface block"
                >
                  <div style={{ aspectRatio: "16/9" }}>
                    <WeavePlaceholder
                      color={COLOR_CYCLE[i % COLOR_CYCLE.length]}
                      aspect="16/9"
                    />
                  </div>
                  <div style={{ padding: 24 }}>
                    <div className="flex gap-2.5 items-center mb-3">
                      {p.frontmatter.tag && <Badge variant="muted">{p.frontmatter.tag}</Badge>}
                      <span
                        className="font-mono text-text-muted uppercase"
                        style={{ fontSize: 11, letterSpacing: "0.06em" }}
                      >
                        {formatDate(p.frontmatter.date)}
                      </span>
                    </div>
                    <h3
                      className="font-sans font-semibold text-text mb-2.5"
                      style={{
                        fontSize: 20,
                        letterSpacing: "-0.01em",
                        lineHeight: 1.25,
                      }}
                    >
                      {p.frontmatter.title}
                    </h3>
                    <p
                      className="text-text-muted"
                      style={{ fontSize: 14, lineHeight: 1.6 }}
                    >
                      {p.frontmatter.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
