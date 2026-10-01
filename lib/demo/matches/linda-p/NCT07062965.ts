import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07062965",
  "Meets all 5 inclusion criteria · confirm the protocol's renal threshold (CrCl ≈ 52 mL/min)",
  "Linda fits this post-CDK4/6 study closely: HR+/HER2- disease that progressed on first-line letrozole + ribociclib, one prior line, no chemotherapy or ADC, bone-only disease explicitly allowed, and no PIK3CA/AKT1/PTEN alteration on ctDNA. The only open point is renal function. She has stable CKD 3a (eGFR 52, Cockcroft-Gault about 52 mL/min), and the exclusion's numeric limit needs checking against the protocol. Randomization includes investigator's-choice therapy, which should be discussed alongside elacestrant for her ESR1 Y537S.",
  [
    {
      id: "NCT07062965-inc-1",
      status: "pass",
      rationale: "HR-positive (ER 90%), HER2 IHC 0 metastatic disease in bone, not amenable to curative surgery or radiotherapy.",
      evidence: [
        { quote: "Metastatic HR+/HER2-neg (IHC 0) ILC, bone-only", source: "Oncology note 2026-09-25" },
        { quote: "ER: positive, 90%, strong", source: "Bone biopsy 2024-05-21" },
      ],
    },
    {
      id: "NCT07062965-inc-2",
      status: "pass",
      rationale: "Ribociclib + letrozole for metastatic disease, with radiographic progression on treatment (PET/CT 2026-09-09) before it was stopped on 2026-09-14.",
      evidence: [
        { quote: "PET/CT 9/9/26 w/ bone PD (new T10, sacrum, R acetabulum), no visceral dz.", source: "Oncology note 2026-09-25" },
        { quote: "Ribociclib/letrozole stopped 9/14/26 (~27 mo).", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07062965-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive clause: prior CDK4/6i or endocrine rechallenge, or ESR1- or BRCA-targeted therapy, is allowed but not required. She has had a single line of letrozole + ribociclib.",
      evidence: [{ quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07062965-inc-4",
      status: "pass",
      rationale: "Non-measurable bone-only disease, which the criterion explicitly accepts.",
      evidence: [{ quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07062965-inc-5",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07062965-exc-1",
      status: "pass",
      rationale: "No PIK3CA, AKT1 or PTEN alteration is documented: none were detected on ctDNA, and tissue has not been sequenced.",
      evidence: [
        { quote: "PIK3CA, AKT1, PTEN: not detected", source: "Guardant360 2026-09-23" },
        { quote: "PIK3CA/AKT1/PTEN neg on ctDNA only; bone bx decalcified, no tissue NGS.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07062965-exc-2",
      status: "pass",
      rationale: "One prior line of systemic therapy in the metastatic setting (letrozole + ribociclib), within the limit of two.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07062965-exc-3",
      status: "pass",
      rationale: "No chemotherapy or ADC for metastatic disease (and none in the adjuvant setting either).",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" },
        { quote: "Oncotype RS 14 -> no chemo, no PMRT.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07062965-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are stable: CKD 3a, diet-controlled diabetes and depression controlled on escitalopram; QTcF 462 ms is borderline but not a recorded contraindication.",
      evidence: [
        { quote: "CKD 3a - eGFR 52, stable.", source: "Oncology note 2026-09-25" },
        { quote: "Depression - escitalopram 10 mg, stable.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07062965-exc-5",
      status: "unknown",
      confidence: "medium",
      rationale: "Liver tests and blood counts are adequate (ANC 1.7, platelets 168, Hgb 11.4, AST/ALT 24/19, bilirubin 0.5), but she has CKD 3a with eGFR 52 and a Cockcroft-Gault clearance of about 52 mL/min; the criterion gives no threshold.",
      evidence: [
        { quote: "Cr 1.1 | eGFR 52 (L)", source: "Labs 2026-09-22" },
        { quote: "WBC 3.6 (L) | ANC 1.7 | Hgb 11.4 (L) | Plt 168", source: "Labs 2026-09-22" },
      ],
      actionNeeded: "Check the protocol's renal limit against a Cockcroft-Gault clearance of about 52 mL/min (eGFR 52, CKD 3a)",
    },
  ],
);
