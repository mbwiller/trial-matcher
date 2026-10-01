import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06797635",
  "Excluded: neoadjuvant trial for untreated disease; she has had KEYNOTE-522, surgery and RT",
  "HERTHENA-Breast03 is a neoadjuvant study for newly diagnosed, previously untreated early TNBC. Her stage at diagnosis (cT2 cN1 M0) would have qualified, but she has already completed KEYNOTE-522 with pembrolizumab, mastectomy with axillary dissection and post-mastectomy radiation, which triggers both the prior-treatment and the prior anti-PD-1 exclusions. Nothing pending changes this; it is not an option at this stage of her care.",
  [
    {
      id: "NCT06797635-inc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Her clinical stage at diagnosis, cT2 cN1 M0 (11/2025), is an eligible combination; that tumor has since been treated and resected, which the prior-treatment exclusion addresses.",
      evidence: [{ quote: "cT2 (3.1 cm) cN1 (bx-proven axillary node) M0, stage IIB", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06797635-inc-2",
      status: "pass",
      confidence: "medium",
      rationale: "Triple negative on local testing (ER 0%, PR 0%, HER2 IHC 0, concordant on core biopsy and residual tumor); central confirmation has not been done.",
      evidence: [{ quote: "ER 0%, PR 0%, HER2 IHC 0 - triple negative, concordant with core bx.", source: "Pathology 2026-06-17" }],
    },
    {
      id: "NCT06797635-inc-3",
      status: "unknown",
      confidence: "medium",
      rationale: "Hepatitis B surface antigen status is not documented; the criterion only matters if she is HBsAg-positive.",
      actionNeeded: "Obtain HBsAg; if positive, ≥ 4 weeks of antiviral therapy and undetectable HBV DNA are required",
    },
    {
      id: "NCT06797635-inc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "No hepatitis C history or serology is recorded.",
      actionNeeded: "Obtain HCV antibody (HCV RNA if positive); viral load must be undetectable",
    },
    {
      id: "NCT06797635-inc-5",
      status: "pass",
      rationale: "ECOG 0 at the 9/22/26 visit, 6 days ago and within the 28-day window.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06797635-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "LVEF 60% on echo 3/4/26 (about 7 months ago), but measured before 4 cycles of dose-dense AC.",
      evidence: [{ quote: "ECHO 03/04/2026: LVEF 60%, normal LV size and function.", source: "Echo 2026-03-04" }],
      actionNeeded: "Repeat echo at screening; LVEF ≥ 50% required",
    },
    {
      id: "NCT06797635-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No cardiovascular disease is recorded in an otherwise detailed history; LVEF was 60% in 3/2026 and vitals are within normal limits.",
      evidence: [{ quote: "Vitals wnl.", source: "Exam 2026-09-22" }],
    },
    {
      id: "NCT06797635-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No history or signs of leptomeningeal disease; she has no headache or neurological symptoms beyond chemotherapy neuropathy in the toes.",
      evidence: [{ quote: "No new lumps, bone pain, HA or cough.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06797635-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No eye disease is recorded in her history; corneal status would be confirmed at a baseline ophthalmic exam.",
      actionNeeded: "Baseline ophthalmology exam per protocol",
    },
    {
      id: "NCT06797635-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection, Kaposi sarcoma or Castleman disease appears in her history or problem list.",
      evidence: [{ quote: "PMH: irAE hypothyroidism (on levo), anxiety (sertraline).", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06797635-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No ongoing infection is documented and no anti-infective therapy is on her medication list.",
    },
    {
      id: "NCT06797635-exc-6",
      status: "fail",
      rationale: "She has received pembrolizumab (anti-PD-1), neoadjuvant from 12/2025 and adjuvant since 7/21/26, with cycle 4 of 9 given on 9/22/26.",
      evidence: [
        { quote: "pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026)", source: "Clinic note 2026-09-22" },
        { quote: "pembrolizumab 200 mg IV q3 weeks (adjuvant, C4 of 9)", source: "Medications" },
      ],
    },
    {
      id: "NCT06797635-exc-7",
      status: "fail",
      rationale: "She has already had neoadjuvant KEYNOTE-522, bilateral mastectomy with right axillary dissection (6/11/26) and post-mastectomy radiation (completed 8/28/26) for this cancer.",
      evidence: [
        {
          quote: "Surgery 6/11/26: bilateral mastectomy (L risk-reducing) + R ALND -> ypT1c (1.2 cm) ypN1a (2/11), RCB class II (RCB 2.6), margins neg.",
          source: "Clinic note 2026-09-22",
        },
        { quote: "PMRT 7/20/26-8/28/26, completed.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT06797635-exc-8",
      status: "pass",
      rationale: "Prior agents were pembrolizumab, paclitaxel, carboplatin, doxorubicin and cyclophosphamide; no anti-HER3 antibody or exatecan-derivative ADC.",
      evidence: [
        {
          quote: "Neoadj per KEYNOTE-522: pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026) then pembro + ddAC x4 (3/2026-5/2026).",
          source: "Clinic note 2026-09-22",
        },
      ],
    },
    {
      id: "NCT06797635-exc-9",
      status: "pass",
      rationale: "Clinical stage cN1 M0 at diagnosis, and no metastatic disease on CT 7/9/26; no cN3 involvement.",
      evidence: [
        { quote: "cT2 (3.1 cm) cN1 (bx-proven axillary node) M0", source: "Clinic note 2026-09-22" },
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
      ],
    },
    {
      id: "NCT06797635-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy is recorded, and the contralateral risk-reducing mastectomy was benign.",
      evidence: [{ quote: "C. Left breast: benign breast tissue, no atypia, no carcinoma.", source: "Pathology 2026-06-17" }],
    },
    {
      id: "NCT06797635-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no neurological symptoms; brain imaging has not been performed.",
      evidence: [{ quote: "No new lumps, bone pain, HA or cough.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06797635-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD or pneumonitis is recorded: no cough, lungs clear, and the 7/9/26 CT described no lung abnormality, though it predates chest wall radiation (ended 8/28/26).",
      evidence: [
        { quote: "Lungs clear.", source: "Exam 2026-09-22" },
        { quote: "No new lumps, bone pain, HA or cough.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT06797635-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection is documented and no systemic anti-infective therapy is on her medication list.",
    },
    {
      id: "NCT06797635-exc-14",
      status: "unknown",
      confidence: "medium",
      rationale: "Hepatitis B and C serology is not recorded.",
      actionNeeded: "Obtain HBsAg and HCV antibody (HCV RNA if positive); concurrent active HBV and HCV infection excludes",
    },
    {
      id: "NCT06797635-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No pulmonary illness is recorded; she has no respiratory symptoms, lungs are clear and she has never smoked.",
      evidence: [
        { quote: "Lungs clear.", source: "Exam 2026-09-22" },
        { quote: "never smoker", source: "Social history" },
      ],
    },
  ],
);
