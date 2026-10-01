import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05633654",
  "Excluded: germline BRCA carriers are not eligible; otherwise fits the residual-disease criteria",
  "ASCENT-05 is built for her situation, residual invasive TNBC after neoadjuvant therapy and surgery, and she meets the disease, surgery, radiotherapy and organ-function criteria. It excludes germline BRCA carriers, however, and her BRCA1 c.68_69delAG pathogenic variant is documented on the 12/2025 germline panel; for carriers, adjuvant olaparib (already under discussion) is the established post-neoadjuvant option. Nothing pending would change this.",
  [
    {
      id: "NCT05633654-inc-1",
      status: "pass",
      rationale: "Age 39, with residual invasive TNBC in the breast (1.2 cm) and axillary nodes (2/11) after KEYNOTE-522 and surgery; ER 0%, PR 0%, HER2 IHC 0.",
      evidence: [
        { quote: "residual invasive ductal carcinoma, grade 3, single focus 1.2 cm with treatment effect", source: "Pathology 2026-06-17" },
        { quote: "ER 0%, PR 0%, HER2 IHC 0 - triple negative, concordant with core bx.", source: "Pathology 2026-06-17" },
      ],
    },
    {
      id: "NCT05633654-inc-2",
      status: "pass",
      rationale: "Bilateral mastectomy with right axillary dissection on 6/11/26 with negative margins (closest 4 mm), and the scars are well healed.",
      evidence: [
        { quote: "Margins negative (closest deep 4 mm).", source: "Pathology 2026-06-17" },
        { quote: "Mastectomy scars well healed, no chest wall nodularity.", source: "Exam 2026-09-22" },
      ],
    },
    {
      id: "NCT05633654-inc-3",
      status: "unknown",
      confidence: "medium",
      rationale: "Tissue from the 6/2026 surgical specimen is documented as available, but availability of the 11/2025 pre-treatment core biopsy is not recorded, and both are required.",
      evidence: [{ quote: "Archival tissue available (surgical specimen 6/2026).", source: "Clinic note 2026-09-22" }],
      actionNeeded: "Confirm the 11/2025 core biopsy block can be retrieved and submitted with the 6/2026 surgical tissue",
    },
    {
      id: "NCT05633654-inc-4",
      status: "pass",
      rationale: "ECOG 0 at the 9/22/26 visit.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Clinic note 2026-09-22" }],
    },
    {
      id: "NCT05633654-inc-5",
      status: "pass",
      confidence: "medium",
      rationale: "Post-mastectomy radiation was completed 8/28/26; only mild residual chest wall erythema and improving fatigue remain.",
      evidence: [
        { quote: "PMRT 7/20/26-8/28/26, completed.", source: "Clinic note 2026-09-22" },
        { quote: "R chest wall mild residual erythma.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT05633654-inc-6",
      status: "pass",
      rationale: "Labs 9/19/26: ANC 1.9, Hgb 12.4 g/dL, platelets 180, creatinine 0.7 mg/dL, AST 22, ALT 25, bilirubin 0.5 mg/dL, all within standard limits; ANC was flagged for recheck.",
      evidence: [
        { quote: "WBC 3.4 (L) | ANC 1.9 | Hgb 12.4 | Plt 180", source: "Labs 2026-09-19" },
        { quote: "AST 22 | ALT 25 | T bili 0.5 | Alk phos 71", source: "Labs 2026-09-19" },
      ],
    },
    {
      id: "NCT05633654-exc-1",
      status: "pass",
      rationale: "No metastatic disease on CT 7/9/26, and this is her first invasive breast cancer; the contralateral mastectomy was benign.",
      evidence: [
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
        { quote: "C. Left breast: benign breast tissue, no atypia, no carcinoma.", source: "Pathology 2026-06-17" },
      ],
    },
    {
      id: "NCT05633654-exc-2",
      status: "pass",
      rationale: "No prior CTLA-4, OX40 or CD137 agent, no HER2-directed therapy (HER2 IHC 0) and no endocrine therapy; her only immunotherapy is pembrolizumab (anti-PD-1).",
      evidence: [
        {
          quote: "Neoadj per KEYNOTE-522: pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026) then pembro + ddAC x4 (3/2026-5/2026).",
          source: "Clinic note 2026-09-22",
        },
      ],
    },
    {
      id: "NCT05633654-exc-3",
      status: "pass",
      rationale: "No recurrence: no chest wall nodularity or adenopathy on exam 9/22/26 and no disease on CT 7/9/26.",
      evidence: [
        { quote: "Mastectomy scars well healed, no chest wall nodularity.", source: "Exam 2026-09-22" },
        { quote: "No evidence of metastatic disease in the chest, abdomen or pelvis.", source: "CT CAP 2026-07-09" },
      ],
    },
    {
      id: "NCT05633654-exc-4",
      status: "pass",
      rationale: "Prior chemotherapy was paclitaxel, carboplatin, doxorubicin (a topoisomerase II inhibitor) and cyclophosphamide; no topoisomerase I inhibitor or ADC.",
      evidence: [
        {
          quote: "Neoadj per KEYNOTE-522: pembro + weekly paclitaxel + carboplatin x12 wks (12/2025-3/2026) then pembro + ddAC x4 (3/2026-5/2026).",
          source: "Clinic note 2026-09-22",
        },
      ],
    },
    {
      id: "NCT05633654-exc-5",
      status: "fail",
      rationale: "Germline BRCA1 pathogenic variant c.68_69delAG on the multigene panel reported 12/15/25.",
      evidence: [
        { quote: "BRCA1 c.68_69delAG (p.Glu23ValfsTer17) - PATHOGENIC", source: "Germline panel 2025-12-15" },
        { quote: "Germline BRCA1 pathogenic variant (c.68_69delAG) 12/2025.", source: "Clinic note 2026-09-22" },
      ],
    },
    {
      id: "NCT05633654-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No myocardial infarction, angina or arrhythmia is recorded; LVEF 60% on 3/4/26, measured before dose-dense AC.",
      evidence: [{ quote: "ECHO 03/04/2026: LVEF 60%, normal LV size and function.", source: "Echo 2026-03-04" }],
      actionNeeded: "Repeat echo at screening; LVEF ≥ 50% required",
    },
    {
      id: "NCT05633654-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection is documented and no anti-microbial therapy is on her medication list.",
    },
  ],
);
