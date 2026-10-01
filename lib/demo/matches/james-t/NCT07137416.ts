import { demoMatch } from "../../match-helpers";

const NOTE = "Clinic note 2026-09-25";
const PATH = "Lung biopsy 2025-01-22";
const GEN = "Germline panel 2021-06";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const MEDS = "Medication list";

export default demoMatch(
  "NCT07137416",
  "Unlikely: needs a prior chemotherapy line; only adjuvant ddAC-T (2021) on record",
  "He fits the dose-expansion population (HER2-low IHC 1+/ISH- metastatic breast cancer with measurable, non-irradiated lung and nodal disease) rather than dose escalation, which requires standard options to be exhausted while a PARP inhibitor and T-DXd remain available to him. The main obstacle is the requirement for at least one prior line of cytotoxic chemotherapy: his only chemotherapy was adjuvant ddAC-T completed in 2021, 39 months before recurrence, which does not ordinarily count as a line. If the study team accepts it, or after a chemotherapy line, the remaining items are an echo within 28 days, coagulation tests and a triplicate ECG.",
  [
    {
      id: "NCT07137416-inc-1",
      status: "not-applicable",
      rationale:
        "Applies to dose escalation only. He would not qualify for escalation now (a PARP inhibitor and T-DXd remain standard options) and is assessed for the HER2-low breast dose-expansion cohort.",
    },
    {
      id: "NCT07137416-inc-2",
      status: "pass",
      rationale: "Invasive ductal carcinoma with metastatic disease confirmed on lung core biopsy (2025-01-22).",
      evidence: [
        { quote: "DIAGNOSIS: Metastatic carcinoma, consistent with breast primary.", source: PATH },
        { quote: "61 yo M w/ hx L breast IDC dx 4/2021", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-3",
      status: "pass",
      rationale: "Age 61 (born 1965), above the 18-year minimum.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-4",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit, within the ≤ 2 limit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-5",
      status: "pass",
      rationale: "ANC 1.7 × 10⁹/L (1,700/mcL) on 2026-09-22, with no G-CSF on the medication list.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT07137416-inc-6",
      status: "pass",
      rationale: "Platelets 190 × 10⁹/L on 2026-09-22 with no transfusion recorded.",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
    },
    {
      id: "NCT07137416-inc-7",
      status: "pass",
      rationale: "Total bilirubin 0.7 mg/dL on 2026-09-22, within normal limits.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT07137416-inc-8",
      status: "pass",
      rationale: "AST 26 and ALT 31 U/L on 2026-09-22, well under 3 × ULN.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT07137416-inc-9",
      status: "unknown",
      confidence: "medium",
      rationale: "No INR/PT or aPTT is on file; he is not on anticoagulation.",
      actionNeeded: "Obtain INR/PT and aPTT; both must be ≤ 1.5 × ULN.",
    },
    {
      id: "NCT07137416-inc-10",
      status: "pass",
      rationale: "eGFR 74 mL/min/1.73 m² with creatinine 1.1 mg/dL on 2026-09-22, above the 60 threshold.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
    },
    {
      id: "NCT07137416-inc-11",
      status: "fail",
      confidence: "medium",
      rationale:
        "His only cytotoxic therapy was adjuvant ddAC-T (completed 10/2021; recurrence 39 months later, 1/2025); none has been given for metastatic disease, so by the usual convention he has no prior chemotherapy line. The adjuvant anthracycline itself is permitted.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
      ],
      actionNeeded: "Ask the study team whether adjuvant ddAC-T satisfies the prior-chemotherapy requirement; otherwise one line for metastatic disease is needed.",
    },
    {
      id: "NCT07137416-inc-12",
      status: "pass",
      rationale: "Permissive item; he is PARP inhibitor-naive, which is also allowed.",
      evidence: [{ quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-13",
      status: "pass",
      rationale: "No germline mutation is required; he carries a pathogenic germline BRCA2 variant, which does not affect eligibility.",
      evidence: [{ quote: "BRCA2 c.5946delT (p.Ser1982ArgfsTer22) - PATHOGENIC", source: GEN }],
    },
    {
      id: "NCT07137416-inc-14",
      status: "not-applicable",
      rationale: "Dose-escalation HER2 definitions; he is assessed for dose expansion, though his HR+/HER2-low (IHC 1+/ISH-) disease would also qualify here.",
    },
    {
      id: "NCT07137416-inc-15",
      status: "pass",
      rationale: "HER2-low on the metastasis (IHC 1+, ISH not amplified) with known ER 85% and PR 30%.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
      ],
    },
    {
      id: "NCT07137416-inc-16",
      status: "pass",
      rationale:
        "RUL nodule 1.6 cm and right hilar node 1.7 cm short axis are measurable and right-sided, outside the 2021 left chest-wall radiation field; bone lesions are not needed for measurability.",
      evidence: [
        { quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE },
        { quote: "PMRT 11-12/2021", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-inc-17",
      status: "pass",
      confidence: "medium",
      rationale: "No peripheral neuropathy is recorded after paclitaxel in 2021, and the neurological exam is nonfocal.",
      evidence: [{ quote: "Neuro nonfocal.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-18",
      status: "unknown",
      confidence: "medium",
      rationale: "The only LVEF on record is 60% from 2021, before doxorubicin, far outside the 28-day window.",
      evidence: [{ quote: "Echo: last TTE pre-AC 2021 (LVEF 60%); repeat if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echo or MUGA within 28 days before enrollment; LVEF ≥ 50% required.",
    },
    {
      id: "NCT07137416-inc-19",
      status: "pass",
      confidence: "medium",
      rationale: "Conditional allowance for people with HIV; no HIV infection is recorded.",
    },
    {
      id: "NCT07137416-inc-20",
      status: "pass",
      confidence: "medium",
      rationale: "Applies only to chronic hepatitis B; none is recorded and liver tests are normal.",
      evidence: [{ quote: "AST 26 | ALT 31 | T bili 0.7 | Alk phos 118", source: LABS }],
    },
    {
      id: "NCT07137416-inc-21",
      status: "pass",
      confidence: "medium",
      rationale: "Applies only to a history of hepatitis C; none is recorded and liver tests are normal.",
    },
    {
      id: "NCT07137416-inc-22",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive for treated brain metastases; none are known (asymptomatic, nonfocal), though the brain has never been imaged.",
      evidence: [{ quote: "Has never had brain imaging.", source: NOTE }],
      actionNeeded: "Obtain brain MRI if required for baseline staging.",
    },
    {
      id: "NCT07137416-inc-23",
      status: "pass",
      confidence: "medium",
      rationale: "Permissive for active brain metastases not needing immediate treatment; none are known and he has no neurological symptoms.",
      evidence: [{ quote: "No HA, visual change or focal weakness.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-24",
      status: "pass",
      confidence: "medium",
      rationale:
        "Prior doxorubicin (2021) triggers a formal NYHA assessment; he has no heart-failure history or dyspnoea, consistent with class I.",
      evidence: [
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
        { quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE },
      ],
      actionNeeded: "Document NYHA class at screening; class II or better required.",
    },
    {
      id: "NCT07137416-inc-25",
      status: "pass",
      confidence: "medium",
      rationale:
        "His concurrent prostate cancer is low risk (Gleason 3+3=6, GG1), untreated on active surveillance, and unlikely to interfere with safety or efficacy assessment.",
      evidence: [
        {
          quote: "Prostate adenocarcinoma Gleason 3+3=6 (GG1), dx 11/2023 (PSA 4.6), low risk, on active surveillance w/ urology - never treated.",
          source: NOTE,
        },
      ],
      actionNeeded: "Confirm with the PI that GG1 prostate cancer on active surveillance is acceptable.",
    },
    {
      id: "NCT07137416-inc-26",
      status: "pass",
      confidence: "low",
      rationale: "Men must agree to contraception from 14 days before to 6 months after treatment; confirmed at screening. Vasectomy 2005.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-27",
      status: "not-applicable",
      rationale: "Definitions of non-childbearing potential apply to women; he is a man.",
    },
    {
      id: "NCT07137416-inc-28",
      status: "pass",
      confidence: "low",
      rationale: "Agreement not to freeze or donate sperm through 6 months after treatment is confirmed at consent.",
    },
    {
      id: "NCT07137416-inc-29",
      status: "not-applicable",
      rationale: "Ova donation restriction applies to female patients only.",
    },
    {
      id: "NCT07137416-inc-30",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent are confirmed at screening; he is keen on trial participation.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT07137416-inc-31",
      status: "pass",
      rationale: "Worded as an exclusion: his only chest radiation was post-mastectomy RT in Nov–Dec 2021, nearly 5 years ago, so it does not apply.",
      evidence: [{ quote: "PMRT 11-12/2021", source: NOTE }],
    },
    {
      id: "NCT07137416-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "No ILD history, and CT 2026-09-11 reports nodules and a hilar node without interstitial change.",
      evidence: [
        {
          quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.",
          source: CT,
        },
      ],
    },
    {
      id: "NCT07137416-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "No COPD, asthma, pulmonary embolism, effusion, connective tissue disease or pneumonectomy is recorded; SpO2 96% on room air in a former 20 pack-year smoker.",
      evidence: [
        { quote: "BP 138/82 HR 72 SpO2 96% RA.", source: NOTE },
        { quote: "No VTE. No DM.", source: NOTE },
      ],
    },
    {
      id: "NCT07137416-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "Letrozole and abemaciclib stopped 2026-09-15: the 2-week targeted-agent window clears 9/29 and the 3-week hormonal-therapy window 10/6. Leuprolide's last depot was 2026-08-14 (over 3 weeks ago) but it is being continued.",
      evidence: [
        { quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE },
        { quote: "3. Continue leuprolide 22.5 mg q3 mo for now; testosterone castrate.", source: NOTE },
      ],
      actionNeeded: "Start no earlier than 2026-10-06; confirm with the study team whether leuprolide must stop.",
    },
    {
      id: "NCT07137416-exc-4",
      status: "pass",
      confidence: "medium",
      rationale: "No cancer immunotherapy or anti-cancer antibody has been given; denosumab for bone metastases is supportive and generally allowed.",
      evidence: [{ quote: "denosumab 120 mg SC q4 weeks", source: MEDS }],
      actionNeeded: "Confirm ongoing denosumab is acceptable to the study team.",
    },
    {
      id: "NCT07137416-exc-5",
      status: "pass",
      rationale: "Surgical history is the 2021 mastectomy/ALND and a 2005 vasectomy; no surgery in the past 4 weeks.",
      evidence: [{ quote: "PSH: as above. Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT07137416-exc-6",
      status: "pass",
      rationale: "No unresolved toxicity above grade 1: abemaciclib diarrhea resolved after it was stopped, and no steroid or anticonvulsant need.",
      evidence: [{ quote: "Diarrhea resolved off abema.", source: NOTE }],
    },
    {
      id: "NCT07137416-exc-7",
      status: "pass",
      rationale:
        "No strong CYP3A4 inhibitor or inducer: current medications are leuprolide, denosumab, lisinopril, rosuvastatin and calcium/vitamin D.",
      evidence: [
        { quote: "lisinopril 20 mg PO daily", source: MEDS },
        { quote: "rosuvastatin 10 mg PO daily", source: MEDS },
      ],
    },
    {
      id: "NCT07137416-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent is in use or appears in his treatment history.",
    },
    {
      id: "NCT07137416-exc-9",
      status: "pass",
      confidence: "medium",
      rationale: "No drug allergies recorded, he has never received pidnarulex or T-DXd, and he tolerates denosumab (a monoclonal antibody) every 4 weeks.",
      evidence: [{ quote: "ALLERGIES: NKDA" }],
    },
    {
      id: "NCT07137416-exc-10",
      status: "unknown",
      confidence: "medium",
      rationale: "No ECG is documented, so QTc cannot be assessed against the male threshold.",
      actionNeeded: "Obtain triplicate 12-lead ECG; mean QTc must be ≤ 450 ms (male threshold).",
    },
    {
      id: "NCT07137416-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No corneal disease, conjunctivitis or ocular surface disease appears in the history.",
    },
    {
      id: "NCT07137416-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Intercurrent illness is limited to controlled hypertension (BP 138/82 on lisinopril) and hyperlipidaemia.",
      evidence: [{ quote: "5. HTN/HLD - lisinopril, rosuvastatin.", source: NOTE }],
    },
    {
      id: "NCT07137416-exc-13",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding exclusions apply to women; he is a 61-year-old man.",
    },
  ],
);
