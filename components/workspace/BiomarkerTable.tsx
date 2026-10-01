"use client";

import type { BiomarkerResult, Evidence } from "@/lib/types";
import { Badge, EditedTag, EvidencePopover, cn } from "@/components/ui";
import { formatDate } from "@/lib/ctgov/format";
import { BIOMARKER_STATUS_LABEL, biomarkerTone } from "./labels";

export interface BiomarkerTableProps {
  biomarkers: BiomarkerResult[];
  onActiveEvidence: (evidence?: Evidence[]) => void;
}

export function BiomarkerTable({ biomarkers, onActiveEvidence }: BiomarkerTableProps) {
  if (biomarkers.length === 0) {
    return <p className="text-[13.5px] text-ink-400">No biomarkers documented.</p>;
  }
  return (
    <table className="w-full border-collapse text-left">
      <thead className="sr-only">
        <tr>
          <th>Biomarker</th>
          <th>Status</th>
          <th>Detail</th>
          <th>Method, specimen and date</th>
          <th>Evidence</th>
        </tr>
      </thead>
      <tbody>
        {biomarkers.map((b, i) => {
          const meta = [b.method, b.specimen, b.date ? formatDate(b.date) : undefined]
            .filter(Boolean)
            .join(" · ");
          return (
            <tr key={`${b.name}-${i}`} className={cn(i > 0 && "[&>td]:border-t [&>td]:border-ink-900/[0.06]")}>
              <td className="py-2.5 pr-3 align-top">
                <span className="flex items-center gap-1.5">
                  <span className="text-[14px] font-medium leading-snug text-ink-900">{b.name}</span>
                  {!b.edited && b.confidence === "low" && (
                    <span
                      className="inline-block size-1.5 shrink-0 rounded-full bg-warn-500"
                      title="Low confidence — verify against the record"
                      aria-label="Low confidence"
                    />
                  )}
                  {!b.edited && b.confidence === "medium" && (
                    <span
                      className="inline-block size-1.5 shrink-0 rounded-full bg-ink-300"
                      title="Medium confidence — inferred from context"
                      aria-label="Medium confidence"
                    />
                  )}
                </span>
              </td>
              <td className="py-2.5 pr-3 align-top">
                <Badge tone={biomarkerTone(b.status)}>{BIOMARKER_STATUS_LABEL[b.status]}</Badge>
              </td>
              <td className="w-full py-2.5 pr-3 align-top text-[13.5px] leading-snug text-ink-600">
                {b.detail ?? <span className="text-ink-300">—</span>}
              </td>
              <td className="min-w-[120px] max-w-[220px] py-2.5 pr-2 align-top font-mono text-[12px] tnum leading-snug text-ink-400">
                {meta}
              </td>
              <td className="py-2 align-top text-right">
                {b.edited ? (
                  <EditedTag className="mt-1" />
                ) : (
                  <EvidencePopover
                    evidence={b.evidence}
                    align="right"
                    onActiveChange={(active) => onActiveEvidence(active ? b.evidence : undefined)}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
