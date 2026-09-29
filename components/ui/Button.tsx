"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "./cn";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger-ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

const VARIANT = {
  primary:
    "bg-accent-600 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_1px_2px_rgba(11,18,32,0.14),0_0_0_1px_rgba(11,110,98,0.32)] hover:bg-accent-700 focus-visible:outline-accent-500",
  secondary:
    "glass-strong text-ink-800 hover:bg-white/90 hover:text-ink-900",
  ghost: "text-ink-600 hover:bg-ink-900/[0.05] hover:text-ink-900",
  "danger-ghost": "text-fail-700 hover:bg-fail-50",
} as const;

const SIZE = {
  sm: "h-8 px-3 text-[13px] gap-1.5 [&_svg]:size-3.5",
  md: "h-10 px-4 text-[14px] gap-2 [&_svg]:size-4",
  lg: "h-12 px-6 text-[15px] gap-2 [&_svg]:size-4",
} as const;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    icon,
    iconRight,
    loading = false,
    className,
    children,
    disabled,
    type = "button",
    ...rest
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        "inline-flex select-none items-center justify-center whitespace-nowrap rounded-chip font-medium tracking-[-0.005em]",
        "transition-[transform,background-color,box-shadow,color] duration-200 ease-out-quart",
        "active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
        VARIANT[variant],
        SIZE[size],
        className,
      )}
      {...rest}
    >
      {loading ? <Loader2 className="animate-spin" aria-hidden /> : icon}
      {children}
      {!loading && iconRight}
    </button>
  );
});
