"use client";

import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { Divider, Eyebrow, GlassPanel, cn } from "@/components/ui";
import type { MatchTier } from "@/lib/types";
import {
  defaultFilters,
  usePhaseOptions,
  useShortlistedCount,
  useTierCounts,
  useWorkspace,
  type SortKey,
} from "./store";
import { TIERS, TIER_DOT, TIER_SHORT } from "./labels";

/** Small accessible switch (no primitive exists for it yet). */
export function Toggle({
  label,
  checked,
  onChange,
}: {
  label: ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer select-none items-center justify-between gap-3 text-[13.5px] text-ink-700">
      <span>{label}</span>
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
    </label>
  );
}

function FilterChip({
  pressed,
  onClick,
  dotClass,
  count,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  dotClass?: string;
  count?: number;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-chip px-2.5 text-[12.5px] font-medium",
        "transition-[background-color,color,box-shadow] duration-150 ease-out-quart",
        pressed
          ? "bg-white/85 text-ink-800 hairline"
          : "text-ink-400 hover:bg-ink-900/[0.04] hover:text-ink-600",
      )}
    >
      {dotClass && (
        <span className={cn("size-1.5 rounded-full", dotClass, !pressed && "opacity-40")} aria-hidden />
      )}
      {children}
      {count !== undefined && (
        <span className={cn("font-mono text-[11px] tnum", pressed ? "text-ink-400" : "text-ink-300")}>
          {count}
        </span>
      )}
    </button>
  );
}

function GroupLabel({ children }: { children: ReactNode }) {
  return <div className="text-[11.5px] font-medium tracking-[0.02em] text-ink-400">{children}</div>;
}

export function Filters() {
  const filters = useWorkspace((s) => s.filters);
  const setFilters = useWorkspace((s) => s.setFilters);
  const resetFilters = useWorkspace((s) => s.resetFilters);
  const counts = useTierCounts();
  const phases = usePhaseOptions();
  const shortlisted = useShortlistedCount();

  const defaults = defaultFilters();
  const isDefault =
    TIERS.every((t) => filters.tiers[t]) &&
    filters.phases.length === 0 &&
    filters.hideIneligible === defaults.hideIneligible &&
    filters.sort === defaults.sort &&
    filters.onlyShortlisted === defaults.onlyShortlisted;

  const toggleTier = (tier: MatchTier) =>
    setFilters({ tiers: { ...filters.tiers, [tier]: !filters.tiers[tier] } });

  const togglePhase = (phase: string) =>
    setFilters({
      phases: filters.phases.includes(phase)
        ? filters.phases.filter((p) => p !== phase)
        : [...filters.phases, phase],
    });

  return (
    <GlassPanel as="section" aria-label="Filters" padding="none" className="p-5">
      <div className="flex items-center justify-between">
        <Eyebrow>Filters</Eyebrow>
        {!isDefault && (
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-md text-[12px] font-medium text-accent-700 transition-colors hover:text-accent-800"
          >
            Reset
          </button>
        )}
      </div>

      <div className="mt-4">
        <GroupLabel>Tier</GroupLabel>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {TIERS.map((tier) => (
            <FilterChip
              key={tier}
              pressed={filters.tiers[tier] && !(filters.hideIneligible && tier === "ineligible")}
              onClick={() => toggleTier(tier)}
              dotClass={TIER_DOT[tier]}
              count={counts[tier]}
            >
              {TIER_SHORT[tier]}
            </FilterChip>
          ))}
        </div>
      </div>

      <Divider className="my-4" />

      <div className="flex flex-col gap-3">
        <Toggle
          label="Hide ineligible"
          checked={filters.hideIneligible}
          onChange={(v) => setFilters({ hideIneligible: v })}
        />
        <Toggle
          label={
            <>
              Shortlisted only
              {shortlisted > 0 && (
                <span className="ml-1.5 font-mono text-[11.5px] tnum text-ink-400">{shortlisted}</span>
              )}
            </>
          }
          checked={filters.onlyShortlisted}
          onChange={(v) => setFilters({ onlyShortlisted: v })}
        />
      </div>

      <Divider className="my-4" />

      <label className="block">
        <GroupLabel>Sort by</GroupLabel>
        <span className="relative mt-1.5 block">
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ sort: e.target.value as SortKey })}
            className="h-9 w-full appearance-none rounded-field glass-soft pl-3 pr-8 text-[13px] text-ink-800 transition-colors hover:bg-white/60"
          >
            <option value="rank">Rank</option>
            <option value="score">Score</option>
            <option value="phase">Phase</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-2.5 top-1/2 size-3.5 -translate-y-1/2 text-ink-400"
            aria-hidden
          />
        </span>
      </label>

      {phases.length > 1 && (
        <>
          <Divider className="my-4" />
          <GroupLabel>Phase</GroupLabel>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {phases.map((phase) => (
              <FilterChip
                key={phase}
                pressed={filters.phases.includes(phase)}
                onClick={() => togglePhase(phase)}
              >
                {phase}
              </FilterChip>
            ))}
          </div>
          {filters.phases.length === 0 && (
            <div className="mt-1.5 text-[12px] text-ink-400">All phases shown.</div>
          )}
        </>
      )}
    </GlassPanel>
  );
}
