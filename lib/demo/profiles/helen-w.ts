import type { PatientProfile } from "@/lib/types";
import { EXTRACTED_AT, ev, x } from "../profile-helpers";

// ---------------------------------------------------------------------------
// Helen W. — HR+/HER2-low stage IIIA, node-positive high risk, adjuvant planning
// ---------------------------------------------------------------------------

const H_NOTE = "Oncology follow-up note 2026-09-25";
const H_PATH = "Pathology report, modified radical mastectomy 2026-05-12";
const H_GEN = "Germline panel 2026-06-09";
const H_MAMMO = "Screening mammogram 2026-04-02";
const H_CT = "Staging CT chest/abdomen/pelvis + bone scan 2026-05-21";
const H_ECHO = "Echocardiogram 2026-05-28";
const H_ECG = "ECG 2026-09-21";
const H_LABS = "Labs 2026-09-23";
const H_MEDS = "Medication list";
const H_ALLERGY = "Allergies";

export const PROFILE: PatientProfile = {
  id: "helen-w",
  label: "Helen W.",
  demographics: {
    age: x(72, "high", [ev("72 yo postmenopausal F", H_NOTE)]),
    sex: x("female" as const, "high", [ev("72 yo postmenopausal F", H_NOTE)]),
    menopausalStatus: x(
      "postmenopausal" as const,
      "high",
      [ev("72 yo postmenopausal F (menopause ~50, no HRT)", H_NOTE)],
      "Menopause at about 50; no hormone replacement therapy.",
    ),
  },
  diagnosis: {
    primary: x(
      "Invasive ductal carcinoma with lobular features, right breast",
      "high",
      [
        ev("R breast IDC w/ lobular features, grade 3", H_NOTE),
        ev("Invasive ductal carcinoma with lobular features, Nottingham grade 3 (8/9), 3.8 cm.", H_PATH),
      ],
    ),
    histology: x(
      "Invasive ductal carcinoma with lobular features (E-cadherin positive)",
      "high",
      [ev("Invasive ductal carcinoma with lobular features", H_PATH), ev("E-cadherin positive.", H_PATH)],
    ),
    grade: x("Grade 3 (Nottingham 8/9)", "high", [ev("Nottingham grade 3 (8/9)", H_PATH)]),
    laterality: x("right" as const, "high", [ev("R breast IDC w/ lobular features", H_NOTE)]),
    diagnosisDate: x(
      "2026-04-14",
      "high",
      [ev("core bx 4/14/26", H_NOTE), ev("Biomarkers (core bx 04/14/2026):", H_PATH)],
      "Detected on screening mammogram 2026-04-02; diagnosed on core biopsy 2026-04-14.",
    ),
    stageAtDiagnosis: x(
      "IIIA",
      "high",
      [ev("pT2 pN2a M0, stage IIIA", H_NOTE)],
      "Anatomic stage (AJCC 8th) from surgical pathology after upfront mastectomy.",
    ),
    tnm: x(
      "pT2 (3.8 cm) pN2a (5/18, extranodal extension) M0",
      "high",
      [
        ev("Pathologic stage (AJCC 8th): pT2 pN2a", H_PATH),
        ev("Lymph nodes: 5 of 18 positive, largest deposit 1.6 cm, extranodal extension present.", H_PATH),
        ev("No evidence of distant metastatic disease.", H_CT),
      ],
      "M0 per negative staging CT and bone scan (2026-05-21).",
    ),
    currentStage: x(
      "No evidence of disease after definitive surgery (stage IIIA at diagnosis)",
      "high",
      [ev("s/p MRM + adj TC x4, on PMRT + letrozole. NED.", H_NOTE)],
    ),
    setting: x(
      "early" as const,
      "high",
      [
        ev("R breast ca, stage IIIA (pT2 pN2a), HR+/HER2-low, gr 3, Ki-67 35%, s/p MRM + adj TC x4, on PMRT + letrozole. NED.", H_NOTE),
        ev("No evidence of distant metastatic disease.", H_CT),
      ],
      "Early-stage, high-risk disease treated with curative intent after upfront mastectomy; currently in the adjuvant phase (radiation ongoing, letrozole started).",
    ),
    subtype: x(
      "HR+/HER2-low",
      "high",
      [
        ev("ER 90% / PR 5% / HER2 2+ ISH neg (HER2-low)", H_NOTE),
        ev("HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", H_PATH),
      ],
      "HER2-negative by ASCO/CAP (IHC 2+, ISH not amplified); PR low (5%).",
    ),
    metastaticSites: x([], "high", [ev("No evidence of distant metastatic disease.", H_CT)]),
    measurableDisease: x(
      false,
      "high",
      [ev("s/p MRM + adj TC x4, on PMRT + letrozole. NED.", H_NOTE)],
      "No measurable or evaluable disease after mastectomy.",
    ),
    cnsStatus: x(
      "none" as const,
      "medium",
      [ev("No bone pain, cough, HA.", H_NOTE)],
      "No brain imaging (not indicated in asymptomatic early-stage disease).",
    ),
  },
  biomarkers: [
    {
      name: "ER",
      status: "positive",
      detail: "90%, strong",
      method: "IHC",
      date: "2026-04-14",
      specimen: "core biopsy 2026-04-14",
      evidence: [ev("ER: positive, 90%, strong intensity", H_PATH), ev("ER 90% / PR 5% / HER2 2+ ISH neg (HER2-low)", H_NOTE)],
      confidence: "high",
    },
    {
      name: "PR",
      status: "positive",
      detail: "5%, weak (PR-low)",
      method: "IHC",
      date: "2026-04-14",
      specimen: "core biopsy 2026-04-14",
      evidence: [ev("PR: positive, 5%, weak intensity", H_PATH)],
      confidence: "high",
    },
    {
      name: "HER2",
      status: "low",
      detail: "IHC 2+, ISH not amplified (HER2/CEP17 ratio 1.3, mean copy number 3.4) — HER2-negative, HER2-low",
      method: "IHC + ISH",
      date: "2026-04-14",
      specimen: "core biopsy 2026-04-14",
      evidence: [
        ev("HER2 IHC: 2+ (equivocal)", H_PATH),
        ev("HER2 ISH: not amplified (HER2/CEP17 ratio 1.3, mean HER2 copy number 3.4) - HER2-negative, HER2-low", H_PATH),
      ],
      confidence: "high",
    },
    {
      name: "Ki-67",
      status: "high",
      detail: "35%",
      method: "IHC",
      date: "2026-04-14",
      specimen: "core biopsy 2026-04-14",
      evidence: [ev("Ki-67: 35%", H_PATH)],
      confidence: "high",
    },
    {
      name: "gBRCA",
      status: "negative",
      detail: "Germline multigene panel negative",
      method: "germline",
      date: "2026-06-09",
      specimen: "blood (germline multigene panel)",
      evidence: [
        ev("No pathogenic variants (BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 negative).", H_GEN),
        ev("Germline panel neg.", H_NOTE),
      ],
      confidence: "high",
    },
    {
      name: "BRCA1",
      status: "wild-type",
      detail: "No pathogenic variant (germline)",
      method: "germline",
      date: "2026-06-09",
      specimen: "blood (germline multigene panel)",
      evidence: [ev("No pathogenic variants (BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 negative).", H_GEN)],
      confidence: "high",
    },
    {
      name: "BRCA2",
      status: "wild-type",
      detail: "No pathogenic variant (germline)",
      method: "germline",
      date: "2026-06-09",
      specimen: "blood (germline multigene panel)",
      evidence: [ev("No pathogenic variants (BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 negative).", H_GEN)],
      confidence: "high",
    },
    {
      name: "PALB2",
      status: "wild-type",
      detail: "No pathogenic variant (germline)",
      method: "germline",
      date: "2026-06-09",
      specimen: "blood (germline multigene panel)",
      evidence: [ev("No pathogenic variants (BRCA1, BRCA2, PALB2, CHEK2, ATM, TP53, PTEN, CDH1 negative).", H_GEN)],
      confidence: "high",
    },
  ],
  treatments: [
    {
      name: "Right modified radical mastectomy",
      category: "surgery",
      intent: "unknown",
      startDate: "2026-05-12",
      status: "completed",
      bestResponse: "pT2 (3.8 cm) pN2a (5/18, extranodal extension), LVI present, margins negative",
      evidence: [
        ev("R MRM 5/12/26: 3.8 cm, 5/18 LN+ w/ ENE, LVI+, margins neg -> pT2 pN2a M0, stage IIIA.", H_NOTE),
        ev("Procedure date: 05/12/2026", H_PATH),
      ],
      confidence: "high",
    },
    {
      name: "Docetaxel + cyclophosphamide (TC) ×4",
      agents: ["docetaxel", "cyclophosphamide"],
      category: "chemotherapy",
      intent: "adjuvant",
      startDate: "2026-06-17",
      endDate: "2026-08-19",
      status: "completed",
      reasonStopped: "completed planned course (anthracycline avoided for atrial fibrillation and LVEF 52%; grade 1 neuropathy)",
      evidence: [
        ev("Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26 - anthracycline avoided given pAF + LVEF 52%.", H_NOTE),
        ev("docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", H_MEDS),
      ],
      confidence: "high",
    },
    {
      name: "Letrozole",
      agents: ["letrozole"],
      category: "endocrine",
      intent: "adjuvant",
      startDate: "2026-09-08",
      status: "ongoing",
      evidence: [
        ev("Letrozole 2.5 mg started 9/8/26.", H_NOTE),
        ev("letrozole 2.5 mg PO daily (started 9/8/2026)", H_MEDS),
      ],
      confidence: "high",
    },
    {
      name: "Post-mastectomy radiation to chest wall + regional nodes (planned completion 2026-10-20)",
      category: "radiation",
      intent: "adjuvant",
      startDate: "2026-09-14",
      status: "ongoing",
      evidence: [
        ev("PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", H_NOTE),
        ev("Mild chest wall pinkness on RT, no desquamation.", H_NOTE),
      ],
      confidence: "high",
    },
  ],
  performance: {
    ecog: x(1, "high", [ev("EXAM: ECOG 1.", H_NOTE)], "Fatigue improving after chemotherapy; currently receiving daily radiation."),
  },
  labs: [
    { name: "WBC", value: "4.4", unit: "x10^9/L", date: "2026-09-23", flag: "normal", evidence: [ev("WBC 4.4", H_LABS)] },
    { name: "ANC", value: "2.3", unit: "x10^9/L", date: "2026-09-23", flag: "normal", evidence: [ev("ANC 2.3", H_LABS)] },
    { name: "Hemoglobin", value: "11.1", unit: "g/dL", date: "2026-09-23", flag: "abnormal", evidence: [ev("Hgb 11.1 (L)", H_LABS)] },
    { name: "Platelets", value: "201", unit: "x10^9/L", date: "2026-09-23", flag: "normal", evidence: [ev("Plt 201", H_LABS)] },
    { name: "Creatinine", value: "1.1", unit: "mg/dL", date: "2026-09-23", flag: "normal", evidence: [ev("Cr 1.1 | eGFR 49 (L)", H_LABS)] },
    { name: "eGFR", value: "49", unit: "mL/min/1.73m²", date: "2026-09-23", flag: "abnormal", evidence: [ev("eGFR 49 (L)", H_LABS)] },
    { name: "AST", value: "22", unit: "U/L", date: "2026-09-23", flag: "normal", evidence: [ev("AST 22", H_LABS)] },
    { name: "ALT", value: "18", unit: "U/L", date: "2026-09-23", flag: "normal", evidence: [ev("ALT 18", H_LABS)] },
    { name: "Total bilirubin", value: "0.6", unit: "mg/dL", date: "2026-09-23", flag: "normal", evidence: [ev("T bili 0.6", H_LABS)] },
    { name: "Alkaline phosphatase", value: "84", unit: "U/L", date: "2026-09-23", flag: "normal", evidence: [ev("Alk phos 84", H_LABS)] },
    { name: "Calcium", value: "9.2", unit: "mg/dL", date: "2026-09-23", flag: "normal", evidence: [ev("Ca 9.2", H_LABS)] },
    {
      name: "25-OH vitamin D",
      value: "24",
      unit: "ng/mL",
      date: "2026-09-23",
      flag: "abnormal",
      evidence: [ev("25-OH vitamin D 24 (L)", H_LABS)],
    },
    {
      name: "LVEF",
      value: "52",
      unit: "%",
      date: "2026-05-28",
      flag: "normal",
      evidence: [ev("ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", H_ECHO)],
    },
    {
      name: "QTcF",
      value: "448",
      unit: "ms",
      date: "2026-09-21",
      flag: "normal",
      evidence: [ev("ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", H_ECG)],
    },
  ],
  comorbidities: [
    x(
      "Paroxysmal atrial fibrillation (apixaban; rate controlled on metoprolol; sinus rhythm on ECG 2026-09-21)",
      "high",
      [
        ev("paroxysmal AF (dx 2021) on apixaban, rate controlled on metoprolol", H_NOTE),
        ev("ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", H_ECG),
      ],
    ),
    x(
      "History of provoked DVT (left leg, 2019, after left total knee arthroplasty); completed 3 months of anticoagulation",
      "high",
      [ev("provoked DVT L leg 2019 after L TKA, completed 3 mo anticoagulation", H_NOTE)],
      "Currently anticoagulated for atrial fibrillation rather than for VTE; flagged as a concern with abemaciclib.",
    ),
    x(
      "Chronic kidney disease stage 3a (Cr 1.1, eGFR 49)",
      "high",
      [ev("CKD 3a (baseline Cr 1.0-1.1)", H_NOTE), ev("eGFR 49 (L)", H_LABS)],
    ),
    x(
      "Hypertension (amlodipine; lisinopril stopped for cough)",
      "high",
      [ev("HTN on amlodipine (lisinopril - cough)", H_NOTE)],
    ),
    x(
      "Low-normal LVEF 52% (echo 2026-05-28)",
      "high",
      [
        ev("ECHO 05/28/2026: LVEF 52% (low-normal), mild LA enlargement, no WMA.", H_ECHO),
        ev("anthracycline avoided given pAF + LVEF 52%", H_NOTE),
      ],
      "Pre-chemotherapy study; no repeat echocardiogram documented.",
    ),
    x(
      "Osteopenia (DEXA 2025, T-score -2.1), now on an aromatase inhibitor",
      "high",
      [ev("osteopenia (DEXA 2025 T-score -2.1)", H_NOTE)],
    ),
    x("Hyperlipidemia (atorvastatin)", "high", [ev("HLD on atorvastatin.", H_NOTE)]),
    x(
      "Grade 1 peripheral sensory neuropathy, fingertips (docetaxel)",
      "high",
      [ev("G1 PN fingertps (numbness, buttons ok)", H_NOTE), ev("Neuro: decr light touch fingertips.", H_NOTE)],
    ),
    x(
      "Mild anemia (Hgb 11.1 g/dL) after chemotherapy",
      "high",
      [ev("Anemia Hgb 11.1 post-chemo, monitor.", H_NOTE)],
    ),
  ],
  medications: [
    x(
      "Letrozole 2.5 mg daily (adjuvant, since 2026-09-08)",
      "high",
      [ev("letrozole 2.5 mg PO daily (started 9/8/2026)", H_MEDS)],
    ),
    x(
      "Apixaban 5 mg BID (anticoagulant)",
      "high",
      [ev("apixaban 5 mg PO BID", H_MEDS)],
      "Therapeutic anticoagulation for atrial fibrillation; CYP3A4/P-gp substrate (interaction with ribociclib under pharmacy review).",
    ),
    x("Metoprolol succinate 50 mg daily", "high", [ev("metoprolol succinate 50 mg PO daily", H_MEDS)]),
    x("Amlodipine 5 mg daily", "high", [ev("amlodipine 5 mg PO daily", H_MEDS)]),
    x("Atorvastatin 20 mg nightly", "high", [ev("atorvastatin 20 mg PO nightly", H_MEDS)]),
    x(
      "Calcium carbonate 600 mg / vitamin D3 800 IU daily",
      "high",
      [ev("calcium carbonate 600 mg / vitamin D3 800 IU daily", H_MEDS), ev("Vit D 24 -> D3 2000 IU.", H_NOTE)],
      "Vitamin D3 being increased to 2000 IU for 25-OH vitamin D 24 ng/mL.",
    ),
    x(
      "Docetaxel + cyclophosphamide — completed 2026-08-19 (cycle 4 of 4)",
      "high",
      [ev("docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", H_MEDS)],
      "Listed for washout purposes; not a current medication.",
    ),
    x(
      "Zoledronic acid 4 mg IV every 6 months — planned after radiation (dental clearance pending)",
      "high",
      [
        ev("zoledronic acid 4 mg IV q6 mo - PLANNED after RT", H_MEDS),
        ev("Bone health: zoledronic acid q6mo after RT, dental clearance pending.", H_NOTE),
      ],
      "Not yet started.",
    ),
  ],
  allergies: [
    x(
      "Lisinopril (cough)",
      "high",
      [ev("ALLERGIES: lisinopril (cough)", H_ALLERGY)],
      "ACE-inhibitor cough; an intolerance rather than a true allergy.",
    ),
  ],
  keyDates: [
    {
      label: "Abnormal screening mammogram",
      date: "2026-04-02",
      evidence: [ev("Screening mammogram 04/02/2026: R breast UOQ 3.4 cm spiculated mass, BI-RADS 5.", H_MAMMO)],
    },
    { label: "Initial diagnosis (core biopsy)", date: "2026-04-14", evidence: [ev("core bx 4/14/26", H_NOTE)] },
    { label: "Surgery (right modified radical mastectomy)", date: "2026-05-12", evidence: [ev("Procedure date: 05/12/2026", H_PATH)] },
    {
      label: "Staging CT + bone scan (no distant metastases)",
      date: "2026-05-21",
      evidence: [ev("CT CHEST/ABDOMEN/PELVIS W/ CONTRAST + BONE SCAN - 2026-05-21", H_CT)],
    },
    { label: "Last echocardiogram", date: "2026-05-28", evidence: [ev("ECHO 05/28/2026: LVEF 52% (low-normal)", H_ECHO)] },
    {
      label: "Germline panel result",
      date: "2026-06-09",
      evidence: [ev("GENETICS - Germline multigene panel (blood), reported 2026-06-09:", H_GEN)],
    },
    {
      label: "Start of adjuvant chemotherapy (TC)",
      date: "2026-06-17",
      evidence: [ev("Adj TC (docetaxel/cyclophosphamide) x4 6/17/26-8/19/26", H_NOTE)],
    },
    {
      label: "Last dose of chemotherapy",
      date: "2026-08-19",
      evidence: [ev("docetaxel + cyclophosphamide - COMPLETED 8/19/2026 (C4 of 4)", H_MEDS)],
    },
    { label: "Start of adjuvant letrozole", date: "2026-09-08", evidence: [ev("Letrozole 2.5 mg started 9/8/26.", H_NOTE)] },
    {
      label: "Start of post-mastectomy radiation",
      date: "2026-09-14",
      evidence: [ev("PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", H_NOTE)],
    },
    { label: "Last ECG", date: "2026-09-21", evidence: [ev("ECG 09/21/2026: sinus rhythm 64, QTcF 448 ms.", H_ECG)] },
    { label: "Most recent labs", date: "2026-09-23", evidence: [ev("LABS 2026-09-23", H_LABS)] },
    { label: "Most recent clinic visit", date: "2026-09-25", evidence: [ev("Date of service: 9/25/2026", H_NOTE)] },
    {
      label: "Planned completion of radiation",
      date: "2026-10-20",
      evidence: [ev("PMRT (chest wall + RNI) started 9/14/26, planned completion 10/20/26.", H_NOTE)],
    },
  ],
  openQuestions: [
    "Post-mastectomy radiation is still in progress (planned completion about 2026-10-20); many adjuvant trials require radiation to be completed, with recovery from acute toxicity, before randomization.",
    "Timing windows: core biopsy 2026-04-14, surgery 2026-05-12 and last chemotherapy 2026-08-19 — check each trial's maximum interval from diagnosis, surgery or chemotherapy to enrollment.",
    "Letrozole started 2026-09-08; adjuvant oral SERD and CDK4/6 inhibitor trials often cap the duration of prior endocrine therapy before randomization (commonly about 12 weeks) — confirm the window.",
    "Therapeutic anticoagulation with apixaban (atrial fibrillation) and a prior provoked DVT (2019): confirm whether candidate trials exclude prior VTE or concurrent anticoagulants, and review CYP3A4/P-gp interactions with study drugs.",
    "eGFR 49 (CKD stage 3a, creatinine 1.1); creatinine clearance (Cockcroft-Gault) is not documented — check trial renal thresholds (often CrCl ≥ 30–60 mL/min).",
    "LVEF 52% (low-normal) on the pre-chemotherapy echo of 2026-05-28; trials typically require LVEF ≥ 50% or ≥ institutional lower limit within a set window — a repeat may be needed.",
    "QTcF 448 ms (2026-09-21) is borderline for ribociclib (< 450 ms required to start) and for trials with QTc exclusions.",
    "Hepatitis B/C and HIV serology are not documented.",
    "ctDNA (Signatera) has not been sent, and no genomic recurrence score (Oncotype) was performed; ctDNA-guided adjuvant trials would need a baseline sample.",
    "Zoledronic acid is planned after radiation (dental clearance pending); confirm whether trials restrict starting bone-modifying agents around randomization.",
    "The 2026-09-25 A/P carries a stale copy-forward line ('TC C3 today, counts ok, proceed; pegfilgrastim D2'); chemotherapy finished on 2026-08-19 (cycle 4 of 4) — verify no chemotherapy is ongoing.",
    "Archival tissue: mastectomy blocks (2026-05) are available; biomarkers were performed on the 2026-04-14 core biopsy — check which specimen a trial requires.",
  ],
  summary:
    "72-year-old postmenopausal woman with stage IIIA (pT2 pN2a, 5/18 nodes with extranodal extension), grade 3 HR+/HER2-low right breast cancer (ER 90%, PR 5%, HER2 IHC 2+/ISH not amplified, Ki-67 35%; germline panel negative), treated with upfront mastectomy on 2026-05-12 and adjuvant docetaxel + cyclophosphamide ×4 (completed 2026-08-19). Post-mastectomy radiation is ongoing until about 2026-10-20 and adjuvant letrozole started 2026-09-08; she is high risk by node count (meets monarchE and NATALEE criteria), without evidence of disease, ECOG 1, and deciding between adjuvant abemaciclib, ribociclib or a clinical trial. Relevant comorbidities: paroxysmal atrial fibrillation on apixaban, prior provoked DVT (2019), CKD 3a (eGFR 49), LVEF 52% and QTcF 448 ms.",
  extractedAt: EXTRACTED_AT,
  source: "demo",
};
