"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "./cn";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name — required because the button has no visible text. */
  label: string;
  size?: "sm" | "md";
  active?: boolean;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, size = "md", active = false, className, children, type = "button", ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-[10px] text-ink-500",
        "transition-[background-color,color,transform] duration-150 ease-out-quart active:translate-y-px",
        "hover:bg-ink-900/[0.05] hover:text-ink-900 disabled:pointer-events-none disabled:opacity-40",
        size === "sm" ? "size-8 [&_svg]:size-4" : "size-9 [&_svg]:size-[18px]",
        active && "bg-accent-100 text-accent-800 hover:bg-accent-100 hover:text-accent-900",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
});
