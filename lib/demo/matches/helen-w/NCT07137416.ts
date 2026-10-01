import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const LABS = "Labs 2026-09-23";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07137416",
  "Excluded: needs metastatic or unresectable measurable disease; she is NED after curative surgery",
  "This phase 1b study of pidnarulex with trastuzumab deruxtecan is for metastatic, unresectable or locally advanced HER2-expressing disease with a RECIST-measurable lesion. Helen's HER2-low status (IHC 2+/ISH not amplified) fits the expansion biomarker, but her stage IIIA cancer was resected on 5/12/26 and she has no evidence of disease, so she enters neither the escalation nor the expansion part. Independently, eGFR 49 (Cockcroft-Gault ≈ 50 mL/min) is below the GFR ≥ 60 requirement and chest-wall radiation runs to about 10/20/26. The trial would only become relevant at a measurable metastatic recurrence, and renal function would still need to meet the threshold.",
  [
    {
      id: "NCT07137416-inc-1",
      status: "fail",
      rationale: "No metastatic or unresectable disease: stage IIIA cancer was fully resected by mastectomy (margins negative) and staging CT/bone scan 5/21/26 showed no distant disease; she is NED on adjuvant therapy.",
      evidence: [
        { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: NOTE },
        { quote: "No evidence of distant metastatic disease.", source: "CT + bone scan 2026-05-21" },
      ],
    },
    {
      id: "NCT07137416-inc-2",
      status: "fail",
      rationale: "Invasive breast cancer is confirmed, but there is no current locally advanced or metastatic disease: the pT2 pN2a tumor was resected with negative margins on 5/12/26 and she is NED in the adjuvant setting.",
      evidence: [
        { quote: "R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg -> pT2 pN2a M0, stage IIIA.", source: NOTE },
        { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-3",
      status: "pass",
      rationale: "Age 72, above the 18-year minimum.",
      evidence: [{ quote: "72 yo postmenopausal F", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-4",
      status: "pass",
      rationale: "ECOG 1 at the 9/25/26 visit, within the ECOG ≤ 2 limit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "ANC 2.3 × 10⁹/L on 9/23/26. Last pegfilgrastim would have followed cycle 4 (completed 8/19/26); the 'pegfilgrastim D2' line in the 9/25 plan is a stale copy-forward, so no G-CSF in the past week.",
      evidence: [
        { quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS },
        { quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: MEDS },
      ],
    },
    {
      id: "NCT07137416-inc-6",
      status: "pass",
      rationale: "Platelets 201 × 10⁹/L on 9/23/26; no red-cell or platelet transfusion is recorded (Hgb 11.1 is being monitored only).",
      evidence: [
        { quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS },
        { quote: "Anemia Hgb 11.1 post-chemo, monitor.", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-7",
      status: "pass",
      rationale: "Total bilirubin 0.6 mg/dL on 9/23/26, well within 1.5 × ULN.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07137416-inc-8",
      status: "pass",
      rationale: "AST 22 and ALT 18 U/L on 9/23/26, within 3 × ULN.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07137416-inc-9",
      status: "unknown",
      confidence: "medium",
      rationale: "No PT/INR or aPTT in the record, and she takes therapeutic apixaban 5 mg BID, which can prolong both.",
      evidence: [{ quote: "apixaban 5 mg PO BID", source: MEDS }],
      actionNeeded: "Obtain PT/INR and aPTT; both must be ≤ 1.5 × ULN (interpret on apixaban)",
    },
    {
      id: "NCT07137416-inc-10",
      status: "fail",
      rationale: "eGFR 49 mL/min/1.73 m² on 9/23/26 (CKD 3a, Cr 1.1); Cockcroft-Gault (age 72, 68 kg, Cr 1.1) gives ≈ 50 mL/min. Both are below the required GFR ≥ 60.",
      evidence: [
        { quote: "Cr 1.1 | eGFR 49 (L)", source: LABS },
        { quote: "CKD 3a (baseline Cr 1.0-1.1)", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-11",
      status: "fail",
      confidence: "medium",
      rationale: "Her only cytotoxic therapy is adjuvant TC ×4 (completed 8/19/26) for non-metastatic disease; with no recurrence it does not count as a prior line for advanced disease. No anthracycline was given.",
      evidence: [
        { quote: "Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26", source: NOTE },
        { quote: "anthracycline avoided given pAF + LVEF 52%", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-12",
      status: "pass",
      rationale: "Permissive clause; she has not received a PARP inhibitor, and prior PARP inhibition would not exclude her anyway.",
    },
    {
      id: "NCT07137416-inc-13",
      status: "pass",
      rationale: "No germline mutation is required; her germline multigene panel (6/9/26) was negative.",
      evidence: [{ quote: "No pathogenic variants (BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 negative).", source: "Germline panel 2026-06-09" }],
    },
    {
      id: "NCT07137416-inc-14",
      status: "pass",
      rationale: "HR+ HER2-low breast cancer (ER 90%, HER2 IHC 2+ with ISH not amplified, ratio 1.3) is one of the listed escalation biomarker groups.",
      evidence: [
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: PATH },
      ],
    },
    {
      id: "NCT07137416-inc-15",
      status: "pass",
      rationale: "Primary tumor is HER2-low (IHC 2+/ISH-negative) with known ER (90%) and PR (5%) status, as the expansion requires.",
      evidence: [
        { quote: "ER 90% / PR 5% / HER2 2+ ISH neg (HER2-low)", source: NOTE },
        { quote: "HER2 IHC: 2+ (equivocal)", source: PATH },
      ],
    },
    {
      id: "NCT07137416-inc-16",
      status: "fail",
      rationale: "No measurable disease: the tumor and involved nodes were removed by mastectomy on 5/12/26 and staging showed no distant lesions; she is NED.",
      evidence: [
        { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: NOTE },
        { quote: "No evidence of distant metastatic disease.", source: "CT + bone scan 2026-05-21" },
      ],
    },
    {
      id: "NCT07137416-inc-17",
      status: "pass",
      rationale: "Grade 1 docetaxel neuropathy of the fingertips (numbness, buttons manageable), within the grade ≤ 1 limit.",
      evidence: [
        { quote: "G1 PN fingertps (numbness, buttons ok)", source: NOTE },
        { quote: "Neuro: decr light touch fingertips.", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-18",
      status: "unknown",
      confidence: "medium",
      rationale: "Only echo is 5/28/26 (LVEF 52%, low-normal), four months ago and before TC; it falls outside the 28-day window and sits close to the 50% cut-off.",
      evidence: [{ quote: "ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", source: "Echo 2026-05-28" }],
      actionNeeded: "Repeat echocardiogram or MUGA within 28 days of enrollment; LVEF ≥ 50% required",
    },
    {
      id: "NCT07137416-inc-19",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection in her past medical history; this clause only sets conditions for patients known to be HIV-positive.",
    },
    {
      id: "NCT07137416-inc-20",
      status: "pass",
      confidence: "medium",
      rationale: "No history of hepatitis B in the record; the viral-load condition applies only to patients with known chronic HBV.",
    },
    {
      id: "NCT07137416-inc-21",
      status: "pass",
      confidence: "medium",
      rationale: "No history of hepatitis C in the record, and liver tests are normal (AST 22, ALT 18); the clause applies only to patients with HCV.",
      evidence: [{ quote: "AST 22 | ALT 18 | T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07137416-inc-22",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases (no headache, early-stage disease; brain imaging not indicated), so this permissive clause does not restrict her.",
      evidence: [{ quote: "No bone pain, cough, HA.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-23",
      status: "pass",
      confidence: "medium",
      rationale: "No new or progressive brain metastases or leptomeningeal disease are suspected; she is asymptomatic with no headache.",
      evidence: [{ quote: "No bone pain, cough, HA.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-24",
      status: "pass",
      confidence: "medium",
      rationale: "Cardiac history (paroxysmal AF, LVEF 52%) triggers an NYHA assessment; she has no palpitations or heart-failure symptoms and is ECOG 1, consistent with class I, though no class is recorded.",
      evidence: [
        { quote: "paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", source: NOTE },
        { quote: "No palpitatons, no bleeding on apixaban.", source: NOTE },
      ],
      actionNeeded: "Document NYHA functional class at screening; class II or better required",
    },
    {
      id: "NCT07137416-inc-25",
      status: "pass",
      confidence: "medium",
      rationale: "No prior or concurrent malignancy other than this breast cancer appears in her history, which is otherwise detailed.",
    },
    {
      id: "NCT07137416-inc-26",
      status: "not-applicable",
      rationale: "Contraception and breastfeeding rules apply to women of child-bearing potential and men; she is 72 and postmenopausal since about age 50.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-27",
      status: "pass",
      rationale: "Postmenopausal for about 22 years (menopause ~50) with no HRT, so she is of non-child-bearing potential without need for FSH/estradiol confirmation.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-28",
      status: "not-applicable",
      rationale: "Sperm freezing and donation rule applies to male patients only.",
    },
    {
      id: "NCT07137416-inc-29",
      status: "not-applicable",
      rationale: "Ova donation or retrieval cannot apply to a 72-year-old woman postmenopausal since about age 50.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-30",
      status: "pass",
      confidence: "low",
      rationale: "She is keen to hear about trials and has capacity; written informed consent is confirmed at screening.",
      evidence: [{ quote: "Pt keen to hear about trials before deciding -> research coordinator.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-31",
      status: "fail",
      rationale: "Worded as an exclusion: chest-wall and regional nodal radiation started 9/14/26 and runs to about 10/20/26, so she is within 4 weeks of chest radiation until roughly 11/17/26.",
      evidence: [{ quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: NOTE }],
    },
    {
      id: "NCT07137416-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD or pneumonitis history; the 5/21/26 staging CT chest noted only post-mastectomy and spinal changes, lungs are clear and she has no cough. Ongoing chest-wall radiation adds pneumonitis risk to watch.",
      evidence: [
        { quote: "IMPRESSION: Post-mastectomy changes. No evidence of distant metastatic disease. Mild degenerative changes of the spine.", source: "CT + bone scan 2026-05-21" },
        { quote: "Lungs clear.", source: NOTE },
        { quote: "No bone pain, cough, HA.", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No lung disease, autoimmune disorder or pulmonary embolism in her history; her only VTE was a provoked leg DVT in 2019, far outside the 3-month PE window.",
      evidence: [{ quote: "provoked DVT L leg 2019 after L TKA, completed 3 mo anticoagulation", source: NOTE }],
    },
    {
      id: "NCT07137416-exc-3",
      status: "fail",
      confidence: "medium",
      rationale: "TC ended 8/19/26 (about 5.7 weeks ago, outside 3 weeks), but she takes letrozole daily since 9/8/26, which this criterion counts as hormonal therapy for cancer; it would need a 3-week washout.",
      evidence: [
        { quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS },
        { quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: MEDS },
      ],
    },
    {
      id: "NCT07137416-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No immunotherapy or monoclonal antibody in her treatment history (mastectomy, TC ×4, letrozole, radiation).",
    },
    {
      id: "NCT07137416-exc-5",
      status: "pass",
      rationale: "Last major surgery was the right mastectomy on 5/12/26, about 20 weeks ago.",
      evidence: [{ quote: "Procedure date: 05/12/2026 | Reported: 05/19/2026", source: PATH }],
    },
    {
      id: "NCT07137416-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Residual toxicities are grade 1 (fingertip neuropathy, Hgb 11.1 anemia, radiation erythema without desquamation); she is still mid-radiation, so recovery from acute skin effects needs reassessment after 10/20/26.",
      evidence: [
        { quote: "G1 PN fingertps (numbness, buttons ok)", source: NOTE },
        { quote: "R chest wall: MRM scar healed, G1 RT erythema.", source: NOTE },
      ],
      actionNeeded: "Reassess radiation skin reaction after PMRT ends (~10/20/26); must be resolved to grade ≤ 1",
    },
    {
      id: "NCT07137416-exc-7",
      status: "pass",
      rationale: "Her medications (letrozole, apixaban, metoprolol, amlodipine, atorvastatin, calcium/vitamin D) include no strong CYP3A4 inhibitor or inducer; apixaban, amlodipine and atorvastatin are substrates only.",
      evidence: [
        { quote: "apixaban 5 mg PO BID", source: MEDS },
        { quote: "atorvastatin 20 mg PO nightly", source: MEDS },
      ],
    },
    {
      id: "NCT07137416-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent in her treatment history or medication list.",
    },
    {
      id: "NCT07137416-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Only recorded allergy is lisinopril cough; she has never received trastuzumab, another monoclonal antibody or an ADC, so no reaction history to similar compounds.",
      evidence: [{ quote: "ALLERGIES: lisinopril (cough)", source: "Allergies" }],
    },
    {
      id: "NCT07137416-exc-10",
      status: "pass",
      rationale: "QTcF 448 ms on the 9/21/26 ECG, below the 470 ms female threshold; the screening triplicate is still to be done.",
      evidence: [{ quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" }],
    },
    {
      id: "NCT07137416-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal or ocular surface disease appears in her past medical history.",
    },
    {
      id: "NCT07137416-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are controlled: paroxysmal AF rate-controlled and in sinus rhythm, BP 136/78 on amlodipine, CKD 3a stable.",
      evidence: [
        { quote: "BP 136/78 HR 64 reg.", source: NOTE },
        { quote: "4. CKD 3a stable.", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-exc-13",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding exclusion cannot apply; she is 72 and postmenopausal since about age 50.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
  ],
);
