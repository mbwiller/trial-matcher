import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/components/ui";

/**
 * A navigation link styled exactly like the `Button` primitive.
 *
 * `Button` renders a <button> and has no `href`/`asChild` form, and nesting a
 * <button> inside <a> is invalid markup with two tab stops. So the landing page
 * mirrors the primitive's classes on a real <Link>. Keep the three tables below
 * in sync with components/ui/Button.tsx.
 */
export type ButtonLinkVariant = "primary" | "secondary" | "ghost";
export type ButtonLinkSize = "sm" | "md" | "lg";

const BASE =
  "inline-flex select-none items-center justify-center whitespace-nowrap rounded-chip font-medium tracking-[-0.005em] " +
  "transition-[transform,background-color,box-shadow,color] duration-200 ease-out-quart active:translate-y-px";

const VARIANT: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-accent-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(11,18,32,0.14),0_0_0_1px_rgba(11,110,98,0.32)] hover:bg-accent-700 focus-visible:outline-accent-500",
  secondary: "glass-strong text-ink-800 hover:bg-white/90 hover:text-ink-900",
  ghost: "text-ink-600 hover:bg-ink-900/[0.05] hover:text-ink-900",
};

const SIZE: Record<ButtonLinkSize, string> = {
  sm: "h-8 px-3 text-[13px] gap-1.5 [&_svg]:size-3.5",
  md: "h-10 px-4 text-[14px] gap-2 [&_svg]:size-4",
  lg: "h-12 px-6 text-[15px] gap-2 [&_svg]:size-4",
};

export function buttonClasses(
  variant: ButtonLinkVariant = "primary",
  size: ButtonLinkSize = "md",
  className?: string,
): string {
  return cn(BASE, VARIANT[variant], SIZE[size], className);
}

export interface ButtonLinkProps extends Omit<ComponentProps<typeof Link>, "className"> {
  variant?: ButtonLinkVariant;
  size?: ButtonLinkSize;
  icon?: ReactNode;
  iconRight?: ReactNode;
  className?: string;
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  className,
  children,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...rest}>
      {icon}
      {children}
      {iconRight}
    </Link>
  );
}
