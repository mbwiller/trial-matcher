import { demoMatch } from "../../match-helpers";

const NOTE = "Consult 2026-09-23";
const PATH = "Pathology 2026-09-08";
const MRI = "MRI 2026-09-11";
const ECHO = "Echo 2026-09-17";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT04893109",
  "Excluded: adjuvant study for resected stage I; she is untreated cT3 cN1 stage IIIA",
  "ATEMPT 2.0 enrolls patients after upfront surgery for stage I (N0 or N1mic) HER2-positive cancer. She has a 5.4 cm cT3 primary with an FNA-positive axillary node (stage IIIA), still in situ, and neoadjuvant TCHP is planned, which would in turn trigger the prior-chemotherapy exclusion. The consult's 'lumpectomy + SLNB, on adjuvant therapy' line is a copy-forward error; the HPI and PSH confirm no surgery. No further workup would make her eligible.",
  [
    {
      id: "NCT04893109-inc-1",
      status: "fail",
      rationale: "Clinical stage IIIA (cT3 cN1 M0): a 5.4 cm primary on MRI and an FNA-positive palpable axillary node, so neither stage I nor node-negative/micrometastatic.",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
        { quote: "R axillary LN FNA + for carcinoma, clips placed", source: NOTE },
      ],
    },
    {
      id: "NCT04893109-inc-2",
      status: "not-applicable",
      rationale: "Defines node-negativity after sentinel biopsy or dissection; she has had no axillary surgery and her palpable ~1.5 cm node is FNA-positive, so she is node-positive (see criterion 1).",
      evidence: [{ quote: "Palpable mobile R axillary node ~1.5 cm.", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-3",
      status: "not-applicable",
      rationale: "The micrometastasis allowance does not apply: her nodal disease is a palpable ~1.5 cm FNA-positive node with three abnormal level I nodes on MRI (cN1 macrometastatic).",
      evidence: [
        { quote: "Palpable mobile R axillary node ~1.5 cm.", source: NOTE },
        { quote: "Three abnormal R level I axillary nodes.", source: MRI },
      ],
    },
    {
      id: "NCT04893109-inc-4",
      status: "not-applicable",
      rationale: "Permits an additional small ER+/HER2-negative T1a focus; no such focus is established (the 6 mm left-breast lesion is unbiopsied until 9/30).",
    },
    {
      id: "NCT04893109-inc-5",
      status: "unknown",
      confidence: "low",
      rationale: "HER2 IHC 3+ locally on the 9/3 core biopsy meets ASCO/CAP, but central NeoGenomics confirmation has not been done.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH }],
      actionNeeded: "Send the 9/3 core biopsy for central HER2 confirmation at NeoGenomics",
    },
    {
      id: "NCT04893109-inc-6",
      status: "pass",
      rationale: "HER2 3+ was scored on invasive carcinoma; no DCIS component is reported on the core biopsy.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH }],
    },
    {
      id: "NCT04893109-inc-7",
      status: "pass",
      rationale: "ER (60%) and PR (20%) were determined by IHC on the 9/3 core biopsy.",
      evidence: [
        { quote: "ER: positive, 60% of tumor cells, moderate intensity", source: PATH },
        { quote: "PR: positive, 20% of tumor cells, weak to moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT04893109-inc-8",
      status: "not-applicable",
      rationale: "Bilateral cancer is not established: the 6 mm left-breast BI-RADS 4 focus awaits MRI-guided biopsy on 9/30, and the right-sided cancer itself does not meet the stage criteria.",
      evidence: [{ quote: "ALSO 6 mm enhancing focus L breast, BI-RADS 4 -> MRI-guided bx scheduled 9/30, result pending.", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-9",
      status: "not-applicable",
      rationale: "Right-breast disease is unifocal on MRI (a single 5.4 cm mass), so the multifocal/multicentric provision does not arise.",
      evidence: [{ quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI }],
    },
    {
      id: "NCT04893109-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No prior DCIS in either breast: this is a new diagnosis with no prior breast surgery. A synchronous left-breast finding on the 9/30 biopsy would need review.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-11",
      status: "fail",
      rationale: "She has had no breast surgery: the tumor is in situ and neoadjuvant TCHP is planned first. The 's/p R lumpectomy + SLNB' line is a stale template contradicted by the HPI and PSH ('none').",
      evidence: [
        { quote: "PSH: none.", source: NOTE },
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE },
      ],
    },
    {
      id: "NCT04893109-inc-12",
      status: "pass",
      rationale: "She is 34 and premenopausal; any menopausal status is allowed.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-13",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-14",
      status: "fail",
      rationale: "No resection has been performed: the 5.4 cm primary is intact and neoadjuvant systemic therapy is planned before surgery, so there are no clear surgical margins to document.",
      evidence: [
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI },
        { quote: "PSH: none.", source: NOTE },
      ],
    },
    {
      id: "NCT04893109-inc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No contraindication to radiotherapy is recorded (no prior chest RT, no connective-tissue disease); her surgical approach is not yet decided.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No adjuvant hormonal therapy has been given. Letrozole since 9/21 is for ovarian stimulation and ends around retrieval (~10/5), well under 4 weeks even if counted.",
      evidence: [{ quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: MEDS }],
    },
    {
      id: "NCT04893109-inc-17",
      status: "not-applicable",
      rationale: "No oophorectomy: she is premenopausal with intact ovaries and is undergoing stimulation for oocyte retrieval.",
      evidence: [{ quote: "oocyte cryopreservation cycle in progress (letrozole + gonadotropins, random start 9/21), retrieval planned ~10/5", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-18",
      status: "pass",
      rationale: "She has had no radiotherapy, partial or whole breast.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04893109-inc-19",
      status: "not-applicable",
      rationale: "No window study or investigational agent has been given, so this permissive clause does not arise.",
    },
    {
      id: "NCT04893109-inc-20",
      status: "pass",
      rationale: "ANC 4.1, hemoglobin 13.1 and platelets 255 on 9/22 all exceed the thresholds.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT04893109-inc-21",
      status: "pass",
      rationale: "Bilirubin 0.4 mg/dL (≤ 1.2), AST 18, ALT 21 and alkaline phosphatase 62 on 9/22 are all within normal limits, well under 1.5 × ULN.",
      evidence: [{ quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS }],
    },
    {
      id: "NCT04893109-inc-22",
      status: "pass",
      rationale: "LVEF 63% on echo 9/17/2026.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT04893109-inc-23",
      status: "pass",
      confidence: "medium",
      rationale: "Serum hCG was negative on 9/22; registration would follow surgery, so the test must be repeated then.",
      evidence: [{ quote: "hCG (serum) negative", source: LABS }],
      actionNeeded: "Repeat pregnancy test before registration",
    },
    {
      id: "NCT04893109-inc-24",
      status: "pass",
      confidence: "low",
      rationale: "Agreement is confirmed at screening; she currently uses condoms only, which falls short of one highly effective or two effective non-hormonal methods.",
      evidence: [{ quote: "Contraception: condoms.", source: NOTE }],
      actionNeeded: "Counsel on a copper IUD or two non-hormonal methods through 7 months after treatment",
    },
    {
      id: "NCT04893109-inc-25",
      status: "pass",
      confidence: "medium",
      rationale: "Diagnostic core biopsy tissue from 9/3 exists; whether the block suffices for 15 slides is not stated.",
      evidence: [{ quote: "Collected: 2026-09-03 | Reported: 2026-09-08", source: PATH }],
      actionNeeded: "Confirm the 9/3 core biopsy block can supply 15 unstained slides",
    },
    {
      id: "NCT04893109-inc-26",
      status: "pass",
      confidence: "low",
      rationale: "Capacity to consent is confirmed at screening; no barrier is documented.",
    },
    {
      id: "NCT04893109-inc-27",
      status: "pass",
      rationale: "Never blocks eligibility: patients who do not read English may enroll without the quality-of-life surveys.",
    },
    {
      id: "NCT04893109-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Serum hCG negative on 9/22, nulligravid and not nursing; she uses condoms, which this criterion lists as adequate contraception.",
      evidence: [
        { quote: "hCG (serum) negative", source: LABS },
        { quote: "Contraception: condoms.", source: NOTE },
      ],
    },
    {
      id: "NCT04893109-exc-2",
      status: "fail",
      confidence: "medium",
      rationale: "Stage IIIA (cT3 cN1) is conventionally locally advanced at diagnosis, although none of the listed T4 features (chest-wall fixation, peau d'orange, ulceration, inflammatory change) is present.",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
        { quote: "No skin, nipple, pectoralis or chest wall involvement.", source: MRI },
      ],
    },
    {
      id: "NCT04893109-exc-3",
      status: "pass",
      rationale: "No previous invasive breast cancer: this is a new diagnosis, and the 'Oncologic hx: s/p R lumpectomy' line is a stale template contradicted by the HPI.",
      evidence: [
        { quote: "CC: newly dx R breast ca, triple positive, neoadj tx planning.", source: NOTE },
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
      ],
    },
    {
      id: "NCT04893109-exc-4",
      status: "pass",
      rationale: "No chemotherapy to date; note that the planned neoadjuvant TCHP would itself trigger this exclusion.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04893109-exc-5",
      status: "pass",
      rationale: "She has never received paclitaxel or any other chemotherapy.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04893109-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No liver disease history, and AST 18, ALT 21, bilirubin 0.4 and alkaline phosphatase 62 on 9/22 are normal; hepatitis B/C serologies are pending.",
      evidence: [
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS },
        { quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS },
      ],
      actionNeeded: "Review the pending HBsAg, anti-HBc and HCV Ab results",
    },
    {
      id: "NCT04893109-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy is recorded in an otherwise complete past history.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT04893109-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection (afebrile), renal failure, cardiac disease or heart failure (LVEF 63%); BP 116/72 and only mild intermittent asthma.",
      evidence: [
        { quote: "BP 116/72 HR 74 afebrile.", source: NOTE },
        { quote: "No cardiac hx.", source: NOTE },
      ],
    },
  ],
);
