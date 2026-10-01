import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06369285",
  "Excluded: needs ≥ 2 prior endocrine lines for metastatic disease; she has had one",
  "This study enrolls patients after at least two endocrine lines in the recurrent or metastatic setting. Linda has had one, letrozole + ribociclib. Her adjuvant anastrozole does not count, because recurrence came about 19 months after it ended, beyond the 6-month window. She meets the remaining criteria (prior CDK4/6 inhibitor, HR+/HER2-, no chemotherapy or Aurora kinase inhibitor), so the trial becomes relevant after progression on a second endocrine-based line such as elacestrant.",
  [
    {
      id: "NCT06369285-inc-1",
      status: "pass",
      rationale: "Age 67, well above the 18-year minimum.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06369285-inc-2",
      status: "pass",
      rationale: "Biopsy-confirmed metastatic breast carcinoma in bone (May 2024), not amenable to curative therapy.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma c/w breast primary, lobular phenotype.", source: "Bone biopsy 2024-05-21" },
        { quote: "Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06369285-inc-3",
      status: "fail",
      rationale: "Only one endocrine line for metastatic disease (letrozole + ribociclib). Adjuvant anastrozole ended October 2022 and recurrence came in May 2024, about 19 months later, so it does not count under the 6-month rule.",
      evidence: [
        { quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Oncology note 2026-09-25" },
        { quote: "May 2024 hip/back pain -> bone scan + CT: multiple bone mets (T/L spine, pelvis, ribs, L prox femur), no visceral dz.", source: "Oncology note 2026-09-25" },
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06369285-inc-4",
      status: "pass",
      rationale: "Received the CDK4/6 inhibitor ribociclib with letrozole for metastatic disease, June 2024 to September 2026.",
      evidence: [{ quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06369285-inc-5",
      status: "pass",
      rationale: "ER 90%/PR 5% positive and HER2 IHC 0 on the 2024 metastatic biopsy, by standard IHC.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Bone biopsy 2024-05-21" },
        { quote: "HER2 IHC: 0 (negative)", source: "Bone biopsy 2024-05-21" },
      ],
    },
    {
      id: "NCT06369285-exc-1",
      status: "pass",
      rationale: "No chemotherapy or chemotherapy-payload ADC in the metastatic setting.",
      evidence: [{ quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06369285-exc-2",
      status: "pass",
      rationale: "Prior systemic therapy is limited to anastrozole, letrozole and ribociclib; no alisertib or other Aurora kinase inhibitor.",
      evidence: [{ quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06369285-exc-3",
      status: "not-applicable",
      rationale: "Informational note rather than a criterion; the site applies the full protocol list at screening.",
    },
  ],
);
