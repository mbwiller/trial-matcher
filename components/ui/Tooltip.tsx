"use client";

import type { ReactNode } from "react";
import { cn } from "./cn";

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom";
  /** Horizontal anchoring. Use "end" for triggers near the right edge of the viewport. */
  align?: "center" | "end";
  className?: string;
}

/** Lightweight hover tooltip for short hints. For quotes use EvidencePopover. */
export function Tooltip({ content, children, side = "top", align = "center", className }: TooltipProps) {
  return (
    <span className={cn("group/tip relative inline-flex", className)}>
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-40 w-max max-w-[240px] rounded-[10px] bg-ink-900 px-2.5 py-1.5 text-[12px] leading-snug text-white shadow-float",
          align === "center" ? "left-1/2 -translate-x-1/2" : "right-0",
          "opacity-0 transition-[opacity,transform] duration-150 ease-out-quart group-hover/tip:opacity-100 group-focus-within/tip:opacity-100",
          side === "top"
            ? "bottom-full mb-2 translate-y-0.5 group-hover/tip:translate-y-0"
            : "top-full mt-2 -translate-y-0.5 group-hover/tip:translate-y-0",
        )}
      >
        {content}
      </span>
    </span>
  );
}
