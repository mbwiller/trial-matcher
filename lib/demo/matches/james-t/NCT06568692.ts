import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const MEDS = "Medications";

export default demoMatch(
  "NCT06568692",
  "Excluded: for patients with no other indicated therapy; a PARP inhibitor and T-DXd remain open",
  "This study is for advanced breast cancer when other therapies are not indicated, and it names PARP inhibitor candidacy among the alternatives that should be exhausted first. He carries a germline BRCA2 variant and HER2-low disease, so olaparib or talazoparib and later T-DXd are standard options his oncologist has already outlined. Most other items are workable (adequate labs, ECOG 1, measurable disease), though DPYD genotype, ECG and coagulation are not on file. It could become relevant once those standard options are exhausted.",
  [
    {
      id: "NCT06568692-inc-1",
      status: "pass",
      rationale: "He is 61 years old (born 1965).",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06568692-inc-2",
      status: "pass",
      rationale: "Metastatic, unresectable HR+ (ER 85%), HER2-negative (IHC 1+, ISH not amplified) breast cancer, one of the included subsets.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT06568692-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "CT 2026-09-11 shows a 1.6 cm RUL nodule and a 1.7 cm (short axis) hilar node; that scan stays within 28 days of C1D1 only until 2026-10-09.",
      evidence: [{ quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.", source: CT }],
      actionNeeded: "Repeat CT if C1D1 falls after 2026-10-09",
    },
    {
      id: "NCT06568692-inc-4",
      status: "fail",
      rationale:
        "Other therapies are indicated: with germline BRCA2 and HER2-low disease, his oncologist lists olaparib or talazoparib as standard second line and T-DXd thereafter. Adjuvant AC-T in 2021 was followed by a 3-year remission, not resistance.",
      evidence: [
        { quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE },
        { quote: "Germline BRCA2 pathogenic variant 6/2021.", source: NOTE },
      ],
    },
    {
      id: "NCT06568692-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "ECOG 1, limited lung, nodal and bone disease and normal organ function support a life expectancy beyond 24 weeks.",
    },
    {
      id: "NCT06568692-inc-6",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06568692-inc-7",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs 2026-09-22 meet each threshold (Hgb 11.8, ANC 1.7, platelets 190, bilirubin 0.7, AST/ALT 26/31, creatinine 1.1 with eGFR 74); Cockcroft-Gault CrCl ≈ his weight in kg, unrecorded. Labs must be repeated within 7 days of C1D1.",
      evidence: [
        { quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS },
        { quote: "Cr 1.1 | eGFR 74", source: LABS },
      ],
      actionNeeded: "Repeat labs within 7 days of C1D1 and record weight; Cockcroft-Gault CrCl > 50 mL/min required",
    },
    {
      id: "NCT06568692-inc-8",
      status: "unknown",
      confidence: "medium",
      rationale: "No INR, PT or aPTT is in the record; he takes no anticoagulant, so the anticoagulation exception does not apply.",
      actionNeeded: "Obtain PT/INR and aPTT; INR < 1.5 and PT/aPTT ≤ 1.5 × ULN required",
    },
    {
      id: "NCT06568692-exc-1",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Abemaciclib/letrozole stopped 2026-09-15, so 21 days elapse on 2026-10-06; leuprolide from the same first-line regimen continues (depot last 2026-08-14) and may count as ongoing treatment.",
      evidence: [{ quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE }],
      actionNeeded: "Randomize no earlier than 2026-10-06 and confirm with the sponsor whether continued leuprolide is allowed",
    },
    {
      id: "NCT06568692-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "He receives no hormone replacement therapy; leuprolide is a GnRH agonist given to suppress hormones for his breast cancer, not replacement.",
      evidence: [{ quote: "leuprolide 22.5 mg IM q3 months (last 08/14/2026)", source: MEDS }],
    },
    {
      id: "NCT06568692-exc-3",
      status: "pass",
      rationale: "He has never received 5-FU or capecitabine; adjuvant chemotherapy was ddAC-T and none has been given for metastatic disease.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
      ],
    },
    {
      id: "NCT06568692-exc-4",
      status: "pass",
      rationale: "No DPD inhibitor on his medication list (leuprolide, denosumab, lisinopril, rosuvastatin, calcium/vitamin D).",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: MEDS }],
    },
    {
      id: "NCT06568692-exc-5",
      status: "unknown",
      confidence: "medium",
      rationale: "DPYD genotype has never been tested; his germline panel covered cancer-predisposition genes only.",
      actionNeeded: "Obtain DPYD genotyping; homozygous or compound heterozygous deficiency variants exclude",
    },
    {
      id: "NCT06568692-exc-6",
      status: "unknown",
      confidence: "medium",
      rationale:
        "No cardiac disease, stenting or heart failure is recorded (controlled hypertension, HR 72), but no ECG or QTcF is documented and leuprolide can prolong QT.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
      actionNeeded: "Obtain 12-lead ECG at screening; QTcF ≤ 480 ms and no clinically significant abnormality required",
    },
    {
      id: "NCT06568692-exc-7",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding do not apply; he is male.",
    },
  ],
);
