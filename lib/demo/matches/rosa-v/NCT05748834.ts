import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT05748834",
  "Meets all applicable inclusion criteria · G2 neuropathy needs monitor approval; no ECG on file",
  "Strong fit for tucatinib plus pegylated liposomal doxorubicin as a third-line option: HER2 3+, progressed on THP/HP and T-DXd, tucatinib- and anthracycline-naive, measurable liver disease, and SRS-treated brain metastases that are shrinking off steroids, a group the protocol explicitly allows. Open items are Medical Monitor approval for her chronic grade 2 docetaxel neuropathy and a screening ECG. LVEF has drifted from 62% to 55%, so the anthracycline warrants close cardiac monitoring; screening brain MRI and CT need repeating within the protocol window.",
  [
    {
      id: "NCT05748834-inc-1",
      status: "pass",
      confidence: "low",
      rationale: "Written consent is obtained at screening; she has said she is open to a trial if screening can happen within 3–4 weeks.",
      evidence: [{ quote: "Pt open to trial if screening within 3-4 wks.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-inc-2",
      status: "pass",
      rationale: "She is 66 years old (born 1960).",
      evidence: [{ quote: "DOB: 1960 (66 yo F)", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-inc-3",
      status: "pass",
      rationale: "ECOG 1 at the 2026-09-24 visit, with mild fatigue only.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-inc-4",
      status: "pass",
      rationale: "De novo metastatic breast cancer, HER2 IHC 3+ on the breast core (01/2024) and on the liver metastasis biopsy (2024-01-23). No re-biopsy since progression on T-DXd.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" },
        { quote: "Liver bx 2024-01-23: metastatic carcinoma c/w breast primary, HER2 IHC 3+.", source: "Pathology" },
      ],
    },
    {
      id: "NCT05748834-inc-5",
      status: "pass",
      rationale: "Two anti-HER2 lines for metastatic disease: THP then trastuzumab/pertuzumab maintenance (PD 03/2025), and T-DXd 04/2025–07/2026 (PD). She is tucatinib-naive.",
      evidence: [
        { quote: "Metastatic HER2+ (IHC 3+) HR-negative breast ca, de novo stage IV, PD on 1L THP/HP and 2L T-DXd.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05748834-inc-6",
      status: "pass",
      rationale: "Measurable hepatic metastases: segment VII 2.8 cm and segment V 2.2 cm on CT 07/20/2026. That CT is 10 weeks old and will need repeating for the study baseline.",
      evidence: [{ quote: "Measurable liver dz: seg VII 2.8 cm, seg V 2.2 cm.", source: "Onc note 2026-09-24" }],
      actionNeeded: "Repeat CT chest/abdomen/pelvis within the protocol baseline window (last CT 07/20/2026)",
    },
    {
      id: "NCT05748834-inc-7",
      status: "pass",
      rationale: "Not of child-bearing potential: 66 years old and documented as postmenopausal, which meets the protocol definition (age > 50 with ≥ 12 months of amenorrhoea).",
      evidence: [{ quote: "66 yo postmenopausal F", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-inc-8",
      status: "not-applicable",
      rationale: "Contraception requirement applies to men and to women of child-bearing potential; she is a 66-year-old postmenopausal woman.",
    },
    {
      id: "NCT05748834-inc-9",
      status: "pass",
      rationale: "Labs 2026-09-22: ANC 3.1 × 10⁹/L, platelets 165 × 10⁹/L, Hgb 10.9 g/dL (chronic mild anemia, no bleeding). No transfusion is documented.",
      evidence: [
        { quote: "WBC 5.8 | ANC 3.1 | Hgb 10.9 (L) | Plt 165", source: "Labs 2026-09-22" },
        { quote: "Mild anemia Hgb 10.9, chronic, no bleeding.", source: "Onc note 2026-09-24" },
      ],
      actionNeeded: "Confirm no transfusion in the 2 weeks before the screening hemoglobin",
    },
    {
      id: "NCT05748834-inc-10",
      status: "pass",
      rationale: "Total bilirubin 0.8 mg/dL; AST 52 U/L (1.3 × ULN) and ALT 48 U/L are mildly raised with liver metastases, well within the ≤ 5 × ULN allowance (labs 2026-09-22).",
      evidence: [{ quote: "AST 52 (H, 1.3x ULN) | ALT 48 (H) | T bili 0.8", source: "Labs 2026-09-22" }],
    },
    {
      id: "NCT05748834-inc-11",
      status: "pass",
      confidence: "medium",
      rationale: "eGFR is not reported, but creatinine 0.9 mg/dL corresponds to a CKD-EPI eGFR of about 70 mL/min/1.73 m², and Cockcroft-Gault CrCl is ~62 mL/min (2026-09-22); both exceed 50.",
      evidence: [{ quote: "Cr 0.9 | est CrCl ~62 mL/min (CG)", source: "Labs 2026-09-22" }],
      actionNeeded: "Confirm lab-reported eGFR ≥ 50 mL/min/1.73 m² at screening",
    },
    {
      id: "NCT05748834-inc-12",
      status: "pass",
      rationale: "LVEF 55% on echo 2026-09-10 (biplane), asymptomatic; down from 62% (01/2024) and 58% (03/2025) but above the 50% threshold.",
      evidence: [
        { quote: "ECHO 2026-09-10: LVEF 55% (biplane Simpson's).", source: "Echo 2026-09-10" },
        { quote: "Prior LVEF 62% (01/2024), 58% (03/2025).", source: "Echo 2026-09-10" },
      ],
    },
    {
      id: "NCT05748834-inc-13",
      status: "pass",
      rationale: "She falls in the previously treated brain metastases category: three lesions treated with Gamma Knife SRS on 2026-08-07, with treatment details and pre- and post-treatment MRIs (07/22 and 09/12/2026) available.",
      evidence: [
        { quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" },
        { quote: "MRI brain 9/12/26: treated lesions smaller, no new lesions, no edema.", source: "Onc note 2026-09-24" },
      ],
      actionNeeded: "Screening contrast brain MRI required (last MRI 2026-09-12)",
    },
    {
      id: "NCT05748834-inc-14",
      status: "pass",
      rationale: "MRI 2026-09-12 shows all three treated lesions smaller (right frontal 1.4 → 0.8 cm) with no new lesions or edema, so there is no indication for immediate re-treatment.",
      evidence: [
        { quote: "right frontal 1.4 -> 0.8 cm, left cerebellar 0.9 -> 0.5 cm, right parietal 0.6 -> 0.3 cm", source: "MRI brain 2026-09-12" },
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
      ],
    },
    {
      id: "NCT05748834-inc-15",
      status: "not-applicable",
      rationale: "Applies to lesions newly found on the study screening MRI and treated during screening; her lesions were treated in 08/2026, before screening. It would apply only if the screening MRI shows a new lesion.",
    },
    {
      id: "NCT05748834-inc-16",
      status: "pass",
      rationale: "Gamma Knife SRS on 2026-08-07 is 52 days before today, well beyond the ≥ 7-day interval; she has had no WBRT or brain surgery.",
      evidence: [{ quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-inc-17",
      status: "pass",
      rationale: "Extracranial RECIST-assessable disease is present: liver metastases of 2.8 and 2.2 cm, plus stable lung nodules (largest 7 mm), on CT 07/20/2026.",
      evidence: [
        { quote: "segment VII lesion 2.8 cm (previously 1.6 cm), segment V lesion 2.2 cm (previously 1.1 cm)", source: "CT CAP 07/20/2026" },
      ],
    },
    {
      id: "NCT05748834-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Last T-DXd 2026-07-06 (84 days ago; the 'C14 D1 today' line is a stale copy-forward), SRS 2026-08-07 (52 days), and no surgery beyond port placement. Her documented regimens (THP, Phesgo, T-DXd) include no anthracycline.",
      evidence: [
        { quote: "trastuzumab deruxtecan - DISCONTINUED 07/2026 (PD)", source: "Medications" },
        { quote: "PSH: port 2/2024. No breast surgery.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05748834-exc-2",
      status: "pass",
      rationale: "Lead-in to the screening-MRI exclusions below; none of them is met on the 2026-09-12 MRI, which shows only three treated, shrinking lesions.",
      evidence: [{ quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" }],
    },
    {
      id: "NCT05748834-exc-3",
      status: "pass",
      rationale: "No untreated brain lesions: all three metastases were treated with SRS on 2026-08-07, and the 2026-09-12 MRI shows no new enhancing lesions.",
      evidence: [
        { quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" },
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
      ],
    },
    {
      id: "NCT05748834-exc-4",
      status: "pass",
      rationale: "Dexamethasone taper completed 2026-08-30 (29 days ago) with no rebound symptoms; she takes no corticosteroids now.",
      evidence: [
        { quote: "dexamethasone - taper COMPLETED, last dose 08/30/2026", source: "Medications" },
        { quote: "Off dex ~3.5 wks, no rebound sx.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05748834-exc-5",
      status: "pass",
      rationale: "No lesion needs immediate local therapy: the treated lesions are right frontal, left cerebellar and right parietal (none in the brainstem), all smaller, with no edema or mass effect.",
      evidence: [
        { quote: "right frontal 1.4 -> 0.8 cm, left cerebellar 0.9 -> 0.5 cm, right parietal 0.6 -> 0.3 cm", source: "MRI brain 2026-09-12" },
      ],
    },
    {
      id: "NCT05748834-exc-6",
      status: "pass",
      confidence: "medium",
      rationale: "Leptomeningeal disease is not described on the 2026-09-12 MRI, which reports only the three treated parenchymal lesions, and she has no new neurological symptoms.",
      evidence: [{ quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-exc-7",
      status: "pass",
      rationale: "No seizures at any point and no focal deficits; headaches resolved after SRS and the neurological examination is normal.",
      evidence: [
        { quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" },
        { quote: "Alert, CN II-XII intact, no drift, gait steady.", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05748834-exc-8",
      status: "pass",
      rationale: "Current medications are metformin, lisinopril, levothyroxine and gabapentin; none is a strong CYP2C8 or CYP3A4 inhibitor or a CYP2C8 inducer.",
      evidence: [
        { quote: "metformin 1000 mg PO BID", source: "Medications" },
        { quote: "gabapentin 300 mg PO qhs", source: "Medications" },
      ],
    },
    {
      id: "NCT05748834-exc-9",
      status: "unknown",
      confidence: "medium",
      rationale: "Residual grade 2 peripheral neuropathy from docetaxel exceeds grade 1. It is chronic, stable and managed with gabapentin 300 mg nightly, which fits the protocol's route to eligibility with Medical Monitor approval.",
      evidence: [
        { quote: "Residual G2 PN hands/feet from docetaxel", source: "Onc note 2026-09-24" },
        { quote: "G2 PN (docetaxel): stable, gabapentin 300 mg qhs.", source: "Onc note 2026-09-24" },
      ],
      actionNeeded: "Request Medical Monitor approval for chronic, stable grade 2 neuropathy managed with gabapentin",
    },
    {
      id: "NCT05748834-exc-10",
      status: "not-applicable",
      rationale: "She is a 66-year-old postmenopausal woman; pregnancy and nursing exclusions cannot apply.",
    },
    {
      id: "NCT05748834-exc-11",
      status: "not-applicable",
      rationale: "Applies to male participants only; she is female.",
    },
    {
      id: "NCT05748834-exc-12",
      status: "pass",
      confidence: "medium",
      rationale: "No GI disease, vomiting, diarrhea or malabsorption is documented; mild RUQ discomfort fits her liver metastases. The nausea/olanzapine mention sits in the stale copy-forward T-DXd line, and olanzapine is not on the medication list.",
      evidence: [{ quote: "Mild RUQ discomfort, no jaundice.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT05748834-exc-13",
      status: "unknown",
      confidence: "medium",
      rationale: "LVEF is 55% (2026-09-10) and no coronary disease or heart failure symptoms are documented, but no ECG or QTcF is on file.",
      evidence: [
        { quote: "LVEF 55% on 9/10/26 echo (baseline 62% in 2024), asymptomatic.", source: "Onc note 2026-09-24" },
        { quote: "No CAD. Never smoker.", source: "Onc note 2026-09-24" },
      ],
      actionNeeded: "Obtain triplicate screening ECGs; mean QTcF must be ≤ 480 ms with no clinically important rhythm or conduction abnormality",
    },
    {
      id: "NCT05748834-exc-14",
      status: "pass",
      confidence: "medium",
      rationale: "Hypertension is controlled on lisinopril (BP 128/74) and diabetes on metformin (HbA1c 6.9%, 07/2026); no bleeding or active infection is documented. The criterion does not require hepatitis screening.",
      evidence: [
        { quote: "BP 128/74 HR 82 SpO2 97% RA.", source: "Onc note 2026-09-24" },
        { quote: "HbA1c 6.9% (07/2026)", source: "Labs" },
      ],
    },
    {
      id: "NCT05748834-exc-15",
      status: "pass",
      confidence: "low",
      rationale: "No HIV infection or antiretroviral therapy appears in the history or medication list; the protocol leaves testing to investigator discretion when no prior result exists.",
      actionNeeded: "Confirm HIV status at screening; test if risk factors are present",
    },
    {
      id: "NCT05748834-exc-16",
      status: "pass",
      confidence: "medium",
      rationale: "No other invasive cancer is recorded in the past medical history; her only malignancy is the 2024 HER2-positive breast cancer.",
      evidence: [
        { quote: "PMH: T2DM (metformin, A1c 6.9% 7/2026), HTN (lisinopril), hypothyroidism (levothyroxine).", source: "Onc note 2026-09-24" },
      ],
    },
    {
      id: "NCT05748834-exc-17",
      status: "pass",
      confidence: "low",
      rationale: "Lives with her daughter and is willing to enroll if screening is prompt; no barriers to follow-up are recorded. Confirmed at screening.",
      evidence: [
        { quote: "SH: lives w/ daughter, no EtOH.", source: "Onc note 2026-09-24" },
        { quote: "Pt open to trial if screening within 3-4 wks.", source: "Onc note 2026-09-24" },
      ],
    },
  ],
);
