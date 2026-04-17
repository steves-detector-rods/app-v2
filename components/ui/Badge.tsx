import clsx from "clsx";
import { HTMLAttributes } from "react";

export type BadgeVariant = "default" | "accent" | "muted" | "carbonpro";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-ink text-bg",
  accent: "bg-accent text-ink",
  muted: "bg-surface-alt text-text-muted border border-border",
  carbonpro: "bg-carbonpro text-bg",
};

export function Badge({ variant = "default", className, children, ...rest }: BadgeProps) {
  return (
    <span
      {...rest}
      className={clsx(
        "inline-block px-2 py-0.5 text-[10px] font-semibold uppercase tracking-label",
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
