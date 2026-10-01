import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06876714",
  "Excluded: T3N1 tumors are ineligible, and this post-neoadjuvant pCR trial needs completed therapy",
  "ShortStop-HER2 randomizes patients who achieved pCR after neoadjuvant chemotherapy plus trastuzumab to 6 vs 12 months of HER2 therapy. Her clinical stage is cT3 cN1, which the protocol explicitly excludes, so she will not qualify even if she reaches pCR. She is also treatment-naive, so the neoadjuvant, surgical and pCR requirements cannot be met yet; HER2 status, performance and cardiac function would otherwise be acceptable.",
  [
    {
      id: "NCT06876714-inc-1",
      status: "fail",
      rationale: "Clinical stage cT3 cN1 (5.4 cm primary, FNA-proven axillary node); T3N1 tumors are specifically excluded.",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA", source: "Consult 2026-09-23" },
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: "MRI 2026-09-11" },
      ],
    },
    {
      id: "NCT06876714-inc-2",
      status: "fail",
      rationale: "She has not had neoadjuvant therapy or surgery; the 5.4 cm primary is in place, so absence of residual invasive disease cannot be established.",
      evidence: [{ quote: "R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-3",
      status: "pass",
      rationale: "HER2 IHC 3+ on the right-breast core biopsy, positive by ASCO/CAP.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: "Pathology 2026-09-08" }],
    },
    {
      id: "NCT06876714-inc-4",
      status: "pass",
      rationale: "Hormone receptor status known: ER 60% and PR 20% positive.",
      evidence: [
        { quote: "ER: positive, 60% of tumor cells, moderate intensity", source: "Pathology 2026-09-08" },
        { quote: "PR: positive, 20% of tumor cells, weak to moderate intensity", source: "Pathology 2026-09-08" },
      ],
    },
    {
      id: "NCT06876714-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Invasive disease is proven only on the right; the 6 mm left BI-RADS 4 focus awaits biopsy 9/30 and would matter only if invasive and not HER2+.",
      evidence: [{ quote: "ALSO 6 mm enhancing focus L breast, BI-RADS 4 -> MRI-guided bx scheduled 9/30, result pending.", source: "Consult 2026-09-23" }],
      actionNeeded: "Review the 9/30 left-breast biopsy; if invasive, that tumor must also be HER2+",
    },
    {
      id: "NCT06876714-inc-6",
      status: "pass",
      rationale: "34 years old (DOB 1992), above the 18-year minimum.",
      evidence: [{ quote: "DOB: 1992 (34 yo F)", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-7",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-8",
      status: "fail",
      rationale: "No neoadjuvant chemotherapy or trastuzumab has been given; TCHP is only planned to start the week of 10/12.",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" },
        { quote: "Wants to start neoadj tx wk of 10/12.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT06876714-inc-9",
      status: "fail",
      rationale: "Zero weeks of trastuzumab coverage to date, short of the 12-week minimum required before registration.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No prior endocrine therapy for DCIS or prevention; letrozole since 9/21 is for oocyte stimulation, and endocrine therapy for this cancer would be allowed.",
      evidence: [{ quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: "Medications" }],
    },
    {
      id: "NCT06876714-inc-11",
      status: "pass",
      rationale: "No investigational anti-cancer agent: she is treatment-naive and the medication list has none.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-12",
      status: "fail",
      rationale: "No breast surgery has been performed (PSH none), so the 14-week post-surgery registration window has not opened.",
      evidence: [{ quote: "PSH: none.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-13",
      status: "fail",
      rationale: "No breast or axillary surgery yet; the 'Oncologic hx: s/p R lumpectomy + SLNB' line is a stale template contradicted by the HPI, PSH and the intact 5.4 cm mass.",
      evidence: [
        { quote: "PSH: none.", source: "Consult 2026-09-23" },
        { quote: "R breast 5 cm firm mobile mass 10 o'clock, no skin changes, no nipple retraction.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT06876714-inc-14",
      status: "not-applicable",
      rationale: "She has not had breast-conserving surgery, so the post-lumpectomy radiation requirement does not yet apply; no contraindication to radiation is recorded.",
    },
    {
      id: "NCT06876714-inc-15",
      status: "pass",
      rationale: "Not pregnant (serum hCG negative 9/22) and not nursing (G0); pregnancy testing is repeated per local practice before HER2 therapy.",
      evidence: [
        { quote: "hCG (serum) negative", source: "Labs 2026-09-22" },
        { quote: "34 yo premenopausal F, G0", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT06876714-inc-16",
      status: "pass",
      rationale: "Labs 9/22 are all normal (ANC 4.1, platelets 255, creatinine 0.6, AST 18, ALT 21, bilirubin 0.4).",
      evidence: [
        { quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: "Labs 2026-09-22" },
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT06876714-inc-17",
      status: "pass",
      rationale: "M0: no distant metastases on PET/CT 9/15.",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: "PET/CT 2026-09-15" }],
    },
    {
      id: "NCT06876714-inc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No other prior or concurrent malignancy is recorded.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM." }],
    },
    {
      id: "NCT06876714-inc-19",
      status: "pass",
      rationale: "This is a new diagnosis with no prior cancer treatment or surgery; the stale 's/p R lumpectomy' template line is contradicted by the HPI and PSH.",
      evidence: [
        { quote: "CC: newly dx R breast ca, triple positive, neoadj tx planning.", source: "Consult 2026-09-23" },
        { quote: "PSH: none.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT06876714-inc-20",
      status: "pass",
      rationale: "No recurrence: this is a newly diagnosed, untreated cancer with no distant disease on PET/CT 9/15.",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: "PET/CT 2026-09-15" }],
    },
    {
      id: "NCT06876714-inc-21",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive criterion: HIV, HBV and HCV serologies drawn 9/22 are pending, but even a positive result would not exclude a healthy patient.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT06876714-inc-22",
      status: "pass",
      rationale: "LVEF 63% on echo 9/17, above 50%.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: "Echo 2026-09-17" }],
    },
    {
      id: "NCT06876714-inc-23",
      status: "pass",
      rationale: "She has never received trastuzumab or pertuzumab, so there is no prior toxicity.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT06876714-inc-24",
      status: "pass",
      rationale: "No contraindication to HER2 therapy: no cardiac history, LVEF 63%, NKDA.",
      evidence: [
        { quote: "No cardiac hx.", source: "Consult 2026-09-23" },
        { quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: "Echo 2026-09-17" },
      ],
    },
    {
      id: "NCT06876714-inc-25",
      status: "pass",
      confidence: "medium",
      rationale: "No severe systemic disease; mild intermittent asthma is stable.",
      evidence: [{ quote: "3. Asthma: stable.", source: "Consult 2026-09-23" }],
    },
  ],
);
