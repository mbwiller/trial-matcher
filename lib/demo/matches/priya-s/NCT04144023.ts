import { demoMatch } from "../../match-helpers";

const NOTE = "Consult 2026-09-23";
const PATH = "Pathology 2026-09-08";
const MRI = "MRI 2026-09-11";
const ECHO = "Echo 2026-09-17";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT04144023",
  "Excluded: DCIS-only vaccine study; she has node-positive invasive ductal carcinoma",
  "H2NVAC is given before surgery for un-resected HER2-expressing DCIS with no nodal involvement (microinvasion < 0.1 mm at most). She has a 5.4 cm grade 3 invasive ductal carcinoma with an FNA-positive axillary node, so the disease definition fails outright, even though her HER2 3+ status, ECOG 0, labs and LVEF 63% would meet the other entry requirements. She needs curative neoadjuvant systemic therapy, and no further workup would make this study appropriate.",
  [
    {
      id: "NCT04144023-inc-1",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: NOTE }],
    },
    {
      id: "NCT04144023-inc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No prior therapy for this breast cancer. Letrozole for ovarian stimulation (since 9/21, ending ~10/5) would have to stop before vaccination, as concurrent endocrine therapy is not allowed.",
      evidence: [
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE },
        { quote: "letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", source: MEDS },
      ],
    },
    {
      id: "NCT04144023-inc-3",
      status: "pass",
      rationale: "HER2 IHC 3+ on the 9/3 diagnostic core biopsy.",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: PATH }],
    },
    {
      id: "NCT04144023-inc-4",
      status: "fail",
      rationale: "Her biopsy shows grade 3 invasive ductal carcinoma (5.4 cm on MRI) with FNA-proven axillary metastasis, so this is neither DCIS nor node-negative disease.",
      evidence: [
        { quote: "A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", source: PATH },
        { quote: "B. Positive for metastatic carcinoma, c/w breast primary.", source: PATH },
      ],
    },
    {
      id: "NCT04144023-inc-5",
      status: "pass",
      rationale: "The pre-vaccination research biopsy is optional and does not affect eligibility.",
    },
    {
      id: "NCT04144023-inc-6",
      status: "pass",
      rationale: "Imaging shows 5.4 cm of disease on MRI (5.2 cm on US), well over 0.5 cm.",
      evidence: [{ quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: MRI }],
    },
    {
      id: "NCT04144023-inc-7",
      status: "pass",
      rationale: "ANC 4.1 × 10⁹/L (4,100/mm³) on 9/22, within the 28-day window.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT04144023-inc-8",
      status: "pass",
      rationale: "Platelets 255,000/mm³ on 9/22, within the 28-day window.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT04144023-inc-9",
      status: "pass",
      rationale: "Hemoglobin 13.1 g/dL on 9/22, within the 28-day window.",
      evidence: [{ quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: LABS }],
    },
    {
      id: "NCT04144023-inc-10",
      status: "pass",
      rationale: "Creatinine 0.6 mg/dL on 9/22, within normal limits.",
      evidence: [{ quote: "Cr 0.6 | Na 140 | K 4.0", source: LABS }],
    },
    {
      id: "NCT04144023-inc-11",
      status: "pass",
      rationale: "AST 18 U/L on 9/22, within normal limits.",
      evidence: [{ quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS }],
    },
    {
      id: "NCT04144023-inc-12",
      status: "pass",
      rationale: "Albumin 4.4 g/dL on 9/22.",
      evidence: [{ quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: LABS }],
    },
    {
      id: "NCT04144023-inc-13",
      status: "pass",
      confidence: "medium",
      rationale: "Serum hCG was negative on 9/22; a repeat within 7 days of registration is needed, particularly with ovarian stimulation under way.",
      evidence: [{ quote: "hCG (serum) negative", source: LABS }],
      actionNeeded: "Repeat serum hCG within 7 days before registration",
    },
    {
      id: "NCT04144023-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "She already uses condoms, a barrier method this protocol accepts; continuing through 6 months after the last vaccine is confirmed at consent.",
      evidence: [{ quote: "Contraception: condoms.", source: NOTE }],
    },
    {
      id: "NCT04144023-inc-15",
      status: "pass",
      confidence: "low",
      rationale: "Understanding of the study's nature and risks is confirmed at consent; no barrier is documented.",
    },
    {
      id: "NCT04144023-inc-16",
      status: "pass",
      confidence: "low",
      rationale: "Capacity to give informed consent is confirmed at screening; no barrier is documented.",
    },
    {
      id: "NCT04144023-inc-17",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to return for all study visits is confirmed at screening.",
    },
    {
      id: "NCT04144023-inc-18",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to give research blood samples is confirmed at screening.",
    },
    {
      id: "NCT04144023-inc-19",
      status: "pass",
      confidence: "low",
      rationale: "Tetanus vaccination history is not recorded; willingness to receive a booster is confirmed at screening.",
    },
    {
      id: "NCT04144023-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Serum hCG negative on 9/22, nulligravid and not nursing, and she uses condoms, an accepted method.",
      evidence: [
        { quote: "hCG (serum) negative", source: LABS },
        { quote: "Contraception: condoms.", source: NOTE },
      ],
    },
    {
      id: "NCT04144023-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No significant comorbidity: mild intermittent asthma only, no cardiac history and normal labs.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-3",
      status: "unknown",
      confidence: "low",
      rationale: "No steroids (inhaled albuterol only, which is permitted) and no known immunodeficiency, but the HIV Ag/Ab test drawn 9/22 is pending.",
      evidence: [{ quote: "HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", source: LABS }],
      actionNeeded: "Review the HIV Ag/Ab result from 9/22",
    },
    {
      id: "NCT04144023-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled illness: afebrile, no cardiac history, normal sinus rhythm; asthma is mild and stable.",
      evidence: [{ quote: "BP 116/72 HR 74 afebrile.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection, heart failure (LVEF 63%), myocardial infarction or stroke is recorded.",
      evidence: [
        { quote: "BP 116/72 HR 74 afebrile.", source: NOTE },
        { quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO },
      ],
    },
    {
      id: "NCT04144023-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Not receiving any investigational agent; she is treatment-naive.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy is recorded; her invasive breast cancer itself is addressed under the DCIS requirement.",
    },
    {
      id: "NCT04144023-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease or systemic immunosuppressive therapy is recorded.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "NKDA, and she has never received GM-CSF (no prior chemotherapy or growth-factor support).",
      evidence: [{ quote: "ALLERGIES: NKDA", source: "Allergies" }],
    },
    {
      id: "NCT04144023-exc-10",
      status: "pass",
      rationale: "She has never received trastuzumab or any anti-HER2 therapy.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-11",
      status: "pass",
      rationale: "Baseline LVEF 63% on echo 9/17/2026, above 55%.",
      evidence: [{ quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: ECHO }],
    },
    {
      id: "NCT04144023-exc-12",
      status: "pass",
      rationale: "She has never received chemotherapy, so there are no effects to recover from.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-13",
      status: "pass",
      rationale: "No cardiac history: no myocardial infarction, heart failure or ventricular arrhythmia; LVEF 63%.",
      evidence: [{ quote: "No cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT04144023-exc-14",
      status: "pass",
      rationale: "She has never had breast radiotherapy.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: NOTE }],
    },
  ],
);
