import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const NGS = "Tissue NGS 2025-02-12";
const MEDS = "Medications";
const ALLERGY = "Allergies";

export default demoMatch(
  "NCT05216432",
  "Excluded: requires a PIK3CA mutation; his tumor is PIK3CA wild-type on 2025 NGS",
  "RLY-2608 is a mutant-selective PI3Kα inhibitor and every arm requires a documented PIK3CA mutation; tissue NGS of his lung metastasis (February 2025) found none. As a man with HR+/HER2-low disease after a CDK4/6 inhibitor he would otherwise be screened for the RLY-2608 + fulvestrant doublet, where the prior-therapy rule would also expect a PARP inhibitor first given his germline BRCA2. Only a PIK3CA mutation on new tissue or ctDNA would reopen this.",
  [
    {
      id: "NCT05216432-inc-1",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT05216432-inc-2",
      status: "fail",
      rationale: "Tissue NGS of the lung metastasis (reported 2025-02-12) found no PIK3CA alteration, and no later blood or tumor test shows one.",
      evidence: [{ quote: "PIK3CA: no alterations detected (wild-type)", source: NGS }],
    },
    {
      id: "NCT05216432-inc-3",
      status: "not-applicable",
      rationale: "No PIK3CA variant of any kind was detected, so the sponsor-approval route for non-canonical PIK3CA mutations does not arise.",
      evidence: [{ quote: "PIK3CA: no alterations detected (wild-type)", source: NGS }],
    },
    {
      id: "NCT05216432-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Archival tissue exists from the January 2025 CT-guided lung core biopsy, already used for NGS; adequacy of the remaining tissue is confirmed at screening.",
      evidence: [{ quote: "Specimen: Lung, left lower lobe nodule, CT-guided core biopsy", source: PATH }],
    },
    {
      id: "NCT05216432-inc-5",
      status: "not-applicable",
      rationale: "Header for the single-agent arm; as a man with HR+/HER2-low breast cancer he would be screened for the fulvestrant combination arms instead.",
    },
    {
      id: "NCT05216432-inc-6",
      status: "not-applicable",
      rationale: "Single-agent escalation criterion; he would enter a combination arm.",
    },
    {
      id: "NCT05216432-inc-7",
      status: "not-applicable",
      rationale: "Single-agent expansion criterion; he would enter a combination arm (he does have RECIST-measurable chest disease).",
    },
    {
      id: "NCT05216432-inc-8",
      status: "not-applicable",
      rationale: "Single-agent arm requirement (refractory to or declined standard therapy); not his arm, and standard PARP inhibitor therapy remains available to him.",
    },
    {
      id: "NCT05216432-inc-9",
      status: "not-applicable",
      rationale: "Single-agent Part 1 criterion; he would be considered for the breast cancer combination arms.",
    },
    {
      id: "NCT05216432-inc-10",
      status: "not-applicable",
      rationale: "Single-agent Part 2 tumor-type criterion; not his arm, and he has no PIK3CA mutation in any case.",
    },
    {
      id: "NCT05216432-inc-11",
      status: "not-applicable",
      rationale: "Single-agent expansion groups (non-breast tumor types and PIK3CA double mutants); not applicable to him.",
    },
    {
      id: "NCT05216432-inc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Header for the combination arms, which enroll HR+/HER2- breast cancer; as a man with HR+/HER2-low metastatic disease he would be screened here.",
    },
    {
      id: "NCT05216432-inc-13",
      status: "pass",
      rationale: "Evaluable (and measurable) disease: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT05216432-inc-14",
      status: "not-applicable",
      rationale: "Header for the triplet arms; after progressing on a CDK4/6 inhibitor he would be screened for the RLY-2608 + fulvestrant doublet.",
    },
    {
      id: "NCT05216432-inc-15",
      status: "not-applicable",
      rationale: "Triplet-arm criterion; he would enter the doublet arm (he does have evaluable disease).",
    },
    {
      id: "NCT05216432-inc-16",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 criterion; not his cohort.",
    },
    {
      id: "NCT05216432-inc-17",
      status: "pass",
      rationale:
        "Man with HR+ (ER 85%, PR 30%), HER2-negative by ASCO/CAP (IHC 1+, ISH not amplified) metastatic breast cancer not amenable to cure; he is already on leuprolide, the GnRH agonist recommended for men.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "leuprolide 22.5 mg IM q3 months (last 08/14/2026)", source: MEDS },
      ],
    },
    {
      id: "NCT05216432-inc-18",
      status: "fail",
      confidence: "medium",
      rationale:
        "He meets ≤ 1 metastatic chemotherapy line, prior CDK4/6 inhibitor and prior antiestrogen, but carries a germline BRCA2 variant and has not had a PARP inhibitor, which his oncologist considers standard second line.",
      evidence: [
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
        { quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE },
      ],
    },
    {
      id: "NCT05216432-inc-19",
      status: "not-applicable",
      rationale:
        "Applies to doublet Part 2 Group 2 (prior PI3Kα/AKT/mTOR inhibitor stopped for intolerance); he has never had one and would enter another doublet cohort.",
    },
    {
      id: "NCT05216432-inc-20",
      status: "not-applicable",
      rationale: "Triplet escalation criterion about prior PI3Kα/AKT/mTOR inhibitors; not his arm, and he has had none.",
    },
    {
      id: "NCT05216432-inc-21",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 criterion; not his cohort, and he has no PIK3CA mutation.",
    },
    {
      id: "NCT05216432-inc-22",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 criterion; not his cohort (he did recur during adjuvant tamoxifen, which would otherwise satisfy it).",
      evidence: [{ quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE }],
    },
    {
      id: "NCT05216432-inc-23",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 criterion; he received no CDK4/6 inhibitor in the adjuvant setting.",
    },
    {
      id: "NCT05216432-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No PI3Kα, AKT or mTOR inhibitor appears in his treatment history (tamoxifen, ddAC-T, then letrozole + leuprolide + abemaciclib).",
    },
    {
      id: "NCT05216432-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No immune checkpoint inhibitor appears in his otherwise complete treatment history.",
    },
    {
      id: "NCT05216432-exc-3",
      status: "not-applicable",
      rationale: "Header for exclusions specific to triplet Part 2 Group 2; not his cohort.",
    },
    {
      id: "NCT05216432-exc-4",
      status: "not-applicable",
      rationale:
        "Applies to triplet Part 2 Group 2 only. He would be excluded from that cohort by prior abemaciclib for metastatic disease, which is why the doublet arm is the relevant one.",
      evidence: [{ quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE }],
    },
    {
      id: "NCT05216432-exc-5",
      status: "pass",
      rationale: "Fulvestrant is explicitly recorded as never given, and no other SERD appears in his treatment history.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT05216432-exc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "No diabetes and no antihyperglycemic drugs, but fasting glucose and HbA1c are not in the record.",
      evidence: [{ quote: "No VTE. No DM.", source: NOTE }],
      actionNeeded: "Obtain fasting plasma glucose and HbA1c; FPG ≥ 140 mg/dL with HbA1c ≥ 7.0% excludes",
    },
    {
      id: "NCT05216432-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No known drug allergies; he has never received a PI3K inhibitor or fulvestrant and tolerated a CDK4/6 inhibitor for about 19 months.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: ALLERGY }],
    },
    {
      id: "NCT05216432-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD or pneumonitis history, and CT 2026-09-11 describes no interstitial disease; the mild dry cough accompanies the progressing chest lesions.",
      evidence: [{ quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE }],
    },
    {
      id: "NCT05216432-exc-9",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG or QTc is documented, and leuprolide (androgen deprivation) can lengthen the QT interval.",
      actionNeeded: "Obtain 12-lead ECG; mean QTc ≤ 460 ms required (QTcF < 450 ms for the ribociclib triplet)",
    },
    {
      id: "NCT05216432-exc-10",
      status: "pass",
      rationale:
        "No headache, visual change or focal weakness and a nonfocal exam, so there is no symptomatic CNS disease even though the brain has not been imaged.",
      evidence: [{ quote: "No HA, visual change or focal weakness. Has never had brain imaging.", source: NOTE }],
    },
  ],
);
