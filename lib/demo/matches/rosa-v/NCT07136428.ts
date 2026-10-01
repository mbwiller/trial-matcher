import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07136428",
  "Excluded: no new or progressing brain lesion, tucatinib-naive, and grade 2 neuropathy",
  "This study treats active HER2-positive brain metastases in patients who have already received both T-DXd and tucatinib. Rosa's three lesions were all treated with SRS on 2026-08-07 and are shrinking with no new lesions, she has not yet received tucatinib (her planned standard third-line option), and her grade 2 docetaxel neuropathy is an outright exclusion. It could become relevant only after progression on a tucatinib regimen with new or progressing brain disease, and only if the neuropathy improved to grade 1.",
  [
    {
      id: "NCT07136428-inc-1",
      status: "pass",
      rationale: "She is 66 years old (born 1960).",
      evidence: [{ quote: "DOB: 1960 (66 yo F)", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT07136428-inc-2",
      status: "fail",
      rationale: "No progressive or new brain metastasis: all three lesions were treated with SRS on 2026-08-07 and shrank on the 2026-09-12 MRI (right frontal 0.8 cm, left cerebellar 0.5 cm, right parietal 0.3 cm), with no new lesions.",
      evidence: [
        { quote: "right frontal 1.4 -> 0.8 cm, left cerebellar 0.9 -> 0.5 cm, right parietal 0.6 -> 0.3 cm", source: "MRI brain 2026-09-12" },
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
      ],
    },
    {
      id: "NCT07136428-inc-3",
      status: "pass",
      rationale: "Two prior lines for metastatic disease: THP with trastuzumab/pertuzumab maintenance, then T-DXd.",
      evidence: [
        { quote: "Metastatic HER2+ (IHC 3+) HR-negative breast ca, de novo stage IV, PD on 1L THP/HP and 2L T-DXd.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT07136428-inc-4",
      status: "fail",
      rationale: "She has received T-DXd but never tucatinib, and tucatinib was not omitted for allergy or intolerance; it is the standard third-line option now under discussion, so the waiver does not apply.",
      evidence: [
        { quote: "No prior tucatinib, T-DM1, lapatinib or neratinib.", source: "Onc note 2026-09-24" },
        { quote: "Discussed 3L tucatinib + trastuzumab + capecitabine (HER2CLIMB) vs clinical trial.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT07136428-inc-5",
      status: "pass",
      rationale: "Washouts are met: last T-DXd 2026-07-06 (84 days; the 'C14 D1 today' line is a stale copy-forward), Gamma Knife SRS 2026-08-07 (52 days, > 1 week), no major surgery, and no other current anticancer therapy.",
      evidence: [
        { quote: "trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)", source: "Medications" },
        { quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT07136428-inc-6",
      status: "pass",
      rationale: "Labs 2026-09-22 show adequate marrow, renal and hepatic reserve: ANC 3.1, platelets 165, Hgb 10.9, CrCl ~62 mL/min, bilirubin 0.8.",
      evidence: [
        { quote: "WBC 5.8 | ANC 3.1 | Hgb 10.9 (L) | Plt 165", source: "Labs 2026-09-22" },
        { quote: "Cr 0.9 | est CrCl ~62 mL/min (CG)", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT07136428-inc-7",
      status: "pass",
      rationale: "ANC 3.1 × 10⁹/L, platelets 165, Hgb 10.9 g/dL, bilirubin 0.8 mg/dL, AST 52 (1.3 × ULN, liver metastases present) and CG CrCl ~62 mL/min (2026-09-22) all meet the thresholds.",
      evidence: [
        { quote: "WBC 5.8 | ANC 3.1 | Hgb 10.9 (L) | Plt 165", source: "Labs 2026-09-22" },
        { quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8", source: "Labs 2026-09-22" },
        { quote: "Cr 0.9 | est CrCl ~62 mL/min (CG)", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT07136428-inc-8",
      status: "pass",
      rationale: "LVEF 55% on echo 2026-09-10, asymptomatic.",
      evidence: [{ quote: "ECHO 2026-09-10: LVEF 55% (biplane Simpson's).", source: "Echo 2026-09-10" }],
    },
    {
      id: "NCT07136428-inc-9",
      status: "not-applicable",
      rationale: "She is 66 and postmenopausal, so not of childbearing potential.",
    },
    {
      id: "NCT07136428-inc-10",
      status: "not-applicable",
      rationale: "Contraception rule for women of childbearing potential and men; she is a 66-year-old postmenopausal woman.",
    },
    {
      id: "NCT07136428-inc-11",
      status: "pass",
      rationale: "Permissive clause allowing intracranial-only disease; her measurable extracranial (liver) disease does not affect eligibility.",
      evidence: [{ quote: "Measurable liver dz: seg VII 2.8 cm, seg V 2.2 cm.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT07136428-inc-12",
      status: "not-applicable",
      rationale: "Permissive clause for focal leptomeningeal disease; none is documented on her brain MRIs.",
    },
    {
      id: "NCT07136428-inc-13",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-24 visit.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT07136428-inc-14",
      status: "pass",
      confidence: "low",
      rationale: "Consent and HIPAA authorisation are obtained at screening; she is open to a trial.",
      evidence: [{ quote: "Pt open to trial if screening within 3-4 wks.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT07136428-exc-1",
      status: "pass",
      rationale: "MRI 2026-09-12 shows no hemorrhage, mass effect or edema; no lesion needs immediate local therapy, and she has been off steroids since 2026-08-30.",
      evidence: [
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
        { quote: "dexamethasone - taper COMPLETED, last dose 08/30/2026", source: "Medications" },
      ],
    },
    {
      id: "NCT07136428-exc-2",
      status: "fail",
      rationale: "Residual grade 2 peripheral neuropathy from docetaxel (numbness, drops small objects), stable on gabapentin; this exclusion has no exception for chronic grade 2 toxicity.",
      evidence: [
        { quote: "Residual G2 PN hands/feet from docetaxel", source: "Onc note 2026-09-24" },
        { quote: "G2 PN (docetaxel): stable, gabapentin 300 mg qhs.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT07136428-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is described on brain MRI, and she has no new neurological symptoms.",
      evidence: [{ quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT07136428-exc-4",
      status: "unknown",
      confidence: "medium",
      rationale: "Hypertension is controlled (BP 128/74 on lisinopril) and there is no heart failure (LVEF 55%, asymptomatic), but no ECG or QTcF is on file.",
      evidence: [
        { quote: "BP 128/74 HR 82 SpO2 97% RA.", source: "Onc note 2026-09-24" },
        { quote: "LVEF 55% on 9/10/26 echo (baseline 62% in 2024), asymptomatic.", source: "Onc note 2026-09-24" },
      ],
      actionNeeded: "Obtain screening ECG; QTcF must be ≤ 450 ms",
    },
    {
      id: "NCT07136428-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No coronary disease, LVEF 55%, clear lungs with SpO2 97% on room air and no interstitial change on CT; no significant cardiopulmonary disease is documented.",
      evidence: [
        { quote: "No CAD. Never smoker.", source: "Onc note 2026-09-24" },
        { quote: "No interstitial lung abnormality or ground-glass opacity.", source: "CT CAP 07/20/2026" },
      ],
    },
    {
      id: "NCT07136428-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "No pancreatitis is recorded in an otherwise detailed past medical history.",
    },
    {
      id: "NCT07136428-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No acute infection is documented, and the medication list contains no antibacterial, antifungal or antiviral agents.",
    },
    {
      id: "NCT07136428-exc-8",
      status: "pass",
      confidence: "medium",
      rationale: "No tuberculosis history is recorded, and chest CT shows only stable metastatic nodules and nodes.",
      evidence: [{ quote: "Stable bilateral pulmonary nodules (largest 7 mm) and mediastinal nodes.", source: "CT CAP 07/20/2026" }],
      actionNeeded: "TB screening per local practice",
    },
    {
      id: "NCT07136428-exc-9",
      status: "pass",
      confidence: "low",
      rationale: "No known hepatitis B, and the protocol states testing is not required; her mild transaminase rise is explained by liver metastases.",
      actionNeeded: "Confirm no known HBsAg-positive history at screening",
    },
    {
      id: "NCT07136428-exc-10",
      status: "pass",
      confidence: "low",
      rationale: "No known hepatitis C; per protocol, testing is limited to patients at high risk or with a known history, and neither is documented.",
      actionNeeded: "Confirm no hepatitis C risk factors at screening",
    },
    {
      id: "NCT07136428-exc-11",
      status: "pass",
      confidence: "low",
      rationale: "No known HIV infection or antiretroviral therapy; per protocol, testing is limited to patients at high risk or with a known history.",
      actionNeeded: "Confirm no HIV risk factors at screening",
    },
    {
      id: "NCT07136428-exc-12",
      status: "not-applicable",
      rationale: "Clarifying note for patients with past hepatitis B, hepatitis C or controlled HIV; no viral infection is documented for her, and testing is not required.",
    },
    {
      id: "NCT07136428-exc-13",
      status: "pass",
      rationale: "She has had contrast brain MRIs on 2026-07-22 and 2026-09-12 without difficulty.",
      evidence: [{ quote: "MRI BRAIN W/ AND W/O CONTRAST - 2026-09-12", source: "Imaging" }],
    },
    {
      id: "NCT07136428-exc-14",
      status: "pass",
      rationale: "Her medications (metformin, lisinopril, levothyroxine, gabapentin) include no strong CYP3A4 inhibitor and no narrow-margin CYP3A4 or CYP2C9 substrate.",
      evidence: [
        { quote: "metformin 1000 mg PO BID", source: "Medications" },
        { quote: "lisinopril 20 mg PO daily", source: "Medications" },
      ],
    },
    {
      id: "NCT07136428-exc-15",
      status: "pass",
      confidence: "medium",
      rationale: "Off dexamethasone since 2026-08-30, no seizures, and no leptomeningeal disease or CSF findings described.",
      evidence: [
        { quote: "dexamethasone - taper COMPLETED, last dose 08/30/2026", source: "Medications" },
        { quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT07136428-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No infection requiring intravenous therapy is documented.",
    },
    {
      id: "NCT07136428-exc-17",
      status: "not-applicable",
      rationale: "She is a 66-year-old postmenopausal woman; pregnancy and breastfeeding exclusions cannot apply.",
    },
    {
      id: "NCT07136428-exc-18",
      status: "pass",
      confidence: "medium",
      rationale: "No other malignancy in the past 5 years is recorded; her only cancer is the 2024 HER2-positive breast cancer.",
    },
    {
      id: "NCT07136428-exc-19",
      status: "pass",
      rationale: "No investigational agent: her last systemic therapy was commercial T-DXd, last dose 2026-07-06.",
      evidence: [{ quote: "trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)", source: "Medications" }],
    },
  ],
);
