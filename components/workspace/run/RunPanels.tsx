"use client";

import { Check, ChevronRight } from "lucide-react";
import type { PrescreenReason, RegistryRequestTrace, SearchTrace } from "@/lib/types";
import { cn } from "@/components/ui";
import { formatDate } from "@/lib/ctgov/format";
import type { PrescreenSummary } from "@/lib/ctgov/prescreen";
import { formatInt } from "../labels";
import { GATE_ORDER, type RunPhase } from "./usePlayback";

/* ---------------------------------------------------------------------------
   Pipeline strip: the four stages and where the run is
   --------------------------------------------------------------------------- */

export interface PipelineStage {
  key: string;
  label: string;
  value: string;
  sub: string;
  state: "pending" | "active" | "done";
}

export function PipelineStrip({ stages }: { stages: PipelineStage[] }) {
  return (
    <ol className="grid grid-cols-2 gap-y-4 md:grid-cols-4" aria-label="Screening pipeline">
      {stages.map((stage, i) => (
        <li key={stage.key} className="relative flex min-w-0 items-start gap-3 px-5 first:pl-0 md:[&:not(:first-child)]:hairline-l">
          <span
            aria-hidden
            className={cn(
              "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-medium tnum transition-colors duration-300",
              stage.state === "active" && "bg-accent-600 text-white shadow-[0_0_0_3px_var(--color-accent-100)]",
              stage.state === "done" && "bg-accent-100 text-accent-800",
              stage.state === "pending" && "bg-ink-100 text-ink-400",
            )}
          >
            {stage.state === "done" ? <Check className="size-3.5" strokeWidth={2.5} /> : i + 1}
          </span>
          <div className="min-w-0">
            <div className={cn("text-[12px] font-medium tracking-[0.01em]", stage.state === "pending" ? "text-ink-400" : "text-ink-500")}>
              {stage.label}
            </div>
            <div
              className={cn(
                "mt-0.5 truncate text-[20px] font-semibold leading-tight tracking-[-0.02em] tnum transition-colors duration-300",
                stage.state === "pending" ? "text-ink-300" : "text-ink-900",
              )}
              aria-live={stage.state === "active" ? "polite" : undefined}
            >
              {stage.value}
            </div>
            <div className="mt-0.5 truncate text-[12px] text-ink-400">{stage.sub}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ---------------------------------------------------------------------------
   Request log: what was asked of the registry, page by page
   --------------------------------------------------------------------------- */

function megabytes(bytes: number): string {
  return `${(bytes / 1e6).toFixed(bytes >= 1e7 ? 0 : 1)} MB`;
}

function RequestBlock({ request, pagesShown }: { request: RegistryRequestTrace; pagesShown: number }) {
  const params = [request.cond && `query.cond=${request.cond}`, request.term && `query.term=${request.term}`].filter(Boolean).join("  ·  ");
  return (
    <div className="font-mono text-[11.5px] leading-[1.6] tnum">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <span className="font-sans text-[12.5px] font-medium text-ink-800">{request.label}</span>
        <span className="text-accent-800">
          GET <span className="text-ink-600">/api/v2/studies</span>
        </span>
        {request.total !== undefined && <span className="ml-auto text-ink-400">{formatInt(request.total)} match in the registry</span>}
      </div>
      <div className="mt-0.5 break-words text-ink-500">
        {params}
        {params && "  ·  "}
        <span className="font-sans">{request.filters.join(" · ")}</span>
      </div>
      <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${request.label}: pages`}>
        {request.pages.map((p, i) => {
          const landed = i < pagesShown;
          const loading = i === pagesShown;
          return (
            <li
              key={p.page}
              title={landed ? `Page ${p.page}: ${p.studies} studies${p.bytes !== undefined ? `, ${megabytes(p.bytes)}` : ""}, ${p.ms} ms` : undefined}
              className={cn(
                "inline-flex h-[22px] items-center gap-1.5 rounded-chip px-2 transition-colors duration-300",
                landed ? "bg-accent-50 text-accent-900" : loading ? "animate-reading bg-ink-100 text-ink-400" : "bg-ink-100/60 text-ink-300",
              )}
            >
              {landed && <Check className="size-3 text-accent-600" strokeWidth={2.5} aria-hidden />}
              <span>p{p.page}</span>
              {landed && (
                <>
                  <span className="text-ink-700">{formatInt(p.studies)}</span>
                  <span className="text-ink-400">{p.ms} ms</span>
                </>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function RequestLog({ trace, pagesShown }: { trace: SearchTrace; pagesShown: number }) {
  // Requests play back one after another; a request appears once the previous one has finished.
  const blocks = trace.requests.reduce<Array<{ request: RegistryRequestTrace; before: number }>>((acc, request) => {
    const last = acc[acc.length - 1];
    acc.push({ request, before: last ? last.before + last.request.pages.length : 0 });
    return acc;
  }, []);
  return (
    <div className="flex flex-col gap-3">
      {blocks
        .filter((b) => pagesShown >= b.before)
        .map((b, i) => (
          <RequestBlock
            key={`${b.request.label}-${i}`}
            request={b.request}
            pagesShown={Math.min(b.request.pages.length, pagesShown - b.before)}
          />
        ))}
    </div>
  );
}

/** Where the registry data came from and how fresh it is. */
export function traceSource(trace: SearchTrace): string {
  const fetched = formatDate(trace.fetchedAt.slice(0, 10));
  const asOf = trace.dataTimestamp ? ` · registry data as of ${formatDate(trace.dataTimestamp.slice(0, 10))}` : "";
  return trace.mode === "snapshot" ? `Replayed from the snapshot harvested ${fetched}${asOf}` : `Fetched live ${fetched}${asOf}`;
}

/* ---------------------------------------------------------------------------
   Gate breakdown: why studies were set aside
   --------------------------------------------------------------------------- */

export function gateLabel(reason: PrescreenReason, country?: string): string {
  switch (reason) {
    case "location":
      return country ? `No site in ${country}` : "No site in the region";
    case "sex":
      return "Enrolls the other sex only";
    case "age":
      return "Age window excludes the patient";
    case "study-type":
      return "Not a treatment study";
    case "subtype":
      return "Written for a different subtype";
    case "setting":
      return "Written for a different disease setting";
    case "relevance":
      return "No subtype, setting or biomarker signal";
  }
}

export function GateBreakdown({
  summary,
  gates,
  phase,
  country,
}: {
  summary: PrescreenSummary;
  gates: number;
  phase: RunPhase;
  country?: string;
}) {
  const max = Math.max(1, ...GATE_ORDER.map((g) => summary.setAside[g]));
  const rows = GATE_ORDER.map((reason, i) => ({ reason, count: summary.setAside[reason], applied: gates > i })).filter((r) => r.count > 0);
  const finished = gates >= GATE_ORDER.length;
  return (
    <div>
      <ul className="flex flex-col gap-2">
        {rows.map((row) => (
          <li key={row.reason} className={cn("transition-opacity duration-300", row.applied ? "opacity-100" : "opacity-40")}>
            <div className="flex items-baseline justify-between gap-3 text-[12.5px]">
              <span className="min-w-0 truncate text-ink-700">{gateLabel(row.reason, country)}</span>
              <span className="shrink-0 font-mono text-[12px] tnum text-ink-600">{row.applied ? formatInt(row.count) : "—"}</span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-ink-100" aria-hidden>
              <div
                className="h-full origin-left rounded-full bg-ink-300 transition-transform duration-500 ease-out-quart"
                style={{ transform: `scaleX(${row.applied ? Math.max(0.012, row.count / max) : 0})` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div
        className={cn(
          "mt-4 flex items-center gap-2 rounded-field bg-accent-50 px-3 py-2.5 text-[13px] text-accent-900 transition-opacity duration-300",
          finished ? "opacity-100" : "opacity-0",
        )}
      >
        <span className="font-semibold tnum">{formatInt(summary.relevant)}</span>
        <span>relevant</span>
        <ChevronRight className="size-3.5 text-accent-600" aria-hidden />
        <span className="font-semibold tnum">{formatInt(summary.selected)}</span>
        <span className="min-w-0 truncate">best fits go to criterion review</span>
        <span className="sr-only">{phase === "done" ? "Run complete." : ""}</span>
      </div>
    </div>
  );
}
