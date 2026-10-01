import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07288359",
  "Fits Phase II GVV858 + fulvestrant after 1L AI + ribociclib · lytic iliac lesion and QTcF to confirm",
  "Linda matches the Phase II breast indication: HR+/HER2- disease progressing on letrozole + ribociclib, one endocrine line for advanced disease, and no chemotherapy or ADC. The Phase I breast cohort needs a further line and does not apply. Two screening items decide entry. Her bone-only disease must include a predominantly lytic, reproducibly measurable lesion (the left iliac lesion is mixed, 2.3 cm lytic component), and QTcF 462 ms on escitalopram needs a repeat ECG, ideally after the switch to sertraline the team has already considered.",
  [
    {
      id: "NCT07288359-inc-1",
      status: "pass",
      rationale: "Age 67, well above the 18-year minimum.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07288359-inc-2",
      status: "pass",
      rationale: "Histologically confirmed metastatic breast carcinoma (left iliac bone biopsy, May 2024), one of the listed advanced cancers.",
      evidence: [{ quote: "DIAGNOSIS: Metastatic carcinoma c/w breast primary, lobular phenotype.", source: "Bone biopsy 2024-05-21" }],
    },
    {
      id: "NCT07288359-inc-3",
      status: "not-applicable",
      confidence: "medium",
      rationale: "Phase I breast indication requiring an additional systemic line after CDK4/6 inhibitor therapy; with only one metastatic line she would enter through the Phase II indication.",
      evidence: [{ quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07288359-inc-4",
      status: "not-applicable",
      rationale: "Applies to the CCNE1-amplified solid tumor cohort only; she would enter the breast cancer cohort.",
    },
    {
      id: "NCT07288359-inc-5",
      status: "not-applicable",
      rationale: "Applies to the metastatic castration-resistant prostate cancer cohort only.",
    },
    {
      id: "NCT07288359-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Meets the Phase II indication: progression on letrozole + ribociclib, one endocrine line for advanced disease, no chemotherapy or ADC. Her disease is not RECIST-measurable, so the lytic bone lesion alternative (next criterion) governs disease assessment.",
      evidence: [
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" },
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" },
        { quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07288359-inc-7",
      status: "unknown",
      confidence: "medium",
      rationale: "No measurable disease; the left iliac lesion is mixed lytic/sclerotic with a 2.3 cm lytic component and no soft-tissue mass, and whether it is predominantly lytic is not stated.",
      evidence: [{ quote: "Mixed lytic/sclerotic L iliac lesion, lytic component 2.3 cm, no extraosseous soft tissue component.", source: "PET/CT 2026-09-09" }],
      actionNeeded: "Ask radiology to confirm the left iliac lesion is predominantly lytic and reproducibly measurable on CT/MRI",
    },
    {
      id: "NCT07288359-inc-8",
      status: "not-applicable",
      rationale: "Applies to the metastatic castration-resistant prostate cancer cohort only.",
    },
    {
      id: "NCT07288359-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "On 2026-09-22: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST/ALT 24/19. Creatinine 1.1 gives a Cockcroft-Gault clearance of about 52 mL/min (CKD 3a, stable).",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "Cr 1.1 | eGFR 52 (L)", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Check the protocol renal threshold against a Cockcroft-Gault clearance of about 52 mL/min",
    },
    {
      id: "NCT07288359-exc-2",
      status: "unknown",
      confidence: "medium",
      rationale: "No MI, CABG or heart disease, but QTcF is 462 ms (2026-09-17), just above the 460 ms female upper limit, on QT-prolonging escitalopram; whether this counts as an exclusionary repolarization abnormality depends on the protocol limit.",
      evidence: [
        { quote: "QTcF 462 ms on 9/17 ECG (440-455 on ribociclib), on escitalopram.", source: "Oncology note 2026-09-25" },
        { quote: "If trial requires QTcF <450 consider switch to sertraline.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Switch escitalopram to sertraline, repeat the ECG off ribociclib and compare QTcF with the protocol limit",
    },
    {
      id: "NCT07288359-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no neurological symptoms; brain imaging has never been performed.",
      evidence: [
        { quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Oncology note 2026-09-25" },
        { quote: "No HA or visual chnages.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07288359-exc-4",
      status: "pass",
      rationale: "Bone-only disease with no visceral involvement on PET/CT 2026-09-09.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT07288359-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No hormone replacement therapy on her medication list.",
    },
    {
      id: "NCT07288359-exc-6",
      status: "not-applicable",
      rationale: "Contraception, pregnancy and nursing exclusions cannot apply to a 67-year-old postmenopausal woman.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
  ],
);
