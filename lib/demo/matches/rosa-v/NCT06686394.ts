import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06686394",
  "Excluded: brain metastases are a listed exclusion, though she fits Arms 1 and 3",
  "On prior therapy she fits Arm 1 (two prior anti-HER2 lines, progression on T-DXd) and Arm 3 (T-DXd as most recent therapy, HER2 TKI-naive), and her organ function and clean lung history suit another deruxtecan ADC. The registered criteria, however, exclude brain metastases, and she has three SRS-treated lesions still visible on the 2026-09-12 MRI. If the full protocol permits treated, stable brain metastases, she would become a good candidate pending hepatitis serology.",
  [
    {
      id: "NCT06686394-inc-1",
      status: "pass",
      rationale: "Histologically confirmed HER2-positive (IHC 3+) metastatic breast cancer, de novo stage IV.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" },
        { quote: "Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.", source: "Pathology" },
      ],
    },
    {
      id: "NCT06686394-inc-2",
      status: "not-applicable",
      rationale: "Applies only to participants with HIV infection; none is documented.",
    },
    {
      id: "NCT06686394-inc-3",
      status: "not-applicable",
      rationale: "Applies only to HBsAg-positive participants; no hepatitis B infection is documented.",
    },
    {
      id: "NCT06686394-inc-4",
      status: "not-applicable",
      rationale: "Applies only to participants with a history of hepatitis C; none is documented.",
    },
    {
      id: "NCT06686394-inc-5",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-24; it must be reconfirmed within 7 days before the first dose.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Onc note 2026-09-24" }],
      actionNeeded: "Reassess ECOG within 7 days before the first dose",
    },
    {
      id: "NCT06686394-inc-6",
      status: "pass",
      rationale: "Two prior anti-HER2 lines for metastatic disease (THP with HP maintenance, then T-DXd), within the Arm 1 range of 2–5.",
      evidence: [
        { quote: "Metastatic HER2+ (IHC 3+) HR-negative breast ca, de novo stage IV, PD on 1L THP/HP and 2L T-DXd.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06686394-inc-7",
      status: "pass",
      rationale: "Progressed on T-DXd: liver progression and new brain metastases in July 2026 after 15 months of treatment.",
      evidence: [
        { quote: "7/2026: PD in liver + new HA -> MRI brain 7/22/26 w/ 3 new brain mets (largest 1.4 cm R frontal).", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06686394-inc-8",
      status: "pass",
      rationale: "Two prior anti-HER2 lines for metastatic disease, within the Arm 2 maximum of five.",
      evidence: [
        { quote: "Metastatic HER2+ (IHC 3+) HR-negative breast ca, de novo stage IV, PD on 1L THP/HP and 2L T-DXd.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06686394-inc-9",
      status: "pass",
      rationale: "Progressed on T-DXd, which was her most recent systemic therapy (last dose 2026-07-06), after two anti-HER2 lines, within the Arm 3 maximum of three.",
      evidence: [
        { quote: "2L T-DXd 5.4 mg/kg 4/2025-7/2026 (last dose 07/06/2026)", source: "Onc note 2026-09-24" },
        { quote: "trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)", source: "Medications" },
      ],
    },
    {
      id: "NCT06686394-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No coronary disease, BP 128/74 on lisinopril and LVEF 55%; no uncontrolled or significant cardiovascular disease is documented.",
      evidence: [{ quote: "No CAD. Never smoker.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06686394-exc-2",
      status: "pass",
      rationale: "No ILD or pneumonitis at any time on T-DXd, and CT 07/20/2026 shows no interstitial abnormality.",
      evidence: [
        { quote: "no ILD/pneumonitis at any point (serial CT chest w/o interstitial changes)", source: "Onc note 2026-09-24" },
        { quote: "No interstitial lung abnormality or ground-glass opacity.", source: "CT CAP 07/20/2026" },
      ],
    },
    {
      id: "NCT06686394-exc-3",
      status: "pass",
      rationale: "No respiratory compromise: SpO2 97% on room air, no cough or dyspnoea, lungs clear.",
      evidence: [
        { quote: "BP 128/74 HR 82 SpO2 97% RA.", source: "Onc note 2026-09-24" },
        { quote: "No cough/SOB.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06686394-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is described on brain MRI, and she has no new neurological symptoms.",
      evidence: [{ quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06686394-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal or other eye disease is recorded in her past medical history.",
    },
    {
      id: "NCT06686394-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No ongoing infection is documented.",
    },
    {
      id: "NCT06686394-exc-7",
      status: "not-applicable",
      rationale: "Applies only to participants with HIV infection; none is documented.",
    },
    {
      id: "NCT06686394-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No additional malignancy is recorded; her only cancer is the 2024 breast cancer.",
    },
    {
      id: "NCT06686394-exc-9",
      status: "fail",
      rationale: "She has brain metastases: three lesions treated with SRS on 2026-08-07, still visible though smaller on MRI 2026-09-12. The criterion as registered has no exception for treated, stable lesions.",
      evidence: [
        { quote: "right frontal 1.4 -> 0.8 cm, left cerebellar 0.9 -> 0.5 cm, right parietal 0.6 -> 0.3 cm", source: "MRI brain 2026-09-12" },
      ],
      actionNeeded: "Ask the sponsor whether the full protocol permits treated, stable brain metastases",
    },
    {
      id: "NCT06686394-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection requiring systemic therapy is documented.",
    },
    {
      id: "NCT06686394-exc-11",
      status: "unknown",
      confidence: "medium",
      rationale: "Hepatitis B and C status is not documented; her transaminase rise is explained by liver metastases.",
      actionNeeded: "Obtain HBsAg and HCV antibody (RNA if positive); concurrent active HBV and HCV excludes",
    },
    {
      id: "NCT06686394-exc-12",
      status: "pass",
      rationale: "No major surgery; her only procedure was port placement in 02/2024.",
      evidence: [{ quote: "PSH: port 2/2024. No breast surgery.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06686394-exc-13",
      status: "pass",
      rationale: "Tucatinib-, lapatinib- and neratinib-naive, with no investigational HER2 TKI exposure.",
      evidence: [{ quote: "No prior tucatinib, T-DM1, lapatinib or neratinib.", source: "Onc note 2026-09-24" }],
    },
  ],
);
