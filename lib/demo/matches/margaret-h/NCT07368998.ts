import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07368998",
  "Meets all 7 inclusion criteria · no exclusion triggered · HbA1c still to be drawn",
  "A post-CDK4/6i inavolisib + fulvestrant study that matches her situation: ER+/HER2-low, PIK3CA H1047R, one prior line for metastatic disease (letrozole + palbociclib, progression on CT 2026-08-14), measurable liver disease, and no chemotherapy or PI3K-pathway inhibitor for advanced disease. She is not diabetic (fasting glucose 104 mg/dL), but HbA1c has never been measured and will be needed before any PI3K inhibitor; an echocardiogram and ECG are also not on file if the full protocol asks for them. Both arms give inavolisib, at one of two dose levels.",
  [
    {
      id: "NCT07368998-inc-1",
      status: "pass",
      rationale: "ER 90% strong and HER2 IHC 1+ with ISH not amplified on the 2025 liver biopsy: ER-positive and HER2-negative (HER2-low) by ASCO/CAP.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: "Liver pathology 2025-02-24" },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: "Liver pathology 2025-02-24" },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.2, mean HER2 copy number 2.1)", source: "Liver pathology 2025-02-24" },
      ],
    },
    {
      id: "NCT07368998-inc-2",
      status: "pass",
      rationale: "Progressed on letrozole + palbociclib (liver PD on CT 2026-08-14), her only line for metastatic disease; adjuvant anastrozole was given for early breast cancer, outside the metastatic setting.",
      evidence: [
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: "Clinic note 2026-09-18" },
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07368998-inc-3",
      status: "pass",
      rationale: "Measurable liver disease per RECIST v1.1: segment VI lesion 3.2 cm and segment IV lesion 1.8 cm on CT 2026-08-14.",
      evidence: [
        { quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: "CT CAP 2026-08-14" },
        { quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07368998-inc-4",
      status: "pass",
      rationale: "Her oncologist's second-line plan is endocrine-based (capivasertib or alpelisib with fulvestrant); no visceral crisis, with bilirubin 0.6 and AST/ALT 34/41 despite liver metastases.",
      evidence: [
        { quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: "Clinic note 2026-09-18" },
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: "Labs 2026-09-15" },
      ],
    },
    {
      id: "NCT07368998-inc-5",
      status: "pass",
      rationale: "PIK3CA H1047R, a canonical hotspot on PIK3CA eligibility lists, was found on tissue NGS of the 2025 liver biopsy.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: "Tissue NGS 2025-03-10" }],
    },
    {
      id: "NCT07368998-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Life expectancy is not stated, but ECOG 1, preserved liver function (bilirubin 0.6, albumin 3.9) and stable bone disease support > 6 months.",
      evidence: [{ quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: "Labs 2026-09-15" }],
    },
    {
      id: "NCT07368998-inc-7",
      status: "pass",
      confidence: "low",
      rationale: "She is interested in trials; ability and willingness to comply, including patient-reported outcomes, is confirmed at screening.",
      evidence: [{ quote: "Pt interested in trials, wants to hear options before deciding.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07368998-exc-1",
      status: "pass",
      rationale: "Histology is invasive ductal carcinoma (primary, 2019) and metastatic adenocarcinoma of breast origin on the liver biopsy; not metaplastic.",
      evidence: [
        { quote: "IDC, grade 2 (Nottingham 6/9)", source: "Prior pathology 2019" },
        { quote: "Metastatic adenocarcinoma, consistent with breast primary.", source: "Liver pathology 2025-02-24" },
      ],
    },
    {
      id: "NCT07368998-exc-2",
      status: "pass",
      rationale: "Her only chemotherapy was adjuvant ddAC-T in 2019; she has had none since the metastatic recurrence in February 2025.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07368998-exc-3",
      status: "pass",
      rationale: "No diabetes of either type and no antihyperglycemic medication; fasting glucose 104 mg/dL on 2026-09-15.",
      evidence: [
        { quote: "No DM.", source: "Clinic note 2026-09-18" },
        { quote: "Glucose (fasting) 104 (H)", source: "Labs 2026-09-15" },
      ],
    },
    {
      id: "NCT07368998-exc-4",
      status: "pass",
      rationale: "No PI3K, AKT or mTOR inhibitor for metastatic disease; capivasertib and alpelisib are only now being discussed as options.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07368998-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No home oxygen on the medication list or in the history; lungs clear on exam and she manages her own shopping and housework.",
      evidence: [{ quote: "Lungs CTA.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07368998-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No lung disease or pneumonitis recorded; never smoker, lungs clear, and CT 2026-08-14 shows no new pulmonary findings.",
      evidence: [
        { quote: "Lungs CTA.", source: "Clinic note 2026-09-18" },
        { quote: "No new pulmonary nodules. No adenopathy.", source: "CT CAP 2026-08-14" },
      ],
    },
  ],
);
