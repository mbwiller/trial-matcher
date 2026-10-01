import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const NGS = "Tissue NGS 2025-02-12";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT07062965",
  "Meets all 5 inclusion criteria, no exclusion triggered · confirm gBRCA2 and prostate cancer handling",
  "This PF-07248144 + fulvestrant study is for HR+/HER2-negative advanced disease progressing on a CDK4/6 inhibitor, with no more than two prior lines, no prior chemotherapy or ADC and no PIK3CA/AKT1/PTEN alteration, all of which match his record (wild-type for all three on 2025 NGS). The registry listing is abbreviated, so screening will add organ-function, ECG and other-malignancy rules; his untreated prostate cancer on surveillance is the item most likely to need a ruling. Weigh it against standard PARP inhibitor therapy for his germline BRCA2, and consider ctDNA before entry since ESR1 status predates aromatase inhibitor exposure.",
  [
    {
      id: "NCT07062965-inc-1",
      status: "pass",
      rationale: "HR+ (ER 85%, PR 30%), HER2-negative (IHC 1+, ISH not amplified) breast cancer metastatic to lung, hilar node and bone, not curable by surgery or radiation.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "Metastatic HR+/HER2-low male breast ca (lung, R hilar LN, bone)", source: NOTE },
      ],
    },
    {
      id: "NCT07062965-inc-2",
      status: "pass",
      rationale:
        "Progressed during letrozole + leuprolide + abemaciclib in the metastatic setting (CT 2026-09-11 after about 19 months); abemaciclib stopped 2026-09-15.",
      evidence: [
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
        { quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS },
      ],
    },
    {
      id: "NCT07062965-inc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Read as permissive: prior CDK4/6i/ET rechallenge, ESR1-targeted or BRCA-directed (PARP inhibitor) therapy is allowed, not required. He has had one ET + CDK4/6i line and no PARP inhibitor despite germline BRCA2.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
      actionNeeded: "Confirm with the sponsor that gBRCA2 carriers need not receive a PARP inhibitor before entry",
    },
    {
      id: "NCT07062965-inc-4",
      status: "pass",
      rationale: "RECIST-measurable disease: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT07062965-inc-5",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07062965-exc-1",
      status: "pass",
      rationale: "Tissue NGS of the lung metastasis (2025-02-12) detected no PIK3CA, AKT1 or PTEN alteration.",
      evidence: [
        { quote: "PIK3CA: no alterations detected (wild-type)", source: NGS },
        { quote: "AKT1/PTEN: no alterations detected", source: NGS },
      ],
    },
    {
      id: "NCT07062965-exc-2",
      status: "pass",
      rationale: "One prior line for metastatic disease (letrozole + leuprolide + abemaciclib); the limit is two.",
      evidence: [{ quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE }],
    },
    {
      id: "NCT07062965-exc-3",
      status: "pass",
      rationale: "No chemotherapy or ADC for metastatic disease; his ddAC-T was adjuvant (2021), which the criterion allows.",
      evidence: [
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
      ],
    },
    {
      id: "NCT07062965-exc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Controlled hypertension and hyperlipidemia, no psychiatric history. Untreated grade group 1 prostate cancer (11/2023) on active surveillance is the one condition an investigator may weigh.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Confirm the full protocol's other-malignancy clause permits untreated GG1 prostate cancer on surveillance",
    },
    {
      id: "NCT07062965-exc-5",
      status: "pass",
      rationale: "Labs 2026-09-22 show no renal, hepatic or hematologic impairment: creatinine 1.1 (eGFR 74), AST/ALT 26/31, bilirubin 0.7, ANC 1.7, platelets 190, Hgb 11.8.",
      evidence: [
        { quote: "Cr 1.1 | eGFR 74", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
      ],
    },
  ],
);
