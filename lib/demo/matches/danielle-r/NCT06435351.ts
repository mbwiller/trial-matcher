import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06435351",
  "Meets all 9 inclusion criteria · surgical block must go to Moffitt for exome sequencing",
  "A close fit: stage IIB TNBC (ER/PR 0%, HER2 IHC 0) with RCB class II residual disease after standard KEYNOTE-522 and mastectomy/ALND, NED on the 2026-07-09 CT, and one month out from PMRT, well inside the 18-month window. The practical steps are confirming that the 2026-06-11 surgical specimen (1.2 cm residual focus and 2 positive nodes, both with treatment effect) holds enough viable tumor for whole exome sequencing and sending it to Moffitt, then clearing her for leukapheresis. The listed criteria do not address concurrent standard therapy, so ask the PI whether adjuvant pembrolizumab (cycle 4 of 9) and her planned olaparib or capecitabine may continue alongside vaccination.",
  [
    {
      id: "NCT06435351-inc-1",
      status: "pass",
      rationale: "Stage IIB TNBC (ER 0%, PR 0%, HER2 IHC 0) treated with standard neoadjuvant KEYNOTE-522 and mastectomy, leaving RCB class II (score 2.6) residual disease, which meets the RCB II–III requirement.",
      evidence: [
        { quote: "Receptors repeated on residual tumor: ER 0%, PR 0%, HER2 IHC 0 - triple negative, concordant with core bx.", source: "Pathology 2026-06-17" },
        { quote: "Neoadj per KEYNOTE-522: pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026) then pembro + ddAC x4 (3/2026-5/2026).", source: "Clinic note 2026-09-22" },
        { quote: "Residual Cancer Burden: RCB class II (RCB score 2.6)", source: "Pathology 2026-06-17" },
      ],
    },
    {
      id: "NCT06435351-inc-2",
      status: "pass",
      confidence: "medium",
      rationale: "Archival tissue from the 2026-06-11 mastectomy is available, with a 1.2 cm residual invasive focus and 2 positive axillary nodes; viable tumor content (both show treatment effect) and release of the block to Moffitt are not yet confirmed.",
      evidence: [
        { quote: "A. Right breast: residual invasive ductal carcinoma, grade 3, single focus 1.2 cm with treatment effect.", source: "Pathology 2026-06-17" },
        { quote: "Archival tissue available (surgical specimen 6/2026).", source: "Clinic note 2026-09-22" },
      ],
      actionNeeded: "Have pathology confirm viable tumor cellularity in the surgical block and arrange its release to Moffitt for whole exome sequencing",
    },
    {
      id: "NCT06435351-inc-3",
      status: "pass",
      rationale: "39 years old (born 1987), above the minimum age of 18.",
      evidence: [{ quote: "39 yo premenopausal F", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06435351-inc-4",
      status: "pass",
      rationale: "ECOG 0 on examination 2026-09-22.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06435351-inc-5",
      status: "pass",
      rationale: "Labs 2026-09-19 meet standard thresholds: ANC 1.9 ×10⁹/L (≥ 1.5, borderline with WBC 3.4), platelets 180, Hgb 12.4, bilirubin 0.5, AST 22 / ALT 25 and creatinine 0.7.",
      evidence: [
        { quote: "WBC 3.4 (L) | ANC 1.9 | Hgb 12.4 | Plt 180", source: "Labs 2026-09-19" },
        { quote: "AST 22 | ALT 25 | T bili 0.5 | Alk phos 71", source: "Labs 2026-09-19" },
        { quote: "Cr 0.7", source: "Labs 2026-09-19" },
      ],
      actionNeeded: "Repeat CBC with differential at screening and before leukapheresis",
    },
    {
      id: "NCT06435351-inc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No malignancy other than this breast cancer is recorded and the risk-reducing left mastectomy was benign; the criterion only permits other cancers and does not block her.",
      evidence: [{ quote: "C. Left breast: benign breast tissue, no atypia, no carcinoma.", source: "Pathology 2026-06-17" }],
    },
    {
      id: "NCT06435351-inc-7",
      status: "pass",
      rationale: "No metastatic disease on the 2026-07-09 CT, and her last curative-intent treatment was PMRT ending 2026-08-28 (1 month ago; chemotherapy ended 5/2026), well within 18 months.",
      evidence: [
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
        { quote: "PMRT 7/20/26-8/28/26, completed.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT06435351-inc-8",
      status: "pass",
      confidence: "low",
      rationale: "The contraception agreement is confirmed at screening; her levonorgestrel IUD is a hormonal method, which the protocol lists as acceptable.",
      evidence: [{ quote: "levonorgestrel IUD (placed 2023)", source: "Medications" }],
    },
    {
      id: "NCT06435351-inc-9",
      status: "pass",
      confidence: "low",
      rationale: "Capacity and willingness to consent are confirmed at screening; she is a registered nurse who has asked to hear about residual-disease trials.",
      evidence: [{ quote: "Pt leaning olaparib but wants to hear about trials for residual disease first.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06435351-exc-1",
      status: "pass",
      rationale: "No evidence of disease: the post-operative CT of 2026-07-09 showed no metastases and the 2026-09-22 exam found no chest wall nodularity or adenopathy.",
      evidence: [
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
        { quote: "Currently NED.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT06435351-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled illness is recorded, and her only autoimmune condition, immune-related hypothyroidism, needs levothyroxine replacement rather than systemic immunosuppressants.",
      evidence: [{ quote: "irAE hypothyroidism G2 -> levothyroxine, TSH now nl.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06435351-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "Nothing recorded argues against leukapheresis (Hgb 12.4, platelets 180, LVEF 60% in 3/2026). She has a port, but standard ports rarely support apheresis flow, so venous access needs planning.",
      evidence: [
        { quote: "Port in situ.", source: "CT CAP 2026-07-09" },
        { quote: "ECHO 03/04/2026: LVEF 60%, normal LV size and function.", source: "Echo 2026-03-04" },
      ],
      actionNeeded: "Apheresis team to assess venous access (peripheral veins or temporary apheresis catheter) before collection",
    },
    {
      id: "NCT06435351-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent is on her medication list; her only anticancer drug is standard-of-care adjuvant pembrolizumab.",
      evidence: [{ quote: "pembrolizumab 200 mg IV q3 weeks (adjuvant, C4 of 9)", source: "Medications" }],
    },
    {
      id: "NCT06435351-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Anxiety is stable on sertraline 50 mg and she works as a registered nurse; nothing suggests compliance would be limited.",
      evidence: [{ quote: "4. Anxiety - sertraline 50 mg, stable.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT06435351-exc-6",
      status: "pass",
      rationale: "Not pregnant per the 2026-09-22 note, with a negative serum hCG on 2026-09-19.",
      evidence: [
        { quote: "Not pregnant, not breastfeeding.", source: "Clinic note 2026-09-22" },
        { quote: "hCG (serum) negative", source: "Labs 2026-09-19" },
      ],
    },
  ],
);
