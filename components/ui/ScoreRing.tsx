import type { MatchTier } from "@/lib/types";
import { cn } from "./cn";

export interface ScoreRingProps {
  /** 0–100 */
  value: number;
  tier: MatchTier;
  size?: number;
  strokeWidth?: number;
  className?: string;
  /** Hide the number (e.g. inside dense rows). */
  hideValue?: boolean;
}

const STROKE: Record<MatchTier, string> = {
  strong: "var(--color-accent-500)",
  possible: "var(--color-warn-500)",
  unlikely: "var(--color-ink-300)",
  ineligible: "var(--color-fail-500)",
};

const TEXT: Record<MatchTier, string> = {
  strong: "text-accent-800",
  possible: "text-warn-700",
  unlikely: "text-ink-500",
  ineligible: "text-fail-700",
};

export function ScoreRing({
  value,
  tier,
  size = 44,
  strokeWidth = 3.5,
  className,
  hideValue = false,
}: ScoreRingProps) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  const r = (size - strokeWidth) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - v / 100);
  return (
    <div
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Match score ${v} of 100`}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-ink-100)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={STROKE[tier]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 600ms var(--ease-out-expo)" }}
        />
      </svg>
      {!hideValue && (
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center font-mono font-medium tnum",
            TEXT[tier],
          )}
          style={{ fontSize: Math.max(10, Math.round(size * 0.28)) }}
        >
          {v}
        </span>
      )}
    </div>
  );
}
