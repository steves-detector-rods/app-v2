"use client";

import Script from "next/script";
import { SNIPCART_JS_URL, SNIPCART_VERSION } from "@/lib/snipcart";

const SNIPCART_KEY = process.env.NEXT_PUBLIC_SNIPCART_API_KEY ?? "";

interface SnipcartSettings {
  publicApiKey: string;
  modalStyle: "side" | "media";
  version: string;
}

declare global {
  interface Window {
    SnipcartSettings?: SnipcartSettings;
  }
}

// Snipcart reads its config from `window.SnipcartSettings` and warns when it's
// missing; the legacy `<div data-api-key>` attributes are deprecated. The global
// has to exist before snipcart.js runs, and assigning it here — at client-module
// scope — happens during hydration, ahead of the afterInteractive script below.
//
// Doing it this way rather than via an inline <script> is deliberate: rendering
// a script tag from JSX trips React 19's "Encountered a script tag while
// rendering" error, which is what forced the earlier revert to data attributes.
if (typeof window !== "undefined" && SNIPCART_KEY) {
  window.SnipcartSettings = {
    publicApiKey: SNIPCART_KEY,
    modalStyle: "side",
    version: SNIPCART_VERSION,
  };
}

/**
 * Boots Snipcart. Renders nothing when no API key is configured, so preview
 * deploys without the env var come up clean instead of erroring.
 */
export function SnipcartLoader() {
  if (!SNIPCART_KEY) return null;

  return (
    <>
      <Script async src={SNIPCART_JS_URL} strategy="afterInteractive" />
      <div hidden id="snipcart" />
    </>
  );
}
