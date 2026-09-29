import type { CriterionType, VerdictStatus } from "@/lib/types";
import { verdictLabel } from "@/lib/ctgov/format";
import { Badge, type BadgeTone } from "./Badge";

const TONE: Record<VerdictStatus, BadgeTone> = {
  pass: "pass",
  fail: "fail",
  unknown: "warn",
  "not-applicable": "neutral",
};

export function verdictTone(status: VerdictStatus): BadgeTone {
  return TONE[status];
}

export interface VerdictPillProps {
  status: VerdictStatus;
  type: CriterionType;
  size?: "sm" | "md";
  className?: string;
}

/** Human label for a criterion verdict, aware of inclusion vs exclusion semantics. */
export function VerdictPill({ status, type, size = "md", className }: VerdictPillProps) {
  return (
    <Badge tone={TONE[status]} dot size={size} className={className}>
      {verdictLabel(status, type)}
    </Badge>
  );
}
