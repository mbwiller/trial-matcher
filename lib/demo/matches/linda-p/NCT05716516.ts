import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05716516",
  "Meets all listed criteria · ESR1 Y537S fits the study's ESR1-mutant hypothesis",
  "Linda meets every listed criterion. She is a postmenopausal woman with ER+ metastatic disease and one prior endocrine line in the metastatic setting, is now off letrozole/ribociclib, and has no thrombosis, cardiovascular or second-cancer history. Her ESR1 Y537S is the biomarker this study hypothesises predicts benefit from estradiol, and zoledronic acid may continue. Clinically, estradiol is usually weighed after standard second-line endocrine options such as elacestrant. The site's additional criteria, and a baseline calcium given her extensive bone disease, should be checked at screening.",
  [
    {
      id: "NCT05716516-inc-1",
      status: "pass",
      rationale: "67-year-old postmenopausal woman with ER-positive breast cancer (90% on the 2024 metastasis).",
      evidence: [
        { quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" },
        { quote: "ER: positive, 90%, strong", source: "Bone biopsy 2024-05-21" },
      ],
    },
    {
      id: "NCT05716516-inc-2",
      status: "pass",
      rationale: "Metastatic recurrence in bone since May 2024, now progressing at multiple skeletal sites.",
      evidence: [
        { quote: "Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only", source: "Oncology note 2026-09-25" },
        { quote: "Progression of osseous metastases: new FDG-avid sclerotic/mixed lesions at T10, sacrum and R acetabulum", source: "PET/CT 2026-09-09" },
      ],
    },
    {
      id: "NCT05716516-inc-3",
      status: "pass",
      rationale: "Continuation of the preceding criterion ('not amenable to treatment with curative intent'): her multifocal bone metastases are treated with palliative intent.",
      evidence: [{ quote: "May 2024 hip/back pain -> bone scan + CT: multiple bone mets (T/L spine, pelvis, ribs, L prox femur), no visceral dz.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05716516-inc-4",
      status: "pass",
      rationale: "One prior endocrine-based line for metastatic disease: letrozole + ribociclib from June 2024 to September 2026.",
      evidence: [
        { quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" },
        { quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05716516-exc-1",
      status: "pass",
      rationale: "Letrozole and ribociclib were discontinued on 2026-09-14 (the 'continue ribociclib' plan line is stale); her only ongoing cancer-related drug is zoledronic acid, an anti-resorptive the protocol permits.",
      evidence: [
        { quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" },
        { quote: "zoledronic acid 3.5 mg IV q12 weeks (renal dose)", source: "Medication list" },
      ],
    },
    {
      id: "NCT05716516-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational therapy in her treatment history; her last systemic treatment was standard letrozole + ribociclib.",
    },
    {
      id: "NCT05716516-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS disease and no headache, visual or neurological symptoms; brain imaging has never been performed.",
      evidence: [
        { quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Oncology note 2026-09-25" },
        { quote: "No HA or visual chnages.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05716516-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Her problem list (CKD 3a, diet-controlled diabetes, osteoporosis, depression) records no DVT, PE, stroke, MI or heart failure, and no other malignancy.",
      evidence: [{ quote: "PMH: CKD 3a, T2DM diet-controlled (A1c 6.4% 8/2026), osteoporosis (DEXA 2021 T-score -2.6), depression.", source: "Oncology note 2026-09-25" }],
    },
  ],
);
