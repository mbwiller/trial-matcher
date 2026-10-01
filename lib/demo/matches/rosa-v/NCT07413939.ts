import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07413939",
  "Meets 8 of 9 inclusion criteria · central HER2, hepatitis serology and ECG pending",
  "A close fit for this post-T-DXd, HER2 TKI-naive patient with SRS-treated brain metastases: she meets the prior anti-HER2 line, prior ADC, no-TKI, measurable-disease, ECOG, LVEF and organ-function requirements. The control arm is tucatinib + trastuzumab + capecitabine, the third-line regimen already under discussion, so randomization does not cost her the standard option. Open items are central HER2 confirmation (her HER2 result rests on 2024 tissue with no rebiopsy after T-DXd), hepatitis B/C serology, a 12-lead ECG, and electrolytes with a family QT history.",
  [
    {
      id: "NCT07413939-inc-1",
      status: "unknown",
      confidence: "medium",
      rationale: "Metastatic breast cancer is pathologically documented with HER2 IHC 3+ on the 2024 breast core and liver biopsy by local testing; there is no central confirmation and no rebiopsy after progression on T-DXd.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" },
        { quote: "Note: no repeat biopsy at progression on T-DXd; HER2 status per 2024 tissue.", source: "Pathology 2024-01-19" },
      ],
      actionNeeded: "Send archival 2024 tissue (or a fresh liver biopsy) for central HER2 testing; a centrally confirmed HER2-positive result is required",
    },
    {
      id: "NCT07413939-inc-2",
      status: "pass",
      rationale: "Liver lesions of 2.8 cm (segment VII) and 2.2 cm (segment V) on CT 7/20/2026 are RECIST 1.1-measurable, so she qualifies for stage 1 as well as stage 2; that scan is 10 weeks old.",
      evidence: [{ quote: "Measurable liver dz: seg VII 2.8 cm, seg V 2.2 cm.", source: "Clinic note 2026-09-24" }],
      actionNeeded: "Repeat CT chest/abdomen/pelvis within the protocol's baseline imaging window",
    },
    {
      id: "NCT07413939-inc-3",
      status: "pass",
      rationale: "Three brain metastases treated with Gamma Knife SRS on 8/7/2026, smaller on MRI 9/12/2026 with no new lesions, off dexamethasone since 8/30; the trial enrolls patients with or without CNS disease and she fits the previously treated group.",
      evidence: [
        { quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Clinic note 2026-09-24" },
        { quote: "Treated brain mets (GK SRS 8/7/26) stable on 9/12 MRI, off steroids.", source: "Clinic note 2026-09-24" },
      ],
    },
    {
      id: "NCT07413939-inc-4",
      status: "pass",
      rationale: "Two prior anti-HER2 lines for metastatic disease: THP followed by trastuzumab/pertuzumab maintenance (2/2024–3/2025) and T-DXd (4/2025–7/2026).",
      evidence: [{ quote: "PD on 1L THP/HP and 2L T-DXd", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT07413939-inc-5",
      status: "pass",
      rationale: "Received T-DXd 5.4 mg/kg from 4/2025 to 7/2026 with a partial response before progression, meeting the prior anti-HER2 ADC requirement.",
      evidence: [{ quote: "2L T-DXd 5.4 mg/kg 4/2025-7/2026 (last dose 07/06/2026)", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT07413939-inc-6",
      status: "pass",
      rationale: "No HER2 TKI in any setting (tucatinib, lapatinib and neratinib explicitly never given), so the bar on prior TKI for metastatic disease is not triggered.",
      evidence: [{ quote: "No prior tucatinib, T-DM1, lapatinib or neratinib.", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT07413939-inc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Labs 9/22/2026: ANC 3.1, platelets 165, Hgb 10.9, bilirubin 0.8, AST 52 (1.3× ULN) and ALT 48 with liver metastases, CrCl ~62 mL/min — all within standard limits; the protocol's own thresholds are not in hand.",
      evidence: [
        { quote: "ANC 3.1 | Hgb 10.9 (L) | Plt 165", source: "Labs 2026-09-22" },
        { quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8", source: "Labs 2026-09-22" },
        { quote: "Cr 0.9 | est CrCl ~62 mL/min (CG)", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Check values against the protocol's limits and repeat labs within the screening window",
    },
    {
      id: "NCT07413939-inc-8",
      status: "pass",
      rationale: "ECOG 1 at the 9/24/2026 visit, with mild fatigue and a steady gait.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-24" }],
    },
    {
      id: "NCT07413939-inc-9",
      status: "pass",
      rationale: "LVEF 55% by biplane Simpson's on 9/10/2026, above the 50% threshold, though down from 62% in 01/2024 and 58% in 03/2025 after prolonged HER2-directed therapy.",
      evidence: [{ quote: "ECHO 2026-09-10: LVEF 55% (biplane Simpson's).", source: "Echo 2026-09-10" }],
      actionNeeded: "Repeat echocardiogram if the 9/10 study falls outside the protocol's baseline window; LVEF ≥ 50% required",
    },
    {
      id: "NCT07413939-exc-1",
      status: "pass",
      rationale: "Last anti-cancer drug was T-DXd on 7/6/2026, 84 days before 9/28/2026; the note's 'T-DXd C14 D1 today' line is a stale copy-forward contradicted by the HPI and medication list. No investigational agent recorded.",
      evidence: [
        { quote: "trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)", source: "Medications" },
        { quote: "(last dose 07/06/2026)", source: "Clinic note 2026-09-24" },
      ],
    },
    {
      id: "NCT07413939-exc-2",
      status: "unknown",
      confidence: "medium",
      rationale: "No hepatitis B/C or chronic liver disease on the problem list, and the AST 52 (1.3× ULN) / ALT 48 elevation fits her liver metastases, but hepatitis serology is not on file.",
      evidence: [{ quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H)", source: "Labs 2026-09-22" }],
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody (reflex HCV RNA); active or untreated hepatitis B/C excludes",
    },
    {
      id: "NCT07413939-exc-3",
      status: "unknown",
      confidence: "medium",
      rationale: "Hypertension is controlled on lisinopril (BP 128/74), no CAD is recorded and LVEF is 55% without symptoms, but no ECG or QTc is on file to exclude arrhythmia or QT prolongation.",
      evidence: [
        { quote: "BP 128/74 HR 82", source: "Clinic note 2026-09-24" },
        { quote: "No CAD. Never smoker.", source: "Clinic note 2026-09-24" },
      ],
      actionNeeded: "Obtain a 12-lead ECG; no clinically significant arrhythmia, ECG abnormality or QTc prolongation allowed",
    },
    {
      id: "NCT07413939-exc-4",
      status: "unknown",
      confidence: "low",
      rationale: "The 9/22/2026 panel reports creatinine but no potassium, magnesium or calcium, and family history of sudden unexplained death or long QT syndrome is not recorded.",
      evidence: [],
      actionNeeded: "Check K+, Mg2+ and Ca2+ (correct any deficit) and document family history of sudden unexplained death or long QT syndrome",
    },
    {
      id: "NCT07413939-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Current medicines are metformin, lisinopril, levothyroxine and gabapentin, none a strong CYP3A4/CYP2C8 inhibitor or inducer, with no anticoagulant; dexamethasone ended 8/30/2026. Herbal products are not documented.",
      evidence: [{ quote: "dexamethasone - taper COMPLETED, last dose 08/30/2026", source: "Medications" }],
      actionNeeded: "Confirm no herbal supplements (e.g. St John's wort) or new strong CYP3A4/CYP2C8 modulators at screening",
    },
  ],
);
