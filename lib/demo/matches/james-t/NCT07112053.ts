import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";
const ALLERGY = "Allergies";

export default demoMatch(
  "NCT07112053",
  "Not on a qualifying regimen: needs ongoing ET + CDK4/6i or capecitabine; he is between lines",
  "STEMVAC is added to treatment already under way: Cohort 1 needs first- or second-line endocrine therapy with a CDK4/6 inhibitor (≥ 2 cycles), Cohort 2 needs capecitabine (≥ 1 cycle) after endocrine progression. He stopped letrozole + abemaciclib for progression on 2026-09-15 and his planned second line is a PARP inhibitor, which neither cohort covers. He would become a candidate only if second-line treatment were endocrine therapy with a CDK4/6 inhibitor or capecitabine; the other open items (lymphocyte count, viral serology, consent to serial biopsies) are routine.",
  [
    {
      id: "NCT07112053-inc-1",
      status: "pass",
      rationale: "He is 61 years old (born 1965).",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT07112053-inc-2",
      status: "pass",
      rationale: "Biopsy-proven metastatic breast cancer, ER 85% and PR 30% on the January 2025 lung metastasis.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 30% of tumor cells, moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT07112053-inc-3",
      status: "pass",
      rationale: "HER2 IHC 1+ with ISH not amplified (HER2-low), within the trial's HER2-negative/low definition.",
      evidence: [{ quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH }],
    },
    {
      id: "NCT07112053-inc-4",
      status: "fail",
      confidence: "medium",
      rationale:
        "He is on no qualifying regimen: letrozole + abemaciclib stopped for progression on 2026-09-15, he has never had capecitabine, and the planned second line is a PARP inhibitor. Cohort 1 would open only if he started second-line ET + CDK4/6i (after 2 cycles).",
      evidence: [
        { quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS },
        { quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE },
      ],
      actionNeeded: "Revisit only if second-line therapy is endocrine therapy + CDK4/6 inhibitor or capecitabine",
    },
    {
      id: "NCT07112053-inc-5",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07112053-inc-6",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to undergo up to two research biopsies is confirmed at consent; he previously had a CT-guided lung biopsy and is keen on trials.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT07112053-inc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Accessible targets include the 1.6 cm RUL nodule and 1.7 cm right hilar node; a CT-guided lung biopsy was done safely in January 2025.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT07112053-inc-8",
      status: "pass",
      rationale: "WBC 4.2 × 10⁹/L (4,200/mm³) on 2026-09-22.",
      evidence: [{ quote: "WBC 4.2", source: LABS }],
    },
    {
      id: "NCT07112053-inc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "No differential beyond ANC is reported, but WBC 4.2 minus ANC 1.7 leaves 2.5 × 10⁹/L for lymphocytes and other cells, so a lymphocyte count below 500/mm³ is very unlikely.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
      actionNeeded: "Confirm absolute lymphocytes ≥ 500/mm³ on a CBC with differential within 28 days of vaccination",
    },
    {
      id: "NCT07112053-inc-10",
      status: "pass",
      rationale: "ANC 1.7 × 10⁹/L (1,700/µL) on 2026-09-22.",
      evidence: [{ quote: "ANC 1.7", source: LABS }],
    },
    {
      id: "NCT07112053-inc-11",
      status: "pass",
      rationale: "Platelets 190 × 10⁹/L on 2026-09-22.",
      evidence: [{ quote: "Plt 190", source: LABS }],
    },
    {
      id: "NCT07112053-inc-12",
      status: "pass",
      rationale: "Total bilirubin 0.7 mg/dL on 2026-09-22, within normal limits.",
      evidence: [{ quote: "T bili 0.7", source: LABS }],
    },
    {
      id: "NCT07112053-inc-13",
      status: "pass",
      rationale: "AST 26 and ALT 31 U/L on 2026-09-22, within normal limits.",
      evidence: [{ quote: "AST 26 | ALT 31", source: LABS }],
    },
    {
      id: "NCT07112053-inc-14",
      status: "pass",
      rationale: "Creatinine 1.1 mg/dL (eGFR 74) on 2026-09-22, below 2.0 mg/dL.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
    },
    {
      id: "NCT07112053-inc-15",
      status: "pass",
      confidence: "low",
      rationale: "Men with partners of childbearing potential must use barrier contraception; he had a vasectomy in 2005, partner status is not recorded, and agreement is confirmed at screening.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT07112053-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No recent infection or surgery; comorbidities are controlled hypertension, hyperlipidemia and untreated low-risk prostate cancer on surveillance.",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
    },
    {
      id: "NCT07112053-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Blood pressure controlled at 138/82 on lisinopril; no cardiomyopathy, angina, heart failure, pericardial effusion or arrhythmia recorded.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
    },
    {
      id: "NCT07112053-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease in his history and no steroids or immunosuppressants on his medication list.",
    },
    {
      id: "NCT07112053-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "His only non-breast cancer, grade group 1 prostate adenocarcinoma (11/2023), has never needed radiation or systemic therapy; leuprolide is given for the breast cancer, though it also suppresses PSA.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Confirm with the PI that leuprolide for breast cancer is not counted as prostate cancer therapy",
    },
    {
      id: "NCT07112053-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No known drug allergies and no known contraindication to GM-CSF.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: ALLERGY }],
    },
    {
      id: "NCT07112053-exc-5",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding do not apply; he is male.",
    },
    {
      id: "NCT07112053-exc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "No HIV, hepatitis B or hepatitis C history is recorded, but no serology is documented either.",
      actionNeeded: "Obtain HIV antibody, HBsAg and HCV antibody (reflex RNA); any positive result excludes",
    },
    {
      id: "NCT07112053-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No surgery since the 2021 mastectomy; the last procedure was a lung core biopsy in January 2025.",
    },
    {
      id: "NCT07112053-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic corticosteroids or immunosuppressants on his current medication list or mentioned in the past 30 days.",
    },
    {
      id: "NCT07112053-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Not enrolled in any interventional trial; he is only now meeting the research coordinator.",
      evidence: [{ quote: "RTC 1-2 wks w/ research coordinator.", source: NOTE }],
    },
    {
      id: "NCT07112053-exc-10",
      status: "pass",
      confidence: "low",
      rationale: "No recent vaccination is recorded; spacing from other vaccines is managed at scheduling.",
      actionNeeded: "Confirm no non-study vaccine (other than Td) within 14 days of any STEMVAC dose",
    },
    {
      id: "NCT07112053-exc-11",
      status: "pass",
      confidence: "low",
      rationale: "Treating oncologist's judgment; nothing in the record suggests a condition that would interfere with participation.",
    },
  ],
);
