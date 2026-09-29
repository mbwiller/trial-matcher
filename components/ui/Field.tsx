"use client";

import type { ReactNode } from "react";
import type { Confidence, Evidence } from "@/lib/types";
import { cn } from "./cn";
import { EvidencePopover } from "./EvidencePopover";

export interface FieldProps {
  label: string;
  value: ReactNode;
  confidence?: Confidence;
  evidence?: Evidence[];
  note?: string;
  mono?: boolean;
  /** Fires when the evidence popover opens/closes (highlight in the record pane). */
  onActiveChange?: (active: boolean) => void;
  className?: string;
  align?: "left" | "right";
}

const CONFIDENCE_DOT: Record<Confidence, { className: string; title: string } | null> = {
  high: null,
  medium: { className: "bg-ink-300", title: "Medium confidence — inferred from context" },
  low: { className: "bg-warn-500", title: "Low confidence — verify against the record" },
};

/** Label + value with provenance. The value stays plain; provenance lives in the icon. */
export function Field({
  label,
  value,
  confidence = "high",
  evidence,
  note,
  mono = false,
  onActiveChange,
  className,
  align = "left",
}: FieldProps) {
  const dot = CONFIDENCE_DOT[confidence];
  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center gap-1.5">
        <span className="text-[11.5px] font-medium tracking-[0.02em] text-ink-400">{label}</span>
        {dot && (
          <span
            aria-label={dot.title}
            title={dot.title}
            className={cn("inline-block size-1.5 rounded-full", dot.className)}
          />
        )}
      </div>
      <div className="mt-0.5 flex items-start gap-1">
        <div
          className={cn(
            "min-w-0 text-[14px] font-medium leading-snug text-ink-900",
            mono && "font-mono tnum font-normal",
          )}
        >
          {value}
        </div>
        {evidence && evidence.length > 0 && (
          <EvidencePopover
            evidence={evidence}
            align={align}
            onActiveChange={onActiveChange}
            className="-mt-0.5 shrink-0"
          />
        )}
      </div>
      {note && <div className="mt-0.5 text-[12px] leading-snug text-ink-400">{note}</div>}
    </div>
  );
}
