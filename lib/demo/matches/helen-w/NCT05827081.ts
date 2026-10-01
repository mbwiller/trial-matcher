import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const CT = "CT CAP + bone scan 2026-05-21";
const LABS = "Labs 2026-09-23";
const MEDS = "Medication list";

const NED = { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: NOTE };
const CT_NEG = { quote: "No evidence of distant metastatic disease.", source: CT };
const AGE = { quote: "DOB: 1954 (72 yo F)", source: NOTE };
const MENO = { quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE };
const ER = { quote: "ER: positive, 90%, strong intensity", source: PATH };
const PR = { quote: "PR: positive, 5%, weak intensity", source: PATH };
const HER2_IHC = { quote: "HER2 IHC: 2+ (equivocal)", source: PATH };
const HER2_ISH = {
  quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low",
  source: PATH,
};
const LET = { quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS };
const HAND = { quote: "Mild hand stiffness since letrozole.", source: NOTE };
const OSTEO = { quote: "osteopenia (DEXA 2025 T-score -2.1)", source: NOTE };
const MARGINS = { quote: "Margins: negative (closest deep 6 mm).", source: PATH };
const STAGE = { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: PATH };
const ECOG = { quote: "EXAM: ECOG 1.", source: NOTE };
const CBC = { quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS };
const RENAL = { quote: "Cr 1.1 | eGFR 49 (L)", source: LABS };
const LFT = { quote: "AST 22 | ALT 18 | T bili 0.6 | Alk phos 84 | Ca 9.2", source: LABS };
const ECG_E = { quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" };
const ECHO_E = { quote: "ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", source: "Echo 2026-05-28" };
const QTC_NOTE = { quote: "Ribociclib: QTcF 448 borderline (<450 to start)", source: NOTE };
const CYP = { quote: "CYP3A4 interaction w/ apixaban -> pharmacy review", source: NOTE };
const AF = { quote: "paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", source: NOTE };
const SR = { quote: "pAF: apixaban 5 mg BID, metoprolol succ. SR on ECG.", source: NOTE };
const PMRT = { quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: NOTE };
const AFTER_RT = { quote: "Would start after RT.", source: NOTE };
const NOT_CBP = "Not of childbearing potential (72 years old, postmenopausal since about 50, no HRT)";

export default demoMatch(
  "NCT05827081",
  "Fits stage IIIA HR+/HER2- adjuvant ribociclib study · QTcF 448 ms (<450 needed); enroll after RT",
  "Adjuvant WIDER gives ribociclib with standard endocrine therapy to a NATALEE-like population, and Helen fits squarely: stage IIIA (pT2 pN2a) HR+/HER2-negative (HER2-low) disease resected with clear margins, ECOG 1, letrozole started 09/08/2026, well inside the 36-month window. Open items are a screening QTcF that must be < 450 ms (448 ms on 09/21/2026), pharmacy clearance of the ribociclib–apixaban CYP3A4 interaction, cardiology confirmation that her paroxysmal AF is controlled, and enrolling after radiation ends on 10/20/2026. A screening QTcF ≥ 450 ms would exclude her.",
  [
    {
      id: "NCT05827081-inc-1",
      status: "pass",
      rationale: "Aged 72 (born 1954).",
      evidence: [AGE],
    },
    {
      id: "NCT05827081-inc-2",
      status: "pass",
      rationale:
        "ER 90% strong and PR 5% weak by local testing on the 04/14/2026 core biopsy, the tissue on which biomarkers were analyzed.",
      evidence: [ER, PR],
    },
    {
      id: "NCT05827081-inc-3",
      status: "pass",
      rationale: "HER2-negative per the definition: IHC 2+ with a negative ISH (not amplified, HER2/CEP17 ratio 1.3) on local testing.",
      evidence: [HER2_IHC, HER2_ISH],
    },
    {
      id: "NCT05827081-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole started 09/08/2026, three weeks ago, well within 36 months of ET start; for node-positive stage IIIA disease at least 5 years of adjuvant ET is standard, leaving ≥ 3 years remaining.",
      evidence: [LET],
      actionNeeded: "Confirm the planned adjuvant ET duration leaves ≥ 3 years at enrollment",
    },
    {
      id: "NCT05827081-inc-5",
      status: "not-applicable",
      rationale: "Applies only to participants with more than 12 months of prior ET; she has had about 3 weeks of letrozole.",
      evidence: [LET],
    },
    {
      id: "NCT05827081-inc-6",
      status: "not-applicable",
      rationale: "The 30% cap covers participants with 12–36 months of prior ET; she has had about 3 weeks, so it does not apply.",
    },
    {
      id: "NCT05827081-inc-7",
      status: "pass",
      rationale:
        "Tolerating letrozole since 09/08/2026 with only mild hand stiffness; osteopenia (T-score −2.1) is being addressed with planned zoledronic acid and is not a contraindication.",
      evidence: [LET, HAND, OSTEO],
    },
    {
      id: "NCT05827081-inc-8",
      status: "pass",
      rationale:
        "Complete resection by mastectomy on 05/12/2026 with negative margins (closest 6 mm); pT2 pN2a M0 is anatomic stage IIIA, within the Stage III group.",
      evidence: [MARGINS, STAGE],
    },
    {
      id: "NCT05827081-inc-9",
      status: "pass",
      rationale: "ECOG 1 at the 09/25/2026 visit.",
      evidence: [ECOG],
    },
    {
      id: "NCT05827081-inc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 09/23/2026: ANC 2.3, platelets 201, Hgb 11.1, bilirubin 0.6, AST 22, ALT 18 adequate; creatinine 1.1 with eGFR 49 (CKD 3a, Cockcroft-Gault CrCl ≈ 50 mL/min) is moderate impairment, for which ribociclib needs no dose change.",
      evidence: [CBC, RENAL, LFT],
      actionNeeded: "Confirm the protocol renal limit (eGFR 49) and check potassium and magnesium if required",
    },
    {
      id: "NCT05827081-inc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "The 09/21/2026 ECG shows QTcF 448 ms and heart rate 64, meeting both limits (QTcF < 450 ms, HR 50–99), but the 2-ms margin means the screening ECG could exclude her.",
      evidence: [ECG_E, QTC_NOTE],
      actionNeeded: "Repeat ECG at screening; QTcF must be < 450 ms (correct electrolytes and review QT-prolonging drugs first)",
    },
    {
      id: "NCT05827081-exc-1",
      status: "pass",
      rationale: "No distant metastases on the 05/21/2026 staging CT and bone scan, and no recurrence: NED on 09/25/2026.",
      evidence: [CT_NEG, NED],
    },
    {
      id: "NCT05827081-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole is exempt as adjuvant ET; post-mastectomy radiation runs until 10/20/2026, and the plan is to start CDK4/6 therapy after radiation, so enrollment would follow its completion.",
      evidence: [PMRT, AFTER_RT],
      actionNeeded: "Enroll after post-mastectomy radiation completes (planned 10/20/2026)",
    },
    {
      id: "NCT05827081-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Paroxysmal AF (rate controlled), hypertension, CKD 3a and hyperlipidaemia are stable and do not limit life expectancy; the ribociclib–apixaban CYP3A4 interaction is under pharmacy review.",
      evidence: [AF, CYP],
      actionNeeded: "Complete pharmacy review of the ribociclib–apixaban interaction before enrollment",
    },
    {
      id: "NCT05827081-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Paroxysmal AF is rate controlled with sinus rhythm on the 09/21/2026 ECG; LVEF 52% without wall-motion abnormality; QTcF 448 ms is high-normal rather than prolonged.",
      evidence: [SR, ECG_E, ECHO_E],
      actionNeeded: "Confirm AF control with cardiology and check the protocol's arrhythmia definitions",
    },
    {
      id: "NCT05827081-exc-5",
      status: "not-applicable",
      rationale: `${NOT_CBP}; pregnancy and breastfeeding exclusions do not apply.`,
      evidence: [MENO],
    },
    {
      id: "NCT05827081-exc-6",
      status: "not-applicable",
      rationale: `${NOT_CBP}; the contraception requirement does not apply.`,
    },
    {
      id: "NCT05827081-exc-7",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Placeholder pointing to the full protocol; criteria not listed here, such as limits on CYP3A4-interacting or QT-prolonging medications, may matter given her apixaban and borderline QTcF.",
      evidence: [CYP],
      actionNeeded: "Review the full protocol eligibility, especially concomitant medications (apixaban) and cardiac criteria",
    },
  ],
);
