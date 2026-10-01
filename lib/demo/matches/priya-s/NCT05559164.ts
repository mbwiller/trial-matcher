import { demoMatch } from "../../match-helpers";

const NOTE = "Consult 2026-09-23";
const PATH = "Pathology 2026-09-08";
const PET = "PET/CT 2026-09-15";
const ECHO = "Echo 2026-09-17";
const ECG = "ECG 2026-09-17";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT05559164",
  "Meets all 14 inclusion criteria · hepatitis B/C and HIV serologies pending",
  "STACIE adds atorvastatin to HER2-targeted therapy to reduce cardiotoxicity, and she fits well: stage IIIA HER2-positive, neoadjuvant TCHP planned for the week of 10/12, no prior anthracycline or anti-HER2 therapy, LVEF 63%, ECOG 0, normal labs and no current statin. The only open item is the hepatitis B/C and HIV serologies drawn 9/22; repeat the pregnancy test before enrollment given the ongoing stimulation cycle. If she instead joins a neoadjuvant therapeutic trial, confirm co-enrollment is permitted, and check whether an NK1-antagonist antiemetic (a CYP3A4 inhibitor) is allowed.",
  [
    {
      id: "NCT05559164-inc-1",
      status: "pass",
      rationale: "Biopsy-confirmed invasive ductal carcinoma of the right breast in a woman, clinical stage IIIA (cT3 cN1 M0).",
      evidence: [
        { quote: "A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", source: PATH },
        { quote: "cT3 cN1 M0, clinical stage IIIA, treatment-naive", source: NOTE },
      ],
    },
    {
      id: "NCT05559164-inc-2",
      status: "pass",
      confidence: "medium",
      rationale: "Neoadjuvant TCHP (trastuzumab + pertuzumab) is the documented plan, targeted for the week of 10/12 and to be finalised 10/7; the trial alternatives she is considering are also HER2-directed.",
      evidence: [
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE },
        { quote: "Wants to start neoadj tx wk of 10/12.", source: NOTE },
      ],
    },
    {
      id: "NCT05559164-inc-3",
      status: "pass",
      rationale: "She is 34 years old.",
      evidence: [{ quote: "34 yo premenopausal F, G0", source: NOTE }],
    },
    {
      id: "NCT05559164-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Serum hCG was negative on 9/22 and she already uses condoms, a barrier method; with ovarian stimulation under way the test should be repeated close to enrollment.",
      evidence: [
        { quote: "hCG (serum) negative", source: LABS },
        { quote: "Contraception: condoms.", source: NOTE },
      ],
      actionNeeded: "Repeat pregnancy test immediately before enrollment",
    },
    {
      id: "NCT05559164-inc-5",
      status: "pass",
      rationale: "Baseline LVEF 63% with normal LV size and function on echo 9/17/2026.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT05559164-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No prior cancer is recorded; her past history lists only mild intermittent asthma.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT05559164-inc-7",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: NOTE }],
    },
    {
      id: "NCT05559164-inc-8",
      status: "pass",
      rationale: "No prior anti-HER2 therapy or chemotherapy of any kind, and the planned TCHP regimen is anthracycline-free.",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery", source: NOTE },
      ],
    },
    {
      id: "NCT05559164-inc-9",
      status: "pass",
      rationale: "Bone marrow function is normal on 9/22: ANC 4.1, platelets 255, hemoglobin 13.1.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT05559164-inc-10",
      status: "pass",
      rationale: "ANC 4.1 × 10⁹/L (≥ 1,000/µL), platelets 255,000/µL and hemoglobin 13.1 g/dL on 9/22.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT05559164-inc-11",
      status: "pass",
      rationale: "Total bilirubin 0.4 mg/dL, AST 18 and ALT 21 on 9/22, all within normal limits.",
      evidence: [{ quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS }],
    },
    {
      id: "NCT05559164-inc-12",
      status: "pass",
      rationale: "Creatinine 0.6 mg/dL on 9/22, below 1.5 × ULN.",
      evidence: [{ quote: "Cr 0.6 | Na 140 | K 4.0", source: LABS }],
    },
    {
      id: "NCT05559164-inc-13",
      status: "pass",
      confidence: "low",
      rationale: "Ability to understand and consent is confirmed at screening; no barrier is documented.",
    },
    {
      id: "NCT05559164-inc-14",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to comply with visits and tests is confirmed at screening; she is engaged in treatment planning.",
    },
    {
      id: "NCT05559164-exc-1",
      status: "pass",
      rationale: "Stage IIIA; PET/CT on 9/15 shows no distant metastases.",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: PET }],
    },
    {
      id: "NCT05559164-exc-2",
      status: "pass",
      rationale: "No statin on her medication list (albuterol prn, letrozole and gonadotropins for stimulation, prenatal vitamin).",
      evidence: [
        { quote: "albuterol HFA 2 puffs q4-6h prn wheeze", source: MEDS },
        { quote: "prenatal vitamin PO daily", source: MEDS },
      ],
    },
    {
      id: "NCT05559164-exc-3",
      status: "pass",
      rationale: "BP 116/72 at the 9/23 consult, far below 190/100.",
      evidence: [{ quote: "BP 116/72 HR 74 afebrile.", source: NOTE }],
    },
    {
      id: "NCT05559164-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No active liver disease: no liver history and AST 18, ALT 21, bilirubin 0.4, alkaline phosphatase 62 on 9/22 are normal; hepatitis B/C serologies are pending.",
      evidence: [
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS },
        { quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS },
      ],
      actionNeeded: "Review the pending hepatitis B/C serologies",
    },
    {
      id: "NCT05559164-exc-5",
      status: "pass",
      rationale: "None of her current medicines (albuterol, letrozole, gonadotropins, prenatal vitamin) is a CYP3A4 inhibitor.",
      evidence: [{ quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: MEDS }],
      actionNeeded: "Check whether aprepitant/fosaprepitant (a moderate CYP3A4 inhibitor) for TCHP antiemesis is permitted",
    },
    {
      id: "NCT05559164-exc-6",
      status: "pass",
      confidence: "low",
      rationale: "Investigator judgment at screening; labs are normal and nothing in the record suggests unacceptable risk.",
    },
    {
      id: "NCT05559164-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Curative-intent stage IIIA disease with ECOG 0; life expectancy far exceeds 12 weeks.",
      evidence: [{ quote: "Curative intent.", source: NOTE }],
    },
    {
      id: "NCT05559164-exc-8",
      status: "pass",
      rationale: "Serum hCG negative on 9/22, and she is nulligravid, so not lactating.",
      evidence: [
        { quote: "hCG (serum) negative", source: LABS },
        { quote: "34 yo premenopausal F, G0", source: NOTE },
      ],
    },
    {
      id: "NCT05559164-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No neuropathy is recorded, and she has had no prior neurotoxic chemotherapy.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT05559164-exc-10",
      status: "pass",
      rationale: "No significant cardiovascular disease: no cardiac history, LVEF 63%, normal sinus rhythm and BP 116/72.",
      evidence: [
        { quote: "No cardiac hx.", source: NOTE },
        { quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO },
      ],
    },
    {
      id: "NCT05559164-exc-11",
      status: "pass",
      rationale: "LVEF 63% on echo, no myocardial disease or recent infarction, and normal sinus rhythm on the 9/17 ECG.",
      evidence: [
        { quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO },
        { quote: "ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", source: ECG },
      ],
    },
    {
      id: "NCT05559164-exc-12",
      status: "pass",
      rationale: "No major surgery (PSH none); port placement and oocyte retrieval (~10/5) are minor procedures.",
      evidence: [{ quote: "PSH: none.", source: NOTE }],
    },
    {
      id: "NCT05559164-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "Afebrile, with no active infection recorded.",
      evidence: [{ quote: "BP 116/72 HR 74 afebrile.", source: NOTE }],
    },
    {
      id: "NCT05559164-exc-14",
      status: "unknown",
      confidence: "low",
      rationale: "No known HIV or viral hepatitis, but HBsAg, anti-HBc, HCV antibody and HIV Ag/Ab drawn 9/22 are all pending.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review HBsAg, anti-HBc, HCV Ab and HIV Ag/Ab from 9/22; active or uncontrolled HBV, HCV or HIV excludes",
    },
    {
      id: "NCT05559164-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "NKDA recorded; no known allergy to atorvastatin or other statins.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: "Allergies" }],
    },
    {
      id: "NCT05559164-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD, sarcoidosis or progressive dyspnoea recorded and lungs clear on exam; mild intermittent asthma is not an interstitial lung disease.",
      evidence: [
        { quote: "Lungs clear.", source: NOTE },
        { quote: "mild intermitent asthma (albuterol prn, never hospitalized)", source: NOTE },
      ],
    },
    {
      id: "NCT05559164-exc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No significant medical, laboratory or psychiatric barrier: mild intermittent asthma only, normal labs, ECOG 0.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
  ],
);
