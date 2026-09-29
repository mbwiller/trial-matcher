import { Sparkles, Search, Flag, ExternalLink } from "lucide-react";
import { TopBar, EngineBadge } from "@/components/shell";
import {
  GlassPanel,
  Button,
  IconButton,
  Badge,
  VerdictPill,
  Eyebrow,
  ScoreRing,
  Stepper,
  Field,
  Skeleton,
  EmptyState,
  Divider,
  Kbd,
} from "@/components/ui";

export const metadata = { title: "Styleguide" };

/** Internal: visual reference for the Clinical Glass primitives. */
export default function StyleguidePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar
        center={<Stepper steps={[{ key: "r", label: "Record" }, { key: "p", label: "Profile" }, { key: "s", label: "Shortlist" }]} current={1} />}
        right={<EngineBadge />}
      />
      <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 py-12">
        <Eyebrow>Design system</Eyebrow>
        <h1 className="mt-2 text-[28px] font-semibold leading-[1.15] tracking-[-0.02em] text-ink-900">
          Clinical Glass primitives
        </h1>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-ink-500">
          Quiet surfaces, precise information. Everything on this page is built from tokens in
          globals.css and the primitives in components/ui.
        </p>

        <div className="mt-10 grid grid-cols-12 gap-6">
          <GlassPanel className="col-span-7" sheen>
            <Eyebrow>Buttons</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Button icon={<Sparkles />}>Structure record</Button>
              <Button variant="secondary" icon={<Search />}>Find trials</Button>
              <Button variant="ghost">Edit</Button>
              <Button variant="danger-ghost">Dismiss</Button>
              <Button loading>Screening</Button>
              <Button size="sm" variant="secondary">Small</Button>
              <Button size="lg" iconRight={<ExternalLink />}>Large</Button>
              <IconButton label="Flag"><Flag /></IconButton>
              <IconButton label="Flag" active><Flag /></IconButton>
            </div>
            <Divider className="my-6" />
            <Eyebrow>Badges & verdicts</Eyebrow>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge>Phase 3</Badge>
              <Badge tone="accent" dot>Recruiting</Badge>
              <Badge mono>NCT06982521</Badge>
              <Badge tone="info">Interventional</Badge>
              <VerdictPill status="pass" type="inclusion" />
              <VerdictPill status="fail" type="inclusion" />
              <VerdictPill status="pass" type="exclusion" />
              <VerdictPill status="fail" type="exclusion" />
              <VerdictPill status="unknown" type="inclusion" />
              <VerdictPill status="not-applicable" type="exclusion" />
              <Kbd>⌘K</Kbd>
            </div>
            <Divider className="my-6" />
            <Eyebrow>Score rings</Eyebrow>
            <div className="mt-4 flex items-center gap-6">
              <ScoreRing value={92} tier="strong" />
              <ScoreRing value={68} tier="possible" />
              <ScoreRing value={31} tier="unlikely" />
              <ScoreRing value={8} tier="ineligible" />
              <ScoreRing value={92} tier="strong" size={64} />
              <ScoreRing value={92} tier="strong" size={28} hideValue />
            </div>
          </GlassPanel>

          <GlassPanel className="col-span-5">
            <Eyebrow>Fields with provenance</Eyebrow>
            <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-5">
              <Field
                label="Primary diagnosis"
                value="Invasive ductal carcinoma, left breast"
                evidence={[{ quote: "hx L breast IDC (2019, IIB, ER/PR+ HER2 1+)", source: "Oncology follow-up note 2026-09-18" }]}
              />
              <Field label="Setting" value="Metastatic" confidence="medium" evidence={[{ quote: "mets to bone/liver 2/25" }]} />
              <Field label="ECOG" value="1" mono confidence="high" />
              <Field label="HbA1c" value="Not documented" confidence="low" note="Needed for the diabetes exclusion" />
              <Field label="HER2" value="Low (IHC 1+, ISH not amplified)" evidence={[{ quote: "HER2 IHC 1+ / ISH not amplified", source: "Pathology — liver core biopsy 2025-02-19" }]} />
              <Field label="NCT" value="NCT06982521" mono />
            </div>
            <Divider className="my-6" />
            <Eyebrow>Nested glass & skeleton</Eyebrow>
            <GlassPanel variant="soft" size="card" padding="sm" className="mt-4">
              <div className="flex items-center gap-3">
                <ScoreRing value={92} tier="strong" size={36} />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            </GlassPanel>
          </GlassPanel>

          <GlassPanel className="col-span-12" padding="none">
            <EmptyState
              icon={<Search />}
              title="No trials screened yet"
              description="Confirm the structured profile and the engine will screen recruiting trials criterion by criterion."
              action={<Button variant="secondary">Back to profile</Button>}
            />
          </GlassPanel>
        </div>
      </main>
    </div>
  );
}
