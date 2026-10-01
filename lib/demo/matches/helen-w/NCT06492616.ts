import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06492616",
  "Excluded: needs 24–60 months of adjuvant ET at randomization; letrozole started 9/8/26",
  "This phase 3 trial compares elacestrant with standard endocrine therapy in node-positive ER+/HER2-negative early breast cancer after 24–60 months of adjuvant endocrine therapy. Helen fits the risk and biology criteria well (5/18 nodes, grade 3, ER 90%, HER2 IHC 2+/ISH not amplified), but she has taken letrozole for only 3 weeks, so she cannot enter now. She would reach 24 months on 9/8/28; adjuvant abemaciclib or ribociclib started after radiotherapy would not preclude later entry, provided it is completed before randomization.",
  [
    {
      id: "NCT06492616-inc-1",
      status: "pass",
      rationale: "ER 90% (≥10%) and HER2 IHC 2+ with ISH not amplified; resected early-stage disease with negative staging CT and bone scan and no recurrence since.",
      evidence: [
        { quote: "ER: positive, 90%, strong intensity", source: "Pathology 2026-05-19" },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: "Pathology 2026-05-19" },
        { quote: "No evidence of distant metastatic disease.", source: "Staging CT + bone scan 2026-05-21" },
      ],
    },
    {
      id: "NCT06492616-inc-2",
      status: "pass",
      rationale: "Five of 18 axillary nodes were positive, meeting the ≥4-node criterion outright (the tumor is also grade 3).",
      evidence: [{ quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT06492616-inc-3",
      status: "fail",
      rationale: "Letrozole started 9/8/26, giving 20 days of endocrine therapy as of 9/28/26 against the 24–60 months required at randomization; 24 months would be reached on 9/8/28.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT06492616-inc-4",
      status: "pass",
      rationale: "No CDK4/6 inhibitor or PARP inhibitor to date; if adjuvant abemaciclib (2 years) or ribociclib (3 years) is started after radiotherapy, it must be finished before randomization.",
      evidence: [{ quote: "Discussed adj abemaciclib x2 yrs vs ribociclib x3 yrs (w/ AI) vs clinical trial", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06492616-exc-1",
      status: "pass",
      rationale: "Screen-detected spiculated mass staged pT2 at mastectomy; no skin involvement or inflammatory features are recorded.",
      evidence: [
        { quote: "found on screening mammo 4/2026", source: "Oncology note 2026-09-25" },
        { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT06492616-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "This right breast cancer, diagnosed 4/14/26, is her first; no prior invasive breast cancer appears in her history (the breast cancer in the family history is her sister's).",
      evidence: [{ quote: "FHx: sister breast ca at 66.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06492616-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No non-breast malignancy is recorded in the past medical history.",
    },
    {
      id: "NCT06492616-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "On letrozole continuously since 9/8/26 with no interruption recorded; continuity over the coming 24 months would be checked at screening.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
      actionNeeded: "Confirm no endocrine therapy interruption longer than 6 months before randomization",
    },
  ],
);
