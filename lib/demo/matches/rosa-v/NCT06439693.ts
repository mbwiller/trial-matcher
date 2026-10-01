import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT06439693",
  "Excluded: for untreated de novo disease; she has had THP, HP maintenance and T-DXd",
  "SAPPHO is designed for de novo HER2-positive metastatic disease at the very start of treatment, allowing at most 6 weeks of first-line THP before entry. Rosa matches the biology exactly (de novo stage IV, HER2 3+ on both breast and liver biopsies) but is now beyond second line, having progressed on THP with trastuzumab/pertuzumab maintenance and then on T-DXd. Nothing in her history can change that, so the trial is not an option.",
  [
    {
      id: "NCT06439693-inc-1",
      status: "pass",
      rationale: "De novo stage IV at diagnosis (January 2024): cT3 cN2 M1 with lung nodules, mediastinal nodes and a biopsy-proven liver metastasis.",
      evidence: [
        { quote: "cT3 cN2 M1: bilat lung nodules, mediastinal LN, solitary liver lesion", source: "Onc note 2026-09-24" },
        { quote: "Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.", source: "Pathology" },
      ],
    },
    {
      id: "NCT06439693-inc-2",
      status: "pass",
      rationale: "HER2 IHC 3+ on both the right breast core (01/2024) and the liver metastasis biopsy (2024-01-23).",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" },
        { quote: "Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.", source: "Pathology" },
      ],
    },
    {
      id: "NCT06439693-inc-3",
      status: "fail",
      rationale: "Far beyond the allowed ≤ 6 weeks of first-line THP: she completed six cycles of THP (02–06/2024), trastuzumab/pertuzumab maintenance until progression in 03/2025, then T-DXd 04/2025–07/2026.",
      evidence: [
        { quote: "1L THP (docetaxel x6, 2/2024-6/2024) then HP maint (Phesgo), best response PR", source: "Onc note 2026-09-24" },
        { quote: "2L T-DXd 5.4 mg/kg 4/2025-7/2026 (last dose 07/06/2026)", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06439693-inc-4",
      status: "pass",
      rationale: "She is 66 years old (born 1960).",
      evidence: [{ quote: "DOB: 1960 (66 yo F)", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-inc-5",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-24 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-inc-6",
      status: "pass",
      rationale: "LVEF 55% on echo 2026-09-10, within 12 weeks of any prospective first dose.",
      evidence: [{ quote: "ECHO 2026-09-10: LVEF 55% (biplane Simpson's).", source: "Echo 2026-09-10" }],
    },
    {
      id: "NCT06439693-inc-7",
      status: "pass",
      rationale: "Labs 2026-09-22 (within 28 days): Hgb 10.9, ANC 3.1, platelets 165, bilirubin 0.8, AST 1.3 × ULN with documented liver metastases, creatinine 0.9 mg/dL.",
      evidence: [
        { quote: "WBC 5.8 | ANC 3.1 | Hgb 10.9 (L) | Plt 165", source: "Labs 2026-09-22" },
        { quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8", source: "Labs 2026-09-22" },
        { quote: "Cr 0.9 | est CrCl ~62 mL/min (CG)", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT06439693-inc-8",
      status: "not-applicable",
      rationale: "Applies only to participants with HIV infection; none is documented.",
    },
    {
      id: "NCT06439693-inc-9",
      status: "not-applicable",
      rationale: "Applies only to participants with hepatitis B or C infection; neither is documented.",
    },
    {
      id: "NCT06439693-inc-10",
      status: "pass",
      rationale: "She has brain metastases (three, diagnosed 2026-07-22) and meets the conditions that follow: all treated, stable and off steroids.",
      evidence: [{ quote: "Treated brain mets (GK SRS 8/7/26) stable on 9/12 MRI, off steroids.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-inc-11",
      status: "pass",
      rationale: "No untreated brain metastases remain: all three lesions received Gamma Knife SRS on 2026-08-07.",
      evidence: [{ quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-inc-12",
      status: "pass",
      rationale: "Clinically stable since SRS (headaches resolved, no deficits) with smaller lesions on MRI 2026-09-12; SRS was 52 days ago, beyond the 7-day minimum.",
      evidence: [
        { quote: "MRI brain 9/12/26: treated lesions smaller, no new lesions, no edema.", source: "Onc note 2026-09-24" },
        { quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06439693-inc-13",
      status: "not-applicable",
      rationale: "Applies to patients who began THP shortly before entry and have brain metastases found on the screening MRI; hers were found and treated in 07–08/2026, long after first-line therapy.",
    },
    {
      id: "NCT06439693-inc-14",
      status: "pass",
      confidence: "medium",
      rationale: "No other prior or concurrent malignancy is documented, so this permissive clause raises no issue.",
    },
    {
      id: "NCT06439693-inc-15",
      status: "not-applicable",
      rationale: "Contraception rule for women of child-bearing potential and men; she is a 66-year-old postmenopausal woman.",
    },
    {
      id: "NCT06439693-inc-16",
      status: "not-applicable",
      rationale: "She is 66, postmenopausal and not on ovarian suppression, so not of childbearing potential by the protocol definition.",
    },
    {
      id: "NCT06439693-inc-17",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent are confirmed at screening; she is open to a trial.",
      evidence: [{ quote: "Pt open to trial if screening within 3-4 wks.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-inc-18",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to comply with visits and procedures is confirmed at screening; she lives with her daughter.",
      evidence: [{ quote: "SH: lives w/ daughter, no EtOH.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "This is her first breast cancer, diagnosed de novo metastatic in January 2024; no earlier invasive breast carcinoma is recorded.",
      evidence: [{ quote: "de novo metastatic R breast IDC, grade 3, ER-/PR-/HER2 3+, dx Jan 2024", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No investigational agents are documented; her prior therapies were THP, Phesgo and commercial T-DXd.",
    },
    {
      id: "NCT06439693-exc-3",
      status: "pass",
      rationale: "No surgery other than port placement (02/2024), no recent trauma, and no surgery planned.",
      evidence: [{ quote: "PSH: port 2/2024. No breast surgery.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-exc-4",
      status: "pass",
      rationale: "No extracranial radiotherapy; her only radiation was intracranial Gamma Knife SRS on 2026-08-07.",
      evidence: [{ quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No drug allergies, and no infusion reactions are recorded despite prior trastuzumab, pertuzumab, docetaxel and T-DXd.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: "Allergies" }],
    },
    {
      id: "NCT06439693-exc-6",
      status: "pass",
      rationale: "No coronary disease or heart failure: no CAD on the problem list, LVEF 55% and asymptomatic.",
      evidence: [
        { quote: "No CAD. Never smoker.", source: "Onc note 2026-09-24" },
        { quote: "LVEF 55% on 9/10/26 echo (baseline 62% in 2024), asymptomatic.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06439693-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "All three brain lesions are treated, she has been off dexamethasone since 2026-08-30, has had no seizures, and no leptomeningeal disease is described.",
      evidence: [
        { quote: "Treated brain mets (GK SRS 8/7/26) stable on 9/12 MRI, off steroids.", source: "Onc note 2026-09-24" },
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
      ],
      actionNeeded: "Screening brain MRI to confirm no untreated or leptomeningeal disease",
    },
    {
      id: "NCT06439693-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No arrhythmia is documented (HR 82, no cardiac history beyond hypertension).",
      evidence: [{ quote: "BP 128/74 HR 82 SpO2 97% RA.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT06439693-exc-9",
      status: "pass",
      rationale: "No ILD or pneumonitis at any time on T-DXd, and CT 07/20/2026 shows no interstitial abnormality or ground-glass opacity.",
      evidence: [
        { quote: "no ILD/pneumonitis at any point (serial CT chest w/o interstitial changes)", source: "Onc note 2026-09-24" },
        { quote: "No interstitial lung abnormality or ground-glass opacity.", source: "CT CAP 07/20/2026" },
      ],
    },
    {
      id: "NCT06439693-exc-10",
      status: "pass",
      confidence: "medium",
      rationale: "Never smoker with clear lungs, SpO2 97% and no cough or dyspnoea; no asthma, COPD, pulmonary embolism, effusion, autoimmune lung involvement or lung surgery is recorded.",
      evidence: [
        { quote: "No cough/SOB.", source: "Onc note 2026-09-24" },
        { quote: "Lungs clear, no crakles.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT06439693-exc-11",
      status: "pass",
      confidence: "medium",
      rationale: "No active infection is documented.",
    },
    {
      id: "NCT06439693-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "She takes several oral tablets daily (metformin, lisinopril, levothyroxine, gabapentin) and has no documented GI disease affecting absorption.",
      evidence: [{ quote: "metformin 1000 mg PO BID", source: "Medications" }],
    },
    {
      id: "NCT06439693-exc-13",
      status: "pass",
      confidence: "medium",
      rationale: "No diarrhea is reported in an interval history that details her other symptoms (fatigue, neuropathy, RUQ discomfort, weight loss).",
    },
    {
      id: "NCT06439693-exc-14",
      status: "pass",
      rationale: "None of her current medications is a CYP2C8 or CYP3A4 inhibitor or inducer; dexamethasone, a CYP3A4 inducer, was stopped on 2026-08-30.",
      evidence: [{ quote: "dexamethasone - taper COMPLETED, last dose 08/30/2026", source: "Medications" }],
    },
    {
      id: "NCT06439693-exc-15",
      status: "not-applicable",
      rationale: "She is a 66-year-old postmenopausal woman; pregnancy and breastfeeding exclusions cannot apply.",
    },
  ],
);
