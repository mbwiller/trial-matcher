"use client";

import { useEffect, useState } from "react";
import type { EngineStatus } from "@/lib/types";
import { Badge, Tooltip } from "@/components/ui";

/**
 * Shows which engine is answering: bundled demo data, or the live model.
 * Reads /api/status once on mount; renders nothing until it knows.
 */
export function EngineBadge({ className }: { className?: string }) {
  const [status, setStatus] = useState<EngineStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/status")
      .then((r) => (r.ok ? r.json() : { llm: false, modelId: "", liveRegistry: false }))
      .then((s: EngineStatus) => {
        if (!cancelled) setStatus(s);
      })
      .catch(() => {
        if (!cancelled) setStatus({ llm: false, modelId: "", liveRegistry: false });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!status) return <span className={className} aria-hidden />;

  if (status.llm) {
    return (
      <Tooltip
        content={`Records are structured and screened live by ${status.modelId}. Registry: ${status.liveRegistry ? "ClinicalTrials.gov" : "bundled fixture"}.`}
        side="bottom"
        className={className}
      >
        <Badge tone="accent" dot>
          Live · <span className="font-mono tnum">{status.modelId}</span>
        </Badge>
      </Tooltip>
    );
  }

  return (
    <Tooltip
      content="No API key configured. Sample patients use curated results; other records use a keyword screen. Set ANTHROPIC_API_KEY to go live."
      side="bottom"
      className={className}
    >
      <Badge tone="neutral" dot>
        Demo data
      </Badge>
    </Tooltip>
  );
}
