"use client";

import { memo, useCallback, useMemo, useRef, useState, type PointerEvent } from "react";
import type { PrescreenEntry, PrescreenReason } from "@/lib/types";
import { cn } from "@/components/ui";
import { formatPhase } from "@/lib/ctgov/format";
import { GATE_ORDER, type RunPhase } from "./usePlayback";

/**
 * One dot per harvested study. Dots appear as registry pages land, dim as the
 * pre-screen gate that stops them is applied, and the survivors light up.
 * Hover (or focus the grid and use the arrow keys) to read any study's outcome.
 */

const GATE_INDEX = Object.fromEntries(GATE_ORDER.map((g, i) => [g, i])) as Record<PrescreenReason, number>;

type DotState = "hidden" | "in" | "aside" | "relevant" | "selected";

function dotState(e: PrescreenEntry, i: number, harvested: number, gates: number, phase: RunPhase): DotState {
  if (i >= harvested) return "hidden";
  if (e.outcome === "set-aside") return gates > GATE_INDEX[e.reason ?? "relevance"] ? "aside" : "in";
  if (gates < GATE_ORDER.length) return "in";
  if (e.outcome === "selected" && (phase === "review" || phase === "done")) return "selected";
  return "relevant";
}

const DOT_CLASS: Record<DotState, string> = {
  hidden: "scale-50 opacity-0",
  in: "bg-ink-300",
  aside: "bg-ink-200/80",
  relevant: "bg-accent-300",
  selected: "scale-[1.35] bg-accent-600",
};

const Dots = memo(function Dots({
  entries,
  harvested,
  gates,
  phase,
}: {
  entries: PrescreenEntry[];
  harvested: number;
  gates: number;
  phase: RunPhase;
}) {
  return (
    <>
      {entries.map((e, i) => (
        <i
          key={e.nctId}
          data-i={i}
          className={cn(
            "block size-[7px] rounded-full transition-[background-color,opacity,transform] duration-300 ease-out-quart",
            DOT_CLASS[dotState(e, i, harvested, gates, phase)],
          )}
        />
      ))}
    </>
  );
});

export function outcomeText(e: PrescreenEntry): { label: string; detail: string } {
  if (e.outcome === "selected") return { label: "Sent to criterion review", detail: e.signals.join(" · ") };
  if (e.outcome === "relevant") return { label: "Relevant, below the review cut-off", detail: e.signals.join(" · ") };
  return { label: "Set aside", detail: e.signals.join(" · ") };
}

export interface RegistryMatrixProps {
  entries: PrescreenEntry[];
  harvested: number;
  gates: number;
  phase: RunPhase;
  className?: string;
}

export function RegistryMatrix({ entries, harvested, gates, phase, className }: RegistryMatrixProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ i: number; x: number; y: number; flip: boolean } | null>(null);

  const onPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      const target = event.target as HTMLElement;
      const raw = target.dataset?.i;
      const wrap = wrapRef.current;
      if (raw === undefined || !wrap) {
        setHover(null);
        return;
      }
      const i = Number(raw);
      if (i >= harvested) {
        setHover(null);
        return;
      }
      const box = wrap.getBoundingClientRect();
      const dot = target.getBoundingClientRect();
      const x = dot.left - box.left + dot.width / 2;
      // Near the right edge the tooltip opens to the left of the dot.
      setHover((h) => (h?.i === i ? h : { i, x, y: dot.top - box.top, flip: x > box.width - 300 }));
    },
    [harvested],
  );

  const hovered = hover ? entries[hover.i] : undefined;
  const text = useMemo(() => (hovered ? outcomeText(hovered) : undefined), [hovered]);
  const flipLeft = hover?.flip ?? false;

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <div
        role="img"
        aria-label={`${entries.length.toLocaleString("en-US")} harvested studies, one dot each`}
        className="grid grid-cols-[repeat(auto-fill,7px)] justify-between gap-x-[4px] gap-y-[4px]"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setHover(null)}
      >
        <Dots entries={entries} harvested={harvested} gates={gates} phase={phase} />
      </div>

      {hover && hovered && text && (
        <div
          role="tooltip"
          className={cn(
            "pointer-events-none absolute z-30 w-[290px] rounded-card p-3 glass-strong shadow-float",
            flipLeft ? "-translate-x-full" : "",
          )}
          style={{ left: hover.x + (flipLeft ? -10 : 10), top: hover.y + 14 }}
        >
          <div className="flex items-center gap-2 font-mono text-[11px] tnum text-ink-500">
            <span>{hovered.nctId}</span>
            <span className="text-ink-300">·</span>
            <span className="font-sans">{formatPhase(hovered.phases)}</span>
          </div>
          <div className="mt-1 line-clamp-2 text-[13px] font-medium leading-snug text-ink-900">{hovered.title}</div>
          <div className="mt-2 flex items-start gap-2 text-[12.5px] leading-snug">
            <span
              aria-hidden
              className={cn(
                "mt-[5px] size-1.5 shrink-0 rounded-full",
                hovered.outcome === "selected" ? "bg-accent-600" : hovered.outcome === "relevant" ? "bg-accent-300" : "bg-ink-300",
              )}
            />
            <span className="min-w-0">
              <span className="font-medium text-ink-800">{text.label}</span>
              {text.detail && <span className="text-ink-500"> — {text.detail}</span>}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export function MatrixLegend({ className }: { className?: string }) {
  const items = [
    { dot: "bg-accent-600", label: "Sent to criterion review" },
    { dot: "bg-accent-300", label: "Relevant, not reviewed" },
    { dot: "bg-ink-200", label: "Set aside" },
  ];
  return (
    <ul className={cn("flex flex-wrap items-center gap-x-4 gap-y-1 text-[12px] text-ink-500", className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-center gap-1.5">
          <span aria-hidden className={cn("size-[7px] rounded-full", item.dot)} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}
