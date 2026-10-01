import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2026-05-19";
const MAMMO = "Mammogram 2026-04-02";

export default demoMatch(
  "NCT06444269",
  "Excluded: for unoperated cT1–2N0 tumors ≤ 3 cm; hers was 3.8 cm, node-positive and already resected",
  "RAPS gives preoperative ablative partial-breast radiation to small (≤ 3 cm), clinically node-negative ER+/HER2- cancers that have not yet been operated on. Helen's tumor was 3.4 cm on mammogram and 3.8 cm at pathology with 5 of 18 nodes positive, it was removed by mastectomy on 5/12/26, and she is now receiving chest-wall radiation. Only her receptor status fits. No change in her situation could make her eligible; preoperative partial-breast approaches are not an option after mastectomy.",
  [
    {
      id: "NCT06444269-inc-1",
      status: "fail",
      rationale: "Tumor was larger than 3 cm (3.8 cm pathologic) and node-positive (pN2a), and she has already had mastectomy and adjuvant chemotherapy; the trial is for unoperated, untreated T1–T2 cN0 tumors ≤ 3 cm.",
      evidence: [
        { quote: "R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg -> pT2 pN2a M0, stage IIIA.", source: NOTE },
      ],
    },
    {
      id: "NCT06444269-inc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No skin involvement: the tumor was staged pT2 (not T4), and no skin changes were described before surgery.",
      evidence: [{ quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: PATH }],
    },
    {
      id: "NCT06444269-inc-3",
      status: "pass",
      rationale: "Female, aged 72; meets the adult female requirement.",
      evidence: [{ quote: "72 yo postmenopausal F", source: NOTE }],
    },
    {
      id: "NCT06444269-inc-4",
      status: "fail",
      rationale: "Unifocal tumor measured 3.4 cm on the 4/2/26 mammogram (3.8 cm at pathology), above the 3 cm imaging limit.",
      evidence: [
        { quote: "Screening mammogram 04/02/2026: R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", source: MAMMO },
        { quote: "DIAGNOSIS: Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm. E-cadherin positive.", source: PATH },
      ],
    },
    {
      id: "NCT06444269-inc-5",
      status: "not-applicable",
      rationale: "Multifocal-disease provision; she had a single unifocal tumor.",
    },
    {
      id: "NCT06444269-inc-6",
      status: "fail",
      rationale: "There is no tumor left to visualize or target: it was removed by modified radical mastectomy on 5/12/26.",
      evidence: [{ quote: "PSH: L TKA 2019. R MRM 5/2026.", source: NOTE }],
    },
    {
      id: "NCT06444269-inc-7",
      status: "fail",
      confidence: "medium",
      rationale: "Her workup imaging was a screening mammogram and staging CT/bone scan; no breast MRI or contrast-enhanced mammography is recorded, and she proceeded directly to mastectomy.",
      evidence: [{ quote: "found on screening mammo 4/2026, core bx 4/14/26", source: NOTE }],
    },
    {
      id: "NCT06444269-inc-8",
      status: "fail",
      confidence: "medium",
      rationale: "Pre-operative clinical nodal status is not recorded, but axillary dissection found 5 of 18 nodes positive with a 1.6 cm deposit and extranodal extension, so she is not node-negative.",
      evidence: [{ quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: PATH }],
    },
    {
      id: "NCT06444269-inc-9",
      status: "pass",
      confidence: "low",
      rationale: "ER 90%/PR 5% and HER2-negative (IHC 2+, ISH not amplified) meet the receptor requirement; consent is confirmed at screening, and the contraception clause does not apply after menopause.",
      evidence: [{ quote: "ER 90% / PR 5% / HER2 2+ ISH neg (HER2-low)", source: NOTE }],
    },
    {
      id: "NCT06444269-inc-10",
      status: "not-applicable",
      rationale: "Part of the definition of child-bearing potential; she is naturally postmenopausal since about age 50, so not of child-bearing potential.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT06444269-inc-11",
      status: "not-applicable",
      rationale: "Part of the definition of child-bearing potential; she has been naturally postmenopausal for about 22 years.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: NOTE }],
    },
    {
      id: "NCT06444269-inc-12",
      status: "not-applicable",
      rationale: "Cohort 1 investigator-discretion note about a previously clipped sentinel node; she has already had full axillary dissection.",
    },
    {
      id: "NCT06444269-inc-13",
      status: "not-applicable",
      rationale: "Applies to the healthy-volunteer cohort only; she would be screened as a patient.",
    },
    {
      id: "NCT06444269-inc-14",
      status: "not-applicable",
      rationale: "Applies to the healthy-volunteer cohort only.",
    },
    {
      id: "NCT06444269-inc-15",
      status: "not-applicable",
      rationale: "Applies to the healthy-volunteer cohort only; she has breast cancer.",
    },
    {
      id: "NCT06444269-exc-1",
      status: "pass",
      rationale: "Single tumor: one mass on mammogram and one 3.8 cm carcinoma at pathology; no multicentric disease described.",
      evidence: [{ quote: "Screening mammogram 04/02/2026: R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", source: MAMMO }],
    },
    {
      id: "NCT06444269-exc-2",
      status: "fail",
      rationale: "She is receiving radiation to the right chest wall and regional nodes (started 9/14/26), the side of her cancer.",
      evidence: [{ quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: NOTE }],
    },
    {
      id: "NCT06444269-exc-3",
      status: "fail",
      rationale: "Tumor size exceeded 3 cm: 3.4 cm on mammogram and 3.8 cm on surgical pathology.",
      evidence: [
        { quote: "Screening mammogram 04/02/2026: R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", source: MAMMO },
        { quote: "DIAGNOSIS: Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm. E-cadherin positive.", source: PATH },
      ],
    },
    {
      id: "NCT06444269-exc-4",
      status: "not-applicable",
      rationale: "Pregnancy and lactation exclusion cannot apply to a 72-year-old postmenopausal woman.",
    },
    {
      id: "NCT06444269-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No earlier right breast cancer: the 4/2026 diagnosis is her first, and her history lists no prior breast cancer.",
      evidence: [{ quote: "found on screening mammo 4/2026, core bx 4/14/26", source: NOTE }],
    },
    {
      id: "NCT06444269-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No lupus or scleroderma in her past medical history.",
    },
    {
      id: "NCT06444269-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No MRI contraindication is recorded; a knee replacement is generally MRI-compatible, and eGFR 49 permits contrast with a group II agent.",
      evidence: [{ quote: "PSH: L TKA 2019. R MRM 5/2026.", source: NOTE }],
    },
    {
      id: "NCT06444269-exc-8",
      status: "fail",
      rationale: "She has documented nodal metastases (5 of 18 nodes, pN2a, extranodal extension); the study treats only node-negative patients.",
      evidence: [{ quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: PATH }],
    },
    {
      id: "NCT06444269-exc-9",
      status: "not-applicable",
      rationale: "Applies to the healthy-volunteer cohort only.",
    },
    {
      id: "NCT06444269-exc-10",
      status: "not-applicable",
      rationale: "Applies to the healthy-volunteer cohort only.",
    },
  ],
);
