import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07173751",
  "Excluded: first-line PD-L1-negative trial; she is CPS 15 and already treated for metastatic disease",
  "ROSETTA Breast-01 is for untreated metastatic TNBC whose PD-L1 status rules out checkpoint inhibitor plus chemotherapy. Aisha fails both defining conditions on documented facts: her tumor is PD-L1 CPS 15 (22C3), the population that receives pembrolizumab + chemotherapy, and she has already had first-line pembrolizumab + gemcitabine/carboplatin (12/2025 to 9/2026). Her measurable disease, ECOG 1 and archival lung core would otherwise suit, but neither blocker can change.",
  [
    {
      id: "NCT07173751-inc-1",
      status: "fail",
      rationale:
        "PD-L1 22C3 CPS 15 makes her eligible for, not excluded from, checkpoint inhibitor plus chemotherapy, and she received first-line pembrolizumab + gemcitabine/carboplatin.",
      evidence: [
        { quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: "Pathology 2025-11-25" },
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT07173751-inc-2",
      status: "pass",
      rationale: "Metastatic TNBC documented before screening: ER 0%, PR 0%, HER2 IHC 0 on the RLL metastasis (2025-11-20).",
      evidence: [
        { quote: "ER: negative (0%)", source: "Pathology 2025-11-25" },
        { quote: "PR: negative (0%)", source: "Pathology 2025-11-25" },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: "Pathology 2025-11-25" },
      ],
    },
    {
      id: "NCT07173751-inc-3",
      status: "pass",
      rationale: "Measurable disease on CT 2026-09-15: liver segment VI 2.1 cm and RLL nodule 1.8 cm.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07173751-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Archival CT-guided core biopsy of the RLL lung metastasis (2025-11-20) is available, an acceptable non-bone, non-FNA sample; she has two measurable lesions and is open to a liver biopsy.",
      evidence: [
        { quote: "Specimen: Lung, right lower lobe nodule, CT-guided core biopsy", source: "Pathology 2025-11-25" },
        { quote: "Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Confirm the RLL block has enough tissue left after NGS; otherwise arrange a liver biopsy",
    },
    {
      id: "NCT07173751-inc-5",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07173751-exc-1",
      status: "not-applicable",
      rationale:
        "Introductory line with no therapies listed; the specific prior-therapy and washout exclusions are judged in the items that follow.",
    },
    {
      id: "NCT07173751-exc-2",
      status: "fail",
      rationale:
        "Prior systemic therapy for advanced disease: first-line pembrolizumab + gemcitabine/carboplatin from 12/2025 until progression (last doses 2026-08-26 and 2026-09-02).",
      evidence: [
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: "Oncology note 2026-09-25" },
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
      ],
    },
    {
      id: "NCT07173751-exc-3",
      status: "pass",
      rationale: "Her only checkpoint inhibitor was pembrolizumab, a monospecific anti-PD-1 antibody; no PD-(L)1/VEGF bispecific.",
      evidence: [{ quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07173751-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic corticosteroids on the current medication list, and none were needed for her irAE.",
      evidence: [{ quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT07173751-exc-5",
      status: "unknown",
      confidence: "low",
      rationale: "Vaccination history is not recorded.",
      actionNeeded: "Confirm no live attenuated vaccine (e.g. MMR, varicella, yellow fever, intranasal influenza) within 4 weeks before first dose",
    },
    {
      id: "NCT07173751-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No infection or IV antibiotic course is recorded in the interval history or medication list.",
    },
    {
      id: "NCT07173751-exc-7",
      status: "unknown",
      confidence: "low",
      rationale:
        "Premenopausal with tubal ligation in 2014, so pregnancy is unlikely, but no pregnancy test is documented.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Obtain pregnancy test at screening (must be negative); confirm not breastfeeding or planning pregnancy",
    },
    {
      id: "NCT07173751-exc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "No surgery, trauma or dental procedure is recorded; her only procedures were core biopsies in November 2025. She is on denosumab, so invasive dental work should be asked about.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: "Medication list" }],
      actionNeeded: "Confirm no invasive dental procedure within 28 days of first dose and none planned",
    },
    {
      id: "NCT07173751-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or organ transplant in the history.",
    },
  ],
);
