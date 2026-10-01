"use client";

import { ClipboardCheck } from "lucide-react";
import { GlassPanel, cn } from "@/components/ui";
import type { WorkupItem } from "../insights";
import { plural } from "../labels";
import { useWorkspace } from "../store";

/**
 * Open items across the trials still in play, grouped by the test or document
 * that would close them: the order list a clinician would actually write.
 */
export function WorkupPanel({ items, className }: { items: WorkupItem[]; className?: string }) {
  const selectTrial = useWorkspace((s) => s.selectTrial);
  const selected = useWorkspace((s) => s.selected);
  const max = Math.max(1, ...items.map((i) => i.trials.length));

  return (
    <GlassPanel as="section" aria-labelledby="workup-title" padding="none" className={cn("p-6", className)}>
      <h2 id="workup-title" className="text-[15px] font-semibold tracking-[-0.01em] text-ink-900">
        Workup that unlocks trials
      </h2>
      <p className="mt-0.5 text-[12.5px] text-ink-500">What the record is missing, across strong and possible matches.</p>

      {items.length === 0 ? (
        <div className="mt-6 flex items-center gap-2.5 text-[13px] text-ink-500">
          <ClipboardCheck className="size-4 text-ink-400" aria-hidden />
          Nothing left to confirm for the trials in play.
        </div>
      ) : (
        <ul className="mt-3 divide-y divide-ink-900/[0.06]">
          {items.map((item) => (
            <li key={item.key} className="py-3 first:pt-1 last:pb-0">
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-[13.5px] font-medium text-ink-900" title={item.open[0]?.action}>
                  {item.label}
                </span>
                <span className="flex shrink-0 items-center gap-2">
                  <span className="h-1 w-12 overflow-hidden rounded-full bg-ink-100" aria-hidden>
                    <span className="block h-full rounded-full bg-warn-500" style={{ width: `${(item.trials.length / max) * 100}%` }} />
                  </span>
                  <span className="w-[52px] text-right text-[12px] tnum text-ink-500">{plural(item.trials.length, "trial")}</span>
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {item.trials.map((t) => (
                  <button
                    key={t.nctId}
                    type="button"
                    onClick={() => selectTrial(t.nctId)}
                    title={t.title}
                    className={cn(
                      "inline-flex h-[20px] items-center rounded-chip px-1.5 font-mono text-[11px] tnum transition-colors",
                      t.nctId === selected ? "bg-accent-100 text-accent-800" : "bg-ink-900/[0.05] text-ink-600 hover:bg-ink-900/[0.09] hover:text-ink-900",
                    )}
                  >
                    #{t.rank}
                  </button>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </GlassPanel>
  );
}
