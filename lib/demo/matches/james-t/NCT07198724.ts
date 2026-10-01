import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const NGS = "Tissue NGS 2025-02-12";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";
const ALLERGY = "Allergies";

export default demoMatch(
  "NCT07198724",
  "Blocked as written by untreated 2023 prostate cancer · otherwise fits; echo and ESR1 test due",
  "ERADICATE accepts men and fits his disease closely: HR+/HER2-low (ER 85%, IHC 1+), progression on a CDK4/6 inhibitor, no chemotherapy or ADC for metastatic disease, and measurable chest lesions. The blocker is the other-malignancy rule: grade group 1 prostate cancer diagnosed 11/2023 is untreated on active surveillance, so he is not disease-free for 3 years and it is not a listed exception. If the sponsor-investigator grants an exception, the remaining items are a current echocardiogram (last LVEF 60% in 2021), ESR1 testing within 6 months (Guardant360) and hepatitis B/C serology.",
  [
    {
      id: "NCT07198724-inc-1",
      status: "pass",
      rationale:
        "Most recent sample (lung metastasis, January 2025): ER 85%, PR 30%, HER2 IHC 1+ with ISH not amplified, i.e. HR+/HER2-low with ER well above 10%.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT07198724-inc-2",
      status: "pass",
      rationale: "Received abemaciclib with letrozole + leuprolide as first-line metastatic therapy, February 2025 to 2026-09-15.",
      evidence: [{ quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-3",
      status: "pass",
      rationale: "No chemotherapy or ADC has been given for metastatic disease (up to one allowed); adjuvant ddAC-T in 2021 is not a metastatic line.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-4",
      status: "pass",
      rationale: "CT 2026-09-11: RUL nodule 1.6 cm (≥ 1 cm) and right hilar node 1.7 cm short axis, both RECIST 1.1 measurable.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-5",
      status: "unknown",
      confidence: "medium",
      rationale:
        "ESR1 was wild-type on tissue from February 2025, about 19 months ago and before aromatase inhibitor exposure; ctDNA at progression has not been sent, so no result falls within 6 months.",
      evidence: [
        { quote: "ESR1: no alterations detected (wild-type)", source: NGS },
        { quote: "Consider ctDNA to reassess ESR1 at PD - not yet sent.", source: NOTE },
      ],
      actionNeeded: "Send Guardant360 CDx ctDNA for ESR1 status before registration; the 2025 tissue result is too old",
    },
    {
      id: "NCT07198724-inc-6",
      status: "pass",
      rationale: "61-year-old man; the trial enrolls women or men aged ≥ 18.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-7",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-8",
      status: "pass",
      rationale:
        "Labs 2026-09-22 meet every listed threshold: ANC 1.7, platelets 190, Hgb 11.8, bilirubin 0.7, AST/ALT 26/31, creatinine 1.1 (eGFR 74).",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
    },
    {
      id: "NCT07198724-inc-9",
      status: "pass",
      rationale: "ANC 1.7 × 10⁹/L (1,700/µL) on 2026-09-22.",
      evidence: [{ quote: "ANC 1.7", source: LABS }],
    },
    {
      id: "NCT07198724-inc-10",
      status: "pass",
      rationale: "Platelets 190 × 10⁹/L (190,000/µL) on 2026-09-22.",
      evidence: [{ quote: "Plt 190", source: LABS }],
    },
    {
      id: "NCT07198724-inc-11",
      status: "pass",
      rationale: "Hemoglobin 11.8 g/dL on 2026-09-22, flagged low but above 9.0 g/dL.",
      evidence: [{ quote: "Hgb 11.8 (L)", source: LABS }],
    },
    {
      id: "NCT07198724-inc-12",
      status: "pass",
      rationale: "Total bilirubin 0.7 mg/dL on 2026-09-22, within normal limits.",
      evidence: [{ quote: "T bili 0.7", source: LABS }],
    },
    {
      id: "NCT07198724-inc-13",
      status: "pass",
      rationale: "AST 26 and ALT 31 U/L on 2026-09-22, within normal limits.",
      evidence: [{ quote: "AST 26 | ALT 31", source: LABS }],
    },
    {
      id: "NCT07198724-inc-14",
      status: "pass",
      rationale: "Creatinine 1.1 mg/dL on 2026-09-22 is not flagged abnormal (eGFR 74), so well within 1.5 × ULN.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
    },
    {
      id: "NCT07198724-inc-15",
      status: "not-applicable",
      rationale: "The Cockcroft-Gault route applies only when creatinine is above ULN; his 1.1 mg/dL is unflagged with eGFR 74.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
    },
    {
      id: "NCT07198724-inc-16",
      status: "unknown",
      confidence: "medium",
      rationale: "The only echocardiogram was before adjuvant doxorubicin in 2021 (LVEF 60%), five years old and pre-anthracycline.",
      evidence: [{ quote: "Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram (or MUGA) before registration; LVEF ≥ 50% required",
    },
    {
      id: "NCT07198724-inc-17",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known CNS metastases and no neurological symptoms; the brain has never been imaged. Even untreated asymptomatic lesions would be allowed under this criterion.",
      evidence: [{ quote: "No HA, visual change or focal weakness. Has never had brain imaging.", source: NOTE }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging",
    },
    {
      id: "NCT07198724-inc-18",
      status: "not-applicable",
      rationale: "The postmenopausal definition applies to women; he is a man, and this criterion sets no GnRH-agonist requirement for men.",
    },
    {
      id: "NCT07198724-inc-19",
      status: "not-applicable",
      rationale: "Pregnancy testing applies to premenopausal women; he is male.",
    },
    {
      id: "NCT07198724-inc-20",
      status: "pass",
      confidence: "low",
      rationale: "Men must agree to contraception for 7 months after T-DXd; he had a vasectomy in 2005 and agreement is confirmed at screening.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-21",
      status: "pass",
      confidence: "medium",
      rationale: "Took oral abemaciclib and letrozole for about 19 months with no swallowing or absorption problem recorded.",
      evidence: [{ quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT07198724-inc-22",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and willingness to consent are confirmed at screening; he is keen on trials.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-1",
      status: "pass",
      rationale:
        "No topoisomerase I ADC (T-DXd, sacituzumab) in any setting: adjuvant therapy was ddAC-T and nothing cytotoxic has been given for metastatic disease.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
      ],
    },
    {
      id: "NCT07198724-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "No oral SERD, PROTAC or CERAN; his only SERM (tamoxifen) was adjuvant. Abemaciclib/letrozole stopped 2026-09-15, so the 7-day washout is already met; leuprolide continues.",
      evidence: [{ quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE }],
      actionNeeded: "Confirm with the sponsor-investigator whether leuprolide may continue alongside elacestrant",
    },
    {
      id: "NCT07198724-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases, no neurological symptoms and a nonfocal exam; no neurosurgery. The brain has not been imaged.",
      evidence: [{ quote: "Spine nontender. Neuro nonfocal.", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent appears in his treatment history; he has not previously enrolled in a trial.",
    },
    {
      id: "NCT07198724-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No known drug allergies; he tolerated tamoxifen (an ER modulator) for 3 years and has never received trastuzumab or an ADC.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: ALLERGY }],
    },
    {
      id: "NCT07198724-exc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "No pneumonitis history, and CT 2026-09-11 describes nodules and a hilar node with no ILD; he has a mild dry cough and right upper rhonchi, is a 20 pack-year ex-smoker and had chest wall radiation in 2021.",
      evidence: [{ quote: "Lungs: few ronchi R upper field.", source: NOTE }],
      actionNeeded: "Confirm no ILD on the screening CT, given cough, prior PMRT and smoking history",
    },
    {
      id: "NCT07198724-exc-7",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding do not apply; he is male.",
    },
    {
      id: "NCT07198724-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis history or symptoms are documented in an otherwise detailed record.",
    },
    {
      id: "NCT07198724-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "Hypertension is controlled (BP 138/82 on lisinopril), there is no diabetes, no cardiac event or arrhythmia is recorded, abemaciclib diarrhea has resolved and there is no infection.",
      evidence: [
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
        { quote: "No VTE. No DM.", source: NOTE },
        { quote: "Diarrhea resolved off abema.", source: NOTE },
      ],
    },
    {
      id: "NCT07198724-exc-10",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Liver function is normal (bilirubin 0.7, AST/ALT 26/31, no liver metastases) and no MI, coronary event or heart failure is recorded, but hepatitis B and C status is not documented.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody (reflex HCV RNA); active hepatitis B or C excludes",
    },
    {
      id: "NCT07198724-exc-11",
      status: "fail",
      confidence: "medium",
      rationale:
        "Prostate adenocarcinoma (Gleason 3+3, grade group 1) diagnosed 11/2023 remains untreated on active surveillance, so he is not disease-free for 3 years and it is not a listed exception; entry would need a sponsor-investigator waiver.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
        { quote: "?exclusionary 2nd malignancy for trials.", source: NOTE },
      ],
      actionNeeded: "Ask the sponsor-investigator whether untreated GG1 prostate cancer on active surveillance can be exempted",
    },
  ],
);
