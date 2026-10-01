import { demoMatch } from "../../match-helpers";

const NOTE = "Consult 2026-09-23";
const PATH = "Pathology 2026-09-08";
const MRI = "MRI 2026-09-11";
const PET = "PET/CT 2026-09-15";
const LABS = "Labs 2026-09-22";

export default demoMatch(
  "NCT07407920",
  "Not eligible yet: needs completed neoadjuvant HP-chemo and surgery with pCR; she is treatment-naive",
  "MolecularPCR enrolls HER2-positive patients after neoadjuvant trastuzumab + pertuzumab + chemotherapy and surgery showing a pCR (ypT0/Tis ypN0) with negative ctDNA. She is treatment-naive with TCHP planned from the week of 10/12; the consult's 'lumpectomy + SLNB, on adjuvant therapy' line is a copy-forward error. Her stage (cT3 cN1 M0) and biology fit the HER2-positive cohort, so revisit after surgery (around March 2027) if she achieves pCR, before 4 cycles of adjuvant HP. Preserve the 9/3 core biopsy tissue, which the tumor-informed ctDNA assay needs.",
  [
    {
      id: "NCT07407920-inc-1",
      status: "pass",
      rationale: "Biopsy-proven invasive ductal carcinoma, HER2 IHC 3+ and hormone-receptor positive (ER 60%, PR 20%); she would enter the HER2-positive cohort.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH },
        { quote: "ER: positive, 60% of tumor cells, moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT07407920-inc-2",
      status: "not-applicable",
      rationale: "Applies to the TNBC cohort only; her tumor is ER 60%, PR 20% and HER2 3+.",
    },
    {
      id: "NCT07407920-inc-3",
      status: "pass",
      rationale: "Invasive ductal carcinoma, grade 3; any histology and grade are accepted.",
      evidence: [{ quote: "A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", source: PATH }],
    },
    {
      id: "NCT07407920-inc-4",
      status: "pass",
      rationale: "Clinical cT3 cN1 M0 falls within T1–4, N0–2a, M0; MRI shows no internal mammary or supraclavicular nodes and PET/CT no distant disease.",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
        { quote: "No FDG-avid distant metastases.", source: PET },
      ],
    },
    {
      id: "NCT07407920-inc-5",
      status: "fail",
      rationale: "She has not started neoadjuvant therapy or had surgery: TCHP is only planned (week of 10/12). The 's/p R lumpectomy + SLNB, on adjuvant therapy' line is a stale template contradicted by the HPI and PSH.",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE },
      ],
    },
    {
      id: "NCT07407920-inc-6",
      status: "not-applicable",
      rationale: "Applies to the TNBC cohort (pembrolizumab-based neoadjuvant therapy) only; she has HER2-positive disease.",
    },
    {
      id: "NCT07407920-inc-7",
      status: "fail",
      rationale: "No surgical pathology exists yet: the 5.4 cm primary is intact and surgery follows six cycles of neoadjuvant therapy, so pCR cannot be shown at present.",
      evidence: [
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI },
        { quote: "PSH: none.", source: NOTE },
      ],
    },
    {
      id: "NCT07407920-inc-8",
      status: "pass",
      confidence: "medium",
      rationale: "A diagnostic core biopsy from 9/3 exists; its adequacy for Personalis sequencing is not stated, and after a pCR it would be the only tumor tissue available.",
      evidence: [{ quote: "Collected: 2026-09-03 | Reported: 2026-09-08", source: PATH }],
      actionNeeded: "Confirm the 9/3 core block is sufficient for Personalis and preserve it",
    },
    {
      id: "NCT07407920-inc-9",
      status: "pass",
      rationale: "She is 34 years old.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT07407920-inc-10",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: NOTE }],
    },
    {
      id: "NCT07407920-inc-11",
      status: "pass",
      rationale: "ANC 4.1 × 10⁹/L on 9/22 (pre-treatment; would be rechecked after neoadjuvant therapy).",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT07407920-inc-12",
      status: "pass",
      rationale: "Hemoglobin 13.1 g/dL on 9/22 (pre-treatment; would be rechecked after neoadjuvant therapy).",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT07407920-inc-13",
      status: "pass",
      rationale: "Platelets 255,000/mcL on 9/22 (pre-treatment; would be rechecked after neoadjuvant therapy).",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT07407920-inc-14",
      status: "pass",
      rationale: "Total bilirubin 0.4 mg/dL on 9/22, within normal limits.",
      evidence: [{ quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS }],
    },
    {
      id: "NCT07407920-inc-15",
      status: "pass",
      rationale: "AST 18 and ALT 21 on 9/22, within normal limits and well under 3 × ULN.",
      evidence: [{ quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS }],
    },
    {
      id: "NCT07407920-inc-16",
      status: "pass",
      rationale: "Creatinine 0.6 mg/dL on 9/22 (≤ 1.5 mg/dL).",
      evidence: [{ quote: "Cr 0.6 | Na 140 | K 4.0", source: LABS }],
    },
    {
      id: "NCT07407920-inc-17",
      status: "unknown",
      confidence: "low",
      rationale: "No known hepatitis B, but HBsAg and anti-HBc drawn 9/22 are pending.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review HBsAg/anti-HBc; if chronic HBV, viral load must be undetectable on suppressive therapy",
    },
    {
      id: "NCT07407920-inc-18",
      status: "unknown",
      confidence: "low",
      rationale: "No known hepatitis C, but the HCV antibody drawn 9/22 is pending.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review HCV Ab; if positive, HCV must be treated and cured or viral load undetectable on treatment",
    },
    {
      id: "NCT07407920-inc-19",
      status: "unknown",
      confidence: "low",
      rationale: "No known HIV infection, but the HIV Ag/Ab test drawn 9/22 is pending.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review HIV Ag/Ab; if positive, requires effective ART with undetectable viral load within 6 months",
    },
    {
      id: "NCT07407920-inc-20",
      status: "pass",
      rationale: "She is a premenopausal woman, which is allowed.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT07407920-inc-21",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent are confirmed at screening; no barrier is documented.",
    },
    {
      id: "NCT07407920-exc-1",
      status: "pass",
      rationale: "Clinical N1 (mobile level I nodes); MRI shows no internal mammary or supraclavicular adenopathy, so not cN2b or cN3.",
      evidence: [{ quote: "Three abnormal R level I axillary nodes. No internal mammary or supraclavicular adenopathy.", source: MRI }],
    },
    {
      id: "NCT07407920-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No non-breast malignancy is recorded in an otherwise complete past history.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT07407920-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Not receiving any investigational agent; note that joining a neoadjuvant trial of a novel anti-HER2 agent, which she is considering, could affect later eligibility.",
      evidence: [{ quote: "Pt interested in trials (neoadj de-escalation or novel anti-HER2 agent) - referred to research coordinator.", source: NOTE }],
    },
    {
      id: "NCT07407920-exc-4",
      status: "pass",
      rationale: "PET/CT on 9/15 shows no distant metastases.",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: PET }],
    },
    {
      id: "NCT07407920-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled illness: afebrile, no cardiac history, normal sinus rhythm; asthma is mild and stable.",
      evidence: [
        { quote: "BP 116/72 HR 74 afebrile.", source: NOTE },
        { quote: "No cardiac hx.", source: NOTE },
      ],
    },
    {
      id: "NCT07407920-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No psychiatric illness or social barrier is recorded; she works as a software engineer and is engaged in planning.",
      evidence: [{ quote: "SH: software engineer, never smoker, rare EtOH.", source: NOTE }],
    },
    {
      id: "NCT07407920-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No blood transfusion is recorded and hemoglobin is 13.1 g/dL; recheck at the time of ctDNA collection.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT07407920-exc-8",
      status: "pass",
      rationale: "She has received no trastuzumab or pertuzumab in any setting.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT07407920-exc-9",
      status: "pass",
      rationale: "Serum hCG negative on 9/22; would be rechecked at enrollment after surgery.",
      evidence: [{ quote: "hCG (serum) negative", source: LABS }],
    },
  ],
);
