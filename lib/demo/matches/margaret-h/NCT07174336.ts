import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-18";
const PATH = "Liver pathology 2025-02-24";
const NGS = "Tissue NGS 2025-03-10";
const LABS = "Labs 2026-09-15";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07174336",
  "Fits Part 1 (0–2 prior lines allowed) on all listed criteria · Part 2 is first-line only",
  "On the listed criteria she qualifies for Part 1, the randomized Phase 2 dose-optimization stage, which allows up to two prior lines for advanced disease: HR+/HER2-low with PIK3CA H1047R, one prior line (letrozole + palbociclib) without chemotherapy, measurable liver disease, no diabetes, and washout complete (39 days since her last dose). Part 2, the Phase 3 portion, is limited to patients with no prior treatment for advanced disease, so it is closed to her. Confirm Part 1 is still enrolling; HbA1c will still be wanted before starting a PI3Kα inhibitor.",
  [
    {
      id: "NCT07174336-inc-1",
      status: "not-applicable",
      rationale: "Postmenopausal for about 7 years (natural menopause at about 51, now 58); contraception requirements do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT07174336-inc-2",
      status: "pass",
      rationale: "Postmenopausal after natural menopause at about 51 (now 58), so ovarian function suppression is not needed.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT07174336-inc-3",
      status: "not-applicable",
      rationale: "Applies only to patients assigned male at birth.",
    },
    {
      id: "NCT07174336-inc-4",
      status: "pass",
      rationale: "Metastatic breast cancer in liver and bone with ER 90% on the most recent biopsy (liver, February 2025) and HER2 IHC 1+, ISH not amplified: HR+/HER2-low as defined.",
      evidence: [
        { quote: "ER: positive, 90% of tumor cells, strong intensity", source: PATH },
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
      ],
    },
    {
      id: "NCT07174336-inc-5",
      status: "pass",
      rationale: "Activating PIK3CA H1047R detected on tissue NGS of the liver biopsy (reported 2025-03-10).",
      evidence: [{ quote: "PIK3CA p.H1047R (c.3140A>G), VAF 31% - pathogenic", source: NGS }],
    },
    {
      id: "NCT07174336-inc-6",
      status: "pass",
      rationale: "Measurable liver disease on CT 2026-08-14 (segment VI 3.2 cm), plus evaluable sclerotic bone metastases.",
      evidence: [{ quote: "Liver-dominant, measurable disease (seg VI 3.2 cm).", source: NOTE }],
    },
    {
      id: "NCT07174336-inc-7",
      status: "pass",
      rationale: "One prior systemic treatment for advanced disease (letrozole + palbociclib, March 2025 to 2026-08-20), within the 0–2 allowed in Part 1. Even counting adjuvant anastrozole, on which she recurred, the total is two.",
      evidence: [
        { quote: "Started 1L letrozole + palbociclib + denosumab 3/2025, best response PR.", source: NOTE },
        { quote: "PD on 1L AI + CDK4/6i after ~17 mo.", source: NOTE },
      ],
      actionNeeded: "Confirm Part 1 (Phase 2 dose optimization) is still enrolling at the site.",
    },
    {
      id: "NCT07174336-inc-8",
      status: "pass",
      rationale: "Her treatment for advanced disease contained no chemotherapy; ddAC-T was adjuvant, in 2019.",
      evidence: [{ quote: "adj ddAC-T 5/2019-9/2019", source: NOTE }],
    },
    {
      id: "NCT07174336-inc-9",
      status: "not-applicable",
      rationale: "Part 2 (Phase 3) only. With one prior line for metastatic disease she could enter Part 1 only.",
    },
    {
      id: "NCT07174336-inc-10",
      status: "not-applicable",
      rationale: "Defines the Part 2 populations (endocrine-sensitive or endocrine-resistant, no prior advanced-disease therapy); she would enter Part 1.",
    },
    {
      id: "NCT07174336-exc-1",
      status: "pass",
      rationale: "No diabetes diagnosis, no insulin, and fasting glucose 104 mg/dL (below 140) on 2026-09-15.",
      evidence: [
        { quote: "No DM.", source: NOTE },
        { quote: "Glucose (fasting) 104 (H)", source: LABS },
      ],
    },
    {
      id: "NCT07174336-exc-2",
      status: "pass",
      rationale: "Invasive ductal carcinoma presenting as pT2 pN1a, with no inflammatory features and no metaplastic histology.",
      evidence: [
        { quote: "IDC, grade 2 (Nottingham 6/9)", source: "Prior pathology 2019" },
        { quote: "stage IIB (pT2 pN1a)", source: NOTE },
      ],
    },
    {
      id: "NCT07174336-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No history of leptomeningeal disease; no neurological symptoms and a nonfocal exam, though brain imaging has never been done.",
      evidence: [{ quote: "Denies neuro sx. Has never had brain imaging.", source: NOTE }],
    },
    {
      id: "NCT07174336-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases: asymptomatic and neurologically nonfocal, but never imaged.",
      evidence: [{ quote: "No brain MRI at this time (asymptomatic); would obtain if required for trial baseline.", source: NOTE }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging.",
    },
    {
      id: "NCT07174336-exc-5",
      status: "pass",
      rationale: "Letrozole + palbociclib stopped 2026-08-20, 39 days ago, beyond the 28-day maximum washout (the 2026-09-18 line 'continue letrozole/palbociclib' is a copy-forward). Denosumab is bone-supportive.",
      evidence: [{ quote: "letrozole 2.5 mg daily + palbociclib 125 mg - DISCONTINUED 8/20/2026 (PD)", source: MEDS }],
    },
    {
      id: "NCT07174336-exc-6",
      status: "pass",
      rationale: "No immunodeficiency, and no systemic corticosteroids or immunosuppressants on her medication list.",
    },
    {
      id: "NCT07174336-exc-7",
      status: "not-applicable",
      rationale: "Postmenopausal (natural menopause at about 51, now 58); pregnancy and breastfeeding do not apply.",
      evidence: [{ quote: "58 yo postmenopausal F (natural menopause ~51)", source: NOTE }],
    },
    {
      id: "NCT07174336-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "Afebrile, with no bacterial or fungal infection recorded.",
      evidence: [{ quote: "BP 132/78 HR 76 afebrile.", source: NOTE }],
    },
  ],
);
