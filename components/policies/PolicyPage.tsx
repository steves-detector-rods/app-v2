import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";

const POLICIES_DIR = path.join(process.cwd(), "content", "policies");

interface PolicyFrontmatter {
  title: string;
  updated: string;
}

export function getPolicy(slug: string):
  | { frontmatter: PolicyFrontmatter; content: string }
  | undefined {
  const file = path.join(POLICIES_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return undefined;
  const raw = fs.readFileSync(file, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data as PolicyFrontmatter, content };
}

const mdxComponents = {
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="font-sans font-bold text-text"
      style={{
        fontSize: 26,
        letterSpacing: "-0.02em",
        lineHeight: 1.2,
        marginTop: 36,
        marginBottom: 14,
      }}
      {...props}
    />
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="font-sans font-semibold text-text"
      style={{
        fontSize: 18,
        letterSpacing: "-0.01em",
        marginTop: 28,
        marginBottom: 10,
      }}
      {...props}
    />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-text"
      style={{ fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}
      {...props}
    />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul
      className="text-text"
      style={{
        fontSize: 15,
        lineHeight: 1.65,
        marginBottom: 16,
        paddingLeft: 24,
      }}
      {...props}
    />
  ),
  li: (props: React.HTMLAttributes<HTMLLIElement>) => (
    <li style={{ marginBottom: 6 }} {...props} />
  ),
  strong: (props: React.HTMLAttributes<HTMLElement>) => (
    <strong style={{ color: "#14151E", fontWeight: 600 }} {...props} />
  ),
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a style={{ color: "#9A3624", textDecoration: "underline" }} {...props} />
  ),
};

export function PolicyPage({ slug, eyebrow }: { slug: string; eyebrow: string }) {
  const policy = getPolicy(slug);
  if (!policy) notFound();
  const { frontmatter, content } = policy;

  return (
    <div className="bg-surface">
      <div
        className="border-b border-border"
        style={{ padding: "60px 24px" }}
      >
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <div
            className="font-mono text-[11px] uppercase"
            style={{
              color: "#9A3624",
              letterSpacing: "0.25em",
              marginBottom: 14,
            }}
          >
            — {eyebrow}
          </div>
          <h1
            className="font-sans font-bold text-text"
            style={{
              fontSize: 48,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            {frontmatter.title}
          </h1>
          <div
            className="font-mono text-text-muted mt-3 uppercase"
            style={{ fontSize: 11, letterSpacing: "0.08em" }}
          >
            Updated{" "}
            {new Date(frontmatter.updated).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
      <article style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px 100px" }}>
        <MDXRemote source={content} components={mdxComponents} />
      </article>
    </div>
  );
}
