import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06757634",
  "Excluded: first-line only, and she has had letrozole + palbociclib for metastatic disease",
  "VIKTORIA-2 is a first-line study: it excludes any prior systemic therapy for advanced disease and allows CDK4/6 inhibitor exposure only in the (neo)adjuvant setting without early progression. Margaret received first-line letrozole + palbociclib from March 2025 and progressed on it (liver PD on CT 2026-08-14, stopped 2026-08-20), so she is excluded on documented treatment history. Her biology otherwise fits (HR+/HER2-low, PIK3CA H1047R, measurable liver disease, ECOG 1), but no outstanding test would change the answer.",
  [
    {
      id: "NCT06757634-inc-1",
      status: "pass",
      rationale: "Liver core biopsy (2025-02-19) confirmed metastatic breast adenocarcinoma, ER 90%, HER2 IHC 1+/ISH not amplified; HER2-low counts as HER2-negative here.",
      evidence: [
        { quote: "Metastatic adenocarcinoma, consistent with breast primary.", source: "Liver pathology 2025-02-24" },
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: "Liver pathology 2025-02-24" },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: "Liver pathology 2025-02-24" },
      ],
    },
    {
      id: "NCT06757634-inc-2",
      status: "pass",
      rationale: "Adult woman, 58, postmenopausal after natural menopause at about 51; the LHRH-agonist requirement for premenopausal women does not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06757634-inc-3",
      status: "not-applicable",
      rationale: "Not of childbearing potential: 58 years old and postmenopausal since natural menopause at about 51, so pregnancy testing and contraception rules do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06757634-inc-4",
      status: "pass",
      rationale: "Metastatic recurrence in February 2025 occurred while still on adjuvant anastrozole (started 12/2019), i.e. progression during (neo)adjuvant endocrine therapy.",
      evidence: [
        { quote: "then adj anastrozole 12/2019 until recurrence", source: "Clinic note 2026-09-18" },
        { quote: "Feb 2025 presented w/ worsening low back pain", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06757634-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "PIK3CA status was established on tissue NGS of the 2025 liver core biopsy; residual block availability is not stated, but a liquid biopsy is also acceptable.",
      evidence: [{ quote: "MOLECULAR - Tissue NGS (liver core bx), reported 2025-03-10:", source: "Tissue NGS 2025-03-10" }],
      actionNeeded: "Confirm the 2025 liver core block is available for central PIK3CA testing, or send a ctDNA sample",
    },
    {
      id: "NCT06757634-inc-6",
      status: "fail",
      rationale: "Her only CDK4/6 inhibitor was palbociclib given for metastatic disease, with liver progression on it (CT 2026-08-14); permitted CDK4/6i exposure is (neo)adjuvant only, without progression on or within 6 months.",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: "Clinic note 2026-09-18" },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06757634-inc-7",
      status: "pass",
      rationale: "RECIST-measurable liver disease: segment VI lesion 3.2 cm and a new 1.8 cm segment IV lesion on CT 2026-08-14; she is not bone-only.",
      evidence: [
        { quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: "CT CAP 2026-08-14" },
        { quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT06757634-inc-8",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit, within the 0–2 range.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06757634-inc-9",
      status: "pass",
      confidence: "medium",
      rationale: "Life expectancy is not stated, but ECOG 1, liver-dominant disease with normal bilirubin (0.6) and albumin 3.9, and stable bone disease support > 6 months.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: "Labs 2026-09-15" }],
    },
    {
      id: "NCT06757634-inc-10",
      status: "unknown",
      confidence: "medium",
      rationale: "Labs 2026-09-15 are adequate: ANC 2.8, platelets 210, Hgb 11.2, Cr 0.8 (CrCl ~86 mL/min), AST 34, ALT 41, bilirubin 0.6. No PT/INR or aPTT is on file for the coagulation requirement.",
      evidence: [
        { quote: "WBC 5.1 | ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: "Labs 2026-09-15" },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: "Labs 2026-09-15" },
        { quote: "Cr 0.8 | Na 139 | K 4.1", source: "Labs 2026-09-15" },
      ],
      actionNeeded: "Obtain PT/INR and aPTT (typically ≤ 1.5 × ULN) and repeat CBC/CMP within the screening window",
    },
    {
      id: "NCT06757634-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy is recorded in the history, PMH or family/germline sections; breast cancer is her only cancer diagnosis.",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06757634-exc-2",
      status: "pass",
      rationale: "No PI3K, AKT or mTOR inhibitor or oral SERD in her treatment history; capivasertib and alpelisib are being discussed as future second-line options.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT06757634-exc-3",
      status: "fail",
      rationale: "She has had systemic therapy for advanced disease: first-line letrozole + palbociclib from March 2025 until progression, discontinued 2026-08-20.",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: "Clinic note 2026-09-18" },
        { quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: "Medications" },
      ],
    },
    {
      id: "NCT06757634-exc-4",
      status: "pass",
      rationale: "No diabetes on the problem list and fasting glucose was 104 mg/dL on 2026-09-15; she takes no insulin.",
      evidence: [
        { quote: "No DM.", source: "Clinic note 2026-09-18" },
        { quote: "Glucose (fasting) 104 (H)", source: "Labs 2026-09-15" },
      ],
    },
    {
      id: "NCT06757634-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No known brain or leptomeningeal metastases and no neurological symptoms, but she has never had brain imaging.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: "Clinic note 2026-09-18" }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging",
    },
    {
      id: "NCT06757634-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Only controlled hypertension (amlodipine, BP 132/78) is recorded; no other cardiac history. She received doxorubicin in 2019 and has had no echo since.",
      evidence: [
        { quote: "HTN - amlodipine, controlled.", source: "Clinic note 2026-09-18" },
        { quote: "Echo: last TTE was pre-AC 2019 (LVEF 62%).", source: "Clinic note 2026-09-18" },
      ],
      actionNeeded: "Obtain ECG and echocardiogram at screening given prior anthracycline",
    },
    {
      id: "NCT06757634-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No eye disease on the problem list and she reports no visual changes; no ophthalmology history is mentioned.",
      evidence: [{ quote: "no visual changes", source: "Clinic note 2026-09-18" }],
      actionNeeded: "Confirm no significant ophthalmic history at screening",
    },
    {
      id: "NCT06757634-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis or drug-induced hepatitis is recorded; lungs are clear, CT 2026-08-14 shows no new pulmonary findings, and AST/ALT/bilirubin are normal.",
      evidence: [
        { quote: "Lungs CTA.", source: "Clinic note 2026-09-18" },
        { quote: "No new pulmonary nodules. No adenopathy.", source: "CT CAP 2026-08-14" },
      ],
    },
  ],
);
