import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const PRIOR = "Prior pathology 2019";
const CT = "CT CAP 2026-08-14";
const LABS = "Labs 2026-09-15";
const MEDS = "Medication list";

export default demoMatch(
  "NCT05950945",
  "Excluded: HR+/HER2-low cohort needs early progression; hers came after ~17 months of 1L CDK4/6i",
  "Her HR+/HER2-low disease, single prior metastatic line, measurable liver lesions, ECOG 1 and lack of prior ADC or anti-HER2 therapy fit the general frame. However, HR+/HER2-low patients enter only with early endocrine resistance: recurrence < 2 years after starting adjuvant endocrine therapy, or progression within 12 months of a CDK4/6 inhibitor. She recurred about 5 years 2 months after starting adjuvant anastrozole and progressed after ~17 months of first-line letrozole + palbociclib, so she meets none of these. An echocardiogram within 28 days and an ECG would also have been outstanding.",
  [
    {
      id: "NCT05950945-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Informed consent is signed at screening; she is interested in trial options.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-2",
      status: "pass",
      confidence: "medium",
      rationale: "Archival tissue exists from the February 2025 liver core biopsy (and the 2019 lumpectomy); her agreement to provide it is confirmed at screening.",
      evidence: [{ quote: "Collected: 2025-02-19", source: PATH }],
    },
    {
      id: "NCT05950945-inc-3",
      status: "pass",
      rationale: "Biopsy-proven metastatic breast cancer in liver and bone, hormone receptor-positive.",
      evidence: [
        { quote: "Metastatic adenocarcinoma, consistent with breast primary.", source: PATH },
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
      ],
    },
    {
      id: "NCT05950945-inc-4",
      status: "pass",
      rationale: "Percent positivity is reported: ER 90% and PR 10% on the 2025 liver biopsy; ER 95% and PR 60% on the 2019 primary.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 10% of tumor cells, weak to moderate intensity", source: PATH },
        { quote: "ER 95% strong, PR 60%", source: PRIOR },
      ],
    },
    {
      id: "NCT05950945-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "HER2 IHC 1+, ISH not amplified on the 2025 liver biopsy and IHC 1+ on the 2019 primary, so HER2-low; the trial requires confirmation on a sample submitted at Tissue Screening.",
      evidence: [{ quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH }],
      actionNeeded: "Submit tissue for HER2 confirmation at Tissue Screening (IHC 1+, 2+/ISH- or 0 qualifies).",
    },
    {
      id: "NCT05950945-inc-6",
      status: "pass",
      rationale: "Never HER2-positive: IHC 1+ on the 2019 primary and IHC 1+ with HER2/CEP17 ratio 1.2 on the 2025 liver biopsy.",
      evidence: [
        { quote: "ER 95% strong, PR 60%, HER2 IHC 1+ (negative)", source: PRIOR },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)", source: PATH },
      ],
    },
    {
      id: "NCT05950945-inc-7",
      status: "pass",
      rationale: "No anti-HER2 therapy at any time; her metastatic treatment has been letrozole + palbociclib only.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-8",
      status: "fail",
      rationale: "One prior metastatic line, but as HR+/HER2-low (Cohort 3) she needs early progression. She recurred ~5 years 2 months after starting adjuvant anastrozole (12/2019 to 2/2025), had no adjuvant CDK4/6 inhibitor, and progressed after ~17 months (> 12) of first-line palbociclib.",
      evidence: [
        { quote: "then adj anastrozole 12/2019 until recurrence", source: NOTE },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-inc-9",
      status: "pass",
      rationale: "Measurable liver lesions on CT 2026-08-14, largest 3.2 cm in segment VI.",
      evidence: [{ quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: CT }],
    },
    {
      id: "NCT05950945-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases (asymptomatic, never imaged); small, untreated, asymptomatic lesions would be allowed in any case.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-11",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Inferred: ECOG 1, preserved liver function and stable bone disease make a life expectancy of at least 12 weeks very likely.",
      evidence: [{ quote: "Bone mets stable.", source: NOTE }],
    },
    {
      id: "NCT05950945-inc-13",
      status: "unknown",
      confidence: "low",
      rationale: "Her only echocardiogram was the pre-anthracycline TTE in 2019 (LVEF 62%), seven years ago and before doxorubicin; no assessment within 28 days.",
      evidence: [{ quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%). Will order repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram or MUGA within 28 days before enrollment; LVEF ≥ 50% required.",
    },
    {
      id: "NCT05950945-inc-14",
      status: "pass",
      rationale: "Labs 2026-09-15 meet standard thresholds: ANC 2.8, platelets 210, Hgb 11.2, bilirubin 0.6, AST 34/ALT 41, creatinine 0.8 (CrCl ≈ 86 mL/min), albumin 3.9. They are within 28 days only if enrollment is by 2026-10-13.",
      evidence: [
        { quote: "ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: LABS },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: LABS },
      ],
    },
    {
      id: "NCT05950945-inc-15",
      status: "pass",
      rationale: "Letrozole + palbociclib stopped 2026-08-20 (39 days ago); no chemotherapy or radiotherapy since 2019. Denosumab is supportive bone therapy.",
      evidence: [{ quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT05950945-inc-16",
      status: "not-applicable",
      rationale: "Postmenopausal woman (natural menopause at about 51), not of reproductive potential; contraception requirements do not apply.",
    },
    {
      id: "NCT05950945-exc-1",
      status: "pass",
      rationale: "No antibody-drug conjugate at any time; prior therapy was ddAC-T, anastrozole, then letrozole + palbociclib.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension is controlled (BP 132/78 on amlodipine) and no cardiac history is recorded.",
      evidence: [
        { quote: "BP 132/78 HR 76 afebrile.", source: NOTE },
        { quote: "HTN - amlodipine, controlled.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-exc-3",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG or QTc is documented anywhere in the record.",
      actionNeeded: "Obtain 12-lead ECG at screening to exclude QTc prolongation.",
    },
    {
      id: "NCT05950945-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis or ILD history; CT chest 2026-08-14 shows no new pulmonary nodules and no interstitial change, and she has never smoked. Screening CT will be reviewed for ILD.",
      evidence: [
        { quote: "No new pulmonary nodules.", source: CT },
        { quote: "Lungs CTA.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Sclerotic T8 and L3 metastases are stable, the spine is nontender and she has no focal weakness or neurological symptoms; no known CNS metastases.",
      evidence: [
        { quote: "Sclerotic osseous metastases at T8, L3 and right iliac wing, unchanged.", source: CT },
        { quote: "Spine nontender to percusion. Neuro grossly nonfocal.", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than breast cancer is recorded in her history.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Her only recorded allergy is sulfa (rash); she has never received trastuzumab deruxtecan or trastuzumab.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
    },
    {
      id: "NCT05950945-exc-8",
      status: "pass",
      rationale: "She has received denosumab, a monoclonal antibody, every 4 weeks since March 2025 without reaction.",
      evidence: [{ quote: "Tolerating denosumab, no dental isues.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Afebrile, with no infection or IV antimicrobials recorded.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No immunodeficiency, HIV or hepatitis on the problem list, and transaminases are normal; HIV and hepatitis B/C serology are not documented.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6", source: LABS }],
      actionNeeded: "Check HIV and hepatitis B/C serology at screening if required.",
    },
    {
      id: "NCT05950945-exc-11",
      status: "unknown",
      confidence: "low",
      rationale: "Recent vaccination history is not recorded.",
      actionNeeded: "Confirm no live attenuated vaccine within 30 days before the first dose.",
    },
    {
      id: "NCT05950945-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Only grade 1 findings remain: Hgb 11.2 (grade 1 anemia), with ANC and platelets recovered after palbociclib. Fatigue began after stopping therapy and she remains independent in shopping and housework.",
      evidence: [
        { quote: "ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: LABS },
        { quote: "moderate fatigue (still does own shopping/housework)", source: NOTE },
      ],
    },
    {
      id: "NCT05950945-exc-13",
      status: "not-applicable",
      rationale: "Postmenopausal (natural menopause at about 51, now 58); pregnancy and breastfeeding do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No lung disease: never smoker, lungs clear, and no pulmonary findings on CT 2026-08-14.",
      evidence: [
        { quote: "never smoker, wine socially.", source: NOTE },
        { quote: "No new pulmonary nodules.", source: CT },
      ],
    },
    {
      id: "NCT05950945-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune, connective-tissue or inflammatory disorder on the problem list (hypertension, hyperlipidaemia, osteopenia).",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: NOTE }],
    },
    {
      id: "NCT05950945-exc-16",
      status: "pass",
      rationale: "No lung surgery; surgical history is lumpectomy with axillary dissection and port placement and removal.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: NOTE }],
    },
  ],
);
