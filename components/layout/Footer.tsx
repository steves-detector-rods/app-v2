import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { NewsletterForm } from "@/components/home/NewsletterForm";

interface FooterColProps {
  title: string;
  items: Array<[string, string]>;
}

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div>
      <div
        className="font-semibold text-[13px] uppercase mb-4 text-bg"
        style={{ letterSpacing: "0.1em" }}
      >
        {title}
      </div>
      <div className="flex flex-col gap-2.5">
        {items.map(([label, href]) => (
          <Link
            key={label}
            href={href}
            prefetch={false}
            className="text-[13px]"
            style={{ color: "#888" }}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer
      className="mt-30 text-bg"
      style={{ background: "#0A0B10", color: "#CDCBBF", marginTop: 120 }}
    >
      <div className="mx-auto" style={{ maxWidth: 1440, padding: "64px 24px 20px" }}>
        <div
          className="grid gap-12 pb-12 border-b border-ink-line"
          style={{ gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1.4fr" }}
        >
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div
                className="flex items-center justify-center font-extrabold text-ink"
                style={{
                  width: 36,
                  height: 36,
                  background: "#B8452F",
                  fontSize: 18,
                }}
                aria-hidden
              >
                S
              </div>
              <div className="font-bold text-[15px] text-bg">Steve&apos;s Detector Rods</div>
            </div>
            <p
              className="text-[13px] mb-5"
              style={{ color: "#888", lineHeight: 1.6, maxWidth: 300 }}
            >
              Precision-built carbon-fiber and glass-fiber shafts, hand-assembled in Norman, Oklahoma since 2018.
            </p>
            <div className="flex gap-2.5">
              {(["fb", "yt", "ig"] as const).map((s) => (
                <a
                  key={s}
                  href="#"
                  aria-label={s}
                  className="flex items-center justify-center border border-ink-line-soft"
                  style={{ width: 32, height: 32, color: "#888" }}
                >
                  <Icon name={s} size={14} />
                </a>
              ))}
            </div>
          </div>
          <FooterCol
            title="Shop"
            items={[
              ["Complete Shafts", "/products?type=complete-shaft"],
              ["Lower Rods", "/products?type=lower-rod"],
              ["Two-Piece Lowers", "/products?type=two-piece"],
              ["Scoop Handles", "/products?type=scoop-handle"],
              ["Accessories", "/products?type=accessory"],
              ["Glass-Fiber", "/products?material=glass-fiber"],
            ]}
          />
          <FooterCol
            title="Shop by Brand"
            items={[
              ["Minelab", "/detectors/minelab"],
              ["Garrett", "/detectors/garrett"],
              ["XP", "/detectors/xp"],
              ["Tarsacci", "/detectors/tarsacci"],
            ]}
          />
          <FooterCol
            title="Information"
            items={[
              ["About", "/about"],
              ["FAQ", "/faq"],
              ["Blog", "/blog"],
              ["Contact", "/contact"],
              ["Custom Orders", "/contact"],
              ["Shipping & Returns", "/policies/shipping"],
            ]}
          />
          <div>
            <div
              className="font-semibold text-[13px] uppercase mb-4 text-bg"
              style={{ letterSpacing: "0.1em" }}
            >
              Newsletter
            </div>
            <p
              className="text-[13px] mb-3"
              style={{ color: "#888", lineHeight: 1.6 }}
            >
              New builds, drops, and detecting tips. No spam — maybe monthly.
            </p>
            <NewsletterForm inFooter />
          </div>
        </div>
        <div
          className="flex flex-wrap justify-between items-center pt-5 font-mono text-[11px]"
          style={{ color: "#555", letterSpacing: "0.05em" }}
        >
          <div>© 2018–2026 Steve&apos;s Detector Rods · All rights reserved</div>
          <div className="flex gap-4 items-center">
            <span>VISA</span>
            <span>MC</span>
            <span>AMEX</span>
            <span>PAYPAL</span>
            <span>APPLE PAY</span>
            <span style={{ color: "#888" }}>· Assembled in the USA</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
