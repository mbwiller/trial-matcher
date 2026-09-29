"use client";

import { Check } from "lucide-react";
import { cn } from "./cn";

export interface Step {
  key: string;
  label: string;
}

export interface StepperProps {
  steps: Step[];
  /** Index of the active step. */
  current: number;
  /** Highest index the user is allowed to jump to (defaults to `current`). */
  reachable?: number;
  onSelect?: (index: number) => void;
  className?: string;
}

export function Stepper({ steps, current, reachable, onSelect, className }: StepperProps) {
  const maxReach = reachable ?? current;
  return (
    <ol className={cn("flex items-center gap-1", className)} aria-label="Progress">
      {steps.map((step, i) => {
        const done = i < current;
        const active = i === current;
        const clickable = !!onSelect && i <= maxReach && i !== current;
        return (
          <li key={step.key} className="flex items-center">
            <button
              type="button"
              disabled={!clickable}
              onClick={() => clickable && onSelect?.(i)}
              aria-current={active ? "step" : undefined}
              className={cn(
                "group flex items-center gap-2 rounded-chip py-1 pl-1 pr-3 transition-colors duration-150",
                clickable && "hover:bg-ink-900/[0.04]",
                !clickable && "cursor-default",
              )}
            >
              <span
                className={cn(
                  "flex size-6 items-center justify-center rounded-full font-mono text-[11px] font-medium tnum transition-colors duration-200",
                  active && "bg-accent-600 text-white shadow-[0_0_0_3px_var(--color-accent-100)]",
                  done && "bg-accent-100 text-accent-800",
                  !active && !done && "bg-ink-100 text-ink-400",
                )}
              >
                {done ? <Check className="size-3.5" strokeWidth={2.5} aria-hidden /> : i + 1}
              </span>
              <span
                className={cn(
                  "text-[13px] font-medium tracking-[-0.005em] transition-colors",
                  active ? "text-ink-900" : done ? "text-ink-700" : "text-ink-400",
                )}
              >
                {step.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span
                aria-hidden
                className={cn(
                  "mx-1 h-px w-6 rounded-full transition-colors duration-300",
                  i < current ? "bg-accent-300" : "bg-ink-200",
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
