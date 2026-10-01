import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT04768426",
  "Fits the residual-disease criteria · only if adjuvant capecitabine (not olaparib) is chosen",
  "She matches the disease criteria closely: stage IIB TNBC with RCB-II residual disease after KEYNOTE-522, mastectomy and PMRT complete, NED on CT 7/9/26, and adequate labs on 9/19/26. Entry hinges on a decision not yet made: the trial requires planned adjuvant capecitabine for 6 months, and she is leaning toward olaparib, which OlympiA supports for a gBRCA1 carrier. The criteria do not address concurrent adjuvant pembrolizumab; hepatitis serology and the PI's view of her controlled grade 2 immune-related hypothyroidism also need confirming.",
  [
    {
      id: "NCT04768426-inc-1",
      status: "pass",
      rationale: "Stage IIB (cT2 cN1 M0) triple-negative breast cancer at diagnosis in 11/2025.",
      evidence: [{ quote: "R breast IDC grade 3, TNBC, cT2 (3.1 cm) cN1 (bx-proven axillary node) M0, stage IIB, dx 11/2025.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT04768426-inc-2",
      status: "pass",
      rationale: "ER 0% and PR 0% on the core biopsy, concordant on the residual tumor, well under 10%.",
      evidence: [{ quote: "ER 0%, PR 0%, HER2 IHC 0 - triple negative, concordant with core bx.", source: "Pathology 2026-06-17" }],
    },
    {
      id: "NCT04768426-inc-3",
      status: "pass",
      rationale: "Residual disease (ypT1c ypN1a, RCB class II) after KEYNOTE-522, i.e. 12 weeks of paclitaxel/carboplatin plus 4 cycles of dose-dense AC, well over 4 cycles; neoadjuvant pembrolizumab is permitted.",
      evidence: [
        { quote: "Residual Cancer Burden: RCB class II (RCB score 2.6)", source: "Pathology 2026-06-17" },
        {
          quote: "Neoadj per KEYNOTE-522: pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026) then pembro + ddAC x4 (3/2026-5/2026).",
          source: "Clinic note 2026-09-22",
        },
      ],
    },
    {
      id: "NCT04768426-inc-4",
      status: "pass",
      rationale: "She is 39 years old.",
      evidence: [{ quote: "39 yo premenopausal F", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT04768426-inc-5",
      status: "pass",
      rationale: "ECOG 0 at the 9/22/26 visit.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT04768426-inc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "Neuropathy is now grade 1 and radiation erythema is mild, but immune-related hypothyroidism is still recorded as grade 2 on levothyroxine (TSH 3.1); only alopecia and grade 2 neuropathy are listed exceptions, so the PI must judge whether it counts.",
      evidence: [
        { quote: "Tox: G2 PN on paclitaxel, now G1 (toes)", source: "Clinic note 2026-09-22" },
        { quote: "irAE hypothyroidism G2 - levothyroxine 75 mcg, TSH 3.1, continue.", source: "Clinic note 2026-09-22" },
      ],
      actionNeeded: "Confirm with the PI that grade 2 hypothyroidism controlled on levothyroxine is acceptable; only alopecia and G2 neuropathy are exempt",
    },
    {
      id: "NCT04768426-inc-7",
      status: "pass",
      rationale: "Post-operative CT chest/abdomen/pelvis on 7/9/26 showed no metastatic disease; baseline CT and bone scan were also negative.",
      evidence: [
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
        { quote: "Baseline staging 11/2025: CT CAP + bone scan without distant disease.", source: "Imaging" },
      ],
    },
    {
      id: "NCT04768426-inc-8",
      status: "pass",
      rationale: "Last chemotherapy (dose-dense AC) ended 5/2026, about 4 months ago, beyond the 4-week washout. The A/P line to continue weekly paclitaxel/carboplatin is a stale copy-forward; only pembrolizumab is current.",
      evidence: [
        { quote: "then pembro + ddAC x4 (3/2026-5/2026)", source: "Clinic note 2026-09-22" },
        { quote: "pembrolizumab 200 mg IV q3 weeks (adjuvant, C4 of 9)", source: "Medications" },
      ],
    },
    {
      id: "NCT04768426-inc-9",
      status: "pass",
      rationale: "ANC 1,900/µL and platelets 180,000/µL on 9/19/26; ANC clears 1,500 but is borderline and was flagged for recheck.",
      evidence: [
        { quote: "WBC 3.4 (L) | ANC 1.9 | Hgb 12.4 | Plt 180", source: "Labs 2026-09-19" },
        { quote: "ANC 1.9 today, borderline, recheck.", source: "Clinic note 2026-09-22" },
      ],
      actionNeeded: "Repeat CBC at screening; ANC ≥ 1,500/µL required",
    },
    {
      id: "NCT04768426-inc-10",
      status: "pass",
      rationale: "Bilirubin 0.5 mg/dL, AST 22 and ALT 25 U/L on 9/19/26, all within normal limits.",
      evidence: [{ quote: "AST 22 | ALT 25 | T bili 0.5 | Alk phos 71", source: "Labs 2026-09-19" }],
    },
    {
      id: "NCT04768426-inc-11",
      status: "pass",
      rationale: "Serum creatinine 0.7 mg/dL on 9/19/26, within 1.5 × ULN.",
      evidence: [{ quote: "Cr 0.7", source: "Labs 2026-09-19" }],
    },
    {
      id: "NCT04768426-inc-12",
      status: "unknown",
      confidence: "medium",
      rationale: "Adjuvant olaparib versus capecitabine is undecided (decision due at the next visit) and she is leaning toward olaparib, so capecitabine is not yet planned.",
      evidence: [
        { quote: "Adj olaparib vs cape: pt to decide by next visit.", source: "Clinic note 2026-09-22" },
        { quote: "Pt leaning olaparib but wants to hear about trials for residual disease first.", source: "Clinic note 2026-09-22" },
      ],
      actionNeeded: "Confirm a decision for 6 months (8 cycles) of adjuvant capecitabine; choosing olaparib instead would rule her out",
    },
    {
      id: "NCT04768426-inc-13",
      status: "pass",
      rationale: "She is of childbearing potential (premenopausal, irregular menses since chemotherapy) and serum hCG was negative on 9/19/26.",
      evidence: [
        { quote: "hCG (serum) negative", source: "Labs 2026-09-19" },
        { quote: "Menses irregular since chemo, last spotting ~8/26.", source: "Clinic note 2026-09-22" },
      ],
      actionNeeded: "Repeat pregnancy test within the protocol screening window",
    },
    {
      id: "NCT04768426-inc-14",
      status: "pass",
      confidence: "low",
      rationale: "The contraception agreement is confirmed at screening; a levonorgestrel IUD has been in place since 2023.",
      evidence: [{ quote: "levonorgestrel IUD (placed 2023)", source: "Medications" }],
    },
    {
      id: "NCT04768426-inc-15",
      status: "not-applicable",
      rationale: "Applies to male participants only; the patient is a woman.",
    },
    {
      id: "NCT04768426-inc-16",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent is confirmed at screening; she has asked to hear about trial options.",
      evidence: [{ quote: "wants to hear about trials for residual disease first", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT04768426-exc-1",
      status: "pass",
      rationale: "No metastatic disease on CT chest/abdomen/pelvis 7/9/26; she is NED.",
      evidence: [{ quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" }],
    },
    {
      id: "NCT04768426-exc-2",
      status: "pass",
      rationale: "Definitive surgery done 6/11/26: right mastectomy with negative margins and axillary dissection.",
      evidence: [{ quote: "Margins negative (closest deep 4 mm).", source: "Pathology 2026-06-17" }],
    },
    {
      id: "NCT04768426-exc-3",
      status: "pass",
      rationale: "Not pregnant (serum hCG negative 9/19/26) and not breastfeeding.",
      evidence: [
        { quote: "Not pregnant, not breastfeeding.", source: "Clinic note 2026-09-22" },
        { quote: "hCG (serum) negative", source: "Labs 2026-09-19" },
      ],
    },
    {
      id: "NCT04768426-exc-4",
      status: "pass",
      rationale: "Post-mastectomy radiation was completed on 8/28/26.",
      evidence: [{ quote: "PMRT 7/20/26-8/28/26, completed.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT04768426-exc-5",
      status: "unknown",
      confidence: "medium",
      rationale: "No HIV diagnosis or antiretroviral therapy is recorded, but hepatitis B and C serology is not documented.",
      actionNeeded: "Obtain HBsAg, anti-HBc and HCV antibody (HCV RNA if positive); active hepatitis B or C excludes",
    },
    {
      id: "NCT04768426-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Her only anticancer agent is standard-of-care adjuvant pembrolizumab; no investigational agent is on the medication list.",
      evidence: [{ quote: "pembrolizumab 200 mg IV q3 weeks (adjuvant, C4 of 9)", source: "Medications" }],
    },
    {
      id: "NCT04768426-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "She already takes levothyroxine and sertraline by mouth daily, with no swallowing problem recorded.",
      evidence: [
        { quote: "levothyroxine 75 mcg PO daily", source: "Medications" },
        { quote: "sertraline 50 mg PO daily", source: "Medications" },
      ],
    },
  ],
);
