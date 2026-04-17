"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Icon } from "@/components/ui/Icon";
import { MegaMenu } from "./MegaMenu";
import { MobileDrawer } from "./MobileDrawer";
import { useCart } from "@/components/cart/CartProvider";

type MegaKind = "detector" | "products" | null;

export function Nav() {
  const [mega, setMega] = useState<MegaKind>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { itemCount, openCart, openSearch } = useCart();
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-ink-line text-bg"
      style={{ background: "#0A0B10" }}
    >
      <div
        className="mx-auto flex items-center gap-6"
        style={{ maxWidth: 1440, padding: "0 24px", height: 72 }}
      >
        <Link href="/" className="flex items-center gap-2.5">
          <div
            className="flex items-center justify-center font-extrabold text-ink"
            style={{
              width: 36,
              height: 36,
              background: "#B8452F",
              fontSize: 18,
              letterSpacing: "-0.02em",
            }}
            aria-hidden
          >
            S
          </div>
          <div>
            <div className="font-bold text-[15px] leading-none tracking-[-0.01em]">
              Steve&apos;s Detector Rods
            </div>
            <div
              className="mt-1 font-mono text-[9px] uppercase"
              style={{
                color: "#888",
                letterSpacing: "0.1em",
              }}
            >
              Est. 2018 · Norman, OK
            </div>
          </div>
        </Link>

        <nav className="hidden ml-auto items-center gap-1 md:flex">
          <NavItem
            label="Shop by Detector"
            hasMega
            onMouseEnter={() => setMega("detector")}
            active={mega === "detector"}
          />
          <NavItem
            label="Products"
            hasMega
            onMouseEnter={() => setMega("products")}
            active={mega === "products"}
          />
          <NavItem
            label="CarbonPro"
            href="/carbonpro"
            active={pathname === "/carbonpro"}
          />
          <NavItem
            label="Find Your Shaft"
            href="/find-your-shaft"
            accent
            active={pathname === "/find-your-shaft"}
          />
          <NavItem label="About" href="/about" active={pathname === "/about"} />
          <NavItem label="Blog" href="/blog" active={pathname?.startsWith("/blog") ?? false} />
        </nav>

        <div className="flex items-center gap-1 md:ml-2">
          <IconBtn onClick={openSearch} aria-label="Search">
            <Icon name="search" size={18} />
          </IconBtn>
          <IconBtn onClick={openCart} aria-label="Open cart">
            <Icon name="cart" size={18} />
            {itemCount > 0 && (
              <span
                className="absolute rounded-[8px] font-bold text-center"
                style={{
                  top: 6,
                  right: 4,
                  background: "#B8452F",
                  color: "#0A0B10",
                  fontSize: 10,
                  padding: "1px 5px",
                  minWidth: 16,
                }}
              >
                {itemCount}
              </span>
            )}
          </IconBtn>
          <IconBtn className="md:hidden" onClick={() => setMobileOpen(true)} aria-label="Open menu">
            <Icon name="menu" size={18} />
          </IconBtn>
        </div>
      </div>

      {mega && (
        <div onMouseLeave={() => setMega(null)}>
          <MegaMenu kind={mega} onNavigate={() => setMega(null)} />
        </div>
      )}

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

interface NavItemProps {
  label: string;
  href?: string;
  hasMega?: boolean;
  accent?: boolean;
  active?: boolean;
  onMouseEnter?: () => void;
  onClick?: () => void;
}

function NavItem({ label, href, hasMega, accent, active, onMouseEnter, onClick }: NavItemProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) onClick();
    else if (href) router.push(href);
  };

  const content = (
    <div
      onMouseEnter={hasMega ? onMouseEnter : undefined}
      onClick={handleClick}
      className={clsx(
        "flex items-center gap-1.5 font-medium uppercase cursor-pointer relative",
        "text-[12px] tracking-[0.08em]",
        "px-3.5 py-2.5"
      )}
      style={{
        color: accent ? "#B8452F" : active ? "#fff" : "#CDCBBF",
        borderBottom: active ? "2px solid #B8452F" : "2px solid transparent",
      }}
    >
      {label}
      {hasMega && <Icon name="chev" size={12} />}
    </div>
  );

  if (href && !hasMega) {
    return (
      <Link href={href} prefetch={false}>
        {content}
      </Link>
    );
  }
  return content;
}

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

function IconBtn({ children, className, ...rest }: IconBtnProps) {
  return (
    <button
      {...rest}
      className={clsx(
        "relative inline-flex items-center justify-center cursor-pointer bg-transparent border-none text-bg",
        className
      )}
      style={{ width: 40, height: 40 }}
    >
      {children}
    </button>
  );
}
