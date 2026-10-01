import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07383506",
  "Fits the Phase 1b breast cohort (PIK3CA H1047R, post-CDK4/6i) · LVEF not current",
  "She would enter Phase 1b Cohort 2 (PIK3CA-mutant HR+/HER2-negative or HER2-low breast cancer): H1047R on tissue NGS, prior first-line letrozole + palbociclib, measurable liver disease (segment VI 3.2 cm), ECOG 1 and adequate labs on 2026-09-15. The only open item among the listed criteria is a current ejection fraction, as her last echo (LVEF 62%) predates adjuvant doxorubicin in 2019. Also confirm the full NGS report shows no PTEN/AKT/RAS alterations and the 2026-08-20 palbociclib stop date against the washout, and weigh this early-phase study against approved second-line PI3K/AKT options.",
  [
    {
      id: "NCT07383506-inc-1",
      status: "pass",
      rationale: "Fits Phase 1b Cohort 2: PIK3CA H1047R (pathogenic, VAF 31%) on liver tissue NGS in HR+/HER2-low metastatic breast cancer, HER2 scored per ASCO/CAP (IHC 1+, ISH not amplified).",
      evidence: [
        { quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: "Tissue NGS 2025-03-10" },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: "Liver pathology 2025-02-24" },
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: "Liver pathology 2025-02-24" },
      ],
    },
    {
      id: "NCT07383506-inc-2",
      status: "pass",
      rationale: "For Phase 1b she has received standard first-line therapy (letrozole + palbociclib, March 2025 to progression in August 2026).",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: "Clinic note 2026-09-18" },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07383506-inc-3",
      status: "pass",
      rationale: "Measurable liver lesions on CT 2026-08-14: segment VI 3.2 cm, segment IV 1.8 cm, segment VIII 1.5 cm.",
      evidence: [
        { quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: "CT CAP 2026-08-14" },
        { quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07383506-inc-4",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07383506-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Limits are not specified, but labs on 2026-09-15 are within usual ranges: ANC 2.8, platelets 210, Hgb 11.2, Cr 0.8, AST 34, ALT 41, bilirubin 0.6 (alk phos 148 with bone metastases).",
      evidence: [
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: "Labs 2026-09-15" },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: "Labs 2026-09-15" },
        { quote: "Cr 0.8 | Na 139 | K 4.1", source: "Labs 2026-09-15" },
      ],
      actionNeeded: "Repeat CBC and chemistry within the protocol screening window and check against its limits",
    },
    {
      id: "NCT07383506-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Off palbociclib since 2026-08-20 with ANC 2.8 and Hgb 11.2 (grade 1 anemia). Fatigue is called moderate but she still does her own shopping and housework, consistent with grade 1.",
      evidence: [
        { quote: "Since then moderate fatigue (still does own shopping/housework)", source: "Clinic note 2026-09-18" },
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: "Labs 2026-09-15" },
      ],
      actionNeeded: "Grade fatigue at screening; grade 2 or higher must be baseline or disease-related",
    },
    {
      id: "NCT07383506-inc-7",
      status: "unknown",
      confidence: "medium",
      rationale: "The only LVEF on file is 62% from the pre-anthracycline echo in 2019, more than 6 years old and before adjuvant doxorubicin.",
      evidence: [{ quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%). Will order repeat if trial requires.", source: "Clinic note 2026-09-18" }],
      actionNeeded: "Obtain echocardiogram or MUGA; LVEF ≥ 50% required",
    },
    {
      id: "NCT07383506-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Last anticancer therapy was letrozole + palbociclib, stopped 2026-08-20: 39 days before 2026-09-28. The 2026-09-18 A/P line 'continue letrozole/palbociclib' is a stale copy-forward contradicted by the medication list.",
      evidence: [
        { quote: "Palbo/letrozole stopped 8/20/26.", source: "Clinic note 2026-09-18" },
        { quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: "Medications" },
      ],
      actionNeeded: "Confirm last palbociclib/letrozole dose was 2026-08-20 and check against the protocol washout",
    },
    {
      id: "NCT07383506-exc-2",
      status: "pass",
      rationale: "No major surgery since the 2019 lumpectomy and axillary dissection; the only later procedures were port removal in 2020 and a liver core biopsy in February 2025.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07383506-exc-3",
      status: "pass",
      rationale: "Her only radiotherapy was adjuvant whole-breast RT in October–November 2019; no palliative RT to the bone metastases is recorded.",
      evidence: [{ quote: "whole breast RT 10-11/2019", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07383506-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Only controlled hypertension (amlodipine, BP 132/78) is documented; no heart failure, arrhythmia or coronary disease. Prior doxorubicin (2019) without a follow-up echo.",
      evidence: [
        { quote: "HTN - amlodipine, controlled.", source: "Clinic note 2026-09-18" },
        { quote: "BP 132/78 HR 76 afebrile.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07383506-exc-5",
      status: "pass",
      rationale: "No systemic corticosteroids on the medication list (denosumab, oxycodone prn, amlodipine, atorvastatin, calcium/vitamin D).",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: "Medications" }],
    },
    {
      id: "NCT07383506-exc-6",
      status: "pass",
      rationale: "No diabetes documented and fasting glucose 104 mg/dL (2026-09-15), below the 140 mg/dL threshold in the definition of uncontrolled diabetes.",
      evidence: [
        { quote: "No DM.", source: "Clinic note 2026-09-18" },
        { quote: "Glucose (fasting) 104 (H)", source: "Labs 2026-09-15" },
      ],
    },
    {
      id: "NCT07383506-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "March 2025 tissue NGS reported PIK3CA H1047R as the only pathogenic alteration (ESR1, TP53, BRCA1/2 negative); PTEN, AKT, RAS, EGFR and BRAF are not individually listed.",
      evidence: [
        { quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: "Tissue NGS 2025-03-10" },
        { quote: "TP53: no alterations detected", source: "Tissue NGS 2025-03-10" },
      ],
      actionNeeded: "Confirm the full NGS report covers PTEN, AKT1, KRAS/NRAS/HRAS, EGFR and BRAF with no alterations",
    },
  ],
);
