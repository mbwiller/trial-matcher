"use client";

import { useId, useState, type ReactNode } from "react";
import { Quote } from "lucide-react";
import type { Evidence } from "@/lib/types";
import { cn } from "./cn";

export interface EvidencePopoverProps {
  evidence: Evidence[];
  /** Custom trigger; defaults to a small quote icon button. */
  trigger?: ReactNode;
  align?: "left" | "right";
  /** Fires when the popover opens/closes so the record pane can highlight the span. */
  onActiveChange?: (active: boolean) => void;
  className?: string;
  label?: string;
}

/**
 * Hover/focus popover that shows the verbatim quote(s) backing a value or verdict.
 * Pure CSS/React — no positioning library. Use `align="right"` near the right edge.
 */
export function EvidencePopover({
  evidence,
  trigger,
  align = "left",
  onActiveChange,
  className,
  label = "Show evidence",
}: EvidencePopoverProps) {
  const id = useId();
  const [open, setOpen] = useState(false);
  if (!evidence || evidence.length === 0) return null;

  const set = (v: boolean) => {
    setOpen(v);
    onActiveChange?.(v);
  };

  return (
    <span
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => set(true)}
      onMouseLeave={() => set(false)}
      onFocus={() => set(true)}
      onBlur={() => set(false)}
    >
      {trigger ?? (
        <button
          type="button"
          aria-label={label}
          aria-describedby={open ? id : undefined}
          className={cn(
            "inline-flex size-6 items-center justify-center rounded-[7px] text-ink-300 transition-colors",
            "hover:bg-accent-50 hover:text-accent-700 focus-visible:text-accent-700",
            open && "bg-accent-50 text-accent-700",
          )}
        >
          <Quote className="size-3.5" aria-hidden />
        </button>
      )}
      <span
        id={id}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute top-full z-40 mt-2 w-[320px] max-w-[80vw] rounded-card p-3.5 glass-strong shadow-float",
          "transition-[opacity,transform] duration-200 ease-out-quart",
          align === "left" ? "left-0 origin-top-left" : "right-0 origin-top-right",
          open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
        )}
      >
        <span className="eyebrow mb-2 block">From the record</span>
        <span className="flex flex-col gap-2.5">
          {evidence.map((e, i) => (
            <span key={i} className="block border-l-2 border-accent-300 pl-3">
              <span className="block text-[13px] leading-relaxed text-ink-800">“{e.quote}”</span>
              {e.source && (
                <span className="mt-1 block text-[11.5px] text-ink-400">{e.source}</span>
              )}
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
