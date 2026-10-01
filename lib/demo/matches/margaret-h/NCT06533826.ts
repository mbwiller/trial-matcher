import { demoMatch } from "../../match-helpers";

const S_NOTE = "Oncology note 2026-09-18";
const S_PATH = "Liver biopsy pathology 2025-02-19";
const S_PRIOR = "Primary pathology 2019-04";
const S_CT = "CT C/A/P 2026-08-14";
const S_LABS = "Labs 2026-09-15";
const S_MEDS = "Medication list";

export default demoMatch(
  "NCT06533826",
  "Fits an HR+ ADC1 cohort · echocardiogram, ECG and coagulation tests not on file",
  "She fits an HR-positive ADC1 cohort (first ADC, T-DXd or Dato-DXd): HER2-low on both the primary and the liver metastasis, one metastatic endocrine line with a CDK4/6 inhibitor, no chemotherapy for metastatic disease, no prior topoisomerase I agent, measurable liver disease and ECOG 1; the ADC2 criteria do not apply at entry. Outstanding are a current echocardiogram (needed for T-DXd; her only LVEF, 62%, predates her 2019 anthracycline), an ECG for QTcF, and labs with coagulation repeated within 2 weeks of starting. Enrolling would move ADCs ahead of the capivasertib- or alpelisib-based endocrine options her PIK3CA H1047R opens, a sequencing choice to discuss with her.",
  [
    // ----- Inclusion -----
    {
      id: "NCT06533826-inc-1",
      status: "pass",
      rationale:
        "Liver core biopsy (2025-02-19) confirmed metastatic adenocarcinoma of breast origin; her bone and liver metastases are not resectable.",
      evidence: [{ quote: "DIAGNOSIS: Metastatic adenocarcinoma, consistent with breast primary.", source: S_PATH }],
    },
    {
      id: "NCT06533826-inc-2",
      status: "pass",
      rationale:
        "Most recent pathology (liver biopsy, February 2025) gives ER 90%, PR 10% and HER2 IHC 1+ with ISH not amplified, so ER, PR and HER2 are all known.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: S_PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: S_PATH },
      ],
    },
    {
      id: "NCT06533826-inc-3",
      status: "pass",
      rationale:
        "HER2-low in every sample: IHC 1+ on the 2019 primary and IHC 1+/ISH not amplified on the 2025 liver metastasis; never HER2-positive.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: S_PATH },
        { quote: "ER 95% strong, PR 60%, HER2 IHC 1+ (negative)", source: S_PRIOR },
      ],
    },
    {
      id: "NCT06533826-inc-4",
      status: "pass",
      rationale: "HR-positive cohort (ER 90%, PR 10% on the liver biopsy), and the most recent HER2 result is HER2-low (IHC 1+, ISH not amplified).",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: S_PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)", source: S_PATH },
      ],
    },
    {
      id: "NCT06533826-inc-5",
      status: "pass",
      rationale: "Measurable by RECIST 1.1: segment VI liver metastasis 3.2 cm (also segment IV 1.8 cm) on CT 2026-08-14.",
      evidence: [{ quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: S_CT }],
    },
    {
      id: "NCT06533826-inc-6",
      status: "pass",
      confidence: "low",
      rationale:
        "Willingness is confirmed at screening; her liver metastases have already been biopsied safely (segment VI core, February 2025), so tumor is accessible.",
      evidence: [{ quote: "Specimen: Liver, segment VI, core needle biopsy", source: S_PATH }],
      actionNeeded: "Confirm willingness to undergo serial research biopsies (baseline, week 3, progression)",
    },
    {
      id: "NCT06533826-inc-7",
      status: "pass",
      rationale:
        "She recurred on adjuvant anastrozole and received one metastatic endocrine line (letrozole + palbociclib, March 2025 to August 2026), which also covers the prior CDK4/6 inhibitor requirement.",
      evidence: [
        { quote: "then adj anastrozole 12/2019 until recurrence", source: S_NOTE },
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: S_NOTE },
      ],
    },
    {
      id: "NCT06533826-inc-8",
      status: "pass",
      rationale:
        "Her only chemotherapy was adjuvant ddAC-T, completed September 2019: none in the metastatic setting and no topoisomerase I inhibitor (doxorubicin targets topoisomerase II). No residual chemotherapy toxicity recorded.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-9",
      status: "pass",
      rationale:
        "No chemotherapy lines and one endocrine-based line (letrozole + palbociclib) in the metastatic setting, within the 0–1 prior lines allowed for the ADC1 T-DXd cohort.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-10",
      status: "pass",
      rationale:
        "No chemotherapy lines and one endocrine-based line (letrozole + palbociclib) in the metastatic setting, within the 0–1 prior lines allowed for the ADC1 Dato-DXd cohort.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-11",
      status: "not-applicable",
      rationale: "ADC2 (second-ADC) cohort requiring progression on Dato-DXd as the most recent therapy; she has had no ADC and would enter an ADC1 cohort.",
    },
    {
      id: "NCT06533826-inc-12",
      status: "not-applicable",
      rationale: "ADC2 (second-ADC) cohort requiring progression on T-DXd as the most recent therapy; she has had no ADC and would enter an ADC1 cohort.",
    },
    {
      id: "NCT06533826-inc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "Palbociclib stopped 2026-08-20, 39 days before today (≥14 days required); ANC recovered to 2.8, Hgb 11.2 is grade 1 and fatigue is grade 1. The A/P line 'continue letrozole/palbociclib' is a stale copy-forward.",
      evidence: [
        { quote: "Palbo/letrozole stopped 8/20/26.", source: S_NOTE },
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS },
      ],
      actionNeeded: "Confirm 2026-08-20 as the last dose of palbociclib",
    },
    {
      id: "NCT06533826-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent in her treatment history, so no washout is needed.",
    },
    {
      id: "NCT06533826-inc-15",
      status: "pass",
      rationale: "Her only radiation was adjuvant whole-breast RT in October–November 2019, long completed with no recorded toxicity.",
      evidence: [{ quote: "whole breast RT 10-11/2019", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases (asymptomatic, never imaged), so the treated-CNS-metastasis conditions do not need to be met.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-17",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known active brain or leptomeningeal disease and she is neurologically asymptomatic; even asymptomatic lesions found at screening could be allowed if no immediate CNS therapy or steroids are needed.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-18",
      status: "pass",
      rationale: "She receives denosumab 120 mg every 4 weeks for bone metastases, which may continue on study.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: S_MEDS }],
    },
    {
      id: "NCT06533826-inc-19",
      status: "pass",
      rationale: "She is 58 years old (born 1968).",
      evidence: [{ quote: "DOB: 1968 (58 yo F)", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-20",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit; she still does her own shopping and housework.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-21",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Labs 2026-09-15 meet every listed threshold (ANC 2.8, platelets 210, Hgb 11.2, bilirubin 0.6, AST 34/ALT 41, creatinine 0.8), but INR/PT/aPTT are not documented and the panel will be over 2 weeks old at treatment start.",
      evidence: [
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS },
      ],
      actionNeeded: "Repeat CBC and chemistry within 2 weeks of starting and add INR/PT/aPTT (≤ 1.5 × ULN)",
    },
    {
      id: "NCT06533826-inc-22",
      status: "pass",
      confidence: "medium",
      rationale:
        "Toxicities from letrozole + palbociclib are at most grade 1: Hgb 11.2 and fatigue with her own shopping and housework intact; ANC has recovered to 2.8.",
      evidence: [{ quote: "Since then moderate fatigue (still does own shopping/housework)", source: S_NOTE }],
      actionNeeded: "Grade fatigue at screening; must be grade ≤1 or baseline",
    },
    {
      id: "NCT06533826-inc-23",
      status: "unknown",
      confidence: "low",
      rationale:
        "Her only LVEF is 62% from the pre-anthracycline echocardiogram in 2019, about 7 years old and before doxorubicin; a current baseline is needed if she is assigned to T-DXd.",
      evidence: [{ quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%).", source: S_NOTE }],
      actionNeeded: "Obtain echocardiogram before registration; LVEF ≥ 50% required for the T-DXd cohorts",
    },
    {
      id: "NCT06533826-inc-24",
      status: "not-applicable",
      rationale: "She is postmenopausal (natural menopause at about 51, far beyond 12 months of amenorrhea), so she is not of childbearing potential.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
    {
      id: "NCT06533826-inc-25",
      status: "not-applicable",
      rationale: "Not of childbearing potential (natural menopause at about 51), so the contraception requirement does not apply.",
    },
    {
      id: "NCT06533826-inc-26",
      status: "not-applicable",
      rationale: "Applies to male participants only.",
    },
    {
      id: "NCT06533826-inc-27",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and written consent are confirmed at screening; she has said she is interested in trials.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: S_NOTE }],
    },
    // ----- Exclusion -----
    {
      id: "NCT06533826-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No concurrent investigational agent; letrozole + palbociclib stopped 2026-08-20, and denosumab is supportive care.",
    },
    {
      id: "NCT06533826-exc-2",
      status: "pass",
      rationale:
        "No topoisomerase I agent in any setting: adjuvant doxorubicin (a topoisomerase II inhibitor), cyclophosphamide and paclitaxel, then endocrine therapy and palbociclib; no irinotecan, sacituzumab govitecan or deruxtecan ADC.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: S_NOTE }],
    },
    {
      id: "NCT06533826-exc-3",
      status: "pass",
      confidence: "low",
      rationale: "Vaccination history is not recorded and no live vaccine is mentioned; to be confirmed at screening.",
      actionNeeded: "Confirm no live attenuated vaccine within 30 days before the first dose",
    },
    {
      id: "NCT06533826-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal disease in her history and no visual changes reported.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: S_NOTE }],
      actionNeeded: "Confirm no corneal disease with a baseline eye exam (keratitis risk with Dato-DXd)",
    },
    {
      id: "NCT06533826-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "She has never received T-DXd or Dato-DXd; her only documented allergy is sulfa (rash).",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)" }],
    },
    {
      id: "NCT06533826-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No reaction to monoclonal antibodies recorded; she is tolerating monthly denosumab, and her only allergy is sulfa.",
      evidence: [{ quote: "Tolerating denosumab, no dental isues.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No surgery since port removal in 2020.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled intercurrent illness: hypertension controlled (BP 132/78), afebrile, and no psychiatric or social barrier recorded.",
      evidence: [{ quote: "HTN - amlodipine, controlled.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-exc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "No pneumonitis or ILD history; CT 2026-08-14 reports no pulmonary abnormality and lungs are clear. The screening CT must again exclude ILD before an ADC.",
      evidence: [
        { quote: "No new pulmonary nodules. No adenopathy.", source: S_CT },
        { quote: "Lungs CTA.", source: S_NOTE },
      ],
    },
    {
      id: "NCT06533826-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "No pulmonary disorder, pleural effusion, recent PE or connective tissue disease recorded; never smoker with clear lungs and no pulmonary findings on CT 2026-08-14.",
      evidence: [
        { quote: "never smoker", source: S_NOTE },
        { quote: "No new pulmonary nodules. No adenopathy.", source: S_CT },
      ],
    },
    {
      id: "NCT06533826-exc-11",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG or QTc is documented in the record.",
      actionNeeded: "Obtain a 12-lead ECG; QTcF must be ≤ 470 ms",
    },
    {
      id: "NCT06533826-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No CABG, stent, MI, angina, heart failure or stroke recorded; her only cardiovascular diagnosis is controlled hypertension.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No second malignancy is recorded; her 2019 germline panel was negative.",
      evidence: [{ quote: "Germline panel 2019 negative.", source: S_NOTE }],
    },
    {
      id: "NCT06533826-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No HIV infection is recorded in her history or medication list.",
    },
    {
      id: "NCT06533826-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No known hepatitis B or C; liver tests normal on 2026-09-15 (AST 34, ALT 41, bilirubin 0.6).",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS }],
      actionNeeded: "Confirm hepatitis B/C status (not documented) per local practice",
    },
    {
      id: "NCT06533826-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection: afebrile, lungs clear and no pulmonary findings on CT 2026-08-14. Tuberculosis testing is not documented.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
      actionNeeded: "Complete tuberculosis screening per local practice",
    },
    {
      id: "NCT06533826-exc-17",
      status: "pass",
      confidence: "low",
      rationale: "No confounding condition, therapy or lab abnormality is identified in the record; the final judgment rests with the investigator.",
    },
    {
      id: "NCT06533826-exc-18",
      status: "not-applicable",
      rationale: "Not applicable: she is postmenopausal (natural menopause at about 51, now 58).",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
  ],
);
