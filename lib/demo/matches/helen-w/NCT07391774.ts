import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const LABS = "Labs 2026-09-23";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07391774",
  "Excluded: chemotherapy-naïve only; she completed adjuvant TC, and surgery was 20 weeks ago (limit 16)",
  "RxFINE-Low randomises chemotherapy-naïve, high-anatomic-stage ER+/HER2- patients with Oncotype RS ≤ 25 to endocrine therapy plus ribociclib with or without chemotherapy first. Helen's anatomy and biology fit (pT2 pN2a, ER 90%, HER2-low, postmenopausal), but she already completed adjuvant docetaxel/cyclophosphamide on 8/19/26, and her mastectomy on 5/12/26 is about 20 weeks ago against a 16-week limit. Oncotype was never sent, and QTcF 448 ms plus the apixaban interaction would also need clearing for ribociclib. Neither blocker can be undone, so this trial is closed to her.",
  [
    {
      id: "NCT07391774-inc-1",
      status: "pass",
      rationale: "Age 72, above the 18-year minimum.",
      evidence: [{ quote: "72 yo postmenopausal F", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-2",
      status: "pass",
      rationale: "ECOG 1 on 9/25/26, within 0–2 and within 28 days.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-3",
      status: "pass",
      rationale: "Postmenopausal woman by age (72 ≥ 60), with natural menopause at about 50 and no HRT.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-4",
      status: "pass",
      rationale: "pT2 with N2 disease (5 of 18 nodes positive, pN2a, AJCC 8th) meets the 'pT0–T3 with N2 or N3' category; not T4.",
      evidence: [
        { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: PATH },
        { quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: PATH },
      ],
    },
    {
      id: "NCT07391774-inc-5",
      status: "pass",
      rationale: "ER positive in 90% of cells with strong intensity, well above the > 10% requirement.",
      evidence: [{ quote: "ER: positive, 90%, strong intensity", source: PATH }],
    },
    {
      id: "NCT07391774-inc-6",
      status: "pass",
      rationale: "HER2-negative by ASCO/CAP: IHC 2+ with ISH not amplified (ratio 1.3, copy number 3.4).",
      evidence: [{ quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: PATH }],
    },
    {
      id: "NCT07391774-inc-7",
      status: "pass",
      rationale: "Unifocal disease (a single 3.8 cm tumor), so the multifocal/multicentric conditions do not restrict her.",
      evidence: [{ quote: "DIAGNOSIS: Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm. E-cadherin positive.", source: PATH }],
    },
    {
      id: "NCT07391774-inc-8",
      status: "not-applicable",
      rationale: "Lumpectomy margin rule; she had a modified radical mastectomy, not a lumpectomy.",
    },
    {
      id: "NCT07391774-inc-9",
      status: "pass",
      rationale: "Mastectomy margins negative, closest (deep) 6 mm, with no residual gross tumor.",
      evidence: [{ quote: "Lymphovascular invasion: present. Margins: negative (closest deep 6 mm).", source: PATH }],
    },
    {
      id: "NCT07391774-inc-10",
      status: "pass",
      rationale: "Axillary staging by dissection as part of the modified radical mastectomy, with 18 nodes examined.",
      evidence: [{ quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: PATH }],
    },
    {
      id: "NCT07391774-inc-11",
      status: "pass",
      rationale: "No locoregional or distant disease: NED on 9/25/26 exam (no adenopathy) and negative staging CT and bone scan on 5/21/26.",
      evidence: [
        { quote: "No axillary/supraclav adenopathy.", source: NOTE },
        { quote: "No evidence of distant metastatic disease.", source: "CT + bone scan 2026-05-21" },
      ],
    },
    {
      id: "NCT07391774-inc-12",
      status: "pass",
      rationale: "Oncotype has not been performed, and surgical tissue is available: the 5/12/26 mastectomy blocks predate both chemotherapy and letrozole.",
      evidence: [
        { quote: "Oncotype not done (N2).", source: NOTE },
        { quote: "MRM blocks available.", source: NOTE },
      ],
    },
    {
      id: "NCT07391774-inc-13",
      status: "fail",
      rationale: "Final surgery was the mastectomy on 5/12/26, 139 days (about 19.9 weeks) before today; the 16-week limit expired on 9/1/26.",
      evidence: [{ quote: "Procedure date: 05/12/2026 | Reported: 05/19/2026", source: PATH }],
    },
    {
      id: "NCT07391774-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No prior or concurrent malignancy other than this breast cancer appears in her detailed history.",
    },
    {
      id: "NCT07391774-inc-15",
      status: "pass",
      rationale: "Permissive clause; pathology reports invasive carcinoma only, and synchronous DCIS or LCIS would not exclude her anyway.",
    },
    {
      id: "NCT07391774-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No prior DCIS in her history; this is her first breast diagnosis, so the clause does not restrict her.",
    },
    {
      id: "NCT07391774-inc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No prior invasive breast cancer: this is a first diagnosis (core biopsy 4/14/26), and her history lists no earlier breast cancer.",
      evidence: [{ quote: "found on screening mammo 4/2026, core bx 4/14/26", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-18",
      status: "pass",
      rationale: "No chemoprevention endocrine therapy; adjuvant letrozole began 9/8/26 (20 days ago), within the < 6-week allowance until 10/20/26. Core and mastectomy specimens predate letrozole.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS }],
    },
    {
      id: "NCT07391774-inc-19",
      status: "pass",
      rationale: "Not on hormone replacement therapy, and never took it after menopause.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-20",
      status: "pass",
      rationale: "ANC 2.3 × 10⁹/L (2,300/µL) on 9/23/26, above 1,500 and within 28 days.",
      evidence: [{ quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS }],
    },
    {
      id: "NCT07391774-inc-21",
      status: "pass",
      rationale: "Hemoglobin 11.1 g/dL on 9/23/26, above 9.0.",
      evidence: [{ quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS }],
    },
    {
      id: "NCT07391774-inc-22",
      status: "pass",
      rationale: "Platelets 201,000/µL on 9/23/26, above 100,000.",
      evidence: [{ quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS }],
    },
    {
      id: "NCT07391774-inc-23",
      status: "pass",
      rationale: "Total bilirubin 0.6 mg/dL on 9/23/26, within the ULN.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07391774-inc-24",
      status: "pass",
      rationale: "AST 22 and ALT 18 U/L on 9/23/26, within 2.5 × ULN.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07391774-inc-25",
      status: "pass",
      rationale: "eGFR 49 mL/min/1.73 m² on 9/23/26 (CKD 3a), above the ≥ 30 threshold.",
      evidence: [{ quote: "Cr 1.1 | eGFR 49 (L)", source: LABS }],
    },
    {
      id: "NCT07391774-inc-26",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection in her past medical history; the clause applies only to patients with known HIV.",
    },
    {
      id: "NCT07391774-inc-27",
      status: "pass",
      confidence: "medium",
      rationale: "No history of chronic hepatitis B in the record; the viral-load condition applies only to patients with known HBV.",
    },
    {
      id: "NCT07391774-inc-28",
      status: "pass",
      confidence: "medium",
      rationale: "No history of hepatitis C in the record and liver tests are normal (AST 22, ALT 18).",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07391774-inc-29",
      status: "pass",
      confidence: "medium",
      rationale: "Paroxysmal AF and LVEF 52% call for NYHA assessment; she has no palpitations or heart-failure symptoms and is ECOG 1, consistent with class I, though no class is recorded.",
      evidence: [
        { quote: "paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", source: NOTE },
        { quote: "No palpitatons, no bleeding on apixaban.", source: NOTE },
      ],
      actionNeeded: "Document NYHA functional class; class 2 or better required",
    },
    {
      id: "NCT07391774-inc-30",
      status: "pass",
      rationale: "ECG 9/21/26 (7 days ago): QTcF 448 ms (< 450) and heart rate 64 (50–90). The margin is only 2 ms, and the ECG lapses after 10/19/26.",
      evidence: [{ quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" }],
      actionNeeded: "Repeat ECG if pre-registration falls after 10/19/26; QTcF must stay < 450 ms",
    },
    {
      id: "NCT07391774-inc-31",
      status: "pass",
      confidence: "low",
      rationale: "She is keen to discuss trials and has capacity; written consent is obtained at screening.",
      evidence: [{ quote: "Pt keen to hear about trials before deciding -> research coordinator.", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-32",
      status: "unknown",
      confidence: "medium",
      rationale: "Her oncologist flags CDK4/6 inhibitor safety concerns: QTcF 448 is borderline for ribociclib, apixaban has a CYP3A4 interaction under pharmacy review, and she has CKD 3a and paroxysmal AF.",
      evidence: [{ quote: "Ribociclib: QTcF 448 borderline (<450 to start); CYP3A4 interaction w/ apixaban -> pharmacy review.", source: NOTE }],
      actionNeeded: "Investigator to judge comorbidity risk after the pharmacy review of apixaban with ribociclib",
    },
    {
      id: "NCT07391774-inc-33",
      status: "pass",
      confidence: "medium",
      rationale: "She received and completed adjuvant TC ×4 without documented major toxicity; only anthracyclines were avoided (paroxysmal AF, LVEF 52%).",
      evidence: [{ quote: "Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26 - anthracycline avoided given pAF + LVEF 52%.", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-34",
      status: "fail",
      rationale: "She has already received chemotherapy for this cancer: adjuvant docetaxel/cyclophosphamide ×4, completed 8/19/26.",
      evidence: [
        { quote: "Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26", source: NOTE },
        { quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: MEDS },
      ],
    },
    {
      id: "NCT07391774-inc-35",
      status: "pass",
      rationale: "No prior CDK4/6 inhibitor; adjuvant abemaciclib or ribociclib is still under discussion and not started.",
      evidence: [{ quote: "Discussed adj abemaciclib x2 yrs vs ribociclib x3 yrs (w/ AI) vs clinical trial", source: NOTE }],
    },
    {
      id: "NCT07391774-inc-36",
      status: "pass",
      confidence: "medium",
      rationale: "Ribociclib's US label lists no contraindications; QTcF 448 is under the 450 ms initiation limit, and the apixaban interaction is a caution under pharmacy review, not a contraindication.",
      evidence: [{ quote: "Ribociclib: QTcF 448 borderline (<450 to start); CYP3A4 interaction w/ apixaban -> pharmacy review.", source: NOTE }],
      actionNeeded: "Complete pharmacy review of apixaban with ribociclib; confirm QTcF < 450 ms before starting",
    },
    {
      id: "NCT07391774-inc-37",
      status: "pass",
      confidence: "medium",
      rationale: "Only recorded allergy is lisinopril cough; no soy allergy, galactose intolerance or lactase deficiency noted, and she already tolerates letrozole.",
      evidence: [{ quote: "ALLERGIES: lisinopril (cough)", source: "Allergies" }],
      actionNeeded: "Confirm no soy allergy or hereditary galactose intolerance at screening",
    },
    {
      id: "NCT07391774-inc-38",
      status: "not-applicable",
      rationale: "Contraception and sperm-donation rule for male patients only.",
    },
    {
      id: "NCT07391774-inc-39",
      status: "fail",
      rationale: "Combines contraception methods with Step 1 rules. Step 1 requires all Step 0 criteria, which she fails (prior chemotherapy, surgery > 16 weeks); RT until ~10/20/26 and an RS of 0–25 (Oncotype not done) are also unmet.",
      evidence: [
        { quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: MEDS },
        { quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: NOTE },
      ],
    },
  ],
);
