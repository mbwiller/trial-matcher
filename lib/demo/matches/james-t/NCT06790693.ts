import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const PRIOR = "Prior pathology 2021";
const NGS = "Tissue NGS 2025-02-12";
const LABS = "Labs 2026-09-22";

export default demoMatch(
  "NCT06790693",
  "Excluded: first-line, PIK3CA-mutant, endocrine-sensitive only; he is none of these",
  "This first-line study is for endocrine-sensitive, PIK3CA-mutated HR+/HER2-negative advanced breast cancer. He is PIK3CA wild-type on 2025 tissue NGS, recurred during adjuvant tamoxifen rather than after a 1-year disease-free interval, and has already received letrozole + leuprolide + abemaciclib for metastatic disease. Each of these independently excludes him and none is likely to change.",
  [
    {
      id: "NCT06790693-inc-1",
      status: "pass",
      rationale: "Man with histologically confirmed breast carcinoma (left IDC 2021, lung metastasis biopsy 2025); the trial enrolls men.",
      evidence: [
        { quote: "61 yo M w/ hx L breast IDC dx 4/2021", source: NOTE },
        { quote: "DIAGNOSIS: Metastatic carcinoma, consistent with breast primary.", source: PATH },
      ],
    },
    {
      id: "NCT06790693-inc-2",
      status: "pass",
      rationale: "ER 85% and PR 30% on the January 2025 lung metastasis.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 30% of tumor cells, moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT06790693-inc-3",
      status: "pass",
      rationale: "HER2 IHC 1+ with ISH not amplified, negative by ASCO/CAP (HER2-low).",
      evidence: [{ quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH }],
    },
    {
      id: "NCT06790693-inc-4",
      status: "fail",
      rationale:
        "Not de novo, and not endocrine-sensitive relapse: he recurred in January 2025 while still on adjuvant tamoxifen (about 3 years in), so there was progression during adjuvant therapy and no 1-year disease-free interval after it.",
      evidence: [
        { quote: "stage IIB (pT2 pN1a)", source: NOTE },
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
      ],
    },
    {
      id: "NCT06790693-inc-5",
      status: "not-applicable",
      rationale: "Applies to bilateral breast cancer; he has had only a left-sided primary.",
      evidence: [{ quote: "61 yo M w/ hx L breast IDC dx 4/2021", source: NOTE }],
    },
    {
      id: "NCT06790693-inc-6",
      status: "fail",
      rationale: "Biomarker eligibility requires a PIK3CA mutation; tissue NGS of the lung metastasis (2025-02-12) found none.",
      evidence: [{ quote: "PIK3CA: no alterations detected (wild-type)", source: NGS }],
    },
    {
      id: "NCT06790693-inc-7",
      status: "pass",
      confidence: "low",
      rationale: "Archival tissue from the 2025 lung biopsy and 2021 mastectomy exists; consent to provide it is confirmed at screening.",
      evidence: [{ quote: "ER 90%, PR 70%, HER2 IHC 1+ (negative), Ki-67 15%.", source: PRIOR }],
    },
    {
      id: "NCT06790693-inc-8",
      status: "pass",
      rationale: "RECIST-measurable: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT06790693-inc-9",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06790693-inc-10",
      status: "pass",
      rationale: "Labs 2026-09-22 are adequate (ANC 1.7, platelets 190, Hgb 11.8, creatinine 1.1, AST/ALT 26/31, bilirubin 0.7); they fall outside the 14-day window after 2026-10-06.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
      actionNeeded: "Repeat labs within 14 days of starting study treatment",
    },
    {
      id: "NCT06790693-exc-1",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding do not apply; he is male.",
    },
    {
      id: "NCT06790693-exc-2",
      status: "pass",
      rationale: "Histology is invasive ductal carcinoma, not metaplastic.",
      evidence: [{ quote: "IDC, grade 2 (Nottingham 7/9)", source: PRIOR }],
    },
    {
      id: "NCT06790693-exc-3",
      status: "fail",
      rationale: "He has already received first-line letrozole + leuprolide + abemaciclib for metastatic disease (February 2025 to 2026-09-15).",
      evidence: [{ quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-4",
      status: "pass",
      rationale: "No diabetes of either type is recorded, and he takes no antihyperglycemic drug.",
      evidence: [{ quote: "No VTE. No DM.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease: no headache, visual change or focal weakness and a nonfocal neuro exam.",
      evidence: [{ quote: "No HA, visual change or focal weakness. Has never had brain imaging.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no neurological symptoms; the brain has never been imaged.",
      evidence: [{ quote: "No brain MRI (asymptomatic); obtain if required for trial baseline.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No eye inflammation, infection or uveitis is recorded in his history.",
    },
    {
      id: "NCT06790693-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No non-malignant lung disease is recorded; his mild dry cough without dyspnea (SpO2 96%) accompanies the chest metastases.",
      evidence: [{ quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease in his history.",
    },
    {
      id: "NCT06790693-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No active bowel inflammation; abemaciclib-related diarrhea resolved after stopping.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or bone marrow transplant in his treatment history.",
    },
    {
      id: "NCT06790693-exc-12",
      status: "pass",
      rationale: "Current medications (leuprolide, denosumab, lisinopril, rosuvastatin, calcium/vitamin D) include no strong CYP3A4 inhibitor or inducer.",
      evidence: [{ quote: "rosuvastatin 10 mg PO daily", source: "Medications" }],
    },
  ],
);
