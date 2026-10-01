import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06245889",
  "Excluded: neoadjuvant trial, and she has already had paclitaxel, carboplatin and pembrolizumab",
  "This pilot treats untreated stage II–III TNBC with neoadjuvant paclitaxel/carboplatin/pembrolizumab and adapts therapy to early PET response. She has already completed that treatment (KEYNOTE-522, 12/2025–5/2026) and had definitive bilateral mastectomy with right ALND on 2026-06-11, so the prior-therapy exclusion applies and there is no primary tumor left to image. Nothing in the record would change this; it is not a route for her post-neoadjuvant residual disease.",
  [
    {
      id: "NCT06245889-inc-1",
      status: "pass",
      rationale: "Right breast TNBC, stage IIB (cT2 cN1 M0) at diagnosis in 11/2025, with ER 0% and PR 0% on core biopsy and residual tumor, well under the 10% limit.",
      evidence: [
        { quote: "R breast IDC grade 3, TNBC, cT2 (3.1 cm) cN1 (bx-proven axillary node) M0, stage IIB, dx 11/2025.", source: "Clinic note 2026-09-22" },
        { quote: "ER 0%, PR 0%, HER2 IHC 0 (negative), Ki-67 75%.", source: "Core biopsy 11/2025" },
      ],
    },
    {
      id: "NCT06245889-inc-2",
      status: "pass",
      rationale: "She is 39 years old (born 1987).",
      evidence: [{ quote: "DOB: 1987 (39 yo F)", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06245889-inc-3",
      status: "pass",
      rationale: "ECOG 0 at the 2026-09-22 visit.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06245889-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Marrow and organ function are adequate on 2026-09-19 (ANC 1.9, Hgb 12.4, Plt 180, Cr 0.7, normal LFTs) and her only autoimmune issue is immune hypothyroidism on replacement. She has, however, already completed neoadjuvant chemo-immunotherapy (see exc-4).",
      evidence: [
        { quote: "WBC 3.4 (L) | ANC 1.9 | Hgb 12.4 | Plt 180", source: "Labs 2026-09-19" },
        { quote: "irAE hypothyroidism G2 - levothyroxine 75 mcg, TSH 3.1, continue.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT06245889-inc-5",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and willingness to consent are confirmed at screening; nothing in the record suggests impaired decision-making (she works as an RN).",
      evidence: [],
    },
    {
      id: "NCT06245889-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No contraindication to PET or MRI is recorded; her port and levonorgestrel IUD are typically MRI-conditional devices.",
      evidence: [{ quote: "Port in situ.", source: "CT CAP 2026-07-09" }],
      actionNeeded: "Confirm port and IUD models are MRI-conditional if imaging were planned",
    },
    {
      id: "NCT06245889-exc-2",
      status: "pass",
      rationale: "No metastatic or locoregional recurrence: post-operative CT CAP on 2026-07-09 showed no metastatic disease and the 2026-09-22 exam found no chest wall nodularity or adenopathy.",
      evidence: [
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
        { quote: "Mastectomy scars well healed, no chest wall nodularity.", source: "Exam 2026-09-22" },
      ],
    },
    {
      id: "NCT06245889-exc-3",
      status: "pass",
      rationale: "Not inflammatory breast cancer: the primary was staged cT2 (3.1 cm), not T4d.",
      evidence: [{ quote: "R breast IDC grade 3, TNBC, cT2 (3.1 cm) cN1 (bx-proven axillary node) M0, stage IIB, dx 11/2025.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06245889-exc-4",
      status: "fail",
      rationale: "She received pembrolizumab with weekly paclitaxel and carboplatin for 12 weeks (12/2025–3/2026) under KEYNOTE-522 and is still on adjuvant pembrolizumab (C4 of 9), so all three excluded agents have been given.",
      evidence: [
        { quote: "pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026)", source: "Clinic note 2026-09-22" },
        { quote: "pembrolizumab 200 mg IV q3 weeks (adjuvant, C4 of 9)", source: "Medications" },
      ],
    },
  ],
);
