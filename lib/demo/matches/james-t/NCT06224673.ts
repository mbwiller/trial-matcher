import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-25";
const PATH = "Lung biopsy 2025-01-22";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";

export default demoMatch(
  "NCT06224673",
  "Excluded: needs ≥ 1 prior chemo or ADC line for metastatic disease; he has had none",
  "He fits Cohort 1 (HR+/HER2-low: ER 85%, PR 30%, IHC 1+/ISH not amplified) with measurable disease, ECOG 1 and adequate labs, and the trial accepts men. It requires at least one prior line of chemotherapy or ADC therapy for advanced disease, however, and his only metastatic treatment has been letrozole + leuprolide + abemaciclib; adjuvant ddAC-T in 2021 does not count. He could become a candidate after a chemotherapy or ADC line (prior T-DXd is not excluded), at which point an echocardiogram and ECG would be needed.",
  [
    {
      id: "NCT06224673-inc-1",
      status: "pass",
      rationale: "Men are eligible; he is 61 and able to give written consent.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06224673-inc-2",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit, within the 0–2 range.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06224673-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Life expectancy of at least 6 months is implied: ECOG 1, low-volume lung/nodal progression without organ dysfunction, and stable bone disease.",
      evidence: [
        { quote: "EXAM: ECOG 1.", source: NOTE },
        { quote: "Bone mets stable.", source: NOTE },
      ],
    },
    {
      id: "NCT06224673-inc-4",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent are confirmed at screening; he is keen on trial participation.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT06224673-inc-5",
      status: "pass",
      rationale:
        "Pathologically documented HER2-low metastatic disease (IHC 1+, ISH not amplified) with ER 85% and PR 30%, placing him in Cohort 1 (ER and/or PR ≥ 10%).",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
      ],
    },
    {
      id: "NCT06224673-inc-6",
      status: "pass",
      rationale: "RECIST-measurable lesions: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT06224673-inc-7",
      status: "pass",
      confidence: "medium",
      rationale:
        "Archival tissue exists from the 2025-01-22 lung core biopsy, though core material may be depleted after NGS; a fresh biopsy is preferred but not required, and the PI can approve if no tissue is available.",
      evidence: [{ quote: "Specimen: Lung, left lower lobe nodule, CT-guided core biopsy", source: PATH }],
      actionNeeded: "Request the block or 10 unstained slides from the 2025-01-22 core; consider a fresh biopsy.",
    },
    {
      id: "NCT06224673-inc-8",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive for treated, stable brain metastases; none are known (asymptomatic, nonfocal), though the brain has never been imaged.",
      evidence: [
        { quote: "No HA, visual change or focal weakness.", source: NOTE },
        { quote: "Has never had brain imaging.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if required for baseline staging.",
    },
    {
      id: "NCT06224673-inc-9",
      status: "fail",
      rationale:
        "No chemotherapy or ADC has been given for metastatic disease: his only advanced-setting treatment is letrozole + leuprolide + abemaciclib (2/2025–9/2026), and adjuvant ddAC-T ended 10/2021, over 3 years before recurrence.",
      evidence: [
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
        { quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE },
      ],
    },
    {
      id: "NCT06224673-inc-10",
      status: "pass",
      rationale: "Hemoglobin 11.8 g/dL on 2026-09-22, above 8.0.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT06224673-inc-11",
      status: "pass",
      rationale: "ANC 1.7 × 10⁹/L on 2026-09-22, above 1.0.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT06224673-inc-12",
      status: "pass",
      rationale: "Platelets 190 × 10⁹/L on 2026-09-22, above the 100 threshold.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT06224673-inc-13",
      status: "pass",
      rationale: "Total bilirubin 0.7 mg/dL on 2026-09-22, within normal limits.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT06224673-inc-14",
      status: "pass",
      rationale: "AST 26 U/L on 2026-09-22, well under 3 × ULN.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT06224673-inc-15",
      status: "pass",
      rationale: "ALT 31 U/L on 2026-09-22, well under 3 × ULN.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT06224673-inc-16",
      status: "pass",
      rationale: "Creatinine 1.1 mg/dL (within 1.5 × ULN) with eGFR 74 on 2026-09-22.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
    },
    {
      id: "NCT06224673-inc-17",
      status: "unknown",
      confidence: "medium",
      rationale: "The only LVEF on record is 60% from 2021, before doxorubicin, about 5 years old.",
      evidence: [{ quote: "Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram; LVEF ≥ 50% (or ≥ institutional LLN) required.",
    },
    {
      id: "NCT06224673-inc-18",
      status: "pass",
      confidence: "medium",
      rationale: "Conditional allowance for people with HIV; no HIV infection is recorded.",
    },
    {
      id: "NCT06224673-inc-19",
      status: "pass",
      confidence: "medium",
      rationale: "Applies only to chronic hepatitis B; none is recorded and liver tests are normal.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT06224673-inc-20",
      status: "pass",
      confidence: "medium",
      rationale: "Applies only to a history of hepatitis C; none is recorded.",
    },
    {
      id: "NCT06224673-inc-21",
      status: "pass",
      rationale: "Recovered from acute toxicity: abemaciclib diarrhea resolved after it was stopped on 2026-09-15.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT06224673-inc-22",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to contraception for 5 months after treatment (men with partners of childbearing potential) is confirmed at screening; vasectomy 2005.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06224673-inc-23",
      status: "pass",
      confidence: "low",
      rationale: "Agreement not to freeze or donate sperm through 5 months after the last dose is confirmed at consent.",
    },
    {
      id: "NCT06224673-inc-24",
      status: "not-applicable",
      rationale: "Ova donation restriction applies to female subjects only.",
    },
    {
      id: "NCT06224673-exc-1",
      status: "pass",
      rationale: "No ARX788 or auristatin-based ADC in his history: prior therapy was ddAC-T, PMRT, tamoxifen and letrozole + leuprolide + abemaciclib.",
      evidence: [{ quote: "adj ddAC-T 6/2021-10/2021", source: NOTE }],
    },
    {
      id: "NCT06224673-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No drug allergies recorded and he has never received ARX788.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT06224673-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Abemaciclib stopped 2026-09-15 (14 days on 9/29) and letrozole the same day (7-day window cleared 9/22). Leuprolide (last depot 2026-08-14) is being continued; whether it may continue on study is undecided.",
      evidence: [
        { quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE },
      ],
      actionNeeded: "Start no earlier than 2026-09-29; confirm with the PI whether leuprolide may continue.",
    },
    {
      id: "NCT06224673-exc-4",
      status: "pass",
      rationale: "Only radiation was post-mastectomy RT in Nov–Dec 2021, far outside the 7-day window.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT06224673-exc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "No ILD, pneumonitis or other significant lung disease is recorded; his lung findings are metastatic nodules, which the criterion exempts. Former 20 pack-year smoker without a COPD diagnosis.",
      evidence: [
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
        { quote: "SH: Former smoker, 20 pack-yrs, quit 2010.", source: NOTE },
      ],
    },
    {
      id: "NCT06224673-exc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "He had chest-wall PMRT in 2021 but no radiation sequelae or fibrosis are reported, no immune-mediated pneumonitis, and SpO2 is 96% on room air with no oxygen need.",
      evidence: [
        { quote: "PMRT 11-12/2021", source: NOTE },
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
      ],
    },
    {
      id: "NCT06224673-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No keratitis, keratopathy or active eye disease appears in the history.",
    },
    {
      id: "NCT06224673-exc-8",
      status: "unknown",
      confidence: "medium",
      rationale: "No heart failure, angina, arrhythmia or MI is recorded, but no ECG is documented, so QTcF cannot be assessed against the male threshold.",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
      actionNeeded: "Obtain screening ECG; QTcF must be ≤ 450 ms (male threshold).",
    },
    {
      id: "NCT06224673-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is suspected: no headache, visual change or focal deficit, and the neurological exam is nonfocal.",
      evidence: [
        { quote: "No HA, visual change or focal weakness.", source: NOTE },
        { quote: "Neuro nonfocal.", source: NOTE },
      ],
    },
    {
      id: "NCT06224673-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No active systemic or psychiatric illness is recorded; comorbidities are controlled hypertension and hyperlipidaemia.",
      evidence: [{ quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE }],
    },
    {
      id: "NCT06224673-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled intercurrent illness or active infection is documented, and no antimicrobials are listed.",
    },
    {
      id: "NCT06224673-exc-12",
      status: "pass",
      confidence: "medium",
      rationale:
        "His GG1 prostate cancer (dx 11/2023) is on active surveillance and has never been treated; no progression is reported, though PSA is suppressed by leuprolide and surveillance MRI results are not in the record.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
        { quote: "4. Prostate ca on AS: PSA suppressed on leuprolide; urology following w/ MRI.", source: NOTE },
      ],
      actionNeeded: "Obtain the latest urology note or prostate MRI to confirm no progression.",
    },
    {
      id: "NCT06224673-exc-13",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding exclusions apply to women; he is a 61-year-old man.",
    },
    {
      id: "NCT06224673-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No hepatitis B, hepatitis C or HIV infection is recorded, and the protocol does not require screening serology.",
    },
  ],
);
