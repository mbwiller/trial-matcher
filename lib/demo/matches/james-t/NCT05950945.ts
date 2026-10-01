import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const PRIOR = "Prior pathology 2021";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";
const ALLERGY = "Allergies";

export default demoMatch(
  "NCT05950945",
  "Excluded: HR+ cohort needs early endocrine resistance; he progressed after ~19 months on CDK4/6i",
  "DESTINY-Breast15's HR+/HER2-low cohort is for early endocrine resistance: recurrence within 2 years of starting adjuvant endocrine therapy or progression within the first 12 months of a CDK4/6 inhibitor. He recurred 3 years into adjuvant tamoxifen and progressed after about 19 months on letrozole + abemaciclib, so he meets none of the routes. The untreated prostate cancer diagnosed 11/2023 also falls inside the 3-year other-malignancy window. T-DXd itself remains available to him off-trial for HER2-low disease.",
  [
    {
      id: "NCT05950945-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Consent is obtained at screening; he is keen on trials.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "Archival tissue is available from the January 2025 CT-guided lung core biopsy and the 2021 mastectomy; his agreement to provide it is confirmed at screening.",
      evidence: [{ quote: "Specimen: Lung, left lower lobe nodule, CT-guided core biopsy", source: PATH }],
    },
    {
      id: "NCT05950945-inc-3",
      status: "pass",
      rationale: "Biopsy-proven metastatic breast cancer (lung, January 2025), hormone receptor-positive.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma, consistent with breast primary.", source: PATH },
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
      ],
    },
    {
      id: "NCT05950945-inc-4",
      status: "pass",
      rationale: "Receptor reports include percentages: ER 85% and PR 30% on the lung metastasis, ER 90% and PR 70% on the 2021 primary.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 30% of tumor cells, moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT05950945-inc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "Local testing shows HER2-low (IHC 1+, ISH not amplified) on the 2025 metastasis and IHC 1+ on the 2021 primary; the trial confirms status on the sample submitted at tissue screening.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
      ],
      actionNeeded: "Submit tissue for central HER2 confirmation",
    },
    {
      id: "NCT05950945-inc-6",
      status: "pass",
      rationale: "Never HER2-positive: IHC 1+ on the 2021 primary and IHC 1+ with ISH ratio 1.3 on the 2025 metastasis.",
      evidence: [
        { quote: "ER 90%, PR 70%, HER2 IHC 1+ (negative), Ki-67 15%.", source: PRIOR },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
      ],
    },
    {
      id: "NCT05950945-inc-7",
      status: "pass",
      rationale: "His only metastatic therapy was letrozole + leuprolide + abemaciclib; he has never had anti-HER2 treatment and was never HER2-positive.",
      evidence: [{ quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-8",
      status: "fail",
      rationale:
        "One metastatic line, but no Cohort 3 route: recurrence came 36 months after starting adjuvant tamoxifen (needs < 2 years), there was no adjuvant CDK4/6 inhibitor, and first-line abemaciclib lasted about 19 months (needs progression within 12).",
      evidence: [
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-inc-9",
      status: "pass",
      rationale: "CT 2026-09-11 shows a 1.6 cm RUL nodule and a 1.7 cm (short axis) right hilar node, both measurable.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases and no neurological symptoms; the brain has never been imaged.",
      evidence: [{ quote: "No HA, visual change or focal weakness. Has never had brain imaging.", source: NOTE }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging",
    },
    {
      id: "NCT05950945-inc-11",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-12",
      status: "pass",
      confidence: "medium",
      rationale: "ECOG 1 with limited lung, nodal and bone disease and normal organ function support a life expectancy well beyond 12 weeks.",
    },
    {
      id: "NCT05950945-inc-13",
      status: "unknown",
      confidence: "medium",
      rationale: "The only echocardiogram was before adjuvant doxorubicin in 2021 (LVEF 60%), not within 28 days.",
      evidence: [{ quote: "Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram within 28 days of enrollment; LVEF ≥ 50% required",
    },
    {
      id: "NCT05950945-inc-14",
      status: "pass",
      rationale:
        "Labs 2026-09-22 are adequate (ANC 1.7, platelets 190, Hgb 11.8, creatinine 1.1, AST/ALT 26/31, bilirubin 0.7) and within 28 days until 2026-10-20.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
    },
    {
      id: "NCT05950945-inc-15",
      status: "pass",
      confidence: "medium",
      rationale: "Abemaciclib and letrozole stopped 2026-09-15 (13 days ago), with no recent radiation or surgery; leuprolide continues.",
      evidence: [{ quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE }],
      actionNeeded: "Confirm the protocol washout from abemaciclib and whether leuprolide may continue",
    },
    {
      id: "NCT05950945-inc-16",
      status: "pass",
      confidence: "low",
      rationale: "Contraception agreement is confirmed at screening; he had a vasectomy in 2005.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-1",
      status: "pass",
      rationale: "No antibody-drug conjugate has been given; T-DXd is listed only as a future option.",
      evidence: [{ quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension controlled (BP 138/82 on lisinopril) and hyperlipidemia; no cardiac events, heart failure or arrhythmia recorded despite 2021 anthracycline exposure.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-3",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG or QTc is documented, and leuprolide (androgen deprivation) can prolong the QT interval.",
      actionNeeded: "Obtain 12-lead ECG; T-DXd studies typically exclude QTcF > 470 ms",
    },
    {
      id: "NCT05950945-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "No ILD or steroid-treated pneumonitis is recorded and CT 2026-09-11 describes no interstitial change; mild dry cough, right upper rhonchi and a 20 pack-year history warrant a careful screening read.",
      evidence: [
        { quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE },
        { quote: "SH: Former smoker, 20 pack-yrs, quit 2010.", source: NOTE },
      ],
      actionNeeded: "Confirm ILD/pneumonitis is ruled out on the screening CT",
    },
    {
      id: "NCT05950945-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Spinal metastases (T6, L2) are sclerotic and stable with a nontender spine and nonfocal neuro exam; no known CNS disease, though the brain is unimaged.",
      evidence: [
        { quote: "2. Sclerotic osseous metastases T6, L2 and left iliac bone, unchanged.", source: CT },
        { quote: "Spine nontender. Neuro nonfocal.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-exc-6",
      status: "fail",
      confidence: "medium",
      rationale:
        "Prostate adenocarcinoma (grade group 1) diagnosed 11/2023, about 34 months ago, is untreated on active surveillance, so it is neither curatively treated nor outside the 3-year window.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Ask the sponsor whether untreated GG1 prostate cancer on active surveillance is acceptable",
    },
    {
      id: "NCT05950945-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No known drug allergies, and he has never received T-DXd or trastuzumab.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: ALLERGY }],
    },
    {
      id: "NCT05950945-exc-8",
      status: "pass",
      rationale: "No known drug allergies, and he has received denosumab, a monoclonal antibody, every 4 weeks since February 2025 with no reaction recorded.",
      evidence: [
        { quote: "ALLERGIES: NKDA", source: ALLERGY },
        { quote: "denosumab 120 mg SC q4 weeks", source: MEDS },
      ],
    },
    {
      id: "NCT05950945-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No infection or IV antimicrobial therapy is documented; no antimicrobials on his medication list.",
    },
    {
      id: "NCT05950945-exc-10",
      status: "unknown",
      confidence: "medium",
      rationale: "No immunodeficiency is recorded, but HIV and hepatitis B/C status are not documented.",
      actionNeeded: "Obtain HIV, HBsAg/anti-HBc and HCV antibody testing; active hepatitis B/C or uncontrolled HIV excludes",
    },
    {
      id: "NCT05950945-exc-11",
      status: "pass",
      confidence: "low",
      rationale: "No vaccination is recorded; recent live-vaccine exposure is confirmed at screening.",
      actionNeeded: "Confirm no live attenuated vaccine within 30 days before the first dose",
    },
    {
      id: "NCT05950945-exc-12",
      status: "pass",
      rationale: "Abemaciclib-related grade 1 diarrhea has resolved since stopping; no other ongoing toxicity is recorded.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-13",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding do not apply; he is male.",
    },
    {
      id: "NCT05950945-exc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "No COPD, asthma, pulmonary embolism or pleural effusion is recorded; SpO2 96% on room air. He is a 20 pack-year former smoker with a mild cough from chest metastases.",
      evidence: [
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
        { quote: "SH: Former smoker, 20 pack-yrs, quit 2010.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune, connective tissue or inflammatory disorder in his past medical history (hypertension and hyperlipidemia only).",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-16",
      status: "pass",
      rationale: "No lung resection: surgical history is the mastectomy with axillary dissection and a vasectomy; the lung was only core-biopsied.",
      evidence: [{ quote: "PSH: as above. Vasectomy 2005.", source: NOTE }],
    },
  ],
);
