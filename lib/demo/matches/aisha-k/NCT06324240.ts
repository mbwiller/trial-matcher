import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-11-25";
const CT = "CT CAP 2026-09-15";
const LABS = "Labs 2026-09-23";

export default demoMatch(
  "NCT06324240",
  "Fits the metastatic vaccine + ipilimumab cohort · needs ≥ 1 g tumor excision, coags and ALC",
  "As a metastatic patient already treated with pembrolizumab, Aisha would enter the Phase 1b combination cohort, preferentially Cohort C (TMV vaccine + ipilimumab). Subtype, the CPS ≥ 10 prior-pembrolizumab rule, line count (one), ECOG 1 and the 2026-09-23 labs fit, and checkpoint washout completes 2026-09-30. The gating step is procuring ≥ 1 g of tumor, most plausibly by excising the intact 2.5 cm left breast mass, plus PT/INR, aPTT and a lymphocyte count. Tissue harvest and vaccine manufacture would push treatment past her hoped-for 3–4-week start while her liver disease is progressing.",
  [
    {
      id: "NCT06324240-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Written consent and HIPAA authorization are obtained at screening; she is interested in trials.",
      evidence: [{ quote: "Pt interested in trials, hopes to start within 3-4 wks.", source: NOTE }],
    },
    {
      id: "NCT06324240-inc-2",
      status: "pass",
      rationale: "She is 46 years old.",
      evidence: [{ quote: "46 yo premenopausal F", source: NOTE }],
    },
    {
      id: "NCT06324240-inc-3",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25; needs re-documenting within 14 days of tissue consent.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06324240-inc-4",
      status: "pass",
      rationale: "ANC 1.6 × 10⁹/L on 2026-09-23, above 1,500/mcL; to be repeated within 14 days of vaccine.",
      evidence: [{ quote: "ANC 1.6", source: LABS }],
    },
    {
      id: "NCT06324240-inc-5",
      status: "unknown",
      confidence: "low",
      rationale: "WBC 3.9 and ANC 1.6 on 2026-09-23, but no differential or absolute lymphocyte count is reported.",
      evidence: [{ quote: "WBC 3.9 (L)", source: LABS }],
      actionNeeded: "Obtain CBC with differential; absolute lymphocyte count ≥ 600/µL required within 14 days of vaccine",
    },
    {
      id: "NCT06324240-inc-6",
      status: "pass",
      rationale: "Platelets 132 × 10⁹/L on 2026-09-23, above 100,000.",
      evidence: [{ quote: "Plt 132 (L)", source: LABS }],
    },
    {
      id: "NCT06324240-inc-7",
      status: "pass",
      rationale: "Hemoglobin 9.8 g/dL on 2026-09-23 (1 unit PRBC 7/2026), above 9.0; transfusion support is allowed.",
      evidence: [{ quote: "Hgb 9.8 (L)", source: LABS }],
    },
    {
      id: "NCT06324240-inc-8",
      status: "pass",
      rationale: "Serum creatinine 0.7 mg/dL on 2026-09-23, within normal limits.",
      evidence: [{ quote: "Cr 0.7", source: LABS }],
    },
    {
      id: "NCT06324240-inc-9",
      status: "pass",
      rationale: "Total bilirubin 0.9 mg/dL on 2026-09-23, normal.",
      evidence: [{ quote: "T bili 0.9", source: LABS }],
    },
    {
      id: "NCT06324240-inc-10",
      status: "pass",
      rationale: "AST 58 and ALT 61 are 1.5 × ULN on 2026-09-23, within 2.5 × ULN (5 × allowed with her liver metastasis).",
      evidence: [
        { quote: "AST 58 (H, 1.5x ULN)", source: LABS },
        { quote: "ALT 61 (H, 1.5x ULN)", source: LABS },
      ],
    },
    {
      id: "NCT06324240-inc-11",
      status: "pass",
      rationale: "Total bilirubin 0.9 mg/dL, within 1.5 × ULN.",
      evidence: [{ quote: "T bili 0.9", source: LABS }],
    },
    {
      id: "NCT06324240-inc-12",
      status: "unknown",
      confidence: "low",
      rationale: "No PT/INR is recorded; she is not on anticoagulants. Coagulation studies will also be needed before the tissue biopsy.",
      actionNeeded: "Obtain PT/INR; ≤ 1.5 × ULN required within 14 days of vaccine",
    },
    {
      id: "NCT06324240-inc-13",
      status: "unknown",
      confidence: "low",
      rationale: "No aPTT is recorded; she is not on anticoagulants.",
      actionNeeded: "Obtain aPTT; ≤ 1.5 × ULN required within 14 days of vaccine",
    },
    {
      id: "NCT06324240-inc-14",
      status: "pass",
      rationale: "ER 0%, PR 0% and HER2 IHC 0 on both the breast core (2025-11-12) and the RLL metastasis (2025-11-20).",
      evidence: [
        { quote: "L breast core bx 11/12/2025: IDC, grade 3 (Nottingham 9/9), ER 0%, PR 0%, HER2 IHC 0, Ki-67 80%.", source: PATH },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: PATH },
      ],
    },
    {
      id: "NCT06324240-inc-15",
      status: "pass",
      rationale: "Metastatic disease is histologically confirmed on the RLL lung core biopsy (2025-11-20), with nodal, bone and new liver involvement.",
      evidence: [{ quote: "DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).", source: PATH }],
    },
    {
      id: "NCT06324240-inc-16",
      status: "pass",
      rationale:
        "One metastatic chemotherapy line (≤ 3 allowed). Last gem/carbo 2026-08-26 (33 days, ≥ 21 met); last pembrolizumab 2026-09-02, so ≥ 28 days is reached 2026-09-30, before any feasible C1D1 after tissue harvest; no radiotherapy.",
      evidence: [
        { quote: "Last gem/carbo 8/26/26.", source: NOTE },
        { quote: "Pembro deferred 1 wk for AST/ALT ~2x ULN (HBV DNA neg), last dose 9/2/26.", source: NOTE },
      ],
    },
    {
      id: "NCT06324240-inc-17",
      status: "pass",
      rationale: "PD-L1 CPS 15 (22C3), and she has already received pembrolizumab (12/2025 to 2026-09-02), as required for CPS ≥ 10.",
      evidence: [
        { quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: PATH },
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE },
      ],
    },
    {
      id: "NCT06324240-inc-18",
      status: "pass",
      rationale:
        "Metastatic, so eligible only for the Phase 1b combination cohort; prior anti-PD-1 therapy means she would preferentially go to Cohort C (TMV vaccine + ipilimumab).",
      evidence: [{ quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE }],
    },
    {
      id: "NCT06324240-inc-19",
      status: "not-applicable",
      rationale: "Defines the early-stage (stage I–III) population; she has de novo stage IV disease and is assessed under the metastatic pathway.",
    },
    {
      id: "NCT06324240-inc-20",
      status: "not-applicable",
      rationale: "Applies to early-stage patients after breast/axillary resection; she is metastatic with the primary unresected.",
    },
    {
      id: "NCT06324240-inc-21",
      status: "not-applicable",
      rationale: "Adjuvant radiotherapy timing applies to early-stage patients; she has had no radiotherapy.",
    },
    {
      id: "NCT06324240-inc-22",
      status: "not-applicable",
      rationale: "Applies to early-stage patients with residual disease on adjuvant capecitabine; not her situation.",
    },
    {
      id: "NCT06324240-inc-23",
      status: "not-applicable",
      rationale: "Applies to early-stage gBRCA carriers on adjuvant olaparib; she is metastatic and her germline panel was negative.",
      evidence: [{ quote: "NEGATIVE (BRCA1, BRCA2, PALB2, TP53, CHEK2, ATM)", source: "Germline panel 2025-12-09" }],
    },
    {
      id: "NCT06324240-inc-24",
      status: "not-applicable",
      rationale: "Applies to early-stage patients after upfront surgery and adjuvant chemotherapy.",
    },
    {
      id: "NCT06324240-inc-25",
      status: "not-applicable",
      rationale: "Applies to early-stage patients with residual disease after neoadjuvant KEYNOTE-522; she received first-line KEYNOTE-355 for metastatic disease.",
    },
    {
      id: "NCT06324240-inc-26",
      status: "not-applicable",
      rationale: "Applies to early-stage patients entering Phase 1a Cohort A after adjuvant pembrolizumab; metastatic patients cannot enter Cohort A.",
    },
    {
      id: "NCT06324240-inc-27",
      status: "not-applicable",
      rationale: "Early-stage pathway (vaccine ≥ 28 days after surgical resection, post-KEYNOTE-522 patients); she has metastatic disease and no resection.",
    },
    {
      id: "NCT06324240-inc-28",
      status: "not-applicable",
      rationale: "Applies to early-stage patients with residual disease after anthracycline/taxane or TC neoadjuvant chemotherapy.",
    },
    {
      id: "NCT06324240-inc-29",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Her archival RLL core (11/2025) cannot provide 1 g. The intact 2.5 cm left breast mass, the protocol's preferred source, could be excised (or liver/lung lesions sampled); yield is unknown until procured.",
      evidence: [
        { quote: "L breast 2.5 cm UOQ mass.", source: NOTE },
        { quote: "Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.", source: NOTE },
      ],
      actionNeeded: "Arrange excisional biopsy of the 2.5 cm left breast mass (or other accessible lesion); ≥ 1 g tumor needed for vaccine",
    },
    {
      id: "NCT06324240-inc-30",
      status: "not-applicable",
      rationale: "Tissue retrieval at lumpectomy/mastectomy applies to early-stage patients; she would follow the metastatic biopsy pathway.",
    },
    {
      id: "NCT06324240-inc-31",
      status: "pass",
      confidence: "medium",
      rationale:
        "She has measurable disease (liver 2.1 cm, RLL 1.8 cm) and an intact 2.5 cm left breast mass that is a plausible ≥ 1 g excisional target.",
      evidence: [
        { quote: "L breast 2.5 cm UOQ mass.", source: NOTE },
        { quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE },
      ],
      actionNeeded: "Surgical review to confirm the breast mass can yield ≥ 1 g of tumor",
    },
    {
      id: "NCT06324240-inc-32",
      status: "pass",
      rationale: "Germline testing has already been done and was negative for BRCA1/BRCA2 (2025-12-09); status is not required to enroll.",
      evidence: [{ quote: "NEGATIVE (BRCA1, BRCA2, PALB2, TP53, CHEK2, ATM)", source: "Germline panel 2025-12-09" }],
    },
    {
      id: "NCT06324240-inc-33",
      status: "pass",
      confidence: "low",
      rationale: "Ability to follow the study schedule is confirmed at screening; she works part-time from home and is ECOG 1.",
      evidence: [{ quote: "G1 fatigue, works part-time from home.", source: NOTE }],
    },
    {
      id: "NCT06324240-inc-34",
      status: "pass",
      confidence: "low",
      rationale: "Written informed consent is obtained at screening.",
    },
    {
      id: "NCT06324240-exc-1",
      status: "unknown",
      confidence: "low",
      rationale: "No tissue has yet been procured for vaccine manufacture; the core-biopsy archival sample is far below 1 g.",
      actionNeeded: "Confirm ≥ 1 g of tumor tissue is obtained at excisional biopsy",
    },
    {
      id: "NCT06324240-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "No cardiac history, BP 118/72, no arrhythmia medication; HBV is controlled (HBsAg negative, DNA undetectable on entecavir) and no other infection is documented.",
      evidence: [
        { quote: "No DM, no cardiac hx.", source: NOTE },
        { quote: "HBV DNA 08/28/2026: not detected", source: LABS },
      ],
    },
    {
      id: "NCT06324240-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No second malignancy is mentioned; germline panel negative.",
    },
    {
      id: "NCT06324240-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "All treatment is on hold since progression and the regimen was discontinued 9/2026; the A/P line 'C9 D1 ... continue q3w' is a stale copy-forward. Cytotoxic washout (21 d) is met; checkpoint washout (28 d) completes 2026-09-30; no radiotherapy.",
      evidence: [
        { quote: "All tx on hold since.", source: NOTE },
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
      ],
      actionNeeded: "Confirm she would defer second-line sacituzumab govitecan while on study and that no dose was given 2026-09-25",
    },
    {
      id: "NCT06324240-exc-5",
      status: "pass",
      confidence: "low",
      rationale: "Tubal ligation in 2014; pregnancy and breastfeeding are excluded by the screening pregnancy test and history.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
    {
      id: "NCT06324240-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis history in an otherwise detailed PMH.",
    },
    {
      id: "NCT06324240-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No organ transplant is mentioned.",
    },
    {
      id: "NCT06324240-exc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "No CNS metastases on baseline MRI 2025-11-18 and no neurological symptoms, but brain imaging has not been repeated in ~10 months.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No HA, no visual chnages, no focal weakness.", source: NOTE },
      ],
      actionNeeded: "Consider repeat brain MRI before enrollment (last 2025-11-18)",
    },
    {
      id: "NCT06324240-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "HIV negative and no systemic steroids or immunosuppressants on the medication list.",
      evidence: [{ quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS }],
    },
    {
      id: "NCT06324240-exc-10",
      status: "pass",
      rationale: "No autoimmune disease before pembrolizumab; immune-related hypothyroidism needs only levothyroxine replacement, which is not counted as systemic treatment.",
      evidence: [
        { quote: "No autoimmune dz prior to pembro.", source: NOTE },
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: NOTE },
      ],
    },
    {
      id: "NCT06324240-exc-11",
      status: "pass",
      rationale: "No pneumonitis on pembrolizumab and none on CT 2026-09-15.",
      evidence: [
        { quote: "No interstitial lung disease or pneumonitis.", source: CT },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: NOTE },
      ],
    },
    {
      id: "NCT06324240-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No unresolved grade 3–4 toxicity: hemoglobin 9.8 g/dL after one transfusion in 7/2026, transaminases 1.5 × ULN, fatigue grade 1.",
      evidence: [
        { quote: "Anemia (chemo-related): Hgb 9.8, no bleeding.", source: NOTE },
        { quote: "G1 fatigue, works part-time from home.", source: NOTE },
      ],
    },
    {
      id: "NCT06324240-exc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "No grade 4 irAE. Her only irAE is grade 2 hypothyroidism (2/2026), euthyroid on levothyroxine (TSH 2.2); the August transaminase rise was attributed to liver metastasis, not immune hepatitis.",
      evidence: [
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: NOTE },
        { quote: "AST/ALT ~1.5x ULN, bili nl: likely liver met, no features of immune hepatitis.", source: NOTE },
      ],
      actionNeeded: "Confirm with the PI that grade 2 hypothyroidism controlled on replacement satisfies the ≤ grade 1 reversion rule",
    },
  ],
);
