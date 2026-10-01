import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT07506876",
  "Fits untreated HR+/HER2+ stage IIIA with TCHP planned · MammaPrint/BluePrint subtype not yet run",
  "Newly diagnosed, untreated ER 60%/PR 20%/HER2 IHC 3+ IDC, clinical stage IIIA, with TCHP x6 planned, matches this concurrent chemo-endocrine study. The only open requirement is a Luminal A, Luminal B or HER2-enriched call on MammaPrint/BluePrint from the initial biopsy, which has not been sent; a Basal result would exclude her. As she is premenopausal, concurrent endocrine therapy would need ovarian suppression or tamoxifen, and it should start only after oocyte retrieval (~10/5) and before cycle 2.",
  [
    {
      id: "NCT07506876-inc-1",
      status: "pass",
      rationale: "34 years old with newly diagnosed, untreated ER+/PR+/HER2+ (IHC 3+) cancer. Letrozole for oocyte stimulation is not cancer-directed, and endocrine therapy started within 28 days of enrollment would be allowed anyway.",
      evidence: [
        { quote: "R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", source: "Consult 2026-09-23" },
        { quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT07506876-inc-2",
      status: "pass",
      rationale: "Clinical stage IIIA, within IIA–IIIC, with TCHP x6 planned (at least 4 cycles required).",
      evidence: [
        { quote: "cT3 cN1 M0, clinical stage IIIA", source: "Consult 2026-09-23" },
        { quote: "neoadj TCHP x6 (docetaxel/carboplatin/trastuzumab/pertuzumab) then surgery, adj tx per path response.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT07506876-inc-3",
      status: "unknown",
      confidence: "medium",
      rationale: "MammaPrint/BluePrint has not been performed on the 9/3 core biopsy; HR+/HER2 IHC 3+ disease is usually Luminal B or HER2-enriched, but a Basal call is possible.",
      evidence: [{ quote: "Ki-67: 45%", source: "Pathology 2026-09-08" }],
      actionNeeded: "Send MammaPrint/BluePrint on the 9/3 core biopsy; Luminal A, Luminal B or HER2-enriched required",
    },
    {
      id: "NCT07506876-exc-1",
      status: "pass",
      confidence: "medium",
      rationale: "Adult (34), not pregnant (serum hCG negative 9/22), employed as a software engineer with no indication of incarceration or impaired decision-making.",
      evidence: [
        { quote: "hCG (serum) negative", source: "Labs 2026-09-22" },
        { quote: "SH: software engineer, never smoker, rare EtOH." },
      ],
    },
    {
      id: "NCT07506876-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "No non-breast cancer is recorded in the PMH or staging.",
      evidence: [{ quote: "PMH: mild intermitent asthma (albuterol prn, never hospitalized). No cardiac hx. No DM." }],
    },
    {
      id: "NCT07506876-exc-3",
      status: "pass",
      rationale: "No prior breast cancer: this is a new diagnosis with no prior treatment or surgery. The 'Oncologic hx: s/p R lumpectomy' line is a stale template contradicted by the HPI and PSH.",
      evidence: [
        { quote: "CC: newly dx R breast ca, triple positive, neoadj tx planning.", source: "Consult 2026-09-23" },
        { quote: "PSH: none.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT07506876-exc-4",
      status: "pass",
      rationale: "Not recurrent: a newly diagnosed, treatment-naive primary with the tumor still in place.",
      evidence: [{ quote: "R breast IDC grade 3, ER+/PR+/HER2+ (IHC 3+), cT3 cN1 M0, clinical stage IIIA, treatment-naive. Curative intent.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT07506876-exc-5",
      status: "pass",
      rationale: "No distant metastases on PET/CT 9/15 (M0).",
      evidence: [{ quote: "No FDG-avid distant metastases.", source: "PET/CT 2026-09-15" }],
    },
  ],
);
