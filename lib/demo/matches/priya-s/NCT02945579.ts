import { demoMatch } from "../../match-helpers";

const NOTE = "Consult 2026-09-23";
const PATH = "Pathology 2026-09-08";
const US = "Mammogram/US 2026-08-28";
const MRI = "MRI 2026-09-11";
const PET = "PET/CT 2026-09-15";
const LABS = "Labs 2026-09-22";

export default demoMatch(
  "NCT02945579",
  "Excluded: 5.4 cm cT3 and node-positive, outside every cohort; also under 40 for Cohort A",
  "No cohort fits. Cohorts A1/A2 (omit surgery after an image-guided pCR) require T1–T2 ≤ 5 cm and age ≥ 40; she is 34 with a 5.4 cm cT3 primary. Cohorts C/D (omit radiotherapy after pCR at lumpectomy) accept HER2-positive patients from age 30 but require cN0, and her axillary FNA was positive; Cohort B is for HR-positive/HER2-negative T1N0 disease. Because entry rests on the initial clinical stage, even an excellent response to neoadjuvant TCHP would not make her eligible.",
  [
    {
      id: "NCT02945579-inc-1",
      status: "not-applicable",
      rationale: "Cohort heading with no requirement of its own; her fit for Cohorts A1/A2 is judged on the conditions that follow (she fails on tumor size and age).",
    },
    {
      id: "NCT02945579-inc-2",
      status: "pass",
      rationale: "Cohort A allows enrollment before neoadjuvant therapy; she is treatment-naive with TCHP targeted for the week of 10/12, so timing alone would not bar her.",
      evidence: [{ quote: "Wants to start neoadj tx wk of 10/12.", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-3",
      status: "fail",
      rationale: "The primary measures 5.4 cm on MRI (5.2 cm on US 8/28), i.e. cT3, exceeding the T1–T2 ≤ 5 cm limit; her nodal count (2 abnormal on US) and M0 on PET/CT would otherwise qualify.",
      evidence: [
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI },
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
      ],
    },
    {
      id: "NCT02945579-inc-4",
      status: "pass",
      rationale: "HER2 IHC 3+ on the 9/3 core biopsy, with standard neoadjuvant TCHP planned.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH },
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE },
      ],
    },
    {
      id: "NCT02945579-inc-5",
      status: "unknown",
      confidence: "low",
      rationale: "Her preference for breast conservation is not recorded; the surgical plan awaits the 9/30 left-breast biopsy and the pending germline panel.",
      evidence: [{ quote: "contralateral bx + germline result will inform surgical planning.", source: NOTE }],
      actionNeeded: "Ask about her preference for breast-conserving therapy once the left-breast biopsy and germline results are back",
    },
    {
      id: "NCT02945579-inc-6",
      status: "fail",
      rationale: "She is 34 (DOB 1992); Cohort A requires age ≥ 40.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-7",
      status: "pass",
      rationale: "She is a 34-year-old woman, meeting the female-sex requirement.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No prior non-breast cancer is recorded; her past history lists only mild intermittent asthma.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-9",
      status: "pass",
      rationale: "Diagnostic US on 8/28 showed two abnormal right axillary nodes (≤ 4), and the suspicious node was sampled: FNA positive for carcinoma.",
      evidence: [
        { quote: "Two R axillary LNs w/ cortical thickening.", source: US },
        { quote: "R axillary LN FNA + for carcinoma, clips placed", source: NOTE },
      ],
    },
    {
      id: "NCT02945579-inc-10",
      status: "pass",
      confidence: "low",
      rationale: "An acknowledgement taken at consent; note that her 5.4 cm primary would need to shrink to ≤ 2 cm on final imaging before the on-study biopsy.",
    },
    {
      id: "NCT02945579-inc-11",
      status: "not-applicable",
      rationale: "Heading for Cohorts B1/B2, which enroll HR-positive/HER2-negative disease; she is HER2-positive (IHC 3+), so Cohort B does not apply.",
    },
    {
      id: "NCT02945579-inc-12",
      status: "not-applicable",
      rationale: "Enrollment conditions for Cohort B, which is for HER2-negative disease and does not apply to her HER2 IHC 3+ tumor.",
    },
    {
      id: "NCT02945579-inc-13",
      status: "not-applicable",
      rationale: "Defines Cohort B (ER/PR-positive, HER2-negative); her tumor is HER2 IHC 3+, so she would be screened for Cohorts A or C instead.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH }],
    },
    {
      id: "NCT02945579-inc-14",
      status: "not-applicable",
      rationale: "Cohort B (HR+/HER2−) criterion only; not applicable to her HER2-positive disease (which is in any case cT3 cN1, not T1N0).",
    },
    {
      id: "NCT02945579-inc-15",
      status: "not-applicable",
      rationale: "Cohort B age rule; Cohort B does not apply to her HER2-positive tumor (she is also 34, under 40).",
    },
    {
      id: "NCT02945579-inc-16",
      status: "not-applicable",
      rationale: "Oncotype rule for Cohort B (HR+/HER2−) patients aged ≥ 50; does not apply to her HER2-positive disease at age 34.",
    },
    {
      id: "NCT02945579-inc-17",
      status: "not-applicable",
      rationale: "Oncotype and size rule for Cohort B patients aged 40–49; she is 34 with HER2-positive disease, so Cohort B does not apply.",
    },
    {
      id: "NCT02945579-inc-18",
      status: "not-applicable",
      rationale: "Anti-estrogen agreement for Cohort B (HR+/HER2−) patients; Cohort B does not apply to her HER2-positive tumor.",
    },
    {
      id: "NCT02945579-inc-19",
      status: "not-applicable",
      rationale: "Listed under Cohort B, which does not apply to her HER2-positive disease (she is female).",
    },
    {
      id: "NCT02945579-inc-20",
      status: "not-applicable",
      rationale: "Listed under Cohort B, which does not apply to her HER2-positive tumor; she has no recorded prior non-breast cancer in any case.",
    },
    {
      id: "NCT02945579-inc-21",
      status: "not-applicable",
      rationale: "Listed under Cohort B, which does not apply to her HER2-positive tumor; she has never had radiotherapy.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-22",
      status: "pass",
      rationale: "Cohort C allows enrollment before neoadjuvant therapy; she is treatment-naive with TCHP planned, so timing would not bar her.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-23",
      status: "fail",
      rationale: "HER2-positive with anti-HER2 neoadjuvant therapy planned, but the primary is cT3 (5.4 cm on MRI) and the axilla cN1 (FNA-positive node); Cohort C requires T1–T2 ≤ 5 cm and N0.",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
        { quote: "R axillary LN FNA + for carcinoma, clips placed", source: NOTE },
      ],
    },
    {
      id: "NCT02945579-inc-24",
      status: "pass",
      confidence: "medium",
      rationale: "She has already tolerated a core biopsy of the primary (9/3) and neoadjuvant therapy is planned, so she could undergo the optional pretreatment biopsy.",
      evidence: [{ quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-25",
      status: "unknown",
      confidence: "low",
      rationale: "Her wish for breast conservation is not documented; surgical planning awaits the left-breast biopsy (9/30) and the germline result.",
      evidence: [{ quote: "contralateral bx + germline result will inform surgical planning.", source: NOTE }],
      actionNeeded: "Ask about her preference for breast-conserving therapy after the left-breast biopsy and germline results",
    },
    {
      id: "NCT02945579-inc-26",
      status: "pass",
      rationale: "She is 34 with a HER2-positive (IHC 3+) tumor, meeting the Cohort C rule of age ≥ 30 for HER2-positive disease.",
      evidence: [
        { quote: "34 yo premenopausal F, G0", source: NOTE },
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH },
      ],
    },
    {
      id: "NCT02945579-inc-27",
      status: "pass",
      rationale: "She is a 34-year-old woman, meeting the female-sex requirement.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-28",
      status: "pass",
      confidence: "medium",
      rationale: "No prior non-breast malignancy is recorded; her past history lists only mild intermittent asthma.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-29",
      status: "fail",
      rationale: "The initial US (8/28) showed two abnormal right axillary nodes and FNA confirmed metastatic carcinoma, so she is node-positive; Cohort C requires no suspicious nodes or a benign nodal biopsy.",
      evidence: [
        { quote: "Two R axillary LNs w/ cortical thickening.", source: US },
        { quote: "B. Positive for metastatic carcinoma, c/w breast primary.", source: PATH },
      ],
    },
    {
      id: "NCT02945579-inc-30",
      status: "unknown",
      confidence: "low",
      rationale: "Post-surgical requirement: she has not had surgery (tumor in situ, TCHP planned), so no lumpectomy pathology exists yet; the 's/p R lumpectomy' line in the consult is a stale template.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
      actionNeeded: "Reassess after neoadjuvant therapy and lumpectomy; requires no residual invasive cancer or DCIS",
    },
    {
      id: "NCT02945579-inc-31",
      status: "unknown",
      confidence: "low",
      rationale: "Judged on the surgical nodal specimen, which does not exist yet; she is currently cN1 with an FNA-positive node, so this would require a complete nodal response.",
      evidence: [{ quote: "B. Positive for metastatic carcinoma, c/w breast primary.", source: PATH }],
      actionNeeded: "Reassess on surgical pathology; requires no nodal metastasis or isolated tumor cells (ypN0)",
    },
    {
      id: "NCT02945579-inc-32",
      status: "pass",
      confidence: "medium",
      rationale: "MRI shows a single 5.4 cm right-breast mass with no other ipsilateral focus (the 6 mm BI-RADS 4 focus is in the left breast); excision in one lumpectomy will depend on response.",
      evidence: [
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI },
        { quote: "L breast upper inner quadrant 6 mm enhancing focus, plateau kinetics, indeterminate. BI-RADS 4. MRI-guided biopsy recommended.", source: MRI },
      ],
    },
    {
      id: "NCT02945579-inc-33",
      status: "fail",
      rationale: "Cohort D requires meeting all Cohort C criteria, and she does not (cT3 primary, FNA-proven cN1 axilla); Cohort D is also limited to MD Anderson Houston patients.",
      evidence: [{ quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE }],
    },
    {
      id: "NCT02945579-inc-34",
      status: "unknown",
      confidence: "low",
      rationale: "HER2-positive with neoadjuvant therapy planned, but whether she is amenable to breast conservation (5.4 cm primary, contralateral biopsy and germline pending) is not yet established.",
      evidence: [{ quote: "contralateral bx + germline result will inform surgical planning.", source: NOTE }],
      actionNeeded: "Obtain a surgical opinion on breast-conservation candidacy after neoadjuvant therapy",
    },
    {
      id: "NCT02945579-inc-35",
      status: "not-applicable",
      rationale: "Describes optional ARTIDIS biopsies and later crossover from Cohort D to A or C; it sets no requirement, and she would not meet Cohort A or C criteria (cT3, cN1, age 34).",
    },
    {
      id: "NCT02945579-exc-1",
      status: "fail",
      rationale: "MRI measures the right-breast primary at 5.4 × 4.1 × 3.8 cm (cT3), which excludes her from Cohorts A1/A2 and C (and from B).",
      evidence: [
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI },
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
      ],
    },
    {
      id: "NCT02945579-exc-2",
      status: "pass",
      rationale: "PET/CT on 9/15 shows FDG-avid disease only in the right breast and axilla, with no distant metastases (M0).",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: PET }],
    },
    {
      id: "NCT02945579-exc-3",
      status: "pass",
      rationale: "A new diagnosis with no prior breast cancer or surgery; the 'Oncologic hx: s/p R lumpectomy + SLNB' line is a stale template contradicted by the HPI, PSH ('none') and the A/P ('treatment-naive').",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
        { quote: "PSH: none.", source: NOTE },
      ],
    },
    {
      id: "NCT02945579-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No therapy has been given yet; 5.2 cm on US (8/28) versus 5.4 cm on MRI (9/11) is within measurement variation, and there is no nodal disease beyond the FNA-proven axilla.",
      evidence: [{ quote: "5.2 cm irregular mass R breast 10 o'clock + 2 abnormal R axillary LNs", source: NOTE }],
    },
    {
      id: "NCT02945579-exc-5",
      status: "pass",
      rationale: "Serum hCG was negative on 9/22; with ovarian stimulation under way, expect repeat testing at registration.",
      evidence: [{ quote: "hCG (serum) negative", source: LABS }],
    },
    {
      id: "NCT02945579-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "She is not on a neoadjuvant protocol; she has been referred for neoadjuvant trials, and joining one that mandates surgery would trigger this exclusion for Cohort A.",
      evidence: [{ quote: "Pt interested in trials (neoadj de-escalation or novel anti-HER2 agent) - referred to research coordinator.", source: NOTE }],
    },
  ],
);
