import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type Variant = "primary" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-3 overflow-hidden whitespace-nowrap font-sans font-semibold uppercase transition-[background-color,color,border-color,transform] duration-300 ease-[var(--ease-premium)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-ink hover:bg-bone",
  ghost: "border border-bone/25 text-bone hover:border-bone hover:bg-bone hover:text-ink",
  light: "bg-bone text-ink hover:bg-accent",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-6 text-[0.75rem] tracking-[0.08em]",
  lg: "h-14 px-7 text-[0.75rem] tracking-[0.08em] sm:px-8",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "lg", extra = "") {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`;
}

function Arrow({ diagonal }: { diagonal?: boolean }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return (
    <span className="relative -mr-1 flex h-4 w-4 shrink-0 overflow-hidden" aria-hidden="true">
      <Icon
        className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:translate-x-[140%]"
        strokeWidth={2}
      />
      <Icon
        className="absolute inset-0 h-4 w-4 -translate-x-[140%] transition-transform duration-500 ease-[var(--ease-premium)] group-hover/btn:translate-x-0"
        strokeWidth={2}
      />
    </span>
  );
}

type CommonProps = {
  variant?: Variant;
  size?: Size;
  arrow?: boolean | "diagonal";
  children: ReactNode;
  className?: string;
};

export function ButtonLink({
  variant = "primary",
  size = "lg",
  arrow = false,
  children,
  className = "",
  ...rest
}: CommonProps & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow diagonal={arrow === "diagonal"} />}
    </a>
  );
}

export function Button({
  variant = "primary",
  size = "lg",
  arrow = false,
  children,
  className = "",
  ...rest
}: CommonProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      <span>{children}</span>
      {arrow && <Arrow diagonal={arrow === "diagonal"} />}
    </button>
  );
}
