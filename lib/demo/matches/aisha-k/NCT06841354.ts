import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06841354",
  "Excluded: first-line PD-L1 CPS <10 trial; she is CPS 15 and progressed on first-line therapy",
  "TroFuse-011 is a first-line study for metastatic TNBC with PD-L1 CPS < 10. Aisha is excluded on two independent, documented grounds: her tumor is CPS 15 (22C3, lung metastasis 2025-11-20), and she has already received first-line pembrolizumab + gemcitabine/carboplatin for metastatic disease (12/2025 to 9/2026). Her chemotherapy-related anemia (Hgb 9.8 g/dL, CTCAE grade 2) would also need to recover. Nothing short of a different trial design would change this; sacituzumab tirumotecan is better pursued through a second-line study.",
  [
    {
      id: "NCT06841354-inc-1",
      status: "pass",
      rationale: "De novo metastatic TNBC involving lung, nodes, bone and liver; not curable.",
      evidence: [
        { quote: "De novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), lung/nodal/bone, now new liver met.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-inc-2",
      status: "fail",
      rationale:
        "She has received first-line systemic therapy for metastatic disease: pembrolizumab + gemcitabine/carboplatin from 12/2025 until progression in 9/2026.",
      evidence: [
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: "Oncology note 2026-09-25" },
        { quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-inc-3",
      status: "not-applicable",
      rationale: "She presented with de novo metastatic disease and was never treated for early-stage breast cancer.",
      evidence: [{ quote: "de novo metastatic L breast IDC", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06841354-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Taxane-naive, so paclitaxel or nab-paclitaxel is an option, and no irAE precludes pembrolizumab (G2 hypothyroidism on replacement). Gem/carbo is not a real option after progression on it.",
      evidence: [
        { quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: "Oncology note 2026-09-25" },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-inc-5",
      status: "fail",
      confidence: "medium",
      rationale:
        "Chemotherapy-related anemia with Hgb 9.8 g/dL (2026-09-23) is CTCAE grade 2 (< 10.0 g/dL), not yet ≤ grade 1. Her G2 hypothyroidism is allowed as an endocrine AE on replacement; fatigue and transaminases are grade 1.",
      evidence: [
        { quote: "Anemia (chemo-related): Hgb 9.8, no bleeding.", source: "Oncology note 2026-09-25" },
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Repeat CBC at screening; Hgb ≥ 10.0 g/dL needed for anemia to be ≤ grade 1",
    },
    {
      id: "NCT06841354-inc-6",
      status: "pass",
      rationale:
        "She is HBsAg negative (anti-HBc positive), and in any case has been on entecavir since 12/2025 with HBV DNA undetectable on 2026-08-28.",
      evidence: [
        { quote: "HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: "Serologies 12/2025" },
        { quote: "HBV DNA 08/28/2026: not detected", source: "Labs 2026-09-23" },
      ],
    },
    {
      id: "NCT06841354-inc-7",
      status: "pass",
      rationale: "HCV antibody negative (12/2025); no history of hepatitis C, so this condition does not restrict her.",
      evidence: [{ quote: "HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: "Serologies 12/2025" }],
    },
    {
      id: "NCT06841354-exc-1",
      status: "pass",
      rationale: "Widespread de novo metastatic disease (lung, mediastinal/hilar nodes, bone, liver); no curative-intent option.",
      evidence: [
        { quote: "De novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), lung/nodal/bone, now new liver met.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-exc-2",
      status: "fail",
      rationale: "PD-L1 22C3 CPS 15 on the RLL metastasis biopsy (2025-11-20), above the CPS ≥ 10 exclusion threshold.",
      evidence: [{ quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: "Pathology 2025-11-25" }],
    },
    {
      id: "NCT06841354-exc-3",
      status: "fail",
      rationale:
        "Prior systemic therapy for metastatic disease: first-line pembrolizumab + gemcitabine/carboplatin, last doses 2026-08-26 (gem/carbo) and 2026-09-02 (pembrolizumab).",
      evidence: [
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: "Oncology note 2026-09-25" },
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
      ],
    },
    {
      id: "NCT06841354-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No neuropathy recorded, neuro exam nonfocal, and no prior taxane exposure.",
      evidence: [
        { quote: "Neuro nonfocal.", source: "Oncology note 2026-09-25" },
        { quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No ocular surface or corneal disease in the history and no visual symptoms reported.",
      evidence: [{ quote: "No HA, no visual chnages, no focal weakness.", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Baseline ophthalmologic exam per protocol",
    },
    {
      id: "NCT06841354-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease in the history and no immune-related colitis on pembrolizumab.",
      evidence: [{ quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06841354-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No cardiac history; BP 118/72, HR 88. No cerebrovascular disease mentioned.",
      evidence: [
        { quote: "No DM, no cardiac hx.", source: "Oncology note 2026-09-25" },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-exc-8",
      status: "pass",
      rationale: "Visceral, nodal and bone disease (lung, mediastinal/hilar nodes, T11/iliac, liver); not skin-only.",
      evidence: [
        { quote: "De novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), lung/nodal/bone, now new liver met.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "Lung and new liver metastases without visceral crisis: no cough, SpO2 98% on room air, bilirubin normal, AST/ALT 1.5 × ULN, ECOG 1.",
      evidence: [
        { quote: "No cough/hemoptysis.", source: "Oncology note 2026-09-25" },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: "Oncology note 2026-09-25" },
        { quote: "T bili 0.9", source: "Labs 2026-09-23" },
      ],
    },
    {
      id: "NCT06841354-exc-10",
      status: "pass",
      rationale: "HIV Ag/Ab negative (12/2025).",
      evidence: [{ quote: "HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: "Serologies 12/2025" }],
    },
    {
      id: "NCT06841354-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "The record mentions no other malignancy; germline cancer panel negative.",
      evidence: [{ quote: "Germline panel neg.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06841354-exc-12",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known CNS metastases: baseline brain MRI 2025-11-18 negative and no neurological symptoms, though the brain has not been imaged for about 10 months.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No brain imaging since baseline 11/2025; asymptomatic.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Brain MRI at screening if the protocol requires it",
    },
    {
      id: "NCT06841354-exc-13",
      status: "pass",
      rationale:
        "No autoimmune disease before pembrolizumab; the immune-related hypothyroidism is treated with levothyroxine, which is allowed replacement therapy.",
      evidence: [
        { quote: "No autoimmune dz prior to pembro.", source: "Oncology note 2026-09-25" },
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-exc-14",
      status: "pass",
      rationale: "No pneumonitis on pembrolizumab, and CT 2026-09-15 shows no interstitial lung disease or pneumonitis.",
      evidence: [
        { quote: "No interstitial lung disease or pneumonitis.", source: "CT CAP 2026-09-15" },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06841354-exc-15",
      status: "pass",
      rationale:
        "Neither active hepatitis B (HBsAg negative, HBV DNA not detected 2026-08-28) nor hepatitis C (HCV antibody negative).",
      evidence: [
        { quote: "HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: "Serologies 12/2025" },
        { quote: "HBV DNA 08/28/2026: not detected", source: "Labs 2026-09-23" },
      ],
    },
    {
      id: "NCT06841354-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or solid organ transplant in the history.",
    },
    {
      id: "NCT06841354-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No major surgery: the primary was never resected and her only procedures were core biopsies in November 2025.",
    },
  ],
);
