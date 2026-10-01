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
  "NCT04886531",
  "Excluded: postmenopausal women only — she is 34 and premenopausal (LMP 9/8/2026)",
  "This pre-operative neratinib + aromatase inhibitor + trastuzumab study is restricted to postmenopausal women. She is 34 with regular cycles (LMP 9/8) and mid ovarian stimulation, so she meets none of the postmenopausal definitions, and an aromatase inhibitor without ovarian suppression would not be appropriate for her. Her tumor otherwise fits well (ER 60%, HER2 3+, stage IIIA below the IIIC cut-off, operable, LVEF 63%); only bilateral oophorectomy would change this, which conflicts with her wish for biological children.",
  [
    {
      id: "NCT04886531-inc-1",
      status: "not-applicable",
      rationale: "Sentence fragment from the inclusion preamble ('… to participate in this study'); it carries no requirement of its own.",
    },
    {
      id: "NCT04886531-inc-2",
      status: "pass",
      confidence: "low",
      rationale: "Written consent and HIPAA authorisation are obtained at screening; no barrier is documented.",
    },
    {
      id: "NCT04886531-inc-3",
      status: "pass",
      rationale: "She is 34 years old (DOB 1992).",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT04886531-inc-4",
      status: "fail",
      rationale: "Premenopausal: age 34 with regular cycles (LMP 9/8/2026), no oophorectomy, and currently in an ovarian stimulation cycle, so she meets none of the postmenopausal definitions.",
      evidence: [
        { quote: "34 yo premenopausal F, G0", source: NOTE },
        { quote: "LMP 9/8/2026.", source: NOTE },
      ],
    },
    {
      id: "NCT04886531-inc-5",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult, within 28 days of any near-term registration.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: NOTE }],
    },
    {
      id: "NCT04886531-inc-6",
      status: "pass",
      rationale: "Clinical stage IIIA invasive ductal carcinoma measuring 5.4 cm on MRI (> 10 mm).",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI },
      ],
    },
    {
      id: "NCT04886531-inc-7",
      status: "pass",
      rationale: "HER2 IHC 3+, positive under current ASCO/CAP criteria.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH }],
    },
    {
      id: "NCT04886531-inc-8",
      status: "pass",
      rationale: "ER 60% with moderate intensity, above the 10% threshold (PR 20%).",
      evidence: [{ quote: "ER: positive, 60% of tumor cells, moderate intensity", source: PATH }],
    },
    {
      id: "NCT04886531-inc-9",
      status: "pass",
      rationale: "Operable cT3 cN1 disease with no skin or chest-wall involvement and mobile nodes; neoadjuvant therapy is the documented plan.",
      evidence: [
        { quote: "No skin, nipple, pectoralis or chest wall involvement.", source: MRI },
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE },
      ],
    },
    {
      id: "NCT04886531-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Pre-treatment diagnostic core biopsy tissue from 9/3 exists; availability of the block for shipment is not yet confirmed.",
      evidence: [{ quote: "Specimen: A. Right breast 10 o'clock, US-guided core biopsy; B. Right axillary lymph node, FNA", source: PATH }],
      actionNeeded: "Confirm the 9/3 core biopsy block can be released and shipped by week 4",
    },
    {
      id: "NCT04886531-inc-11",
      status: "pass",
      confidence: "low",
      rationale: "Agreement to a week-3 repeat breast biopsy is confirmed at consent; the palpable 5 cm mass is readily accessible.",
    },
    {
      id: "NCT04886531-inc-12",
      status: "fail",
      confidence: "medium",
      rationale: "With active ovarian function at 34, an aromatase inhibitor alone would not be appropriate without ovarian suppression, which this protocol does not include.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT04886531-inc-13",
      status: "pass",
      rationale: "LVEF 63% on echo 9/17/2026; valid for a treatment start up to 10/15, otherwise repeat.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT04886531-inc-14",
      status: "pass",
      rationale: "Labs 9/22: platelets 255, ANC 4.1, Hgb 13.1, bilirubin 0.4, AST 18, ALT 21; creatinine 0.6 gives CrCl well above 30 mL/min at any adult weight (weight not recorded). Valid for registration to 10/20.",
      evidence: [
        { quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS },
        { quote: "Cr 0.6 | Na 140 | K 4.0", source: LABS },
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS },
      ],
    },
    {
      id: "NCT04886531-inc-15",
      status: "unknown",
      confidence: "low",
      rationale: "No known HIV infection, but the HIV Ag/Ab test drawn 9/22 is pending; if positive, effective ART with undetectable viral load would be required.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review the HIV Ag/Ab result; if positive, document effective ART and undetectable viral load within 6 months",
    },
    {
      id: "NCT04886531-inc-16",
      status: "unknown",
      confidence: "low",
      rationale: "No known hepatitis, but HBsAg, anti-HBc and HCV antibody drawn 9/22 are pending.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review HBV/HCV serologies; chronic HBV needs undetectable viral load and HCV must be treated and cured",
    },
    {
      id: "NCT04886531-inc-17",
      status: "pass",
      confidence: "low",
      rationale: "Ability to comply is judged by the enrolling physician; she is fully active and engaged in treatment planning.",
    },
    {
      id: "NCT04886531-exc-1",
      status: "pass",
      rationale: "Stage IIIA, below the IIIC threshold for locally advanced, with no skin changes or inflammatory features.",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
        { quote: "R breast 5 cm firm mobile mass 10 o'clock, no skin changes, no nipple retraction.", source: NOTE },
      ],
    },
    {
      id: "NCT04886531-exc-2",
      status: "pass",
      rationale: "PET/CT on 9/15 shows no distant metastases.",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: PET }],
    },
    {
      id: "NCT04886531-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No prior or concurrent non-breast malignancy is recorded; the 6 mm left-breast BI-RADS 4 focus (biopsy 9/30) is still pending.",
      evidence: [{ quote: "ALSO 6 mm enhancing focus L breast, BI-RADS 4 -> MRI-guided bx scheduled 9/30, result pending.", source: NOTE }],
      actionNeeded: "Review the 9/30 left-breast biopsy result",
    },
    {
      id: "NCT04886531-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Afebrile, with no infection or antibiotic use recorded.",
      evidence: [{ quote: "BP 116/72 HR 74 afebrile.", source: NOTE }],
    },
    {
      id: "NCT04886531-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Her medicines (prn albuterol, stimulation letrozole and gonadotropins, prenatal vitamin) include no moderate or strong CYP3A4 inhibitors or inducers.",
      evidence: [{ quote: "albuterol HFA 2 puffs q4-6h prn wheeze", source: MEDS }],
    },
    {
      id: "NCT04886531-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational drug has been given; she is treatment-naive.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04886531-exc-7",
      status: "pass",
      rationale: "No major surgery (PSH none); port placement and oocyte retrieval (~10/5) are minor procedures.",
      evidence: [{ quote: "PSH: none.", source: NOTE }],
    },
    {
      id: "NCT04886531-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disease is recorded, and she already takes oral tablets (letrozole, prenatal vitamin).",
      evidence: [{ quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: MEDS }],
    },
    {
      id: "NCT04886531-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No history of MDS or AML; blood counts are normal (ANC 4.1, Hgb 13.1, platelets 255).",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT04886531-exc-10",
      status: "not-applicable",
      rationale: "Heading for the conditions listed in the following criteria; it carries no requirement of its own.",
    },
    {
      id: "NCT04886531-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No abdominal fistula, perforation or abscess is recorded; abdomen benign on exam.",
      evidence: [{ quote: "Abd benign.", source: NOTE }],
    },
    {
      id: "NCT04886531-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No stroke or TIA in her past history, which lists only mild intermittent asthma.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT04886531-exc-13",
      status: "pass",
      rationale: "No cardiac history, so no acute coronary syndrome, revascularisation or pericarditis.",
      evidence: [{ quote: "No cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT04886531-exc-14",
      status: "pass",
      rationale: "LVEF 63% with normal LV function; no heart failure.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT04886531-exc-15",
      status: "pass",
      rationale: "Normal sinus rhythm on the 9/17 ECG and no cardiac history.",
      evidence: [{ quote: "ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", source: ECG }],
    },
    {
      id: "NCT04886531-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "QTc 412 ms with no cardiac history; the family history (mother's breast cancer) records no sudden death or long QT.",
      evidence: [
        { quote: "ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", source: ECG },
        { quote: "FHx: mother breast ca at 52 (alive). No known ovarian ca.", source: NOTE },
      ],
      actionNeeded: "Confirm no family history of sudden death or congenital long QT",
    },
    {
      id: "NCT04886531-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No severe or uncontrolled condition: mild intermittent asthma only, normal labs and ECOG 0.",
      evidence: [{ quote: "mild intermitent asthma (albuterol prn, never hospitalized)", source: NOTE }],
    },
  ],
);
