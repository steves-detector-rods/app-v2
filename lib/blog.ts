import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export interface BlogFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tag?: string;
  relatedProducts?: string[];
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogFrontmatter;
  content: string;
}

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((f) => {
    const slug = f.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(BLOG_DIR, f), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      frontmatter: data as BlogFrontmatter,
      content,
    };
  });
  // newest first
  return posts.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
