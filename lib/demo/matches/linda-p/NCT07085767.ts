import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07085767",
  "Excluded: first-line only, and she has had 27 months of letrozole + ribociclib for metastatic disease",
  "OPERA-02 is a first-line study for patients with no prior systemic therapy for advanced disease. Linda received letrozole + ribociclib from June 2024 until progression in September 2026, which excludes her outright, even though her late recurrence (about 19 months after adjuvant anastrozole) and bone-only disease would otherwise qualify. Her QTcF of 462 ms would also argue against restarting ribociclib. No change in her record would make her eligible.",
  [
    {
      id: "NCT07085767-inc-1",
      status: "pass",
      rationale: "Adult woman, age 67.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-inc-2",
      status: "pass",
      rationale: "ER-positive (90%), HER2 IHC 0 metastatic lobular carcinoma, not amenable to curative therapy.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Bone biopsy 2024-05-21" },
        { quote: "Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07085767-inc-3",
      status: "pass",
      rationale: "Bone-only disease, which this criterion accepts as evaluable.",
      evidence: [{ quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-inc-4",
      status: "pass",
      rationale: "Recurrence in May 2024, about 19 months after completing adjuvant anastrozole in October 2022, beyond the 12-month requirement.",
      evidence: [
        { quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Oncology note 2026-09-25" },
        { quote: "May 2024 hip/back pain -> bone scan + CT: multiple bone mets (T/L spine, pelvis, ribs, L prox femur), no visceral dz.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07085767-inc-5",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "On 2026-09-22: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST/ALT 24/19; creatinine 1.1 with eGFR 52 (stable CKD 3a), adequate by standard thresholds.",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "Cr 1.1 | eGFR 52 (L)", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT07085767-inc-7",
      status: "pass",
      rationale: "Postmenopausal woman, which the trial allows.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-inc-8",
      status: "not-applicable",
      rationale: "GnRH agonist is required only for men and pre- or perimenopausal women; she is postmenopausal.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-exc-1",
      status: "pass",
      rationale: "Recurrence came about 19 months after adjuvant anastrozole was completed, not during it.",
      evidence: [{ quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-exc-2",
      status: "fail",
      rationale: "She received letrozole + ribociclib for metastatic disease from June 2024 to 2026-09-14 (about 27 months), which is prior systemic therapy for advanced disease.",
      evidence: [
        { quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" },
        { quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07085767-exc-3",
      status: "pass",
      rationale: "No prior fulvestrant, elacestrant (oral SERD) or investigational endocrine therapy.",
      evidence: [{ quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07085767-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "She took letrozole and ribociclib for about 27 months without a recorded allergic reaction; her only allergy is codeine (nausea).",
      evidence: [{ quote: "ALLERGIES: codeine (nausea)", source: "Allergies" }],
    },
    {
      id: "NCT07085767-exc-5",
      status: "fail",
      confidence: "medium",
      rationale: "QTcF 462 ms on 2026-09-17 exceeds the 450 ms ceiling for starting ribociclib, on QT-prolonging escitalopram; she also needed a ribociclib dose reduction for grade 3 neutropenia.",
      evidence: [
        { quote: "QTcF 462 ms on 9/17 ECG (440-455 on ribociclib), on escitalopram.", source: "Oncology note 2026-09-25" },
        { quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07085767-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Spinal metastases (T10, L1, L4) but no weakness, numbness, sphincter symptoms or sensory level to suggest cord compression; no known CNS disease, though never imaged.",
      evidence: [
        { quote: "No new weakness, numbness or bowel/bladder sx.", source: "Oncology note 2026-09-25" },
        { quote: "LE strength 5/5, no sensory level.", source: "Oncology note 2026-09-25" },
      ],
    },
  ],
);
