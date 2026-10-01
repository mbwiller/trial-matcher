import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";

export default demoMatch(
  "NCT06312176",
  "Fits post-CDK4/6i, chemo-naive HR+/HER2- design · central receptors and viral serology pending",
  "MK-2870-010 targets his situation: HR+/HER2-negative (HER2-low counts) metastatic disease progressing on endocrine therapy with a CDK4/6 inhibitor, with no chemotherapy yet for metastatic disease. ECOG 1, adequate labs, no visceral crisis and no ILD on CT support eligibility; open items are central receptor confirmation and hepatitis B/C and HIV status for the conditional viral criteria. The registry criteria list no other-malignancy exclusion, so confirm how the full protocol treats his untreated prostate cancer, and weigh the trial against standard PARP inhibitor therapy for his germline BRCA2.",
  [
    {
      id: "NCT06312176-inc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "Local testing of the 2025 lung metastasis shows ER 85%, PR 30%, HER2 IHC 1+ with ISH not amplified (HER2-negative by ASCO/CAP); central confirmation is still required.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
      actionNeeded: "Submit tumor tissue for central HR/HER2 confirmation",
    },
    {
      id: "NCT06312176-inc-2",
      status: "pass",
      rationale:
        "Radiographic progression (CT 2026-09-11) on first-line letrozole + leuprolide + abemaciclib, i.e. endocrine therapy combined with a CDK4/6 inhibitor in the metastatic setting.",
      evidence: [
        { quote: "CT 9/11/26 w/ PD in chest", source: NOTE },
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT06312176-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "ECOG 1 with normal marrow, liver and renal function, and he completed dose-dense AC-T in 2021, so he is fit for chemotherapy.",
      evidence: [{ quote: "adj ddAC-T 6/2021-10/2021", source: NOTE }],
    },
    {
      id: "NCT06312176-inc-4",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit; it must be re-recorded within 7 days of randomization.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
      actionNeeded: "Re-document ECOG within 7 days before randomization",
    },
    {
      id: "NCT06312176-inc-5",
      status: "pass",
      rationale: "Labs 2026-09-22 are adequate: ANC 1.7, platelets 190, Hgb 11.8, creatinine 1.1 (eGFR 74), AST/ALT 26/31, bilirubin 0.7.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS },
      ],
    },
    {
      id: "NCT06312176-inc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "No HIV infection or antiretroviral therapy is recorded, but HIV status has not been documented; the condition applies only if he is HIV-positive.",
      actionNeeded: "Obtain HIV serology; if positive, well-controlled HIV on antiretroviral therapy is required",
    },
    {
      id: "NCT06312176-inc-7",
      status: "unknown",
      confidence: "medium",
      rationale: "Hepatitis B status is not documented; the condition applies only if he is HBsAg-positive.",
      actionNeeded: "Obtain HBsAg; if positive, ≥ 4 weeks of antiviral therapy and undetectable HBV DNA required",
    },
    {
      id: "NCT06312176-inc-8",
      status: "unknown",
      confidence: "medium",
      rationale: "Hepatitis C status is not documented; the condition applies only with a history of HCV infection.",
      actionNeeded: "Obtain HCV antibody with reflex RNA; if positive, HCV viral load must be undetectable",
    },
    {
      id: "NCT06312176-exc-1",
      status: "pass",
      rationale: "Metastatic disease in lung, right hilar node and bone; there is no curative option.",
      evidence: [{ quote: "Metastatic HR+/HER2-low male breast ca (lung, R hilar LN, bone)", source: NOTE }],
    },
    {
      id: "NCT06312176-exc-2",
      status: "pass",
      rationale: "Not an early recurrence: adjuvant ddAC-T ended 10/2021 and metastases appeared in January 2025, about 39 months later.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
      ],
    },
    {
      id: "NCT06312176-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No visceral crisis: lung and hilar disease cause only a mild dry cough, with no dyspnea, SpO2 96% on room air and normal liver tests.",
      evidence: [
        { quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE },
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
      ],
    },
    {
      id: "NCT06312176-exc-4",
      status: "pass",
      rationale: "No chemotherapy has been given for metastatic disease.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT06312176-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune disease in his history and no systemic immunosuppressive treatment on his medication list.",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
    },
    {
      id: "NCT06312176-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No pneumonitis or ILD history, and CT 2026-09-11 reports nodules and a hilar node with no interstitial disease described.",
      evidence: [{ quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.", source: CT }],
      actionNeeded: "Confirm no ILD on the screening CT given cough, prior chest wall radiation and smoking history",
    },
    {
      id: "NCT06312176-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection is documented and no antimicrobials are on his medication list.",
    },
  ],
);
