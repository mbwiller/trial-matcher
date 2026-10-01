"use client";

import { Badge, Tooltip } from "@/components/ui";
import { useEngineStatus } from "./useEngineStatus";

/**
 * Shows which engine is answering: bundled demo data, or the live model.
 * Reads /api/status once on mount; renders nothing until it knows.
 */
export function EngineBadge({ className }: { className?: string }) {
  const status = useEngineStatus();

  if (!status) return <span className={className} aria-hidden />;

  if (status.llm) {
    return (
      <Tooltip
        content={`Records are structured and screened live by ${status.modelId}. Registry: ${status.liveRegistry ? "ClinicalTrials.gov, live" : "bundled snapshot"}.`}
        side="bottom"
        align="end"
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
      content="No API key configured. Sample patients replay precomputed reviews against the registry snapshot; other records get a keyword screen. Set ANTHROPIC_API_KEY to go live."
      side="bottom"
      align="end"
      className={className}
    >
      <Badge tone="neutral" dot>
        Demo data
      </Badge>
    </Tooltip>
  );
}
