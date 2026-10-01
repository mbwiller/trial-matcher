import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const CT = "CT CAP + bone scan 2026-05-21";
const LABS = "Labs 2026-09-23";
const MEDS = "Medication list";

const NED = { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: NOTE };
const CT_NEG = { quote: "No evidence of distant metastatic disease.", source: CT };
const MRM = { quote: "R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg -> pT2 pN2a M0, stage IIIA.", source: NOTE };
const NODES = { quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: PATH };
const STAGE = { quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: PATH };
const ECOG = { quote: "EXAM: ECOG 1.", source: NOTE };
const ER = { quote: "ER: positive, 90%, strong intensity", source: PATH };
const PR = { quote: "PR: positive, 5%, weak intensity", source: PATH };
const HER2_IHC = { quote: "HER2 IHC: 2+ (equivocal)", source: PATH };
const HER2_ISH = {
  quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low",
  source: PATH,
};
const MENO = { quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE };
const TC = { quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: MEDS };
const LET = { quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: MEDS };
const PMRT = { quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: NOTE };
const CBC = { quote: "WBC 4.4 | ANC 2.3 | Hgb 11.1 (L) | Plt 201", source: LABS };
const RENAL = { quote: "Cr 1.1 | eGFR 49 (L)", source: LABS };
const LFT = { quote: "AST 22 | ALT 18 | T bili 0.6 | Alk phos 84 | Ca 9.2", source: LABS };
const AF = { quote: "paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", source: NOTE };
const DVT = { quote: "provoked DVT L leg 2019 after L TKA, completed 3 mo anticoagulation", source: NOTE };
const APIX = { quote: "apixaban 5 mg PO BID", source: MEDS };
const ECG_E = { quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" };
const ECHO_E = { quote: "ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", source: "Echo 2026-05-28" };
const SYMPTOMS = { quote: "No bone pain, cough, HA.", source: NOTE };
const LUNGS = { quote: "Lungs clear.", source: NOTE };
const PSH = { quote: "PSH: L TKA 2019. R MRM 5/2026.", source: NOTE };
const SH = { quote: "never smoker, rare EtOH", source: NOTE };
const ALLERGY = { quote: "ALLERGIES: lisinopril (cough)", source: "Allergies" };
const MAMMO = {
  quote: "Screening mammogram 04/02/2026: R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.",
  source: "Mammogram 2026-04-02",
};
const L_BREAST = { quote: "L breast no masses.", source: NOTE };

const NOT_CBP = "Not of childbearing potential (72 years old, postmenopausal since about 50, no HRT)";

export default demoMatch(
  "NCT04553770",
  "Excluded: neoadjuvant study for untreated tumors; she has had mastectomy, TC, letrozole and chest RT",
  "This trial gives neoadjuvant trastuzumab deruxtecan with or without anastrozole before surgery to previously untreated, operable HR+/HER2-low tumors. Helen's biology fits (ER 90%, HER2 IHC 2+/ISH not amplified), but she had mastectomy on 05/12/2026, completed adjuvant docetaxel/cyclophosphamide, started letrozole on 09/08/2026 and is now receiving chest wall radiation, each of which is an exclusion. Nothing can make her eligible; her HER2-low status may matter later for HER2-low-directed therapy if she ever relapses.",
  [
    {
      id: "NCT04553770-inc-1",
      status: "fail",
      rationale:
        "Not previously untreated: the 3.8 cm tumor was removed by mastectomy on 05/12/2026 and she has completed adjuvant TC, so there is no primary tumor left for neoadjuvant treatment.",
      evidence: [MRM, TC],
    },
    {
      id: "NCT04553770-inc-2",
      status: "pass",
      rationale: "Node-positive disease (5 of 18 nodes), but staging CT and bone scan on 05/21/2026 showed no distant metastases.",
      evidence: [NODES, CT_NEG],
    },
    {
      id: "NCT04553770-inc-3",
      status: "pass",
      confidence: "low",
      rationale: "Site location is not stated in the record; she would need to enroll at a participating US center.",
      actionNeeded: "Confirm she can attend a participating US site",
    },
    {
      id: "NCT04553770-inc-4",
      status: "pass",
      rationale: "HER2-low as required: IHC 2+ with ISH not amplified (HER2/CEP17 ratio 1.3, mean copy number 3.4).",
      evidence: [HER2_IHC, HER2_ISH],
    },
    {
      id: "NCT04553770-inc-5",
      status: "pass",
      rationale: "HR-positive with both receptors known: ER 90% strong and PR 5% weak on the 04/14/2026 core biopsy.",
      evidence: [ER, PR],
    },
    {
      id: "NCT04553770-inc-6",
      status: "pass",
      rationale: "ECOG 1 at the 09/25/2026 visit.",
      evidence: [ECOG],
    },
    {
      id: "NCT04553770-inc-7",
      status: "unknown",
      rationale: "LVEF 52% on the 05/28/2026 echo meets ≥ 50% but is about 4 months old, well outside the 28-day window.",
      evidence: [ECHO_E],
      actionNeeded: "Repeat ECHO or MUGA within 28 days of enrollment; LVEF ≥ 50% required",
    },
    {
      id: "NCT04553770-inc-8",
      status: "pass",
      rationale: "Platelets 201 × 10⁹/L on 09/23/2026 without transfusion; would need repeating within 14 days of enrollment.",
      evidence: [CBC],
    },
    {
      id: "NCT04553770-inc-9",
      status: "pass",
      rationale: "Hgb 11.1 g/dL on 09/23/2026 (≥ 9.0), with no transfusion recorded.",
      evidence: [CBC],
    },
    {
      id: "NCT04553770-inc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "ANC 2.3 × 10⁹/L on 09/23/2026. Pegfilgrastim was last given with the final TC cycle (08/19/2026), well over a week ago; the 09/25 'TC C3 today' line is carried forward.",
      evidence: [CBC, TC],
    },
    {
      id: "NCT04553770-inc-11",
      status: "pass",
      rationale: "Creatinine 1.1 mg/dL (eGFR 49); Cockcroft-Gault CrCl is about 50 mL/min (72 y, 68 kg), above the 30 mL/min threshold.",
      evidence: [RENAL],
    },
    {
      id: "NCT04553770-inc-12",
      status: "pass",
      rationale: "AST 22 and ALT 18 U/L on 09/23/2026, within normal limits.",
      evidence: [LFT],
    },
    {
      id: "NCT04553770-inc-13",
      status: "pass",
      rationale: "Total bilirubin 0.6 mg/dL on 09/23/2026, within normal limits.",
      evidence: [LFT],
    },
    {
      id: "NCT04553770-inc-14",
      status: "unknown",
      rationale: "Serum albumin is not reported in the 09/23/2026 labs or elsewhere in the record.",
      actionNeeded: "Obtain serum albumin within 14 days of enrollment; ≥ 2.5 g/dL required",
    },
    {
      id: "NCT04553770-inc-15",
      status: "unknown",
      confidence: "medium",
      rationale: "No coagulation studies on file, and she takes apixaban, which can prolong PT and aPTT.",
      evidence: [APIX],
      actionNeeded: "Obtain INR/PT and aPTT within 14 days of enrollment; both must be ≤ 1.5 × ULN",
    },
    {
      id: "NCT04553770-inc-16",
      status: "pass",
      rationale:
        "Mastectomy was on 05/12/2026, about 20 weeks ago, and neither chloroquine nor hydroxychloroquine is on her medication list.",
      evidence: [PSH],
    },
    {
      id: "NCT04553770-inc-17",
      status: "not-applicable",
      rationale: `${NOT_CBP}; a pregnancy test is not required.`,
      evidence: [MENO],
    },
    {
      id: "NCT04553770-inc-18",
      status: "not-applicable",
      rationale: `${NOT_CBP}; contraception requirements do not apply.`,
    },
    {
      id: "NCT04553770-inc-19",
      status: "not-applicable",
      rationale: "Contraception method option for participants of reproductive potential; not relevant for a postmenopausal woman of 72.",
    },
    {
      id: "NCT04553770-inc-20",
      status: "not-applicable",
      rationale: "Contraception method option for women of childbearing potential; she is postmenopausal.",
    },
    {
      id: "NCT04553770-inc-21",
      status: "not-applicable",
      rationale: "Contraception method option for participants of reproductive potential; she is postmenopausal.",
    },
    {
      id: "NCT04553770-inc-22",
      status: "not-applicable",
      rationale: "Contraception method option for women of childbearing potential; she is postmenopausal.",
    },
    {
      id: "NCT04553770-inc-23",
      status: "not-applicable",
      rationale: "Applies to male participants only.",
    },
    {
      id: "NCT04553770-inc-24",
      status: "not-applicable",
      rationale: "Postmenopausal at 72 (menopause at about 50); ova donation or retrieval is not possible.",
    },
    {
      id: "NCT04553770-inc-25",
      status: "pass",
      confidence: "medium",
      rationale:
        "Postmenopausal by the protocol's age ≥ 60 definition (age 72, menopause at about 50, no HRT); a screening estradiol is not on file but would be expected in the postmenopausal range.",
      evidence: [MENO],
      actionNeeded: "Check estradiol before the baseline biopsy if required; must be in the postmenopausal range",
    },
    {
      id: "NCT04553770-inc-26",
      status: "not-applicable",
      rationale: "Applies to pre- or perimenopausal participants needing ovarian suppression; she is postmenopausal.",
    },
    {
      id: "NCT04553770-exc-1",
      status: "pass",
      rationale: "No recurrence or metastasis: staging CT and bone scan on 05/21/2026 were negative and she is NED on 09/25/2026.",
      evidence: [CT_NEG, NED],
    },
    {
      id: "NCT04553770-exc-2",
      status: "pass",
      rationale: "Unilateral right breast cancer: the screening mammogram showed a single right UOQ mass and the left breast has no masses on exam.",
      evidence: [MAMMO, L_BREAST],
    },
    {
      id: "NCT04553770-exc-3",
      status: "pass",
      rationale: "Not inflammatory breast cancer: staged pT2 pN2a (not T4d) and detected as a mass on screening mammography.",
      evidence: [STAGE],
    },
    {
      id: "NCT04553770-exc-4",
      status: "fail",
      rationale:
        "She has had prior chemotherapy (adjuvant docetaxel/cyclophosphamide ×4, completed 08/19/2026) and an aromatase inhibitor (letrozole since 09/08/2026), both explicitly excluded.",
      evidence: [TC, LET],
    },
    {
      id: "NCT04553770-exc-5",
      status: "fail",
      rationale: "Right chest wall and regional nodal radiation started 09/14/2026 (planned to finish 10/20/2026), so she has had ipsilateral chest wall radiation.",
      evidence: [PMRT],
    },
    {
      id: "NCT04553770-exc-6",
      status: "pass",
      rationale: "Mastectomy on 05/12/2026 was about 20 weeks ago; no surgery since.",
      evidence: [PSH],
    },
    {
      id: "NCT04553770-exc-7",
      status: "pass",
      confidence: "medium",
      rationale:
        "No myocardial infarction or heart failure recorded; LVEF 52% with no wall-motion abnormality on 05/28/2026, and paroxysmal AF is rate controlled.",
      evidence: [ECHO_E, AF],
    },
    {
      id: "NCT04553770-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "Takes several oral medications daily, including letrozole, apixaban and metoprolol.",
      evidence: [LET],
    },
    {
      id: "NCT04553770-exc-9",
      status: "not-applicable",
      rationale: `${NOT_CBP}; pregnancy and lactation exclusions do not apply.`,
    },
    {
      id: "NCT04553770-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "QTcF 448 ms on a single ECG on 09/21/2026, below the 470 ms female threshold; the triplicate screening ECG is still needed.",
      evidence: [ECG_E],
      actionNeeded: "Triplicate ECG at screening; mean QTc must be ≤ 470 ms",
    },
    {
      id: "NCT04553770-exc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "Apixaban is for paroxysmal AF, not a hypercoagulable disorder; her 2019 DVT was provoked by knee surgery and treated for only 3 months.",
      evidence: [DVT, AF],
    },
    {
      id: "NCT04553770-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No GI surgery, inflammatory bowel disease or chronic diarrhea recorded; surgical history is a knee replacement and the mastectomy.",
      evidence: [PSH],
    },
    {
      id: "NCT04553770-exc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "No ILD or pneumonitis history, no cough and lungs clear; she is mid-course chest wall radiation, so screening imaging would need to exclude radiation pneumonitis.",
      evidence: [SYMPTOMS, LUNGS],
      actionNeeded: "Screening chest CT to rule out ILD/pneumonitis",
    },
    {
      id: "NCT04553770-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy appears in her history; this is her first cancer.",
    },
    {
      id: "NCT04553770-exc-15",
      status: "pass",
      confidence: "low",
      rationale:
        "She is currently on adjuvant letrozole and chest wall radiation (to 10/20/2026); both would count as concurrent anticancer therapy and would have to stop or finish first. Planned zoledronic acid would need to start before consent.",
      evidence: [LET, PMRT],
      actionNeeded: "Letrozole would need to stop and radiation finish before enrollment",
    },
    {
      id: "NCT04553770-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "Never smoker with rare alcohol use; AF, hypertension and CKD 3a are controlled and no psychiatric condition is recorded.",
      evidence: [SH],
    },
    {
      id: "NCT04553770-exc-17",
      status: "unknown",
      rationale: "HIV, hepatitis B and hepatitis C status are not documented in the record.",
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody (HCV RNA if positive); HIV test if required locally",
    },
    {
      id: "NCT04553770-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "Her arrhythmia is paroxysmal atrial fibrillation; no syncope, ventricular arrhythmia or cardiac arrest is recorded.",
      evidence: [AF],
    },
    {
      id: "NCT04553770-exc-19",
      status: "pass",
      confidence: "medium",
      rationale: "No autologous or allogeneic stem-cell transplant in her history.",
    },
    {
      id: "NCT04553770-exc-20",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection recorded and counts have recovered (ANC 2.3); the protocol does not require viral screening.",
      evidence: [CBC],
    },
    {
      id: "NCT04553770-exc-21",
      status: "pass",
      rationale: "No hormone replacement therapy, past or current.",
      evidence: [MENO],
    },
    {
      id: "NCT04553770-exc-22",
      status: "pass",
      confidence: "medium",
      rationale: "No prior monoclonal antibody exposure, and her only recorded allergy is lisinopril (cough).",
      evidence: [ALLERGY],
    },
    {
      id: "NCT04553770-exc-23",
      status: "pass",
      confidence: "medium",
      rationale:
        "No lung disease, pulmonary embolism or autoimmune disorder recorded and lungs are clear; her 2019 event was a leg DVT, not a PE.",
      evidence: [LUNGS, DVT],
    },
    {
      id: "NCT04553770-exc-24",
      status: "pass",
      confidence: "medium",
      rationale: "NED after curative-intent treatment with ECOG 1; life expectancy is not limited.",
      evidence: [NED],
    },
  ],
);
