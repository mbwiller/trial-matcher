import type { CriterionType, MatchTier, TrialStatus, VerdictStatus } from "@/lib/types";

/** ["PHASE1","PHASE2"] → "Phase 1/2"; ["EARLY_PHASE1"] → "Early phase 1"; ["NA"] → "Not applicable". */
export function formatPhase(phases: string[] | undefined): string {
  if (!phases || phases.length === 0) return "Phase n/a";
  const nums = phases
    .map((p) => p.toUpperCase())
    .map((p) => (p === "EARLY_PHASE1" ? "E1" : p.replace("PHASE", "")))
    .filter((p) => p !== "NA");
  if (nums.length === 0) return "Not applicable";
  if (nums.length === 1 && nums[0] === "E1") return "Early phase 1";
  return `Phase ${nums.map((n) => (n === "E1" ? "1 (early)" : n)).join("/")}`;
}

export function formatStatus(status: TrialStatus | string): string {
  const map: Record<string, string> = {
    RECRUITING: "Recruiting",
    NOT_YET_RECRUITING: "Not yet recruiting",
    ACTIVE_NOT_RECRUITING: "Active, not recruiting",
    ENROLLING_BY_INVITATION: "Enrolling by invitation",
    COMPLETED: "Completed",
    SUSPENDED: "Suspended",
    TERMINATED: "Terminated",
    WITHDRAWN: "Withdrawn",
    UNKNOWN: "Status unknown",
  };
  return map[status] ?? status;
}

/** "18 Years" → "18", "65 Years" → "65". */
export function formatAgeValue(age: string | undefined): string | undefined {
  if (!age) return undefined;
  const m = /^(\d+)\s*(year|month|week|day)s?/i.test(age) ? age.match(/^(\d+)\s*(year|month|week|day)s?/i) : null;
  if (!m) return age;
  const n = m[1];
  const unit = m[2].toLowerCase();
  return unit === "year" ? n : `${n} ${unit}${n === "1" ? "" : "s"}`;
}

export function formatAgeRange(min?: string, max?: string): string {
  const lo = formatAgeValue(min);
  const hi = formatAgeValue(max);
  if (lo && hi) return `${lo}–${hi} y`;
  if (lo) return `${lo}+ y`;
  if (hi) return `≤${hi} y`;
  return "Any age";
}

export function formatSex(sex: "ALL" | "FEMALE" | "MALE"): string {
  return sex === "ALL" ? "All sexes" : sex === "FEMALE" ? "Female" : "Male";
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "2026-03-14" → "14 Mar 2026"; "2026-03" → "Mar 2026"; "2026" → "2026". */
export function formatDate(iso: string | undefined): string {
  if (!iso) return "—";
  const m = /^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  if (mo && d) return `${parseInt(d, 10)} ${MONTHS[parseInt(mo, 10) - 1]} ${y}`;
  if (mo) return `${MONTHS[parseInt(mo, 10) - 1]} ${y}`;
  return y;
}

/** Human label for a verdict, aware of criterion type. See lib/types.ts header. */
export function verdictLabel(status: VerdictStatus, type: CriterionType): string {
  switch (status) {
    case "pass":
      return type === "inclusion" ? "Met" : "Clear";
    case "fail":
      return type === "inclusion" ? "Not met" : "Excludes";
    case "unknown":
      return "Needs review";
    case "not-applicable":
      return "N/A";
  }
}

export function tierLabel(tier: MatchTier): string {
  switch (tier) {
    case "strong":
      return "Strong match";
    case "possible":
      return "Possible match";
    case "unlikely":
      return "Unlikely";
    case "ineligible":
      return "Ineligible";
  }
}

export function truncate(text: string, max = 140): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}
