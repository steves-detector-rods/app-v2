"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "dark"
  | "ghost"
  | "onDark"
  | "outlineOnDark";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  full?: boolean;
  small?: boolean;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-ink border border-accent hover:bg-accent-hover hover:border-accent-hover",
  secondary:
    "bg-transparent text-text border border-border hover:border-accent hover:text-accent",
  dark: "bg-ink text-bg border border-ink hover:bg-ink-soft",
  ghost: "bg-transparent text-accent border border-transparent underline underline-offset-[3px]",
  onDark: "bg-accent text-ink border border-accent hover:bg-accent-hover",
  outlineOnDark:
    "bg-transparent text-bg border border-white/40 hover:border-accent hover:text-accent",
};

export function Button({
  variant = "primary",
  full = false,
  small = false,
  className,
  disabled,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(
        "inline-flex items-center justify-center gap-2 font-semibold uppercase tracking-meta font-sans transition-colors duration-150",
        small ? "text-xs py-2 px-3.5" : "text-[13px] py-3.5 px-5.5",
        full ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
        variantClasses[variant],
        className
      )}
      style={{ padding: small ? "8px 14px" : "14px 22px" }}
    >
      {children}
    </button>
  );
}
