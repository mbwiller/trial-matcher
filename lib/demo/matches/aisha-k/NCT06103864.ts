import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06103864",
  "Excluded: first-line only, and she has progressed on first-line pembrolizumab + gem/carbo",
  "TROPION-Breast05 enrolls previously untreated PD-L1-positive metastatic TNBC. Aisha matches the biology (CPS 15 on 22C3, HER2 IHC 0) and is ADC-naive with adequate labs, but she has already had first-line pembrolizumab + gemcitabine/carboplatin for metastatic disease (12/2025 to 9/2026), which the study excludes outright. That single documented blocker cannot be resolved; a second-line Dato-DXd or other TROP2-ADC study would be the route for this drug class.",
  [
    {
      id: "NCT06103864-inc-1",
      status: "pass",
      rationale:
        "Histologically confirmed metastatic TNBC: ER 0%, PR 0%, HER2 IHC 0 on the RLL metastasis (2025-11-20), concordant with the breast core.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).", source: "Pathology 2025-11-25" },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: "Pathology 2025-11-25" },
      ],
    },
    {
      id: "NCT06103864-inc-2",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06103864-inc-3",
      status: "pass",
      rationale:
        "Archival FFPE core from the RLL metastasis, collected 2025-11-20 (about 10 months ago, within 3 years), is available; she is also open to a liver biopsy.",
      evidence: [
        { quote: "Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.", source: "Oncology note 2026-09-25" },
        { quote: "Collected: 11/20/2025", source: "Pathology 2025-11-25" },
      ],
    },
    {
      id: "NCT06103864-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Local PD-L1 22C3 pharmDx CPS 15 on the RLL metastasis, above CPS ≥ 10; the protocol requires central-laboratory confirmation.",
      evidence: [{ quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: "Pathology 2025-11-25" }],
      actionNeeded: "Submit tissue for central 22C3 PD-L1 testing; CPS ≥ 10 required",
    },
    {
      id: "NCT06103864-inc-5",
      status: "fail",
      rationale:
        "She has received systemic therapy for metastatic disease: first-line pembrolizumab + gemcitabine/carboplatin from 12/2025, discontinued for progression in 9/2026.",
      evidence: [
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: "Oncology note 2026-09-25" },
        { quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06103864-inc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "Taxane-naive with no neuropathy and adequate counts, so paclitaxel or nab-paclitaxel is a reasonable option; gem/carbo is not, given progression on it.",
      evidence: [{ quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06103864-inc-7",
      status: "pass",
      rationale: "Measurable disease on CT 2026-09-15: liver segment VI 2.1 cm and RLL nodule 1.8 cm.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06103864-inc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 2026-09-23: ANC 1.6, platelets 132, Hgb 9.8 g/dL, creatinine 0.7 (CrCl ~108 mL/min), bilirubin 0.9, AST/ALT 1.5 × ULN with liver metastasis. All meet standard thresholds; ANC and Hgb are close to them.",
      evidence: [
        { quote: "ANC 1.6", source: "Labs 2026-09-23" },
        { quote: "Hgb 9.8 (L)", source: "Labs 2026-09-23" },
        { quote: "AST 58 (H, 1.5x ULN)", source: "Labs 2026-09-23" },
      ],
      actionNeeded: "Repeat CBC and chemistry at screening against protocol thresholds (typically ANC ≥ 1.5, Hgb ≥ 9 g/dL)",
    },
    {
      id: "NCT06103864-inc-9",
      status: "pass",
      confidence: "low",
      rationale:
        "Premenopausal and of childbearing potential; bilateral tubal ligation (2014) is a highly effective method. The contraception agreement is confirmed at consent.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06103864-exc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "No severe or uncontrolled comorbidity recorded: BP 118/72, no cardiac history, no diverticular or bleeding disorder, resolved hepatitis B controlled on entecavir.",
      evidence: [
        { quote: "No DM, no cardiac hx.", source: "Oncology note 2026-09-25" },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06103864-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "The record mentions no other primary malignancy; germline cancer panel negative.",
      evidence: [{ quote: "Germline panel neg.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06103864-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain metastases or cord compression: baseline MRI 2025-11-18 negative and no neurological symptoms, though the brain has not been re-imaged in about 10 months.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No brain imaging since baseline 11/2025; asymptomatic.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Brain MRI at screening if the protocol requires it",
    },
    {
      id: "NCT06103864-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No infection is recorded; entecavir is oral prophylaxis, and no IV antimicrobials are listed.",
      evidence: [{ quote: "entecavir 0.5 mg PO daily (HBV ppx)", source: "Medication list" }],
    },
    {
      id: "NCT06103864-exc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "Resolved hepatitis B (HBsAg negative, anti-HBc positive) with HBV DNA not detected on 2026-08-28 on entecavir; HCV antibody negative.",
      evidence: [
        { quote: "HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: "Serologies 12/2025" },
        { quote: "HBV DNA 08/28/2026: not detected", source: "Labs 2026-09-23" },
      ],
      actionNeeded: "Repeat HBV DNA at screening and continue entecavir; confirm protocol accepts resolved HBV on prophylaxis",
    },
    {
      id: "NCT06103864-exc-6",
      status: "pass",
      rationale: "HIV Ag/Ab negative (12/2025).",
      evidence: [{ quote: "HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: "Serologies 12/2025" }],
    },
    {
      id: "NCT06103864-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No cardiac history; BP 118/72, HR 88. No echocardiogram or ECG is on file.",
      evidence: [
        { quote: "No DM, no cardiac hx.", source: "Oncology note 2026-09-25" },
        { quote: "No echo or ECG on file; order if trial requires.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Obtain ECG (QTc) and echocardiogram at screening as the protocol requires",
    },
    {
      id: "NCT06103864-exc-8",
      status: "pass",
      rationale: "No pneumonitis on pembrolizumab, and CT 2026-09-15 shows no interstitial lung disease or pneumonitis.",
      evidence: [
        { quote: "No interstitial lung disease or pneumonitis.", source: "CT CAP 2026-09-15" },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06103864-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "Bilateral lung metastases but no respiratory compromise: never smoker, no cough, lungs clear, SpO2 98% on room air; no asthma or COPD recorded.",
      evidence: [
        { quote: "No cough/hemoptysis.", source: "Oncology note 2026-09-25" },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: "Oncology note 2026-09-25" },
        { quote: "Lungs clear.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06103864-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal disease in the history and no visual symptoms reported.",
      evidence: [{ quote: "No HA, no visual chnages, no focal weakness.", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Baseline ophthalmologic exam per protocol",
    },
    {
      id: "NCT06103864-exc-11",
      status: "unknown",
      confidence: "medium",
      rationale:
        "No autoimmune disease before pembrolizumab, but she has a documented immune-related thyroiditis (G2 hypothyroidism, 2/2026) on levothyroxine. Whether this counts depends on the protocol's replacement-therapy exception, which is not in the criterion text.",
      evidence: [
        { quote: "No autoimmune dz prior to pembro.", source: "Oncology note 2026-09-25" },
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Confirm with the sponsor that immune-related hypothyroidism stable on hormone replacement is allowed",
    },
    {
      id: "NCT06103864-exc-12",
      status: "pass",
      rationale: "ADC-naive: no prior topoisomerase-I-payload ADC or TROP2-directed therapy.",
      evidence: [{ quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT06103864-exc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "All anticancer treatment has been on hold since progression and is listed as discontinued; denosumab is bone-supportive. The A/P line 'C9 D1 pembro/gem/carbo today' contradicts this and reads as copy-forward.",
      evidence: [
        { quote: "All tx on hold since.", source: "Oncology note 2026-09-25" },
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
      ],
      actionNeeded: "Confirm no anticancer therapy was given on 2026-09-25 (stale 'C9 D1 today' line in the A/P)",
    },
    {
      id: "NCT06103864-exc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "She received about 9 months of pembrolizumab with no hypersensitivity recorded; the only allergy listed is penicillin, and she has never received Dato-DXd.",
      evidence: [
        { quote: "ALLERGIES: penicillin (hives)", source: "Allergies" },
        { quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT06103864-exc-15",
      status: "unknown",
      confidence: "low",
      rationale:
        "Premenopausal with tubal ligation in 2014, so pregnancy is unlikely, but no pregnancy test is documented.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Obtain serum or urine pregnancy test at screening (must be negative); confirm not breastfeeding",
    },
  ],
);
