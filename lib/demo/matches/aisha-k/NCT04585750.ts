import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const NGS = "Tissue NGS 2025-12-12";
const LABS = "Labs 2026-09-23";

export default demoMatch(
  "NCT04585750",
  "Excluded: requires TP53 Y220C; her tumor carries TP53 R248Q",
  "Rezatapopt is a Y220C-specific p53 reactivator, and enrollment in every part of this study requires a TP53 Y220C mutation. Aisha's tissue NGS (RLL metastasis, 2025-12-12) shows TP53 p.R248Q, a different hotspot that the drug does not target, so she is ineligible on a documented molecular fact. Otherwise she would fit well (one prior line with progression, ECOG 1, measurable disease, adequate labs); only a new Y220C finding on repeat sequencing would change this.",
  [
    {
      id: "NCT04585750-inc-1",
      status: "pass",
      rationale: "She is 46 years old.",
      evidence: [{ quote: "46 yo premenopausal F", source: NOTE }],
    },
    {
      id: "NCT04585750-inc-2",
      status: "fail",
      rationale: "Metastatic TNBC, but tissue NGS (2025-12-12) shows TP53 p.R248Q, not the required Y220C mutation.",
      evidence: [{ quote: "TP53 p.R248Q (c.743G>A), VAF 41% - pathogenic", source: NGS }],
    },
    {
      id: "NCT04585750-inc-3",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT04585750-inc-4",
      status: "pass",
      rationale: "One prior line (pembrolizumab + gemcitabine/carboplatin) with progression on CT 2026-09-15.",
      evidence: [{ quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE }],
    },
    {
      id: "NCT04585750-inc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "On 2026-09-23: ANC 1.6, platelets 132, Hgb 9.8, creatinine 0.7, bilirubin 0.9, AST/ALT 1.5 × ULN with liver metastasis — adequate by standard thresholds.",
      evidence: [
        { quote: "ANC 1.6", source: LABS },
        { quote: "Plt 132 (L)", source: LABS },
        { quote: "AST 58 (H, 1.5x ULN)", source: LABS },
      ],
    },
    {
      id: "NCT04585750-inc-6",
      status: "pass",
      rationale: "RECIST-measurable liver (2.1 cm) and RLL (1.8 cm) lesions on CT 2026-09-15.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT04585750-inc-7",
      status: "pass",
      rationale: "Not anti-PD-1 naive, but she progressed on pembrolizumab (CT 2026-09-15), which satisfies this criterion.",
      evidence: [{ quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE }],
    },
    {
      id: "NCT04585750-inc-8",
      status: "pass",
      rationale: "Measurable disease: liver segment VI 2.1 cm and RLL 1.8 cm.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT04585750-exc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "Last gemcitabine/carboplatin 2026-08-26 (33 days) and last pembrolizumab 2026-09-02 (26 days before 2026-09-28), both beyond 21 days; treatment on hold since progression.",
      evidence: [
        { quote: "Last gem/carbo 8/26/26.", source: NOTE },
        { quote: "Pembro deferred 1 wk for AST/ALT ~2x ULN (HBV DNA neg), last dose 9/2/26.", source: NOTE },
      ],
    },
    {
      id: "NCT04585750-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No radiotherapy is recorded.",
    },
    {
      id: "NCT04585750-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No primary CNS tumor; baseline brain MRI 2025-11-18 showed no intracranial lesion.",
      evidence: [{ quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" }],
    },
    {
      id: "NCT04585750-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease or cord compression: neuro exam nonfocal, no focal weakness, T11 lesion sclerotic and unchanged.",
      evidence: [
        { quote: "Neuro nonfocal.", source: NOTE },
        { quote: "Sclerotic (treated) T11 and left iliac lesions, unchanged.", source: "CT CAP 2026-09-15" },
      ],
    },
    {
      id: "NCT04585750-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases (baseline MRI negative) and asymptomatic, though not re-imaged since 11/2025.",
      evidence: [{ quote: "No brain imaging since baseline 11/2025; asymptomatic.", source: NOTE }],
    },
    {
      id: "NCT04585750-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No stroke or TIA is recorded; neuro exam nonfocal.",
    },
    {
      id: "NCT04585750-exc-7",
      status: "unknown",
      confidence: "low",
      rationale: "No cardiac history and BP 118/72, but no ECG has been done, so QT interval and rhythm are undocumented; she uses ondansetron as needed.",
      evidence: [
        { quote: "No echo or ECG on file; order if trial requires.", source: NOTE },
        { quote: "ondansetron 8 mg PO q8h prn nausea", source: "Medication list" },
      ],
      actionNeeded: "Obtain 12-lead ECG; exclude QTc prolongation or other rhythm abnormality",
    },
    {
      id: "NCT04585750-exc-8",
      status: "pass",
      rationale: "Medication list (levothyroxine, entecavir, denosumab, ondansetron prn, calcium/vitamin D) contains no strong CYP3A4 inducer or CYP2C9 inhibitor/inducer.",
      evidence: [{ quote: "entecavir 0.5 mg PO daily (HBV ppx)", source: "Medication list" }],
    },
    {
      id: "NCT04585750-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Takes daily oral levothyroxine and entecavir; no GI disease affecting absorption is recorded.",
      evidence: [{ quote: "levothyroxine 88 mcg PO daily", source: "Medication list" }],
    },
    {
      id: "NCT04585750-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No organ transplant is mentioned.",
    },
    {
      id: "NCT04585750-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than the breast cancer under study is recorded.",
    },
    {
      id: "NCT04585750-exc-12",
      status: "pass",
      rationale: "Resolved HBV controlled on entecavir (HBsAg negative, DNA not detected 2026-08-28); HCV Ab and HIV negative.",
      evidence: [
        { quote: "HBV DNA 08/28/2026: not detected", source: LABS },
        { quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS },
      ],
    },
    {
      id: "NCT04585750-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No KRAS mutation was reported on tissue NGS (2025-12-12), which listed TP53 R248Q as the only pathogenic finding.",
      evidence: [{ quote: "TP53 p.R248Q (c.743G>A), VAF 41% - pathogenic", source: NGS }],
    },
    {
      id: "NCT04585750-exc-14",
      status: "pass",
      rationale: "Pembrolizumab was stopped for progression, not toxicity; her only irAE was grade 2 hypothyroidism.",
      evidence: [
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: NOTE },
      ],
    },
    {
      id: "NCT04585750-exc-15",
      status: "pass",
      confidence: "low",
      rationale: "No live vaccine is recorded; confirmed at screening.",
      actionNeeded: "Confirm no live or live-attenuated vaccine within 30 days before first dose",
    },
    {
      id: "NCT04585750-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "HIV negative and no systemic steroids on the medication list.",
      evidence: [{ quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS }],
    },
    {
      id: "NCT04585750-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "Received pembrolizumab for ~9 months with no hypersensitivity reaction recorded; only penicillin allergy listed.",
      evidence: [{ quote: "ALLERGIES: penicillin (hives)", source: "Allergies" }],
    },
    {
      id: "NCT04585750-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "Immune-related hypothyroidism is managed with levothyroxine replacement only, conventionally not counted as systemic treatment; no other autoimmune disease.",
      evidence: [{ quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: NOTE }],
    },
    {
      id: "NCT04585750-exc-19",
      status: "pass",
      confidence: "medium",
      rationale: "She has never had radiotherapy, so no radiation pneumonitis; CT 2026-09-15 shows no pneumonitis.",
      evidence: [{ quote: "No interstitial lung disease or pneumonitis.", source: "CT CAP 2026-09-15" }],
    },
    {
      id: "NCT04585750-exc-20",
      status: "pass",
      rationale: "No pneumonitis on pembrolizumab and no ILD or pneumonitis on CT 2026-09-15.",
      evidence: [
        { quote: "No interstitial lung disease or pneumonitis.", source: "CT CAP 2026-09-15" },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: NOTE },
      ],
    },
    {
      id: "NCT04585750-exc-21",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection: entecavir is prophylaxis for resolved HBV (HBsAg negative, DNA undetectable), not treatment of active infection.",
      evidence: [{ quote: "HBV (anti-HBc+, HBsAg neg): entecavir ppx, HBV DNA undetectable 8/2026.", source: NOTE }],
    },
    {
      id: "NCT04585750-exc-22",
      status: "pass",
      rationale: "HIV Ag/Ab negative in 12/2025.",
      evidence: [{ quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS }],
    },
    {
      id: "NCT04585750-exc-23",
      status: "pass",
      rationale: "Her only anticancer therapy has been pembrolizumab + gemcitabine/carboplatin; no rezatapopt.",
      evidence: [{ quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE }],
    },
  ],
);
