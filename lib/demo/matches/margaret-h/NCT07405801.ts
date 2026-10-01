import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07405801",
  "Excluded: needs PIK3CA wild-type and no prior metastatic therapy; she has H1047R and a prior 1L",
  "This first-line study enrolls endocrine-resistant tumors without a PIK3CA mutation and with chromosome 8p loss, in patients who have had no systemic therapy for advanced disease. Margaret's tumor carries PIK3CA H1047R (tissue NGS 2025-03-10) and she has already received letrozole + palbociclib for metastatic disease, so she fails on two documented facts that no further testing can change. Her relapse on adjuvant anastrozole would otherwise have met the endocrine-resistance requirement.",
  [
    {
      id: "NCT07405801-inc-1",
      status: "pass",
      rationale: "Biopsy-proven metastatic breast carcinoma in liver and bone, not amenable to curative surgery or radiation.",
      evidence: [
        { quote: "Metastatic adenocarcinoma, consistent with breast primary.", source: "Liver pathology 2025-02-24" },
        { quote: "sclerotic bone mets (T8, L3, R ilium) + 2 liver lesions", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07405801-inc-2",
      status: "pass",
      rationale: "Most recent biopsy (liver, 2025-02-19): ER 90% and PR 10%, both well above the 1% threshold.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: "Liver pathology 2025-02-24" },
        { quote: "PR: positive, 10% of tumor cells, weak to moderate intensity", source: "Liver pathology 2025-02-24" },
      ],
    },
    {
      id: "NCT07405801-inc-3",
      status: "fail",
      rationale: "She has already had systemic therapy for metastatic disease (letrozole + palbociclib, March 2025 to 2026-08-20). Her relapse during adjuvant anastrozole would have satisfied the endocrine-resistance part.",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: "Clinic note 2026-09-18" },
        { quote: "then adj anastrozole 12/2019 until recurrence", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07405801-inc-4",
      status: "fail",
      rationale: "The trial requires a PIK3CA-non-mutated tumor; tissue NGS of her liver metastasis shows pathogenic PIK3CA H1047R. Chromosome 8p status has not been tested.",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: "Tissue NGS 2025-03-10" }],
    },
    {
      id: "NCT07405801-inc-5",
      status: "pass",
      rationale: "Measurable liver disease per RECIST v1.1: segment VI lesion 3.2 cm on CT 2026-08-14.",
      evidence: [{ quote: "segment VI lesion increased from 2.4 cm to 3.2 cm", source: "CT CAP 2026-08-14" }],
    },
    {
      id: "NCT07405801-exc-1",
      status: "pass",
      rationale: "Histology is invasive ductal carcinoma, with breast-origin adenocarcinoma on the liver biopsy; not metaplastic.",
      evidence: [{ quote: "IDC, grade 2 (Nottingham 6/9)", source: "Prior pathology 2019" }],
    },
    {
      id: "NCT07405801-exc-2",
      status: "pass",
      rationale: "Her only radiotherapy was adjuvant whole-breast RT in October–November 2019.",
      evidence: [{ quote: "whole breast RT 10-11/2019", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07405801-exc-3",
      status: "pass",
      rationale: "Not a chemotherapy candidate at present: no visceral crisis (bilirubin 0.6, AST/ALT 34/41, ECOG 1) and the plan under discussion is endocrine-based.",
      evidence: [
        { quote: "AST 34 | ALT 41 | T bili 0.6 | Alk phos 148 (H) | Albumin 3.9", source: "Labs 2026-09-15" },
        { quote: "Discussed 2L options: capivasertib + fulvestrant vs alpelisib + fulvestrant vs clinical trial.", source: "Clinic note 2026-09-18" },
      ],
    },
    {
      id: "NCT07405801-exc-4",
      status: "pass",
      rationale: "No diabetes of either type and no antihyperglycemic medication; fasting glucose 104 mg/dL on 2026-09-15.",
      evidence: [
        { quote: "No DM.", source: "Clinic note 2026-09-18" },
        { quote: "Glucose (fasting) 104 (H)", source: "Labs 2026-09-15" },
      ],
    },
    {
      id: "NCT07405801-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases and no neurological symptoms, steroids or anticonvulsants; she has never had brain imaging.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: "Clinic note 2026-09-18" }],
    },
    {
      id: "NCT07405801-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is recorded; she has no headache, visual change or focal weakness and a nonfocal neurological exam.",
      evidence: [
        { quote: "No HA, no visual changes, no focal weakness, no N/V.", source: "Clinic note 2026-09-18" },
        { quote: "Neuro grossly nonfocal.", source: "Clinic note 2026-09-18" },
      ],
    },
  ],
);
