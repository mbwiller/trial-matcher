import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05774951",
  "Excluded: needs 2–5 years of completed adjuvant ET; letrozole started 9/8/26 (3 weeks)",
  "CAMBRIA-1 enrolls patients who have already completed 2–5 years of adjuvant endocrine therapy; Helen started letrozole on 9/8/26, so she is about two years short and cannot enter now. Biologically she fits well (ER 90%, HER2 IHC 2+/ISH not amplified, pN2a stage IIIA, grade 3), and adjuvant abemaciclib or ribociclib with her AI would not bar later entry. She could be reassessed from about 9/2028 if the trial is still accruing, but joining an adjuvant oral SERD trial now would exclude her later (prior investigational SERD).",
  [
    {
      id: "NCT05774951-inc-1",
      status: "pass",
      rationale: "Woman aged 72, above the 18-year minimum.",
      evidence: [{ quote: "72 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05774951-inc-2",
      status: "pass",
      rationale: "ER 90% strong and HER2 IHC 2+ with ISH not amplified (HER2-negative by ASCO/CAP); resected stage IIIA pT2 pN2a, grade 3 disease is high risk on any clinicopathological definition.",
      evidence: [
        { quote: "ER: positive, 90%, strong intensity", source: "Pathology 2026-05-19" },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: "Pathology 2026-05-19" },
        { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT05774951-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Definitive surgery is done (right MRM 5/12/26, margins negative) and adjuvant TC finished 8/19/26; PMRT is under way until 10/20/26, so locoregional therapy will be complete long before the endocrine-duration requirement could be met.",
      evidence: [
        { quote: "R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg", source: "Oncology note 2026-09-25" },
        { quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Confirm PMRT completed as planned (10/20/26)",
    },
    {
      id: "NCT05774951-inc-4",
      status: "fail",
      rationale: "Letrozole started 9/8/26, so she has 20 days (about 3 weeks) of adjuvant ET as of 9/28/26 against a required 2–5 years; the 24-month mark would fall on 9/8/28.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT05774951-inc-5",
      status: "pass",
      rationale: "ECOG 1 at the 9/25/26 visit, meeting the ≤1 requirement.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05774951-inc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "Marrow and liver function are adequate on 9/23/26 (ANC 2.3, Plt 201, Hgb 11.1, bilirubin 0.6, AST 22/ALT 18), but renal function is borderline: eGFR 49 and Cockcroft-Gault CrCl ≈ 50 mL/min (72 y, 68 kg, Cr 1.1) against an unstated protocol threshold.",
      evidence: [
        { quote: "ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: "Labs 2026-09-23" },
        { quote: "Cr 1.1 | eGFR 49 (L)", source: "Labs 2026-09-23" },
        { quote: "AST 22 | ALT 18 | T bili 0.6", source: "Labs 2026-09-23" },
      ],
      actionNeeded: "Check the protocol renal threshold against CrCl ≈ 50 mL/min and repeat CBC/CMP at screening",
    },
    {
      id: "NCT05774951-exc-1",
      status: "pass",
      rationale: "Resected stage IIIA disease with negative staging CT and bone scan (5/21/26); no inoperable or metastatic disease.",
      evidence: [{ quote: "No evidence of distant metastatic disease.", source: "Staging CT + bone scan 2026-05-21" }],
    },
    {
      id: "NCT05774951-exc-2",
      status: "not-applicable",
      rationale: "No neoadjuvant therapy: she had upfront mastectomy on 5/12/26 followed by adjuvant TC, so pathological complete response cannot apply.",
      evidence: [{ quote: "Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05774951-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No other cancer appears in the past medical history; the only malignancy recorded is this breast cancer (her sister's breast cancer is family history).",
    },
    {
      id: "NCT05774951-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are controlled: paroxysmal AF rate-controlled and in sinus rhythm, BP 136/78 on amlodipine, CKD 3a stable; nothing severe or uncontrolled is recorded.",
      evidence: [
        { quote: "CKD 3a stable.", source: "Oncology note 2026-09-25" },
        { quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" },
      ],
    },
    {
      id: "NCT05774951-exc-5",
      status: "pass",
      rationale: "LVEF 52% on the 5/28/26 echo (above 50%) with no heart failure recorded, so the LVEF <50% with NYHA ≥2 combination is absent.",
      evidence: [{ quote: "ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", source: "Echo 2026-05-28" }],
    },
    {
      id: "NCT05774951-exc-6",
      status: "pass",
      rationale: "QTcF 448 ms on the 9/21/26 ECG, below the 480 ms limit; it is repeated at screening.",
      evidence: [{ quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" }],
    },
    {
      id: "NCT05774951-exc-7",
      status: "pass",
      rationale: "No hormone replacement since menopause at about 50, and no sex hormones on the medication list.",
      evidence: [{ quote: "menopause ~50, no HRT", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05774951-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "Current anticancer therapy is letrozole (a protocol endocrine option) plus PMRT ending 10/20/26; the planned zoledronic acid is explicitly permitted.",
      evidence: [{ quote: "zoledronic acid 4 mg IV q6 mo - PLANNED after RT", source: "Medication list" }],
    },
    {
      id: "NCT05774951-exc-9",
      status: "pass",
      rationale: "Endocrine exposure is letrozole only, since 9/8/26; no camizestrant, investigational SERD or fulvestrant.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT05774951-exc-10",
      status: "not-applicable",
      rationale: "72 and postmenopausal since about age 50; pregnancy and breastfeeding do not apply.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05774951-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "The only recorded allergy is lisinopril cough and she has had no SERD exposure; the LHRH-agonist clause applies only to pre/perimenopausal women and men.",
      evidence: [{ quote: "ALLERGIES: lisinopril (cough)", source: "Allergies" }],
    },
  ],
);
