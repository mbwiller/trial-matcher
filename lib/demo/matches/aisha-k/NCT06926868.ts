import { demoMatch } from "../../match-helpers";

const NOTE = "Oncology note 2026-09-25";
const PATH = "Pathology 2025-11-25";

export default demoMatch(
  "NCT06926868",
  "Excluded: first-line study for anti-PD-(L)1-ineligible TNBC; she is CPS 15 and post-pembrolizumab",
  "IZABRIGHT-Breast01 compares iza-bren with chemotherapy as first-line treatment for TNBC patients who cannot receive an anti-PD-(L)1 combination. Aisha is PD-L1 CPS 15, has no autoimmune contraindication, and has already received first-line pembrolizumab + gemcitabine/carboplatin, so she fails both the anti-PD-(L)1-ineligibility and the no-prior-metastatic-therapy requirements on documented facts. She remains a candidate for second-line ADC studies instead.",
  [
    {
      id: "NCT06926868-inc-1",
      status: "pass",
      rationale: "Metastatic TNBC with ER 0%, PR 0% and HER2 IHC 0 on the most recent specimen (RLL metastasis, 2025-11-20).",
      evidence: [
        { quote: "ER: negative (0%)", source: PATH },
        { quote: "PR: negative (0%)", source: PATH },
        { quote: "HER2 IHC: 0 (no staining observed) - not HER2-low", source: PATH },
      ],
    },
    {
      id: "NCT06926868-inc-2",
      status: "not-applicable",
      rationale: "Applies to recurrent disease after curative therapy; she presented with de novo metastatic disease.",
      evidence: [{ quote: "lytic T11 + L iliac lesions (cT3 cN2 M1)", source: NOTE }],
    },
    {
      id: "NCT06926868-inc-3",
      status: "fail",
      rationale:
        "She is not anti-PD-(L)1-ineligible: PD-L1 CPS 15, no (neo)adjuvant immunotherapy, no autoimmune contraindication, and she actually received first-line pembrolizumab + chemotherapy.",
      evidence: [
        { quote: "PD-L1 IHC (22C3 pharmDx): CPS 15", source: PATH },
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE },
      ],
    },
    {
      id: "NCT06926868-inc-4",
      status: "not-applicable",
      rationale:
        "Lists autoimmune diseases that qualify as an anti-PD-(L)1 contraindication (one route to eligibility); she has none of them, and that question is decided under the anti-PD-(L)1-ineligibility criterion.",
      evidence: [{ quote: "No autoimmune dz prior to pembro.", source: NOTE }],
    },
    {
      id: "NCT06926868-inc-5",
      status: "not-applicable",
      rationale: "Applies to ER-low (1–10%) disease; she is ER 0% and PR 0% (TNBC).",
      evidence: [{ quote: "ER: negative (0%)", source: PATH }],
    },
    {
      id: "NCT06926868-inc-6",
      status: "fail",
      rationale: "She has had systemic therapy in the metastatic setting: pembrolizumab + gemcitabine/carboplatin from 12/2025 until progression in 9/2026.",
      evidence: [
        { quote: "1L pembrolizumab + gemcitabine/carboplatin (KEYNOTE-355) started 12/2025", source: NOTE },
        { quote: "PD on 1L pembro + gem/carbo after ~9 mo.", source: NOTE },
      ],
    },
    {
      id: "NCT06926868-inc-7",
      status: "pass",
      rationale: "Measurable by CT: liver segment VI 2.1 cm and RLL nodule 1.8 cm (2026-09-15).",
      evidence: [{ quote: "Measurable dz: liver seg VI 2.1 cm, RLL 1.8 cm.", source: NOTE }],
    },
    {
      id: "NCT06926868-exc-1",
      status: "pass",
      rationale: "Germline panel negative for BRCA1/BRCA2 (2025-12-09); PARP inhibition is not an option for her.",
      evidence: [{ quote: "NEGATIVE (BRCA1, BRCA2, PALB2, TP53, CHEK2, ATM)", source: "Germline panel 2025-12-09" }],
    },
    {
      id: "NCT06926868-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No known CNS metastases (baseline MRI 2025-11-18 negative) and neurologically asymptomatic; not re-imaged in ~10 months.",
      evidence: [
        { quote: "MRI BRAIN 11/18/2025 (baseline): no intracranial metastases.", source: "MRI brain 2025-11-18" },
        { quote: "No HA, no visual chnages, no focal weakness.", source: NOTE },
      ],
    },
    {
      id: "NCT06926868-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease suggested: no headache, visual change or focal deficit, neuro exam nonfocal.",
      evidence: [{ quote: "Neuro nonfocal.", source: NOTE }],
    },
    {
      id: "NCT06926868-exc-4",
      status: "pass",
      rationale: "No cardiac history recorded.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT06926868-exc-5",
      status: "pass",
      confidence: "medium",
      rationale: "No cardiac history; no stroke or TIA recorded and neuro exam nonfocal.",
      evidence: [{ quote: "No DM, no cardiac hx.", source: NOTE }],
    },
    {
      id: "NCT06926868-exc-6",
      status: "unknown",
      confidence: "low",
      rationale: "No ECG on file, so QTc is unknown; she takes ondansetron (QT-prolonging) as needed.",
      evidence: [
        { quote: "No echo or ECG on file; order if trial requires.", source: NOTE },
        { quote: "ondansetron 8 mg PO q8h prn nausea", source: "Medication list" },
      ],
      actionNeeded: "Obtain 12-lead ECG; QTcF must be < 470 ms",
    },
    {
      id: "NCT06926868-exc-7",
      status: "pass",
      confidence: "medium",
      rationale: "No LVEF has been measured, so none is known to be < 50%; no cardiac history or anthracycline exposure.",
      evidence: [{ quote: "No echo or ECG on file; order if trial requires.", source: NOTE }],
      actionNeeded: "Obtain echocardiogram if required at screening",
    },
    {
      id: "NCT06926868-exc-8",
      status: "pass",
      rationale: "No prior ADC of any kind, so no EGFR/HER3-directed or topoisomerase-I-payload ADC.",
      evidence: [{ quote: "No prior taxane, anthracycline, ADC or PARP inhibitor.", source: NOTE }],
    },
    {
      id: "NCT06926868-exc-9",
      status: "pass",
      confidence: "low",
      rationale: "Placeholder for criteria not listed in the registry entry; assessed against the full protocol at screening.",
    },
  ],
);
