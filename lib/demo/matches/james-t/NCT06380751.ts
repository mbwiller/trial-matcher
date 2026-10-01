import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const GEN = "Germline panel 2021-06";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT06380751",
  "Excluded: first-line only; he has already progressed on letrozole + abemaciclib for metastatic disease",
  "EvoPAR-Breast01 tests saruparib plus camizestrant as first-line therapy for HR+/HER2-negative advanced breast cancer with a BRCA1/2 or PALB2 mutation. His germline BRCA2 and HER2-low disease fit and men are eligible, but about 19 months of letrozole + leuprolide + abemaciclib for metastatic disease far exceeds the 28 days of prior endocrine therapy allowed. His untreated 2023 prostate cancer would also need review under the other-malignancy exclusion. A PARP inhibitor remains available to him as standard second-line therapy.",
  [
    {
      id: "NCT06380751-inc-1",
      status: "pass",
      rationale: "Adult man (61 years); the trial enrolls adult males.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06380751-inc-2",
      status: "pass",
      rationale: "ER 85%, PR 30%, HER2 IHC 1+ with ISH not amplified on the 2025 lung biopsy, within the trial's HER2-negative definition (IHC 0, 1+, 2+/ISH-).",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT06380751-inc-3",
      status: "pass",
      rationale: "Metastatic disease in lung, right hilar node and bone.",
      evidence: [{ quote: "Metastatic HR+/HER2-low male breast ca (lung, R hilar LN, bone)", source: NOTE }],
    },
    {
      id: "NCT06380751-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "ECOG 1 on 2026-09-25 with only a mild cough; no recent decline is described.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06380751-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "FFPE tissue exists from the January 2025 lung core biopsy and the 2021 mastectomy; availability of blocks is confirmed at screening.",
      evidence: [{ quote: "Specimen: Lung, left lower lobe nodule, CT-guided core biopsy", source: PATH }],
    },
    {
      id: "NCT06380751-inc-6",
      status: "pass",
      rationale: "Germline BRCA2 c.5946delT frameshift, reported pathogenic (June 2021), with loss of heterozygosity in the tumor.",
      evidence: [{ quote: "BRCA2 c.5946delT (p.Ser1982ArgfsTer22) - PATHOGENIC", source: GEN }],
    },
    {
      id: "NCT06380751-inc-7",
      status: "pass",
      rationale: "Labs 2026-09-22 adequate: ANC 1.7, platelets 190, Hgb 11.8, creatinine 1.1 (eGFR 74), AST/ALT 26/31, bilirubin 0.7.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
    },
    {
      id: "NCT06380751-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No MDS/AML history and counts are near normal (WBC 4.2, platelets 190, Hgb 11.8), despite prior anthracycline/cyclophosphamide in 2021.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT06380751-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No bleeding disorder recorded, no anticoagulant on his medication list and platelets 190.",
    },
    {
      id: "NCT06380751-exc-3",
      status: "pass",
      rationale: "No cytopenia: ANC 1.7, platelets 190 and Hgb 11.8 on 2026-09-22.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT06380751-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension is controlled (BP 138/82) and no active infection or other uncontrolled systemic disease is documented.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
    },
    {
      id: "NCT06380751-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Took oral therapy for about 19 months; abemaciclib diarrhea has resolved and there is no GI disease or bowel resection recorded.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT06380751-exc-6",
      status: "fail",
      confidence: "medium",
      rationale:
        "Second primary: grade group 1 prostate adenocarcinoma diagnosed 11/2023, untreated on active surveillance. The registry wording has no exception; entry would need the sponsor to accept it.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Check the full protocol's other-malignancy exceptions for untreated GG1 prostate cancer on surveillance",
    },
    {
      id: "NCT06380751-exc-7",
      status: "pass",
      rationale: "No persisting grade ≥ 2 toxicity: abemaciclib diarrhea (grade 1) has resolved.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT06380751-exc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "Spine nontender with stable sclerotic T6/L2 lesions and a nonfocal neuro exam; no known brain or leptomeningeal disease, but the brain has never been imaged.",
      evidence: [
        { quote: "No HA, visual change or focal weakness. Has never had brain imaging.", source: NOTE },
        { quote: "Spine nontender. Neuro nonfocal.", source: NOTE },
      ],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging",
    },
    {
      id: "NCT06380751-exc-9",
      status: "unknown",
      confidence: "medium",
      rationale: "Liver tests are normal, but hepatitis B and C serology is not documented.",
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody (reflex RNA); active uncontrolled hepatitis excludes",
    },
    {
      id: "NCT06380751-exc-10",
      status: "unknown",
      confidence: "medium",
      rationale: "HIV status is not documented in the record.",
      actionNeeded: "Obtain HIV serology; active uncontrolled HIV excludes",
    },
    {
      id: "NCT06380751-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis history or symptoms recorded in an otherwise detailed record.",
    },
    {
      id: "NCT06380751-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Controlled hypertension only; no arrhythmia, ischemic heart disease or heart failure recorded (HR 72). No ECG is on file.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
      actionNeeded: "Obtain baseline ECG and echocardiogram if the protocol requires them",
    },
    {
      id: "NCT06380751-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "Leuprolide is given for his breast cancer (testicular suppression with endocrine therapy), not for a non-cancer condition; no other hormonal therapy is listed.",
      evidence: [{ quote: "3. Continue leuprolide 22.5 mg q3 mo for now; testosterone castrate.", source: NOTE }],
    },
    {
      id: "NCT06380751-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No surgery since the 2021 mastectomy (lung core biopsy in January 2025 only) and none planned.",
    },
    {
      id: "NCT06380751-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No palliative radiotherapy recorded; his only radiation was post-mastectomy radiation in late 2021.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT06380751-exc-16",
      status: "fail",
      rationale:
        "He received letrozole + leuprolide + abemaciclib for metastatic disease from February 2025 to 2026-09-15, far beyond the 28 days of endocrine therapy permitted in this first-line study.",
      evidence: [
        { quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE },
        { quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS },
      ],
    },
    {
      id: "NCT06380751-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No transfusion or growth factor support recorded; counts are adequate without it.",
    },
    {
      id: "NCT06380751-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "Abemaciclib and letrozole stopped 2026-09-15; leuprolide and denosumab continue and are usually permitted, but this should be confirmed.",
      evidence: [{ quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE }],
      actionNeeded: "Confirm leuprolide and denosumab are permitted concomitant therapies",
    },
    {
      id: "NCT06380751-exc-19",
      status: "pass",
      rationale:
        "Current medications (leuprolide, denosumab, lisinopril, rosuvastatin, calcium/vitamin D) include no CYP3A4 inducer or inhibitor, sensitive CYP2B6 substrate, warfarin or phenytoin.",
      evidence: [{ quote: "lisinopril 20 mg PO daily", source: MEDS }],
    },
    {
      id: "NCT06380751-exc-20",
      status: "pass",
      confidence: "medium",
      rationale: "None of his medications is a known-risk torsades drug, although androgen deprivation with leuprolide can lengthen the QT interval.",
      actionNeeded: "Obtain baseline ECG given ongoing leuprolide",
    },
    {
      id: "NCT06380751-exc-21",
      status: "pass",
      rationale: "Atropine is not on his medication list.",
    },
    {
      id: "NCT06380751-exc-22",
      status: "pass",
      rationale:
        "Adjuvant ddAC-T ended 10/2021 and recurrence came in January 2025, over 3 years later; he had no early-stage PARP inhibitor, platinum, CDK4/6 inhibitor or oral SERD.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
      ],
    },
  ],
);
