import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06507618",
  "Excluded: pre-operative ET window trial — already had mastectomy, started letrozole and PMRT",
  "POWER II randomises women aged 65 or older with clinically node-negative ER+ cancer who plan breast-conserving surgery to a 3-month pre-operative endocrine window, to inform the radiotherapy decision. Helen has already had a mastectomy (5/12/26) showing pN2a disease, began letrozole on 9/8/26 and is receiving post-mastectomy radiation, so the trial's premise no longer applies and three blockers are documented. Her age, ECOG 1 and ER+/HER2-negative biology would otherwise fit, but nothing further in the work-up could make her eligible.",
  [
    {
      id: "NCT06507618-inc-1",
      status: "fail",
      confidence: "medium",
      rationale: "ER 90% and HER2 not amplified fit, but she is node-positive: 5 of 18 nodes with a 1.6 cm deposit and extranodal extension (pN2a). Her pre-operative clinical nodal status was not recorded.",
      evidence: [
        { quote: "ER: positive, 90%, strong intensity", source: "Pathology 2026-05-19" },
        { quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT06507618-inc-2",
      status: "pass",
      rationale: "ECOG 1 at the 9/25/26 visit, within the required 0–2.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06507618-inc-3",
      status: "pass",
      rationale: "Woman aged 72, above the 65-year minimum.",
      evidence: [{ quote: "72 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06507618-inc-4",
      status: "fail",
      rationale: "She has already had a right modified radical mastectomy (5/12/26), so breast-conserving surgery is no longer possible.",
      evidence: [{ quote: "R MRM 5/12/26", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06507618-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "She is receiving post-mastectomy radiation (started 9/14/26), so she is a radiotherapy candidate, although the RT decision this trial is designed to inform has already been made.",
      evidence: [{ quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06507618-inc-6",
      status: "pass",
      rationale: "Already taking adjuvant letrozole since 9/8/26, so she is an endocrine therapy candidate.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT06507618-inc-7",
      status: "not-applicable",
      rationale: "She takes oral letrozole, but there is no 3-month window before breast-conserving surgery to adhere to, since her mastectomy was done on 5/12/26.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT06507618-inc-8",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to the protocol's lifestyle considerations is confirmed at screening.",
    },
    {
      id: "NCT06507618-inc-9",
      status: "pass",
      confidence: "low",
      rationale: "Signed informed consent is obtained at screening.",
    },
    {
      id: "NCT06507618-inc-10",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to comply and availability for the study duration are confirmed at screening.",
    },
    {
      id: "NCT06507618-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Unilateral disease: the screening mammogram found only a right-sided mass and the left breast has no masses on examination.",
      evidence: [
        { quote: "R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", source: "Screening mammogram 2026-04-02" },
        { quote: "L breast no masses.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06507618-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "A single 3.4 cm right upper-outer mass on mammography and a single 3.8 cm tumor at mastectomy; no multicentric disease is described (no breast MRI on file).",
      evidence: [
        { quote: "R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", source: "Screening mammogram 2026-04-02" },
        { quote: "Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm.", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT06507618-exc-3",
      status: "fail",
      rationale: "She has been taking the aromatase inhibitor letrozole since 9/8/26.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT06507618-exc-4",
      status: "fail",
      rationale: "She is receiving ipsilateral (right) chest wall and regional nodal radiation, started 9/14/26.",
      evidence: [{ quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06507618-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No additional malignancy appears in the history; the only cancer recorded is this right breast cancer.",
    },
    {
      id: "NCT06507618-exc-6",
      status: "pass",
      rationale: "No strong CYP2D6 inhibitor on the medication list (metoprolol is a CYP2D6 substrate, not an inhibitor), and her endocrine agent, letrozole, does not depend on CYP2D6.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
  ],
);
