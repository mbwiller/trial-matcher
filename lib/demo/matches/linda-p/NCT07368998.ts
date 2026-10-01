import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07368998",
  "Unlikely: requires a PIK3CA mutation; none on ctDNA and tissue never tested",
  "Linda meets nearly every clinical criterion: ER+/HER2- disease progressing after first-line letrozole + ribociclib, evaluable bone-only disease, an endocrine-based next step, no chemotherapy or PI3K-pathway exposure, and diet-controlled diabetes that does not trigger the exclusion. The trial is built around a PIK3CA mutation, and Guardant360 found none. Truncal CDH1 was detected at 1.8% VAF, so a clonal PIK3CA mutation would likely have shown. Tissue NGS on the 2017 mastectomy block is the only route that could change this.",
  [
    {
      id: "NCT07368998-inc-1",
      status: "pass",
      rationale: "ER-positive (90%) and HER2 IHC 0 on the 2024 metastasis, matching the primary, per standard IHC reporting.",
      evidence: [
        { quote: "ER: positive, 90%, strong", source: "Bone biopsy 2024-05-21" },
        { quote: "HER2 IHC: 0 (negative)", source: "Bone biopsy 2024-05-21" },
      ],
    },
    {
      id: "NCT07368998-inc-2",
      status: "pass",
      rationale: "Progressed on letrozole + ribociclib, her only systemic line in the metastatic setting (≤ 1 allowed).",
      evidence: [
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" },
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07368998-inc-3",
      status: "pass",
      rationale: "Bone-only disease is evaluable (non-measurable) per RECIST 1.1, which this criterion accepts.",
      evidence: [{ quote: "Bone-only dz, NOT measurable by RECIST 1.1 (evaluable only).", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07368998-inc-4",
      status: "pass",
      rationale: "Her oncologist's options are all endocrine-based (elacestrant, fulvestrant combination, oral SERD trial), and with bone-only disease and no visceral involvement, chemotherapy is not indicated.",
      evidence: [
        { quote: "Options: elacestrant (ESR1m, >12 mo on prior CDK4/6i) vs fulvestrant-based combination vs clinical trial of next-gen oral SERD.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07368998-inc-5",
      status: "fail",
      confidence: "medium",
      rationale: "PIK3CA was not detected on Guardant360 ctDNA (2026-09-16), and tissue has never been sequenced. Truncal CDH1 was seen at 1.8% VAF, so a missed clonal PIK3CA mutation is unlikely but not excluded.",
      evidence: [
        { quote: "PIK3CA, AKT1, PTEN: not detected", source: "Guardant360 2026-09-23" },
        { quote: "CDH1 p.Q706*, VAF 1.8%", source: "Guardant360 2026-09-23" },
        { quote: "PIK3CA/AKT1/PTEN neg on ctDNA only; bone bx decalcified, no tissue NGS.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "If pursuing, send the 2017 mastectomy block for tissue NGS; a study-eligible PIK3CA mutation is required",
    },
    {
      id: "NCT07368998-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Bone-only ER+ disease with ECOG 1, normal liver function and about 27 months of disease control on first-line therapy; expected survival is well over 6 months.",
      evidence: [
        { quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" },
        { quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" },
      ],
    },
    {
      id: "NCT07368998-inc-7",
      status: "pass",
      confidence: "low",
      rationale: "She is open to trials and independent in ADLs; willingness to complete procedures and patient-reported outcomes is confirmed at screening.",
      evidence: [{ quote: "Pt prefers oral tx, open to trials", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07368998-exc-1",
      status: "pass",
      rationale: "Invasive lobular carcinoma (classic type, E-cadherin negative), not metaplastic carcinoma.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma c/w breast primary, lobular phenotype.", source: "Bone biopsy 2024-05-21" },
        { quote: "L mastectomy + SLNB 08/2017: invasive lobular carcinoma, classic type", source: "Primary 2017" },
      ],
    },
    {
      id: "NCT07368998-exc-2",
      status: "pass",
      rationale: "No chemotherapy in the metastatic setting.",
      evidence: [{ quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07368998-exc-3",
      status: "pass",
      rationale: "Type 2 diabetes is diet-controlled with no glucose-lowering medication (HbA1c 6.4% in August 2026); no type 1 diabetes.",
      evidence: [
        { quote: "T2DM diet-controlled (A1c 6.4% 8/2026)", source: "Oncology note 2026-09-25" },
        { quote: "HbA1c 6.4% (08/2026)", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT07368998-exc-4",
      status: "pass",
      rationale: "No prior PI3K, AKT or mTOR inhibitor.",
      evidence: [{ quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07368998-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No supplemental oxygen or lung disease recorded; she is a never-smoker.",
      evidence: [{ quote: "SH: widowed, lives alone, never smoker, no EtOH.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07368998-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No respiratory symptoms or pneumonitis recorded, and PET/CT on 2026-09-09 showed no lung disease.",
      evidence: [{ quote: "No FDG-avid visceral, nodal or soft tissue disease.", source: "PET/CT 2026-09-09" }],
    },
  ],
);
