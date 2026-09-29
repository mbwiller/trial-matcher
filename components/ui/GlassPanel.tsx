import type { ElementType, HTMLAttributes } from "react";
import { cn } from "./cn";

export interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  /** Surface strength. `soft` is for cards nested inside another glass panel. */
  variant?: "default" | "strong" | "soft";
  padding?: "none" | "sm" | "md" | "lg";
  /** `panel` = 24px radius, `card` = 16px radius. */
  size?: "panel" | "card";
  /** Adds a specular top gradient. Hero panels only. */
  sheen?: boolean;
  /** Lifts on hover (cards in lists). */
  interactive?: boolean;
  as?: ElementType;
}

const VARIANT = {
  default: "glass",
  strong: "glass-strong",
  soft: "glass-soft",
} as const;

const PADDING = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
} as const;

export function GlassPanel({
  variant = "default",
  padding = "md",
  size = "panel",
  sheen = false,
  interactive = false,
  as,
  className,
  children,
  ...rest
}: GlassPanelProps) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cn(
        VARIANT[variant],
        size === "panel" ? "rounded-panel" : "rounded-card",
        PADDING[padding],
        sheen && "glass-sheen",
        interactive &&
          "transition-[transform,box-shadow] duration-200 ease-out-quart hover:-translate-y-px hover:shadow-float",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
