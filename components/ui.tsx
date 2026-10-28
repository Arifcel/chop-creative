import type { CSSProperties, ReactNode } from "react";

const pillBase =
  "inline-flex items-center gap-2.5 whitespace-nowrap rounded-full border-[1.5px] px-7 py-4 text-[17px] font-semibold transition-[background-color,color,border-color,rotate] duration-200 hover:-rotate-2 hover:no-underline";

const pillVariants = {
  dark: "border-black bg-black text-cream hover:bg-lime hover:text-black",
  lime: "border-lime bg-lime text-black hover:border-cream hover:bg-cream",
};

export function Pill({
  href,
  variant = "dark",
  children,
}: {
  href: string;
  variant?: keyof typeof pillVariants;
  children: ReactNode;
}) {
  return (
    <a href={href} className={`${pillBase} ${pillVariants[variant]}`}>
      {children}
    </a>
  );
}

// Draggable sticker. Rotation lives in inline transform because <Effects /> rewrites it while dragging.
export function Sticker({
  name,
  rot,
  className = "",
  style,
}: {
  name: string;
  rot: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/assets/chomp-${name}.png`}
      alt=""
      data-drag
      data-rot={rot}
      draggable={false}
      className={`z-[5] h-auto cursor-grab touch-none select-none ${className}`}
      style={{ transform: `rotate(${rot}deg)`, ...style }}
    />
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`text-sm font-semibold uppercase tracking-[.06em] ${className}`}>{children}</div>
  );
}

export function ImagePlaceholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center border-[1.5px] border-dashed border-current/30 bg-current/5 p-6 text-center text-sm font-medium opacity-80 ${className}`}
    >
      {label}
    </div>
  );
}

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Chop Shop", href: "#services" },
  { label: "Yappy Hour", href: "#" },
  { label: "Contact", href: "#contact" },
];
