import clsx from "clsx";
import { HTMLAttributes } from "react";

interface CompatTagProps extends HTMLAttributes<HTMLSpanElement> {
  small?: boolean;
}

export function CompatTag({ small = false, className, children, onClick, ...rest }: CompatTagProps) {
  return (
    <span
      {...rest}
      onClick={onClick}
      className={clsx(
        "inline-block font-mono tracking-[0.04em] border border-border bg-surface-alt text-text-muted",
        small ? "px-2 py-[3px] text-[10px]" : "px-2.5 py-1 text-[11px]",
        onClick ? "cursor-pointer" : "cursor-default",
        className
      )}
    >
      {children}
    </span>
  );
}
