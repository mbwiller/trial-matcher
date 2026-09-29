import type { ReactNode } from "react";
import { GlassPanel, cn } from "@/components/ui";

export interface ActionBarProps {
  /** Left-hand copy (status or instruction). */
  message?: ReactNode;
  /** Right-hand actions. */
  children: ReactNode;
  className?: string;
}

/** Sticky bottom bar for the stage's primary action. */
export function ActionBar({ message, children, className }: ActionBarProps) {
  return (
    <div className={cn("sticky bottom-4 z-20 mx-auto mt-8 w-full max-w-[1180px]", className)}>
      <GlassPanel
        variant="strong"
        padding="none"
        className="flex flex-col gap-3 px-5 py-3 sm:flex-row sm:items-center sm:justify-between"
      >
        <div className="min-w-0 text-[14px] leading-snug text-ink-500">{message}</div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">{children}</div>
      </GlassPanel>
    </div>
  );
}
