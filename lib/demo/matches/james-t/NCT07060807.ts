import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-25";
const PATH = "Lung biopsy 2025-01-22";
const GEN = "Germline panel 2021-06";
const CT = "CT 2026-09-11";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07060807",
  "Excluded: germline BRCA2 with a PARP inhibitor still a treatment option",
  "Otherwise a close fit: HR+/HER2-low metastatic disease with radiographic progression on first-line AI + CDK4/6 inhibitor as the only advanced-setting line, no prior chemotherapy or topoisomerase I ADC, measurable disease and ECOG 1. The protocol excludes known deleterious germline BRCA mutations where a PARP inhibitor is a potential option, and his BRCA2 c.5946delT is pathogenic with olaparib or talazoparib listed as standard second line. Using a PARP inhibitor first would not open the door, because CDK4/6 inhibitor + ET must then be the only prior advanced line.",
  [
    {
      id: "NCT07060807-inc-1",
      status: "pass",
      rationale: "HR+/HER2-low (IHC 1+/ISH-, counted as HER2-negative) breast cancer metastatic to lung, hilar node and bone, not treatable with curative intent.",
      evidence: [
        { quote: "1. Metastatic HR+/HER2-low male breast ca (lung, R hilar LN, bone), gBRCA2, PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT07060807-inc-2",
      status: "unknown",
      confidence: "medium",
      rationale:
        "A metastatic-site biopsy exists (LLL core, 2025-01-22, after metastatic diagnosis), but central HR/HER2 confirmation and HER3 evaluability have not been done; a new post-progression biopsy is preferred.",
      evidence: [{ quote: "Specimen: Lung, left lower lobe nodule, CT-guided core biopsy", source: PATH }],
      actionNeeded: "Submit the 2025-01-22 LLL core or a new post-progression biopsy for central HR/HER2 and HER3 testing.",
    },
    {
      id: "NCT07060807-inc-3",
      status: "pass",
      rationale:
        "Radiographic progression on CT 2026-09-11 during first-line letrozole + leuprolide + abemaciclib, his only line of therapy in the advanced setting.",
      evidence: [
        { quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE },
        { quote: "CT 9/11/26 w/ PD in chest (RUL nodule 1.1 -> 1.6 cm, new R hilar LN 1.7 cm SA), bone dz stable.", source: NOTE },
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
      ],
    },
    {
      id: "NCT07060807-inc-4",
      status: "pass",
      rationale: "RECIST-measurable lesions: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis on CT 2026-09-11.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT07060807-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Applies to participants with HIV; no HIV infection is recorded.",
    },
    {
      id: "NCT07060807-inc-6",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit; it must be reassessed within 7 days before randomization.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
      actionNeeded: "Reassess ECOG within 7 days before randomization.",
    },
    {
      id: "NCT07060807-exc-1",
      status: "pass",
      rationale: "Disease is metastatic to lung, hilar node and bone and not amenable to curative treatment.",
      evidence: [{ quote: "2. Sclerotic osseous metastases T6, L2 and left iliac bone, unchanged.", source: CT }],
    },
    {
      id: "NCT07060807-exc-2",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Investigator determination. About 19 months on first-line CDK4/6 inhibitor and no fulvestrant exposure suggest endocrine-based options remain, although his oncologist's 2L plan is a PARP inhibitor rather than further ET.",
      evidence: [
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
        { quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE },
      ],
      actionNeeded: "Investigator to document whether he is a candidate for further endocrine-based therapy.",
    },
    {
      id: "NCT07060807-exc-3",
      status: "fail",
      rationale:
        "He carries a pathogenic germline BRCA2 variant (c.5946delT), has never had a PARP inhibitor, and olaparib or talazoparib is listed as his standard second-line option.",
      evidence: [
        { quote: "BRCA2 c.5946delT (p.Ser1982ArgfsTer22) - PATHOGENIC", source: GEN },
        { quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE },
      ],
    },
    {
      id: "NCT07060807-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No visceral crisis: low-volume lung/nodal progression, mild dry cough without dyspnoea, SpO2 96% and normal liver tests.",
      evidence: [
        { quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE },
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
      ],
    },
    {
      id: "NCT07060807-exc-5",
      status: "pass",
      rationale: "SpO2 96% on room air at rest, with no supplemental oxygen requirement.",
      evidence: [{ quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE }],
    },
    {
      id: "NCT07060807-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Cardiovascular history is controlled hypertension (BP 138/82 on lisinopril) and hyperlipidaemia; no cardiac or cerebrovascular events recorded.",
      evidence: [{ quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE }],
    },
    {
      id: "NCT07060807-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No peripheral neuropathy is recorded after paclitaxel in 2021, and the neurological exam is nonfocal.",
      evidence: [{ quote: "Neuro nonfocal.", source: NOTE }],
    },
    {
      id: "NCT07060807-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal disease appears in the history.",
    },
    {
      id: "NCT07060807-exc-9",
      status: "pass",
      rationale: "No chemotherapy has been given for metastatic disease; his only chemotherapy was adjuvant ddAC-T in 2021.",
      evidence: [
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
      ],
    },
    {
      id: "NCT07060807-exc-10",
      status: "pass",
      rationale: "No anti-HER3 agent, T-DXd or other topoisomerase I inhibitor in his history; prior chemotherapy was doxorubicin, cyclophosphamide and paclitaxel.",
      evidence: [{ quote: "adj ddAC-T 6/2021-10/2021", source: NOTE }],
    },
    {
      id: "NCT07060807-exc-11",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole + abemaciclib stopped 2026-09-15, so the 2-week allowance for prior ET + CDK4/6 inhibitor is met from 9/29. Leuprolide (last depot 2026-08-14) is being continued.",
      evidence: [
        { quote: "abemaciclib 150 mg BID + letrozole 2.5 mg daily - DISCONTINUED 9/15/2026 (PD)", source: MEDS },
        { quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE },
      ],
      actionNeeded: "Randomize no earlier than 2026-09-29; confirm whether leuprolide may continue on study.",
    },
    {
      id: "NCT07060807-exc-12",
      status: "pass",
      rationale: "Only radiation was post-mastectomy RT in Nov–Dec 2021, far outside the 14-day window, with no steroid requirement.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT07060807-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No immunodeficiency is recorded and no systemic steroid is on the medication list.",
    },
    {
      id: "NCT07060807-exc-14",
      status: "pass",
      confidence: "medium",
      rationale:
        "His GG1 prostate cancer (dx 11/2023) is on active surveillance and has never been treated; no progression is reported, though PSA is suppressed by leuprolide and surveillance MRI results are not in the record.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
        { quote: "4. Prostate ca on AS: PSA suppressed on leuprolide; urology following w/ MRI.", source: NOTE },
      ],
      actionNeeded: "Obtain the latest urology note or prostate MRI to confirm no progression.",
    },
    {
      id: "NCT07060807-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD/pneumonitis history, and CT 2026-09-11 reports nodules and a hilar node without interstitial change.",
      evidence: [
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
      ],
    },
    {
      id: "NCT07060807-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No drug allergies recorded, and he has never received patritumab deruxtecan.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT07060807-exc-17",
      status: "pass",
      rationale: "No drug allergies recorded, and he received doxorubicin and paclitaxel in 2021 without documented hypersensitivity.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
  ],
);
