import { SVGProps } from "react";

export type IconName =
  | "search"
  | "cart"
  | "chev"
  | "chevR"
  | "chevL"
  | "close"
  | "menu"
  | "check"
  | "filter"
  | "plus"
  | "minus"
  | "star"
  | "arrowR"
  | "tool"
  | "shield"
  | "usa"
  | "truck"
  | "fb"
  | "yt"
  | "ig";

interface IconProps extends Omit<SVGProps<SVGSVGElement>, "name"> {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

export function Icon({ name, size = 16, color = "currentColor", className, ...rest }: IconProps) {
  const paths: Record<IconName, React.ReactNode> = {
    search: (
      <>
        <circle cx="11" cy="11" r="6" />
        <path d="M20 20l-4-4" />
      </>
    ),
    cart: (
      <>
        <path d="M3 4h2l2 12h12l2-8H6" />
        <circle cx="9" cy="20" r="1.5" />
        <circle cx="17" cy="20" r="1.5" />
      </>
    ),
    chev: <path d="M6 9l6 6 6-6" />,
    chevR: <path d="M9 6l6 6-6 6" />,
    chevL: <path d="M15 6l-6 6 6 6" />,
    close: (
      <>
        <path d="M6 6l12 12" />
        <path d="M6 18L18 6" />
      </>
    ),
    menu: (
      <>
        <path d="M3 6h18" />
        <path d="M3 12h18" />
        <path d="M3 18h18" />
      </>
    ),
    check: <path d="M5 12l4 4 10-10" />,
    filter: (
      <>
        <path d="M3 5h18" />
        <path d="M6 12h12" />
        <path d="M10 19h4" />
      </>
    ),
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    star: <path d="M12 3l2.5 6.5L21 10l-5 4.5L17.5 21 12 17.5 6.5 21 8 14.5 3 10l6.5-0.5z" />,
    arrowR: (
      <>
        <path d="M5 12h14" />
        <path d="M13 5l7 7-7 7" />
      </>
    ),
    tool: <path d="M14 4l6 6-10 10H4v-6z" />,
    shield: <path d="M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z" />,
    usa: (
      <>
        <path d="M4 5h16v14H4z" />
        <path d="M4 9h16" />
        <path d="M4 13h16" />
        <path d="M4 17h16" />
      </>
    ),
    truck: (
      <>
        <path d="M3 7h11v9H3z" />
        <path d="M14 10h4l3 3v3h-7" />
        <circle cx="7" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
      </>
    ),
    fb: <path d="M14 7h3V4h-3c-2 0-3 1.5-3 3.5V10H9v3h2v8h3v-8h2.5L17 10h-3V8c0-0.7 0.3-1 1-1z" />,
    yt: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="3" />
        <path d="M10 9l6 3-6 3z" fill={color} />
      </>
    ),
    ig: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4" />
        <circle cx="12" cy="12" r="3.5" />
        <circle cx="17" cy="7" r="0.8" fill={color} />
      </>
    ),
  };

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: "inline-block", flexShrink: 0 }}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
