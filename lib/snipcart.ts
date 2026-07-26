import type { ColorSlug, Product } from "@/types/product";

/** Pinned Snipcart theme version. The CSS and JS URLs must stay in lockstep. */
export const SNIPCART_VERSION = "3.6.1";
export const SNIPCART_CSS_URL = `https://cdn.snipcart.com/themes/v${SNIPCART_VERSION}/default/snipcart.css`;
export const SNIPCART_JS_URL = `https://cdn.snipcart.com/themes/v${SNIPCART_VERSION}/default/snipcart.js`;

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export interface SnipcartSelection {
  color: ColorSlug;
  length: "standard" | "tall-man";
  customLen?: string;
  qty?: number;
}

/**
 * Build the set of `data-*` attributes for a Snipcart add-to-cart button,
 * keyed off a product + the user's currently-selected variant options.
 *
 * We express color and length upcharges as Snipcart *option price modifiers*
 * (e.g. "Red[+20]") so that `data-item-price` is always the product's base
 * price. That lets Snipcart's server-side price validation succeed no matter
 * which variant the user ultimately picks — it re-fetches the canonical PDP
 * URL, finds this button by its `data-item-id`, and matches the base price.
 */
export function productToSnipcartAttrs(
  product: Product,
  selection: SnipcartSelection
): Record<string, string | number> {
  const { color, length, customLen, qty = 1 } = selection;
  const colorUpcharge = product.priceTo - product.priceFrom;

  const colorOptions = product.colors
    .map((c) => {
      const label = capitalize(c);
      if (c === "black" || c === "white" || colorUpcharge === 0) return label;
      return `${label}[+${colorUpcharge}]`;
    })
    .join("|");

  const attrs: Record<string, string | number> = {
    "data-item-id": product.sku,
    "data-item-name": product.name,
    "data-item-price": product.priceFrom.toFixed(2),
    "data-item-url": `/products/${product.slug}`,
    "data-item-description": product.blurb ?? product.shortName,
    "data-item-image": product.images?.[0]?.src ?? "",
    "data-item-quantity": qty,
  };

  if (product.colors.length > 1) {
    attrs["data-item-custom1-name"] = "Color";
    attrs["data-item-custom1-options"] = colorOptions;
    attrs["data-item-custom1-value"] = capitalize(color);
  }

  const surcharge = product.customLengthSurcharge ?? 5;
  if (product.customLengthAvailable) {
    attrs["data-item-custom2-name"] = "Length";
    attrs["data-item-custom2-options"] =
      surcharge > 0 ? `Standard|Tall Man[+${surcharge}]` : "Standard|Tall Man";
    attrs["data-item-custom2-value"] = length === "tall-man" ? "Tall Man" : "Standard";

    // Custom-inches only when Tall Man is selected
    if (length === "tall-man" && customLen) {
      attrs["data-item-custom3-name"] = "Custom length (inches)";
      attrs["data-item-custom3-type"] = "textarea";
      attrs["data-item-custom3-required"] = "false";
      attrs["data-item-custom3-value"] = customLen;
    }
  }

  return attrs;
}

/**
 * Compute the user-visible "display price" for the PDP Add-to-Cart label. This
 * mirrors Snipcart's own server-side calculation so the on-screen number always
 * matches what appears in the Snipcart cart drawer.
 */
export function computeDisplayPrice(product: Product, selection: SnipcartSelection): number {
  const { color, length, qty = 1 } = selection;
  const colorUpcharge =
    color === "black" || color === "white" ? 0 : product.priceTo - product.priceFrom;
  const lengthSurcharge =
    product.customLengthAvailable && length === "tall-man"
      ? product.customLengthSurcharge ?? 5
      : 0;
  return (product.priceFrom + colorUpcharge + lengthSurcharge) * qty;
}
