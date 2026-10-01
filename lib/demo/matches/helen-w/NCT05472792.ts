import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05472792",
  "Excluded: low-risk post-lumpectomy trial; she had a mastectomy for grade 3 pT2 pN2a disease",
  "CAMERAN randomises women ≥65 with low-risk, node-negative tumors after lumpectomy to partial-breast irradiation alone or endocrine therapy alone. Helen is the opposite profile: grade 3, pT2 (3.8 cm), 5/18 nodes with extranodal extension and LVI, PR 5%, treated by modified radical mastectomy and adjuvant TC, with chest wall plus nodal radiation and letrozole under way. These blockers are fixed facts of her disease and treatment, so no screening result would change the answer; her risk calls for escalation, not de-escalation, of adjuvant therapy.",
  [
    {
      id: "NCT05472792-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Written informed consent and HIPAA authorisation are obtained at screening; she is keen to hear about trials.",
      evidence: [{ quote: "Pt keen to hear about trials before deciding -> research coordinator.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-inc-2",
      status: "pass",
      rationale: "72-year-old woman with a first, de novo invasive ductal carcinoma (with lobular features) of the right breast diagnosed on core biopsy 4/14/26.",
      evidence: [
        { quote: "72 yo postmenopausal F", source: "Oncology note 2026-09-25" },
        { quote: "Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm.", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT05472792-inc-3",
      status: "fail",
      rationale: "The tumor measured 3.8 cm at mastectomy and was staged pT2, not pT1 (≤2 cm).",
      evidence: [{ quote: "Pathologic stage (AJCC 8th): pT2 pN2a", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-4",
      status: "fail",
      rationale: "ER is 90% but PR is only 5% (weak), below the ≥10% required for both ER and PR.",
      evidence: [
        { quote: "ER: positive, 90%, strong intensity", source: "Pathology 2026-05-19" },
        { quote: "PR: positive, 5%, weak intensity", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT05472792-inc-5",
      status: "pass",
      rationale: "HER2 IHC 2+ (equivocal) with ISH not amplified (ratio 1.3, copy number 3.4), i.e. HER2-negative proven by ISH per ASCO/CAP.",
      evidence: [{ quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-6",
      status: "fail",
      rationale: "Nottingham grade 3 (8/9) on the mastectomy specimen; grade 1–2 is required.",
      evidence: [{ quote: "Nottingham grade 3 (8/9)", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-7",
      status: "fail",
      rationale: "Five of 18 axillary nodes were positive with extranodal extension (pN2a); node-negative disease is required.",
      evidence: [{ quote: "Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-8",
      status: "fail",
      rationale: "Lymphovascular invasion was present on the mastectomy pathology.",
      evidence: [{ quote: "Lymphovascular invasion: present.", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-9",
      status: "pass",
      rationale: "Margins were negative with the closest (deep) at 6 mm, above the 2 mm threshold, although these are mastectomy rather than lumpectomy margins.",
      evidence: [{ quote: "Margins: negative (closest deep 6 mm).", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-10",
      status: "fail",
      rationale: "She had a right modified radical mastectomy on 5/12/26, not breast-conserving surgery.",
      evidence: [{ quote: "Specimen: Right breast and axillary contents, modified radical mastectomy", source: "Pathology 2026-05-19" }],
    },
    {
      id: "NCT05472792-inc-11",
      status: "fail",
      rationale: "Partial-breast irradiation is not possible after mastectomy; she is instead receiving chest wall plus regional nodal radiation (started 9/14/26).",
      evidence: [{ quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-inc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No other prior or concurrent malignancy is recorded in the past medical history, so this permissive clause raises no issue.",
    },
    {
      id: "NCT05472792-inc-13",
      status: "pass",
      confidence: "medium",
      rationale: "She is not enrolled in another trial (still deciding between adjuvant CDK4/6 inhibitor options and a trial); this clause is permissive.",
      evidence: [{ quote: "Pt keen to hear about trials before deciding -> research coordinator.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-exc-1",
      status: "fail",
      confidence: "medium",
      rationale: "She received post-operative docetaxel/cyclophosphamide ×4 (6/17–8/19/26); in this no-chemotherapy, low-risk population the exclusion most plausibly covers it. No further chemotherapy is planned ('TC C3 today' in the 9/25 A/P is a stale copy-forward).",
      evidence: [{ quote: "docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", source: "Medication list" }],
    },
    {
      id: "NCT05472792-exc-2",
      status: "fail",
      rationale: "She has been on letrozole since 9/8/26 and it is ongoing; stopping adjuvant endocrine therapy to meet the 30-day rule would be inappropriate for stage IIIA disease.",
      evidence: [{ quote: "letrozole 2.5 mg PO daily (started 9/8/2026)", source: "Medication list" }],
    },
    {
      id: "NCT05472792-exc-3",
      status: "pass",
      rationale: "Menopause at about 50 and she has never used hormone replacement therapy.",
      evidence: [{ quote: "72 yo postmenopausal F (menopause ~50, no HRT)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "Mammography showed a single 3.4 cm spiculated UOQ mass and pathology describes one 3.8 cm tumor; multifocality is not reported.",
      evidence: [
        { quote: "R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", source: "Screening mammogram 2026-04-02" },
        { quote: "Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm.", source: "Pathology 2026-05-19" },
      ],
    },
    {
      id: "NCT05472792-exc-5",
      status: "not-applicable",
      rationale: "There is no lumpectomy cavity: the breast was removed by modified radical mastectomy on 5/12/26.",
      evidence: [{ quote: "R MRM 5/12/26", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Disease is unilateral: the screening mammogram reported only the right breast mass and the left breast has no masses on examination.",
      evidence: [{ quote: "L breast no masses.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-exc-7",
      status: "pass",
      rationale: "Staging CT chest/abdomen/pelvis and bone scan (5/21/26) showed no distant metastases, and she is NED clinically on 9/25/26.",
      evidence: [
        { quote: "No evidence of distant metastatic disease.", source: "Staging CT + bone scan 2026-05-21" },
        { quote: "s/p MRM + adj TC x4, on PMRT + letrozole. NED.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05472792-exc-8",
      status: "fail",
      rationale: "She is currently receiving post-mastectomy radiation to the chest wall and regional nodes (9/14/26 to planned 10/20/26), so she will have had breast/thoracic radiation.",
      evidence: [{ quote: "PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No autoimmune or connective tissue disease appears in her past medical history; she is tolerating radiation with grade 1 erythema only.",
      evidence: [{ quote: "Mild chest wall pinkness on RT, no desquamation.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05472792-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Comorbidities are controlled: AF rate-controlled in sinus rhythm (ECG 9/21/26), BP 136/78, CKD 3a stable; she is already tolerating letrozole and radiation.",
      evidence: [
        { quote: "ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", source: "ECG 2026-09-21" },
        { quote: "CKD 3a stable.", source: "Oncology note 2026-09-25" },
      ],
    },
  ],
);
