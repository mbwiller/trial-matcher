import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const PRIOR = "Prior pathology 2019";
const NGS = "Tissue NGS 2025-03-10";
const LABS = "Labs 2026-09-15";
const MEDS = "Medication list";

export default demoMatch(
  "NCT06790693",
  "Excluded: first-line, endocrine-sensitive only; she recurred on adjuvant AI and has had 1L therapy",
  "This first-line study requires endocrine-sensitive disease and no prior systemic therapy for advanced breast cancer. Margaret recurred in February 2025 while still on adjuvant anastrozole, so she is not endocrine-sensitive by the trial's definition, and she has already received letrozole + palbociclib for metastatic disease (March 2025 to August 2026). Her PIK3CA H1047R, HR+/HER2-low biology and organ function would otherwise fit; inavolisib is better pursued through a post-CDK4/6 inhibitor study.",
  [
    {
      id: "NCT06790693-inc-1",
      status: "pass",
      rationale: "Woman with histologically confirmed breast carcinoma: IDC of the left breast in 2019 and metastatic adenocarcinoma of breast origin on the 2025 liver biopsy.",
      evidence: [
        { quote: "IDC, grade 2 (Nottingham 6/9)", source: PRIOR },
        { quote: "Metastatic adenocarcinoma, consistent with breast primary.", source: PATH },
      ],
    },
    {
      id: "NCT06790693-inc-2",
      status: "pass",
      rationale: "ER 90% and PR 10% on the 2025 liver biopsy (ER 95%, PR 60% on the 2019 primary).",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 10% of tumor cells, weak to moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT06790693-inc-3",
      status: "pass",
      rationale: "HER2 IHC 1+ with ISH not amplified: HER2-negative by ASCO/CAP (HER2-low).",
      evidence: [{ quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH }],
    },
    {
      id: "NCT06790693-inc-4",
      status: "fail",
      rationale: "Not de novo: she relapsed in February 2025 while still on adjuvant anastrozole (started 12/2019). That is progression during adjuvant endocrine therapy, with no disease-free interval after completing it.",
      evidence: [
        { quote: "then adj anastrozole 12/2019 until recurrence", source: NOTE },
        { quote: "Feb 2025 presented w/ worsening low back pain", source: NOTE },
      ],
    },
    {
      id: "NCT06790693-inc-5",
      status: "not-applicable",
      rationale: "Permits bilateral cancers if both are HR+/HER2-; she has unilateral left breast cancer.",
      evidence: [{ quote: "hx L breast IDC dx 3/2019", source: NOTE }],
    },
    {
      id: "NCT06790693-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "PIK3CA H1047R on tissue NGS of the liver biopsy (reported 2025-03-10); confirmation on the protocol's specified assay is pending.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: NGS }],
      actionNeeded: "Confirm the 2025 NGS is acceptable or submit tissue/plasma for central PIK3CA testing.",
    },
    {
      id: "NCT06790693-inc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Archival tissue exists from the February 2025 liver core biopsy and the 2019 lumpectomy; consent to provide it is confirmed at screening.",
      evidence: [{ quote: "Collected: 2025-02-19", source: PATH }],
    },
    {
      id: "NCT06790693-inc-8",
      status: "pass",
      rationale: "Measurable liver disease on CT 2026-08-14 (segment VI 3.2 cm).",
      evidence: [{ quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: NOTE }],
    },
    {
      id: "NCT06790693-inc-9",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06790693-inc-10",
      status: "unknown",
      confidence: "medium",
      rationale: "Labs 2026-09-15 meet standard limits (ANC 2.8, platelets 210, Hgb 11.2, bilirubin 0.6, AST 34/ALT 41, creatinine 0.8) but must be repeated within 14 days of starting. The inavolisib panel also sets HbA1c < 6.0% and fasting glucose < 126 mg/dL, and HbA1c is not on file.",
      evidence: [
        { quote: "ANC 2.8 | Hgb 11.2 (L) | Plt 210", source: LABS },
        { quote: "A1c not on file, will add to next draw", source: NOTE },
      ],
      actionNeeded: "Obtain HbA1c (< 6.0%) and repeat fasting glucose (< 126 mg/dL) and chemistry within 14 days of treatment start.",
    },
    {
      id: "NCT06790693-exc-1",
      status: "not-applicable",
      rationale: "Postmenopausal (natural menopause at about 51, now 58); pregnancy and breastfeeding do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-2",
      status: "pass",
      rationale: "Invasive ductal carcinoma, with adenocarcinoma on the metastatic biopsy; no metaplastic histology reported.",
      evidence: [{ quote: "IDC, grade 2 (Nottingham 6/9)", source: PRIOR }],
    },
    {
      id: "NCT06790693-exc-3",
      status: "fail",
      rationale: "She received letrozole + palbociclib for metastatic disease from March 2025 until progression, stopping on 2026-08-20.",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: NOTE },
        { quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: MEDS },
      ],
    },
    {
      id: "NCT06790693-exc-4",
      status: "pass",
      rationale: "No diabetes on the problem list and no glucose-lowering medication; fasting glucose 104 mg/dL on 2026-09-15.",
      evidence: [
        { quote: "No DM.", source: NOTE },
        { quote: "Glucose (fasting) 104 (H)", source: LABS },
      ],
    },
    {
      id: "NCT06790693-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No history of leptomeningeal disease; no neurological symptoms and a nonfocal exam, though brain imaging has never been done.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases: asymptomatic and neurologically nonfocal, but never imaged.",
      evidence: [{ quote: "No brain MRI at this time (asymptomatic); would obtain if required for trial baseline.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No ocular inflammation, infection or uveitis recorded, and no visual symptoms.",
      evidence: [{ quote: "No HA, no visual changes, no focal weakness, no N/V.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No symptomatic lung disease: lungs clear, never smoker, and no pulmonary findings on CT 2026-08-14.",
      evidence: [
        { quote: "Lungs CTA.", source: NOTE },
        { quote: "No new pulmonary nodules.", source: "CT CAP 2026-08-14" },
      ],
    },
    {
      id: "NCT06790693-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No inflammatory bowel disease on the problem list (hypertension, hyperlipidaemia, osteopenia).",
      evidence: [{ quote: "PMH: HTN, HLD, osteopenia (DEXA 2023 T-score -1.8). No DM.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No GI symptoms or bowel inflammation documented; appetite and weight stable, no nausea or vomiting.",
      evidence: [{ quote: "Appetite ok, wt stable.", source: NOTE }],
    },
    {
      id: "NCT06790693-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or bone marrow transplant; her treatment has been surgery, ddAC-T, radiotherapy and endocrine therapy with palbociclib.",
    },
    {
      id: "NCT06790693-exc-12",
      status: "pass",
      rationale: "No strong CYP3A4 inhibitor or inducer on her medication list (denosumab, oxycodone, amlodipine, atorvastatin, calcium/vitamin D); amlodipine is at most a weak inhibitor.",
      evidence: [{ quote: "amlodipine 10 mg PO daily", source: MEDS }],
    },
  ],
);
