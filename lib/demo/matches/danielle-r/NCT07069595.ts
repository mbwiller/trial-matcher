import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07069595",
  "Meets all 8 inclusion criteria · RCB-II TNBC after neoadjuvant therapy, NED on post-op CT",
  "PREDICT-RD fits her closely: stage IIB TNBC with RCB-II residual disease after KEYNOTE-522, no metastatic disease on CT 7/9/26, and surgical tissue available for ctDNA testing. The posted criteria say nothing about concurrent adjuvant therapy or time from surgery, so the site should confirm that ongoing pembrolizumab and her planned adjuvant olaparib or capecitabine are compatible with surveillance and with Dato-DXd if she becomes ctDNA-positive. The pending Signatera result does not affect eligibility but will inform the discussion.",
  [
    {
      id: "NCT07069595-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Written consent and HIPAA authorization are obtained at screening; she has asked to hear about residual-disease trials.",
      evidence: [{ quote: "wants to hear about trials for residual disease first", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT07069595-inc-2",
      status: "pass",
      confidence: "low",
      rationale: "Investigator judgment at screening; she is ECOG 0 and attending regular adjuvant treatment visits.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT07069595-inc-3",
      status: "pass",
      rationale: "She is 39 years old.",
      evidence: [{ quote: "39 yo premenopausal F", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT07069595-inc-4",
      status: "pass",
      rationale: "ER 0%, PR 0% and HER2 IHC 0 on the 11/2025 core biopsy, concordant on the residual tumor; TNBC by the trial's definition.",
      evidence: [
        { quote: "IDC, grade 3 (Nottingham 9/9), ER 0%, PR 0%, HER2 IHC 0 (negative), Ki-67 75%.", source: "Core biopsy 11/2025" },
        { quote: "ER 0%, PR 0%, HER2 IHC 0 - triple negative, concordant with core bx.", source: "Pathology 2026-06-17" },
      ],
    },
    {
      id: "NCT07069595-inc-5",
      status: "pass",
      rationale: "Stage IIB (cT2 cN1) TNBC treated with neoadjuvant KEYNOTE-522, with RCB class II (score 2.6) residual disease at surgery on 6/11/26.",
      evidence: [
        { quote: "cT2 (3.1 cm) cN1 (bx-proven axillary node) M0, stage IIB", source: "Clinic note 2026-09-22" },
        { quote: "Residual Cancer Burden: RCB class II (RCB score 2.6)", source: "Pathology 2026-06-17" },
      ],
    },
    {
      id: "NCT07069595-inc-6",
      status: "pass",
      rationale: "Baseline CT and bone scan (11/2025) and post-operative CT chest/abdomen/pelvis (7/9/26) showed no metastatic disease.",
      evidence: [
        { quote: "Baseline staging 11/2025: CT CAP + bone scan without distant disease.", source: "Imaging" },
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
      ],
    },
    {
      id: "NCT07069595-inc-7",
      status: "pass",
      rationale: "Archival tissue from the 6/2026 surgical resection is documented as available.",
      evidence: [{ quote: "Archival tissue available (surgical specimen 6/2026).", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT07069595-inc-8",
      status: "pass",
      confidence: "low",
      rationale: "Investigator judgment at screening; nothing in the record suggests a barrier to complying with serial blood draws and visits.",
    },
    {
      id: "NCT07069595-exc-1",
      status: "pass",
      rationale: "Serum hCG negative on 9/19/26; she is not pregnant and not breastfeeding.",
      evidence: [
        { quote: "hCG (serum) negative", source: "Labs 2026-09-19" },
        { quote: "Not pregnant, not breastfeeding.", source: "Clinic note 2026-09-22" },
      ],
    },
  ],
);
