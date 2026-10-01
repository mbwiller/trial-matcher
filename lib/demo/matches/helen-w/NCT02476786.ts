import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT02476786",
  "Excluded: primary endocrine-therapy-alone trial — tumor already resected (MRM 5/12/26), pN2a",
  "This study treats women aged 70 or older who have operable, unresected ER+ cancer (cT1–2 N0–1) with endocrine therapy alone in place of surgery. Helen's tumor was removed by mastectomy on 5/12/26 with 5 positive nodes (pN2a), she has no measurable disease left, and she has already completed adjuvant chemotherapy, so the trial cannot apply. Age, ECOG and ER+/HER2-negative status fit, and her Ki-67 of 35% would in any case have required a low–intermediate mitotic score to qualify.",
  [
    {
      id: "NCT02476786-inc-1",
      status: "fail",
      rationale: "Not a newly diagnosed, unoperated cancer: the tumor was resected by mastectomy on 5/12/26 and staged pT2 pN2a (5 positive nodes), beyond the N0–1 limit.",
      evidence: [
        { quote: "R MRM 5/12/26", source: "Oncology note 2026-09-25" },
        { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT02476786-inc-2",
      status: "pass",
      rationale: "ER 90% strong and HER2 IHC 2+ with ISH not amplified, which is HER2-negative by ASCO/CAP.",
      evidence: [
        { quote: "ER: positive, 90%, strong intensity", source: "Pathology 2026-05-19" },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT02476786-inc-3",
      status: "unknown",
      confidence: "medium",
      rationale: "Ki-67 35% exceeds 30%, so eligibility would rest on the mitotic-index alternative; Nottingham grade 3 (8/9) is compatible with a mitotic score of 2 or 3, and the component scores are not reported.",
      evidence: [
        { quote: "Ki-67: 35%", source: "Pathology 2026-05-19" },
        { quote: "Nottingham grade 3 (8/9)", source: "Pathology 2026-05-19" },
      ],
      actionNeeded: "Obtain the Nottingham component scores; a mitotic score ≤ 2 (low–intermediate) is needed since Ki-67 is above 30%",
    },
    {
      id: "NCT02476786-inc-4",
      status: "fail",
      rationale: "No measurable disease: the primary tumor was removed by mastectomy and she has no evidence of disease, so nothing can be measured on ultrasound or mammogram.",
      evidence: [{ quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT02476786-inc-5",
      status: "pass",
      rationale: "Age 72, above the 70-year minimum.",
      evidence: [{ quote: "72 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT02476786-inc-6",
      status: "pass",
      rationale: "ECOG 1 at the 9/25/26 visit, within the ≤3 limit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT02476786-inc-7",
      status: "pass",
      confidence: "low",
      rationale: "Ability to understand and sign informed consent is confirmed at screening.",
    },
    {
      id: "NCT02476786-exc-1",
      status: "fail",
      rationale: "She had a right modified radical mastectomy with axillary clearance for this cancer on 5/12/26.",
      evidence: [{ quote: "R MRM 5/12/26", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT02476786-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy in the last 5 years is recorded; the past history lists only non-cancer conditions.",
    },
    {
      id: "NCT02476786-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent on the medication list; her only current anticancer drug is standard letrozole.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT02476786-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "She is taking letrozole, an aromatase inhibitor akin to the study's anastrozole and exemestane, with only mild hand stiffness; her only recorded allergy is lisinopril cough.",
      evidence: [
        { quote: "Mild hand stiffness since letrozole.", source: "Oncology note 2026-09-25" },
        { quote: "ALLERGIES: lisinopril (cough)", source: "Allergies" },
      ],
    },
    {
      id: "NCT02476786-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are controlled: paroxysmal AF rate-controlled on metoprolol, BP 136/78 on amlodipine and stable CKD 3a; nothing limiting compliance is recorded.",
      evidence: [{ quote: "CKD 3a stable.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT02476786-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No antiretroviral therapy on her complete medication list, so known HIV on combination ART is not present; HIV serology itself is not documented.",
    },
  ],
);
