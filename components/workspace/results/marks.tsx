import type { ReactNode } from "react";
import type { MatchTier } from "@/lib/types";
import { cn } from "@/components/ui";
import type { SplitCounts } from "../insights";
import { TIERS, TIER_DOT, TIER_SHORT } from "../labels";
import type { TierCounts } from "../store";

/**
 * Small data marks for the dashboard. Shared rules (see DESIGN.md §6):
 * thin marks, a 2px surface gap between touching segments, status color only
 * for verdicts, and a labeled count beside every mark so color is never the
 * only channel.
 */

interface Segment {
  key: string;
  value: number;
  className: string;
  label: string;
}

function StackedBar({ segments, className, label }: { segments: Segment[]; className?: string; label: string }) {
  const total = segments.reduce((n, s) => n + s.value, 0);
  const present = segments.filter((s) => s.value > 0);
  return (
    <div
      role="img"
      aria-label={`${label}: ${present.map((s) => `${s.value} ${s.label}`).join(", ") || "none"}`}
      className={cn("flex h-1.5 w-full gap-[2px]", className)}
    >
      {total === 0 ? (
        <span className="h-full w-full rounded-full bg-ink-100" />
      ) : (
        present.map((s) => (
          <span
            key={s.key}
            title={`${s.value} ${s.label}`}
            className={cn("h-full min-w-[3px] rounded-full", s.className)}
            style={{ flexGrow: s.value, flexBasis: 0 }}
          />
        ))
      )}
    </div>
  );
}

/** Criteria of one trial: met · open · blocking · not applicable. */
export function VerdictBar({ counts, className }: { counts: SplitCounts; className?: string }) {
  return (
    <StackedBar
      label="Criteria"
      className={className}
      segments={[
        { key: "met", value: counts.met, className: "bg-pass-500", label: "met" },
        { key: "open", value: counts.open, className: "bg-warn-500", label: "open" },
        { key: "blocked", value: counts.notMet + counts.excludes, className: "bg-fail-500", label: "blocking" },
        { key: "na", value: counts.notApplicable, className: "bg-ink-200", label: "not applicable" },
      ]}
    />
  );
}

/** Reviewed trials by tier. */
export function TierBar({ counts, className }: { counts: TierCounts; className?: string }) {
  return (
    <StackedBar
      label="Reviewed trials by tier"
      className={className}
      segments={TIERS.map((tier: MatchTier) => ({
        key: tier,
        value: counts[tier],
        className: TIER_DOT[tier],
        label: TIER_SHORT[tier].toLowerCase(),
      }))}
    />
  );
}

/** Stat tile: label, value, optional caption. `hero` marks the one figure the view leads with. */
export function Stat({
  label,
  value,
  caption,
  hero = false,
  className,
  children,
}: {
  label: string;
  value: ReactNode;
  caption?: ReactNode;
  hero?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="truncate text-[12px] font-medium tracking-[0.01em] text-ink-500">{label}</div>
      <div
        className={cn(
          "mt-1 font-semibold leading-none tracking-[-0.025em] text-ink-900",
          hero ? "text-[40px]" : "text-[26px]",
        )}
      >
        {value}
      </div>
      {caption && <div className="mt-1.5 truncate text-[12px] text-ink-400">{caption}</div>}
      {children}
    </div>
  );
}
