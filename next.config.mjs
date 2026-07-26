import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin Turbopack root so it doesn't walk up past stray lockfiles.
  turbopack: {
    root: __dirname,
  },

  // Keep the staging host and Vercel preview URLs out of search indexes.
  // Scoped by host so the production domain stays indexable after cutover —
  // a robots.txt Disallow wouldn't drop already-indexed pages, but this
  // noindex header will as Google/Bing re-crawl them.
  async headers() {
    const noindex = [{ key: "X-Robots-Tag", value: "noindex, nofollow" }];
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "dev.stevesdetectorrods.com" }],
        headers: noindex,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<vercel>.*)\\.vercel\\.app" }],
        headers: noindex,
      },
    ];
  },

  // 301 redirects from the old PHP site's fixed paths.
  // Query-param-based redirects (e.g. /product.php?id=EQ.CS-01) are handled in
  // middleware.ts since Next.js redirect() can't match on search params.
  async redirects() {
    return [
      { source: "/list.php", destination: "/products", permanent: true },
      { source: "/list2.php", destination: "/products?material=glass-fiber", permanent: true },
      { source: "/about.php", destination: "/about", permanent: true },
      { source: "/FAQ.php", destination: "/faq", permanent: true },
      { source: "/faq.php", destination: "/faq", permanent: true },
      { source: "/blog/index.php", destination: "/blog", permanent: true },
      { source: "/carbonpro.php", destination: "/carbonpro", permanent: true },
      { source: "/tarsacci.php", destination: "/about#retailers", permanent: true },
      { source: "/EQUINOX600800COMPLETE.php", destination: "/products/minelab-equinox-600-800-complete-shaft", permanent: true },
      { source: "/EQUINOXLOWERRODS.php", destination: "/detectors/minelab/equinox-600-800", permanent: true },
      { source: "/EQUINOX700900LOWERONLY.php", destination: "/detectors/minelab/equinox-700-900", permanent: true },
      { source: "/EQUINOXCOMPLETESHAFTcomingsoon.php", destination: "/detectors/minelab/equinox-600-800", permanent: true },
      { source: "/DEUSCOMPLETE.php", destination: "/products/xp-deus-ii-complete-shaft", permanent: true },
      { source: "/SCOOPHANDLES.php", destination: "/sand-scoop-handles", permanent: true },
      { source: "/GARRETTLOWER.php", destination: "/products/garrett-at-ace-two-piece-shaft", permanent: true },
    ];
  },
};

export default nextConfig;
