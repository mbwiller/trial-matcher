import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05573126",
  "Fits Module B after 1L AI + ribociclib · AR never tested (central ≥ 30% needed)",
  "Linda fits the Module B combination arms: postmenopausal, ER-positive/HER2 IHC 0 lobular cancer that progressed on first-line letrozole + ribociclib, with no prior exposure to any of the combination partners and washouts already met. Entry turns on central AR immunohistochemistry (≥ 30% for Module B), which has never been done; classic lobular carcinoma is usually AR-positive, and the 2017 mastectomy block avoids the decalcified bone sample. The investigator must also accept the trial over available standard options such as elacestrant. QTcF 462 ms is under the 470 ms limit, and escitalopram should be switched to sertraline at least 14 days before dosing.",
  [
    {
      id: "NCT05573126-inc-1",
      status: "pass",
      rationale: "67-year-old woman, well above the 18-year minimum.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-inc-2",
      status: "unknown",
      confidence: "medium",
      rationale: "Histologically proven metastatic lobular carcinoma (iliac biopsy 2024). However, standard options remain available and her oncologist lists them; she has not declined them, so entry rests on the investigator judging the trial more appropriate.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma c/w breast primary, lobular phenotype.", source: "Bone biopsy 2024-05-21" },
        { quote: "Options: elacestrant (ESR1m, >12 mo on prior CDK4/6i) vs fulvestrant-based combination vs clinical trial of next-gen oral SERD.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Confirm with the investigator that this clause is satisfied for Module B while standard options (elacestrant, fulvestrant-based) remain available",
    },
    {
      id: "NCT05573126-inc-3",
      status: "pass",
      confidence: "medium",
      rationale: "An archival primary tumor exists (2017 left mastectomy, 3.4 cm ILC), so she is not limited to the decalcified 2024 bone core; block retrieval is not yet confirmed.",
      evidence: [{ quote: "L mastectomy + SLNB 08/2017: invasive lobular carcinoma, classic type", source: "Primary 2017" }],
      actionNeeded: "Request the 2017 mastectomy FFPE block; if unavailable, a fresh biopsy will be required",
    },
    {
      id: "NCT05573126-inc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "ER-positive (90% on the metastasis), but androgen receptor has never been tested. Classic lobular carcinoma is commonly AR-positive, but central Ventana AR IHC is required.",
      evidence: [{ quote: "ER: positive, 90%, strong", source: "Bone biopsy 2024-05-21" }],
      actionNeeded: "Send archival tissue for central AR IHC (Ventana); ≥ 30% AR-positive nuclei required for Module B (≥ 10% for Module A)",
    },
    {
      id: "NCT05573126-inc-5",
      status: "pass",
      rationale: "HER2 IHC 0 on the 2024 bone metastasis and the 2017 primary, meeting the IHC 0/1+ definition of HER2-negative.",
      evidence: [
        { quote: "HER2 IHC: 0 (negative)", source: "Bone biopsy 2024-05-21" },
        { quote: "ER 95% strong, PR 40%, HER2 IHC 0.", source: "Primary 2017" },
      ],
    },
    {
      id: "NCT05573126-inc-6",
      status: "pass",
      rationale: "Postmenopausal by age: she is 67, over the 60-year threshold.",
      evidence: [{ quote: "67 yo postmenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-inc-7",
      status: "pass",
      rationale: "One prior endocrine line for metastatic disease (letrozole + ribociclib), with progression; adjuvant anastrozole ended about 19 months before recurrence and does not count, but even counted the total is 2.",
      evidence: [
        { quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" },
        { quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05573126-inc-8",
      status: "pass",
      rationale: "Progressed on one endocrine line in the metastatic setting, letrozole with the CDK4/6 inhibitor ribociclib, within the ≤ 2 limit.",
      evidence: [{ quote: "1L letrozole + ribociclib from 6/2024 (400 mg from 10/2024, G3 neutropenia)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-inc-9",
      status: "pass",
      rationale: "Progressed on a CDK4/6 inhibitor plus aromatase inhibitor (ribociclib + letrozole) given as initial therapy for metastatic disease.",
      evidence: [{ quote: "PD on 1L AI + CDK4/6i after ~27 mo.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-exc-1",
      status: "pass",
      rationale: "No chemotherapy, investigational drug, fulvestrant or SERD ever. Letrozole and ribociclib stopped 2026-09-14, 14 days ago as of 2026-09-28, so the 14-day AI and small-molecule windows are met.",
      evidence: [
        { quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" },
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05573126-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No androgens, androgenic supplements or antiandrogens on her medication list (zoledronic acid, tramadol, escitalopram, calcium/vitamin D).",
    },
    {
      id: "NCT05573126-exc-3",
      status: "pass",
      rationale: "Last radiotherapy was 8 Gy to the left hip in July 2024 and none is planned.",
      evidence: [{ quote: "Palliative RT L hip 8 Gy x1 7/2024.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No chemotherapy ever, and no lasting toxicity from the 2024 single-fraction hip radiotherapy is recorded.",
      evidence: [{ quote: "Oncotype RS 14 -> no chemo, no PMRT.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "QTcF 462 ms on 2026-09-17, below the 470 ms limit but close, on escitalopram and 3 days after ribociclib; no torsades, long-QT syndrome or sudden death in her history.",
      evidence: [
        { quote: "ECG 9/17/2026: NSR 68, QTcF 462 ms.", source: "ECG 2026-09-17" },
        { quote: "QTcF 462 ms on 9/17 ECG (440-455 on ribociclib), on escitalopram.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Repeat ECG at screening off ribociclib; QTcF must be ≤ 470 ms",
    },
    {
      id: "NCT05573126-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "ECG on 2026-09-17 showed normal sinus rhythm at 68; no conduction or morphology abnormality is reported.",
      evidence: [{ quote: "ECG 9/17/2026: NSR 68, QTcF 462 ms.", source: "ECG 2026-09-17" }],
    },
    {
      id: "NCT05573126-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "Escitalopram 10 mg is QT-prolonging, but her oncologist has already planned a switch to sertraline if a trial requires it, so it can be substituted in time.",
      evidence: [
        { quote: "escitalopram 10 mg PO daily", source: "Medication list" },
        { quote: "If trial requires QTcF <450 consider switch to sertraline.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Switch escitalopram to sertraline at least 14 days before the first dose",
    },
    {
      id: "NCT05573126-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No heart failure on her problem list; walking is limited by bone pain, not breathlessness.",
      evidence: [{ quote: "walking limited to ~2 blocks, cane outdoors, independant in ADLs", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05573126-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No myocardial infarction or angina recorded in her history.",
    },
    {
      id: "NCT05573126-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No strong CYP3A4 inhibitor or inducer on her current list. Ribociclib (a CYP3A4 inhibitor, half-life about 32 h) stopped 2026-09-14, so 14 days will have passed by the first dose.",
      evidence: [{ quote: "letrozole 2.5 mg daily + ribociclib 400 mg - DISCONTINUED 9/14/2026 (PD)", source: "Medication list" }],
    },
    {
      id: "NCT05573126-exc-11",
      status: "pass",
      rationale: "Prior systemic therapy is anastrozole, letrozole and ribociclib only; she has never received elacestrant, everolimus, abemaciclib, fulvestrant or exemestane.",
      evidence: [
        { quote: "No prior chemo for MBC, no fulvestrant, no oral SERD, no PI3K/AKT/mTOR inhibitor.", source: "Oncology note 2026-09-25" },
        { quote: "Adj anastrozole 10/2017-10/2022 (5 yrs completed).", source: "Oncology note 2026-09-25" },
      ],
    },
  ],
);
