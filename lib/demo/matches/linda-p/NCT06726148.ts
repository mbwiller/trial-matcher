import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06726148",
  "Excluded: ribociclib was dose-reduced for G3 neutropenia, which bars the ribociclib combination",
  "With one metastatic line she would enter only the Phase II part (ECI830 + ribociclib + fulvestrant), since the Phase I breast cohort needs a further line after CDK4/6 inhibitor therapy. The combination excludes anyone who needed a ribociclib dose reduction for toxicity, and hers was reduced to 400 mg in October 2024 for grade 3 neutropenia. QTcF 462 ms on a QT-prolonging SSRI would also be a problem with ribociclib, and her bone-only disease would need a predominantly lytic lesion. Better aligned options exist for her.",
  [
    {
      id: "NCT06726148-inc-1",
      status: "pass",
      rationale: "Age 67, within the 18–100 range.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-inc-2",
      status: "pass",
      rationale: "Heading for the indications that follow; she matches the Phase II HR+/HER2- advanced breast cancer indication (progression on letrozole + ribociclib).",
      evidence: [{ quote: "Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-inc-3",
      status: "not-applicable",
      confidence: "medium",
      rationale: "Phase I breast cohort, which needs a further systemic line after CDK4/6 inhibitor therapy; with only one metastatic line she would enter through the Phase II indication instead.",
      evidence: [{ quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-inc-4",
      status: "not-applicable",
      rationale: "Applies to the Phase I CCNE1-amplified solid tumor cohort only; she would enter the breast cancer cohort.",
    },
    {
      id: "NCT06726148-inc-5",
      status: "not-applicable",
      rationale: "Applies to the Phase I extensive-stage small cell lung cancer cohort only.",
    },
    {
      id: "NCT06726148-inc-6",
      status: "pass",
      rationale: "HR+/HER2- metastatic disease progressing on letrozole + ribociclib given for metastatic disease, her only endocrine line in that setting (≤ 2 allowed).",
      evidence: [
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" },
        { quote: "HER2 IHC: 0 (negative)", source: "Bone biopsy 2024-05-21" },
      ],
    },
    {
      id: "NCT06726148-inc-7",
      status: "not-applicable",
      rationale: "She has no RECIST-measurable disease (bone-only); as a breast cancer patient without measurable disease she is assessed under the lytic bone lesion alternative in the next criterion.",
      evidence: [{ quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-inc-8",
      status: "unknown",
      confidence: "medium",
      rationale: "The left iliac lesion is mixed lytic/sclerotic with a 2.3 cm lytic component and no soft-tissue mass; whether it is predominantly lytic is not stated, and the new lesions are sclerotic/mixed.",
      evidence: [
        { quote: "Mixed lytic/sclerotic L iliac lesion, lytic component 2.3 cm, no extraosseous soft tissue component.", source: "PET/CT 2026-09-09" },
      ],
      actionNeeded: "Ask radiology to confirm the left iliac lesion is predominantly lytic and reproducibly measurable on CT/MRI",
    },
    {
      id: "NCT06726148-exc-1",
      status: "pass",
      rationale: "No prior CDK2 inhibitor; her only cyclin-dependent kinase inhibitor was the CDK4/6 inhibitor ribociclib.",
      evidence: [{ quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "On 2026-09-22: ANC 1.7, platelets 168, Hgb 11.4, bilirubin 0.5, AST/ALT 24/19. Creatinine 1.1 gives a Cockcroft-Gault clearance of about 52 mL/min; alkaline phosphatase 162 reflects bone metastases.",
      evidence: [
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
        { quote: "Cr 1.1 | eGFR 52 (L)", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Check the protocol renal threshold against a Cockcroft-Gault clearance of about 52 mL/min",
    },
    {
      id: "NCT06726148-exc-3",
      status: "fail",
      confidence: "medium",
      rationale: "QTcF 462 ms on 2026-09-17, above the 460 ms upper limit for women and the usual 450 ms ribociclib threshold, while on QT-prolonging escitalopram (a TdP risk factor). This may clear after a switch to sertraline and a repeat ECG.",
      evidence: [
        { quote: "QTcF 462 ms on 9/17 ECG (440-455 on ribociclib), on escitalopram.", source: "Oncology note 2026-09-25" },
        { quote: "If trial requires QTcF <450 consider switch to sertraline.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Switch escitalopram to sertraline and repeat the ECG off ribociclib; confirm QTcF meets the protocol limit",
    },
    {
      id: "NCT06726148-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no neurological symptoms; brain imaging has never been performed.",
      evidence: [{ quote: "No brain imaging to date (asymptomatic); MRI if trial requires.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Heading only. As a Phase II entrant she would receive ECI830 with ribociclib and fulvestrant, so the combination exclusions that follow apply to her and are judged individually.",
    },
    {
      id: "NCT06726148-exc-6",
      status: "pass",
      rationale: "Bone-only disease with no visceral involvement on PET/CT 2026-09-09; she remains a candidate for endocrine-based therapy.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
    {
      id: "NCT06726148-exc-7",
      status: "fail",
      rationale: "Ribociclib had to be reduced to 400 mg from October 2024 because of grade 3 neutropenia, a dose reduction for an adverse event during her previous course.",
      evidence: [{ quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06726148-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No hormone replacement therapy on her medication list.",
    },
    {
      id: "NCT06726148-exc-9",
      status: "not-applicable",
      rationale: "Contraception, pregnancy and nursing exclusions cannot apply to a 67-year-old postmenopausal woman.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
  ],
);
