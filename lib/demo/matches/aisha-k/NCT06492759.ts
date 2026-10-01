import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-11-25";
const CT = "CT CAP 2026-09-15";
const LABS = "Labs 2026-09-23";

export default demoMatch(
  "NCT06492759",
  "Excluded: first-line study, and she has already progressed on pembrolizumab + gem/carbo",
  "This study adds high-dose radiotherapy to first-line pembrolizumab plus chemotherapy and bars anyone who has received chemotherapy for metastatic disease. Aisha had ~9 months of first-line pembrolizumab + gemcitabine/carboplatin and progressed on CT 2026-09-15, and her oncologist is planning a second-line ADC rather than further checkpoint therapy. Her PD-L1 CPS 15, two measurable lesions (liver 2.1 cm, RLL 1.8 cm), ECOG 1 and 2026-09-23 labs would otherwise fit; only a second-line cohort would change this.",
  [
    {
      id: "NCT06492759-inc-1",
      status: "pass",
      rationale:
        "Metastatic TNBC (ER 0%, PR 0%, HER2 IHC 0) is biopsy-proven on the RLL core 2025-11-20 with PD-L1 CPS 15, and there are two measurable metastatic sites on CT 2026-09-15: liver segment VI 2.1 cm and RLL nodule 1.8 cm.",
      evidence: [
        { quote: "RLL nodule bx 11/20/25 c/w met TNBC, PD-L1 (22C3) CPS 15.", source: NOTE },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: PATH },
        { quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-inc-2",
      status: "pass",
      rationale: "PD-L1 CPS 15 by 22C3 pharmDx on the RLL metastasis (2025-11-20), above the CPS ≥ 10 threshold.",
      evidence: [{ quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: PATH }],
    },
    {
      id: "NCT06492759-inc-3",
      status: "unknown",
      confidence: "medium",
      rationale:
        "History and exam 2026-09-25 and CT chest/abdomen/pelvis 2026-09-15 are recent (CT stays within 4 weeks only if radiotherapy starts by 2026-10-13), but no bone scan or PET/CT is documented since baseline staging in 11/2025.",
      evidence: [{ quote: "CT CAP 9/15/26 w/ PD: new 2.1 cm seg VI liver lesion, RLL nodule 1.2 -> 1.8 cm, bones stable.", source: NOTE }],
      actionNeeded: "Obtain bone scan or whole-body PET/CT; CT CAP and bone imaging must fall within 4 weeks before radiotherapy starts",
    },
    {
      id: "NCT06492759-inc-4",
      status: "pass",
      confidence: "low",
      rationale:
        "No prior radiotherapy and no documented contraindication to radiation; suitability is a treating-physician determination not yet recorded.",
      actionNeeded: "Radiation oncology review of suitability for high-dose radiotherapy",
    },
    {
      id: "NCT06492759-inc-5",
      status: "fail",
      confidence: "medium",
      rationale:
        "She is taxane-naive, but she progressed on pembrolizumab after ~9 months and her oncologist is planning second-line sacituzumab govitecan or a novel ADC, not continued checkpoint therapy, so immunotherapy eligibility is not supported.",
      evidence: [
        { quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE },
        { quote: "Discussed 2L sacituzumab govitecan (ASCENT) vs clinical trial of novel ADC.", source: NOTE },
        { quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-inc-6",
      status: "pass",
      confidence: "medium",
      rationale:
        "Several discrete targets are present that are typically amenable to stereotactic radiotherapy: the 2.1 cm segment VI liver lesion, the 1.8 cm RLL nodule and the T11/left iliac bone lesions.",
      evidence: [
        { quote: "New 2.1 cm hypoattenuating lesion in hepatic segment VI, consistent with metastasis.", source: CT },
        { quote: "Right lower lobe nodule increased from 1.2 cm to 1.8 cm.", source: CT },
      ],
      actionNeeded: "Confirm with radiation oncology that at least one lesion can receive high-dose radiotherapy",
    },
    {
      id: "NCT06492759-inc-7",
      status: "pass",
      confidence: "low",
      rationale: "Informed consent is obtained at screening; she has said she is interested in trials.",
      evidence: [{ quote: "Pt interested in trials, hopes to start within 3-4 wks.", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-8",
      status: "pass",
      rationale: "She is 46 years old.",
      evidence: [{ quote: "46 yo premenopausal F", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-9",
      status: "pass",
      rationale:
        "Duplicate of the biopsy/receptor criterion: biopsy-proven metastatic TNBC (ER 0%, PR 0%, HER2 IHC 0), PD-L1 CPS 15, with two measurable sites (liver 2.1 cm, RLL 1.8 cm) on CT 2026-09-15.",
      evidence: [
        { quote: "RLL nodule bx 11/20/25 c/w met TNBC, PD-L1 (22C3) CPS 15.", source: NOTE },
        { quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-inc-10",
      status: "pass",
      rationale: "Duplicate of the PD-L1 criterion: CPS 15 by 22C3 pharmDx (2025-11-20) meets CPS ≥ 10.",
      evidence: [{ quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: PATH }],
    },
    {
      id: "NCT06492759-inc-11",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Duplicate of the staging-workup criterion: H&P 2026-09-25 and CT CAP 2026-09-15 are recent, but no bone scan or PET/CT is documented since 11/2025.",
      actionNeeded: "Obtain bone scan or whole-body PET/CT within 4 weeks before radiotherapy starts",
    },
    {
      id: "NCT06492759-inc-12",
      status: "pass",
      confidence: "low",
      rationale: "Duplicate: no prior radiotherapy or documented contraindication; radiotherapy suitability is a treating-physician call not yet recorded.",
      actionNeeded: "Radiation oncology review of suitability for high-dose radiotherapy",
    },
    {
      id: "NCT06492759-inc-13",
      status: "fail",
      confidence: "medium",
      rationale:
        "Duplicate: taxane-naive, but progression on pembrolizumab (CT 2026-09-15) and a second-line ADC plan mean further immunotherapy is not what her oncologist is proposing.",
      evidence: [{ quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "Duplicate: liver 2.1 cm, RLL 1.8 cm and bone lesions offer discrete targets usually suitable for high-dose radiotherapy.",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-15",
      status: "pass",
      confidence: "low",
      rationale: "Duplicate of the consent criterion; written consent is obtained at screening.",
    },
    {
      id: "NCT06492759-inc-16",
      status: "pass",
      rationale: "Duplicate of the age criterion; she is 46.",
      evidence: [{ quote: "46 yo premenopausal F", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-17",
      status: "pass",
      rationale: "ECOG 1 on 2026-09-25 (grade 1 fatigue, working part-time).",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-18",
      status: "pass",
      rationale: "RECIST-measurable lesions on CT 2026-09-15: liver segment VI 2.1 cm and RLL nodule 1.8 cm (both ≥ 10 mm).",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-19",
      status: "pass",
      rationale: "ANC 1.6 × 10⁹/L on 2026-09-23, just above the 1.5 threshold.",
      evidence: [{ quote: "ANC 1.6", source: LABS }],
      actionNeeded: "Repeat CBC within 14 days of first treatment; margin over 1,500/mcL is narrow",
    },
    {
      id: "NCT06492759-inc-20",
      status: "pass",
      rationale: "Platelets 132 × 10⁹/L on 2026-09-23, above 100,000/mcL.",
      evidence: [{ quote: "Plt 132 (L)", source: LABS }],
    },
    {
      id: "NCT06492759-inc-21",
      status: "pass",
      rationale: "Hemoglobin 9.8 g/dL on 2026-09-23 (1 unit PRBC in 7/2026); meets ≥ 9.0 g/dL, and transfusion support is permitted.",
      evidence: [{ quote: "Hgb 9.8 (L)", source: LABS }],
    },
    {
      id: "NCT06492759-inc-22",
      status: "pass",
      rationale: "AST 58 and ALT 61 are 1.5 × ULN on 2026-09-23, within ≤ 2.5 × ULN (and ≤ 5 × allowed with her new liver metastasis).",
      evidence: [
        { quote: "AST 58 (H, 1.5x ULN)", source: LABS },
        { quote: "ALT 61 (H, 1.5x ULN)", source: LABS },
      ],
    },
    {
      id: "NCT06492759-inc-23",
      status: "pass",
      rationale: "Total bilirubin 0.9 mg/dL on 2026-09-23, within normal limits.",
      evidence: [{ quote: "T bili 0.9", source: LABS }],
    },
    {
      id: "NCT06492759-inc-24",
      status: "pass",
      rationale: "Creatinine 0.7 mg/dL on 2026-09-23; Cockcroft-Gault clearance ≈ 108 mL/min (46 y, 68.4 kg, female), well above 30.",
      evidence: [
        { quote: "Cr 0.7", source: LABS },
        { quote: "Wt 68.4 kg.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-inc-25",
      status: "unknown",
      confidence: "low",
      rationale: "Premenopausal with tubal ligation (2014), so of child-bearing potential; no pregnancy test is documented.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
      actionNeeded: "Obtain serum or urine pregnancy test within 14 days before radiation simulation; must be negative",
    },
    {
      id: "NCT06492759-inc-26",
      status: "pass",
      confidence: "low",
      rationale: "Study-specific consent is obtained at screening; no barrier to consent is documented.",
    },
    {
      id: "NCT06492759-inc-27",
      status: "not-applicable",
      rationale: "Concerns treatment for non-metastatic breast cancer; she presented with de novo stage IV disease and never received curative-intent therapy.",
      evidence: [{ quote: "lytic T11 + L iliac lesions (cT3 cN2 M1)", source: NOTE }],
    },
    {
      id: "NCT06492759-inc-28",
      status: "pass",
      confidence: "medium",
      rationale: "No breast or other surgery is recorded (primary never resected; only core biopsies), so there are no wound-healing issues.",
    },
    {
      id: "NCT06492759-inc-29",
      status: "fail",
      rationale:
        "She received gemcitabine/carboplatin with pembrolizumab for metastatic disease from 12/2025 to 2026-08-26, which this criterion excludes.",
      evidence: [
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE },
        { quote: "Last gem/carbo 8/26/26.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-inc-30",
      status: "pass",
      confidence: "medium",
      rationale:
        "Her only ongoing cancer-related agent is denosumab 120 mg q4w, which is permitted; levothyroxine and entecavir are not cancer therapy, and all other treatment is on hold.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: "Medication list" }],
    },
    {
      id: "NCT06492759-inc-31",
      status: "pass",
      rationale: "On denosumab 120 mg every 4 weeks for bone metastases since 12/2025, which is explicitly allowed.",
      evidence: [{ quote: "Bone mets: denosumab 120 mg q4w + Ca/vit D.", source: NOTE }],
    },
    {
      id: "NCT06492759-exc-1",
      status: "pass",
      confidence: "medium",
      rationale:
        "No chemotherapy or targeted therapy preceded her pembrolizumab + gemcitabine/carboplatin, so this specific exclusion is not triggered; the block is the separate no-prior-metastatic-chemotherapy criterion.",
      evidence: [{ quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE }],
    },
    {
      id: "NCT06492759-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No radiotherapy to any site is recorded; the T11 and iliac lesions are sclerotic after systemic therapy.",
      evidence: [{ quote: "Sclerotic (treated) T11 and left iliac lesions, unchanged.", source: CT }],
    },
    {
      id: "NCT06492759-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Baseline brain MRI 2025-11-18 showed no intracranial metastases and she is neurologically asymptomatic, though brain imaging has not been repeated in ~10 months.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No brain imaging since baseline 11/2025; asymptomatic.", source: NOTE },
      ],
      actionNeeded: "Consider repeat brain MRI before enrollment (last 2025-11-18)",
    },
    {
      id: "NCT06492759-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "The CT 2026-09-15 impression mentions no pleural or pericardial effusion or ascites, and lungs are clear with a soft abdomen on exam.",
      evidence: [
        { quote: "Lungs clear.", source: NOTE },
        { quote: "Abd soft, nontender.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-exc-5",
      status: "pass",
      confidence: "medium",
      rationale:
        "Denosumab is for skeletal-event prevention with calcium/vitamin D supplementation; no hypercalcemia is recorded. Serum calcium is not listed in the 2026-09-23 panel.",
      evidence: [{ quote: "Bone mets: denosumab 120 mg q4w + Ca/vit D.", source: NOTE }],
      actionNeeded: "Confirm corrected serum calcium ≤ ULN on screening chemistry",
    },
    {
      id: "NCT06492759-exc-6",
      status: "pass",
      rationale:
        "No autoimmune disease before pembrolizumab; her immune-related hypothyroidism is managed with levothyroxine replacement only, which this criterion does not count as systemic treatment.",
      evidence: [
        { quote: "No autoimmune dz prior to pembro.", source: NOTE },
        { quote: "irAE hypothyroidism G2: levothyroxine 88 mcg, TSH 2.2, continue.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No systemic corticosteroids or immunosuppressants on the medication list (levothyroxine, entecavir, denosumab, ondansetron prn, calcium/vitamin D).",
    },
    {
      id: "NCT06492759-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No stem cell or solid organ transplant is mentioned in an otherwise detailed history.",
    },
    {
      id: "NCT06492759-exc-9",
      status: "pass",
      rationale: "No cardiac history is recorded; BP 118/72 and HR 88 on 2026-09-25.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT06492759-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "No acute bacterial or fungal infection or IV antibiotic use is documented; entecavir is oral HBV prophylaxis.",
    },
    {
      id: "NCT06492759-exc-11",
      status: "pass",
      rationale: "No pneumonitis during pembrolizumab, and CT 2026-09-15 shows no interstitial lung disease or pneumonitis.",
      evidence: [
        { quote: "No interstitial lung disease or pneumonitis.", source: CT },
        { quote: "irAE hypothyroidism G2 2/2026 -> levothyroxine; no pneumonitis/colitis.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Never smoker with clear lungs and SpO2 98% on room air; no COPD or respiratory hospitalization recorded.",
      evidence: [
        { quote: "SH: accountant, 2 kids, never smoker.", source: NOTE },
        { quote: "BP 118/72 HR 88 SpO2 98% RA.", source: NOTE },
      ],
    },
    {
      id: "NCT06492759-exc-13",
      status: "pass",
      rationale: "HIV Ag/Ab negative in 12/2025.",
      evidence: [{ quote: "Serologies 12/2025: HBsAg neg, anti-HBc POS, HCV Ab neg, HIV Ag/Ab neg", source: LABS }],
    },
    {
      id: "NCT06492759-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy is mentioned; germline panel was negative.",
    },
    {
      id: "NCT06492759-exc-15",
      status: "pass",
      confidence: "medium",
      rationale:
        "No major surgery recorded or planned, and she has never received a taxane so no nab-paclitaxel hypersensitivity is known; overall suitability rests with the investigator.",
      evidence: [{ quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: NOTE }],
    },
    {
      id: "NCT06492759-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No psychiatric or substance-use disorder is recorded; she works part-time as an accountant.",
      evidence: [{ quote: "G1 fatigue, works part-time from home.", source: NOTE }],
    },
    {
      id: "NCT06492759-exc-17",
      status: "pass",
      confidence: "low",
      rationale: "Tubal ligation in 2014 and no pregnancy or breastfeeding recorded; status is confirmed by the screening pregnancy test.",
      evidence: [{ quote: "46 yo premenopausal F (s/p BTL 2014)", source: NOTE }],
    },
  ],
);
