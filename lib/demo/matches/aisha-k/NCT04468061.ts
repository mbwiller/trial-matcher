import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-11-25";
const LABS = "Labs 2026-09-23";

export default demoMatch(
  "NCT04468061",
  "Excluded: first-line PD-L1-negative study; she is CPS 15 and progressed on pembrolizumab",
  "This randomized study is for previously untreated, PD-L1-negative metastatic TNBC and bars prior anti-PD-1 therapy. Aisha is PD-L1 CPS 15 by 22C3 and has already received first-line pembrolizumab + gemcitabine/carboplatin for metastatic disease, so five separate criteria exclude her on documented facts. Her subtype, ECOG 1, labs and ADC-naive status would otherwise suit a sacituzumab study; second-line sacituzumab trials are the relevant search.",
  [
    {
      id: "NCT04468061-inc-1",
      status: "pass",
      rationale: "Metastatic breast cancer is histologically confirmed on the RLL lung core biopsy (2025-11-20).",
      evidence: [{ quote: "DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).", source: PATH }],
    },
    {
      id: "NCT04468061-inc-2",
      status: "pass",
      rationale: "Most recent sample (RLL metastasis 2025-11-20): ER 0%, PR 0%, HER2 IHC 0 — within ≤ 5% and HER2-negative by ASCO/CAP.",
      evidence: [
        { quote: "ER: negative (0%)", source: PATH },
        { quote: "PR: negative (0%)", source: PATH },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: PATH },
      ],
    },
    {
      id: "NCT04468061-inc-3",
      status: "fail",
      rationale: "PD-L1 CPS 15 by 22C3 on the RLL metastasis, above the CPS < 10 required for PD-L1-negative status.",
      evidence: [{ quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: PATH }],
    },
    {
      id: "NCT04468061-inc-4",
      status: "fail",
      rationale: "Not treatment-naive: she received first-line pembrolizumab + gemcitabine/carboplatin for metastatic disease from 12/2025 to 2026-09-02.",
      evidence: [{ quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-5",
      status: "pass",
      rationale: "Measurable disease: liver segment VI 2.1 cm and RLL nodule 1.8 cm on CT 2026-09-15.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Archival RLL core tissue is available and she is open to a liver biopsy; agreement to the mandatory on-treatment repeat biopsy is not yet documented.",
      evidence: [{ quote: "Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.", source: NOTE }],
      actionNeeded: "Confirm she agrees to baseline and 3–6-week research biopsies",
    },
    {
      id: "NCT04468061-inc-7",
      status: "fail",
      rationale: "She has had gemcitabine/carboplatin for metastatic breast cancer (last dose 2026-08-26), which this criterion prohibits.",
      evidence: [{ quote: "Last gem/carbo 8/26/26.", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-8",
      status: "fail",
      rationale: "She has had pembrolizumab, a biologic, for metastatic breast cancer (last dose 2026-09-02).",
      evidence: [{ quote: "Pembro deferred 1 wk for AST/ALT ~2x ULN (HBV DNA neg), last dose 9/2/26.", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No radiotherapy is recorded, so no radiation washout or toxicity applies.",
    },
    {
      id: "NCT04468061-inc-10",
      status: "not-applicable",
      rationale: "Provisions for treated brain metastases; she has none known (baseline MRI 2025-11-18 negative).",
      evidence: [{ quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" }],
    },
    {
      id: "NCT04468061-inc-11",
      status: "pass",
      rationale: "She is 46 years old.",
      evidence: [{ quote: "46 yo premenopausal F", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-12",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-13",
      status: "unknown",
      confidence: "medium",
      rationale:
        "2026-09-23 values meet thresholds (ANC 1.6, platelets 132, Hgb 9.8, bilirubin 0.9, AST/ALT 1.5 × ULN, creatinine 0.7), but INR/PT/aPTT are not on file.",
      evidence: [
        { quote: "ANC 1.6", source: LABS },
        { quote: "Hgb 9.8 (L)", source: LABS },
        { quote: "AST 58 (H, 1.5x ULN)", source: LABS },
      ],
      actionNeeded: "Obtain PT/INR and aPTT; ≤ 1.5 × ULN required (not on anticoagulants)",
    },
    {
      id: "NCT04468061-inc-14",
      status: "unknown",
      confidence: "low",
      rationale: "Premenopausal with tubal ligation only (ovaries and uterus intact), so of childbearing potential under this definition; no pregnancy test documented.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
      actionNeeded: "Obtain serum or urine pregnancy test within 2 weeks before treatment; must be negative",
    },
    {
      id: "NCT04468061-inc-15",
      status: "pass",
      confidence: "medium",
      rationale: "Bilateral tubal ligation (2014), which the protocol lists as an acceptable method.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
    {
      id: "NCT04468061-inc-16",
      status: "not-applicable",
      rationale: "Applies to male participants only; she is female.",
    },
    {
      id: "NCT04468061-inc-17",
      status: "pass",
      rationale: "On denosumab 120 mg every 4 weeks for bone metastases, which may continue on study.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: "Medication list" }],
    },
    {
      id: "NCT04468061-inc-18",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and willingness to consent are confirmed at screening; she is interested in trials.",
    },
    {
      id: "NCT04468061-exc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "Last gemcitabine/carboplatin 2026-08-26 and last pembrolizumab 2026-09-02; 4 weeks elapse by 2026-09-30, before any realistic start, and treatment has been on hold since progression.",
      evidence: [
        { quote: "Last gem/carbo 8/26/26.", source: NOTE },
        { quote: "All tx on hold since.", source: NOTE },
      ],
    },
    {
      id: "NCT04468061-exc-2",
      status: "fail",
      rationale: "Prior anti-PD-1 therapy: pembrolizumab from 12/2025 to 2026-09-02. (She has had no sacituzumab, irinotecan or topoisomerase-I ADC.)",
      evidence: [{ quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE }],
    },
    {
      id: "NCT04468061-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Tolerated ~9 months of pembrolizumab with no hypersensitivity recorded; never received sacituzumab; only penicillin allergy listed.",
      evidence: [{ quote: "ALLERGIES: penicillin (hives)", source: "Allergies" }],
    },
    {
      id: "NCT04468061-exc-4",
      status: "unknown",
      confidence: "low",
      rationale: "UGT1A1 genotype has not been done; the oncologist plans to send it.",
      evidence: [{ quote: "UGT1A1 genotype not done - will send.", source: NOTE }],
      actionNeeded: "Obtain UGT1A1 genotype result; *28/*28 homozygosity excludes",
    },
    {
      id: "NCT04468061-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases (baseline MRI 2025-11-18 negative) and no neurological symptoms; not re-imaged in ~10 months.",
      evidence: [{ quote: "No brain imaging since baseline 11/2025; asymptomatic.", source: NOTE }],
    },
    {
      id: "NCT04468061-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No surgery is recorded; only core biopsies.",
    },
    {
      id: "NCT04468061-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection or uncontrolled illness: HBV controlled on entecavir (DNA undetectable), TSH normal on levothyroxine, no psychiatric history.",
      evidence: [{ quote: "HBV (anti-HBc+, HBsAg neg): entecavir ppx, HBV DNA undetectable 8/2026.", source: NOTE }],
    },
    {
      id: "NCT04468061-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic steroids or immunosuppressants on the medication list; levothyroxine is replacement therapy and is not counted.",
      evidence: [{ quote: "levothyroxine 88 mcg PO daily", source: "Medication list" }],
    },
    {
      id: "NCT04468061-exc-9",
      status: "pass",
      rationale: "Immune-related hypothyroidism requires only levothyroxine, not steroids or immunosuppressants; no autoimmune disease before pembrolizumab.",
      evidence: [{ quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: NOTE }],
    },
    {
      id: "NCT04468061-exc-10",
      status: "pass",
      rationale: "No pneumonitis on pembrolizumab and none on CT 2026-09-15.",
      evidence: [{ quote: "No interstitial lung disease or pneumonitis.", source: "CT CAP 2026-09-15" }],
    },
    {
      id: "NCT04468061-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No second malignancy is mentioned; germline panel negative.",
    },
    {
      id: "NCT04468061-exc-12",
      status: "pass",
      rationale: "HIV negative, HBsAg negative (anti-HBc positive, DNA undetectable) and HCV antibody negative.",
      evidence: [{ quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS }],
    },
    {
      id: "NCT04468061-exc-13",
      status: "pass",
      confidence: "low",
      rationale: "No live vaccine is recorded; immunization history is confirmed at screening.",
      actionNeeded: "Confirm no live vaccine within 28 days before treatment",
    },
    {
      id: "NCT04468061-exc-14",
      status: "pass",
      confidence: "low",
      rationale: "No confounding condition is recorded beyond those assessed elsewhere; final judgment rests with the investigator.",
    },
    {
      id: "NCT04468061-exc-15",
      status: "pass",
      confidence: "low",
      rationale: "No breastfeeding is recorded; confirmed at screening.",
    },
  ],
);
