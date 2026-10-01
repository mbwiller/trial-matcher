"use client";

import type { ReactNode } from "react";
import { cn } from "./cn";

export interface ToggleProps {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

/** Small accessible switch with its label. */
export function Toggle({ label, checked, onChange, className }: ToggleProps) {
  return (
    <label className={cn("flex cursor-pointer select-none items-center gap-2 text-[13px] text-ink-700", className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative h-[18px] w-8 shrink-0 rounded-chip transition-colors duration-200 ease-out-quart",
          checked ? "bg-accent-600" : "bg-ink-200 hover:bg-ink-300",
        )}
      >
        <span
          aria-hidden
          className={cn(
            "absolute left-[2px] top-[2px] size-3.5 rounded-full bg-white shadow-[0_1px_2px_rgba(11,18,32,0.2)]",
            "transition-transform duration-200 ease-out-quart",
            checked && "translate-x-[14px]",
          )}
        />
      </button>
      <span>{label}</span>
    </label>
  );
}
