import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-01-27";
const CT = "CT 2026-09-11";
const LABS = "Labs 2026-09-22";
const ALLERGY = "Allergies";

export default demoMatch(
  "NCT06263543",
  "Excluded: requires prior T-DXd and a metastatic chemotherapy line; he has had neither",
  "SERIES studies sacituzumab govitecan after T-DXd, so it needs prior T-DXd and at least one chemotherapy, ADC or PARP inhibitor line for metastatic disease; his only metastatic therapy has been letrozole + leuprolide + abemaciclib. He otherwise fits the population (HR+/HER2-low, CDK4/6 inhibitor-pretreated, measurable chest disease, ECOG 1, men eligible). The trial becomes relevant after a PARP inhibitor and T-DXd, the sequence already outlined in his plan.",
  [
    {
      id: "NCT06263543-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Signed, dated consent is obtained at screening; he is keen on trials and returning to see the research coordinator.",
      evidence: [{ quote: "Pt keen on trials.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-2",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to comply and availability for the study are confirmed at screening; nothing in the record suggests a barrier.",
    },
    {
      id: "NCT06263543-inc-3",
      status: "pass",
      rationale: "He is 61 years old (born 1965).",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-4",
      status: "pass",
      rationale:
        "The January 2025 lung metastasis is HER2 IHC 1+ with ISH not amplified (ratio 1.3), which is HER2-low by the trial's definition; the 2021 primary was also IHC 1+.",
      evidence: [
        { quote: "HER2 IHC: 1+ (negative by ASCO/CAP; HER2-low)", source: PATH },
        { quote: "HER2 ISH: not amplified (HER2/CEP17 ratio 1.3)", source: PATH },
      ],
    },
    {
      id: "NCT06263543-inc-5",
      status: "pass",
      rationale: "ER 85% and PR 30% on the January 2025 lung metastasis (ER 90%, PR 70% on the 2021 primary), far above the 1% threshold.",
      evidence: [
        { quote: "ER: positive, 85% of tumor cells, strong intensity", source: PATH },
        { quote: "PR: positive, 30% of tumor cells, moderate intensity", source: PATH },
      ],
    },
    {
      id: "NCT06263543-inc-6",
      status: "pass",
      rationale:
        "Endocrine-refractory disease is documented: recurrence about 3 years into adjuvant tamoxifen (January 2025), then progression on letrozole + leuprolide + abemaciclib (CT 2026-09-11).",
      evidence: [
        { quote: "Jan 2025 (~3 yrs into tamoxifen) cough + back pain", source: NOTE },
        { quote: "PD on 1L AI + GnRH agonist + CDK4/6i after ~19 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT06263543-inc-7",
      status: "pass",
      rationale: "Received abemaciclib with letrozole + leuprolide in the metastatic setting from February 2025 until 2026-09-15.",
      evidence: [{ quote: "Started 1L letrozole + leuprolide + abemaciclib 2/2025 w/ denosumab, best response PR.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-8",
      status: "fail",
      rationale:
        "No chemotherapy, ADC or PARP inhibitor has been given for metastatic disease, and the trial needs 1–4 such lines. Adjuvant ddAC-T (finished 10/2021, recurrence 39 months later) does not count.",
      evidence: [
        { quote: "No prior PARPi, platinum, fulvestrant or chemo for metastatic dz.", source: NOTE },
        { quote: "adj ddAC-T 6/2021-10/2021", source: NOTE },
      ],
    },
    {
      id: "NCT06263543-inc-9",
      status: "fail",
      rationale: "He has never received trastuzumab deruxtecan; his plan lists T-DXd only as a later option after a PARP inhibitor.",
      evidence: [{ quote: "2L: olaparib or talazoparib (gBRCA2) standard vs clinical trial; T-DXd (HER2-low) later.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-10",
      status: "pass",
      rationale:
        "Radiographic progression on his most recent therapy: CT 2026-09-11 shows the RUL nodule growing from 1.1 to 1.6 cm and a new 1.7 cm right hilar node.",
      evidence: [{ quote: "1. RUL nodule 1.6 cm (previously 1.1 cm); new right hilar lymph node 1.7 cm short axis. LLL nodule 0.6 cm, unchanged.", source: CT }],
    },
    {
      id: "NCT06263543-inc-11",
      status: "pass",
      rationale:
        "RECIST-measurable soft-tissue disease: RUL nodule 1.6 cm and right hilar node 1.7 cm short axis (CT 2026-09-11). The sclerotic bone lesions are not needed for eligibility.",
      evidence: [{ quote: "Measurable dz: RUL nodule 1.6 cm, R hilar LN 1.7 cm SA.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-12",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-25 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-13",
      status: "pass",
      confidence: "medium",
      rationale:
        "Labs from 2026-09-22 (6 days old) show adequate counts, liver and renal function and stay inside the 28-day window until 2026-10-20; albumin and coagulation have not been resulted (judged separately).",
      evidence: [{ quote: "WBC 4.2 | ANC 1.7 | Hgb 11.8 (L) | Plt 190", source: LABS }],
      actionNeeded: "Repeat labs if enrollment falls after 2026-10-20",
    },
    {
      id: "NCT06263543-inc-14",
      status: "pass",
      rationale: "Hemoglobin 11.8 g/dL on 2026-09-22, mildly low but above 9 g/dL; no transfusion recorded.",
      evidence: [{ quote: "Hgb 11.8 (L)", source: LABS }],
    },
    {
      id: "NCT06263543-inc-15",
      status: "pass",
      rationale: "ANC 1.7 × 10⁹/L (1,700/mm³) on 2026-09-22, with no G-CSF in his history.",
      evidence: [{ quote: "ANC 1.7", source: LABS }],
    },
    {
      id: "NCT06263543-inc-16",
      status: "pass",
      rationale: "Platelets 190 × 10⁹/L (190,000/mm³) on 2026-09-22; no transfusion recorded.",
      evidence: [{ quote: "Plt 190", source: LABS }],
    },
    {
      id: "NCT06263543-inc-17",
      status: "pass",
      rationale: "Total bilirubin 0.7 mg/dL on 2026-09-22, within normal limits; no liver metastases.",
      evidence: [{ quote: "T bili 0.7", source: LABS }],
    },
    {
      id: "NCT06263543-inc-18",
      status: "pass",
      rationale: "AST 26 and ALT 31 U/L on 2026-09-22, both within the normal range.",
      evidence: [{ quote: "AST 26 | ALT 31", source: LABS }],
    },
    {
      id: "NCT06263543-inc-19",
      status: "unknown",
      confidence: "medium",
      rationale: "Serum albumin is not among the 2026-09-22 results or anywhere else in the record.",
      actionNeeded: "Obtain serum albumin; ≥ 2.5 g/dL required",
    },
    {
      id: "NCT06263543-inc-20",
      status: "pass",
      confidence: "medium",
      rationale:
        "Creatinine 1.1 mg/dL (eGFR 74) at age 61 gives a Cockcroft-Gault CrCl roughly equal to his weight in kg, far above 30 mL/min for any adult weight; weight itself is not recorded.",
      evidence: [{ quote: "Cr 1.1 | eGFR 74", source: LABS }],
    },
    {
      id: "NCT06263543-inc-21",
      status: "unknown",
      confidence: "medium",
      rationale: "No PT/INR or PTT is in the record; he takes no anticoagulant.",
      actionNeeded: "Obtain PT/INR and aPTT; each ≤ 1.5 × ULN required",
    },
    {
      id: "NCT06263543-inc-22",
      status: "unknown",
      confidence: "medium",
      rationale:
        "Abemaciclib/letrozole stopped 2026-09-15, so the 2-week targeted and hormonal washout is met from 2026-09-29; no recent surgery or radiation. Leuprolide continues (depot last given 2026-08-14) and may count as hormonal therapy.",
      evidence: [{ quote: "Abema/letrozole stopped 9/15/26; leuprolide continues (last inj 8/14/26).", source: NOTE }],
      actionNeeded: "Confirm with the sponsor whether continued leuprolide is allowed or needs a 2-week washout",
    },
    {
      id: "NCT06263543-inc-23",
      status: "not-applicable",
      rationale: "Menopausal status and pregnancy testing apply to individuals who could become pregnant; he is a 61-year-old man.",
      evidence: [{ quote: "DOB: 1965 (61 yo M)", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-24",
      status: "not-applicable",
      rationale: "Contraception rule for individuals of childbearing potential; he is male.",
    },
    {
      id: "NCT06263543-inc-25",
      status: "not-applicable",
      rationale: "Condom requirement applies to non-sterilized men; he had a vasectomy in 2005.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06263543-inc-26",
      status: "pass",
      confidence: "medium",
      rationale: "Vasectomy (2005) is one of the listed acceptable measures; confirm at screening.",
      evidence: [{ quote: "Vasectomy 2005.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-1",
      status: "pass",
      rationale: "Disease is metastatic to lung, right hilar node and bone, not stage IIIC locally advanced disease with curative options.",
      evidence: [{ quote: "Metastatic HR+/HER2-low male breast ca (lung, R hilar LN, bone)", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-2",
      status: "pass",
      confidence: "medium",
      rationale:
        "No known brain metastases: no headache, visual change or focal weakness and a nonfocal neuro exam, but the brain has never been imaged.",
      evidence: [{ quote: "No HA, visual change or focal weakness. Has never had brain imaging.", source: NOTE }],
      actionNeeded: "Obtain brain MRI if the protocol requires baseline CNS imaging",
    },
    {
      id: "NCT06263543-exc-3",
      status: "pass",
      confidence: "medium",
      rationale:
        "No active infection is documented and no antibiotics are on his medication list; the mild dry cough accompanies progressive lung and hilar disease.",
      evidence: [{ quote: "Mild dry cough, no hemoptsis, no SOB.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-4",
      status: "pass",
      rationale: "He has never received irinotecan or any topoisomerase I agent (adjuvant ddAC-T only), and allergies are NKDA.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: ALLERGY }],
    },
    {
      id: "NCT06263543-exc-5",
      status: "not-applicable",
      rationale: "Pregnancy and breastfeeding do not apply; he is male.",
    },
    {
      id: "NCT06263543-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agent or other interventional trial in his treatment history; he is only now being referred to the research coordinator.",
      evidence: [{ quote: "RTC 1-2 wks w/ research coordinator.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-7",
      status: "pass",
      confidence: "medium",
      rationale:
        "Comorbidities are controlled hypertension, hyperlipidemia and untreated low-risk prostate cancer on surveillance, with no psychiatric history; none should confound the study, though the investigator should review the prostate cancer.",
      evidence: [{ quote: "PMH: HTN, HLD.", source: NOTE }],
    },
    {
      id: "NCT06263543-exc-8",
      status: "pass",
      confidence: "low",
      rationale: "Investigator discretion; no high-risk condition is evident beyond controlled hypertension and low-risk prostate cancer on surveillance.",
    },
  ],
);
