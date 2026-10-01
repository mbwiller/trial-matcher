import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const NGS = "Tissue NGS 2025-03-10";
const CT = "CT CAP 2026-08-14";
const LABS = "Labs 2026-09-15";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07198724",
  "Fits elacestrant + T-DXd on core criteria · needs echo, ESR1 ctDNA and FSH/estradiol",
  "A close biological fit: HR+/HER2-low (ER 90%, IHC 1+, ISH not amplified) metastatic disease that progressed on letrozole + palbociclib, with no chemotherapy, ADC or oral SERD for metastatic disease, measurable liver lesions, ECOG 1 and labs within limits. Three screening items remain: an echocardiogram (last LVEF 62% was before anthracyclines in 2019), Guardant360 ctDNA for ESR1 because her only result is March 2025 tissue, and FSH/estradiol because at 58 she falls under the trial's under-60 definition of menopause. Enrolling would place T-DXd ahead of the PI3K/AKT-pathway options discussed for her PIK3CA H1047R.",
  [
    {
      id: "NCT07198724-inc-1",
      status: "pass",
      rationale: "On the most recent sample (liver biopsy, February 2025): ER 90%, PR 10%, HER2 IHC 1+ with ISH not amplified. That is HR+/HER2-low as defined (ER ≥ 10%).",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT07198724-inc-2",
      status: "pass",
      rationale: "Received palbociclib with letrozole for metastatic disease from March 2025 to 2026-08-20.",
      evidence: [{ quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-3",
      status: "pass",
      rationale: "No chemotherapy or ADC in the metastatic setting (her only chemotherapy was adjuvant ddAC-T in 2019), within the allowance of one prior line.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-4",
      status: "pass",
      rationale: "Liver lesions of 3.2 cm (segment VI), 1.8 cm (segment IV) and 1.5 cm (segment VIII) on CT 2026-08-14, each ≥ 10 mm by CT.",
      evidence: [
        {
          quote: "new 1.8 cm hypoattenuating lesion in segment IV; segment VI lesion increased from 2.4 cm to 3.2 cm; segment VIII lesion 1.5 cm",
          source: CT,
        },
      ],
    },
    {
      id: "NCT07198724-inc-5",
      status: "unknown",
      confidence: "medium",
      rationale: "ESR1 was wild-type on tissue NGS reported 2025-03-10, about 18 months ago, and has not been retested since progression on an aromatase inhibitor, so the result falls outside the 6-month window.",
      evidence: [{ quote: "ESR1: no alterations detected (wild-type)", source: NGS }],
      actionNeeded: "Send Guardant360 CDx ctDNA for ESR1 status before registration (required when status is not validated within 60 days).",
    },
    {
      id: "NCT07198724-inc-6",
      status: "pass",
      rationale: "Woman aged 58, above the 18-year minimum.",
      evidence: [{ quote: "58 yo postmenopausal F", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-7",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-8",
      status: "pass",
      rationale: "Labs from 2026-09-15 meet every threshold listed below (ANC, platelets, hemoglobin, bilirubin, transaminases, creatinine).",
      evidence: [{ quote: "ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: LABS }],
    },
    {
      id: "NCT07198724-inc-9",
      status: "pass",
      rationale: "ANC 2.8 × 10⁹/L (2,800/µL) on 2026-09-15.",
      evidence: [{ quote: "ANC 2.8", source: LABS }],
    },
    {
      id: "NCT07198724-inc-10",
      status: "pass",
      rationale: "Platelets 210 × 10⁹/L (210,000/µL) on 2026-09-15.",
      evidence: [{ quote: "Plt 210", source: LABS }],
    },
    {
      id: "NCT07198724-inc-11",
      status: "pass",
      rationale: "Hemoglobin 11.2 g/dL on 2026-09-15: mildly low but above the 9.0 threshold.",
      evidence: [{ quote: "Hgb 11.2 (L)", source: LABS }],
    },
    {
      id: "NCT07198724-inc-12",
      status: "pass",
      rationale: "Total bilirubin 0.6 mg/dL on 2026-09-15, within normal limits.",
      evidence: [{ quote: "T bili 0.6", source: LABS }],
    },
    {
      id: "NCT07198724-inc-13",
      status: "pass",
      rationale: "AST 34 and ALT 41 U/L on 2026-09-15, not flagged as abnormal; with liver metastases up to 5 × ULN is allowed.",
      evidence: [{ quote: "AST 34 | ALT 41", source: LABS }],
    },
    {
      id: "NCT07198724-inc-14",
      status: "pass",
      rationale: "Creatinine 0.8 mg/dL on 2026-09-15, within normal limits.",
      evidence: [{ quote: "Cr 0.8", source: LABS }],
    },
    {
      id: "NCT07198724-inc-15",
      status: "pass",
      rationale: "Not needed because creatinine 0.8 is not above ULN; Cockcroft-Gault CrCl would be ≈ 86 mL/min (age 58, 71.2 kg) in any case.",
      evidence: [{ quote: "Cr 0.8", source: LABS }],
    },
    {
      id: "NCT07198724-inc-16",
      status: "unknown",
      confidence: "low",
      rationale: "Her only echocardiogram was the pre-anthracycline TTE in 2019 (LVEF 62%). She has since received doxorubicin, and a current baseline LVEF is required before T-DXd.",
      evidence: [{ quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%). Will order repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram (or MUGA); LVEF ≥ 50% required before registration.",
    },
    {
      id: "NCT07198724-inc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases (asymptomatic, never imaged). Even stable, or untreated asymptomatic, brain metastases not needing local therapy would be allowed.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-18",
      status: "unknown",
      confidence: "medium",
      rationale: "At 58 she falls under the under-60 definition: ≥ 12 months of amenorrhea plus FSH and estradiol in the postmenopausal range. Natural menopause at about 51 gives roughly 7 years, but it coincided with 2019 chemotherapy and FSH/estradiol are not on file.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
      actionNeeded: "Obtain FSH and estradiol; both must be in the postmenopausal range (required under age 60).",
    },
    {
      id: "NCT07198724-inc-19",
      status: "not-applicable",
      rationale: "Pregnancy testing applies to premenopausal women; she is postmenopausal (natural menopause at about 51), pending FSH/estradiol confirmation under the trial definition.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT07198724-inc-20",
      status: "not-applicable",
      rationale: "Postmenopausal woman, not of child-bearing potential; contraception requirements do not apply.",
    },
    {
      id: "NCT07198724-inc-21",
      status: "pass",
      confidence: "medium",
      rationale: "Takes oral medications daily and completed about 17 months of oral letrozole + palbociclib; no nausea or vomiting.",
      evidence: [{ quote: "amlodipine 10 mg PO daily", source: MEDS }],
    },
    {
      id: "NCT07198724-inc-22",
      status: "pass",
      confidence: "low",
      rationale: "Written informed consent is obtained at screening; she is actively interested in trial options.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-1",
      status: "pass",
      rationale: "No antibody-drug conjugate of any kind, including topoisomerase-I payload ADCs; prior therapy was ddAC-T, anastrozole, then letrozole + palbociclib.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-2",
      status: "pass",
      rationale: "No oral SERD, SERM, PROTAC or CERAN. Her metastatic endocrine therapy was letrozole, stopped 2026-08-20 (39 days ago), well past the 7-day washout; no chemotherapy since 2019.",
      evidence: [{ quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT07198724-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain metastases: asymptomatic and neurologically nonfocal, with no neurosurgery or brain biopsy.",
      evidence: [
        { quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE },
        { quote: "Neuro grossly nonfocal.", source: NOTE },
      ],
    },
    {
      id: "NCT07198724-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational compound or device recorded; she is only now reviewing trial options.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Her only recorded allergy is sulfa (rash). She has not received elacestrant, trastuzumab or any related compound, so no relevant hypersensitivity is documented.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
    },
    {
      id: "NCT07198724-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis history; CT chest 2026-08-14 shows no new pulmonary nodules and no interstitial change, lungs are clear and she has never smoked. Screening CT will be reviewed for ILD before T-DXd.",
      evidence: [
        { quote: "No new pulmonary nodules.", source: CT },
        { quote: "Lungs CTA.", source: NOTE },
      ],
    },
    {
      id: "NCT07198724-exc-7",
      status: "not-applicable",
      rationale: "Postmenopausal (natural menopause at about 51, now 58); pregnancy and breastfeeding do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis history or active infection recorded; afebrile with clear lungs.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: NOTE }],
    },
    {
      id: "NCT07198724-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension is controlled on amlodipine. No cardiac, cerebrovascular or arrhythmia history, no diabetes, no GI disorder affecting absorption, and no psychiatric or social barriers are recorded.",
      evidence: [
        { quote: "HTN - amlodipine, controlled.", source: NOTE },
        { quote: "No DM.", source: NOTE },
      ],
    },
    {
      id: "NCT07198724-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Child-Pugh A on available data (bilirubin 0.6, albumin 3.9, no ascites described), and no MI, coronary intervention or heart failure on record. Hepatitis B/C status is not documented, though transaminases are normal.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: LABS }],
      actionNeeded: "Check hepatitis B and C serology and PT/INR at screening.",
    },
    {
      id: "NCT07198724-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than breast cancer is recorded in her history.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: NOTE }],
    },
  ],
);
