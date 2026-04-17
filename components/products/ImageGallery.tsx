"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { WeavePlaceholder } from "@/components/ui/WeavePlaceholder";
import type { ColorSlug } from "@/types/product";

interface ImageGalleryProps {
  sku: string;
  color: ColorSlug;
  showGrip?: boolean;
}

export function ImageGallery({ sku, color, showGrip = false }: ImageGalleryProps) {
  // Placeholder views — in real use these would come from product.images[]
  const views: ColorSlug[] = [color, "black", color, "black"];
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div>
      <div
        className="bg-ink-soft border border-border cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        aria-label="Open image in lightbox"
      >
        <WeavePlaceholder
          color={views[active]}
          aspect="1/1"
          showGrip={showGrip}
          label={`${sku} · VIEW ${active + 1}`}
        />
      </div>
      <div
        className="grid grid-cols-4 mt-2"
        style={{ gap: 8 }}
      >
        {views.map((c, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`View ${i + 1}`}
            className="cursor-pointer bg-transparent p-0"
            style={{
              border: i === active ? "2px solid #B8452F" : "1px solid #E3E1D6",
            }}
          >
            <WeavePlaceholder color={c} aspect="1/1" showGrip={showGrip} />
          </button>
        ))}
      </div>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={active}
        on={{ view: ({ index }) => setActive(index) }}
        // Lightbox needs URLs; placeholder SVG data URIs wouldn't lightbox well,
        // so we fall back to a uniform transparent pixel + rely on the main view.
        slides={views.map(() => ({
          src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyIDIiLz4=",
        }))}
        render={{
          slide: () => (
            <div
              style={{
                width: "min(90vw, 900px)",
                maxHeight: "90vh",
                margin: "0 auto",
              }}
            >
              <WeavePlaceholder
                color={views[active]}
                aspect="1/1"
                showGrip={showGrip}
                label={`${sku} · ENLARGED`}
              />
            </div>
          ),
        }}
      />
    </div>
  );
}
