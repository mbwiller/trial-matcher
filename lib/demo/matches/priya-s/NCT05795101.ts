import { demoMatch } from "../../match-helpers";

const NOTE = "Consult 2026-09-23";
const PATH = "Pathology 2026-09-08";
const MRI = "MRI 2026-09-11";
const PET = "PET/CT 2026-09-15";
const ECHO = "Echo 2026-09-17";
const ECG = "ECG 2026-09-17";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT05795101",
  "Excluded: inflammatory breast cancer only — hers is non-inflammatory cT3 cN1 with no skin changes",
  "TRUDI is limited to stage III inflammatory breast cancer. Her right-breast cancer is a 5.4 cm cT3 cN1 mass with no skin changes on exam and no skin, nipple or chest-wall involvement on MRI, so the disease definition fails even though she is HER2-positive, treatment-naive, ECOG 0 with LVEF 63% and meets nearly every other entry requirement. Only clinical inflammatory change of the breast skin (cT4d) would alter this; the standard neoadjuvant TCHP pathway or a non-inflammatory neoadjuvant HER2 trial suits her better.",
  [
    {
      id: "NCT05795101-inc-1",
      status: "pass",
      rationale: "The 9/3 core biopsy shows grade 3 invasive ductal carcinoma, with FNA-proven axillary metastasis.",
      evidence: [{ quote: "A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", source: PATH }],
    },
    {
      id: "NCT05795101-inc-2",
      status: "pass",
      rationale: "Invasive ductal carcinoma is an eligible histology; all subtypes are accepted.",
      evidence: [{ quote: "Invasive ductal carcinoma, grade 3 (Nottingham 8/9)", source: PATH }],
    },
    {
      id: "NCT05795101-inc-3",
      status: "fail",
      rationale: "Her tumor is non-inflammatory: no skin changes on exam and no skin, nipple or chest-wall involvement on MRI, staged cT3 cN1 (IIIA) rather than cT4d inflammatory breast cancer.",
      evidence: [
        { quote: "R breast 5 cm firm mobile mass 10 o'clock, no skin changes, no nipple retraction.", source: NOTE },
        { quote: "No skin, nipple, pectoralis or chest wall involvement.", source: MRI },
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
      ],
    },
    {
      id: "NCT05795101-inc-4",
      status: "pass",
      rationale: "HER2 IHC 3+ on the 9/3 core biopsy is HER2-positive under ASCO/CAP; ISH is not required at 3+.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH },
        { quote: "HER2 ISH: not performed (IHC 3+)", source: PATH },
      ],
    },
    {
      id: "NCT05795101-inc-5",
      status: "pass",
      rationale: "ER 60% (moderate) and PR 20% (weak to moderate) are both known.",
      evidence: [
        { quote: "ER: positive, 60% of tumor cells, moderate intensity", source: PATH },
        { quote: "PR: positive, 20% of tumor cells, weak to moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT05795101-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No prior chemotherapy, anti-HER2 or endocrine therapy, radiotherapy or surgery for cancer. Letrozole since 9/21 is for ovarian stimulation, not cancer treatment; the sponsor should agree it does not count.",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
        { quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: MEDS },
      ],
      actionNeeded: "Confirm with the sponsor that fertility-stimulation letrozole (9/21 to ~10/5) is not counted as prior therapy",
    },
    {
      id: "NCT05795101-inc-7",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to baseline and C1D8 research biopsies is confirmed at consent; the palpable 5 cm right-breast mass is readily accessible and the 9/3 core provides archival tissue.",
    },
    {
      id: "NCT05795101-inc-8",
      status: "pass",
      rationale: "She is a 34-year-old premenopausal woman, which this criterion allows.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT05795101-inc-9",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: NOTE }],
    },
    {
      id: "NCT05795101-inc-10",
      status: "pass",
      rationale: "LVEF 63% on echo 9/17/2026; it stays within the 28-day window for enrollment up to 10/15, after which it must be repeated.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT05795101-inc-11",
      status: "unknown",
      confidence: "low",
      rationale: "Labs on 9/22 meet every listed threshold (ANC 4.1, platelets 255, Hgb 13.1, bilirubin 0.4, AST/ALT 18/21, creatinine 0.6, albumin 4.4), but INR/PT and aPTT have not been measured.",
      evidence: [
        { quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS },
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS },
        { quote: "Cr 0.6 | Na 140 | K 4.0", source: LABS },
      ],
      actionNeeded: "Obtain INR/PT and aPTT; each must be ≤ 1.5 × ULN",
    },
    {
      id: "NCT05795101-inc-12",
      status: "pass",
      confidence: "low",
      rationale: "Agreement is confirmed at screening; she currently uses condoms only, which alone does not meet the one highly effective or two effective non-hormonal methods standard.",
      evidence: [{ quote: "Contraception: condoms.", source: NOTE }],
      actionNeeded: "Counsel on a copper IUD or two non-hormonal methods for treatment and 7 months after",
    },
    {
      id: "NCT05795101-inc-13",
      status: "not-applicable",
      rationale: "Applies to male participants; she is a woman.",
    },
    {
      id: "NCT05795101-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "Curative-intent stage IIIA disease with ECOG 0; life expectancy far exceeds 12 weeks.",
      evidence: [{ quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE }],
    },
    {
      id: "NCT05795101-inc-15",
      status: "pass",
      confidence: "low",
      rationale: "Weight is not recorded, but she is a healthy, fully active adult (ECOG 0); confirm > 30 kg at screening.",
    },
    {
      id: "NCT05795101-inc-16",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and willingness to consent are confirmed at screening; nothing in the record suggests a barrier.",
    },
    {
      id: "NCT05795101-exc-1",
      status: "pass",
      rationale: "No prior chemotherapy, immunotherapy or anti-HER2 therapy; fertility-stimulation letrozole is not anti-cancer therapy.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT05795101-exc-2",
      status: "pass",
      rationale: "No surgery or radiotherapy for this cancer (biopsies do not count); the 'Oncologic hx: s/p R lumpectomy + SLNB' line is a stale template contradicted by the HPI and PSH ('none').",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
        { quote: "PSH: none.", source: NOTE },
      ],
    },
    {
      id: "NCT05795101-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "NKDA, and she has never received durvalumab, trastuzumab deruxtecan or any monoclonal antibody, so no prior reaction is possible.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: "Allergies" }],
    },
    {
      id: "NCT05795101-exc-4",
      status: "pass",
      rationale: "No major surgery (PSH none); the planned port placement and oocyte retrieval (~10/5) are minor procedures.",
      evidence: [{ quote: "PSH: none.", source: NOTE }],
    },
    {
      id: "NCT05795101-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled illness is recorded: mild intermittent asthma is stable, no cardiac history, BP 116/72 and afebrile.",
      evidence: [
        { quote: "BP 116/72 HR 74 afebrile.", source: NOTE },
        { quote: "No cardiac hx.", source: NOTE },
      ],
    },
    {
      id: "NCT05795101-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Her medicines are prn albuterol, stimulation letrozole/gonadotropins and a prenatal vitamin, with no systemic steroids or immunosuppressants; the asthma is mild and has never needed hospitalization.",
      evidence: [{ quote: "mild intermitent asthma (albuterol prn, never hospitalized)", source: NOTE }],
      actionNeeded: "Confirm no chronic systemic steroid use for asthma (> 10 mg prednisone/day) in the past 2 years",
    },
    {
      id: "NCT05795101-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune or inflammatory disorder in an otherwise complete past history, which lists only mild intermittent asthma.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT05795101-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No history of ILD or pneumonitis and lungs clear on exam; PET/CT on 9/15 showed no distant disease, though the lung parenchyma is not specifically described.",
      evidence: [{ quote: "Lungs clear.", source: NOTE }],
      actionNeeded: "Confirm no ILD/pneumonitis on screening chest CT",
    },
    {
      id: "NCT05795101-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Her asthma is mild intermittent (albuterol prn, never hospitalized), not severe; no PE, COPD, restrictive disease, effusion or pneumonectomy is recorded.",
      evidence: [{ quote: "mild intermitent asthma (albuterol prn, never hospitalized)", source: NOTE }],
    },
    {
      id: "NCT05795101-exc-10",
      status: "pass",
      rationale: "QTc 412 ms on the 9/17 ECG, well below 470 ms (correction formula not stated; repeat as QTcF at screening).",
      evidence: [{ quote: "ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", source: ECG }],
    },
    {
      id: "NCT05795101-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No heart failure (LVEF 63%), potassium 4.0, QTc 412 ms and no QT-prolonging drugs (prn albuterol carries only conditional risk); family history of long QT or sudden death is not recorded.",
      evidence: [
        { quote: "Cr 0.6 | Na 140 | K 4.0", source: LABS },
        { quote: "ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", source: ECG },
      ],
      actionNeeded: "Confirm no family history of long QT syndrome or unexplained sudden death under 40",
    },
    {
      id: "NCT05795101-exc-12",
      status: "pass",
      rationale: "No cardiac history, LVEF 63% with normal LV function, and normal sinus rhythm on ECG.",
      evidence: [
        { quote: "No cardiac hx.", source: NOTE },
        { quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO },
      ],
    },
    {
      id: "NCT05795101-exc-13",
      status: "pass",
      rationale: "LVEF 63% with normal LV size and function on echo 9/17/2026.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT05795101-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No other primary malignancy in her history. The 6 mm left-breast BI-RADS 4 focus (biopsy 9/30) is pending; if malignant, clarify how the protocol treats synchronous contralateral cancer.",
      evidence: [{ quote: "ALSO 6 mm enhancing focus L breast, BI-RADS 4 -> MRI-guided bx scheduled 9/30, result pending.", source: NOTE }],
      actionNeeded: "Review the 9/30 left-breast biopsy; discuss synchronous bilateral disease with the sponsor if malignant",
    },
    {
      id: "NCT05795101-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No venous thromboembolism is recorded; note that the ongoing ovarian stimulation raises VTE risk.",
    },
    {
      id: "NCT05795101-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No primary immunodeficiency is recorded in an otherwise complete past medical history.",
    },
    {
      id: "NCT05795101-exc-17",
      status: "unknown",
      confidence: "low",
      rationale: "Afebrile with no infection documented, but HBsAg, anti-HBc and HCV antibody drawn 9/22 are pending and TB screening is not recorded.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review HBsAg/anti-HBc/HCV Ab (HBsAg must be negative; HCV Ab+ needs negative RNA); TB screening per local practice",
    },
    {
      id: "NCT05795101-exc-18",
      status: "unknown",
      confidence: "low",
      rationale: "No known HIV infection, but an HIV Ag/Ab test drawn 9/22 is still pending; a positive result would exclude her.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review the HIV Ag/Ab result from 9/22 before enrollment",
    },
    {
      id: "NCT05795101-exc-19",
      status: "unknown",
      confidence: "low",
      rationale: "Vaccination history is not recorded; live vaccines such as MMR or varicella are sometimes given during pre-conception or fertility work-up.",
      actionNeeded: "Confirm no live vaccine in the 30 days before first dose",
    },
    {
      id: "NCT05795101-exc-20",
      status: "pass",
      confidence: "low",
      rationale: "Investigator judgment at screening; nothing in the record suggests a confounding condition (labs normal, ECOG 0).",
    },
    {
      id: "NCT05795101-exc-21",
      status: "pass",
      confidence: "medium",
      rationale: "Her medicines (prn albuterol, stimulation letrozole and gonadotropins, prenatal vitamin) include no potent CYP3A4 inhibitors or inducers or narrow-margin CYP2C9/2D6 substrates; letrozole should stop around retrieval (~10/5).",
      evidence: [{ quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: MEDS }],
      actionNeeded: "Confirm the letrozole stop date with REI and whether the sponsor applies the 2-week washout to it",
    },
    {
      id: "NCT05795101-exc-22",
      status: "pass",
      rationale: "Hydroxychloroquine is not on her medication list (albuterol, letrozole, gonadotropins, prenatal vitamin).",
      evidence: [{ quote: "albuterol HFA 2 puffs q4-6h prn wheeze", source: MEDS }],
    },
    {
      id: "NCT05795101-exc-23",
      status: "pass",
      confidence: "medium",
      rationale: "No CNS disease or neurological symptoms recorded; stage IIIA without distant metastases on PET/CT.",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: PET }],
    },
    {
      id: "NCT05795101-exc-24",
      status: "pass",
      confidence: "low",
      rationale: "Serum hCG negative on 9/22 and nulligravid (not breastfeeding); she uses condoms only, so willingness to use effective contraception through 7 months after T-DXd must be confirmed.",
      evidence: [
        { quote: "hCG (serum) negative", source: LABS },
        { quote: "Contraception: condoms.", source: NOTE },
      ],
      actionNeeded: "Repeat pregnancy test at screening (stimulation cycle ongoing) and confirm the contraception plan",
    },
  ],
);
