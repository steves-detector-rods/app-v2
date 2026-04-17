import { NextResponse, type NextRequest } from "next/server";
import { PRODUCT_ID_TO_SLUG } from "@/lib/legacy-redirects";

/**
 * Catches the old PHP site's `?id=<SKU>` URLs on /product.php and /product2.php
 * and issues a 301 to the new /products/[slug] route. `next.config.mjs` handles
 * all the path-based redirects; query-param matching isn't natively supported
 * in Next's redirects config, hence this middleware.
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/product.php" || pathname === "/product2.php") {
    const id = searchParams.get("id");
    if (id) {
      const slug = PRODUCT_ID_TO_SLUG[id];
      if (slug) {
        const url = request.nextUrl.clone();
        url.pathname = `/products/${slug}`;
        url.search = "";
        return NextResponse.redirect(url, 301);
      }
    }
    // Unknown id → fall back to all-products
    const url = request.nextUrl.clone();
    url.pathname = "/products";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product.php", "/product2.php"],
};
