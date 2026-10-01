import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05741164",
  "Fits the checkpoint-refractory TNBC design · HbA1c and pregnancy test outstanding",
  "Aisha is the population this study targets: metastatic TNBC that responded (PR on CT 3/2026) and then progressed after ~9 months of first-line pembrolizumab + gemcitabine/carboplatin, with ECOG 1, measurable liver and RLL disease, and adequate counts and chemistry on 2026-09-23. Chemotherapy washout is complete (last gem/carbo 2026-08-26, 33 days ago), no beta-blocker contraindication is documented (BP 118/72, no cardiac history, diabetes or lung disease), and she is open to biopsy. Still needed: HbA1c, a screening pregnancy test, the investigator's view that her progression is not rapid, and her agreement to paired research biopsies. This is a chemotherapy-free pembrolizumab rechallenge that would defer the ADC under discussion.",
  [
    {
      id: "NCT05741164-inc-1",
      status: "pass",
      rationale: "She is 46 years old.",
      evidence: [{ quote: "46 yo premenopausal F", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05741164-inc-2",
      status: "pass",
      rationale:
        "De novo metastatic TNBC (ER 0%, PR 0%, HER2 IHC 0) confirmed on the RLL lung core biopsy 2025-11-20, with lung, nodal, bone and now liver disease; no curative option.",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma, c/w breast primary (GATA3+, TTF-1 neg).", source: "Pathology 2025-11-25" },
        { quote: "De novo metastatic TNBC (HER2 IHC 0, PD-L1 CPS 15), lung/nodal/bone, now new liver met.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-inc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Last gemcitabine/carboplatin 2026-08-26 (33 days before 2026-09-28; 4 weeks reached 2026-09-23) and all treatment on hold since progression; no radiotherapy or surgery in the history. The A/P line 'C9 D1 pembro/gem/carbo today' contradicts this and reads as copy-forward.",
      evidence: [
        { quote: "Last gem/carbo 8/26/26.", source: "Oncology note 2026-09-25" },
        { quote: "All tx on hold since.", source: "Oncology note 2026-09-25" },
        { quote: "pembrolizumab + gemcitabine/carboplatin - DISCONTINUED 9/2026 (PD)", source: "Medication list" },
      ],
      actionNeeded: "Confirm no chemotherapy was given on 2026-09-25 (stale 'C9 D1 today' line); last dose must be ≥ 4 weeks before protocol treatment",
    },
    {
      id: "NCT05741164-inc-4",
      status: "pass",
      confidence: "medium",
      rationale:
        "Progressed (CT 2026-09-15) on first-line pembrolizumab + gemcitabine/carboplatin after a partial response. No checkpoint-limiting toxicity is documented: G2 hypothyroidism is controlled on levothyroxine, no pneumonitis/colitis, and the transaminase rise is attributed to liver metastasis.",
      evidence: [
        { quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: "Oncology note 2026-09-25" },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: "Oncology note 2026-09-25" },
        { quote: "AST/ALT ~1.5x ULN, bili nl: likely liver met, no features of immune hepatitis.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Confirm the treating oncologist judges continued pembrolizumab appropriate given the G2 hypothyroidism irAE",
    },
    {
      id: "NCT05741164-inc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "She is open to a liver biopsy, and any pre-treatment biopsy from now on is ≥ 4 weeks after the last chemotherapy (2026-08-26). Agreement to the second, 6-week on-treatment research biopsy is not yet documented.",
      evidence: [{ quote: "Archival tissue available (RLL core bx 11/2025); open to liver bx if needed.", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Confirm she agrees to both the pre-treatment and the 6-week on-treatment research biopsies",
    },
    {
      id: "NCT05741164-inc-6",
      status: "pass",
      confidence: "low",
      rationale:
        "Premenopausal, so of child-bearing potential; bilateral tubal ligation in 2014 is a highly effective method. The contraception agreement is confirmed at consent.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05741164-inc-7",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25 (grade 1 fatigue, working part-time from home).",
      evidence: [
        { quote: "EXAM: ECOG 1.", source: "Oncology note 2026-09-25" },
        { quote: "G1 fatigue, works part-time from home.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-inc-8",
      status: "pass",
      rationale: "Platelets 132 × 10⁹/L (132,000/µL) on 2026-09-23, above the 100,000/µL threshold.",
      evidence: [{ quote: "Plt 132 (L)", source: "Labs 2026-09-23" }],
    },
    {
      id: "NCT05741164-inc-9",
      status: "pass",
      rationale:
        "Hemoglobin 9.8 g/dL on 2026-09-23 meets ≥ 9.0 g/dL, with a narrow margin; the last transfusion (1 unit PRBC) was in July 2026.",
      evidence: [
        { quote: "Hgb 9.8 (L)", source: "Labs 2026-09-23" },
        { quote: "1u PRBC 7/2026 for chemo-related anemia.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Repeat CBC at screening; Hgb must remain ≥ 9.0 g/dL",
    },
    {
      id: "NCT05741164-inc-10",
      status: "pass",
      rationale: "ANC 1.6 × 10⁹/L (1,600/µL) on 2026-09-23, just above the 1,500/µL threshold.",
      evidence: [{ quote: "ANC 1.6", source: "Labs 2026-09-23" }],
      actionNeeded: "Repeat CBC at screening; ANC must remain ≥ 1,500/µL",
    },
    {
      id: "NCT05741164-inc-11",
      status: "pass",
      rationale: "Total bilirubin 0.9 mg/dL on 2026-09-23, documented as normal.",
      evidence: [
        { quote: "T bili 0.9", source: "Labs 2026-09-23" },
        { quote: "AST/ALT ~1.5x ULN, bili nl: likely liver met, no features of immune hepatitis.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-inc-12",
      status: "pass",
      rationale:
        "AST 58 and ALT 61 U/L on 2026-09-23, each 1.5 × ULN, within the 2.5 × ULN limit (they peaked at ~2 × ULN in late August).",
      evidence: [
        { quote: "AST 58 (H, 1.5x ULN)", source: "Labs 2026-09-23" },
        { quote: "ALT 61 (H, 1.5x ULN)", source: "Labs 2026-09-23" },
      ],
    },
    {
      id: "NCT05741164-inc-13",
      status: "pass",
      rationale:
        "Creatinine 0.7 mg/dL on 2026-09-23; Cockcroft-Gault for a 46-year-old woman weighing 68.4 kg gives about 108 mL/min, well above 50 mL/min.",
      evidence: [
        { quote: "Cr 0.7", source: "Labs 2026-09-23" },
        { quote: "Wt 68.4 kg.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-inc-14",
      status: "unknown",
      confidence: "low",
      rationale: "No diabetes on the problem list, but no HbA1c is recorded.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Obtain HbA1c at screening; must be ≤ 8.5%",
    },
    {
      id: "NCT05741164-inc-15",
      status: "pass",
      rationale:
        "Two RECIST-measurable lesions on CT 2026-09-15: a new 2.1 cm liver segment VI lesion and the RLL nodule at 1.8 cm.",
      evidence: [
        { quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: "Oncology note 2026-09-25" },
        { quote: "New 2.1 cm hypoattenuating lesion in hepatic segment VI, consistent with metastasis.", source: "CT CAP 2026-09-15" },
      ],
    },
    {
      id: "NCT05741164-inc-16",
      status: "pass",
      confidence: "medium",
      rationale: "She takes daily oral levothyroxine and entecavir, so swallowing oral medication is established; confirmed at screening.",
      evidence: [
        { quote: "levothyroxine 88 mcg PO daily", source: "Medication list" },
        { quote: "entecavir 0.5 mg PO daily (HBV ppx)", source: "Medication list" },
      ],
    },
    {
      id: "NCT05741164-inc-17",
      status: "pass",
      confidence: "low",
      rationale: "She is interested in trials; informed consent is obtained at screening.",
      evidence: [{ quote: "Pt interested in trials, hopes to start within 3-4 wks.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05741164-exc-1",
      status: "pass",
      rationale:
        "No systemic steroids or other immunosuppressants on the medication list; levothyroxine is hormone replacement for the irAE hypothyroidism.",
      evidence: [{ quote: "levothyroxine 88 mcg PO daily", source: "Medication list" }],
    },
    {
      id: "NCT05741164-exc-2",
      status: "pass",
      rationale:
        "No autoimmune disease before pembrolizumab; the immune-related hypothyroidism is treated with replacement, not immunosuppression. No transplant in the history.",
      evidence: [
        { quote: "No autoimmune dz prior to pembro.", source: "Oncology note 2026-09-25" },
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Progression came after ~9 months of disease control (new 2.1 cm liver lesion; RLL nodule 1.2 → 1.8 cm over 3 months) with low symptom burden: G1 fatigue, minimal bone pain, no cough, ECOG 1, bilirubin normal.",
      evidence: [
        { quote: "CT CAP 9/15/26 w/ PD: new 2.1 cm seg VI liver lesion, RLL nodule 1.2 -> 1.8 cm, bones stable.", source: "Oncology note 2026-09-25" },
        { quote: "G1 fatigue, works part-time from home.", source: "Oncology note 2026-09-25" },
        { quote: "Minimal bone pain.", source: "Oncology note 2026-09-25" },
      ],
      actionNeeded: "Confirm the investigator does not consider the new liver lesion and RLL growth rapidly progressive",
    },
    {
      id: "NCT05741164-exc-4",
      status: "pass",
      rationale:
        "Not primary resistant: she had a partial response on CT 3/2026, about 3 months into pembrolizumab + gem/carbo started 12/2025, and progressed only after ~9 months.",
      evidence: [
        { quote: "Best response PR (CT 3/2026).", source: "Oncology note 2026-09-25" },
        { quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-exc-5",
      status: "unknown",
      confidence: "low",
      rationale:
        "Premenopausal with tubal ligation in 2014, so pregnancy is unlikely, but she is a woman of childbearing potential and no pregnancy test is documented.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: "Oncology note 2026-09-25" }],
      actionNeeded: "Obtain urine pregnancy test at screening (must be negative) and confirm she is not breastfeeding",
    },
    {
      id: "NCT05741164-exc-6",
      status: "pass",
      rationale:
        "No known brain metastases (baseline MRI 2025-11-18 negative) and no neurological symptoms; this exclusion covers only symptomatic known brain metastases.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No HA, no visual chnages, no focal weakness.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "The record mentions no other malignancy; germline cancer panel negative.",
      evidence: [{ quote: "Germline panel neg.", source: "Oncology note 2026-09-25" }],
    },
    {
      id: "NCT05741164-exc-8",
      status: "pass",
      confidence: "medium",
      rationale:
        "No cardiac history, BP 118/72, HR 88. Resolved hepatitis B is controlled on entecavir with undetectable HBV DNA (2026-08-28), not an active infection. No psychiatric or social barrier is recorded.",
      evidence: [
        { quote: "No DM, no cardiac hx.", source: "Oncology note 2026-09-25" },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: "Oncology note 2026-09-25" },
        { quote: "HBV DNA 08/28/2026: not detected", source: "Labs 2026-09-23" },
      ],
    },
    {
      id: "NCT05741164-exc-9",
      status: "pass",
      confidence: "low",
      rationale: "Nothing suggests she cannot follow the protocol (works part-time, keen on trials); confirmed at screening.",
    },
    {
      id: "NCT05741164-exc-10",
      status: "pass",
      confidence: "medium",
      rationale:
        "BP 118/72 and HR 88; no cardiac history, diabetes, asthma/COPD (never smoker), depression, PAD or Raynaud's recorded; no beta-blocker or non-dihydropyridine calcium channel blocker on the medication list.",
      evidence: [
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: "Oncology note 2026-09-25" },
        { quote: "No DM, no cardiac hx.", source: "Oncology note 2026-09-25" },
      ],
    },
    {
      id: "NCT05741164-exc-11",
      status: "pass",
      confidence: "low",
      rationale: "No other condition in the record argues against propranolol plus pembrolizumab; left to investigator judgment at screening.",
    },
  ],
);
