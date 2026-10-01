import type { PatientProfile } from "@/lib/types";
import { EXTRACTED_AT, ev, x } from "../profile-helpers";

// ---------------------------------------------------------------------------
// Priya S. — newly diagnosed, treatment-naive HR+/HER2+ stage IIIA; neoadjuvant planning
// ---------------------------------------------------------------------------

const P_NOTE = "Oncology new patient consult 2026-09-23";
const P_PATH = "Pathology report, R breast core biopsy + axillary FNA 2026-09-03";
const P_GEN = "Germline panel (sent 2026-09-10)";
const P_MAMMO = "Diagnostic mammogram + US 2026-08-28";
const P_MRI = "Breast MRI 2026-09-11";
const P_PET = "PET/CT 2026-09-15";
const P_ECHO = "Echocardiogram + ECG 2026-09-17";
const P_LABS = "Labs 2026-09-22";
const P_MEDS = "Medication list";
const P_ALLERGY = "Allergies";

export const PROFILE: PatientProfile = {
  id: "priya-s",
  label: "Priya S.",
  demographics: {
    age: x(34, "high", [ev("34 yo premenopausal F, G0", P_NOTE), ev("DOB: 1992 (34 yo F)", P_NOTE)]),
    sex: x("female" as const, "high", [ev("34 yo premenopausal F, G0", P_NOTE)]),
    menopausalStatus: x(
      "premenopausal" as const,
      "high",
      [ev("34 yo premenopausal F, G0", P_NOTE), ev("LMP 9/8/2026.", P_NOTE)],
      "Regular cycles (LMP 2026-09-08); currently undergoing ovarian stimulation for oocyte cryopreservation.",
    ),
  },
  diagnosis: {
    primary: x(
      "Invasive ductal carcinoma of the right breast, HR+/HER2+, clinical stage IIIA (cT3 cN1 M0), treatment-naive",
      "high",
      [
        ev("R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", P_NOTE),
        ev("A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", P_PATH),
      ],
    ),
    histology: x("Invasive ductal carcinoma", "high", [ev("A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", P_PATH)]),
    grade: x("Grade 3 (Nottingham 8/9)", "high", [ev("A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", P_PATH)]),
    laterality: x(
      "right" as const,
      "high",
      [
        ev("Specimen: A. Right breast 10 o'clock, US-guided core biopsy; B. Right axillary lymph node, FNA", P_PATH),
        ev("L breast upper inner quadrant 6 mm enhancing focus, plateau kinetics, indeterminate. BI-RADS 4. MRI-guided biopsy recommended.", P_MRI),
      ],
      "Biopsy-proven disease is right-sided only; an indeterminate 6 mm left-breast MRI focus (BI-RADS 4) is awaiting biopsy on 2026-09-30 — would become bilateral if malignant.",
    ),
    diagnosisDate: x("2026-09-03", "high", [ev("US-guided core bx 9/3/26", P_NOTE), ev("Collected: 2026-09-03 | Reported: 2026-09-08", P_PATH)]),
    stageAtDiagnosis: x(
      "IIIA",
      "high",
      [ev("R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", P_NOTE)],
      "Anatomic clinical stage as documented by the treating oncologist.",
    ),
    tnm: x(
      "cT3 cN1 M0",
      "high",
      [
        ev("R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", P_NOTE),
        ev("Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", P_MRI),
        ev("Three abnormal R level I axillary nodes. No internal mammary or supraclavicular adenopathy.", P_MRI),
        ev("No FDG-avid distant metastases.", P_PET),
      ],
      "cT3 from the 5.4 cm MRI size; cN1 = FNA-proven mobile level I axillary nodes; M0 on PET/CT.",
    ),
    currentStage: x(
      "IIIA",
      "high",
      [ev("R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", P_NOTE)],
      "Unchanged from diagnosis — no treatment has been given.",
    ),
    setting: x(
      "early" as const,
      "high",
      [
        ev("R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", P_NOTE),
        ev("No FDG-avid distant metastases.", P_PET),
      ],
      "Locally advanced but operable stage III (cT3 cN1 M0), non-metastatic, curative intent; primary tumor in place and neoadjuvant therapy planned. Routed as early disease.",
    ),
    subtype: x(
      "HR+/HER2+",
      "high",
      [
        ev("ER+/PR+/HER2+ (IHC 3+)", P_NOTE),
        ev("CC: newly dx R breast ca, triple positive, neoadj tx planning.", P_NOTE),
        ev("HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", P_PATH),
      ],
      "Triple-positive: ER 60%, PR 20%, HER2 IHC 3+.",
    ),
    metastaticSites: x(
      [],
      "high",
      [ev("No FDG-avid distant metastases.", P_PET), ev("PET/CT 9/15: FDG-avid R breast mass + R axillary nodes, no distant mets.", P_NOTE)],
    ),
    measurableDisease: x(
      true,
      "medium",
      [ev("Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", P_MRI), ev("Palpable mobile R axillary node ~1.5 cm.", P_NOTE)],
      "Intact 5.4 cm primary and FDG-avid axillary nodes; 'measurable' is not stated explicitly.",
    ),
    cnsStatus: x(
      "none" as const,
      "medium",
      [ev("No FDG-avid distant metastases.", P_PET)],
      "No brain imaging (not routinely indicated in asymptomatic stage III); no neurological symptoms documented.",
    ),
  },
  biomarkers: [
    {
      name: "ER",
      status: "positive",
      detail: "60%, moderate intensity",
      method: "IHC",
      date: "2026-09-03",
      specimen: "R breast core biopsy 2026-09",
      evidence: [ev("ER: positive, 60% of tumor cells, moderate intensity", P_PATH), ev("ER 60% moderate", P_NOTE)],
      confidence: "high",
    },
    {
      name: "PR",
      status: "positive",
      detail: "20%, weak to moderate intensity",
      method: "IHC",
      date: "2026-09-03",
      specimen: "R breast core biopsy 2026-09",
      evidence: [ev("PR: positive, 20% of tumor cells, weak to moderate intensity", P_PATH)],
      confidence: "high",
    },
    {
      name: "HER2",
      status: "positive",
      detail: "IHC 3+ (complete intense circumferential membrane staining in >10% of cells); ISH not performed",
      method: "IHC",
      date: "2026-09-03",
      specimen: "R breast core biopsy 2026-09",
      evidence: [
        ev("HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", P_PATH),
        ev("HER2 ISH: not performed (IHC 3+)", P_PATH),
      ],
      confidence: "high",
    },
    {
      name: "Ki-67",
      status: "high",
      detail: "45%",
      method: "IHC",
      date: "2026-09-03",
      specimen: "R breast core biopsy 2026-09",
      evidence: [ev("Ki-67: 45%", P_PATH)],
      confidence: "high",
    },
    {
      name: "gBRCA",
      status: "unknown",
      detail: "Germline multigene panel sent 2026-09-10, result pending (mother with breast cancer at 52)",
      method: "germline",
      specimen: "blood (germline)",
      evidence: [
        ev("Germline multigene panel (blood) sent 09/10/2026 - RESULT PENDING.", P_GEN),
        ev("Germline panel sent 9/10 (mother breast ca at 52) - pending.", P_NOTE),
      ],
      confidence: "high",
    },
  ],
  treatments: [
    {
      name: "Oocyte cryopreservation — letrozole + gonadotropin ovarian stimulation (fertility preservation, not cancer-directed)",
      agents: ["letrozole", "follitropin alfa", "menotropins"],
      category: "other",
      intent: "unknown",
      startDate: "2026-09-21",
      status: "ongoing",
      evidence: [
        ev("oocyte cryopreservation cycle in progress (letrozole + gonadotropins, random start 9/21), retrieval planned ~10/5.", P_NOTE),
        ev("letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", P_MEDS),
        ev("follitropin alfa + menotropins SC nightly - ovarian stimulation per REI", P_MEDS),
      ],
      confidence: "high",
    },
    {
      name: "Docetaxel + carboplatin + trastuzumab + pertuzumab (TCHP) x6, then surgery — standard option under consideration",
      agents: ["docetaxel", "carboplatin", "trastuzumab", "pertuzumab"],
      category: "chemotherapy",
      intent: "neoadjuvant",
      startDate: "2026-10",
      status: "planned",
      evidence: [
        ev("neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery, adj tx per path response.", P_NOTE),
        ev("Wants to start neoadj tx wk of 10/12.", P_NOTE),
        ev("Pt interested in trials (neoadj de-escalation or novel anti-HER2 agent) - referred to research coordinator.", P_NOTE),
      ],
      confidence: "medium",
    },
  ],
  performance: {
    ecog: x(0, "high", [ev("EXAM: ECOG 0.", P_NOTE)], "Working full time as a software engineer."),
  },
  labs: [
    { name: "WBC", value: "6.8", unit: "x10^9/L", date: "2026-09-22", flag: "normal", evidence: [ev("WBC 6.8", P_LABS)] },
    { name: "ANC", value: "4.1", unit: "x10^9/L", date: "2026-09-22", flag: "normal", evidence: [ev("ANC 4.1", P_LABS)] },
    { name: "Hemoglobin", value: "13.1", unit: "g/dL", date: "2026-09-22", flag: "normal", evidence: [ev("Hgb 13.1", P_LABS)] },
    { name: "Platelets", value: "255", unit: "x10^9/L", date: "2026-09-22", flag: "normal", evidence: [ev("Plt 255", P_LABS)] },
    { name: "Creatinine", value: "0.6", unit: "mg/dL", date: "2026-09-22", flag: "normal", evidence: [ev("Cr 0.6", P_LABS)] },
    { name: "AST", value: "18", unit: "U/L", date: "2026-09-22", flag: "normal", evidence: [ev("AST 18", P_LABS)] },
    { name: "ALT", value: "21", unit: "U/L", date: "2026-09-22", flag: "normal", evidence: [ev("ALT 21", P_LABS)] },
    { name: "Total bilirubin", value: "0.4", unit: "mg/dL", date: "2026-09-22", flag: "normal", evidence: [ev("T bili 0.4", P_LABS)] },
    { name: "Alkaline phosphatase", value: "62", unit: "U/L", date: "2026-09-22", flag: "normal", evidence: [ev("Alk phos 62", P_LABS)] },
    { name: "Albumin", value: "4.4", unit: "g/dL", date: "2026-09-22", flag: "normal", evidence: [ev("Albumin 4.4", P_LABS)] },
    { name: "hCG (serum)", value: "negative", date: "2026-09-22", flag: "normal", evidence: [ev("hCG (serum) negative", P_LABS)] },
    {
      name: "Hepatitis B/C and HIV serologies",
      value: "pending",
      date: "2026-09-22",
      flag: "unknown",
      evidence: [ev("HBsAg, anti-HBc, HCV Ab, HIV Ag/Ab: pending", P_LABS), ev("Hep B/C + HIV serologies sent 9/22 - pending.", P_NOTE)],
    },
    {
      name: "LVEF",
      value: "63",
      unit: "%",
      date: "2026-09-17",
      flag: "normal",
      evidence: [ev("ECHO 9/17/2026: LVEF 63%, normal LV size and function.", P_ECHO)],
    },
    {
      name: "QTc",
      value: "412",
      unit: "ms",
      date: "2026-09-17",
      flag: "normal",
      evidence: [ev("ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", P_ECHO)],
    },
  ],
  comorbidities: [
    x(
      "Mild intermittent asthma (albuterol as needed, never hospitalized)",
      "high",
      [ev("mild intermitent asthma (albuterol prn, never hospitalized)", P_NOTE)],
      "No cardiac history and no diabetes ('No cardiac hx. No DM.'); never smoker.",
    ),
  ],
  medications: [
    x(
      "Albuterol HFA 2 puffs every 4–6 h as needed",
      "high",
      [ev("albuterol HFA 2 puffs q4-6h prn wheeze", P_MEDS)],
      "No anticoagulants, systemic steroids or strong CYP3A4 inhibitors/inducers on the list.",
    ),
    x(
      "Letrozole 5 mg daily — ovarian stimulation (REI), started 2026-09-21",
      "high",
      [ev("letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", P_MEDS)],
      "Short-course aromatase inhibitor for letrozole-protocol stimulation, not cancer-directed endocrine therapy; expected to stop around oocyte retrieval (~2026-10-05).",
    ),
    x(
      "Follitropin alfa + menotropins SC nightly — ovarian stimulation (REI)",
      "high",
      [ev("follitropin alfa + menotropins SC nightly - ovarian stimulation per REI", P_MEDS)],
    ),
    x("Prenatal vitamin daily", "high", [ev("prenatal vitamin PO daily", P_MEDS)]),
  ],
  allergies: [x("No known drug allergies", "high", [ev("ALLERGIES: NKDA", P_ALLERGY)])],
  keyDates: [
    { label: "Self-detected breast mass", date: "2026-08", evidence: [ev("self-palpated R breast lump early Aug 2026", P_NOTE)] },
    { label: "Diagnostic mammogram + ultrasound", date: "2026-08-28", evidence: [ev("DIAGNOSTIC MAMOGRAM + US - 08/28/2026", P_MAMMO)] },
    {
      label: "Initial diagnosis (core biopsy + axillary FNA)",
      date: "2026-09-03",
      evidence: [ev("US-guided core bx 9/3/26", P_NOTE), ev("Collected: 2026-09-03 | Reported: 2026-09-08", P_PATH)],
    },
    { label: "Last menstrual period", date: "2026-09-08", evidence: [ev("LMP 9/8/2026.", P_NOTE)] },
    {
      label: "Germline panel sent (result pending)",
      date: "2026-09-10",
      evidence: [ev("Germline multigene panel (blood) sent 09/10/2026 - RESULT PENDING.", P_GEN)],
    },
    { label: "Breast MRI", date: "2026-09-11", evidence: [ev("MRI BREASTS BILATERAL W/ AND W/O CONTRAST - Sept 11, 2026", P_MRI)] },
    { label: "Last imaging (staging PET/CT)", date: "2026-09-15", evidence: [ev("PET/CT - 09/15/26", P_PET)] },
    {
      label: "Last echocardiogram + ECG",
      date: "2026-09-17",
      evidence: [ev("ECHO 9/17/2026: LVEF 63%, normal LV size and function.", P_ECHO), ev("ECG 9/17/2026: normal sinus rhythm, QTc 412 ms.", P_ECHO)],
    },
    {
      label: "Start of ovarian stimulation (letrozole + gonadotropins)",
      date: "2026-09-21",
      evidence: [ev("letrozole 5 mg PO daily - ovarian stimulation per REI, started 9/21/2026", P_MEDS)],
    },
    { label: "Most recent labs", date: "2026-09-22", evidence: [ev("LABS 2026-09-22", P_LABS)] },
    { label: "Most recent clinic visit", date: "2026-09-23", evidence: [ev("Date of service: 9/23/2026", P_NOTE)] },
    {
      label: "Left breast MRI-guided biopsy (scheduled)",
      date: "2026-09-30",
      evidence: [ev("ALSO 6 mm enhancing focus L breast, BI-RADS 4 -> MRI-guided bx scheduled 9/30, result pending.", P_NOTE)],
    },
    { label: "Planned oocyte retrieval", date: "2026-10-05", evidence: [ev("retrieval planned ~10/5", P_NOTE)] },
    { label: "Target start of neoadjuvant therapy", date: "2026-10-12", evidence: [ev("Wants to start neoadj tx wk of 10/12.", P_NOTE)] },
  ],
  openQuestions: [
    "Left breast 6 mm enhancing focus (MRI BI-RADS 4, not FDG-avid) is unbiopsied — MRI-guided biopsy scheduled 2026-09-30, result pending. Synchronous bilateral invasive disease is not excluded; many neoadjuvant trials exclude bilateral invasive breast cancer.",
    "Germline multigene panel (sent 2026-09-10) is pending; gBRCA/PALB2 status may affect surgical planning and eligibility or stratification in some trials.",
    "Hepatitis B/C and HIV serologies (drawn 2026-09-22) are pending; most chemotherapy/anti-HER2 trials need results at screening.",
    "Ovarian stimulation is ongoing (letrozole 5 mg + gonadotropins since 2026-09-21; retrieval ~2026-10-05): confirm whether a trial counts short-course letrozole as prior endocrine therapy, any washout required before first dose, and that the target start (week of 2026-10-12) fits the screening window.",
    "No tissue NGS or ctDNA on file (PIK3CA and other alterations untested); HER2 ISH not performed — IHC 3+ is sufficient locally, but many neoadjuvant trials require central HER2/HR confirmation on pre-treatment tissue; confirm remaining core biopsy tissue or plan a research biopsy.",
    "Contraception is condoms only (serum hCG negative 2026-09-22); trials usually require highly effective contraception during and for months after anti-HER2 therapy, and repeat pregnancy testing at screening.",
    "No brain imaging (asymptomatic stage III, not routinely indicated); relevant only if a protocol mandates baseline CNS imaging.",
    "The consult carries a stale template line ('Oncologic hx: s/p R lumpectomy + SLNB, on adjuvant therapy - see prior notes'); the HPI ('No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer'), PSH ('none') and A/P ('treatment-naive') confirm no surgery or adjuvant therapy — the primary tumor is in situ.",
  ],
  summary:
    "34-year-old premenopausal woman with newly diagnosed, treatment-naive HR+/HER2+ (ER 60%, PR 20%, HER2 IHC 3+, Ki-67 45%) grade 3 invasive ductal carcinoma of the right breast, clinical stage IIIA (cT3 cN1 M0: 5.4 cm on MRI, FNA-proven axillary node, no distant disease on PET/CT), being planned for curative-intent neoadjuvant therapy — standard TCHP or a neoadjuvant HER2 trial, which she is interested in. ECOG 0 with normal labs, LVEF 63% and QTc 412 ms; an oocyte cryopreservation cycle with letrozole-based stimulation is under way (retrieval ~2026-10-05, target treatment start the week of 2026-10-12). An indeterminate 6 mm left-breast MRI focus (BI-RADS 4, biopsy 2026-09-30), the germline panel and hepatitis/HIV serologies are all pending.",
  extractedAt: EXTRACTED_AT,
  source: "demo",
};
