import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const CT = "CT CAP 2026-08-14";
const LABS = "Labs 2026-09-15";
const MEDS = "Medication list";

export default demoMatch(
  "NCT06263543",
  "Excluded: needs prior T-DXd and ≥ 1 metastatic chemotherapy line; she has had neither",
  "This study tests sacituzumab govitecan after trastuzumab deruxtecan, so it requires prior T-DXd and at least one chemotherapy or ADC line for metastatic disease. Margaret is entering second line after letrozole + palbociclib only, with no chemotherapy, ADC or T-DXd since recurrence, and her oncologist is still planning endocrine-based therapy. Her HR+/HER2-low biology, measurable disease and labs would otherwise qualify, so the study could be revisited after progression on T-DXd.",
  [
    {
      id: "NCT06263543-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Signed informed consent is obtained at screening; she is interested in hearing trial options.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-2",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to comply with study procedures and availability for the study duration are confirmed at screening.",
    },
    {
      id: "NCT06263543-inc-3",
      status: "pass",
      rationale: "Aged 58 (born 1968), above the 18-year minimum.",
      evidence: [{ quote: "58 yo postmenopausal F", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-4",
      status: "pass",
      rationale: "Metastatic breast cancer with HER2 IHC 1+, ISH not amplified on the 2025 liver biopsy (and IHC 1+ on the 2019 primary): HER2-low by local testing.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)", source: PATH },
      ],
    },
    {
      id: "NCT06263543-inc-5",
      status: "pass",
      rationale: "ER 90% and PR 10% on the metastatic liver biopsy, well above the 1% threshold.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 10% of tumor cells, weak to moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT06263543-inc-6",
      status: "fail",
      confidence: "medium",
      rationale: "She has progressed on adjuvant anastrozole and on letrozole + palbociclib, but her oncologist is planning further endocrine-based therapy (capivasertib or alpelisib + fulvestrant), so she is not currently judged endocrine-refractory.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-7",
      status: "pass",
      rationale: "Received palbociclib with letrozole in the metastatic setting from March 2025 to 2026-08-20.",
      evidence: [{ quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-8",
      status: "fail",
      rationale: "No chemotherapy or ADC in the metastatic setting; her only chemotherapy was adjuvant ddAC-T in 2019, and her single metastatic line is letrozole + palbociclib. At least one metastatic chemotherapy regimen is required.",
      evidence: [
        { quote: "adj ddAC-T 5/2019-9/2019", source: NOTE },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT06263543-inc-9",
      status: "fail",
      rationale: "She has never received trastuzumab deruxtecan; her treatment history is ddAC-T, anastrozole, then letrozole + palbociclib, and T-DXd is not among the second-line options discussed.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-10",
      status: "pass",
      rationale: "Radiographic progression in the liver on CT 2026-08-14 during her most recent therapy, letrozole + palbociclib.",
      evidence: [{ quote: "Interval progression of hepatic metastases", source: CT }],
    },
    {
      id: "NCT06263543-inc-11",
      status: "pass",
      rationale: "Measurable liver disease on CT 2026-08-14 (segment VI 3.2 cm), so the bone-only lytic-lesion rule does not arise.",
      evidence: [{ quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-12",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-13",
      status: "pass",
      rationale: "Most recent labs (2026-09-15, 13 days ago) meet all listed marrow and organ thresholds; they fall inside the 28-day window only if enrollment is by 2026-10-13.",
      evidence: [{ quote: "LABS 2026-09-15", source: LABS }],
    },
    {
      id: "NCT06263543-inc-14",
      status: "pass",
      rationale: "Hemoglobin 11.2 g/dL on 2026-09-15 (≥ 9 required); no transfusion recorded.",
      evidence: [{ quote: "Hgb 11.2 (L)", source: LABS }],
    },
    {
      id: "NCT06263543-inc-15",
      status: "pass",
      rationale: "ANC 2.8 × 10⁹/L (2,800/mm³) on 2026-09-15, above 1,500; no G-CSF recorded.",
      evidence: [{ quote: "ANC 2.8", source: LABS }],
    },
    {
      id: "NCT06263543-inc-16",
      status: "pass",
      rationale: "Platelets 210 × 10⁹/L (210,000/mm³) on 2026-09-15; no platelet transfusion recorded.",
      evidence: [{ quote: "Plt 210", source: LABS }],
    },
    {
      id: "NCT06263543-inc-17",
      status: "pass",
      rationale: "Total bilirubin 0.6 mg/dL on 2026-09-15, within normal limits (< 3 × ULN allowed given liver metastases).",
      evidence: [{ quote: "T bili 0.6", source: LABS }],
    },
    {
      id: "NCT06263543-inc-18",
      status: "pass",
      rationale: "AST 34 and ALT 41 U/L on 2026-09-15, not flagged as abnormal and far below 5 × ULN allowed with liver metastases.",
      evidence: [{ quote: "AST 34 | ALT 41", source: LABS }],
    },
    {
      id: "NCT06263543-inc-19",
      status: "pass",
      rationale: "Albumin 3.9 g/dL on 2026-09-15 (≥ 2.5 required).",
      evidence: [{ quote: "Albumin 3.9", source: LABS }],
    },
    {
      id: "NCT06263543-inc-20",
      status: "pass",
      rationale: "Cockcroft-Gault CrCl ≈ 86 mL/min using age 58, weight 71.2 kg and creatinine 0.8 mg/dL (× 0.85), well above 30.",
      evidence: [
        { quote: "Cr 0.8", source: LABS },
        { quote: "Wt 71.2 kg.", source: NOTE },
      ],
    },
    {
      id: "NCT06263543-inc-21",
      status: "unknown",
      confidence: "low",
      rationale: "No coagulation studies are on file; she takes no anticoagulant and liver synthetic function is preserved (albumin 3.9, bilirubin 0.6).",
      actionNeeded: "Obtain PT/INR and aPTT; both ≤ 1.5 × ULN required.",
    },
    {
      id: "NCT06263543-inc-22",
      status: "pass",
      rationale: "Letrozole and palbociclib were stopped 2026-08-20, 39 days ago, beyond the 2-week hormonal and targeted-therapy washouts (the A/P line 'continue letrozole/palbociclib' is a copy-forward). No recent surgery or radiotherapy.",
      evidence: [{ quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT06263543-inc-23",
      status: "pass",
      rationale: "Postmenopausal: natural menopause at about 51, now 58, so no β-hCG is needed.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-24",
      status: "not-applicable",
      rationale: "Postmenopausal woman, not of childbearing potential; contraception requirements do not apply.",
    },
    {
      id: "NCT06263543-inc-25",
      status: "not-applicable",
      rationale: "Applies to male patients only.",
    },
    {
      id: "NCT06263543-inc-26",
      status: "not-applicable",
      rationale: "List of acceptable contraceptive methods; not relevant for a postmenopausal woman.",
    },
    {
      id: "NCT06263543-exc-1",
      status: "pass",
      rationale: "Metastatic disease in liver and bone, not locally advanced disease amenable to curative-intent therapy.",
      evidence: [{ quote: "sclerotic bone mets (T8, L3, R ilium) + 2 liver lesions", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases; asymptomatic and neurologically nonfocal, though she has never had brain imaging.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging.",
    },
    {
      id: "NCT06263543-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Afebrile, with no infection or antibiotics recorded.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "She has never received irinotecan; her only recorded allergy is sulfa (rash).",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
    },
    {
      id: "NCT06263543-exc-5",
      status: "not-applicable",
      rationale: "Postmenopausal (natural menopause at about 51, now 58); pregnancy and breastfeeding do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Not on any investigational drug or interventional trial; she is only now reviewing trial options.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are controlled hypertension, hyperlipidaemia and osteopenia; no psychiatric illness or other confounding condition is recorded.",
      evidence: [{ quote: "HTN - amlodipine, controlled.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No other high-risk condition is documented; ECOG 1 with preserved organ function.",
    },
  ],
);
