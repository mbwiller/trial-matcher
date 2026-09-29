import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export type BadgeTone = "neutral" | "accent" | "pass" | "fail" | "warn" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  /** Leading status dot. */
  dot?: boolean;
  /** Monospace + tabular numerals (ids, dates). */
  mono?: boolean;
  size?: "sm" | "md";
}

const TONE = {
  neutral: "bg-ink-900/[0.05] text-ink-600",
  accent: "bg-accent-100 text-accent-800",
  pass: "bg-pass-100 text-pass-700",
  fail: "bg-fail-100 text-fail-700",
  warn: "bg-warn-100 text-warn-700",
  info: "bg-info-100 text-info-700",
} as const;

export function Badge({
  tone = "neutral",
  dot = false,
  mono = false,
  size = "md",
  className,
  children,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-chip font-medium leading-none",
        size === "md" ? "h-[22px] px-2 text-[11.5px]" : "h-[18px] px-1.5 text-[10.5px]",
        mono ? "font-mono tnum tracking-normal" : "tracking-[0.01em]",
        TONE[tone],
        className,
      )}
      {...rest}
    >
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-current opacity-80" />}
      {children}
    </span>
  );
}
