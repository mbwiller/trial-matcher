import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const NGS = "Tissue NGS 2025-03-10";
const CT = "CT CAP 2026-08-14";
const LABS = "Labs 2026-09-15";

export default demoMatch(
  "NCT05216432",
  "Fits the RLY-2608 + fulvestrant doublet · ECG/QTc not on file; confirm a doublet slot is open",
  "As a PI3K-inhibitor-naive patient with HR+/HER2-low metastatic breast cancer, PIK3CA H1047R and progression on letrozole + palbociclib, she fits the RLY-2608 + fulvestrant doublet (Part 1 escalation or a PI3K-inhibitor-naive expansion group, whichever is enrolling); single-agent and triplet-arm criteria do not apply. She meets the prior-therapy requirements (one CDK4/6 inhibitor, antiestrogen therapy, no metastatic chemotherapy, no PI3K/AKT/mTOR inhibitor or fulvestrant) and has no diabetes with fasting glucose 104 mg/dL. Outstanding: a screening ECG (QTc ≤ 460 ms) and confirmation that a doublet slot is open.",
  [
    {
      id: "NCT05216432-inc-1",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-18 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT05216432-inc-2",
      status: "pass",
      rationale: "PIK3CA H1047R, a primary oncogenic kinase-domain hotspot, on local tissue NGS of the liver biopsy (reported 2025-03-10).",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: NGS }],
    },
    {
      id: "NCT05216432-inc-3",
      status: "not-applicable",
      rationale: "Covers non-hotspot PIK3CA variants that need Sponsor approval; her H1047R is a primary oncogenic hotspot.",
    },
    {
      id: "NCT05216432-inc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Archival tumor tissue exists from the February 2025 liver core biopsy (and the 2019 lumpectomy) for retrospective PIK3CA confirmation; whether enough core remains after NGS is not documented.",
      evidence: [{ quote: "Collected: 2025-02-19", source: PATH }],
      actionNeeded: "Confirm the 2025 liver core or 2019 lumpectomy block is available; otherwise plan a fresh biopsy.",
    },
    {
      id: "NCT05216432-inc-5",
      status: "not-applicable",
      rationale: "Heading for the RLY-2608 single-agent arm; with HR+/HER2- breast cancer she would enter the RLY-2608 + fulvestrant doublet instead.",
    },
    {
      id: "NCT05216432-inc-6",
      status: "not-applicable",
      rationale: "Single-agent arm (Part 1) only; for reference, she has evaluable disease.",
    },
    {
      id: "NCT05216432-inc-7",
      status: "not-applicable",
      rationale: "Single-agent arm (Part 2) only; she would enter the fulvestrant doublet.",
    },
    {
      id: "NCT05216432-inc-8",
      status: "not-applicable",
      rationale: "Single-agent arm only. For reference, she has not exhausted or declined standard therapy: capivasertib or alpelisib + fulvestrant remain available.",
    },
    {
      id: "NCT05216432-inc-9",
      status: "not-applicable",
      rationale: "Single-agent arm (Part 1) only; she would enter the fulvestrant doublet.",
    },
    {
      id: "NCT05216432-inc-10",
      status: "not-applicable",
      rationale: "Single-agent Part 2 tumor-type groups only; breast cancer patients go to the combination arms.",
    },
    {
      id: "NCT05216432-inc-11",
      status: "not-applicable",
      rationale: "Defines the single-agent Part 2 tumor groups; she would enter the fulvestrant doublet.",
    },
    {
      id: "NCT05216432-inc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Heading for the combination arms. With HR+/HER2- PIK3CA-mutant metastatic breast cancer she would enter the RLY-2608 + fulvestrant doublet, assessed in the items below.",
    },
    {
      id: "NCT05216432-inc-13",
      status: "pass",
      rationale: "Evaluable and measurable disease: liver lesions up to 3.2 cm on CT 2026-08-14 plus stable sclerotic bone metastases.",
      evidence: [{ quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: NOTE }],
    },
    {
      id: "NCT05216432-inc-14",
      status: "not-applicable",
      rationale: "Heading for the triplet arms; she would enter the doublet.",
    },
    {
      id: "NCT05216432-inc-15",
      status: "not-applicable",
      rationale: "Triplet-arm criterion (Part 1 and Part 2 Group 1); she would enter the doublet.",
    },
    {
      id: "NCT05216432-inc-16",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 criterion; she would enter the doublet.",
    },
    {
      id: "NCT05216432-inc-17",
      status: "pass",
      rationale: "Postmenopausal woman with biopsy-confirmed HR+/HER2-negative (HER2-low: IHC 1+, ISH not amplified) metastatic breast cancer in liver and bone, not amenable to curative therapy.",
      evidence: [
        { quote: "Liver bx 2/19/25 c/w met breast ca, ER 90% PR 10% HER2 1+/ISH neg (HER2-low)", source: NOTE },
        { quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE },
      ],
    },
    {
      id: "NCT05216432-inc-18",
      status: "pass",
      rationale: "No metastatic chemotherapy (≤ 1 allowed); one CDK4/6 inhibitor (palbociclib, metastatic); antiestrogen therapy with adjuvant anastrozole and metastatic letrozole; PARP inhibitor not required as the germline panel was negative.",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: NOTE },
        { quote: "then adj anastrozole 12/2019 until recurrence", source: NOTE },
        { quote: "Germline panel 2019 negative.", source: NOTE },
      ],
    },
    {
      id: "NCT05216432-inc-19",
      status: "not-applicable",
      rationale: "Defines doublet Part 2 Group 2 (prior PI3Kα/AKT/mTOR inhibitor stopped for intolerance). She is PI3K-pathway-inhibitor-naive, so she would enter Part 1 or a naive expansion group.",
    },
    {
      id: "NCT05216432-inc-20",
      status: "not-applicable",
      rationale: "Triplet Part 1 criterion; she would enter the doublet.",
    },
    {
      id: "NCT05216432-inc-21",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 criterion; she would enter the doublet.",
    },
    {
      id: "NCT05216432-inc-22",
      status: "not-applicable",
      rationale: "Sub-item of the triplet Part 2 Group 2 requirements; she would enter the doublet. For reference, she did recur during adjuvant anastrozole.",
    },
    {
      id: "NCT05216432-inc-23",
      status: "not-applicable",
      rationale: "Sub-item of the triplet Part 2 Group 2 requirements; she never received an adjuvant CDK4/6 inhibitor.",
    },
    {
      id: "NCT05216432-exc-1",
      status: "pass",
      rationale: "No PI3Kα, AKT or mTOR inhibitor to date; capivasertib or alpelisib is only being discussed as a next option.",
      evidence: [{ quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: NOTE }],
    },
    {
      id: "NCT05216432-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No immune checkpoint inhibitor in her treatment history (ddAC-T, anastrozole, letrozole + palbociclib).",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE }],
    },
    {
      id: "NCT05216432-exc-3",
      status: "not-applicable",
      rationale: "Heading for exclusions that apply only to triplet Part 2 Group 2; she would enter the doublet.",
    },
    {
      id: "NCT05216432-exc-4",
      status: "not-applicable",
      rationale: "Triplet Part 2 Group 2 only. Her metastatic palbociclib would exclude her from that group, but she would enter the doublet, where it is required rather than barred.",
    },
    {
      id: "NCT05216432-exc-5",
      status: "pass",
      rationale: "No prior fulvestrant or other selective ER degrader; her endocrine therapy has been anastrozole and letrozole.",
      evidence: [{ quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: NOTE }],
    },
    {
      id: "NCT05216432-exc-6",
      status: "pass",
      rationale: "No diabetes and no antihyperglycaemic medication. Fasting glucose 104 mg/dL is below 140, so the glucose-plus-HbA1c clause cannot be met even though HbA1c is not yet on file.",
      evidence: [
        { quote: "No DM.", source: NOTE },
        { quote: "Glucose (fasting) 104 (H)", source: LABS },
      ],
    },
    {
      id: "NCT05216432-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Her only recorded allergy is sulfa (rash); she tolerated palbociclib and has not received fulvestrant or a PI3K inhibitor.",
      evidence: [{ quote: "ALLERGIES: sulfa (rash)", source: "Allergies" }],
    },
    {
      id: "NCT05216432-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD or pneumonitis history; CT chest 2026-08-14 shows no new pulmonary nodules and lungs are clear on exam.",
      evidence: [
        { quote: "No new pulmonary nodules.", source: CT },
        { quote: "Lungs CTA.", source: NOTE },
      ],
    },
    {
      id: "NCT05216432-exc-9",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG or QTc is documented anywhere in the record.",
      actionNeeded: "Obtain 12-lead ECG; mean resting QTc ≤ 460 ms required.",
    },
    {
      id: "NCT05216432-exc-10",
      status: "pass",
      rationale: "No neurological symptoms and a nonfocal exam, so no CNS disease with progressive neurological symptoms; brain imaging has never been done.",
      evidence: [
        { quote: "Denies neuro sx.", source: NOTE },
        { quote: "Neuro grossly nonfocal.", source: NOTE },
      ],
    },
  ],
);
