import { demoMatch } from "../../match-helpers";

export default demoMatch(
  "NCT01042379",
  "Meets all listed criteria · MammaPrint/BluePrint and research core biopsy done at screening",
  "Untreated stage IIIA (cT3 cN1 M0) HR+/HER2+ IDC measuring 5.4 cm, with ECOG 0, normal labs, LVEF 63% and a negative PET/CT, meets every listed I-SPY criterion. She would enter the HER2-positive signature arms after MammaPrint/BluePrint subtyping on the screening core; as an ER-positive, HER2 IHC 3+ tumor she qualifies whether MammaPrint returns High or Low. The serial-MRI design suits her (bilateral MRI done 9/11), but the 9/30 left-breast biopsy, pending hepatitis/HIV serologies and the oocyte-retrieval timing (~10/5) should be settled before randomization.",
  [
    {
      id: "NCT01042379-inc-1",
      status: "pass",
      rationale: "Histologically confirmed invasive ductal carcinoma on the 9/3 core biopsy.",
      evidence: [{ quote: "A. Invasive ductal carcinoma, grade 3 (Nottingham 8/9). LVI not identified.", source: "Pathology 2026-09-08" }],
    },
    {
      id: "NCT01042379-inc-2",
      status: "pass",
      rationale: "Post-biopsy MRI 9/11 measures the mass at 5.4 cm (5 cm on exam 9/23), well above 25 mm.",
      evidence: [
        { quote: "Known R breast malignancy, 5.4 x 4.1 x 3.8 cm, clip in place.", source: "MRI 2026-09-11" },
        { quote: "R breast 5 cm firm mobile mass 10 o'clock, no skin changes, no nipple retraction.", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT01042379-inc-3",
      status: "pass",
      rationale: "No prior chemotherapy or radiation for this cancer.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT01042379-inc-4",
      status: "pass",
      rationale: "34 years old (DOB 1992).",
      evidence: [{ quote: "DOB: 1992 (34 yo F)", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT01042379-inc-5",
      status: "pass",
      rationale: "ECOG 0 at the 9/23 consult.",
      evidence: [{ quote: "EXAM: ECOG 0.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT01042379-inc-6",
      status: "pass",
      confidence: "low",
      rationale: "Willingness to undergo a research core biopsy is confirmed at screening; she tolerated the 9/3 US-guided core biopsy.",
      evidence: [{ quote: "Specimen: A. Right breast 10 o'clock, US-guided core biopsy; B. Right axillary lymph node, FNA" }],
    },
    {
      id: "NCT01042379-inc-7",
      status: "pass",
      rationale: "Not pregnant (serum hCG negative 9/22) and not lactating (G0).",
      evidence: [
        { quote: "hCG (serum) negative", source: "Labs 2026-09-22" },
        { quote: "34 yo premenopausal F, G0", source: "Consult 2026-09-23" },
      ],
    },
    {
      id: "NCT01042379-inc-8",
      status: "pass",
      rationale: "No prior surgery or implants, and she completed contrast breast MRI on 9/11 with the biopsy clip in place.",
      evidence: [
        { quote: "PSH: none.", source: "Consult 2026-09-23" },
        { quote: "MRI BREASTS BILATERAL W/ AND W/O CONTRAST - Sept 11, 2026", source: "MRI 2026-09-11" },
      ],
    },
    {
      id: "NCT01042379-inc-9",
      status: "pass",
      confidence: "low",
      rationale: "Screening consent is obtained at the screening visit; nothing suggests impaired capacity.",
    },
    {
      id: "NCT01042379-inc-10",
      status: "pass",
      rationale: "Clinical stage IIIA (cT3 cN1 M0).",
      evidence: [{ quote: "cT3 cN1 M0, clinical stage IIIA", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT01042379-inc-11",
      status: "pass",
      confidence: "medium",
      rationale: "Local ER 60%, PR 20% and HER2 IHC 3+ are known; the MammaPrint profile is pending, but an ER+/HER2+ tumor meets the section 4.1.2F profile with either a High or Low result.",
      evidence: [
        { quote: "ER: positive, 60% of tumor cells, moderate intensity", source: "Pathology 2026-09-08" },
        { quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: "Pathology 2026-09-08" },
      ],
    },
    {
      id: "NCT01042379-inc-12",
      status: "pass",
      rationale: "Labs 9/22: WBC 6.8, ANC 4.1, platelets 255, bilirubin 0.4, AST 18, ALT 21, creatinine 0.6 — all within the stricter I-SPY limits.",
      evidence: [
        { quote: "WBC 6.8 | ANC 4.1 | Hgb 13.1 | Plt 255", source: "Labs 2026-09-22" },
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: "Labs 2026-09-22" },
        { quote: "Cr 0.6 | Na 140 | K 4.0", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT01042379-inc-13",
      status: "pass",
      rationale: "No cardiac history and LVEF 63% by echo on 9/17, above 50%.",
      evidence: [
        { quote: "No cardiac hx.", source: "Consult 2026-09-23" },
        { quote: "ECHO 9/17/2026: LVEF 63%, normal LV size and function.", source: "Echo 2026-09-17" },
      ],
    },
    {
      id: "NCT01042379-inc-14",
      status: "pass",
      rationale: "PET/CT 9/15 (more sensitive than CXR plus bone scan) shows no distant metastases, and LFTs including alkaline phosphatase 62 are normal.",
      evidence: [
        { quote: "No FDG-avid distant metastases.", source: "PET/CT 2026-09-15" },
        { quote: "AST 18 | ALT 21 | T bili 0.4 | Alk phos 62 | Albumin 4.4", source: "Labs 2026-09-22" },
      ],
    },
    {
      id: "NCT01042379-inc-15",
      status: "pass",
      confidence: "medium",
      rationale: "MammaPrint not yet run, but every outcome qualifies her: High (any ER/HER2) or Low with ER positive and HER2 positive by IHC, which she is (ER 60%, HER2 IHC 3+).",
      evidence: [{ quote: "HER2 IHC: 3+ (positive), complete intense circumferential membrane staining in >10% of cells", source: "Pathology 2026-09-08" }],
      actionNeeded: "Send MammaPrint/BluePrint on the screening core biopsy",
    },
    {
      id: "NCT01042379-inc-16",
      status: "pass",
      confidence: "low",
      rationale: "Treatment consent (Consent #2) is obtained after arm assignment; nothing suggests impaired capacity.",
    },
    {
      id: "NCT01042379-exc-1",
      status: "pass",
      rationale: "No investigational agents: she is treatment-naive and the medication list has only albuterol, fertility drugs and a prenatal vitamin.",
      evidence: [{ quote: "No prior chemo, anti-HER2 tx, endocrine tx, RT or surgery for cancer.", source: "Consult 2026-09-23" }],
    },
    {
      id: "NCT01042379-exc-2",
      status: "pass",
      confidence: "medium",
      rationale: "NKDA and no prior exposure to anti-HER2 antibodies, chemotherapy or the supportive medicines used in the arms.",
      evidence: [{ quote: "ALLERGIES: NKDA", source: "Allergies" }],
    },
    {
      id: "NCT01042379-exc-3",
      status: "pass",
      confidence: "medium",
      rationale: "No uncontrolled illness: afebrile, no cardiac history, asthma stable, no psychiatric history recorded.",
      evidence: [
        { quote: "BP 116/72 HR 74 afebrile.", source: "Consult 2026-09-23" },
        { quote: "3. Asthma: stable.", source: "Consult 2026-09-23" },
      ],
    },
  ],
);
