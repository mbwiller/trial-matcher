import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT04899908",
  "Excluded: no brain lesion needs radiation now; all three responded to SRS in August",
  "This trial adds AGuIX nanoparticles to stereotactic radiation for brain metastases that are due to be irradiated. HER2-positive breast cancer is an eligible stratum, but Rosa's three lesions were treated with Gamma Knife on 2026-08-07 and all shrank on the 2026-09-12 MRI with no new lesions, so there is nothing to treat. It would become relevant if surveillance MRI shows a new lesion or a local recurrence after SRS, subject to written PI approval and review of her prior dosimetry.",
  [
    {
      id: "NCT04899908-inc-1",
      status: "fail",
      rationale: "Two lesions are ≥ 5 mm (right frontal 0.8 cm, left cerebellar 0.5 cm), but all three were treated with SRS on 2026-08-07 and are shrinking with no new lesions, so none needs stereotactic radiation and none qualifies for a stratum.",
      evidence: [
        { quote: "right frontal 1.4 -> 0.8 cm, left cerebellar 0.9 -> 0.5 cm, right parietal 0.6 -> 0.3 cm", source: "MRI brain 2026-09-12" },
        { quote: "No new enhancing lesions. No vasogenic edema, no mass effect, no hemorrhage.", source: "MRI brain 2026-09-12" },
      ],
    },
    {
      id: "NCT04899908-inc-2",
      status: "not-applicable",
      rationale: "Melanoma stratum; she has breast cancer.",
    },
    {
      id: "NCT04899908-inc-3",
      status: "not-applicable",
      rationale: "Gastrointestinal primary stratum; she has breast cancer.",
    },
    {
      id: "NCT04899908-inc-4",
      status: "pass",
      rationale: "HER2-positive breast cancer, IHC 3+ on the breast primary and liver metastasis; this is the stratum she would enter if a radiation-naive lesion appeared.",
      evidence: [
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential staining in >10% of cells", source: "Pathology 2024-01-19" },
      ],
    },
    {
      id: "NCT04899908-inc-5",
      status: "not-applicable",
      rationale: "Alternative stratum for cystic metastases; no cystic lesions are described.",
    },
    {
      id: "NCT04899908-inc-6",
      status: "not-applicable",
      rationale: "Alternative stratum for metastases ≥ 2 cm; her largest lesion was 1.4 cm before SRS and is now 0.8 cm.",
    },
    {
      id: "NCT04899908-inc-7",
      status: "not-applicable",
      rationale: "Alternative stratum for local recurrence after SRS; all three SRS-treated lesions decreased on MRI 2026-09-12. This is the stratum that would apply if one recurs.",
      evidence: [{ quote: "all decreased, consistent with treatment response", source: "MRI brain 2026-09-12" }],
    },
    {
      id: "NCT04899908-inc-8",
      status: "not-applicable",
      rationale: "Alternative stratum for recurrence after whole-brain radiation; she has never had WBRT.",
    },
    {
      id: "NCT04899908-inc-9",
      status: "pass",
      rationale: "She was 66 when brain metastases were diagnosed in July 2026.",
      evidence: [{ quote: "DOB: 1960 (66 yo F)", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT04899908-inc-10",
      status: "pass",
      confidence: "medium",
      rationale: "eGFR is not reported, but creatinine 0.9 mg/dL corresponds to a CKD-EPI eGFR of about 70 mL/min/1.73 m²; Cockcroft-Gault CrCl is ~62 mL/min (2026-09-22).",
      evidence: [{ quote: "Cr 0.9 | est CrCl ~62 mL/min (CG)", source: "Labs 2026-09-22" }],
      actionNeeded: "Confirm lab-reported eGFR ≥ 60 mL/min/1.73 m² at screening",
    },
    {
      id: "NCT04899908-inc-11",
      status: "pass",
      confidence: "medium",
      rationale: "ECOG 1 with mild fatigue corresponds to a Karnofsky score of 70–80.",
      evidence: [{ quote: "EXAM: ECOG 1.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT04899908-inc-12",
      status: "pass",
      confidence: "medium",
      rationale: "Progressing but limited liver disease with normal bilirubin, ECOG 1 and further systemic options; survival beyond 3 months is expected.",
    },
    {
      id: "NCT04899908-inc-13",
      status: "pass",
      confidence: "low",
      rationale: "Ability and willingness to consent are confirmed at screening.",
    },
    {
      id: "NCT04899908-inc-14",
      status: "not-applicable",
      rationale: "Contraception rule for women of child-bearing potential; she is a 66-year-old postmenopausal woman.",
    },
    {
      id: "NCT04899908-exc-1",
      status: "pass",
      rationale: "She has had contrast brain MRIs on 2026-07-22 and 2026-09-12 without difficulty.",
      evidence: [{ quote: "MRI BRAIN W/ AND W/O CONTRAST - 2026-09-12", source: "Imaging" }],
    },
    {
      id: "NCT04899908-exc-2",
      status: "pass",
      rationale: "She received gadolinium for the 2026-09-12 MRI without a recorded reaction, has no known allergies, and CrCl is ~62 mL/min.",
      evidence: [
        { quote: "MRI BRAIN W/ AND W/O CONTRAST - 2026-09-12", source: "Imaging" },
        { quote: "ALLERGIES: NKDA", source: "Allergies" },
      ],
    },
    {
      id: "NCT04899908-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No leptomeningeal disease is described on brain MRI, and she has no new neurological symptoms.",
      evidence: [{ quote: "HA resolved since SRS. No seizures, no focal deficits.", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT04899908-exc-4",
      status: "pass",
      rationale: "No lesions currently need radiation, and she had only three targets at SRS in 08/2026, far below 10.",
      evidence: [{ quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" }],
    },
    {
      id: "NCT04899908-exc-5",
      status: "not-applicable",
      rationale: "She is a 66-year-old postmenopausal woman; pregnancy and breastfeeding exclusions cannot apply.",
    },
    {
      id: "NCT04899908-exc-6",
      status: "unknown",
      confidence: "medium",
      rationale: "Prior Gamma Knife SRS (20 Gy to three lesions, 2026-08-07) means written PI approval is required; brainstem and optic-pathway doses, including near the left cerebellar lesion, are not documented.",
      evidence: [{ quote: "GK SRS to all 3 lesions 8/7/26 (20 Gy).", source: "Onc note 2026-09-24" }],
      actionNeeded: "Obtain the Gamma Knife plan with organ-at-risk doses and written study/site PI approval",
    },
  ],
);
