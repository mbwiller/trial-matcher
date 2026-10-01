"use client";

import { useMemo } from "react";
import { Check, Minus, X } from "lucide-react";
import type { VerdictStatus } from "@/lib/types";
import { GlassPanel, cn } from "@/components/ui";
import { MATRIX_GROUPS, matrixRow, type MatrixCell } from "../insights";
import { useRankedTrials, useWorkspace } from "../store";

/**
 * Trials × eligibility domains. Each cell is the worst verdict in that domain,
 * so a column of ticks with one question mark shows at a glance where a trial
 * is still open. Glyph and color together carry the state.
 */

const CELL: Record<VerdictStatus | "none", { className: string; label: string }> = {
  pass: { className: "bg-pass-100 text-pass-700", label: "met" },
  unknown: { className: "bg-warn-100 text-warn-700", label: "open" },
  fail: { className: "bg-fail-100 text-fail-700", label: "blocking" },
  "not-applicable": { className: "bg-ink-100 text-ink-400", label: "not applicable" },
  none: { className: "text-ink-200", label: "no criteria" },
};

function Glyph({ status }: { status: VerdictStatus | "none" }) {
  switch (status) {
    case "pass":
      return <Check className="size-3" strokeWidth={3} aria-hidden />;
    case "fail":
      return <X className="size-3" strokeWidth={3} aria-hidden />;
    case "unknown":
      return (
        <span className="text-[11px] font-semibold leading-none" aria-hidden>
          ?
        </span>
      );
    case "not-applicable":
      return <Minus className="size-3" strokeWidth={2.5} aria-hidden />;
    default:
      return <span className="size-1 rounded-full bg-ink-200" aria-hidden />;
  }
}

function describe(cell: MatrixCell, group: string): string {
  if (cell.status === "none") return `${group}: no criteria`;
  const parts = [`${cell.pass} met`];
  if (cell.unknown > 0) parts.push(`${cell.unknown} open`);
  if (cell.fail > 0) parts.push(`${cell.fail} blocking`);
  return `${group}: ${parts.join(" · ")} of ${cell.total}`;
}

export function EligibilityMatrix({ className }: { className?: string }) {
  const { visible } = useRankedTrials();
  const selected = useWorkspace((s) => s.selected);
  const selectTrial = useWorkspace((s) => s.selectTrial);

  const rows = useMemo(
    () =>
      visible
        .filter((e) => e.match && e.review !== "dismissed")
        .map((e) => ({ entry: e, cells: matrixRow(e.trial, e.match!) })),
    [visible],
  );

  return (
    <GlassPanel as="section" aria-labelledby="matrix-title" padding="none" className={cn("p-6", className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <div>
          <h2 id="matrix-title" className="text-[15px] font-semibold tracking-[-0.01em] text-ink-900">
            Eligibility matrix
          </h2>
          <p className="mt-0.5 text-[12.5px] text-ink-500">Worst verdict per domain. Select a cell to read those criteria.</p>
        </div>
        <ul className="flex flex-wrap items-center gap-x-3.5 gap-y-1 text-[12px] text-ink-500">
          {(["pass", "unknown", "fail", "not-applicable"] as const).map((status) => (
            <li key={status} className="flex items-center gap-1.5">
              <span className={cn("flex size-[18px] items-center justify-center rounded-[5px]", CELL[status].className)}>
                <Glyph status={status} />
              </span>
              {CELL[status].label.charAt(0).toUpperCase() + CELL[status].label.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      {rows.length === 0 ? (
        <p className="mt-6 text-[13px] text-ink-400">Reviewed trials appear here as their verdicts come back.</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] border-separate border-spacing-0 text-left">
            <thead>
              <tr>
                <th scope="col" className="pb-2 pr-3 text-[11px] font-medium tracking-[0.02em] text-ink-400">
                  Trial
                </th>
                {MATRIX_GROUPS.map((g) => (
                  <th key={g.key} scope="col" className="w-[68px] px-0.5 pb-2 text-center align-bottom text-[11px] font-medium leading-tight tracking-[0.01em] text-ink-400" title={g.label}>
                    {g.short}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ entry, cells }) => {
                const active = entry.trial.nctId === selected;
                return (
                  <tr key={entry.trial.nctId} className={cn("group", active && "bg-accent-50/70")}>
                    <th scope="row" className="max-w-0 rounded-l-[8px] py-[3px] pl-1.5 pr-3 font-normal">
                      <button
                        type="button"
                        onClick={() => selectTrial(entry.trial.nctId)}
                        className="flex w-full min-w-0 items-center gap-2 rounded-md text-left"
                        title={entry.trial.title}
                      >
                        <span className="w-[2ch] shrink-0 text-right font-mono text-[11.5px] tnum text-ink-400">{entry.rank}</span>
                        <span className={cn("min-w-0 truncate text-[12.5px] transition-colors group-hover:text-ink-900", active ? "font-medium text-ink-900" : "text-ink-700")}>
                          {entry.trial.title}
                        </span>
                      </button>
                    </th>
                    {MATRIX_GROUPS.map((g, i) => {
                      const cell = cells[g.key];
                      const style = CELL[cell.status];
                      const label = describe(cell, g.label);
                      return (
                        <td key={g.key} className={cn("px-0.5 py-[3px] text-center", i === MATRIX_GROUPS.length - 1 && "rounded-r-[8px]")}>
                          {cell.status === "none" ? (
                            <span className="mx-auto flex h-[22px] w-full items-center justify-center" title={label} aria-label={label}>
                              <Glyph status="none" />
                            </span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => selectTrial(entry.trial.nctId, g.key)}
                              title={label}
                              aria-label={`${entry.trial.nctId}, ${label}`}
                              className={cn(
                                "mx-auto flex h-[22px] w-full max-w-[60px] items-center justify-center rounded-[6px] transition-[filter,transform] duration-150 hover:brightness-95 active:translate-y-px",
                                style.className,
                              )}
                            >
                              <Glyph status={cell.status} />
                            </button>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </GlassPanel>
  );
}
