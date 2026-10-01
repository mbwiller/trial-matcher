import { demoMatch } from "../../match-helpers";

const S_NOTE = "Oncology note 2026-09-18";
const S_PATH = "Liver biopsy pathology 2025-02-19";
const S_NGS = "Tissue NGS 2025-03-10";
const S_CT = "CT C/A/P 2026-08-14";
const S_LABS = "Labs 2026-09-15";
const S_MEDS = "Medication list";

export default demoMatch(
  "NCT04802759",
  "Fits Cohort 1 (post-CDK4/6i) · HbA1c, ECG and HIV/hepatitis serology not on file",
  "She fits Cohort 1: ER+/HER2-low (HER2-negative for this purpose) metastatic disease that progressed in the liver on first-line letrozole + palbociclib after ~17 months, with measurable disease, ECOG 1, adequate labs and no chemotherapy for metastatic disease; Cohort 2 (HER2-positive) and Cohort 3 (first-line, adjuvant endocrine relapse) criteria are not applied. Her PIK3CA H1047R makes the giredestrant + inavolisib arm the most relevant, but HbA1c is needed (fasting glucose 104 mg/dL), and starting capivasertib or alpelisib first would close the PI3K/AKT arms. Open screening items: HbA1c, ECG, HIV and hepatitis B/C serology, and central ESR1 testing if the ESR1m-enriched arm is considered.",
  [
    // ----- Cohort 1 inclusion (the cohort she would enter) -----
    {
      id: "NCT04802759-inc-1",
      status: "pass",
      rationale:
        "Cohort 1 is ER+/HER2-negative disease progressing after a CDK4/6 inhibitor in the first or second line; she has ER+/HER2-low disease that progressed on first-line letrozole + palbociclib, so she is screened as a Cohort 1, Stage 1 candidate.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-inc-2",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit; moderate fatigue but she still does her own shopping and housework.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-inc-3",
      status: "pass",
      rationale: "ER positive in 90% of tumor cells, strong intensity, on the February 2025 liver biopsy (95% on the 2019 primary).",
      evidence: [{ quote: "ER: positive, 90% of tumor cells, strong intensity", source: S_PATH }],
    },
    {
      id: "NCT04802759-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Her oncologist's second-line plan is endocrine-based (capivasertib or alpelisib with fulvestrant, or a trial); liver-dominant disease with normal bilirubin (0.6) and transaminases is not a visceral crisis calling for chemotherapy.",
      evidence: [
        { quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: S_NOTE },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS },
      ],
    },
    {
      id: "NCT04802759-inc-5",
      status: "pass",
      rationale:
        "CT 2026-08-14 shows progression of liver metastases on letrozole + palbociclib, her most recent systemic therapy (new 1.8 cm segment IV lesion; segment VI 2.4 → 3.2 cm).",
      evidence: [{ quote: "Interval progression of hepatic metastases", source: S_CT }],
    },
    {
      id: "NCT04802759-inc-6",
      status: "pass",
      rationale:
        "Progressed during first-line letrozole + palbociclib for metastatic disease, given March 2025 to August 2026 (~17 months, far beyond the 8-week CDK4/6i minimum).",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: S_NOTE },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-inc-7",
      status: "pass",
      rationale: "Postmenopausal: natural menopause at about age 51; she is now 58.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
    {
      id: "NCT04802759-inc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "Life expectancy is not stated, but ECOG 1, liver-dominant disease with preserved liver function and stable bone disease make survival of at least 3 months very likely.",
      evidence: [{ quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: S_NOTE }],
    },
    {
      id: "NCT04802759-inc-9",
      status: "pass",
      confidence: "medium",
      rationale:
        "A metastatic liver core biopsy (collected 2025-02-19) exists and supported NGS, but whether enough archival tissue remains for central testing is not documented; the liver lesions are accessible if a fresh biopsy is needed.",
      evidence: [{ quote: "Collected: 2025-02-19 | Reported: 2025-02-24", source: S_PATH }],
      actionNeeded: "Confirm the 2025-02-19 liver core block is available with enough tissue for central testing; otherwise plan a fresh biopsy",
    },
    {
      id: "NCT04802759-inc-10",
      status: "pass",
      rationale: "Permissive item; she has not received fulvestrant (her only metastatic-line therapy was letrozole + palbociclib).",
    },
    {
      id: "NCT04802759-inc-11",
      status: "pass",
      rationale: "Measurable by RECIST 1.1: segment VI liver metastasis 3.2 cm (also segment IV 1.8 cm) on CT 2026-08-14.",
      evidence: [{ quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: S_CT }],
    },
    {
      id: "NCT04802759-inc-12",
      status: "pass",
      rationale:
        "Labs 2026-09-15 (13 days old): ANC 2.8, platelets 210, Hgb 11.2, creatinine 0.8 (CrCl ≈86 mL/min), AST 34, ALT 41, bilirubin 0.6 — all within standard limits.",
      evidence: [
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS },
      ],
      actionNeeded: "Repeat CBC and chemistry within the protocol screening window",
    },
    {
      id: "NCT04802759-inc-13",
      status: "not-applicable",
      rationale: "She is not on anticoagulation; no anticoagulant appears on the current medication list.",
    },
    // ----- Cohort 2 inclusion (HER2-positive) -----
    {
      id: "NCT04802759-inc-14",
      status: "not-applicable",
      rationale:
        "Heading for Cohort 2 (ER+/HER2-positive); she has HER2-low disease (IHC 1+, ISH not amplified) and is screened for Cohort 1.",
    },
    {
      id: "NCT04802759-inc-15",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; her ECOG 1 is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-16",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; her biopsy-proven metastatic breast adenocarcinoma is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-17",
      status: "not-applicable",
      rationale:
        "Defines Cohort 2 membership (ER+/HER2-positive). Her tumor is HER2-low (IHC 1+, HER2/CEP17 ratio 1.2), so she enters Cohort 1 instead; not counted against her.",
      evidence: [{ quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)", source: S_PATH }],
    },
    {
      id: "NCT04802759-inc-18",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; she is naturally postmenopausal in any case.",
    },
    {
      id: "NCT04802759-inc-19",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; life expectancy is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-20",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; tumor specimen availability is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-21",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; she has had no fulvestrant or other SERD in any case.",
    },
    {
      id: "NCT04802759-inc-22",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; her measurable liver disease is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-23",
      status: "not-applicable",
      rationale:
        "The LVEF requirement applies to Cohort 2 (HER2-positive) only. For reference, her last echocardiogram was pre-anthracycline in 2019 (LVEF 62%).",
      evidence: [{ quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%).", source: S_NOTE }],
    },
    {
      id: "NCT04802759-inc-24",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; her organ function is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-25",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; she is not anticoagulated in any case.",
    },
    // ----- Stage 2 inclusion -----
    {
      id: "NCT04802759-inc-26",
      status: "not-applicable",
      rationale: "Heading for Stage 2 (a second treatment after leaving a Stage 1 arm); it applies only after Stage 1 treatment ends, not at study entry.",
    },
    {
      id: "NCT04802759-inc-27",
      status: "not-applicable",
      rationale: "Stage 2 crossover criterion; relevant only after toxicity, progression or loss of benefit on a Stage 1 arm.",
    },
    {
      id: "NCT04802759-inc-28",
      status: "not-applicable",
      rationale: "Stage 2 crossover criterion requiring a biopsy at the end of Stage 1; not applicable at initial enrollment.",
    },
    // ----- Cohort 3 inclusion (first-line, adjuvant endocrine resistance) -----
    {
      id: "NCT04802759-inc-29",
      status: "not-applicable",
      rationale:
        "Applies to Cohort 3 only (first-line PIK3CA-mutant disease with adjuvant endocrine resistance); she has since received first-line letrozole + palbociclib and is screened for Cohort 1.",
    },
    {
      id: "NCT04802759-inc-30",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; she is screened for Cohort 1, where her ECOG 1 satisfies the same requirement.",
    },
    {
      id: "NCT04802759-inc-31",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; her ER-positive status (90%) is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-32",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; the same endocrine-therapy requirement is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-33",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; her biopsy-proven metastatic breast adenocarcinoma is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-34",
      status: "not-applicable",
      rationale:
        "Applies to Cohort 3 only. She did relapse on adjuvant anastrozole (February 2025), but has since had first-line letrozole + palbociclib for metastatic disease, so Cohort 1 rather than this first-line cohort fits.",
      evidence: [{ quote: "then adj anastrozole 12/2019 until recurrence", source: S_NOTE }],
    },
    {
      id: "NCT04802759-inc-35",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; she is naturally postmenopausal in any case.",
    },
    {
      id: "NCT04802759-inc-36",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only (life expectancy ≥6 months); the Cohort 1 threshold of ≥3 months is assessed separately.",
    },
    {
      id: "NCT04802759-inc-37",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; her organ function is assessed under Cohort 1.",
    },
    {
      id: "NCT04802759-inc-38",
      status: "not-applicable",
      rationale:
        "Applies to Cohort 3 only. Her PIK3CA H1047R on tissue NGS (March 2025) is relevant to the Cohort 1 inavolisib arm instead.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: S_NGS }],
    },
    // ----- General exclusions, Stage 1, Cohorts 1 and 2 -----
    {
      id: "NCT04802759-exc-1",
      status: "pass",
      rationale: "Heading for the general Stage 1 exclusions that apply to her as a Cohort 1 candidate; each listed exclusion is assessed separately.",
    },
    {
      id: "NCT04802759-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "Prior palbociclib is expected in Cohort 1 (CDK4/6i progression is required) and palbociclib is a study drug only in a Cohort 2 arm; she has had no giredestrant, abemaciclib, ribociclib, ipatasertib, inavolisib, everolimus, samuraciclib or atezolizumab.",
      evidence: [{ quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: S_NOTE }],
      actionNeeded: "Confirm with the sponsor that prior palbociclib is acceptable for the assigned Cohort 1 arm",
    },
    {
      id: "NCT04802759-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational therapy is recorded; her only cancer treatments since 2025 are letrozole + palbociclib and denosumab.",
    },
    {
      id: "NCT04802759-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole + palbociclib were stopped 2026-08-20 for progression, 39 days before today — beyond 2 weeks and 5 half-lives. The A/P line 'continue letrozole/palbociclib' is a stale copy-forward that contradicts the interval history and medication list.",
      evidence: [
        { quote: "Palbo/letrozole stopped 8/20/26.", source: S_NOTE },
        { quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: S_MEDS },
      ],
      actionNeeded: "Confirm 2026-08-20 as the last dose of palbociclib/letrozole with the patient and pharmacy",
    },
    {
      id: "NCT04802759-exc-5",
      status: "pass",
      rationale:
        "Current medications (denosumab, oxycodone, amlodipine, atorvastatin, calcium/vitamin D) include no strong CYP3A4 inhibitor or inducer; oxycodone, amlodipine and atorvastatin are CYP3A4 substrates to review for interactions.",
      evidence: [
        { quote: "oxycodone 5 mg PO BID prn pain", source: S_MEDS },
        { quote: "atorvastatin 20 mg PO nightly", source: S_MEDS },
      ],
    },
    {
      id: "NCT04802759-exc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "After palbociclib she has ANC 2.8 and Hgb 11.2 (grade 1 anemia); fatigue is called moderate but she still does her own shopping and housework, consistent with grade 1. No other residual toxicity is recorded.",
      evidence: [
        { quote: "Since then moderate fatigue (still does own shopping/housework)", source: S_NOTE },
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS },
      ],
      actionNeeded: "Grade fatigue at screening; must be grade ≤1",
    },
    {
      id: "NCT04802759-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "She qualifies for experimental Cohort 1 arms (including the PIK3CA-directed inavolisib arm), so she is not limited to the control arm.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: S_NGS }],
    },
    {
      id: "NCT04802759-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No allogeneic stem cell or solid organ transplant appears in her medical or surgical history.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Surgical history ends with port removal in 2020; the 2025 liver biopsy was diagnostic and no surgery is planned.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy is recorded in her history; her 2019 germline panel was negative.",
      evidence: [{ quote: "Germline panel 2019 negative.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "CT 2026-08-14 reports liver and bone findings only, with no effusion or ascites described; the abdomen is soft on exam and no drainage procedures are recorded.",
      evidence: [{ quote: "Abd soft, mild RUQ fullness, nontender.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-12",
      status: "pass",
      rationale: "Low back pain from bone metastases is controlled on oxycodone 5 mg BID as needed.",
      evidence: [
        { quote: "low back pain controlled on oxycodone 5 mg BID prn", source: S_NOTE },
        { quote: "Pain controlled.", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-exc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "No hypercalcemia symptoms (no nausea/vomiting, neuro exam nonfocal) and she is on denosumab, but serum calcium is not on the 2026-09-15 panel.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: S_NOTE }],
      actionNeeded: "Add serum calcium (albumin-corrected) to screening labs",
    },
    {
      id: "NCT04802759-exc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known CNS metastases and no neurological symptoms; brain imaging has never been performed, so CNS status rests on clinical assessment.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: S_NOTE }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging",
    },
    {
      id: "NCT04802759-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease in her history; she is neurologically asymptomatic with a nonfocal exam.",
      evidence: [{ quote: "Neuro grossly nonfocal.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis history or active infection recorded; afebrile, lungs clear, and no pulmonary findings on CT 2026-08-14.",
      evidence: [
        { quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE },
        { quote: "No new pulmonary nodules. No adenopathy.", source: S_CT },
      ],
    },
    {
      id: "NCT04802759-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No infection in the past 4 weeks is recorded; she was afebrile at the 2026-09-18 visit.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No antibiotics on the current medication list and no recent infection documented.",
    },
    {
      id: "NCT04802759-exc-19",
      status: "pass",
      confidence: "medium",
      rationale:
        "No history of pneumonitis or pulmonary fibrosis; CT 2026-08-14 reports no pulmonary abnormality and lungs are clear on exam. The screening chest CT will reconfirm.",
      evidence: [
        { quote: "No new pulmonary nodules. No adenopathy.", source: S_CT },
        { quote: "Lungs CTA.", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-exc-20",
      status: "pass",
      confidence: "medium",
      rationale:
        "Problem list has controlled hypertension and hyperlipidemia only; no heart failure, arrhythmia or coronary disease. She had doxorubicin in 2019 and no echocardiogram since the pre-AC study (LVEF 62%).",
      evidence: [
        { quote: "HTN - amlodipine, controlled.", source: S_NOTE },
        { quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%).", source: S_NOTE },
      ],
      actionNeeded: "Consider an echocardiogram to document post-anthracycline LVEF",
    },
    {
      id: "NCT04802759-exc-21",
      status: "unknown",
      confidence: "low",
      rationale: "HIV status is not documented anywhere in the record.",
      actionNeeded: "Obtain an HIV test at screening; a positive result excludes",
    },
    {
      id: "NCT04802759-exc-22",
      status: "unknown",
      confidence: "low",
      rationale: "Hepatitis B and C serologies are not documented; transaminases are normal (AST 34, ALT 41) with bilirubin 0.6 on 2026-09-15.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: S_LABS }],
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody (HCV RNA if positive); active HBV or HCV excludes",
    },
    {
      id: "NCT04802759-exc-23",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease, chronic diarrhea or upper GI surgery in her history; she took oral palbociclib and letrozole for ~17 months.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-24",
      status: "pass",
      confidence: "medium",
      rationale:
        "Her only documented allergy is sulfa (rash); she has not received the study drugs except palbociclib, which she tolerated for ~17 months.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)" }],
    },
    {
      id: "NCT04802759-exc-25",
      status: "pass",
      rationale: "HER2 IHC 1+ with ISH not amplified on the 2025 liver biopsy and IHC 1+ on the 2019 primary: HER2-low, never HER2-positive.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: S_PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)", source: S_PATH },
      ],
    },
    {
      id: "NCT04802759-exc-26",
      status: "pass",
      rationale: "No hormone replacement therapy on the medication list; natural menopause at about 51.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-27",
      status: "pass",
      rationale: "Her only chemotherapy was adjuvant ddAC-T in 2019; no chemotherapy has been given for metastatic disease.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-28",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; she has no dyspnea or oxygen requirement in any case.",
    },
    {
      id: "NCT04802759-exc-29",
      status: "not-applicable",
      rationale: "Applies to Cohort 2 (HER2-positive) only; she is not on corticosteroids in any case.",
    },
    // ----- Giredestrant + abemaciclib (± atezolizumab) arms, Cohort 1 -----
    {
      id: "NCT04802759-exc-30",
      status: "pass",
      rationale: "Heading for the giredestrant + abemaciclib (± atezolizumab) arm exclusions; this Cohort 1 arm is open to her and its items are assessed below.",
    },
    {
      id: "NCT04802759-exc-31",
      status: "pass",
      confidence: "medium",
      rationale: "No interstitial lung disease, dyspnea or oxygen use; lungs clear on exam and no pulmonary findings on CT 2026-08-14.",
      evidence: [{ quote: "Lungs CTA.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-32",
      status: "pass",
      confidence: "medium",
      rationale: "No gastric or small-bowel resection and no chronic diarrhea recorded.",
      evidence: [{ quote: "PSH: as above. Port 2019, removed 2020.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-33",
      status: "pass",
      confidence: "medium",
      rationale: "No syncope, ventricular arrhythmia or cardiac arrest in her history; HR 76 at the 2026-09-18 visit.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE }],
    },
    // ----- Giredestrant + ipatasertib arm, Cohort 1 -----
    {
      id: "NCT04802759-exc-34",
      status: "pass",
      rationale: "Heading for the giredestrant + ipatasertib arm exclusions; this Cohort 1 arm is open to her and its items are assessed below.",
    },
    {
      id: "NCT04802759-exc-35",
      status: "pass",
      rationale:
        "No prior AKT inhibitor; capivasertib was discussed as a second-line option but has not been started (starting it before enrollment would trigger this exclusion).",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-36",
      status: "pass",
      confidence: "medium",
      rationale: "No swallowing difficulty or malabsorption; she took oral letrozole and palbociclib for ~17 months.",
    },
    {
      id: "NCT04802759-exc-37",
      status: "pass",
      confidence: "medium",
      rationale: "Hyperlipidemia is treated with atorvastatin; no lipid values are in the record, but grade ≥2 levels on a statin would be unusual.",
      evidence: [{ quote: "HLD - atorvastatin.", source: S_NOTE }],
      actionNeeded: "Obtain a fasting lipid panel; cholesterol or triglycerides > 300 mg/dL would be grade ≥2",
    },
    {
      id: "NCT04802759-exc-38",
      status: "pass",
      rationale: "Diabetes is explicitly absent from her history ('No DM').",
      evidence: [{ quote: "No DM.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-39",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG is documented in the record.",
      actionNeeded: "Obtain a baseline 12-lead ECG; a clinically significant abnormality excludes from the ipatasertib arm",
    },
    // ----- Giredestrant + inavolisib arms, Cohort 1 -----
    {
      id: "NCT04802759-exc-40",
      status: "pass",
      rationale:
        "Heading for the giredestrant + inavolisib arm exclusions; her PIK3CA H1047R makes this Cohort 1 arm the most relevant, and its items are assessed below.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: S_NGS }],
    },
    {
      id: "NCT04802759-exc-41",
      status: "pass",
      rationale: "No prior PI3K, AKT or mTOR pathway inhibitor; alpelisib and capivasertib have only been discussed as next-line options.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-42",
      status: "pass",
      rationale: "No diabetes of either type ('No DM'), no glucose-lowering medication, and fasting glucose 104 mg/dL on 2026-09-15.",
      evidence: [
        { quote: "No DM.", source: S_NOTE },
        { quote: "Glucose (fasting) 104 (H)", source: S_LABS },
      ],
    },
    {
      id: "NCT04802759-exc-43",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Fasting glucose is 104 mg/dL (below 126) on 2026-09-15, but HbA1c has never been measured; with glucose in the prediabetic range an HbA1c ≥5.7% is plausible, and the oncologist plans it before any PI3K/AKT inhibitor.",
      evidence: [
        { quote: "Glucose (fasting) 104 (H)", source: S_LABS },
        { quote: "A1c not on file, will add to next draw", source: S_NOTE },
      ],
      actionNeeded: "Obtain HbA1c; must be < 5.7% (< 6.4% for the ESR1m-enriched arm), with fasting glucose < 126 mg/dL",
    },
    {
      id: "NCT04802759-exc-44",
      status: "pass",
      confidence: "medium",
      rationale: "No ocular history is recorded and she reports no visual changes.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: S_NOTE }],
      actionNeeded: "Confirm at screening that no eye condition needs intervention",
    },
    {
      id: "NCT04802759-exc-45",
      status: "pass",
      confidence: "medium",
      rationale: "No uveitis or eye inflammation or infection in her history, and no visual symptoms reported.",
    },
    {
      id: "NCT04802759-exc-46",
      status: "pass",
      confidence: "medium",
      rationale: "No symptomatic lung disease: lungs clear on exam, no pulmonary abnormality on CT 2026-08-14, and she has never smoked.",
      evidence: [
        { quote: "Lungs CTA.", source: S_NOTE },
        { quote: "never smoker", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-exc-47",
      status: "pass",
      rationale: "PIK3CA p.H1047R (VAF 31%) on local tissue NGS of the liver metastasis, reported 2025-03-10 — a protocol-eligible hotspot mutation.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: S_NGS }],
    },
    {
      id: "NCT04802759-exc-48",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Matters only if the ESR1m-enriched arm is considered: her only ESR1 result is wild-type on March 2025 tissue, before ~17 months of aromatase inhibitor, and a pre-existing no-mutation result is not accepted for this arm.",
      evidence: [{ quote: "ESR1: no alterations detected (wild-type)", source: S_NGS }],
      actionNeeded: "If the ESR1m-enriched arm is considered, submit blood for central ESR1 ctDNA testing",
    },
    // ----- Giredestrant + ribociclib arm, Cohort 1 -----
    {
      id: "NCT04802759-exc-49",
      status: "pass",
      rationale: "Heading for the giredestrant + ribociclib arm exclusions; this Cohort 1 arm is open to her and its items are assessed below.",
    },
    {
      id: "NCT04802759-exc-50",
      status: "pass",
      rationale: "No systemic corticosteroids on the current medication list.",
    },
    {
      id: "NCT04802759-exc-51",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disease or impaired absorption recorded; she tolerated oral letrozole + palbociclib for ~17 months.",
    },
    // ----- Giredestrant + samuraciclib arm, Cohort 1 -----
    {
      id: "NCT04802759-exc-52",
      status: "pass",
      rationale: "Heading for the giredestrant + samuraciclib arm exclusions; this Cohort 1 arm is open to her and its items are assessed below.",
    },
    {
      id: "NCT04802759-exc-53",
      status: "pass",
      confidence: "medium",
      rationale: "No prior mTOR inhibitor such as everolimus; metastatic therapy to date is letrozole + palbociclib only.",
      evidence: [{ quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-54",
      status: "pass",
      rationale: "No systemic corticosteroids at any dose on the current medication list.",
    },
    {
      id: "NCT04802759-exc-55",
      status: "pass",
      confidence: "medium",
      rationale: "No bleeding disorder in her history; platelets 210 on 2026-09-15 and no anticoagulants.",
      evidence: [{ quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS }],
    },
    {
      id: "NCT04802759-exc-56",
      status: "pass",
      confidence: "medium",
      rationale: "No hemolytic anemia or marrow aplasia recorded; mild anemia (Hgb 11.2) with normal ANC 2.8 and platelets 210 after palbociclib.",
      evidence: [{ quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: S_LABS }],
    },
    {
      id: "NCT04802759-exc-57",
      status: "pass",
      confidence: "low",
      rationale: "Vaccination history is not recorded and no live vaccine is mentioned; to be confirmed at screening.",
      actionNeeded: "Confirm no live-virus vaccine within 28 days of planned treatment start",
    },
    // ----- Giredestrant + atezolizumab-containing arms, Cohort 1 -----
    {
      id: "NCT04802759-exc-58",
      status: "pass",
      rationale: "Heading for the giredestrant + atezolizumab-containing arm exclusions; these Cohort 1 arms are open to her and their items are assessed below.",
    },
    {
      id: "NCT04802759-exc-59",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease or immune deficiency on her problem list (hypertension, hyperlipidemia, osteopenia).",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: S_NOTE }],
    },
    {
      id: "NCT04802759-exc-60",
      status: "pass",
      confidence: "medium",
      rationale: "No myocardial infarction, stroke, heart failure or arrhythmia recorded; hypertension controlled at 132/78 on amlodipine.",
      evidence: [
        { quote: "BP 132/78 HR 76 afebrile.", source: S_NOTE },
        { quote: "HTN - amlodipine, controlled.", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-exc-61",
      status: "pass",
      confidence: "low",
      rationale: "Vaccination history is not recorded and no live attenuated vaccine is mentioned; to be confirmed at screening.",
      actionNeeded: "Confirm no live attenuated vaccine in the 4 weeks before treatment; none during atezolizumab or for 5 months after",
    },
    {
      id: "NCT04802759-exc-62",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic immunostimulatory agents (e.g., interferon, IL-2) in her treatment history or medication list.",
    },
    {
      id: "NCT04802759-exc-63",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic immunosuppressive medication or corticosteroid on the current medication list, and none anticipated.",
    },
    {
      id: "NCT04802759-exc-64",
      status: "pass",
      confidence: "medium",
      rationale: "Only documented allergy is sulfa (rash); no antibody reactions recorded, and she is tolerating monthly denosumab.",
      evidence: [
        { quote: "ALLERGIES: sulfa (rash)" },
        { quote: "Tolerating denosumab, no dental isues.", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-exc-65",
      status: "pass",
      confidence: "medium",
      rationale: "No known hypersensitivity; she has tolerated denosumab, a recombinant human antibody produced in CHO cells, every 4 weeks since March 2025.",
      evidence: [
        { quote: "denosumab 120 mg SC q4 weeks", source: S_MEDS },
        { quote: "Tolerating denosumab, no dental isues.", source: S_NOTE },
      ],
    },
    {
      id: "NCT04802759-exc-66",
      status: "pass",
      confidence: "medium",
      rationale: "No immune checkpoint inhibitor or CD137 agonist in her treatment history (adjuvant ddAC-T, anastrozole, then letrozole + palbociclib).",
    },
    {
      id: "NCT04802759-exc-67",
      status: "not-applicable",
      rationale: "Not applicable: she is postmenopausal (natural menopause at about 51, now 58).",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: S_NOTE }],
    },
    // ----- Cohort 2 arm-specific exclusions -----
    {
      id: "NCT04802759-exc-68",
      status: "not-applicable",
      rationale: "Heading for a Cohort 2 (HER2-positive) arm, giredestrant + PH FDC SC + abemaciclib; she is screened for Cohort 1.",
    },
    {
      id: "NCT04802759-exc-69",
      status: "not-applicable",
      rationale: "Applies to the Cohort 2 giredestrant + PH FDC SC + abemaciclib arm only; she has no ILD or dyspnea in any case.",
    },
    {
      id: "NCT04802759-exc-70",
      status: "not-applicable",
      rationale: "Applies to the Cohort 2 giredestrant + PH FDC SC + abemaciclib arm only; no GI resection or diarrhea is recorded in any case.",
    },
    {
      id: "NCT04802759-exc-71",
      status: "not-applicable",
      rationale: "Applies to the Cohort 2 giredestrant + PH FDC SC + abemaciclib arm only; no syncope or ventricular arrhythmia is recorded in any case.",
    },
    {
      id: "NCT04802759-exc-72",
      status: "not-applicable",
      rationale: "Heading for a Cohort 2 (HER2-positive) arm, giredestrant + PH FDC SC + palbociclib; she is screened for Cohort 1.",
    },
    {
      id: "NCT04802759-exc-73",
      status: "not-applicable",
      rationale: "Applies to the Cohort 2 giredestrant + PH FDC SC + palbociclib arm only; no GI resection, diarrhea or malabsorption is recorded in any case.",
    },
    {
      id: "NCT04802759-exc-74",
      status: "not-applicable",
      rationale: "Applies to the Cohort 2 giredestrant + PH FDC SC + palbociclib arm only; no ILD or dyspnea is recorded in any case.",
    },
    // ----- Cohort 3 exclusions -----
    {
      id: "NCT04802759-exc-75",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; her HER2-low status is assessed under the Cohort 1 HER2 exclusion.",
    },
    {
      id: "NCT04802759-exc-76",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; she has had no fulvestrant or other SERD in any case.",
    },
    {
      id: "NCT04802759-exc-77",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; the equivalent PI3K/AKT/mTOR exclusion is assessed for the Cohort 1 inavolisib and ipatasertib arms.",
    },
    {
      id: "NCT04802759-exc-78",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; the investigational-therapy washout is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-79",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; CYP3A4 inhibitors and inducers are assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-80",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; residual toxicity from prior therapy is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-81",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; recent major surgery is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-82",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; second malignancy is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-83",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; effusions and ascites are assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-84",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; her pain control is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-85",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; hypercalcemia is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-86",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; CNS metastases are assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-87",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; leptomeningeal disease is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-88",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; recent severe infection is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-89",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; recent antibiotic use is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-90",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; pneumonitis and pulmonary fibrosis are assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-91",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; cardiac history is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-92",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; HIV status is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-93",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; hepatitis B/C status is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-94",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; GI absorption is assessed under the Cohort 1 general exclusions.",
    },
    {
      id: "NCT04802759-exc-95",
      status: "not-applicable",
      rationale: "Applies to Cohort 3 only; drug hypersensitivity is assessed under the Cohort 1 general exclusions.",
    },
  ],
);
